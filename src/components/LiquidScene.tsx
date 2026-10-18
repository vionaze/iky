'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vec3 displaced = position;
    float n1 = snoise(position * 1.35 + vec3(0.0, uTime * 0.12, 0.0));
    float n2 = snoise(position * 3.1 - vec3(uTime * 0.08, 0.0, 0.0));
    displaced += normal * (n1 * 0.16 + n2 * 0.045);

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uBlue;
  uniform vec3 uPink;
  uniform vec3 uIndigo;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    vec3 n = normalize(vNormalView);
    vec3 v = normalize(vViewDir);
    float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);
    float height = clamp(n.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uBlue, uPink, smoothstep(0.12, 0.88, height));
    color = mix(color, uIndigo, fresnel * 0.42);
    float alpha = 0.40 + fresnel * 0.30;
    gl_FragColor = vec4(color, alpha);
  }
`

export default function LiquidScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const el: HTMLDivElement = host

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearAlpha(0)

    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.filter = 'blur(16px) saturate(115%)'
    canvas.style.opacity = '0.9'
    el.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20)
    camera.position.set(0, 0, 5.6)

    const geometry = new THREE.IcosahedronGeometry(1.18, 48)
    const uniforms = {
      uTime: { value: reduceMotion ? 1.6 : 0 },
      uBlue: { value: new THREE.Color('#b8d4f2') },
      uPink: { value: new THREE.Color('#f0cbdc') },
      uIndigo: { value: new THREE.Color('#51439a') },
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    })
    const blob = new THREE.Mesh(geometry, material)
    scene.add(blob)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    function onPointerMove(event: PointerEvent) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    function resize() {
      const width = el.clientWidth
      const height = el.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(el)

    let inView = true
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.01 },
    )
    intersectionObserver.observe(el)

    let tabVisible = !document.hidden
    function onVisibilityChange() {
      tabVisible = !document.hidden
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    resize()

    let frameId = 0
    const clock = new THREE.Clock()

    function renderFrame() {
      uniforms.uTime.value = clock.getElapsedTime()
      target.x += (pointer.x * 0.18 - target.x) * 0.045
      target.y += (pointer.y * 0.12 - target.y) * 0.045
      blob.rotation.y = uniforms.uTime.value * 0.12 + target.x
      blob.rotation.x = Math.sin(uniforms.uTime.value * 0.18) * 0.1 + target.y
      blob.position.y = -0.1 + Math.sin(uniforms.uTime.value * 0.35) * 0.04
      renderer.render(scene, camera)
    }

    function loop() {
      frameId = requestAnimationFrame(loop)
      if (!inView || !tabVisible) return
      renderFrame()
    }

    if (reduceMotion) {
      renderFrame()
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
}
