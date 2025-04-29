float hash11(float p) {
  return fract(sin(p * 727.1)*43758.5453123);
}

#pragma glslify: export(hash11);