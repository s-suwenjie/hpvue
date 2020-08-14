<template>
    <div class="privilege-details-auth">
      <div class="pda_title">
      {{name}}
      </div>
      <div class="pda_details">
        <div @click="selectEvent(item.id)" class="pda_details_item disable_menu" :class="{pda_details_item_select:getSelect(item.id)}" v-for="(item,index) in content" :key="index">
          <div class="check_button_icon" :class="{check_button_icon_select:getSelect(item.id)}"></div>
          <div class="pl5">{{item.name}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "yhm-form-privilege-details",
      inject: ['p____page'],
      data(){
        return{
          content:[
            {id:'8D083E69-DCD1-41A0-B890-55DC92CF759B',name:'最高权限'},
            {id:'04B095BA-0B5E-4082-937B-AF48E5BC70E8',name:'自己添加或者分享到的'},
          ]
        }
      },
      props: {
        auth:{
          type:Array,
          default: function () {
            return []
          }
        },
        name:{
          type:String,
          default:'菜单名称'
        }
      },
      methods:{
        //选择权限
        selectEvent(authID){
          let index = this.auth.indexOf(authID)
          if(index === -1){
            this.auth.push(authID)
          }
          else{
            this.auth.splice(index,1)
          }
        }
      },
      computed:{
        getSelect(){
          return function (authID) {
            return this.auth.indexOf(authID) !== -1
          }
        }
      }
    }
</script>

<style scoped>

</style>
