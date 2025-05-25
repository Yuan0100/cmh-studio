#pragma glslify: fromEuler = require('./common/fromEuler.frag')
#pragma glslify: setCamera = require('./common/setCamera.frag')
#pragma glslify: trace = require('./common/trace.frag')
#pragma glslify: gradient = require('./common/gradient.frag')
#pragma glslify: triplanarMap = require('./common/triplanarMap.frag')
#pragma glslify: getSkyAll = require('./common/getSkyAll.frag')

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv = uv*2.0-1.0;
    uv.x*= u_resolution.x/u_resolution.y;
    uv.y*=1.0;//校正 預設值uv v軸朝下，轉成v軸朝上相同於y軸朝上為正
    vec2 mouse=(u_mouse.xy/u_resolution.xy)*2.0-1.0;
    
    // camera option1  (模型應在原點，適用於物件)
        vec3 CameraRot=vec3(0.0, mouse.y*3.0, -mouse.x); 
        vec3 ro= vec3(0.0, 0.0, 2.0)*fromEuler(CameraRot);//CameraPos;
        vec3 ta =vec3(0.0, 0.0, 0.0); //TargetPos; 
        //vec3 ta =float3(CameraDir.x, CameraDir.z, CameraDir.y);
        //UE座標Z軸在上

        mat3 ca = setCamera( ro, ta, 0.0 );
        vec3 RayDir = ca*normalize(vec3(uv, 2.0));
        //z值越大即zoom in，可替換成iMouse.z
        vec3 RayOri = ro;
    
    // camera option2 (攝影機在原點，適用於場景)
    /*	
        vec3 CameraRot=vec3(0.0, -iMouse.y, -iMouse.x);
        vec3 RayOri= vec3(0.0, 0.0, 0.0);	//CameraPos;
        vec3 RayDir = normalize(vec3(uv, -1.))*fromEuler(CameraRot);
    */
        
        vec3 p,n;
        float t = trace(RayOri, RayDir, p);
        n=normalize(gradient(p));
        vec3 bump=triplanarMap(p*1.652,n);
        //n=n+bump*0.5;

        
        float edge= dot(-RayDir, n);
        //edge = step(0.2, edge);
        edge = smoothstep(-0.272, 0.400, edge);
            
    //SHADING
        vec3 result=n;
        result = vec3(edge); 
        
    //HDR環境貼圖
        vec3 BG=getSkyAll(RayDir);//或getSkyFBM(RayDir)
    
    //亂數作用雲霧(二維)
    //float fog= fbm(0.6*uv+vec2(-0.2*u_time, -0.02*u_time))*0.5+0.3;
    //vec3 fogFBM=getSkyFBM(reflect(RayDir,n));
    
    if(t<2.5) gl_FragColor = vec4(vec3(result),1.0); 
    else gl_FragColor = vec4(BG,1.0);
}