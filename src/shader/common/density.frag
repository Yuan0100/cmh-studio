#pragma glslify: map = require('./map.frag')

float density(vec3 p){
    return (1.0-smoothstep(0.,0.1,map(p)))*2.0;
    //return (smoothstep(0.,0.1,map(p)))*0.5;
}

#pragma glslify: export(density)