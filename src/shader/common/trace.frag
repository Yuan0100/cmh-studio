#pragma glslify: map = require(./map.frag);

float trace(vec3 o, vec3 r, vec3 p)
{
    float t=0.0;
    for (int i=0; i<32; ++i)
    {
        vec3 p= o+r*t;
        float d= map(p);
        t += d*0.3;
    }
    return t;
}

#pragma glslify: export(trace);