#pragma glslify: gnoise = require('./gnoise.frag')

float noise( in vec2 p )	//亂數範圍 [-1,1]
{
    #ifdef Use_Perlin    
    return gnoise(p);       //gradient noise
    #elif defined Use_Value
    return vnoise(p);       //value noise
    #endif    
    return 0.0;
}

float noise( in vec3 p )	//亂數範圍 [-1,1]
{
    #ifdef Use_Perlin    
    return gnoise(p);       //gradient noise
    #elif defined Use_Value
    return vnoise(p);       //value noise
    #endif    
    return 0.0;
}

#pragma glslify: export(noise);