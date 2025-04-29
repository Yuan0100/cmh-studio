#pragma glslify: rotate2d = require('./common/rotate2d.frag')
#pragma glslify: random = require('./common/random.frag')
#pragma glslify: square = require('./common/square.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    // uv.x *= u_resolution.x/u_resolution.y;
    
    float glow_draw;
    for (int index=0; index<5; index++)
    {
        //grid repetition
        float tilingSiize=pow(2.0, float(index));
        vec2 uvs=uv*vec2(tilingSiize);
        vec2 ipos = floor(uvs)/tilingSiize;  // get the integer coords
        vec2 fpos = fract(uvs);  // get the fractional coords
        uvs= fpos*2.0-1.0;
        uvs*= rotate2d(u_time*0.5);
            
        float threshold=0.48+sin(u_time*0.5)*0.2;
        if(random(ipos)>threshold) continue;
            
        //drawing distance function 
        float draw = square(uvs, 0.314);//sdFish(1.0, uv, 0.1), 
            // square(uv, 0.362), heart(uv, 0.5);
        //float glow_draw = smoothstep(0.003,0.00,draw); //1st method
        glow_draw += glow(draw, 0.412, 0.052); //2nd method
        //float glow_draw = exp(-draw*800.0); //3rd method
    }

    gl_FragColor = vec4(vec3(glow_draw),1.0);
} 