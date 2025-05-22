vec2 pixel(vec2 p, float scale){
    return floor(p*scale)/scale;
    //floor : 無條件捨去
}
vec3 pixel(vec3 p, float scale){
    return floor(p*scale)/scale;
}

#pragma glslify: export(pixel);