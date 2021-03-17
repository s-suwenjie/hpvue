import previewSms from './previewSms.vue'

export default {
  install (Vue) {
    Vue.component(previewSms.name, previewSms);
  }
}
