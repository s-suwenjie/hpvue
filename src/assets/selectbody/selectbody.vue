<template>
  <div>
    <div class="f_area" v-if="chooseBg" :class="{f_areaWidth1235:areaWidth=='1235'}">
      <div class="f_flex_column" :class="{cancelColumn:cancelFrame}">
        <div class="s_operate " :class="{pb0:!choose}">
          <div style="display: flex">
            <slot name="operate"></slot>
          </div>
          <div v-show="operatergtShow">
            <slot name="operatergt"></slot>
          </div>
        </div>
        <div v-if="choose" class="s_choose" :class="{cancelColumn:cancelFrame}">
          <slot name="choose"></slot>
        </div>
      </div>
    </div>
    <div class="f_split" v-if="chooseBg"></div>
    <div class="f_area" v-show="!areaShow">
      <div class="t_list t_list_form mt16" :class="{mb0:chooseBg}">
        <table class="t_table" width="100%" border="1" cellspacing="0">
          <thead>
            <tr>
              <slot name="listHead"></slot>
            </tr>
          </thead>
          <tbody>
            <slot name="listBody"></slot>
          </tbody>
        </table>
        <slot name="empty"></slot>
        <div class="f_between">
          <slot name="pager"></slot>
        </div>
        <div>
          <slot name="customize"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-select-body',
    props:{
      choose:{
        type:Boolean,
        default:true
      },
      chooseBg:{
        type:Boolean,
        default:true
      },
      areaShow:{
        type:Boolean,
        default:false
      },
      areaWidth:{
        type:String,
        default:''
      },
      cancelFrame:{
        type:Boolean,
        default:false
      },
      operatergtShow:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>

</style>
