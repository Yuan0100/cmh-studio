#pragma glslify: gnoise = require('./gnoise.frag');

vec3 smoothSampling2(vec2 uv)
{
    const float T_RES = 32.0;
    return vec3(gnoise(uv*T_RES)); //讀取亂數函式
}

#pragma glslify: export(smoothSampling2);
