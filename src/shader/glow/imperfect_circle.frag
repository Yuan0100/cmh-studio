#pragma glslify: fbm = require(./common/fbm.frag);
#pragma glslify: glow = require(./common/glow.frag);

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;  //[0,1]
  //st.x *= u_resolution.x/u_resolution.y;    //[0~1.33]
  vec2 uv = st*2.0-1.0;                       //[0,1] -> [-1,1]
  //uv.x *= u_resolution.x/u_resolution.y;    //[-1.33~1.33]
  
  float distance = length(uv)+0.4*fbm(uv*2.008);
  //sqrt(uv.x*uv.x+uv.y*uv.y)

  float circle_dist= abs(distance-0.380);
  //float breathing= sin(u_time/2.0*3.14159)*0.2+0.5; //[0.3, 0.7]
  float breathing= mix(0.3, 0.7, 
      sin(u_time/2.0*3.14159)*0.5+0.5);               //[0.3, 0.7]
  float glow_circle= glow(circle_dist,breathing,0.074);

  //亂數作用雲霧
  float fog= fbm(0.4*uv+vec2(-0.2*u_time, -0.02*u_time))*0.6+0.1;
  vec3 color = vec3(glow_circle+fog)*vec3(1.000,0.348,0.006);
  
  // return color;
  gl_FragColor = vec4(color,1.0); 
}