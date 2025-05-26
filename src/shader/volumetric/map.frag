#pragma glslify: noise_3 = require(../common/noise_3.frag)
#pragma glslify: sdBox = require(../common/sdBox.frag)
#pragma glslify: sdSphere = require(../common/sdSphere.frag)
#pragma glslify: sdTorus = require(../common/sdTorus.frag)
#pragma glslify: fromEuler = require(../common/fromEuler.frag)

float map(in vec3 p)
{
    float bump=0.002 * (noise_3(p*60.0)*2.0-1.0);
    #ifdef USE_SPIN
        mat3 rot=fromEuler(vec3(0.0,0.0,u_time*0.5));
    #else
        mat3 rot=fromEuler(vec3(0.0,0.0,0.5));
    #endif
    vec3 p1=(p+vec3(0.0,-0.0,1.5))*rot;
    vec3 p2=(p+vec3(1.5,-0.5,0.0))*-rot;
    vec3 p3=(p+vec3(-1.5,-0.8,0.0))*-rot;
    vec3 p4=(p+vec3(0.0,-0.3,-1.5))*rot;
    
    #ifdef USE_BOX
        return sdBox(p1,vec3(0.4));
    #elif defined(USE_SPHERE)
        return sdSphere(p1+vec3(0.,0.,0.0), 0.5)+bump;
    #elif defined(USE_TORUS)
        return sdTorus(p+vec3(0.,0.,1.5),vec2(0.4,0.2))+bump;
    #else
        return sdBox(p1,vec3(0.4));
    #endif
    
    //return min(min(min(sdBox(p1),sdBox(p2)),sdBox(p3)),sdBox(p4));
}

#pragma glslify: export(map);