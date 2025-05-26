#pragma glslify: fbm = require('./common/fbm.frag')
#pragma glslify: fromEuler = require('./common/fromEuler.frag')
#pragma glslify: setCamera = require('./common/setCamera.frag')
#pragma glslify: trace = require('./common/trace.frag')
#pragma glslify: gradient = require('./common/gradient.frag')
#pragma glslify: getSkyALL = require('./common/getSkyAll.frag')

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform sampler2D u_tex3;
uniform sampler2D u_tex4;
uniform sampler2D u_tex5;

vec4 hatching(float shading)
{
    vec2 uv= gl_FragCoord.xy/u_resolution.xy;
    vec2 vUv=fract(6.0*uv); //key
    //float shading= texture2D(u_tex7, uv).g;

    vec4 c;
    float step = 1. / 6.;
    if( shading <= step ){   
        c = mix( texture2D( u_tex5, vUv ), texture2D( u_tex4, vUv ), 6. * shading );
    }
    if( shading > step && shading <= 2. * step ){
        c = mix( texture2D( u_tex4, vUv ), texture2D( u_tex3, vUv) , 6. * ( shading - step ) );
    }
    if( shading > 2. * step && shading <= 3. * step ){
        c = mix( texture2D( u_tex3, vUv ), texture2D( u_tex2, vUv ), 6. * ( shading - 2. * step ) );
    }
    if( shading > 3. * step && shading <= 4. * step ){
        c = mix( texture2D( u_tex2, vUv ), texture2D( u_tex1, vUv ), 6. * ( shading - 3. * step ) );
    }
    if( shading > 4. * step && shading <= 5. * step ){
        c = mix( texture2D( u_tex1, vUv ), texture2D( u_tex0, vUv ), 6. * ( shading - 4. * step ) );
    }
    if( shading > 5. * step ){
        c = mix( texture2D( u_tex0, vUv ), vec4( 1. ), 6. * ( shading - 5. * step ) );
    }
                
    vec4 inkColor = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 src = mix( mix( inkColor, vec4( 1. ), c.r ), c, .5 );
    return src;
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
            
    //SHADING
        vec3 result = n;
        float VdotN = dot(-RayDir,n);
        float edge = dot(-RayDir,n);
        result = hatching(VdotN).rgb*edge;
        // result=(n);
        
    //HDR環境貼圖
        vec3 BG=getSkyALL(RayDir);	   //或getSkyFBM(RayDir)

    gl_FragColor = vec4(vec3(result),1.0);    
    if(t<3.5) gl_FragColor = vec4(vec3(result),1.0); 
    else gl_FragColor = vec4(BG,1.0);
}