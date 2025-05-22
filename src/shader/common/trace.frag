#pragma glslify: map = require(./map.frag);
#pragma glslify: pixel = require(./pixel.frag);

float trace(vec3 o, vec3 r, out vec3 p)
{
    float t=0.0;
    for (int i=0; i<32; ++i)
    {
        p= o+r*t;
        float d= map(p);
        t += d*0.3;
    }
    return t;
}

// Pixel effect
float trace(vec3 o, vec3 r, out vec3 p, out float d)
{
float t=0.0;
    for (int i=0; i<32; ++i)
    {
        p = o+r*t;
        p = pixel(p, 10.);//格化    
            
        d = map(p);
        if(d<0.0){
            break;
        }
            
        t += d*0.5; //影響輪廓精準程度
    }
    return t;
}

#pragma glslify: export(trace);