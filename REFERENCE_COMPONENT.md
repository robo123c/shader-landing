# Reference: 21st.dev Shader Animation Component

This is a Three.js-based shader animation component that creates animated ripple effects with concentric circles and color gradients.

## Key Implementation Details

The reference component uses:
- **Three.js** for WebGL rendering
- **Custom fragment shader** that creates ripple/wave effects
- **Uniform updates** for time-based animation
- **Responsive sizing** with window resize handling
- **Cleanup** to prevent memory leaks

## Fragment Shader Logic

```glsl
#define TWO_PI 6.2831853072
#define PI 3.14159265359

precision highp float;
uniform vec2 resolution;
uniform float time;

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time*0.05;
  float lineWidth = 0.002;

  vec3 color = vec3(0.0);
  for(int j = 0; j < 3; j++){
    for(int i=0; i < 5; i++){
      color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
    }
  }
  
  gl_FragColor = vec4(color[0],color[1],color[2],1.0);
}
```

## Our Implementation Difference

Our "Obsidian Prism" landing page uses a **CSS-based approach** with:
- Skewed dark strips (#121212)
- Animated gradient beams (Orange, Sky Blue, White)
- CSS keyframe animations (no Three.js dependency)
- Framer Motion for React component entrances
- Glassmorphism navbar and feature cards

This is a **different aesthetic** — the reference component creates ripple waves, while our design uses vertical light sweeps across tilted strips.

## Potential Enhancement

If we wanted to integrate an actual Three.js shader component into the hero section, we could:
1. Create a `<ShaderCanvas>` component that renders a Three.js scene
2. Embed it as a background layer in the Hero section
3. Overlay the typography on top (like the reference demo does)
4. This would make the "Shader Animation" claim more tangible with a live, interactive effect

However, the current CSS-based approach is more performant and aligns with the "High-End Tech" aesthetic we've established.
