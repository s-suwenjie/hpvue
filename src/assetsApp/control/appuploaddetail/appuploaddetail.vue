<template>
  <div class="disable_menu">
    <div class="afc_upload_content amt4" :class="{afc_upload_content_touch:touchStyle}" v-long-tap="showMenuEvent" @touchstart="touchstartEvent" @touchend="touchendEvent">
      <div class="ac_icon" :class="[getIcon(item.image)]"></div>
      <div v-show="!isEdit" class="content">{{item.showName}}</div>
      <input ref="txtControl" v-show="isEdit" type="text" class="content" v-model="item.showName" @touchstart.stop @touchend.stop @blur="blurEvent"/>
      <div class="ac_icon i-long-tap amr8 afs24b"></div>
    </div>
    <!--操作面板显示-->
    <div v-show="operateStyle" class="afc_upload_more_operate">
      <div class="afc_upload_more_operate_main">
        <div class="afc_upload_more_operate_pop" @touchend.self="touchEndCloseOperateEvent"></div>
        <div class="afc_upload_more_operate_area">
          <yhm-app-action-sheet-menu @call="editNameEvent" class="btn b_border b_radius">修改名称</yhm-app-action-sheet-menu>
          <yhm-app-action-sheet-menu @call="deleteEvent" class="btn red">删除</yhm-app-action-sheet-menu>
          <div class="afc_upload_more_operate_split"></div>
          <yhm-app-action-sheet-menu @call="touchEndCloseOperateEvent" class="btn">取消</yhm-app-action-sheet-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-app-upload-detail',
    data(){
      return {
        touchStyle:false,
        operateStyle:false,
        isEdit:false,
        fileName:'我是上传文件名称'
      }
    },
    props:{
      content:{
        type:Array,
        required: true
      },
      item:{
        type:Object,
        required: true
      }
    },
    methods:{
      //修改名称
      editNameEvent(){
        this.isEdit = true
        this.operateStyle = false
        window.document.body.style.overflow = "auto";
        setTimeout(() => {
          this.$refs.txtControl.focus()
        },10)

        this.$nextTick(() =>{
          this.$refs.txtControl.focus()
        })
      },
      blurEvent(){
        this.isEdit = false
      },
      //按下按钮
      touchstartEvent(){
        this.touchStyle = true
      },
      //抬起
      touchendEvent(){
        this.touchStyle = false
      },
      //长按弹出操作菜单
      showMenuEvent(){
        if(!this.isEdit) {
          this.operateStyle = true
          this.touchStyle = false

          window.document.body.style.overflow = "hidden";
        }
      },
      //关闭操作菜单
      touchEndCloseOperateEvent(){
        this.operateStyle = false
        window.document.body.style.overflow = "auto";
      },
      deleteEvent(){
        let index = this.content.indexOf(this.item)
        this.content.splice(index,1)
        window.document.body.style.overflow = "auto";
      }
    },
    computed : {
      getIcon(){
        return function (image) {
          return image === '1' ? 'i-btn-image' : 'i-btn-file'
        }
      }
    }
  }
</script>

<style scoped>

</style>
