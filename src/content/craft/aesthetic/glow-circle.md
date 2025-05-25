---
title: "Glow Circle"
description: "A simple glow effect in a circle."
pubDate: "2022-01-01"
updateDate: "2022-01-01"
heroImage: '/assets/craft/aesthetic/1.png'
shader:
    src: "glow/glow_circle.frag"
---

```glsl
float circle(vec2 uv, float radius){
    float dist = length(uv);
    float circle_dist = abs(dist-radius);//光環大小
    return circle_dist;
}

#pragma glslify: export(circle);
```

# Pluto

**Pluto** (minor-planet designation: *134340 Pluto*)
is a
[dwarf planet](https://en.wikipedia.org/wiki/Dwarf_planet)
in the
[Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt).

## History

In the 1840s,
[Urbain Le Verrier](https://wikipedia.org/wiki/Urbain_Le_Verrier)
used Newtonian mechanics to predict the position of the
then-undiscovered planet
[Neptune](https://wikipedia.org/wiki/Neptune)
after analyzing perturbations in the orbit of
[Uranus](https://wikipedia.org/wiki/Uranus).

***

Just a link: www.nasa.gov.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

<details>
<summary>Show example</summary>

```js
console.log('Hi pluto!')
```

</details>