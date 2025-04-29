vec3 sky_color(vec3 e) {	//漸層藍天空色
    e.y = max(e.y,0.0);
    vec3 ret;
    ret.x = pow(1.0-e.y,3.0);
    ret.y = pow(1.0-e.y, 1.2);
    ret.z = 0.8+(1.0-e.y)*0.3;    
    return ret;
}

vec3 getSkyALL(vec3 e)
{	
    return sky_color(e);
}

#pragma glslify: export(getSkyALL);