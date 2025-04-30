#pragma glslify: rotate2d = require('./common/rotate2d.frag');
#pragma glslify: square = require('./common/square.frag');
#pragma glslify: glow = require('./common/glow.frag');

float mouseArea(vec2 uv, vec2 mouse, float size){
    float dist=length(uv-mouse);
    return 1.0-smoothstep( size, 2.5* size, dist);
}

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  // uv.x *= u_resolution.x/u_resolution.y;
  float tilingSize=20.0;
  vec2 Mymouse= u_mouse.xy / u_resolution.xy;
  // vec2 Mymouse = vec2(0.5, 0.5);;
  vec2 iMouse = floor(Mymouse*20.0)/20.0;
  
  //grid repetition
  vec2 uvs=uv*vec2(20.0);
  vec2 ipos = floor(uvs);  // get the integer coords
  vec2 fpos = fract(uvs);  // get the fractional coords
  uv= fpos*2.0-1.0;
  
  float area=mouseArea(ipos/20.0, iMouse, 0.108);
  uv*= rotate2d(u_time*0.5+area*2.0);
  //vec3 colVis=vec3(area);

  //drawing distance function 
  float draw = square(uv, 0.786);
  //sdFish(1.0, uv, 0.1), square(uv, 0.362), heart(uv, 0.5)    

  //float glow_draw = smoothstep(0.003,0.00,draw); //1st method
  float glow_draw = glow(draw, 0.5, 0.076); //2nd method
  //float glow_draw = exp(-draw*800.0); //3rd method

  gl_FragColor = vec4(vec3(area),1.0);
}