import THREE from "./three.js"
import trilaterate from "./trilateration.js"
import "./det-poi.js"

import history from "../../../client/history";

//Where floorplan processing is done
//TODO: Perhaps this should be merged 
import extractFloors from './floorplan.js'

Meteor.THREE = THREE //Only for testing convenience

var orbit;
var scene;

var locationMarker
var setAtCoords

function init() {
    scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer({antialias:true});
    webGLRenderer.setClearColor(new THREE.Color(0x87CEEB));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = -80;
    camera.position.y = 80;
    camera.position.z = 80;
    camera.up.set(0, 0, 1)
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(10, 10, 10)
    spotLight.intensity = 0.7;
    //spotLight.target = shape;
    scene.add(spotLight);
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    // add the output of the renderer to the html element
    Meteor.map3dWebGLRenderer = webGLRenderer
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    //TODO Check if this actually does anything
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    }

    //Orbit controls
    orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);
    orbit.maxPolarAngle = 1.5
    orbit.enableTwoFingerZoomPan = true
    window.orbit = orbit    //For testing convenience 

    
    /**
     * SVG LOADING OF CAMPUS MAP, NOT CURRENTLY OPERATIONAL DUE TO THREE.JS PARSING ISSUES
     */

    // //SVG LOADER

    //  var loader = new THREE.SVGLoader();

    // // load a SVG resource
    // loader.load(
    //     // resource URL
    //     'data/Campus_Map.svg',
    //     // called when the resource is loaded
    //     function (paths) {

    //         var group = new THREE.Group();

    //         for (var i = 0; i < paths.length; i++) {

    //             var path = paths[i];

    //             var material = new THREE.MeshBasicMaterial({
    //                 color: path.color,
    //                 side: THREE.DoubleSide,
    //                 depthWrite: false
    //             });

    //             var shapes = path.toShapes(true);

    //             for (var j = 0; j < shapes.length; j++) {

    //                 var shape = shapes[j];
    //                 var geometry = new THREE.ShapeBufferGeometry(shape);
    //                 var mesh = new THREE.Mesh(geometry, material);
    //                 mesh.scale.set(0.1,0.1,0.1)
    //                 group.add(mesh);

    //             }

    //         }
    //         scene.add(group);

    //     },
    //     // called when loading is in progresses
    //     function () {},
    //     // called when loading has errors
    //     function (error) {console.log('SVG load failed');}
    // );



    /**
     * TRILATERATION EXPERIMENT FOR POSITIONING BUILDINGS, CURRENTLY DEPRECATED
     */

    // function getTrilateration(position1, position2, position3) {
    //     var xa = position1.x;
    //     var ya = position1.y;
    //     var xb = position2.x;
    //     var yb = position2.y;
    //     var xc = position3.x;
    //     var yc = position3.y;
    //     var ra = position1.distance;
    //     var rb = position2.distance;
    //     var rc = position3.distance;

    //     var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
    //     var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
    //     var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
    //     var x = ((y * (ya - yb)) - T) / (xb - xa);

    //     return {
    //         x: x,
    //         y: y
    //     };
    // }

    // var q = trilaterate
    // trilaterate = function(p1, p2, p3, merge) {
    //     console.log(p1.r+" "+p2.r+" "+p3.r)
    //     q(p1, p2, p3, merge)
    // }

    // function getTrilateration(p1, p2, p3) {
    //     p1.z = 0
    //     p2.z = 0
    //     p3.z = 0
    //     var p4
    //     var multiplierValue = 1.005
    //     var multiplier = multiplierValue
    //     p4 = trilaterate(p1, p2, p3, true)
    //     if (p4) return p4
    //     for (var i=0; i<10; i++) {
    //         p1.r *= multiplier
    //         p4 = trilaterate(p1, p2, p3, true)
    //         p1.r /= multiplier
    //         if (p4) return p4
    //         p2.r *= multiplier
    //         p4 = trilaterate(p1, p2, p3, true)
    //         p2.r /= multiplier
    //         if (p4) return p4
    //         p3.r *= multiplier
    //         p4 = trilaterate(p1, p2, p3, true)
    //         p3.r /= multiplier
    //         if (p4) return p4
    //         multiplier *= multiplierValue
    //     }
    //     console.log("Trilateration failed")
    //     return null
    // }

    // //The origin on the G1 floorplan
    // var  g1o = {x: 38069.4879/1000, y: 20002.2851/1000}

    // //Reference points on G1
    // p1 = {x: 8934.4879/1000, y: -9132.7199/1000, z: 0, r: 141.57}
    // p2 = {x: 38504.4879/1000, y: -9132.7199/1000, z: 0, r: 147.26}
    // p3 = {x: 38504.4879/1000, y: 20437.2851/1000, z: 0, r: 117.63}

    // var rgp = getTrilateration(p1, p2, p3)

    // //console.log(rgp)

    // var cy = (-rgp.x + g1o.x)
    // var cx = (rgp.y - g1o.y)

    // //Marks roundabout point from trilateration
    // cube.position.set(cx, cy, 0)

    // //cube2.position.set(rgp.y, -rgp.x, 1000000)
    // //cube3.position.set(0,0,1000000)

    // //Mark G1 points
    // cubeR.position.set(p1.y - g1o.y, -p1.x + g1o.x, 0)
    // cubeG.position.set(p2.y - g1o.y, -p2.x + g1o.x, 0)
    // cubeB.position.set(p3.y - g1o.y, -p3.x + g1o.x, 0)

    // //Marks othe point on G1
    // cubeM.position.set((-13842.7149/1000) - g1o.y, -23769.4879/1000 + g1o.x, 0)

    /**
     * END OF TRILATERATION EXPERIMENT
     */





    /**
     * NOTE ON THE ROUNDABOUT:
     * THE ROUNDABOUT BETWEEN G BLOCK AND THE MANAGEMENT SCHOOL IS USED AS THE ORIGIN
     */


    // //Using google map

    // {
    //     //Measurements of roundabout on the Campus Map
    //     rmx = 1203
    //     rmy = (918-229)

    //     //Ratio of metres/pixels
    //     var squareRatio = 20/109

    //     //Create plane
    //     var planeGeometry = new THREE.PlaneGeometry(squareRatio*1555, squareRatio*918, 1, 1); //squareRatio*value scales the map to its actual size in metres
    //     var texture = new THREE.TextureLoader().load( './data/gmap.PNG' );
    //     var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
    //     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //     plane.receiveShadow = true;
    //     plane.position.set(planeGeometry.parameters.width/2 - rmx*squareRatio, planeGeometry.parameters.height/2 - rmy*squareRatio, 0)   //(Untested, coordinate system may be incorrect)
    //     scene.add(plane);
    // }



    // //Using SVG map

    {
        //Measurements of roundabout on the Campus Map
        rmw = 14.49
        rmx = 962.732 + rmw/2
        rmy = 267.023 + rmw/2

        //Ratio of metres/pixels
        var squareRatio = 100/105.867

        //Create plane
        var planeGeometry = new THREE.PlaneGeometry(squareRatio*1514.960, squareRatio*1237.760, 1, 1); //squareRatio*value scales the map to its actual size in metres
        var texture = new THREE.TextureLoader().load( './data/map.png' );
        var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.position.set(planeGeometry.parameters.width/2 - rmx*squareRatio, planeGeometry.parameters.height/2 - rmy*squareRatio, 0)
        scene.add(plane);
    }



    //Ratio at local coordinates
    let latRatio = 0.11131949052531577*1000000  //Metres/degrees
    let lngRatio = 0.08797305976967*1000000 //Metres/degrees

    //Roundabout coordinates
    let rcx = -37.788739
    let rcy = 175.319027

    //Sets object at coordinates
    setAtCoords = function(o, lng, lat) {
        o.position.set((lng - rcy)*lngRatio,(lat - rcx)*latRatio, 0)
    }



    //Shows POI markers (Change 'markers' to 'buildings' for building locations)

    // if (window.poi == null) window.poi = {}
    // window.poi.markers = []
    // for (var f of window.poi.points.features) {
    //     if (f.properties.category == ""||true//Set category here, e.g. "AED Defibrillators"
    //     ) {
    //         var marker = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
    //         setAtCoords(marker, f.geometry.coordinates[0], f.geometry.coordinates[1])
    //         scene.add( marker );
    //         marker.callback = function() {this.position.set(this.position.x, this.position.y, this.position.z + 1)}  //Click increases Z
    //         window.poi.markers.push(marker)
    //     }
    // }

    /**
     * VIDEO SPHERES:
     * CLICKING THE SPHERE WILL LINK TO THE VIDEO PAGE WITH THE VIDEO AT THAT LOCATION
     */
    
    //Video locations
    //TODO: Read from a file, perhaps from floorplan editor
    var videoLocations = [
        ["https://youtu.be/5gECD9ocfkE", -37.788803, 175.318808],
    ]
    for (var videoLocation of videoLocations) {
        var sphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 32, 32 ), new THREE.MeshPhongMaterial( {color: 0x00ff00, shininess: 100, metal: true} ));
        setAtCoords(sphere, videoLocation[2], videoLocation[1])
        sphere.callback = function() {
            Meteor.appstate.videoLink = videoLocation[0]
            history.push("/video")
        }
        scene.add(sphere)
    }



    /**
     * RAYCASTER FOR CLICKING OBJECTS
     * USED FOR SPHERES AND POI MARKERS
     * TODO: NOTE THAT ALL CLICKABLES COULD BE MERGED OR LOOPED THROUGH
     * TODO: NOT QUITE FUNCTIONAL ON WIDER DESKTOP BROWSER FOR SOME REASON, INCORRECT POSITION
     */

     //Initialise
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersects

    function onDocumentMouseDown(event) {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =  - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        meshObjects = window.poi.markers; // three.js objects with click handlers we are interested in
        intersects = raycaster.intersectObjects(meshObjects);
        if (intersects.length && intersects.length > 0) {
            intersects[0].object.callback();
        }

        meshObjects = [sphere]; // three.js objects with click handlers we are interested in
        intersects = raycaster.intersectObjects(meshObjects);
        if (intersects.length && intersects.length > 0) {
            intersects[0].object.callback();
        }

    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);



    //Geolocation marker

    locationMarker = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
    scene.add(locationMarker)
    locationMarker.position.set(0, 0, 1000000)




    //Extract and draw the floors (from floorplan.js)

    extractFloors('./data/G_block_aligned.floor', scene, camera)
            

    //Render scene

    render();

    function render() {
        orbit.update();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
}


//Entry method, should be changed at some point (bad name)
export function preinit() {
    
    //If the renderer and scene are already initialised, re-add the renderer to the new element
    //TODO: A React Component variable should probably be used for this (though this script should remain isolated from React)
    if (Meteor.map3dWebGLRenderer) {
        document.getElementById("WebGL-output").appendChild(Meteor.map3dWebGLRenderer.domElement);
    }
    else {
        init()
    }

}

//Updates geolocation marker
export function updateLocationMarker(lng, lat) {
    if (locationMarker != null) setAtCoords(locationMarker, lng, lat);
}