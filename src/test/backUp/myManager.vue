<template>
  <div>
    <yhm-managerpage category="1">
      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index"
             :class="{menuTabActive:menuTabOn == index}"
                     :to="{path:item.path}"
             @click="menuTab(index)">
          {{item.name}}

        </router-link>
      </template>
    </yhm-managerpage>
    <router-view></router-view>

  </div>

</template>

<script>
  export default {
    name: 'materialManager',
    data(){
      return {
        menuTabOn:'0',
        details:[
          {id:'1', name: '付款计划',path:'/home/myManager/paymentPlanManager'},
          {id:'2', name: '付款',path:'/home/myManager/paymentApplyManager'},
        ],
      }
    },
    methods : {
      menuTab (index) {
        this.menuTabOn = index
      }
    }
  }
</script>

<style scoped>

</style>
