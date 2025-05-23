#pragma glslify: map = require('./map.frag', u_time=u_time)

float trace(vec3 o, vec3 r, out vec3 p)
{
    float d=0.0, t=0.0;
    for (int i=0; i<32; ++i)
    {
        p= o+r*t;
        d=map(p);
        if(d<0.0) break;
        t += d*0.8; //
        }
    return t;
}

#pragma glslify: export(trace);