#define USE_TORUS

#pragma glslify: trace = require('./volumetric/trace.frag', u_time=u_time)
#pragma glslify: gradient = require('./common/gradient.frag')
#pragma glslify: fromEuler = require('./common/fromEuler.frag')
#pragma glslify: setCamera = require('./common/setCamera.frag')
#pragma glslify: FlameColour = require('./common/flameColour.frag')

#pragma glslify: VolumetricRaymarch = require('./volumetric/raymarch.frag', u_time=u_time)

vec3 render( in vec3 RayOri, in vec3 RayDir ){	
    /*
    //First Ray
    vec3 p,n;
    float t = trace(RayOri, RayDir, p);
    n=normalize(gradient(p))
    //Second Ray
    float IOR=1.33;
    vec3 Rd_2=refract(RayDir,n,1.0/IOR);
    */	
    //SHADING
    vec3 result;
    result= VolumetricRaymarch(RayOri, RayDir,32,0.1).xyz;
    //result= VolumetricRaymarch(p, Rd_2,32,0.1).xyz;;
    result= FlameColour(clamp(result.x*1.0,0.0,1.0));
    //result= viridis_quintic(result.x);
    return result;
} 

// =========================================================

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv = uv*2.0-1.0;
    uv.x*= u_resolution.x/u_resolution.y;
    uv.y*=-1.0;//校正 預設值uv v軸朝下，轉成v軸朝上相同於y軸朝上為正
    //vec2 mouse=(u_mouse.xy/u_resolution.xy)*2.0-1.0;
    vec2 mouse=(u_mouse.xy/u_resolution.xy)*2.0-1.0;
    
    // camera option1  (模型應在原點，適用於物件)
    //vec3 CameraRot=vec3(0.0, mouse.y*1.0, -mouse.x*1.0);
    vec3 CameraRot=vec3(0.0, 0.0, 0.0);
    vec3 ro= vec3(0.0, 0.0, 1.5);//CameraPos;
    vec3 ta =vec3(0.0, 0.0, -1.0)*fromEuler(CameraRot); //TargetPos; 
        //vec3 ta =float3(CameraDir.x, CameraDir.z, CameraDir.y);//UE座標Z軸在上
    mat3 ca = setCamera( ro, ta, 0.0 );
    vec3 RayDir = ca*normalize(vec3(uv, 2.0));//z值越大，zoom in! 可替換成iMouse.z
    vec3 RayOri = ro;

    vec3 col = render(RayOri,RayDir);
    gl_FragColor = vec4( col, 1.0 );	
}