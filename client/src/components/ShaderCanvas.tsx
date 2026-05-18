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

    // Fragment shader — "Liquid Glass" refraction effect
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;

      // Simplex noise for organic movement
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 g = a0 * vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw));
        float n = 130.0 * dot(m, g);
        return n;
      }

      void main(void) {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // Mouse influence
        vec2 m = (mouse * 2.0 - 1.0);
        m.y *= -1.0;
        float distToMouse = length(p - m);
        float mouseInfluence = smoothstep(1.2, 0.0, distToMouse);

        // Organic "Liquid" movement
        float t = time * 0.3;
        float noise = snoise(p * 0.8 + t * 0.2);
        
        // Refraction / Distortion map
        vec2 distortion = vec2(
          snoise(p * 1.5 + t * 0.1 + noise),
          snoise(p * 1.5 - t * 0.1 + noise)
        ) * 0.1;
        
        // Add mouse distortion
        distortion += (p - m) * mouseInfluence * 0.15;
        
        // Chromatic Aberration (RGB shift)
        float r = snoise(p + distortion * 1.1 + t * 0.05);
        float g = snoise(p + distortion * 1.0 + t * 0.05);
        float b = snoise(p + distortion * 0.9 + t * 0.05);
        
        // Apple-style color palette (Deep Oranges, Pinks, Purples)
        vec3 color1 = vec3(0.98, 0.57, 0.24); // Orange
        vec3 color2 = vec3(0.92, 0.31, 0.51); // Pink
        vec3 color3 = vec3(0.42, 0.24, 0.82); // Purple
        
        vec3 finalColor = mix(color1, color2, r);
        finalColor = mix(finalColor, color3, g * 0.5 + b * 0.5);
        
        // Liquid glass highlights
        float highlight = smoothstep(0.4, 0.5, noise) * 0.15;
        finalColor += highlight;
        
        // Darken for background use
        finalColor *= 0.15;
        
        // Vignette
        float vignette = smoothstep(1.5, 0.5, length(p));
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
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
