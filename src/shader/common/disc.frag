float disc(vec2 P, float size){
    return length(P) - size/2.;
}

#pragma glslify: export(disc);
