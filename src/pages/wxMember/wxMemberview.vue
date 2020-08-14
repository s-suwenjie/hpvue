<template>
  <div class="f_main mb16">
    <yhm-formbody>
      <template #title>车牌信息</template>
      <template #control>
        <yhm-form-radio width="1" :no-edit="false" title="选择车牌号" :select-list="vehiclePsd" :value="vehicle" id="vehicle" @call="selects()"></yhm-form-radio>
      </template>
    </yhm-formbody>

    <div class="f_split"></div>

    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="联系人姓名" :content="person"></yhm-view-control>
        <yhm-view-control title="微信名称" :content="wxPerson"></yhm-view-control>
        <yhm-view-control title="联系电话" :content="wxPhone"></yhm-view-control>
        <yhm-view-control type="date" title="注册时间" :content=" insertDate"></yhm-view-control>
        <yhm-view-control title="车牌号码" :content="carcode"></yhm-view-control>
        <yhm-view-control title="车型" :content="vehicleModel" v-if="vehicleModelVerify"></yhm-view-control>
        <div v-if="!vehicleModelVerify" style="position: relative" @click="addbtn">
          <yhm-view-control title="车型" :content="vehicleModel" color="#49a9ea"></yhm-view-control>
          <div class="icon-add-to" style="position: absolute;top: 16px;left: 115px;"></div>
        </div>
        <yhm-view-control title="优惠券总量" :content="couponQuantity+'张'"></yhm-view-control>
        <yhm-view-control title="未使用数量" :content="couponUnused+'张'"></yhm-view-control>
        <yhm-view-control title="已使用数量" :content="couponUsed+'张'"></yhm-view-control>
        <yhm-view-control title="已过期数量" :content="couponExpired+'张'"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="change(0)">可使用</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="change(1)">已使用</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" @click="change(2)">已过期</yhm-view-tab-button>
      </template>
      <template #content>

        <!--111111111111111111111-->
        <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 300px" title="优惠券名称"></yhm-managerth>
            <yhm-managerth title="优惠券类型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="过期日期"></yhm-managerth>
            <yhm-managerth title="logo"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in data" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-psd :value="item.category" :list="categoryPsd"></yhm-manager-td-psd>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
              <yhm-manager-td-image :tip="true" left="-400" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="data.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="pages(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>

        <!--2222222222222222222222-->
        <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 300px" title="优惠券名称"></yhm-managerth>
            <yhm-managerth title="优惠券类型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="使用日期"></yhm-managerth>
            <yhm-managerth title="logo"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in data" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-psd :value="item.category" :list="categoryPsd"></yhm-manager-td-psd>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
              <yhm-manager-td-image :tip="true" left="-400" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="data.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="pages(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>

        <!--333333333333333333333-->
        <yhm-view-tab-list :customize="true" v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 300px" title="优惠券名称"></yhm-managerth>
            <yhm-managerth title="优惠券类型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="过期日期"></yhm-managerth>
            <yhm-managerth title="logo"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in data" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-psd :value="item.category" :list="categoryPsd"></yhm-manager-td-psd>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
              <yhm-manager-td-image :tip="true" left="-400" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="data.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="pages(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>


      </template>
    </yhm-view-tab>

  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'

  export default {
    name: 'wxMemberview',
    mixins: [viewmixin],
    data(){
      return{
        categoryPsd:'',
        vehiclePsd:[],
        vehicle:'',
        person:'',
        carcode:'',
        details:[],
        tabState:[{select:true},{select:false},{select:false}],
        data:'',
        numbers:'',
        idx:'0',
        insertDate:'',
        wxPerson:'',
        wxPhone:'',
        vehicleModel:'',
        couponQuantity:'',
        couponUnused:'',
        couponUsed:'',
        couponExpired:'',
        vehicleModelVerify:'',
      }
    },
    created () {
      this.init()
    },
    methods:{
      //页面初始化-------------------------------
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: 'wx/wxMember/initForm',
          data: params,
          call: (data) => {
            // console.log(data)
            this.person=data.person
            this.vehicle=data.vehiclePsd.value
            this.vehiclePsd=data.vehiclePsd.list
            this.insertDate=data.insertDate
            this.wxPerson=data.wxPerson
            this.wxPhone=data.wxPhone
            this.couponQuantity=data.couponQuantity
            this.couponUnused=data.couponUnused
            this.couponUsed=data.couponUsed
            this.couponExpired=data.couponExpired
            this.vehicleModelVerify=data.vehicleModelVerify
            // this.codechange(this.vehiclePsd)
            for(let i in this.vehiclePsd){
              if(this.vehicle == this.vehiclePsd[i].num){
                this.carcode = this.vehiclePsd[i].showName
              }
            }

            this.categoryPsd=data.categoryPsd.list
            if(this.pager.pageIndex==1){
              this.numbers=1
            }else{
              this.numbers=(this.pager.pageIndex-1)*5+1
            }
            this.data=data.details.content
            this.pager.total=data.details.count
            // this.pages()

            if(data.vehicleModelVerify){
                this.vehicleModelVerify=data.vehicleModelVerify
                this.vehicleModel=data.vehicleModel
            }else{
              this.vehicleModelVerify=data.vehicleModelVerify
              this.vehicleModel='点击添加'
              // this.plate()

            }
          },
        })
      },

      plate(){
        this.ajaxJson({
          url: '/Basic/getByPlate ',
          data: {
            plate:this.carcode
          },
          call: (data) => {
            console.log(data);
            this.vehicleModel = data.content[0].brand

            if(data.content[0].brand==''){
              this.vehicleModel='点击添加'
              this.vehicleModelVerify=true
            }else{
              this.vehicleModelVerify=false
            }
          },

        })
      },


      //选择车牌号
      selects(){
        this.codechange(this.vehiclePsd)

      },
      //改变优惠券信息----------------------------
      change(index){
        this.numbers=1
        this.pager.pageIndex=1
        this.idx=index
        this.pages()
        for(let i in this.tabState){
          if(i==index){
            this.tabState[i].select=true

          }else{
            this.tabState[i].select=false
          }
        }
      },
    //  切换车牌----------------------------------
      codechange(vehiclePsd){

        for(let i in vehiclePsd){
          if(this.vehicle == vehiclePsd[i].num){
            this.carcode = vehiclePsd[i].showName
          }
        }
        this.change(this.idx)
        // this.plate()
        // this.pages()
      },
      //分页--------------------------------------
      pages(){
        if(this.pager.pageIndex==1){
          this.numbers=1
        }else{
          this.numbers=(this.pager.pageIndex-1)*5+1
        }
        this.ajaxJson({
          url: '/wx/wxMember/switchNumberPlate',
          data: {
            id:this.vehicle,
            state:this.idx,
            pageIndex: this.pager.pageIndex,
          },
          call: (data) => {
            console.log(data);
            this.couponQuantity=data.couponQuantity
            this.couponUnused=data.couponUnused
            this.couponUsed=data.couponUsed
            this.couponExpired=data.couponExpired
            this.data=data.details.content
            this.pager.total=data.details.count
            this.vehicleModelVerify=data.vehicleModelVerify

            if(data.vehicleModelVerify){
              this.vehicleModel=data.vehicleModel
            }else{
              this.vehicleModel='点击添加'
              // this.plate()

            }
          },

        })
      },
    //  点击添加---------------------
      addbtn(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/selectPlate?plate='+this.carcode+'&isReule=1',
          title:'选择车型号',
          closeCallBack:(data) =>{
            if(data){
              this.ajaxJson({
                url: '/wx/wxMember/updateOwnerIDByID',
                data: {
                  id:this.vehicle,
                  ownerID:data.id
                },
                call: (data) => {
                  console.log(data)
                },

              })
            }
          }
        })

      },
    }
  }
</script>

<style scoped>
.icon-add-to::before{
  color: #49A8EA;
}
</style>
