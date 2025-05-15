#pragma glslify: GetDist = require('./getDist.frag');

float rayMarching(vec3 ro,vec3 rd){
        float dO = 0.;
        for(int i = 0 ; i < 64 ; i++){
            vec3 p = ro+rd*dO;
            float ds = GetDist(p);
            dO += ds;
            if(ds<0.01 || dO>100.)
                break;
        }
        return dO;
    }

#pragma glslify: export(rayMarching);
