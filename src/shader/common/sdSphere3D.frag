float sdSphere3D( vec3 p, float s )
{
    return length(p)-s;
}

#pragma glslify: export(sdSphere3D);