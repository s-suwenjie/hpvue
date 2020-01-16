import upload from './upload.vue'

export default {
  install (Vue) {
    Vue.component(upload.name, upload);
  }
}
