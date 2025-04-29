void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv.x *= u_resolution.x/u_resolution.y;
    uv=fract(uv*3.0);

    //定義框
    float L = smoothstep(0.1, 0.12, uv.x);
    float B = smoothstep(0.1, 0.12, uv.y);
    float R = smoothstep(0.1, 0.12, 1.-uv.x);
    float T = smoothstep(0.1, 0.12, 1.-uv.y);
    float rect = L*B*R*T; //黑顏料使用乘法, 白顏料使用加法
    
    //vec2 uv2= uv*2.0-1.0;
    //float rect2 = smoothstep(0.2, 0.29, abs(uv2.x))
        //+smoothstep(0.6, 0.65, abs(uv2.y));

    gl_FragColor = vec4(vec3(rect),1.0);
}