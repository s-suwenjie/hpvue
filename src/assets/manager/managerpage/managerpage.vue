<template >
  <div class="m_main" :class="{ism_Main: isManager}">
    <div>
      <slot name="title"></slot>
    </div>
    <div v-if="category === '0'" class="m_navigation" >
      <slot name="navigation"></slot>
      <div class="navLft">
        <slot name="navigationLft"></slot>
      </div>
    </div>
    <div v-if="category === '1'" class="menuTab" :class="{w620: smTable}">
      <div class="menuTabTit">
        <div class="menuTabLft">
          <slot name="navigationTab"></slot>

        </div>
        <div class="navSwitchLft">
          <slot name="navigationLft"></slot>
        </div>
      </div>
    </div>
    <div class="m_operate" :class="[{w620: smTable},{iswAuto: isManager}]">
      <slot name="operate"></slot>
      <div class="operaLft">
        <slot name="video"></slot>
      </div>

    </div>

    <div class="operateMore">
      <slot name="operateMore"></slot>
    </div>

    <slot v-if="!customize" name="choose"></slot>

    <div v-if="!customize" class="m_list" :class="[{w620: smTable},{iswAuto: isManager}]">
      <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table">
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
      <slot name="tillingEmpty"></slot>
    </div>
    <slot name="tiled"></slot>
    <div>
      <slot name="colorTip"></slot>
    </div>
    <div v-if="!customize" class="m_list mt10" :class="[{w620: totalTable,mr40:totalRgt,w418:totalWidth},{iswAuto: isManager}]">
      <slot name="total"></slot>
      <div class="listTotalCrente">
        <slot name="listTotalLeft"></slot>
        <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
          <thead>
          <tr>
            <slot name="listTotalHead"></slot>
          </tr>
          </thead>
          <tbody>
          <slot name="listTotalBody"></slot>
          </tbody>
        </table>
      </div>

    </div>
    <div v-if="!customize" class="m_pager">
      <slot name="pager"></slot>
    </div>
    <slot v-if="customize" name="customize"></slot>
  </div>
</template>

<script>
  export default {
    name: 'yhm-managerpage',
    props:{
      category:{
        type:String,
        default:'0'
      },
      customize:{
        type:Boolean,
        default: false
      },
      smTable:{
        type:Boolean,
        default: false
      },
      totalTable:{
        type:Boolean,
        default: false
      },
      totalWidth:{
        type:Boolean,
        default:false
      },
      totalRgt: {
        type: Boolean,
        default: false
      },
      isManager: {
        type: Boolean,
        default: false
      }
    }

  }
</script>

<style scoped>
.m_main{
  position: relative;
}

.ism_Main{
  height: auto;
  width: 1010px;
  min-height: auto;
  margin: 10px 20px;
  border-radius: 8px 8px 0 0;
}
.iswAuto{
  width: auto !important;
}

</style>
