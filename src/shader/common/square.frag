#define M_SQRT_2 1.41421356
float square(vec2 P, float size){
    return abs(max(abs(P.x), abs(P.y)) - size/(2.0*M_SQRT_2));
}

#pragma glslify: export(square);