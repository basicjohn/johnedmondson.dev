import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import styles from "./AnimatedBackground.module.scss";

const AnimatedBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const shapes: THREE.Mesh[] = [];

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    function generateShape() {
      // Select a random shape type with higher probability for circles
      const shapeType = Math.floor(Math.random() * 5); // change the denominator to 5

      // Create geometry based on the shape type
      let geometry;
      switch (shapeType) {
        case 0: // Acute triangle
          geometry = new THREE.BufferGeometry();
          const vertices = new Float32Array([
            -0.09, -0.09, 0, 0.09, -0.09, 0, 0, 0.18, 0,
          ]);
          geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
          );
          break;
        case 1:
        case 2: // Small circle (probability increased)
          geometry = new THREE.CircleGeometry(0.03, 32);
          break;
        case 3: // Thin rectangle
          geometry = new THREE.BoxGeometry(0.012, 0.18, 0.1);
          break;
      }

      // Array of less muted colors
      const colors = [
        "#FFA7C4",
        "#FFDEA6",
        "#9BE29B",
        "#A3C8ED",
        "#E3A3E3",
        "#FFBE8A",
        "#D9B9D9",
        "#A8D6A8",
      ];

      // Choose a random color from the array
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Create shape material
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
      });

      // Create drop shadow material
      const shadowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#323232"),
      });

      // Create the shape mesh and set its position
      const shape = new THREE.Mesh(geometry, material);
      const shadowShape = new THREE.Mesh(geometry, shadowMaterial);
      shape.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, 0);
      shadowShape.position.set(
        shape.position.x + 0.02,
        shape.position.y - 0.02,
        -0.05
      );

      // Set random initial rotation
      shape.rotation.z = Math.random() * Math.PI * 2;
      shadowShape.rotation.z = shape.rotation.z;

      // Set random drift speed and rotation speed
      shape.userData.driftSpeed = new THREE.Vector2(
        Math.random() * 0.0004 - 0.0002,
        Math.random() * 0.0004 - 0.0002
      );
      shadowShape.userData.driftSpeed = shape.userData.driftSpeed;
      shape.userData.rotationSpeed = Math.random() * 0.002 - 0.001;
      shadowShape.userData.rotationSpeed = shape.userData.rotationSpeed;

      scene.add(shadowShape);
      scene.add(shape);
      shapes.push(shape);
      shapes.push(shadowShape);
    }
    for (let i = 0; i < 80; i++) {
      generateShape();
    }

    function animate() {
      shapes.forEach((shape) => {
        shape.rotation.z += shape.userData.rotationSpeed;

        shape.position.x += shape.userData.driftSpeed.x;
        shape.position.y += shape.userData.driftSpeed.y;

        // Check if the shape has reached the edges of the renderer and reverse the drift speed
        if (shape.position.x <= -1 || shape.position.x >= 1) {
          shape.userData.driftSpeed.x = -shape.userData.driftSpeed.x;
        }
        if (shape.position.y <= -1 || shape.position.y >= 1) {
          shape.userData.driftSpeed.y = -shape.userData.driftSpeed.y;
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const rootClass = "animated-background";
  return <div ref={mountRef} className={styles[rootClass]}></div>;
};

export default AnimatedBackground;