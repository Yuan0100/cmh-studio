float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}

#pragma glslify: export(glow);