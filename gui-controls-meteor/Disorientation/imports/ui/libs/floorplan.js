import THREE from './three.js'

function extractFloors(file, scene, camera) {

    fetch(file)
    .then(
        function(response) {
            //Note that fetch tends to still return a 200 code
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
        console.log('Fetch Error', err);
    });

}

//Used to determine deselection when clicking away
var lastRoom
//Used for minimum delta threshhold of click
var mouseDownPos = {x:0,y:0}

function extractFloorData(data, scene, camera) {

    var flooplans = []
    var blockMeshes = []
    var floorMeshes = []

    //Put data in hierachial format
    //Block -> floor -> room
    //TODO: building -> block

    for (var floor of data.floors) floor.rooms = []
    for (var block of data.blocks) block.floors = []

    for (var room of data.rooms) {
        data.floors[room.parent].rooms.push(room)
    }

    for (var floor of data.floors) {
        data.blocks[floor.parent].floors.push(floor)
    }

    //Scale of JSON values to THREE.js values (mm -> m)
    var scale = 0.001
    //Standard floor color
    var color = 0xff0000
    //Materials
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

                //Material is used to determine object mode
                //TODO This method is not robust and needs changing
                mesh.callback = function(deselect) {
                    lastRoom = mesh
                    if (!deselect) {
                        if (mesh.material == floorMaterial) {
                            traverseMeshes(blockFloorGroup, (child) => {
                                child.material = floorMaterial
                            });
                            traverseMeshes(floorGroup, (child) => {
                                child.material = selectedFloorMaterial
                            });
                        }
                        else {
                            traverseMeshes(blockFloorGroup, (child) => {
                                child.visible = false
                            });
                            traverseMeshes(floorGroup, (child) => {
                                child.material = roomMaterial
                                child.visible = true
                            });
                            mesh.material = selectedRoomMaterial
                        }
                    }
                    else {
                        if (mesh.material == selectedFloorMaterial) {
                            traverseMeshes(blockFloorGroup, (child) => {
                                child.material = floorMaterial
                                child.visible = false
                            });
                            traverseMeshes(group, (child) => {
                                child.visible = true
                            });
                            lastRoom = null
                        }
                        else {
                            traverseMeshes(blockFloorGroup, (child) => {
                                child.material = floorMaterial
                                child.visible = true
                            });
                            traverseMeshes(floorGroup, (child) => {
                                child.material = selectedFloorMaterial
                            });
                        }
                    }
                }

                floorGroup.add(mesh)
            }
            //TODO Use floor heights
            floorGroup.translateZ(4*floor.id+4)
            blockFloorGroup.add(floorGroup)
        }
        scene.add(blockFloorGroup)


    }


    




    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersects

    ///Handles clicking of objects
    function onDocumentMouseUp(event) {
        event.preventDefault();

        //Check the movement does not exceed the minimum delta threshhold (this value is arbitrarily chosen)
        if (Math.abs(mouseDownPos.x - event.clientX) + Math.abs(mouseDownPos.y - event.clientY) > 6) return

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =  - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        meshObjects = [...floorMeshes, ...blockMeshes];
        intersects = raycaster.intersectObjects(meshObjects);
        if (intersects.length && intersects.length > 0) {
            intersects[0].object.callback(false);
            //console.log("HIT")
        }
        else if (lastRoom) lastRoom.callback(true)
        else {
            //console.log("NO LAST ROOM")
        }

    }

    //For minimum delta threshhold
    function onDocumentMouseDown(event) {
        mouseDownPos.x = event.clientX
        mouseDownPos.y = event.clientY
    }    

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);

}

//Quick method to make an object and its children visible or not visible
function setVisible(object, visible) {
    object.traverse ( function (child) {
        if (child instanceof THREE.Mesh) {
            child.visible = visible;
        }
    });
}

//Quick method to traverse object and children to find meshes
function traverseMeshes(object, f) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) f(child)
    })
}

export default extractFloors