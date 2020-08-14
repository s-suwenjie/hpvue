<template>
    <div>
      <div class="privilege">
        <div class="privilege_main">
          <!--此处循环顶部菜单-->
          <div @click="selectTabEvemt(index)" v-for="(item,index) in details" :key="index" :class="{privilegeSelect:getOpenTab(index)}">{{item.name}}</div>
        </div>
        <div class="privilege_tabLineH"></div>
      </div>
      <div class="privilegeDetails">
        <div class="privilegeLeft">
          <div class="privilegeLeft_mian">
            <!--此处循环右侧大菜单-->
            <div @click="selectLeftTabEvemt(item,index)" v-for="(item,index) in leftItems" :key="index" :class="{privilegeLeftSelect:getOpenLeftTab(index)}">{{item.name}}</div>
          </div>
          <div class="privilege_tabLineV"></div>
        </div>
        <div class="privilegeLeftDetails">
          <div v-for="(item,index) in items" :key="index">
            <yhm-form-privilege-details :name="item.name" :auth="item.details"></yhm-form-privilege-details>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "yhm-form-privilege",
      inject: ['p____page'],
      data(){
        return{
          selectIndex:this.value,
          selectIndexLeft:0,
          leftItems:this.getLeftItems, //左侧大菜单
          items: this.getItems, //明细菜单
        }
      },
      props: {
        details: {
          type: Array,
          required: true
        },
        value: {
          type: Number,
          default:0
        },
      },
      methods:{
        //切换顶部菜单
        selectTabEvemt(index){
          if(!this.getOpenTab(index)){
            this.selectIndex = index
            this.leftItems = this.details[index].details
            this.selectIndexLeft = 0
            this.items = this.leftItems[0].details
          }
        },
        selectLeftTabEvemt(item,index){
          if(!this.getOpenLeftTab(index)){
            this.selectIndexLeft = index
            this.items = item.details
          }
        }
      },
      computed:{
        getOpenTab(){
          return function (index) {
            return this.selectIndex === index
          }
        },
        getOpenLeftTab(){
          return function (index) {
            return this.selectIndexLeft === index
          }
        },
        getLeftItems(){
          if(this.details.length > 0){
            return this.details[this.value].details
          }
          else{
            return []
          }
        },
        getItems(){
          if(this.details.length > 0){
            return this.details[this.value].details[0].details
          }
          else{
            return []
          }
        }
      },
      watch:{
        details:{
          handler(newVal,oldVal){
            this.leftItems = newVal[this.selectIndex].details //左侧大菜单
            this.items = newVal[this.selectIndex].details[this.selectIndexLeft].details //明细菜单
          },
          deep: true
        }
      }
    }
</script>

<style scoped>

</style>
