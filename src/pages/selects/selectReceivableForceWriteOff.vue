<template>
  <div class="f_main">

    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="欠款方" :content="belong"></yhm-view-control>
        <yhm-view-control title="欠款总金额" :content="money" type="money"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab :customize="true" :pager="false">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">事件信息</yhm-view-tab-button>
      </template>

      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" >

          <template #listHead>
<!--            <yhm-managerth style="width: 80px;" title="显示子数据"></yhm-managerth>-->
            <yhm-managerth style="width: 50px" title="选择"></yhm-managerth>
            <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="父数据"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="子数据"></yhm-managerth>
            <yhm-managerth title="来源"></yhm-managerth>
            <yhm-managerth title="欠款金额"></yhm-managerth>
          </template>

          <template #listBody>
            <tr :class="{InterlacBg:index%2!=0}" v-for="(item,index) in content" :key="index" :style="[{'background':(item.isMain==0 ? '#DCDBDB':'#FFFFFF')},{'color':(item.isMain==0 ? 'red':'')}]">
<!--              <yhm-manager-td-selecttree @call="showing(item,index)" :value="item" :colors="item.shows" :mine="item.isMain==0" :show="(item.isMain==0 ? '1':'2')" :downs="item.shows"></yhm-manager-td-selecttree>-->
              <yhm-manager-td-selecttree @call="selects(index)" :value="item" :colors="item.colorss" :mine="true"></yhm-manager-td-selecttree>
              <yhm-manager-td-look></yhm-manager-td-look>
              <yhm-manager-td @click="selects(index)" :value="(item.isMain!=0)?'--':'是'" :style="{'color':(item.isMain==0 ? 'red':'red'),}" color="item.ownerid ? 'red':'green'"></yhm-manager-td>
              <yhm-manager-td @click="selects(index)" :value="(item.isMain!=0)?'是':'--'" :style="{'color':(item.isMain==0 ? 'red':'blue')}" color="item.ownerid ? 'red':'#B1968F'"></yhm-manager-td>
              <yhm-manager-td-psd @click="selects(index)" :value="item.receivableSource" :list="receivableSourceList"></yhm-manager-td-psd>
              <yhm-manager-td-money @click="selects(index)" :value="item.balance"></yhm-manager-td-money>

            </tr>
          </template>

          <template #empty>
            <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton  :flicker="true" @call="approFund()" value="确认核销" icon="i-complete"></yhm-commonbutton>
        <yhm-commonbutton  :flicker="true" @call="temporaryWriteOff()" value="暂不拨款" icon="font delete" category="ten"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  import { guid } from '@/assets/common'

  export default {
    name: 'selectReceivableForceWriteOff',
    mixins: [selectmixin],
    data(){
      return{
        ownerID:'',
        writeOffMoney:'',
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        selectType:'1',
        belong:'',
        money:'',
        tabState:[{select:true}],
        empty:true,
        receivableSourceList:{
          value: '',
          list: []
        },
        colorss:false,
        shows:false,
        data:[],
        clicks:true,
        otherID:'',
        otherCategory:'',
        child:[],
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('writeOffMoney')
      this.setQuery2Value('otherID')
      this.setQuery2Value('otherCategory')

      this.initfrom()
    },
    methods:{
      //暂不核销
      temporaryWriteOff(){
        this.$dialog.setReturnValue(1) //向父级页面id值
        this.$dialog.close()
      },
      // 保存按钮
      approFund(){
        let num=0
        if(this.data.length>0){
          for(let i  in this.data){
            if(this.data[i].category == 0){
              num=num+parseFloat(this.data[i].money)
              if(parseFloat(num)>parseFloat(this.writeOffMoney)){
                this.data[i].money=parseFloat(this.data[i].money)+parseFloat(this.writeOffMoney)-parseFloat(num)
                this.data[i].isFinish = '0'
                this.data[i].balance=0
              }else{
                this.data[i].isFinish = '1'
                this.data[i].balance=0
              }
            }
          }
          console.log(this.data)
          let sumMoney=0
          for(let i  in this.data){
            if(this.data[i].category == 0){
              sumMoney=sumMoney+parseFloat(this.data[i].money)
            }
          }
          this.$dialog.confirm({
            width: 500,
            tipValue: '确定核销金额（ <span style="color:red">'+sumMoney+'</span> )，剩余拨款金额（ <span style=\"color:red\">'+(parseFloat(this.writeOffMoney)-sumMoney)+'</span> ）？',
            alertImg: 'warn',
            okCallBack: (data) => {
              this.$dialog.setReturnValue({ list: this.data, ownerID: this.ownerID, writeOffMoney: sumMoney }) //向父级页面id值
              this.$dialog.close()
            }
          })
        }else{
          this.$dialog.close()
        }
      },
      selects(index){
        if (this.content[index].colorss==true){

        }else{
          if(this.clicks){
            this.content[index].colorss=true
            this.shu(this.content[index])
          }else{
            this.content[index].colorss=false
            this.clicks=false
          }
        }
        let aa = this.content
        this.content=[]
        this.content=aa
      },
      showing(item,index){
        if(item.shows==false){
          item.shows=true
          this.add(item,index)
        }else{
          item.shows=false
          this.delete(item,index)
        }

        let aa = this.content
        this.content=[]
        this.content=aa
      },
      delete(mores,index){
        console.log(mores,index)
        for(let n=0;n<this.content.length;n++){
          //找到别的子级
          if( this.content[n].receivableSource==this.content[index].receivableSource && this.content[n].isMain == 1){
            this.content.splice( n,1 )
            n--
          }
        }
      },
      add(mores,index){
        console.log(mores,index)
        let idx=index+1
        for(let n in this.child){
          //找到别的子级
          if( this.child[n].receivableSource==this.content[index].receivableSource){
            this.content.splice(idx,0, this.child[n] )
            idx++
          }
        }
        // this.father(this.content[index])
      },
      shu(more){
        let res={}
        res.id=guid()
        res.otherID=this.otherID
        res.ownerID=more.id
        res.money=more.balance
        res.balance=more.balance
        res.otherCategory = this.otherCategory
        res.isFinish=''
        res.category=more.receivableSource
        //判断是否为空
        if(this.data==[]){//判断为空
          this.data.push(res)
        }else{//判断不为空
          //判断是否超额
          if( more.isMain == '0'){

          }
            let nums=0
            for(let i in this.data){
              if(this.data[i].category == 0){
                nums=parseFloat(nums)+parseFloat(this.data[i].money)
              }
            }


          //如果超额
          if(nums>=this.writeOffMoney){
            this.clicks=false//超额情况
          }else{
            this.data.push(res)//不超额情况
            let numss=0
            for(let i in this.data){
              if(this.data[i].category == 0){
                numss=parseFloat(numss)+parseFloat(this.data[i].money)
              }
            }
            if(numss>=this.writeOffMoney){
              this.clicks=false
            }
          }
        }
      },
      jv(more){
        let res={}
        res.id=guid()
        res.ownerID=more.id
        res.otherID=this.otherID
        res.isFinish='1'
        res.otherCategory = this.otherCategory
        res.money=more.balance
        res.balance=more.balance
        res.category=more.receivableSource
        for(let i in this.data){
          if(this.data[i].ownerID==res.ownerID){
            this.data.splice(i,1);
          }
        }
      },
      father(more){
        let res={}
        res.id=guid()
        res.ownerID=more.id
        res.otherID=this.otherID
        res.isFinish='1'
        res.otherCategory = this.otherCategory
        res.money=more.balance
        res.balance=more.balance
        res.category=more.receivableSource
        let sum=0//判断有没有子元素
        let npc=0//判断数组里有没有本身
        for(let i in this.content){
          if(more.receivableSource==this.content[i].receivableSource && this.content[i].isMain== 1){
            sum++
            break
          }
        }
        for (let i in this.data){
          if(res.ownerID==this.data[i].ownerID){
            npc++
            break
          }
        }
        if(sum==0){
          if( npc==0 ){
            if( sum==0){
              this.data.push(res)
              this.clicks==false
            }
          }else{
            for(let i in this.data){
              if(this.data[i].ownerID==res.ownerID){
                this.data.splice(i,1);
                this.clicks==false
                break
              }
            }
          }
        }

      },
      initfrom(){
        this.ajaxJson({
          url:'/finance/receivableCenter/getSelect',
          data:{
            id:this.ownerID,
              // '283B6A69-C180-433F-9E03-1BBB4867C3E7'

          },
          call:(data)=>{
            if(data){
              this.createName=data.createName
              this.insertDate=data.insertDate
              this.updateName=data.updateName
              this.updateDate=data.updateDate
              this.belong=data.belong
              this.money=data.money
              this.content=data.detailsList
              this.empty=false
              for(let i in this.content){
                this.content[i].colorss=this.colorss
                console.log(this.content[i])
                if( this.content[i].receivableSource==0 && this.content[i].isMain == '0'){
                  this.content.splice(i,1)
                  i--
                }
              }
              this.receivableSourceList=data.categoryPsd.list

              for(let i in this.content){
                console.log('1111')
                if(this.content[i].isMain==0){
                  this.content[i].colorss=true
                  this.shu(this.content[i])
                  console.log(i)
                }
              }
              for(let i in this.content){
                if(this.clicks){
                  this.content[i].colorss=true
                  this.shu(this.content[i])
                }else{
                  break
                }
              }
              // for(let i=0 ;i<this.content.length;i++){
              //   if(this.content[i].isMain == '0' && this.content[i].category == 0){
              //     this.child.push(this.content[i])
              //     this.content.splice(i,1)
              //     i--
              //   }
              // }

            }else{
              this.empty=true
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
