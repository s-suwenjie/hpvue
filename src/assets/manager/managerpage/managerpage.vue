<template >
  <div class="m_main" :class="{ism_Main: isManager}"  :style="{width:mainWidth+'px',height:mainHeight+'px',minHeight:mainHeight+'px'}">
    <div>
      <slot name="title"></slot>
    </div>
    <div v-if="category === '0'" class="m_navigation" >
      <slot name="navigation"></slot>
      <div class="navLft">
        <slot name="navigationLft"></slot>
      </div>
      <div v-show="statisticalShow" style="top: 0;" @click="statisticalClick" :class="iconStatistical" class="statistical"></div>

    </div>
    <div v-if="category === '1'" class="menuTab" :class="{w620: smTable}" :style="{width:menuTabWidth+'px'}">
      <div class="menuTabTit">
        <div class="menuTabLft">
          <slot name="navigationTab"></slot>
        </div>
        <div class="navSwitchLft">
          <slot name="navigationLft"></slot>
        </div>
        <div v-show="statisticalShow" @click="statisticalClick" :class="iconStatistical" class="statistical"></div>

      </div>
    </div>
    <div class="m_operate" :class="[{w620: smTable},{iswAuto: isManager}]" :style="{width:menuTabWidth+'px'}">
      <slot name="operate"></slot>
      <div class="operaLft" :style="{top:operaLftTop}">
        <slot name="video"></slot>
      </div>

    </div>

    <div class="operateMore">
      <slot name="operateMore"></slot>
    </div>

    <slot v-if="!customize" name="choose"></slot>
    <slot name="buttonSwitch"></slot>
    <div v-if="!customize" class="m_list" style="padding: 0 10px;" :class="[{w620: smTable},{iswAuto: isManager}]" :style="{width:menuTabWidth+'px'}">
      <div style="padding-bottom: 2px;" :style="{overflowX:overflowX}" class="scrollHide" @scroll="scrollEvent" ref="scrollDiv">
        <table id="tb_2" width="100%" cellpadding="0" cellspacing="0" ref="tableWidth" class="m_content_table">
          <thead>
          <tr>
            <slot name="listHead"></slot>
          </tr>
          </thead>
          <tbody>
            <slot name="listBody"></slot>
          </tbody>
        </table>
      </div>
      <slot name="empty"></slot>
      <slot name="tillingEmpty"></slot>
    </div>
    <slot name="tiled"></slot>
    <div>
      <slot name="colorTip"></slot>
    </div>
    <div v-if="!customize" class="m_list mt10" :style="{width:totalWidthCenter+'px' }" :class="[{w620: totalTable,mr40:totalRgt,w418:totalWidth},{iswAuto: isManager}]">
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
        <slot name="listTotalRight"></slot>


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
    data(){
      return{
        overflowShow:false,
        overflowX: 'scroll'
      }
    },
    props:{
      category:{
        type:String,
        default:'0'
      },
      mainWidth:{
        type:String,
        default:''
      },
      mainHeight:{
        type:String,
        default:''
      },
      menuTabWidth:{
        type:String,
        default:''
      },
      statisticalShow:{
        type:Boolean,
        default:false
      },
      operaLftTop:{
        type:String,
        default:''
      },
      iconStatistical:{
        type:String,
        default:'uniE9A7'
      },
      totalWidthCenter:{
        type:String,
        default:''
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
    },
    updated(){
      this.controlwidth()
      this.toObtainTheWidth()
      this.judgmentScope()
    },
    methods:{
      judgmentScope(){
        this.$nextTick(()=>{
          // console.log(document.getElementById("tb_2").offsetWidth)
          let tableWidth = document.getElementById("tb_2").offsetWidth
          try{
            if(this.$slots.empty.length=='1'){
              this.scrollHideShow = this.$slots.empty[0].data.directives[0].value
              // this.$nextTick(()=>{
              if(this.scrollHideShow){
                document.styleSheets[0].addRule('.scrollHide::-webkit-scrollbar','width: 0px !important;height:0px !important;');
                this.overflowX = 'inherit'
              }else{
                // console.log(tableWidth)
                if(Number(tableWidth)>1580){
                  document.styleSheets[0].addRule('.scrollHide::-webkit-scrollbar','width: 10px !important;height:10px !important;');
                  this.overflowX = 'scroll'
                }else{
                  document.styleSheets[0].addRule('.scrollHide::-webkit-scrollbar','width: 0px !important;height:0px !important;overflow-x: inherit;');
                  this.overflowX = 'inherit'
                }
              }
              // })
              // console.log(this.$slots.empty[0].data.directives[0])
              // this.overflowTypeShow = this.$slots.empty[0].data.directives[0].value
              // if(Number(tableWidth)<=1580){
              //
              // }
            }
          }catch(err)
          {
            //在此处理错误
          }

        })
      },
      toObtainTheWidth(){
        let full = $('#tb_2').outerWidth(true);
        if(full>1585){
          this.overflowShow = true

        }else{
          this.overflowShow = false
        }
      },
      controlwidth(){
        //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
        var tTD;
        var table;
        let that = this;
        table = document.getElementById("tb_2");
        for (let j = 0; j < table.rows[0].cells.length; j++) {
          table.rows[0].cells[j].onmousedown = function () {
            //记录单元格
            tTD = this;
            if (event.offsetX > tTD.offsetWidth - 10) {
              tTD.mouseDown = true;
              tTD.oldX = event.x;
              tTD.oldWidth = tTD.offsetWidth;
            }
            // 记录Table宽度
            table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;
            tTD.tableWidth = table.offsetWidth;
          };
          table.rows[0].cells[j].onmouseup = function () {
            //结束宽度调整
            if (tTD == undefined) tTD = this;
            tTD.mouseDown = false;
            tTD.style.cursor = 'default';
          };
          table.rows[0].cells[j].onmousemove = function () {
            if(this.style[0]=='width'){
              return
            }
            //更改鼠标样式
            if (event.offsetX > this.offsetWidth - 10)
              this.style.cursor = 'col-resize';
            else
              this.style.cursor = 'default';
            //取出暂存的Table Cell
            if (tTD == undefined) tTD = this;
            //调整宽度
            if (tTD.mouseDown != null && tTD.mouseDown == true) {
              tTD.style.cursor = 'default';
              if (tTD.oldWidth + (event.x - tTD.oldX)>0)
                tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
              //调整列宽
              tTD.style.width = tTD.width;
              tTD.style.cursor = 'col-resize';
              //调整该列中的每个Cell
              table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;
              for (j = 0; j < table.rows.length; j++) {
                table.rows[j].cells[tTD.cellIndex].width = tTD.width;
              }
              that.toObtainTheWidth()
              //调整整个表
              table.width = tTD.tableWidth + (tTD.offsetWidth-tTD.oldWidth);
              table.style.width = table.width;
              // console.log(table.width)
              that.judgmentScope()
            }
          }
        }
      },
      scrollEvent(e){
        $('.stickyOverflow').css({
          "display":'block'
        })
        // console.log(this.$refs.scrollDiv,this.$refs.scrollDiv.scrollLeft);
        if(this.$refs.scrollDiv.scrollLeft!=0){
          $('.stickyLeft:odd').css({
            "background-color":"#dcdbdb",
            "box-shadow":"0px 1px 3px #000",
          })
          $('.stickyLeft:even').css({
            "background-color":"#fff",
            "box-shadow":"0px 1px 3px #000",
          })
        }else{
          $('.stickyLeft').css({
            "background":"none",
            "box-shadow":"none",
          })
        }
        if(this.$refs.scrollDiv.scrollRight!=0){
          $('.stickyRight:odd').css({
            "background-color":"#dcdbdb",
            "box-shadow":"0px 1px 3px #000",
          })
          $('.stickyRight:even').css({
            "background-color":"#fff",
            "box-shadow":"0px 1px 3px #000",
          })
        }else{
          $('.stickyRight').css({
            "background":"none",
            "box-shadow":"none",
          })
        }
      },
      statisticalClick(){
        this.$nextTick(()=>{
          this.$emit('statisticalClick')
        })
      }
    },
    created () {
      this.$nextTick(()=>{
        $('.stickyOverflow').css({
          "display":'none'
        })
      })
    }

  }
</script>

<style scoped>
  .scrollHide::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    /*box-shadow: inset 0 0 5px rgba(0,0,0,.2);*/
    margin-top: 5px;
    border-radius: 5px;
    background: #999;
  }
  ::-webkit-scrollbar-track {
    /*box-shadow: inset 0 0 5px rgba(0,0,0,.2);*/
    margin-top: 5px;
    border-radius: 0;
    background: #fff;
  }
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
.statistical{
  position: absolute;
  top: 12px;
  font-size: 24px;
  right: 14px;
  color: #fff;
  cursor: pointer;
}
</style>

