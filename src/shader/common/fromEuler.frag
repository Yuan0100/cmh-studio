mat3 fromEuler(vec3 ang) {
  vec2 a1 = vec2(sin(ang.x),cos(ang.x));
  vec2 a2 = vec2(sin(ang.y),cos(ang.y));
  vec2 a3 = vec2(sin(ang.z),cos(ang.z));
  vec3 m0 = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,
      a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
  vec3 m1 = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
  vec3 m2 = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,
      a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
  return mat3(m0, m1, m2);
}

#pragma glslify: export(fromEuler);