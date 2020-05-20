<template>
    <div class="t_list t_list_form mr0 ml0 mb0">
      <slot name="operate"></slot>
      <table class="t_table" width="100%" border="1" cellspacing="0">
        <thead>
        <tr>
          <slot name="listHead"></slot>
        </tr>
        </thead>
        <tbody >
        <slot name="listBody"></slot>
        </tbody>
      </table>
      <div class="v_empty">
        <slot name="empty"></slot>
      </div>
      <div v-if="pager" class="m_pager">
        <slot name="pager"></slot>
      </div>
      <div class="v_customize" :style="getCustomizeBgColor" >
        <slot v-if="customize" name="customize"></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-view-tab-list',
    props:{
      pager:{
        type:Boolean,
        default:true
      },
      customizeBgColor:{
        type:String,
        default:''
      },
      customize:{
        type:Boolean,
        default: false
      }
    },
    computed:{
      getCustomizeBgColor(){
        if(this.customizeBgColor === ''){
          return ''
        }
        else{
          return 'border-radius: 0 0 8px 8px;background-color: ' + this.customizeBgColor
        }
      }
    }
  }
</script>

<style scoped lang="less">
.m_main{
  width: auto;
  height: auto;
  min-height: auto;
  float: none;
  margin-bottom: 0;
  position: relative;

}
</style>
