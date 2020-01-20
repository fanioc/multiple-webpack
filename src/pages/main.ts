import Vue from 'vue'
import App from '@/components/app.vue'
import './style.css'

new Vue({
  el: "canvas",
  template: `
    <div>{{msg}}</div>`,
  data: {
    msg: "hello,word"
  }
});


new Vue({
  render: h => h(App),
}).$mount('#app');
