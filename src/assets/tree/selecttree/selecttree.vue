<template>
  <td >
    <div class="md_center" v-if="mine" v-show="show==0">
      <span @click="selectEvent(value)" class="md_select check_button_icon" :class="{check_button_icon_select:colors}"></span>
    </div>
    <div class="md_center" v-if="!mine" v-show="show==0">
      <span @click="selectEvent" class="md_select check_button_icon litter" :class="{check_button_icon_select:colors}"></span>
    </div>
    <div class="md_center" v-if="mine" v-show="show==1" @click="selectEvent" style="font-size: 18px;text-align: center;">
      <span class="icon-up" :class="{animation:!down}"></span>

    </div>
<!--    <div class="md_center" v-if="mine" v-show="show==1">-->
<!--      <span @click="selectEvent" class="icon-up"></span>-->
<!--    </div>-->
<!--    <div class="md_center" v-if="!mine" v-show="!show">-->
<!--      <span @click="selectEvent" class=" icon_down litter" :class="{check_button_icon_select:colors}"></span>-->
<!--    </div>-->

  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-selecttree',
    data(){
      return{
        // colors:false,
        select:[],
        down:true,
      }
    },
    props:{
      value: {
        type: Object,
        required: true,
      },
      noClick:{
        type:Boolean,
        default:true,
      },
      mine:{
        type:Boolean,
        default:true,
      },
      colors:{
        type:Boolean,
        default:false,
      },
      show:{
        default:0,
      },
      downs:{
        type:Boolean,
        default:true,
      }

    },
    created(){
      this.down=this.downs
    },
    methods:{
      selectEvent(value){
        this.down=!this.down
        let index = this.select.indexOf(value.id)
        if(index === -1){
          this.select.push(value.id)
          this.select[value.id] = value
        }
        else{
          this.select[value.id] = null
          this.select.splice(index,1)
        }
        let selectss=this.select
        this.$emit("call",selectss)
      },
    },
    watch:{
      downs:function(val,oldVal){
        console.log(this.downs)
        this.down=this.downs
      }
    }
  }
</script>

<style scoped>
  .litter{
    font-size: 14px;
  }
  .icon-up::before{
    color: #0E128D;
  }
  .animation{
    transform:rotate(180deg);
  }
</style>
