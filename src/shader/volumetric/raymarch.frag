#pragma glslify: fromEuler = require(../common/fromEuler.frag)
#pragma glslify: density = require('../volumetric/density.frag', u_time=u_time)
#pragma glslify: furDensity = require('../volumetric/furDensity.frag', u_time=u_time)

#include "lygia/lighting/common/henyeyGreenstein.glsl"

vec4 VolumetricRaymarch(vec3 samplePosition, vec3 marchDirection, int stepCount, float stepSize) {
    float ambientLight=9.;
    float directLight=15.0;

    #ifdef USE_SPIN
        vec3 l=vec3(0.5,0.3,-0.8)*fromEuler(vec3(0.0,0.0,u_time*0.2));
    #else
        vec3 l=vec3(0.5,0.3,-0.8)*fromEuler(vec3(0.0,0.0,0.2));
    #endif

    float absorptionCoef=0.01;
    float scatteringCoef=0.04;
    float extinctionCoef = absorptionCoef + scatteringCoef;
    float transmittance = 1.0;
    vec3 illumination = vec3(0.0);

    for (int i = 0; i < 32; i++) {
        samplePosition += marchDirection * stepSize;
        
        #ifdef USE_FUR_DENSITY
            float currentDensity = furDensity(1.0*samplePosition);
        #else
            float currentDensity = density(1.0*samplePosition);
        #endif

        transmittance *= exp(-currentDensity * extinctionCoef * stepSize);        
        float inScattering= ambientLight + 
            directLight * henyeyGreenstein(0.6,dot(-marchDirection,-l));  //directLight * phase(marchDirection, -l)
        float outScattering = scatteringCoef * currentDensity;
        vec3 currentLight = vec3(inScattering * outScattering);
        illumination += transmittance * currentLight * stepSize;
    }
    return vec4(illumination, transmittance);
}

#pragma glslify: export(VolumetricRaymarch); 