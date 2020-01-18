<template>
    <div>
      <div class="a_mask a_mask_show" v-if="true" style="z-index: 1;"></div>
      <div class="app_alert" v-show="true" :class="{'hidden':hideShow}">
        <div class="alert_top">
          <span class="i-btn-del app_aller_del" @click="closeEvent" ></span>
        </div>
        <div class="app_alert_main">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'appfiltrate',
    data(){
      return{
        // hideShow:false,//弹窗收回和动画
      }
    },
    props:{
      hideShow:{
        type:Boolean,
        default : false
      },
      leftAlert:{
        type:Boolean,
        default : false
      },
    },
    methods:{
      closeEvent(){//用户点击左上角关闭时
        this.$nextTick(()=>{
          this.leftAlert=false
          this.$emit('click',this.leftAlert)
        })
      },
      // confirm(livenessIndex,livenessItem,accountIndex,accountItem){//点击确定后 返回选中索引与值
      //   this.shadeShow=false
      //   this.hideShow=true
      //   this.alertShow=false
      //   // this.list = []
      //   console.log( livenessIndex,livenessItem,accountIndex,accountItem,this.hideShow,this.shadeShow,this.alertShow )
      //   this.$nextTick(()=>{
      //     this.$emit('click',livenessIndex,livenessItem,accountIndex,accountItem)
      //   })
      // },
      // reset(){//重置选择
      //   this.account = this.accountList.length-1//重置索引值
      //   this.liveness = this.livenessList.length-1
      // },
      // livenessClick(index,item){//获取选中索引以及值
      //   this.liveness = index
      // },
      // accountClick(index,item){//获取选中索引以及值
      //   this.account = index
      // },
      // tacitlyApprove(){//默认选中全部
      //   this.$nextTick(()=>{
      //     this.liveness = this.livenessList.length-1//重置索引值
      //     this.account = this.accountList.length-1
      //   })
      // }
    },
    created(){
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      // this.tacitlyApprove()
    }
  }
</script>

<style scoped>

</style>
