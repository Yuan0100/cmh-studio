#pragma glslify: map = require('./map.frag')

//=== iq’s calc AO ===
float calcAO( in vec3 pos, in vec3 nor )
{
    float ao = 0.0;

    vec3 v = normalize(vec3(0.7,-0.1,0.1));
    for( int i=0; i<12; i++ )
    {
        float h = abs(sin(float(i)));
        vec3 kv = v + 2.0*nor*max(0.0,-dot(nor,v));
        ao += clamp( map(pos+nor*0.01+kv*h*0.08)*3.0, 0.0, 1.0 );
        v = v.yzx; //if( (i&2)==2) v.yz *= -1.0;
    }
    ao /= 12.0;
    ao = ao + 2.0*ao*ao;
    return clamp( ao*5.0, 0.0, 1.0 );
}

#pragma glslify: export(calcAO)