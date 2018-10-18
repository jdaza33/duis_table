<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    
  }
</script>

<style lang="scss">
  // Import Bulma's core
  
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #e65c00;
  $primary-invert: findColorInvert($primary);
  $twitter: #e65c00;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>







