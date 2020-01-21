<template>
  <div class="my" @click="func">
    hello {{msgs}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: "fanioc"
    }
  },
  methods: {
    func() {
      console.log("click func");
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
  color: white;
}
</style>