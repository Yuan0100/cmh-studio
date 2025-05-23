#pragma glslify: gnoise = require("../common/gnoise.frag")
#pragma glslify: map = require("../volumetric/map.frag", u_time=u_time)

#include "lygia/generative/curl.glsl"

//=======Fur texture========
const float uvScale = 10.0;	//from 1.0->12.0
//const float colorUvScale = 0.1;
const float furDepth = 0.2;
//const int furLayers = 64;
//const float rayStep = furDepth*2.0 / float(furLayers);
const float furThreshold = 0.15;  //from 0.4->0.6


  vec2 cartesianToSpherical(vec3 p)
  {		
      float r = length(p);
      float t = (r - (0.5 - furDepth)) / furDepth;//1.0->0.5
      p /= r;	//normalize
      vec2 uv = vec2(atan(p.y, p.x), acos(p.z));

      //uv.x += cos(u_time*1.5)*t*t*0.4;// curl
      //uv.y += sin(u_time*1.7)*t*t*0.2;
      uv.y -= t*t*0.1;// curl down
      return uv;
  }

  // returns fur density at given position
  float furDensity(vec3 pos)
  {
      vec2 uv = cartesianToSpherical(pos.xzy);	
      vec3 tex=vec3(gnoise(uv*uvScale)*0.5+0.5);

      // thin out hair
      float density = smoothstep(furThreshold, 1.0, tex.x);
      float r1=map(pos);
      density *= clamp(smoothstep(-furDepth, 0., r1),0.0,1.0);
      return density;	
  }

  float density(vec3 p){
      p+=0.05*curl(10.0*p);
      //p=pixel(p,30.0);
      float weight=1.0;
      weight=furDensity(p)*1.5;
      //weight=noise_3(10.0*p);
      //weight=smoothstep(0.3, 1.0, cellular(12.0*p).y);
      return (1.0-smoothstep(0.,0.1,map(p)))*3.0*weight;
      //return (smoothstep(0.,0.1,map(p)))*0.5;
}

#pragma glslify: export(density);