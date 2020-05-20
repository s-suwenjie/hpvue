<template>
    <div>
      <!-- 移动端 右侧弹出筛选框 -->
      <div class="a_mask a_mask_show" v-if="alertShow" @click="closeEvent" style="z-index: 2;"></div>
      <div class="app_alert" ref="hidden" :class="{'hidden':!alertShow}">
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
      }
    },
    props:{
      alertShow:{
        type:Boolean,
        before: false
      },
    },
    methods:{
      closeEvent(){//用户点击左上角关闭时
        this.$nextTick(()=>{
          this.$emit('close')
        })
      },
    },
    created(){
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
    },
    watch: {
      alertShow(val, newval) {
        if(val==false){
          this.$refs.hidden.style.right = '-99%'
        }else{
          this.$refs.hidden.style.right = '0'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@rem:375/10rem;
  .app_alert{
    z-index: 2;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 70%;
    height: 85%;
    border-radius: 8/@rem 0px 0px 8/@rem;
    background-color: #ffffff;
  }
  .alert_top{
    width: 100%;
    height: 32/@rem;
    position: relative;
    background-color: #49a9ea;
    border-radius: 8/@rem 0px 0px 0px;
  }
  .app_aller_del{
    position: absolute;
    top: 9/@rem;
    left:9/@rem;
    color: #fff;
    font-size: 16/@rem;
  }
  .app_table{
    width: 100%;
    font-size: 14/@rem;
  }
  .app_table_tr:nth-of-type(odd){ background:#f3f3f3;}
  .app_table_tr:nth-of-type(even){ background:#fff;}
  .app_table_tr{
    height: 29/@rem;
    display: flex;
    align-items: center;
    background:#fff;
  }
  .app_table_tr span{
    margin-right: 9/@rem;
    color: #333333;
  }
  .app_table_th{
    display: flex;
    align-items: center;
    background:#d4ecfc;
    height: 29/@rem;
  }
  .app_table_th span{
    margin-left: 9/@rem;
    color: #666666;
  }
  .alert_bottom{
    width: 100%;
    position: absolute;
    bottom: 31/@rem;
  }
  .app_alert_main{
    padding:8/@rem;
  }
  .hidden{
    position: fixed;
    right: -99%;
    transition: all 0.6s;
  }
  .app_table_tr_money{
    width: 33%;
    text-align: right;
  }
  .app_table_tr_img{
    margin:0 10/@rem;
  }
  .alert_bottom{
    display: flex;
    justify-content: center;
  }

</style>
