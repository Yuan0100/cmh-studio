#pragma glslify: RayMarching = require("./common/rayMarching.frag")
#pragma glslify: GetDist = require("./common/getDist.frag")

//燈光的模板
struct Light{
    vec3 p; // position
    vec3 id; // diffuse color
    vec3 is; // specular color
};

struct Mat{    
    float ka; // factor of abient
    float kd; // factor of diffuse
    float ks; // factor of specular
    float s; // shiness
};


vec3 CalLight(Light l,Mat m,vec3 p, vec3 n,vec3 rd){
    vec3 diffuse,specular;
    
    vec3 ld =normalize(l.p - p); //Light Dir
    vec3 vr =reflect(rd,n); //View Reflect
    
    diffuse = m.kd*max(dot(ld,n),0.)*l.id;
    specular = m.ks*pow(max(dot(vr,ld),0.),m.s)*l.is;

    // shadow
    float d = RayMarching(p+n*0.03,ld);
    if(d < length(l.p - p)) diffuse *= 0.1;
    
    return diffuse + specular;
}

vec3 lighting(vec3 p ,vec3 n , vec3 v,vec3 rd){
    // Define Lights
    //左到右的input分別是，position , diffuse color , specular color ，可以參照上方struct Light
    Light l1 = Light(vec3(5.,0.,0.),vec3(1.000,0.216,0.292),vec3(1.,1.,1.)); 
    Light l2 = Light(vec3(-5.,1.,-5.),vec3(0.029,0.119,0.805),vec3(1.,1.,1.));
    Light l3 = Light(vec3(-1.5,1.5,3.),vec3(0.855,0.756,0.273),vec3(1.,1.,1.));
    
    // Material Properties
    vec3 ambient,final;
    float ka = 0.5;
    
    Mat mat = Mat(1.,1.,1.,150.); // 設定material的參數，ka, kd, ks, s的數值大小
    ambient = ka*vec3(0.095,0.037,0.012); // 決定底色
    
    final = ambient;
    final += CalLight(l1,mat,p,n,rd); // 加上第一盞燈光的渲染
    final += CalLight(l2,mat,p,n,rd); // 加上第二盞燈光的渲染
    final += CalLight(l3,mat,p,n,rd); // 加上第三盞燈光的渲染

    return final;
}

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