<template lang="pug">
.ov-template-wrap
  <template v-if="animationTemplate === 3">
    -for (i = 1; i <= 100; i++)
      .circle-container
        .circle
  </template>
  <template v-if="animationTemplate === 2">
  #background
  #midground
  #foreground
  </template>
  <template v-if="animationTemplate === 8">
  #stars
  #stars2
  #stars3
  </template>
  <template v-if="animationTemplate === 1">
  .stars
  .twinkling
  .clouds
  </template>
  <template v-if="animationTemplate === 7">
  .night
    - for (i = 0; i < 20; i++)
      .shooting_star
  </template>
  <template v-if="animationTemplate === 6">
   .background
    - for (i = 0; i < 20; i++)
      span
  </template>
  <template v-if="animationTemplate === 5">
    div
      .light.x1
      .light.x2
      .light.x3
      .light.x4
      .light.x5
      .light.x6
      .light.x7
      .light.x8
      .light.x9
  </template>
  <template v-if="animationTemplate === 4">
    - for (var i = 1; i <= 100; i++)
      .firefly
  </template>
</template>
<script>
export default {
  name: 'AnimationTemplate',
  props: {
    animationTemplate: {
      type: [Number, String],
      default () {
        return 0
      }
    }
  }
}
</script>
