vec4 warpcolor(in vec2 uv, float t){   //Normalized uv[0~1]
    float strength = 0.4;
    vec3 col = vec3(0);
    //pos coordinates (from -1 to 1)
    vec2 pos = uv*2.0-1.0;
        
    //請小心！QC迴圈最好使用int index，float index有可能錯誤！
    for(int i = 1; i < 7; i++){//疊幾層
    pos.x += strength * sin(2.0*t+float(i)*1.5 * pos.y)+t*0.5;
    pos.y += strength * cos(2.0*t+float(i)*1.5 * pos.x);}

    //Time varying pixel colour
    col += 0.5 + 0.5*cos(t+pos.xyx+vec3(0,2,4));
    //Gamma
    col = pow(col, vec3(0.4545));
    return vec4(col,1.0) ;
}

#pragma glslify: export(warpcolor)