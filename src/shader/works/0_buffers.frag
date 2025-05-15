vec4 buffers(vec2 uv) {
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
      // gl_FragColor = vec4(red, center.r, 0.0, 0.0);
      return vec4(red, center.r, 0.0, 0.0);

  #elif defined( BUFFER_1 )
      // Pong 
      // Note: in this example you can get away with only one buffer...
      //       still is good to show off how easy is to make another buffer
      vec4 ping = texture2D(u_buffer0, uv, 0.0);
      if (u_time < 1.) {
          ping = vec4(vec3(0.5), 1.);
      }
      // gl_FragColor = ping;
      return ping;

  #else
      // Main Buffer
      vec4 ripples = texture2D(u_buffer1, uv);
      float offset = ripples.r - 0.5;

      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      st = scale(st, 2.0);
      st = ratio(st, u_resolution);

      st += offset;
      vec4 color = sphereTexture(u_tex0, st, u_time * 0.01);
      float radius = 1.0 - circleSDF(st);
      color.rgb *= smoothstep(0.001, 0.02, radius);
      color.rgb += (ripples.r - .5) * 2.;

      // gl_FragColor = color;
      return color;

  #endif
}

#pragma glslify: export(buffers);