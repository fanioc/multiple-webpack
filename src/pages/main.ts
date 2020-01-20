import Vue from 'vue'
import VueApp from '@/components/app.vue'
import './style.css'


new Vue({
  el: "#qwe",
  template: `
    <div>{{msg}}</div>`,
  data: {
    msg: "hello,word"
  }
});


new Vue({
  render: h => h(VueApp),
}).$mount('#app');
