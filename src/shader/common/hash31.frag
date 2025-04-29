vec3 hash31(float p) {
    vec3 h = vec3(1275.231,4461.7,7182.423) * p;	
    return fract(sin(h)*43758.543123);
}

#pragma glslify: export(hash31);