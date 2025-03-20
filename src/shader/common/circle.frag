float circle(vec2 uv, float radius){
    float dist = length(uv);
    float circle_dist = abs(dist-radius);//光環大小
    return circle_dist;
}

#pragma glslify: export(circle);