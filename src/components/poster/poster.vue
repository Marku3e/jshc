<template>
  <div id="poster">
    <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "poster",
    data() {
      return {
        show: true
      }
    }
  }
</script>

<style scoped lang='less'>
  #poster {
    font-size: 0.16rem;
    .fade-enter-active, .fade-leave-active {
      transition: all 2s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translateX(2rem);
    }
  }
</style>
