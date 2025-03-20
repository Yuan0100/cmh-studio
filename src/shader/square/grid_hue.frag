vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0
            +vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

vec3 grid_hue(vec2 uv) {
    // vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv *= mat2(0.707, -0.707, 0.707, 0.707); //選轉原點在左下角
    vec2 st = 2.0* uv-1.0;
    //st *= mat2(0.707, -0.707, 0.707, 0.707); //選轉原點在中心點
    float scale=12.0;
    st = floor(st*scale)/scale;

    vec3 color = vec3(0.);
    float dir=atan(st.y, st.x)/(2.0*3.14159);
    float dist=1.0*length(st);
    color = hsl2rgb(vec3(dir,dist,0.5));

    // gl_FragColor = vec4(color,1.0);
    return color;
}

#pragma glslify: export(grid_hue)