float sdPlane(vec3 p){
        float plane_y = -0.948;
        float dPlane = abs(p.y-plane_y);
        return dPlane;
    }

#pragma glslify: export(sdPlane);
