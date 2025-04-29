#pragma glslify: fbm = require('./common/fbm.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    // uv.x *= u_resolution.x/u_resolution.y;
    uv= uv*2.0-1.0;
    //陰晴圓缺
    float pi=3.14159;
    float theta=2.0*pi*u_time/8.0;
    vec2 point=vec2(sin(theta), cos(theta));
    float dir= dot(point, (uv))+0.55;
    
    //亂數作用雲霧
    float fog= fbm(0.4*uv+vec2(-0.1*u_time, -0.02*u_time))*0.6+0.1;

    //定義圓環
    float dist = length(uv);
    float circle_dist = abs(dist-0.512);//光環大小
    
    //動態呼吸
    float breathing=sin(2.0*u_time/5.0*pi)*0.5+0.2;//option1
    //float breathing=(exp(sin(u_time/2.0*pi)) - 0.36787944)
        //*0.42545906412;//option2 錯誤
    //float breathing=(exp(sin(u_time/2.0*pi)) - 0.36787944)
        //*0.42545906412;//option2 正確
    float strength =(0.2*breathing+0.180);  
    //[0.2~0.3] //光暈強度加上動態時間營造呼吸感

    float thickness=(0.1*breathing+0.084);  
    //[0.1~0.2] //光環厚度 營造呼吸感

    float glow_circle = glow(circle_dist, strength, thickness);

    gl_FragColor = vec4((vec3(glow_circle)+fog)
        *dir*vec3(1.0, 0.5, 0.25),1.0);
    // return vec3(((glow_circle)+fog)
    //     *dir*vec3(1.0, 0.5, 0.25));
}