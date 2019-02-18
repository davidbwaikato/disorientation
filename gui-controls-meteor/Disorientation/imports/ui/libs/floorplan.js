import THREE from './three.js'

function extractFloors(file, scene, camera) {

    fetch(file)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function(data) {extractFloorData(data, scene, camera)});
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

}

var lastRoom
var mouseDownPos = {x:0,y:0}

function extractFloorData(data, scene, camera) {

    var flooplans = []
    var blockMeshes = []
    var floorMeshes = []

    for (var floor of data.floors) floor.rooms = []
    for (var block of data.blocks) block.floors = []

    for (var room of data.rooms) {
        data.floors[room.parent].rooms.push(room)
    }

    for (var floor of data.floors) {
        data.blocks[floor.parent].floors.push(floor)
    }

    var scale = 0.001
    var color = 0xff0000
    var floorMaterial = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        depthWrite: false,
        transparent: true,
        opacity: 0.5,
        shininess: 100,
    } );
    var roomMaterial = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        depthWrite: false,
        transparent: true,
        opacity: 0.5,
        shininess: 100,
    } );
    var selectedFloorMaterial = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(0x000000),
        side: THREE.DoubleSide,
        depthWrite: false,
        transparent: true,
        shininess: 100,
    } );
    var selectedRoomMaterial = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(0x000000),
        side: THREE.DoubleSide,
        depthWrite: false,
        transparent: true,
        shininess: 100,
    } );
    var blockMaterial = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(color),
        shininess: 100,
    } );

    

    for (var block of data.blocks) {
        let group = new THREE.Group()
        group.callback = function() {group.translateZ(1)}
        for (var footprint of block.footprints) {
            var points = []
            for (var vertex of footprint.vertices) {
                points.push(new THREE.Vector2(vertex[0]*scale, -vertex[1]*scale))
            }
            var shape = new THREE.Shape(points)
            var extrudeMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, {depth:10, bevelEnabled: false}), blockMaterial)
            group.add(extrudeMesh)
            blockMeshes.push(extrudeMesh)
            extrudeMesh.callback = function() {
                if (block.name) console.log(block.name)
                group.callback()
            }
        }
        scene.add(group)

        let blockFloorGroup = new THREE.Group()
        for (var floor of block.floors) {
            let floorGroup = new THREE.Group()
            for (var room of floor.rooms) {
                var points = []
                for (var vertex of room.vertices) {
                    points.push(new THREE.Vector2(vertex[0]*scale, -vertex[1]*scale))
                }
                var shape = new THREE.Shape(points)
                var geometry = new THREE.ShapeBufferGeometry(shape)
                let mesh = new THREE.Mesh(geometry, floorMaterial)
                mesh.visible = false
                mesh.callback = function(deselect) {
                    lastRoom = mesh
                    if (!deselect) {
                        if (mesh.material == floorMaterial) {
                            blockFloorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = floorMaterial
                                }
                            });
                            floorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = selectedFloorMaterial
                                }
                            });
                        }
                        else {
                            blockFloorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.visible = false
                                }
                            });
                            floorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = roomMaterial
                                    child.visible = true
                                }
                            });
                            mesh.material = selectedRoomMaterial
                        }
                    }
                    else {
                        if (mesh.material == selectedFloorMaterial) {
                            blockFloorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = floorMaterial
                                    child.visible = false
                                }
                            });
                            group.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.visible = true
                                }
                            });
                            lastRoom = null
                        }
                        else {
                            blockFloorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = floorMaterial
                                    child.visible = true
                                }
                            });
                            floorGroup.traverse (function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.material = selectedFloorMaterial
                                }
                            });
                        }
                    }
                    

                }
                floorGroup.add(mesh)
            }
            floorGroup.translateZ(4*floor.id+4)
            blockFloorGroup.add(floorGroup)
        }
        scene.add(blockFloorGroup)
        
        group.callback = function() {
            setVisible(group, false)
            setVisible(blockFloorGroup, true)
            floorMeshes = []
            var selectedMesh
            blockFloorGroup.traverse ( function (child) {
                if (child instanceof THREE.Mesh) {
                    floorMeshes.push(child)
                    selectedMesh = child
                }
            });
            if (selectedMesh) selectedMesh.callback(false)
        }


    }


    




    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersects

    // See https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    // Handle all clicks to determine of a three.js object was clicked and trigger its callback
    function onDocumentMouseUp(event) {
        event.preventDefault();

        if (Math.abs(mouseDownPos.x - event.clientX) + Math.abs(mouseDownPos.y - event.clientY) > 6) return

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =  - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        meshObjects = [...floorMeshes, ...blockMeshes];
        intersects = raycaster.intersectObjects(meshObjects);
        if (intersects.length && intersects.length > 0) {
            intersects[0].object.callback(false);
            console.log("HIT")
        }
        else if (lastRoom) lastRoom.callback(true)
        else console.log("NO LAST ROOM")

        // meshObjects = floorMeshes; // three.js objects with click handlers we are interested in
        // intersects = raycaster.intersectObjects(meshObjects);
        // if (intersects.length && intersects.length > 0) {
        //     intersects[0].object.callback();
        //     console.log("HIT")
        // }

    }

    function onDocumentMouseDown(event) {
        mouseDownPos.x = event.clientX
        mouseDownPos.y = event.clientY
    }    

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);

}

function setVisible(object, visible) {
    object.traverse ( function (child) {
        if (child instanceof THREE.Mesh) {
            child.visible = visible;
        }
    });
}

export default extractFloors