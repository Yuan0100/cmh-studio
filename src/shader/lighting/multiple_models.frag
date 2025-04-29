vec3 GetNormal(vec3 p){
        vec2 e = vec2(0.01,0.0);
        vec3 n = vec3(
            GetDist(p+e.xyy),
            GetDist(p+e.yxy),
            GetDist(p+e.yyx))-GetDist(p);
        return normalize(n);
    }

    // main step by step
    void main() {
        vec2 st = (gl_FragCoord.xy/u_resolution.xy)*2.-1.;

        // ro -> ray origin
        vec3 ro = vec3(0.,-0.2,0.);
        // rd -> ray direction
        vec3 rd = normalize(vec3(st.xy,1.));

        // t -> distance
        float t = RayMarching(ro,rd);
        
        // p -> vertex pos
        vec3 p = ro+rd*t;
        
        // n -> normal dir
        vec3 n = GetNormal(p);

        //calculate lighting 
        vec3 color = lighting(p,n,ro,rd);
        
        gl_FragColor = vec4(color,1.0);
    }