<template>
    <div>
      <div class="text_input">
        <span class="title">{{title}}</span>
        <input :type="type" v-if="type=='text'" class="input" :value="value" ref="input" @input="$emit('input', $event.target.value)" :placeholder="placeholder">
        <div v-else-if="type=='file'" class="input inputFile flex" @click="fileClick()">
          <div class="fileLeft flex">
            <img src="https://www.easyicon.net/api/resizeApi.php?id=1180643&size=46" alt="">
          </div>
          <span class="flex">{{fileName}}</span>
        </div>
        <input style="display: none;" :type="type" class="input file" id="file" @change="changeFile($event)" ref="file">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'appInput',
    data(){
      return{
        fileName:'请选择文件',
        imgBase:''
      }
    },
    props:{
      title:{
        type:String,
        default:'标题'
      },
      value:{
        type:String,
        default:''
      },
      placeholder:{
        type:String,
        default:''
      },
      type:{
        type:String,
        default:'text'
      },
    },
    methods:{
      fileClick(){
        this.$refs.file.click()
      },
      // changeFile(e){
      //   this.fileName = e.target.files[0].name
      // },
      changeFile (e) {
        this.fileName = e.target.files[0].name
        const uploadImgFiles = e.target.files
        const curImgFile = uploadImgFiles[0]
        let reader = new FileReader()
        reader.readAsDataURL(curImgFile)
        reader.onload = (e) => {
          this.imgBase = e.target.result // base64
          this.$nextTick(()=>{
            this.$emit('change',this.imgBase)
          })
        }
        // 处理连续选择相同文件，第二次选文件不会触发change事件
        e.target.value = ''

      }
    },
    created () {
    }
  }
</script>

<style scoped lang="less">
  @rem:375/10rem;
  .flex{
    display: flex;
    align-items: center;
  }
  .inputFile{

    .fileLeft{
      justify-content: center;
      width: 46/@rem;
      height: 32/@rem;
      background-color: #fff;
    }
    img{
      width: 26/@rem;
      height: 18/@rem;
    }
    span{
      flex: 1;
      height: 100%;
      background-color: #e9e9e9;
    }
  }
  .file{
    flex: 1;
    display: inherit;
  }
  .title{
    color: #999999;
  }
  .text_input{
    display: flex;
    align-items: center;
    padding: 10/@rem;
    height: 33/@rem;
    span{
      font-size: 14/@rem;
      width: 33/@rem;
    }
    .input{
      flex: 1;
      text-indent: 6/@rem;
      height: 33/@rem !important;
      border-radius: 4/@rem;
      font-size:14/@rem;
    }
    input::-webkit-input-placeholder{   // 谷歌
      /*color:#f00;*/
      font-size:14/@rem;
    }
  }
</style>
