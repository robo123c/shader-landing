/**
 * ShaderDemo — Miniature Three.js Shader Visualizations
 *
 * A reusable component that renders different shader effects in a small canvas.
 * Each shader type illustrates a different concept:
 *
 * - "gpu-render": Particle system showing GPU-native rendering
 * - "composable": Layered color bands showing shader composition
 * - "performance": Animated grid showing frame timing
 * - "typescript": Type-safe gradient with labeled uniforms
 * - "zero-deps": Minimal geometry with clean wireframe
 * - "profiler": Heat-map style visualization
 *
 * Features:
 * - Responsive sizing with ResizeObserver
 * - Visibility-based rendering throttling (IntersectionObserver)
 * - Proper cleanup and memory management
 * - Optimized WebGL settings for small canvases
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ShaderDemoProps {
  type:
    | "gpu-render"
    | "composable"
    | "performance"
    | "typescript"
    | "zero-deps"
    | "profiler";
  width?: number;
  height?: number;
}

export default function ShaderDemo({ type, width = 280, height = 160 }: ShaderDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms?: any;
    animationId: number;
    mesh?: THREE.Mesh;
    geometry?: THREE.PlaneGeometry;
    material?: THREE.ShaderMaterial;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let isVisible = true;
    let animationId = 0;

    // Initialize Three.js
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    let uniforms: any = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(width, height) },
    };

    let vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;
    let fragmentShader = "";

    // Define shaders based on type
    switch (type) {
      case "gpu-render":
        // Particle system effect
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            vec3 color = vec3(0.0);
            
            for(int i = 0; i < 5; i++) {
              float x = sin(time * 0.5 + float(i)) * 0.3 + 0.5;
              float y = cos(time * 0.3 + float(i) * 1.5) * 0.3 + 0.5;
              float dist = distance(uv, vec2(x, y));
              color += vec3(0.2, 0.8, 1.0) / (dist * 5.0 + 0.1);
            }
            
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        break;

      case "composable":
        // Layered color composition
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            
            vec3 layer1 = vec3(1.0, 0.4, 0.2) * sin(uv.x * 3.14159 + time * 0.5);
            vec3 layer2 = vec3(0.2, 0.8, 1.0) * cos(uv.y * 3.14159 + time * 0.3);
            vec3 layer3 = vec3(0.8, 0.2, 1.0) * sin((uv.x + uv.y) * 3.14159 + time * 0.4);
            
            vec3 composed = mix(layer1, layer2, 0.5);
            composed = mix(composed, layer3, 0.33);
            
            gl_FragColor = vec4(composed, 1.0);
          }
        `;
        break;

      case "performance":
        // Grid showing frame timing
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            
            float gridX = mod(uv.x * 10.0, 1.0);
            float gridY = mod(uv.y * 10.0, 1.0);
            float grid = step(0.05, gridX) * step(0.05, gridY);
            
            float pulse = sin(time * 2.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.1), vec3(0.2, 0.9, 0.4), pulse);
            
            gl_FragColor = vec4(color * grid, 1.0);
          }
        `;
        break;

      case "typescript":
        // Type-safe gradient
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            
            float r = sin(uv.x * 3.14159 + time * 0.3) * 0.5 + 0.5;
            float g = sin(uv.y * 3.14159 + time * 0.4) * 0.5 + 0.5;
            float b = sin((uv.x + uv.y) * 3.14159 + time * 0.5) * 0.5 + 0.5;
            
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `;
        break;

      case "zero-deps":
        // Minimal clean effect
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            
            float line = abs(sin((uv.x + uv.y) * 10.0 + time));
            vec3 color = vec3(line) * vec3(1.0, 0.6, 0.2);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        break;

      case "profiler":
        // Heat-map visualization
        fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;

          void main(void) {
            vec2 uv = gl_FragCoord.xy / resolution;
            
            float heat = sin(uv.x * 5.0 + time) * cos(uv.y * 5.0 + time * 0.7);
            heat = heat * 0.5 + 0.5;
            
            vec3 color = vec3(0.0);
            if(heat < 0.33) {
              color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), heat * 3.0);
            } else if(heat < 0.66) {
              color = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 1.0, 0.0), (heat - 0.33) * 3.0);
            } else {
              color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (heat - 0.66) * 3.0);
            }
            
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        break;
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Optimize for small canvases
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      precision: "lowp",
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    // Visibility-based rendering throttling
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    visibilityObserver.observe(container);

    // Responsive sizing with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container.parentElement) return;

      const rect = container.getBoundingClientRect();
      const newWidth = Math.max(rect.width, 1);
      const newHeight = Math.max(rect.height, 1);

      if (newWidth > 0 && newHeight > 0) {
        renderer.setSize(newWidth, newHeight);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
      }
    });
    resizeObserver.observe(container);

    // Animation loop with visibility-based throttling
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (isVisible) {
        uniforms.time.value += 0.016;
        renderer.render(scene, camera);
      }
    };

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
      mesh,
      geometry,
      material,
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();

      if (sceneRef.current && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [type, width, height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#000",
      }}
    />
  );
}
