import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./main.html";
import THREE from "./lib/three.js";
import "./lib/getImageData.js";

Meteor.startup(() => {
    if (Meteor.isCordova) {
        TTS.speak(
            {
                text: "da zdravctvuyet revolutsiya",
                locale: "fr-FR",
                rate: 0.75
            },
            function() {
                alert("success");
            },
            function(reason) {
                alert(reason);
            }
        );
    } else {
        var u = new SpeechSynthesisUtterance();
        u.voice = speechSynthesis.getVoices()[63];
        u.text = "da zdravctvuyet revolutsiya";
        // utter the utterance
        speechSynthesis.speak(u);
    }

    Meteor.THREE = THREE;
    scene = new THREE.Scene();
    Meteor.scene = scene;
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: container
    });
    camera = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.5, 10000);
    camera.position.set(500, 500, 500); //THREE.Vector3(10,10,10)
    camera.lookAt(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // terrain
    var img = new Image();
    img.onload = function() {
        //get height data from img
        var data = getHeightData(img, 1);
        var meshScale = 1;
        // plane
        var geometry = new THREE.PlaneGeometry(
            img.width,
            img.height,
            img.width * meshScale,
            img.height * meshScale
        );
        var texture = THREE.ImageUtils.loadTexture("heightmap.jpg");
        texture.flipX = true;
        var material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
            map: texture,
            wireframe: true
        });
        plane = new THREE.Mesh(geometry, material);
        console.log(plane.geometry.vertices.length);
        console.log(data.length);
        console.log(img.width * img.height);

        //set height of vertices
        var added = 0;
        for (var i = 0; i < plane.geometry.vertices.length; i++) {
            //plane.geometry.vertices[i].z = plane.geometry.vertices[i].y;
            if (i % 1537 == 0) added++;
            plane.geometry.vertices[i].z = data[i + added];
        }
        scene.add(plane);
    };
    // load img source
    img.src = "heightmap.jpg";
    animate();
});
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
    //console.log(renderer);
}

function getHeightData(img, scale) {
    if (scale == undefined) scale = 100;

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    for (var i = 0; i < size; i++) {
        data[i] = 0;
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var all = pix[i] + pix[i + 1] + pix[i + 2];
        data[j++] = all / (12 * scale);
    }

    return data;
}
