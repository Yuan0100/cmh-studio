#pragma glslify: hash2 = require(./hash2.frag)

float gnoise( in vec2 p )   //亂數範圍 [-1,1]
{
    vec2 i = floor( p );
    vec2 f = fract( p );
    
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash2( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
        dot( hash2( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
        mix( dot( hash2( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
        dot( hash2( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

#pragma glslify: export(gnoise);