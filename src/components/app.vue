<template>
  <div class="my">
    hello {{msgs}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend<{ msg: string }, any, any, any>({
  data() {
    return {
      msg: "fanioc"
    }
  },
  computed: {
    msgs(): string {
      return "hello " + this.msg
    }
  }
})
</script>

<style lang="scss" scoped>
.my {
  color: gray;
  backdrop-filter: blur(10px);
}
</style>