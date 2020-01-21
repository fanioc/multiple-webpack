import Vue from 'vue'
import VueApp from '@/components/_demo/vue_app.vue'
import './style.css'
import "@/components/common/common.scss"

new Vue({
  el: "#posts_app",
  template: `
    <div>
      <div v-for="item of list" @click="myfunc">{{msg}}</div>
    </div>`,
  data: {
    msg: "hello,word",
    list: ["1", "2", "3"]
  },
  methods: {
    myfunc() {
      console.log("click func");
    }
  }
});

new Vue({
  render: h => h(VueApp),
}).$mount('#person_info');
