#pragma glslify: rotate2d = require('./common/rotate2d.frag')
#pragma glslify: random = require('./common/random.frag')
#pragma glslify: square = require('./common/square.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;// normalize
    // uv.x *= u_resolution.x/u_resolution.y;

    // float tilingsize=20.;// mouse和uv的size要同步縮放級單位化
    float glow_draw;
    
    for(int i=0; i<8; i++){
        float tilingsize=pow(2.,float(i));    
                
        //grid repetition
        vec2 uvs = uv * vec2(tilingsize);// uv 放大比例可以不同

        vec2 ipos = floor(uvs)/tilingsize;  // get the integer coords
        vec2 fpos = fract(uvs);  // get the fractional coords
        uvs = fpos*2.0-1.0;

        // uv*= rotate2d(random(ipos)*3.14159+u_time*0.5);
        // 每一格的訊息取亂數旋轉    

        // uv*= rotate2d(u_time*0.5);// 每個格子旋轉速度一樣
        uvs*= rotate2d(u_time*0.5);

        //vec3 colVis = vec3(ipos.xy/6., 0.);// 檢測現在寫出來的東西
                                              // 除法校正

        float threshold = 0.5 + sin(u_time*.2)*.2;
        if(random(ipos)>threshold) continue;// 可以嘗試break or continue
        // continue 不做當次迴圈
        // break 結束迴圈


        //drawing distance function，切格子大小
        float draw = square(uvs, 0.3);//sdFish(1.0, uv, 0.1), 
            // square(uv, 0.362), heart(uv, 0.5)    
        //float glow_draw = smoothstep(0.003,0.00,draw); //1st method
        glow_draw += glow(draw, 0.412, 0.02); //2nd method
        //float glow_draw = exp(-draw*800.0); //3rd method
    }

    gl_FragColor = vec4(vec3(glow_draw),1.0);
} 