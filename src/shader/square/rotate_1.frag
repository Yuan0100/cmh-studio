#pragma glslify: rotate2d = require('./common/rotate2d.frag')
#pragma glslify: random = require('./common/random.frag')
#pragma glslify: square = require('./common/square.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    // uv.x *= u_resolution.x/u_resolution.y;
    
    //grid repetition
    vec2 uvs=uv*6.;
    vec2 ipos = floor(uvs);  // get the integer coords
    vec2 fpos = fract(uvs);  // get the fractional coords
    uv= fpos*2.0-1.0;
    uv*= rotate2d(random(ipos)*3.14159+u_time*0.5);

    //drawing distance function 
    float draw = square(uv, 0.362);//sdFish(1.0, uv, 0.1), 
        // square(uv, 0.362), heart(uv, 0.5)    
    //float glow_draw = smoothstep(0.003,0.00,draw); //1st method
    float glow_draw = glow(draw, 0.5, 0.076); //2nd method
    //float glow_draw = exp(-draw*800.0); //3rd method

    gl_FragColor = vec4(vec3(glow_draw),1.0);
}