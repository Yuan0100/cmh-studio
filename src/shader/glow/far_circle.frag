#pragma glslify: rotate2d = require('./common/rotate2d.frag')
#pragma glslify: noise = require('./common/noise.frag')
#pragma glslify: circle = require('./common/circle.frag')
#pragma glslify: fbm = require('./common/fbm.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;	//[0,1]
    //st.x *= u_resolution.x/u_resolution.y;//[0~1.33]
    vec2 uv = st*2.0-1.0; //[0,1] -> [-1,1]
    //uv.x *= u_resolution.x/u_resolution.y;//[-1.33~1.33]
    
    vec3 color;
    for(int index=0;index<12;++index)
    {
        float noise_position= smoothstep(0.2, 0.7, uv.x+0.420);
        float noise_scale=0.328*noise_position;
        float noise_freq=2.084;
        //float circle_dist=circle(uv, 0.480+noise_scale
            //*noise( vec3(uv*noise_freq, float(index)+u_time*0.4)) );
        
        uv *= rotate2d(-0.004);
        float circle_dist=circle(uv, 0.480+noise_scale
            *noise( vec3(uv*noise_freq, float(index)+u_time*0.4)) );
        
        
        float breathing= sin(u_time/2.0*3.14159)*0.2+0.5;//[0.3, 0.7]
        //float breathing= mix(0.3, 0.7, 
            //sin(u_time/2.0*3.14159)*0.5+0.5);//[0.3, 0.7]
        float glow_circle= glow(circle_dist,0.3,0.014);
        //float glow_circle= exp(-circle_dist*8.5);

        //亂數作用雲霧
        float fog= fbm(0.4*uv+vec2(-0.2*u_time, -0.02*u_time))*0.6+0.1;
        
        color += vec3(glow_circle); //*vec3(1.000,0.348,0.006)
    }
            
    gl_FragColor = vec4(color,1.0);
}