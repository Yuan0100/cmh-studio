float getDist(vec3 p){
        //SDF中，模型要擺在同一個場景要用min，
        //取最短距離，因為較近的距離一定在畫面前方，
        //遠的就會被遮擋。        
        return min(sdPlane(p),sdSphere(p));
    }

#pragma glslify: export(getDist);
