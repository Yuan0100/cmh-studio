vec3 phong(vec3 p, vec3 n, vec3 v){
        vec3 final=vec3(0.0);
        vec3 diffuse,specular,ambient;
        ambient=vec3(0.305,0.049,0.049);
            
        vec3 light_pos= vec3(5.000,1.000,2.000);
        vec3 light_col= vec3(0.955,0.819,0.231);
        vec3 l=normalize(light_pos-p); //光線向量
        vec3 r=normalize(reflect(-l,n));
        float ka=0.1, ks=1.0, kd=1.0;
        float shininess=8.0;        
        diffuse=vec3(kd*dot(l, n));
        specular=vec3(ks* pow(max(dot(r, v),0.0), shininess)) ;    
        final+=(diffuse+specular)*light_col;
    
        return final+ambient;
    }

#pragma glslify: export(phong);
