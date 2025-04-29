float hash12(vec2 p) {
    float h = dot(p,vec2(127.1,311.7));	
    return fract(sin(h)*43758.5453123);
}

#pragma glslify: export(hash12);