#pragma glslify: hsv2rgb_smooth = require('./hsv2rgb_smooth.frag');

vec3 flameColour(float f)
    {
        return hsv2rgb_smooth(vec3((f-(2.25/6.))*(1.25/6.),f*1.25+.2,f*.95));
    }

#pragma glslify: export(flameColour);