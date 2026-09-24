import type { WebGLHologramController } from "./types";

const vertexSource = `
attribute vec3 a_position;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_intensity;
varying float v_depth;

void main() {
  float angle = u_time * 0.00022;
  float c = cos(angle);
  float s = sin(angle);

  vec3 p = a_position;
  p.xz = mat2(c, -s, s, c) * p.xz;

  float z = p.z + 5.0;
  float aspect = max(u_resolution.x / max(u_resolution.y, 1.0), 0.5);

  vec2 projected = vec2(
    p.x / (z * aspect),
    p.y / z
  ) * 2.35;

  gl_Position = vec4(projected, 0.0, 1.0);
  gl_PointSize = (2.1 + (1.2 / z)) * u_intensity;
  v_depth = clamp(1.0 - (z - 3.0) / 4.0, 0.25, 1.0);
}
`;

const fragmentSource = `
precision mediump float;
uniform float u_time;
uniform float u_intensity;
varying float v_depth;

void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float d = length(p);
  if (d > 0.5) discard;

  float pulse = 0.78 + 0.22 * sin(u_time * 0.002 + v_depth * 8.0);
  vec3 color = mix(
    vec3(0.08, 0.48, 0.95),
    vec3(0.35, 0.92, 1.0),
    v_depth
  );

  float alpha = (1.0 - smoothstep(0.24, 0.5, d)) * pulse * 0.82;
  gl_FragColor = vec4(color * u_intensity, alpha);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("webgl-create-shader-failed");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "unknown";
    gl.deleteShader(shader);
    throw new Error("webgl-shader-compile:" + log);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    throw new Error("webgl-create-program-failed");
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "unknown";
    gl.deleteProgram(program);
    throw new Error("webgl-program-link:" + log);
  }

  return program;
}

function pushSphere(
  output: number[],
  centerY: number,
  radius: number,
  latitudeSteps: number,
  longitudeSteps: number
) {
  for (let lat = 1; lat < latitudeSteps; lat += 1) {
    const phi = (lat / latitudeSteps) * Math.PI;

    for (let lon = 0; lon < longitudeSteps; lon += 1) {
      const theta = (lon / longitudeSteps) * Math.PI * 2;
      const wobble = 0.94 + 0.06 * Math.sin(theta * 3.0 + phi * 2.0);

      output.push(
        Math.sin(phi) * Math.cos(theta) * radius * wobble,
        centerY + Math.cos(phi) * radius,
        Math.sin(phi) * Math.sin(theta) * radius * 0.92
      );
    }
  }
}

function pushTorso(output: number[]) {
  const rings = 15;
  const segments = 24;

  for (let ring = 0; ring <= rings; ring += 1) {
    const t = ring / rings;
    const y = 0.25 - t * 2.2;
    const shoulder = Math.sin(t * Math.PI) * 0.28;
    const radiusX = 0.52 + shoulder + t * 0.28;
    const radiusZ = 0.34 + t * 0.12;

    for (let segment = 0; segment < segments; segment += 1) {
      const theta = (segment / segments) * Math.PI * 2;
      output.push(
        Math.cos(theta) * radiusX,
        y,
        Math.sin(theta) * radiusZ
      );
    }
  }
}

function createAvatarPointCloud(): Float32Array {
  const points: number[] = [];
  pushSphere(points, 1.15, 0.58, 12, 24);
  pushTorso(points);
  return new Float32Array(points);
}

export function createWebGLHologramScene(
  canvas: HTMLCanvasElement
): WebGLHologramController {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });

  if (!gl) throw new Error("webgl-unavailable");

  const program = createProgram(gl);
  const buffer = gl.createBuffer();
  if (!buffer) {
    gl.deleteProgram(program);
    throw new Error("webgl-buffer-failed");
  }

  const points = createAvatarPointCloud();
  const pointCount = points.length / 3;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "a_position");
  const time = gl.getUniformLocation(program, "u_time");
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const intensity = gl.getUniformLocation(program, "u_intensity");

  if (position < 0 || !time || !resolution || !intensity) {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    throw new Error("webgl-location-failed");
  }

  let frame = 0;
  let running = false;
  let disposed = false;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const renderOnce = (timeMs = 0) => {
    if (disposed) return;

    resize();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.uniform1f(time, timeMs);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(intensity, 1.0);

    gl.drawArrays(gl.POINTS, 0, pointCount);
  };

  const loop = (timeMs: number) => {
    if (!running || disposed) return;
    renderOnce(timeMs);
    frame = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || disposed) return;
    running = true;
    frame = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };

  const dispose = () => {
    if (disposed) return;
    stop();
    disposed = true;
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };

  return {
    kind: "webgl-cinematic",
    threeDimensional: true,
    start,
    stop,
    renderOnce,
    resize,
    dispose,
  };
}
