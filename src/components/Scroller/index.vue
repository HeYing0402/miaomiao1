<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    handelToScroll: {
      type: Function,
      default: function () {}
    },
    handelToTouchEnd: {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    setTimeout(() => {
      var scroll = new BScroll(this.$refs.wrapper, {
        tap: true,
        click: true,
        probeType: 1
      })
      this.scroll = scroll
      scroll.on('scroll', (pos) => {
        this.handelToScroll(pos)
      })
      scroll.on('touchEnd', (pos) => {
        this.handelToTouchEnd(pos)
      })
    }, 1000)
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>
<style scoped>
  .wrapper{height: 100%;}
</style>
