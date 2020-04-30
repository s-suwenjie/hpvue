<template>
  <div v-if="show" class="fc_main" v-validator="validatorEvent">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">
        <div class="c_main_upload">
          <yhm-upload :no-upload="noUpload" @call="uploadImg" @mouseoverEvent="mouseoverEvent" @mouseoutEvent="mouseoutEvent" :tag="tag" title="上传图片">
            <div class="c_image_main" :class="getBig">
              <div class="c_image fs18b" :class="[getDefaultStyle,{c_error:error,red:error}]">
                <div class="box">
                  <img v-if="getShow" :src="getImgUrl">
                </div>
              </div>
            </div>
          </yhm-upload>
          <div class="c_image_discription" :class="{red:error}" v-html="discription"></div>
        </div>
      </div>
    </div>

    <div class="imgShow" v-show="isImgShow">
      <img :src='getShowUrl' alt="">
    </div>

    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-form-upload-image',
    inject: ['p____page'],
    data () {
      return {
        url:this.value,
        error: false,
        isImgShow: false,
        errorTipMessage: '',
        getShowUrl: ''
      }
    },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      discription:{
        type:String,
        default:'这里可以写描述'
      },
      big:{
        type:Number,
        default:1
      },
      value:{
        type:String,
        required:true
      },
      id:{
        type:String,
        required:true
      },
      tag:{
        type:String,
        default:'temp'
      },
      rule:{
        type:String,
        default:""
      },
      show: {
        type: Boolean,
        default: true
      },
      isShow: {
        type: Boolean,
        default: false
      },
      noUpload: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.id;
          id = id.replace(".","_")
          if (category === "bind") {
            if(this.p____page.p____rule.indexOf(id) === -1){
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === "unbind") {
            let index = this.p____page.p____rule.indexOf(id)
            if(index !== -1){
              this.p____page.p____rule.splice(index,1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      uploadImg(data){
        this.$dialog.alert({
          tipValue:'上传成功',
          closeCallBack:() => {
            this.error = false
            this.url = data.storeName
          }
        })
      },
      //验证
      verification() {
        var result = true;
        if (this.show && this.rule === "#") {
          result = this.url !== ''
        }
        this.error = !result
        return result;
      },
      mouseoverEvent(){
        if(this.isShow && this.value){
          this.isImgShow = true;
          this.getShowUrl = '/UploadFile/' + this.tag + '/' + this.url
        }
        this.$nextTick(() => {
          this.$emit("mouseoverEvent",this.getUrl)
        })
      },
      mouseoutEvent(){
        if(this.isShow) {
          this.isImgShow = false
        }
        this.$nextTick(() => {
          this.$emit("mouseoutEvent",this.getUrl)
        })
      },
    },
    computed:{
      getDefaultStyle(){
        return this.getShow ? '':'i-btn-image'
      },
      getShow(){
        return this.url !== ''
      },
      getImgUrl(){
        return '/UploadFile/' + this.tag + '/' + this.url
      },
      getBig(){
        if(this.big === 2){
          return 'c_image_main_big'
        }
        else {
          return ''
        }
      },
    },
    watch: {
      value (newVal, oldVal) {
        this.url = newVal
      },
      url (newVal, oldVal) {
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      }
    }
  }
</script>

<style scoped lang="less">
  *{
    box-sizing: border-box;
  }
  .imgShow{
    width: 850px;
    height: 600px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: center;
    background-color: #FFFFFF;
    position: fixed !important;
    z-index: 999999;
    -webkit-box-shadow: 0 0 20px #000000;
    box-shadow: 0 0 20px #000000;
    border-radius: 10px;
    top: 0;
    right: 0;
    left: 140px;
    bottom: 0;
    margin: auto;

  }
</style>
