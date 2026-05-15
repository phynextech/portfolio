import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DBackground = ({ scrollProgress }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000008, 0.018);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ---- LIGHTING ----
    scene.add(new THREE.AmbientLight(0x080820, 3));

    const cyanLight = new THREE.PointLight(0x00eeff, 4, 60);
    cyanLight.position.set(0, 0, 5);
    scene.add(cyanLight);

    const orangeLight = new THREE.PointLight(0xff6600, 3, 50);
    orangeLight.position.set(0, 0, -25);
    scene.add(orangeLight);

    const pinkL = new THREE.PointLight(0xff00aa, 2, 40);
    pinkL.position.set(-8, 0, 0);
    scene.add(pinkL);

    const pinkR = new THREE.PointLight(0xaa00ff, 2, 40);
    pinkR.position.set(8, 0, 0);
    scene.add(pinkR);

    // ---- NEON TUNNEL ----
    const tunnelGeo = new THREE.CylinderGeometry(10, 10, 80, 24, 20, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x001833,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.rotation.x = Math.PI / 2;
    scene.add(tunnel);

    // Rings
    const ringColors = [0x00eeff, 0xff4400, 0x00eeff, 0xaa00ff, 0x00eeff, 0xff6600];
    const rings = [];
    for (let i = 0; i < 12; i++) {
      const ringGeo = new THREE.TorusGeometry(10, 0.04, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.55,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -i * 6 + 10;
      scene.add(ring);
      rings.push(ring);
    }

    // Floors
    const floorGeo = new THREE.PlaneGeometry(20, 80, 10, 30);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x003355,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -10, -20);
    scene.add(floor);

    const ceilMesh = floor.clone();
    ceilMesh.position.set(0, 10, -20);
    ceilMesh.rotation.x = Math.PI / 2;
    scene.add(ceilMesh);

    // ---- PRISM ----
    const prismGeo = new THREE.ConeGeometry(2.6, 5.0, 3, 1, false);
    const prismMat = new THREE.MeshPhongMaterial({
      color: 0x112255,
      emissive: 0x0a0a40,
      specular: 0xffffff,
      shininess: 180,
      transparent: true,
      opacity: 0.82,
      flatShading: true,
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.set(0, 0, 4);
    scene.add(prism);

    const prismWireGeo = new THREE.ConeGeometry(2.6, 5.0, 3, 1, false);
    const prismWireMat = new THREE.MeshBasicMaterial({
      color: 0x00ffee,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const prismWire = new THREE.Mesh(prismWireGeo, prismWireMat);
    prismWire.position.copy(prism.position);
    scene.add(prismWire);

    const coreGeo = new THREE.OctahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x00ccff,
      emissive: 0x004488,
      specular: 0xffffff,
      shininess: 200,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.copy(prism.position);
    scene.add(core);

    // Particles
    const pCount = 400;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 2] = (Math.random()) * -60;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x88ddff,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);

    let mouseX = 0, mouseY = 0;
    let camX = 0, camY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let ringOffset = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Mouse Parallax
      camX += (mouseX * 1.5 - camX) * 0.04;
      camY += (-mouseY * 1.0 - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      
      // We will access window.scrollY to get scroll offset easily
      const scrollZ = (window.scrollY / window.innerHeight) * 30;
      camera.position.z = 18 - scrollZ;
      camera.lookAt(0, 0, camera.position.z - 20);

      // Rings
      ringOffset += 0.05;
      rings.forEach((ring, i) => {
        ring.position.z = (((-i * 6 + 10 + ringOffset) % 72) - 36) + 6;
        ring.material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
        const hue = (time * 0.05 + i * 0.15) % 1;
        ring.material.color.setHSL(hue, 1, 0.6);
      });

      // Prism
      prism.rotation.y = time * 0.3;
      prismWire.rotation.y = prism.rotation.y;
      const hue = (time * 0.1) % 1;
      prismMat.emissive.setHSL(hue, 0.8, 0.15);
      prismWireMat.color.setHSL((hue + 0.33) % 1, 1, 0.7);

      core.rotation.y = -time * 0.7;
      core.rotation.x = time * 0.5;
      core.scale.setScalar(1 + Math.sin(time * 3) * 0.08);
      coreMat.emissive.setHSL((hue + 0.5) % 1, 1, 0.3);

      prism.position.y = Math.sin(time * 0.6) * 0.2;
      prismWire.position.y = prism.position.y;
      core.position.y = prism.position.y;

      cyanLight.color.setHSL((time * 0.07) % 1, 1, 0.6);
      pinkL.color.setHSL((time * 0.05 + 0.8) % 1, 1, 0.5);

      pts.rotation.z = time * 0.01;

      // Fade canvas on scroll
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      canvas.style.opacity = Math.max(0, 1 - progress * 1.5);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
        pointerEvents: 'none',
        background: '#000008'
      }} 
    />
  );
};

export default Hero3DBackground;
