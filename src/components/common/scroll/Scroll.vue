<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll.vue",
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(0,0);
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
      })
    }
  }
</script>

<style scoped>

</style>
