import THREE from "./three.js"
import Stats from "./stats.js"
import dat from "./dat.gui.js"
import trilaterate from "./trilateration.js"
import "./det-poi.js"

import history from "../../../client/history";

Meteor.THREE = THREE

var orbit;
    var q;
    var scene;
    var svgPaths;

var locationMarker
var setAtCoords
// once everything is loaded, we run our Three.js stuff.
function init() {
    var stats = initStats();
    scene = new THREE.Scene();
    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer({antialias:true});
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;
    //var shape = createMesh(new THREE.ShapeGeometry(drawShape()));console.log("FIRST SHAPE");console.log(shape)
    // add the sphere to the scene
    //scene.add(shape);
    // position and point the camera to the center of the scene
    camera.position.x = -80;
    camera.position.y = 80;
    camera.position.z = 80;
    camera.up.set(0, 0, 1)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(0, 0, 10)
    spotLight.intensity = 0.7;
    //spotLight.target = shape;
    scene.add(spotLight);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    //cube.position.set(-10, 0, 0)
    scene.add( cube );
    window.cube = cube

    var cube2 = new THREE.Mesh(new THREE.BoxGeometry( 10, 10, 10 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ))
    scene.add(cube2)
    var cube3 = new THREE.Mesh(new THREE.BoxGeometry( 10, 10, 10 ), new THREE.MeshBasicMaterial( {color: 0x0000ff} ))
    scene.add(cube3)

    var cubeR = new THREE.Mesh(new THREE.BoxGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ))
    scene.add(cubeR)
    var cubeG = new THREE.Mesh(new THREE.BoxGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( {color: 0x00ff00} ))
    scene.add(cubeG)
    var cubeB = new THREE.Mesh(new THREE.BoxGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( {color: 0x0000ff} ))
    scene.add(cubeB)
    var cubeM = new THREE.Mesh(new THREE.BoxGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( {color: 0xff00ff} ))
    scene.add(cubeM)

    // add the output of the renderer to the html element
    Meteor.map3dWebGLRenderer = webGLRenderer
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    }

    orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);
    orbit.maxPolarAngle = 1.5
    orbit.enableTwoFingerZoomPan = true
    // call the render function
    var step = 0;      

            
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

    // var getRelative = function(p, q, r, s, b, c) {
    //     m = r - p
    //     n = s - q
    //     a = Math.sqrt(m*m, n*n)
    //     beta = (a*a + c*c - b*b)/(2*a*c)
    //     mu = Math.atan2(n, m)
    //     theta = 180 - beta - mu
    //     k = c*Math.cos(theta)
    //     l = c*Math.sin(theta)
    //     i = k - m
    //     j = l - n
    //     x = r + i
    //     y = s + j
    //     return {x: x, y: y}
    // }

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

    function getTrilateration(p1, p2, p3) {
        p1.z = 0
        p2.z = 0
        p3.z = 0
        var p4
        var multiplierValue = 1.005
        var multiplier = multiplierValue
        p4 = trilaterate(p1, p2, p3, true)
        if (p4) return p4
        for (var i=0; i<10; i++) {
            p1.r *= multiplier
            p4 = trilaterate(p1, p2, p3, true)
            p1.r /= multiplier
            if (p4) return p4
            p2.r *= multiplier
            p4 = trilaterate(p1, p2, p3, true)
            p2.r /= multiplier
            if (p4) return p4
            p3.r *= multiplier
            p4 = trilaterate(p1, p2, p3, true)
            p3.r /= multiplier
            if (p4) return p4
            multiplier *= multiplierValue
        }
        console.log("Trilateration failed")
        return null
    }

    //The origin on the G1 floorplan
    var  g1o = {x: 38069.4879/1000, y: 20002.2851/1000}

    //Reference points on G1
    p1 = {x: 8934.4879/1000, y: -9132.7199/1000, z: 0, r: 141.57}
    p2 = {x: 38504.4879/1000, y: -9132.7199/1000, z: 0, r: 147.26}
    p3 = {x: 38504.4879/1000, y: 20437.2851/1000, z: 0, r: 117.63}

    var rgp = getTrilateration(p1, p2, p3)

    //console.log(rgp)

    var cy = (-rgp.x + g1o.x)
    var cx = (rgp.y - g1o.y)

    //Marks roundabout point from trilateration
    cube.position.set(cx, cy, 0)

    //cube2.position.set(rgp.y, -rgp.x, 1000000)
    //cube3.position.set(0,0,1000000)

    //Mark G1 points
    cubeR.position.set(p1.y - g1o.y, -p1.x + g1o.x, 0)
    cubeG.position.set(p2.y - g1o.y, -p2.x + g1o.x, 0)
    cubeB.position.set(p3.y - g1o.y, -p3.x + g1o.x, 0)

    //Marks othe point on G1
    cubeM.position.set((-13842.7149/1000) - g1o.y, -23769.4879/1000 + g1o.x, 0)



    //Using google map

    // {
    //     //Measurements of roundabout on the Campus Map
    //     rmx = 1203
    //     rmy = (918-229)

    //     gc = {x: 440+3, y: 282+5}

    //     //Ratio of metres/pixels
    //     var squareRatio = 20/109//100/105.867

    //     var planeGeometry = new THREE.PlaneGeometry(squareRatio*1555, squareRatio*918, 1, 1);
    //     var texture = new THREE.TextureLoader().load( './data/gmap.PNG' );
    //     var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
    //     //var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    //     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //     //plane.receiveShadow = true;
    //     // rotate and position the plane
    //     //plane.rotation.x = -0.5 * Math.PI;
    //     plane.position.set(planeGeometry.parameters.width/2 - (20002.2851 - -9132.4879)/1000 - gc.x*squareRatio, planeGeometry.parameters.height/2 + (38069.4879 - 8934.4879)/1000 - (918-gc.y)*squareRatio, 0);
    //     //plane.position.set(planeGeometry.parameters.width/2 - rmx*squareRatio + cx, planeGeometry.parameters.height/2 - rmy*squareRatio + cy, 0);
    //     // add the plane to the scene
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

        var planeGeometry = new THREE.PlaneGeometry(squareRatio*1514.960, squareRatio*1237.760, 1, 1);
        var texture = new THREE.TextureLoader().load( './data/map.png' );
        var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
        //var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        // rotate and position the plane
        //plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(planeGeometry.parameters.width/2 - 811.02*squareRatio - (20002.2851 - -9132.4879)/1000, planeGeometry.parameters.height/2 - 263.18*squareRatio + (38069.4879 - 8934.4879)/1000, 0);
        //plane.position.set(planeGeometry.parameters.width/2 - rmx*squareRatio + cx, planeGeometry.parameters.height/2 - rmy*squareRatio + cy, 0);
        // add the plane to the scene
        scene.add(plane);
    }


    let latRatio = 0.11131949052531577*1000000  //Metres/degrees
    let lngRatio = 0.08797305976967*1000000 //Metres/degrees

    let rcx = -37.788739
    let rcy = 175.319027

    nc = {lat: -37.788830, lng: 175.317420}
    console.log((nc.x - rcx)*lngRatio,  (nc.y - rcy)*latRatio)
    cube.position.set(cx + (nc.lng - rcy)*lngRatio, cy + (nc.lat - rcx)*latRatio, 0)

    setAtCoords = function(o, lng, lat) {
        o.position.set(cx + (lng - rcy)*lngRatio, cy + (lat - rcx)*latRatio, 0)
    }





    // if (window.poi == null) window.poi = {}
    // window.poi.markers = []
    // for (var f of window.poi.points.features) {
    //     if (f.properties.category == ""||true//"AED Defibrillators"
    //     ) {
    //         var marker = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
    //         setAtCoords(marker, f.geometry.coordinates[0], f.geometry.coordinates[1])
    //         scene.add( marker );
    //         marker.callback = function() {this.position.set(this.position.x, this.position.y, this.position.z + 1)}
    //         window.poi.markers.push(marker)
    //         //console.log("DEFIB")
    //     }
    // }
    // //console.log("FEATURES")

    var videoLocations = [
        ["https://youtu.be/5gECD9ocfkE", -37.788803, 175.318808],
    ]
    for (var videoLocation of videoLocations) {
        var sphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 32, 32 ), new THREE.MeshPhongMaterial( {color: 0x00ff00, shininess: 100, metal: true} ));
        //setAtCoords(sphere, 175.317491, -37.788809)
        setAtCoords(sphere, videoLocation[2], videoLocation[1])
        sphere.callback = function() {
            Meteor.appstate.videoLink = videoLocation[0]
            history.push("/video")
        }
        scene.add(sphere)
        console.log(sphere)
    }


    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersects

    

    // See https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    // Handle all clicks to determine of a three.js object was clicked and trigger its callback
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

    // {
    //     var marker = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
    //     setAtCoords(marker, f.geometry.coordinates[0], f.geometry.coordinates[1])
    //     scene.add( marker );
    //     marker.callback = function() {this.position.set(this.position.x, this.position.y, this.position.z + 1)}
    //     window.poi.markers.push(marker)
        
    // }

    locationMarker = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
    scene.add(locationMarker)
    locationMarker.position.set(0, 0, 1000000)



    //var qwe = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );
    //qwe.position.set(-8, 32, 0)

    // var pg = new THREE.PlaneGeometry(100, 100);
    // var pm = new THREE.MeshLambertMaterial({});
    // var  p = new THREE.Mesh(pg, pm);
    // scene.add(p)



    //POLYLINES
    
    var m = new FloorplanManager();
    
    //var g-b = new Floorplan('./data/G-B.json').relativeTo(null, 142595.0645, -207485.7364, 90).level(-1)
    
    var filter_1 = new RectangleFloorplanFilter(-50000, -50000, 100000, 100000, true);
    
    var g_b = new Floorplan('./data/G-B.json').position(142595.0645, -207485.7364).angle(90).level(-1).build(m)
    var g_g = new Floorplan('./data/G-G.json').position(529327.655, -34219.737).angle(90).level(0).build(m)
    var g_1 = new Floorplan('./data/G-1.json').position(38069.4879, 20002.2851).angle(90).level(1).filter(filter_1).build(m)
    var g_2 = new Floorplan('./data/G-2.json').position(1240906.4223, 1581547.1668).angle(90).level(2).build(m)
    var g_3 = new Floorplan('./data/G-3.json').position(-538076.7921, 491647.7904).angle(90).level(3).filter(filter_1).build(m)
    
    //349210176.381, 598963531.956
    var fg = new Floorplan('./data/FG.json').position(349210176.381, 598963531.956).angle(21.93).build();
    var fg_g = Floorplan.derive(fg).position(349210176.381, 598963531.956).angle(22.9).level(0).filter(filter_1).build(m);
    var fg_1 = Floorplan.derive(fg).position(349310176.381, 598963531.956).angle(22.9).level(1).filter(filter_1).build(m);//Check angle
    var fg_2 = Floorplan.derive(fg).position(349410176.381, 598963531.956).angle(22.9).level(2).filter(filter_1).build(m);
    var fg_3 = Floorplan.derive(fg).position(349510176.381, 598963531.956).angle(22.9).level(3).filter(filter_1).build(m);
    var fg_r = Floorplan.derive(fg).position(349610176.381, 598963531.956).angle(22.9).level(4).filter(filter_1).build(m);
    
    var f_1 = new Floorplan('./data/F-1.json').relativeTo(fg, 349217463.945, 598973706.902, 167).position(-2444.3800, 28363.1630).angle(315).level(1).filter(new RectangleFloorplanFilter(0,0,0,0,true)).build(m);
    var f_2 = new Floorplan('./data/F-2.json').relativeTo(fg, 349217463.945, 598973706.902, 167).position(-350790.5917, -16451.1166).angle(315).level(2).filter(new RectangleFloorplanFilter(0,0,0,0,true)).build(m);
    var f_3 = new Floorplan('./data/F-3.json').relativeTo(fg, 349217463.945, 598973706.902, 167).position(-317011.9656, -23472.4177).angle(315).level(3).filter(new RectangleFloorplanFilter(0,0,0,0,true)).build(m);
    
    //var ef_1 = new Floorplan('./data/EF-1.json').relativeTo(f_1, 147.1866, -3760.9569).position(70277.1410, 7202.2131).angle(327.86).level(1).build(m);



                            
            

    render();
    function drawShape() {
        var svgString = document.querySelector("#batman-path").getAttribute("d");
        var shape = transformSVGPathExposed(svgString);
                    console.log("SHAPE")
                    console.log(shape)
        // return the shape
        return shape;
    }
    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));
        // assign two materials
        var meshMaterial = new THREE.MeshPhongMaterial({color: 0x333333, shininess: 100, metal: true});
        var mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.scale.x = 0.1;
        mesh.scale.y = 0.1;
        mesh.rotation.z = Math.PI;
        mesh.rotation.x = -1.1;
        return mesh;
    }
    function render() {
        window.blah = "bloop"
        stats.update();
        //shape.rotation.y = step += 0.005;
        orbit.update();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
    function initStats() {
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        //document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }
}
    
export function preinit() {
    
    if (Meteor.map3dWebGLRenderer) {
        document.getElementById("WebGL-output").appendChild(Meteor.map3dWebGLRenderer.domElement);
    }
    else {
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();
        init()
    }

}
    
//window.onload = preinit;
    
    
    
function drawFloor(file, _offX, _offY, _level) {
    
    let offX = _offX;
    let offY = _offY;
    let level = _level;
    
    extractPolylines(file, function(polylines) {
                
        tx=0;
        ty=0;
        tn=0;
        for (polyline of polylines) for (p of polyline) {
            tx += p.x;
            ty += p.y;
            tn++;
        }
        
        
        tx = offX;
        ty = offY;
        tn = 1;
        
        
        scale = 1000;
        for (polyline of polylines) for (p of polyline) {
            p.x = p.x/scale - tx/tn/scale;
            p.y = p.y/scale - ty/tn/scale;
        }
        
        console.log(polylines)
        
        var material = new THREE.MeshBasicMaterial( {
            color: new THREE.Color(0x000000),
            side: THREE.DoubleSide,
            depthWrite: false,
            transparent: true,
            opacity: 0.5
        } );
        
        var height = level * 4;
        var group = new THREE.Group();
        var a=0;
        for (polyline of polylines) {
        a++;//if (a>4)break;

            if (polyline.length == 76) continue;
            
            var shape = new THREE.Shape(polyline)
            var geometry = new THREE.ShapeBufferGeometry( shape );
            var mesh = new THREE.Mesh( geometry, material );
            mesh.translateZ(height)
            //if (file == './data/FG.json') mesh.rotateZ((90-21.93)*Math.PI/180);
            group.add( mesh );
        
        }
        
        scene.add(group);
            
            
    });
}	
    
    
function extractPolylines(file, success) {

    fetch(file)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
//console.log(response)
            // Examine the text in the response
            response.json().then(function(data) {
                ap = data.filter(o => o.layer == "AREA-PLINE");
                //console.log(ap)
                polylines = [];
                pl = [];
                rcl = 0;
                for (var i=0;i<ap.length;i++) {
                    if (ap[i].type == "POLYLINE") {
                        points = [];
                        for (v of ap[i].vertices) points.push(new THREE.Vector2(v.x, v.y));
                        polylines.push(points);
                    }
                    else if (ap[i].type == "LINE") {
                        if (pl.length != 0) {
                            if (ap[i].start.x != pl[pl.length - 1].x && ap[i].start.y != pl[pl.length - 1].y) {
                                //polylines.push(pl);
                                pl = [];
                                rcl++;
                            }
                        }
                        else {
                            pl.push(ap[i].start);
                        }
                        pl.push(ap[i].end);
                    }
                }
                if (pl.length != 0) {
                    //polylines.push(pl);
                    rcl++;
                }
                
                success(polylines);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

}




class Floorplan {

    constructor(plan) {
    
        this.x = 0;
        this.y = 0;
        this.posX = 0;
        this.posY = 0;
        this.relX = 0;
        this.relY = 0;
        this.rotation = 0;
        this.floorLevel = 0;
        
        this.fromFile = false;
        this.isTemplate = false;
        
        this.filters = []
        
        this.loadListeners = []
        this.loaded = false;
        
        this.polylines = []
        this.filteredPolylines = [];
    
        this.source = plan;
        if (typeof plan == 'string') {
            this.fromFile = true;
        }
    }
    
    filter(f) {
        this.filters.push(f)
        return this;
    }
    
    static derive(floorplan) {
        return new Floorplan(floorplan);
    }
    
    relativeTo(floorplan, x, y, angle) {//relto
        if (x == undefined) {
            x = floorplan.x;
            y = floorplan.y;
        }
        
        //var dx = x - floorplan.x;
        //var dy = y - floorplan.y;
        //console.log("RELATIVETO: "+dx+" "+dy);
        //var t = -floorplan.rotation;
        //this.x = floorplan.x + (dx*Math.cos(t) + dy*Math.sin(t));
        //this.y = floorplan.y + (dx*Math.sin(t) - dy*Math.cos(t));
        
        //console.log(this.x+" "+this.y)
        
        var dx = x - floorplan.x;
        var dy = y - floorplan.y;
        
        var phi = Math.atan2(floorplan.y, floorplan.x);
        
        var l = Math.sqrt(dx*dx + dy*dy)
        
        //dx = x;
        //dy = y;
        
        console.log("DELTA:"+dx+" "+dy);
        
        var theta = Math.atan2(dy, dx);
        
        //var a =this.rotation-180+theta*180/Math.PI-floorplan.rotation
        
        var a = 90 + theta*180/Math.PI + floorplan.rotation
        console.log("ROT:"+floorplan.rotation+" "+a)
        //if (floorplan.rotation == 21.93) a += 2;
        if (floorplan.rotation == 315) a+= 180;
        //var a = angle;
        
        this.x = floorplan.relY*1 + l*Math.cos(a/180*Math.PI)//floorplan.rotation/180*Math.PI);
        this.y = floorplan.relX*1 + l*Math.sin(a/180*Math.PI)//floorplan.rotation/180*Math.PI);
        
        console.log("RELTO"+this.x+" "+this.y+" "+theta+" "+l)
        console.log("THETA:"+(theta*180/Math.PI))
        console.log("PHI:"+(phi*180/Math.PI)+" "+Math.atan2(y, x)*180/Math.PI+" "+this.rotation)
        
        this.relX = this.x;
        this.relY = this.y;

        console.log(floorplan.relY, floorplan.relX)

        

        
        
        return this;//113.5,22,315,54.4;59.8
    }
    
    position(x, y) {
        this.posX += x;
        this.posY += y;
        this.x += x;
        this.y += y;

        var m = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 50 ), new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );
        m.position.set(-this.x/1000, this.y/1000, 0)
        console.log(m.position)
        scene.add(m)

        return this;
    }
    
    angle(rotation) {
        this.rotation = rotation;
        return this;
    }
    
    level(level) {
        this.floorLevel = level;
        return this;
    }
    
    completeLoadListeners() {
        this.loaded = true;
        for (var floorplan of this.loadListeners) this.completeLoad(floorplan);
        this.loadListeners = [];
    }
    
    completeLoad(floorplan) {
        floorplan.copyFloorplan(this);
        floorplan.filterPolylines();
        if (!floorplan.isTemplate) {
            floorplan.drawPolylines(0x000000);
            floorplan.polylines = floorplan.filteredPolylines
            floorplan.drawPolylines(0xff0000);
        }
        floorplan.completeLoadListeners();
    }
    
    addLoadListener(floorplan) {
        if (this.loaded) this.completeLoad(floorplan);
        else this.loadListeners.push(floorplan);
    }
    
    copyFloorplan(floorplan) {
        for (var polyline of floorplan.polylines) {
            var newPolyline = []
            for (var p of polyline) newPolyline.push(p.clone());
            this.polylines.push(newPolyline)
        }
        this.source = floorplan.source;
    }
    
    build(manager) {
    
        if (this.fromFile) {
            this.extractFloor(this.source);
        }
        else {
            this.source.addLoadListener(this);
        }
    
        if (manager == null || manager == undefined) this.isTemplate = true;
        else manager.register(this);
        
        return this;
    }
    
    applyFilters(polyline) {
        for (var f of this.filters) if (!f.filter(polyline, this)) return false;
        return true;
    }
    
    extractFloor(file) {
    
        let posX = this.posX;
        let posY = this.posY;
        let level = this.floorLevel;
        
        let thisObj = this;
        
        extractPolylines(file, function(polylines) {
        
            thisObj.polylines = polylines;
            thisObj.filterPolylines();
            if (!thisObj.isTemplate) {
                thisObj.drawPolylines(0x000000);
                thisObj.polylines = thisObj.filteredPolylines;
                thisObj.drawPolylines(0xff0000);
            }
            thisObj.completeLoadListeners();
            
        });
    
    }
    
    filterPolylines() {
        for (var p=this.polylines.length-1; p>=0; p--) {
            var success = this.applyFilters(this.polylines[p]);
            if (!success) {
                this.polylines.splice(p, 1);
            }
        }
    }
    
    drawPolylines(color) {
        
        var scale = 1000;
        for (var polyline of this.polylines) for (var p of polyline) {
            p.x = p.x/scale - this.x/scale;
            p.y = p.y/scale - this.y/scale;
        }
        //console.log(this.x+" "+this.y)
        //console.log(this.polylines)
        
        var material = new THREE.MeshPhongMaterial( {
            color: new THREE.Color(color),
            side: THREE.DoubleSide,
            depthWrite: false,
            transparent: true,
            opacity: 0.5,
            shininess: 100,
        } );
        
        var height = this.floorLevel * 4;
        var group = new THREE.Group();
        var a=0;
        for (polyline of this.polylines) {
        a++;//if (a>4)break;

            if (polyline.length == 76) continue;
            
            var shape = new THREE.Shape(polyline)
            var geometry = new THREE.ShapeBufferGeometry(shape);
            var mesh = new THREE.Mesh(geometry, material);
            mesh.translateZ(height)
            mesh.rotateZ(-this.rotation/180*Math.PI)
            group.add(mesh);
        
        }
        
        scene.add(group);
    
    }
    
    

}

class FloorplanManager {
    
    constructor() {
        this.floorplans = [];
    }
    
    register(floorplan) {
        this.floorplans.push(floorplan);
    }
    
}

class FloorplanFilter {

    filter(polyline) {
        return true;
    }
    
}

class RectangleFloorplanFilter extends FloorplanFilter {	

    constructor(x, y, width, height, relative) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.relative = relative;
    }

    filter(polyline, floorplan) {
        var rx = 0;
        var ry = 0;
        if (this.relative) {
            rx = floorplan.posX;
            ry = floorplan.posY;
        }
        for (var p of polyline) {
            if (p.x > this.x + rx && p.y > this.y + ry && p.x < this.x + this.width + rx && p.y < this.y + this.height + ry) return true;
            else {
                floorplan.filteredPolylines.push(polyline);
                return false;
            }
        }
    }
    
}



export function updateLocationMarker(lng, lat) {
    if (locationMarker != null) setAtCoords(locationMarker, lng, lat);
}