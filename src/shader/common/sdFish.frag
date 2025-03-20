float sdFish(float i, vec2 p, float a) {
    float ds, c = cos(a), s = sin(a);
    p *= 1.3*mat2(c,s,-s,c); // Rotate and rescale
    p.x *= .97 + (.04+.2*p.y)*cos(i+9.*u_time);  
    // Swiming ondulation (+rotate in Z axes)
    
    ds = min(length(p-vec2(.8,0))-.45, length(p-vec2(-.14,0))-.12);   
    // Distance to fish

    p.y = abs(p.y)+.13;
    return max(min(length(p),length(p-vec2(.56,0)))-.3,-ds)*.05;
}

#pragma glslify: export(sdFish);