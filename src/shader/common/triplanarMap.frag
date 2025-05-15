#pragma glslify: triplanarNoise = require('./triplanarNoise.frag');

vec3 triplanarMap(vec3 p, vec3 n)
{
  float d = 0.005;
  float po = triplanarNoise(p,n);
  float px = triplanarNoise(p+vec3(d,0,0),n);
  float py = triplanarNoise(p+vec3(0,d,0),n);
  float pz = triplanarNoise(p+vec3(0,0,d),n);
  return normalize(vec3((px-po)/d,
                        (py-po)/d,
                        (pz-po)/d));
}

#pragma glslify: export(triplanarMap);