import schedule from './schedule.vue'

export default {
  install (Vue) {
    Vue.component(schedule.name, schedule);
  }
}
