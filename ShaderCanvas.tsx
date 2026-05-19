/**
 * ShaderCanvas — Three.js Ripple Shader
 *
 * A full-viewport WebGL shader that renders animated ripple effects
 * with concentric circles and color gradients. Based on the 21st.dev
 * reference component, optimized for the hero section.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMobile";


export default function ShaderCanvas() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: any;
    animationId: number;
  } | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Vertex shader — pass through
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment shader — ripple effect with color gradients and mouse interaction
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // Mouse influence
        vec2 m = (mouse * 2.0 - 1.0);
        m.y *= -1.0; // flip y
        float distToMouse = length(uv - m);
        float mouseInfluence = smoothstep(0.8, 0.0, distToMouse);
        
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            float ripple = fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0;
            // Apply mouse influence to the ripple
            ripple -= mouseInfluence * 0.2;
            
            color[j] += lineWidth * float(i * i) / abs(
              ripple - 
              length(uv)
            );
          }
        }
        
        // Subtle glow around mouse
        color += vec3(0.1, 0.05, 0.0) * mouseInfluence * 0.5;
        
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `;

    // Initialize Three.js scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Optimize pixel ratio for performance - lower on mobile
    const pixelRatio = isMobile 
      ? Math.min(window.devicePixelRatio, 1.2) 
      : Math.min(window.devicePixelRatio, 2);
      
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      precision: isMobile ? "lowp" : "mediump"
    });
    renderer.setPixelRatio(pixelRatio);

    container.appendChild(renderer.domElement);

    // Apply background color
    const bgColor = 0x0a0a0a;
    renderer.setClearColor(bgColor);

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    // Initial resize
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    
    // Touch move handler
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
        mouseRef.current.y = e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    // Animation loop with frame rate throttling
    let animationId = 0;
    let lastFrameTime = 0;
    const targetFrameTime = 1000 / 60; // 60 FPS target
    
    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle to 60 FPS
      if (currentTime - lastFrameTime >= targetFrameTime) {
        uniforms.time.value += 0.016;
        
        // Smoothly update mouse uniforms
        uniforms.mouse.value.x += (mouseRef.current.x - uniforms.mouse.value.x) * 0.1;
        uniforms.mouse.value.y += (mouseRef.current.y - uniforms.mouse.value.y) * 0.1;
        
        renderer.render(scene, camera);
        lastFrameTime = currentTime;
      }
    };
    
    animate(0);

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    // Start animation
    animate(performance.now());

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);

      if (sceneRef.current) {
        cancelAnimationFrame(animationId);

        if (container && sceneRef.current.renderer.domElement.parentNode === container) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }

        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        overflow: "hidden",
        zIndex: 0,
      }}
    />
  );
}
