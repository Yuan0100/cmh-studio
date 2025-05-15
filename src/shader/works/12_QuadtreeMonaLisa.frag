//Author: FabriceNeyret2 
//Title: random quadtree 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution; 
uniform sampler2D u_tex1;
uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;

// float iTime=u_time;                 //shadertoy
// vec2 iResolution=u_resolution;      //shadertoy
// vec2 iMouse=u_mouse;                //shadertoy
// //uniform sampler2D iChannel0;      //shadertoy
// //uniform sampler2D iChannel1;      //shadertoy

#define P_SUBDIV .35+.25*sin(iTime*0.5)
//#define P_SUBDIV 0.1

float rnd(vec3 v) { return fract(4e4*sin(dot(v,vec3(13.46,41.74,-73.36))+17.34)); }

vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}

vec2 scale(vec2 st, float s) {
    return (st-.5)*s+.5;
}

vec2 ratio(in vec2 st, in vec2 s) {
    return mix( vec2((st.x*s.x/s.y)-(s.x*.5-s.y*.5)/s.y,st.y),
                vec2(st.x,st.y*(s.y/s.x)-(s.y*.5-s.x*.5)/s.x),
                step(s.x,s.y));
}

float circleSDF(vec2 st) {
    return length(st - 0.5) * 2.0;
}

vec2 sphereCoords(vec2 _st, float _scale){
    float maxFactor = sin(1.570796327);
    vec2 uv = vec2(0.0);
    vec2 xy = 2.0 * _st.xy - 1.0;
    float d = length(xy);
    if (d < (2.0-maxFactor)){
        d = length(xy * maxFactor);
        float z = sqrt(1.0 - d * d);
        float r = atan(d, z) / 3.1415926535 * _scale;
        float phi = atan(xy.y, xy.x);
        uv.x = r * cos(phi) + 0.5;
        uv.y = r * sin(phi) + 0.5;
    } else {
        uv = _st.xy;
    }
    return uv;
}

vec4 sphereTexture(in sampler2D _tex, in vec2 _uv, float _time) {
    vec2 st = sphereCoords(_uv, 1.0);
    float aspect = u_tex0Resolution.y/u_tex0Resolution.x;
    st.x = fract(st.x * aspect + _time);
    return texture2D(_tex, st);
}


void main()
{
    float iTime=u_time;                 //shadertoy
    vec2 iResolution=u_resolution;      //shadertoy
    vec2 iMouse=u_mouse;                //shadertoy
    //uniform sampler2D iChannel0;      //shadertoy
    //uniform sampler2D iChannel1;      //shadertoy

    vec2 uv = gl_FragCoord.xy*1.0;          //input
    vec2 u, R=iResolution.xy, m=iMouse.xy;
    
    vec3 diff = vec3( vec2(1.0) / u_resolution.xy, 0.0);
    vec2 mouse_uv = u_mouse.xy / u_resolution.xy;
    float mouse_pointer = smoothstep(1.5, 0.5, length((mouse_uv - uv) * u_resolution) );
    /*
    if (m.x+m.y<1e-2*R.x) m = R*(.5+.5*sin(.1*iTime+vec2(0,1.6)));
    uv.x -= 8.*(m.x-R.x/2.);
    uv /= (1.-m.y/R.y)*4.;
    */
    vec4 color, luma;
    float adjust;
    
    float z = R.y/4.0;   
    int j=8;        //j初始8 紅紫
    for (int i=0; i<8; i++) {
        u = floor(uv/z)+.5;     //關鍵
        color=texture2D(u_tex0, (z*u)/R.xy);
        luma=vec4(0.21*color.r + 0.72*color.g + 0.07*color.b);
        adjust=pow(1.0-luma.g, 2.0);
        //if (rnd(vec3(z*u, iMouse.x)) < (P_SUBDIV+float(i)*0.13)) break;
        if (adjust < (P_SUBDIV+float(i)*0.11)) break;   //rnd(vec3(z*u, z))
        z /= 2.;
        j=i; //第幾次回圈結束
    }
    
    //i=0, 初始z＝600, 沒有進入if提早break, j=8 z=600 u=0.5
    //i=0, z=300紅, u=0.5        uv=300/2-abd(uv-300*0.5)
    //i=1, z=150橘, u=0.5, 1.5   uv=150/2-abd(uv-150*0.5)
    //i=2, z=75黃, u=0.5, 1.5, 2.5, 3.5
    //i=3, z=37.5綠, u= 0.5~7.5
    //i=4, z=16青綠, u= 0.5~15.5
    //i=5, z=8青, u= 0.5~31.5
    //i=6, z=4藍, u= 0.5~63.5
    //i=7, z=2黑, u= 0.5~127.5
    
    vec4 colornew=texture2D(u_tex0, (z*u)/R.xy);
    uv = z/2.-abs(uv-z*u); //z=2, 1-abs(uv-2u) 推測uv=0
    
    vec4 colorhue= vec4(hsv2rgb(vec3(float(j)/8.0, 0.7, 1.0)), 1.0);
    vec4 colorjitter=0.9+.4*cos( 6.28*rnd(vec3(z*u+1.,j))+ vec4(0,2.1,-2.1,0) );
    vec4 colorborder= min(uv.x,uv.y)<0.6 ? vec4(.0) : color;
    //color.g=pow(color.g, float(j));
    vec4 newframeColor = min(uv.x,uv.y)<0.6 ?  vec4(.0, .0, .0, 1.) : colornew;
    //gl_FragColor = colorborder;

    vec4 exposure=texture2D(u_buffer0, (gl_FragCoord.xy)/R.xy);
    gl_FragColor = mix(newframeColor, exposure, 0.98);
    

    /*
    gl_FragColor = min(uv.x,uv.y)<1. ? vec4(0) :
                // vec4(1); // vec4(z/R.y);
                .6+.4*cos(6.28*rnd(vec3(z*u+1.,z))+vec4(0,2.1,-2.1,0));
    */

    /*
    #if defined( BUFFER_0 )
    */

#if defined( BUFFER_0 )
    // Ping
    vec4 center = texture2D(u_buffer1, uv);
    float top = texture2D(u_buffer1, uv - diff.zy).r;
    float left = texture2D(u_buffer1, uv - diff.xz).r;
    float right = texture2D(u_buffer1, uv + diff.xz).r;
    float bottom = texture2D(u_buffer1, uv + diff.zy).r;

    float red = -(center.g - 0.5) * 2.0 + (top + left + right + bottom - 2.0);
    red += mouse_pointer; // mouse
    red *= 0.98; // damping
    red *= step(0.1, u_time); // hacky way of clearing the buffer
    red = 0.5 + red * 0.5;
    red = clamp(red, 0., 1.);
    gl_FragColor = vec4(red, center.r, 0.0, 0.0);

#elif defined( BUFFER_1 )
    // Pong 
    // Note: in this example you can get away with only one buffer...
    //       still is good to show off how easy is to make another buffer
    vec4 ping = texture2D(u_buffer0, uv, 0.0);
    if (u_time < 1.) {
        ping = vec4(vec3(0.5), 1.);
    }
    gl_FragColor = ping;

#else
    // Main Buffer
    vec4 ripples = texture2D(u_buffer1, uv);
    float offset = ripples.r - 0.5;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = scale(st, 2.0);
    st = ratio(st, u_resolution);

    st += offset;
    color = sphereTexture(u_tex0, st, u_time * 0.01);
    float radius = 1.0 - circleSDF(st);
    color.rgb *= smoothstep(0.001, 0.02, radius);
    color.rgb += (ripples.r - .5) * 2.;

    gl_FragColor = color;

#endif

}
