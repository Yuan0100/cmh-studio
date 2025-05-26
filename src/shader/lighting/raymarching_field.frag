#pragma glslify: fbm = require('./common/fbm.frag')
#pragma glslify: fromEuler = require('./common/fromEuler.frag')
#pragma glslify: setCamera = require('./common/setCamera.frag')
#pragma glslify: trace = require('./common/trace.frag')
#pragma glslify: gradient = require('./common/gradient.frag')
#pragma glslify: getSkyALL = require('./common/getSkyAll.frag')

vec3 hatching(vec3 p, vec3 n, float value){        
    vec3 col;
    //float str=10.0;
    float NdotL=(1.0-value)*10.0;
    vec3 col1 = vec3(texcube (p,n,NdotL)); // ⚠️ texcube undefined
    vec3 col2 = vec3(cubeproj(p,NdotL));
    col = mix(col1,col2, 3.0);
    return col;    
}


void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv = uv*2.0-1.0;
    uv.x*= u_resolution.x/u_resolution.y;
    uv.y*=1.0;//校正 預設值uv v軸朝下，轉成v軸朝上相同於y軸朝上為正
    vec2 mouse=(u_mouse.xy/u_resolution.xy)*2.0-1.0;

    // camera option1  (模型應在原點，適用於物件)
        vec3 CameraRot=vec3(0.0, mouse.y, mouse.x); 
        vec3 ro= vec3(0.0, 0.0, 1.0)*fromEuler(CameraRot); //CameraPos;
        vec3 ta =vec3(0.0, 0.0, 0.0); //TargetPos; 
        //vec3 ta =float3(CameraDir.x, CameraDir.z, CameraDir.y); 
        //UE座標Z軸在上
        
        mat3 ca = setCamera( ro, ta, 0.0 );
        vec3 RayDir = ca*normalize(vec3(uv, 1.0));
        //z值越大則zoom in，可替換成iMouse.z

        vec3 RayOri = ro;

    // camera option2 (攝影機在原點，適用於場景)
    /*	
        vec3 CameraRot=vec3(0.0, -iMouse.y, -iMouse.x);
        vec3 RayOri= vec3(0.0, 0.0, 0.0);//CameraPos;
        vec3 RayDir = normalize(vec3(uv, -1.))*fromEuler(CameraRot);
    */
        
    vec3 p,n;
    float t = trace(RayOri, RayDir, p); //position
    n=normalize(gradient(p)); //normal
    //n+=0.5*normalMap(p,n);    //add normal detail
    float VdotN=dot(-RayDir,n);
    float edge=min(max(smoothstep(-0.388,1.710,VdotN),0.0),1.0);
            
    //SHADING
        vec3 result;
        result=hatching(p, n, edge);
        // result=(n);
        
    //HDR環境貼圖
        vec3 BG=getSkyALL(RayDir);	   //或getSkyFBM(RayDir)

    gl_FragColor = vec4(vec3(result),1.0);    
    if(t<3.5) gl_FragColor = vec4(vec3(result),1.0); 
    else gl_FragColor = vec4(BG,1.0);
}