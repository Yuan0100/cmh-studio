#define M_SQRT_2 1.41421356
float heart(vec2 P, float size){
    float x = M_SQRT_2/2. * (P.x - P.y);
    float y = M_SQRT_2/2. * (P.x + P.y);
    float r1 = max(abs(x),abs(y))-size/3.5;
    float r2 = length(M_SQRT_2/2.*vec2(1.,-1.)-size/3.5);
    
    float r3 = length(M_SQRT_2/2.*vec2(-1.,-1.)-size/3.5);
    
    return min(min(r1,r2),r3);
}

#pragma glslify: export(heart);