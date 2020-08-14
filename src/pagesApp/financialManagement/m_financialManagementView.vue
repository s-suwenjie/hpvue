<template>
    <div>
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu :select="true" title="详细信息"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>
      <div style="overflow: auto;">
        <yhm-app-structure-menu-group>
          <yhm-app-view-control title="户名" :content="name"  color="#4BB414"></yhm-app-view-control>
          <yhm-app-view-control title="开户行" :content="bank"  color="#4BB414"></yhm-app-view-control>
          <yhm-app-view-control title="账号" :content="account"  color="#4BB414"></yhm-app-view-control>
          <yhm-app-view-control v-show="isInterbank" title="联行号" :content="interbank"  color="#4BB414" style="padding: 0;"></yhm-app-view-control>

          <div class="flex_img"><span>户名二维码:</span><img width="150" height="150" :src="unitUrl" alt=""></div>
          <div class="flex_img"><span>账号条形码:</span><img width="150" height="50" :src="accountUrl" alt=""></div>
        </yhm-app-structure-menu-group>
      </div>
    </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';

  export default {
    name: 'financialManagementView',
    mixins: [appviewmixin],
    data(){
      return{
        category:'',
        name:'',
        bank:'',
        interbank:'',
        account:'',
        unitUrl:'',
        accountUrl:'',
        isInterbank:false,
      }
    },
    methods:{
      imgSkip(item){
        let img = /UploadFile/+ item.tag+'/'+ item.storeName
        ImagePreview([img]);
      },
    },
    created () {
      this.setQuery2Value('accountID')
      this.setQuery2Value('personID')
      this.setQuery2Value('category')

      let params = {
        accountID:this.accountID,
        personID:this.personID
      }
      if(this.category==='0'){
        this.isInterbank=true
        this.ajaxJson({
          url: '/Fin/publicAccountWXInformation',
          data:params,
          loading:'0',
          call:(data)=> {
            this.name=data.name;
            this.bank=data.bank;
            this.interbank=data.interbank;
            this.account=data.account;
            if (data.unitUrl!==''){
              this.unitUrl='/UploadFile/unitUrl/'+data.unitUrl;
            }
            if (data.accountUrl!=='') {
              this.accountUrl = '/UploadFile/unitUrl/' + data.accountUrl;
            }
          }
        })
      }else{
        this.isInterbank=false
        this.ajaxJson({
          url: '/Fin/privateAccountWXInformation',
          data:params,
          loading:'0',
          call:(data)=> {
            this.name=data.person;
            this.bank=data.bank;
            this.account=data.account;
            if (data.personUrl!=='') {
              this.unitUrl = '/UploadFile/personUrl/' + data.personUrl;
            }
            if (data.accountUrl!=='') {
              this.accountUrl = '/UploadFile/personUrl/' + data.accountUrl;
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@rem:375/10rem;
  .flex_img{
    width: 100%;
    padding: 16/@rem 0;
    font-size: 14/@rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #888;
  }
</style>
