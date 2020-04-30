<template>
    <span ref="control" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_drop" v-drop="dropEvent" :style="getWidthAndHeight">
      <slot></slot>
      <input v-show="!noUpload" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_drop_input" title="" :accept="accept" @change="selectFile" ref="fileControl" type="file" :multiple="multiple">
    </span>
</template>

<script>
  import {guid,accAdd,accMul,formatTime} from '@/assets/common.js'
    export default {
      name: "yhm-upload",
      data(){
        return{
          details:[],
          controlWidth:1,
          controlHeight:1
        }
      },
      props:{
        noUpload:{
          type:Boolean,
          default:false
        },
        width:{
          type:String,
          default:""
        },
        height:{
          type:String,
          default:""
        },
        ownerID:{
          type:String,
          default:""
        },
        category:{
          type:String,
          default:""
        },
        tag:{
          type:String,
          default:'temp'
        },
        accept:{
          type:String,
          default: ''
        },
        multiple:{
          type:Boolean,
          default: false
        },
      },
      methods:{
        //鼠标放上事件
        mouseoverEvent(){
          this.$nextTick(()=>{
            this.$emit("mouseoverEvent")
          })
        },
        //鼠标移出事件
        mouseoutEvent(){
          this.$nextTick(()=>{
            this.$emit("mouseoutEvent")
          })
        },
        //拖拽相关
        dropEvent(category,file){
          if(category === "drop"){//拖入后释放事件
            this.error = false
            this.showTip = false
            this.uploadBefore(file)
          }
          else if(category === "dragenter"){//拖入事件
            this.showTip = true
          }
          else if(category === "dragleave"){//拖入后又离开事件
            this.showTip = false
          }
        },
        //选择文件
        selectFile(){
          this.error = false
          this.uploadBefore(this.$refs.fileControl.files)
        },
        //上传文件
        uploadBefore(files){
          if(!this.noUpload) {
            if (files.length > 0) {
              let length = 1
              if (this.multiple) {
                length = files.length
              }
              for (var i = 0; i < length; i++) {
                var image = 0;
                if (files[i].type.indexOf('image') !== -1) {
                  image = 1
                }
                var key = guid()
                var fd = new FormData()
                fd.append("myfile", files[i])
                fd.append("tag", this.tag)
                fd.append("key", key)
                fd.append("image", image)
                this.ajaxUpload({
                  data: fd,
                  progressCall: (data, k) => {
                    this.$emit('progressCall', data, k)

                  },
                  call: (data, img, k) => {
                    var message = data.message.split("☆");
                    let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.details.length, 1000)))
                    var item = {
                      id: guid(),
                      insertDate: formatTime(insertDate),
                      ownerID: this.ownerID,
                      category: this.category,
                      tag: this.tag,
                      showName: message[1],
                      storeName: message[2],
                      suffix: message[0],
                      image: img,
                      isEdit: "0"
                    }
                    this.$emit("call", item)
                  }
                });

              }
            }
          }
        }
      },
      computed:{
        getWidthAndHeight(){
          return 'width:' + this.width + 'px; height:' + this.height + 'px;'
        }
      },
      beforeMount(){

      },
      mounted() {
        this.controlWidth = this.$refs.control.clientWidth
        this.controlHeight = this.$refs.control.clientHeight
      }
    }
</script>

<style scoped>

</style>
