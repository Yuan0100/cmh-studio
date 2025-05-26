#pragma glslify: hsl2rgb = require('./common/hsl2rgb.frag')

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv *= mat2(0.707, -0.707, 0.707, 0.707); //選轉原點在左下角
    vec2 st = 2.0* uv-1.0;
    //st *= mat2(0.707, -0.707, 0.707, 0.707); //選轉原點在中心點
    float scale=12.0;
    st = floor(st*scale)/scale;

    vec3 color = vec3(0.);
    float dir=atan(st.y, st.x)/(2.0*3.14159);
    float dist=1.0*length(st);
    color = hsl2rgb(vec3(dir,dist,0.5));

    gl_FragColor = vec4(color,1.0);
}
    