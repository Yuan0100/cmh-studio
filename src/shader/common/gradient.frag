#pragma glslify: map = require('./map.frag')

vec3 gradient( in vec3 p ) //尚未normalize
{
    const float d = 0.001;
    vec3 grad = vec3(map(p+vec3(d,0,0))-map(p-vec3(d,0,0)),
                    map(p+vec3(0,d,0))-map(p-vec3(0,d,0)),
                    map(p+vec3(0,0,d))-map(p-vec3(0,0,d)));
    return grad;
}

#pragma glslify: export(gradient);