<template>
    <div class="structure_main" :class="{structure_main_touch:touchStyle}" v-tap="tapEvent" @touchstart="touchStartEvent" @touchend="touchEndEvent">
      <div v-if="getShowTitle" class="structure_main_title" @click="clickEvent">{{title}}
        <span v-show="locationShow" class="structure_main_location">{{index+1}}/{{length}}</span>
        <div class="rgtStructure">
          <slot name="rgtStructure"></slot>
        </div>
      </div>
      <div :class="{structureShow:mainShow,structure_main_content:contentShow}" >
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-structure-menu-group',
    data(){
      return {
        touchStyle:false,
        locationShow:false,
      }
    },
    props:{
      title:{
        type:String,
        default:''
      },
      url:{
        type:String,
        default:''
      },
      index:{
        type:Number,
        default: 0
      },
      mainShow:{
        type:Boolean,
        default : false
      },
      contentShow:{
        type:Boolean,
        default : true
      },
      length:{
        type:Number,
        default: 0
      },
      params:{
        type:Object,
        default:function() {
            return {}
        }
      }
    },
    methods:{
      clickEvent() {
        this.$nextTick(()=>{
          this.$emit('click')
        })
      },
      tapEvent(){
        if(this.url !== ''){
          this.$router.push(this.url)
        }
      },
      touchStartEvent(){
        if(this.url !== ''){
          this.touchStyle = true
        }
      },
      touchEndEvent(){
        this.touchStyle = false
      }
    },
    computed : {
        getShowTitle(){
          return this.title !== ''
        }
    },
    created () {
      if(this.index||this.length>0){
        this.locationShow=true
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
