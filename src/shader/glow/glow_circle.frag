#pragma glslify: glow = require('./common/glow.frag')

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  // uv.x *= u_resolution.x/u_resolution.y;
  uv= uv*2.0-1.0;

  //定義圓環
  float dist = length(uv);
  float circle_dist = abs(dist-0.3);
  float glow_circle = glow(circle_dist, 0.6, 0.05);  
  //第一種寫法 by thickness/pow(dist, strength)

  //glow_circle= exp(-20.0*circle_dist)+exp(-200.0*circle_dist); 
  //第二種寫法 by exp(-scale*dist)

  gl_FragColor = vec4(vec3(glow_circle),1.0);
}