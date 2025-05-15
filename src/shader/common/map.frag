#pragma glslify: sdTorus = require(./sdTorus.frag)

float map(in vec3 p)
{
//return sdSphere(p+vec3(0.,0.,1.0), 0.4);
return sdTorus(p+vec3(0.,0.,0.0),vec2(0.4,0.1));
//return sdBox(p+vec3(0.0,0.0,1.0), vec3(0.2, 0.2, 0.2));

//方形中挖掉圓形
// return max(boxSDF(p+vec3(0.0,0.0,1.0), vec3(0.3, 0.3, 0.3)), -sphereSDF(p+vec3(0.,0.,1.0), 0.5));
}

#pragma glslify: export(map);