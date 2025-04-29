#pragma glslify: random = require('./common/random.frag')
#pragma glslify: square = require('./common/square.frag')
#pragma glslify: glow = require('./common/glow.frag')

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    // uv.x *= u_resolution.x/u_resolution.y;
    vec2 uvs = fract(uv * 6.);
    vec2 ipos = floor(uvs);
    vec2 fpos = fract(uvs);
    uv = fpos * 2.0 - 1.0;

    float circle_dist = square(uv, 0.75 + 0.45*random(ipos));

    float glow_circle = glow(circle_dist, 0.328, 0.56);
    vec3 color = vec3(glow_circle);
        
    gl_FragColor = vec4(color * vec3(.3,.4,.65), 1.0);
}