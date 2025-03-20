#pragma glslify: gnoise = require(./gnoise.frag)

float fbm(in vec2 uv)       //亂數範圍 [-1,1]
{
    float f;                //fbm - fractal noise (4 octaves)
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    f   = 0.5000*gnoise( uv ); 
    uv = m*uv;		  
    f += 0.2500*gnoise( uv ); 
    uv = m*uv;
    f += 0.1250*gnoise( uv ); 
    uv = m*uv;
    f += 0.0625*gnoise( uv ); 
    uv = m*uv;
    return f;
}

#pragma glslify: export(fbm);