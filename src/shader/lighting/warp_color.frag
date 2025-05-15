#pragma glslify: warpcolor = require("./common/warpColor.frag")

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x*= u_resolution.x/u_resolution.y;
    
    vec4 color = warpcolor(uv, u_time/10.);
    gl_FragColor = vec4(color);
}