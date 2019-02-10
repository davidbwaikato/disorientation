//import { Template } from "meteor/templating";
//import { ReactiveVar } from "meteor/reactive-var";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Sidebar from "../ui/sidebar";
import Panel from "../ui/panel";
import SidebarContent from "../ui/sidebar_content";

import THREE from "../../client/lib/three.js";
import "../../client/lib/getImageData.js";

const styles = {
    contentHeaderMenuLink: {
        backgroundColor: "transparent",
        background: "transparent",
        textDecoration: "none",
        color: "white",
        padding: 8
    },
    content: {
        padding: "16px"
    },
    switch: {
        padding: "0"
    },
    divider: {
        margin: "16px 0",
        height: 1,
        backgroundColor: "#e0e0e0"
    },
    block: {
        display: "block",
        padding: "12px 12px",
        color: "#000000",
        textDecoration: "none"
        //fontWeight: "bold"
    }
};
class Heightmap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            dragToggleDistance: 50
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.tryload();
    }

    handleChange(checked1) {
        this.props.onPullChange(checked1);
    }

    handleDrag(checked2) {
        this.props.onDragChange(checked2);
    }

    onSetOpen(open) {
        this.setState({ open });
    }

    menuButtonClick(ev) {
        ev.preventDefault();
        this.onSetOpen(!this.state.open);
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //https://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663
    async tryload() {
        while (!$("#container").size())
            await this.sleep(100);
        console.log("I'm a running");
        var renderer = this.renderer= new THREE.WebGLRenderer({
            antialias: true,
            canvas: container
        });
        Meteor.THREE = THREE;
        var scene = this.scene = new THREE.Scene();
        Meteor.scene = scene;

        var camera = this.camera =  new THREE.OrthographicCamera(
            -500,
            500,
            500,
            -500,
            0.5,
            10000
        );
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
            var texture = THREE.ImageUtils.loadTexture("demo_assets/heightmap.jpg");
            texture.flipX = true;
            var material = new THREE.MeshBasicMaterial({
                color: "#ffffff",
                map: texture,
                wireframe: true
            });
            var plane = new THREE.Mesh(geometry, material);
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
        img.src = "demo_assets/heightmap.jpg";
         this.i = 0;
        this.animate();
       
    }
    
    animate() {
        if(this.i < 10){
        requestAnimationFrame(this.animate.bind(this));
            this.i++;
        }
        //this.scene.rotation.y += 0.005;
        this.renderer.render(this.scene, this.camera);

    }
    render() {
        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
                <a
                    onClick={this.menuButtonClick}
                    href="#"
                    style={styles.contentHeaderMenuLink}
                >
                    ☰
                </a>
                <span />
            </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            sidebarClassName: "custom-sidebar-class",
            contentId: "custom-sidebar-content-id",
            open: this.state.open,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.props.pullRight,
            touchHandleWidth: this.props.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen
        };

        return (
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader}>
                    <canvas id="container" />
                </Panel>
            </Sidebar>
        );
    }
    
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
export default Heightmap;
