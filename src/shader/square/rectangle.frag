#pragma glslify: heart = require(./common/heart)
#pragma glslify: glow = require(./common/glow)

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st.x *= u_resolution.x/u_resolution.y;
    st= st*2.0-1.0;
    
    // vec2 pin=vec2(st.x, -0.212*sin(st.x*20.0));//控制頻率與振幅
    // float dist=length(st-pin);
    
    st.y *= -1.;// 翻轉
    float dist=heart(st,0.796);

    vec3 color = vec3(0.);
    //1st method
    color = vec3(smoothstep(0.0,0.1,dist));
    //2nd method
    color = vec3(glow(dist, 1.0, 0.04));
    //3rd method
    color = vec3(exp(-dist*10.0));
    
    // color *= vec3(0.491,0.132,0.650);

    gl_FragColor = vec4(color,1.0);
}