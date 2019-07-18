import React, { Component, RefObject, createRef } from 'react';
import styled from 'styled-components';
import { Scene, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera } from 'three';

const video = document.createElement('video');
let camera: PerspectiveCamera;
let cube: Mesh;
let gyro: Gyroscope;
let renderer: WebGLRenderer;
let scene: Scene;
let videoStream: MediaStream;

function doFrame(): void {
    requestAnimationFrame(doFrame);
    if (gyro) {
        cube.rotation.x = gyro.x;
        cube.rotation.y = gyro.y;
        cube.rotation.z = gyro.z;
    }
    renderer.render(scene, camera);
}

export default async () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    document.body.appendChild(video);

    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;
    video.play();
    // requestAnimationFrame(() => this.doFrame());
    scene = new Scene();
    camera = new PerspectiveCamera(75, video.clientWidth / video.clientHeight, 0.1, 1000);
    renderer = new WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(video.clientWidth, video.clientHeight);
    document.body.appendChild(renderer.domElement);
    cube = new Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    doFrame();

    if ('Gyroscope' in window) {
        gyro = new Gyroscope();
        gyro.start();
    } else {
        window.addEventListener('devicemotion', e => {
            
        });
    }
};