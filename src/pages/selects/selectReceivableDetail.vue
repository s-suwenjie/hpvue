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
            <yhm-managerth style="width: 80px;" title="显示子数据"></yhm-managerth>
            <yhm-managerth style="width: 50px" title="选择"></yhm-managerth>
            <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="父数据"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="子数据"></yhm-managerth>
            <yhm-managerth title="来源"></yhm-managerth>
            <yhm-managerth title="欠款金额"></yhm-managerth>
          </template>

          <template #listBody>
            <tr :class="{InterlacBg:index%2!=0}" v-for="(item,index) in content" :key="index" :style="[{'background':(item.isMain==0 ? '#DCDBDB':'#FFFFFF')},{'color':(item.isMain==0 ? 'red':'')}]">
              <yhm-manager-td-selecttree @call="showing(item,index)" :value="item" :colors="item.shows" :mine="item.isMain==0" :show="(item.isMain==0 ? '1':'2')"></yhm-manager-td-selecttree>
              <yhm-manager-td-selecttree @call="selects(index)" :value="item" :colors="item.colorss" :mine="item.isMain==0"></yhm-manager-td-selecttree>
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
        <yhm-commonbutton  :flicker="true" @call="approFund()" :value="'保存'" icon="i-complete"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  import { guid } from '../../assets/common'

  export default {
    name: 'selectReceivableDetail',
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
    created(){
      this.setQuery2Value('ownerID')
      this.setQuery2Value('writeOffMoney')
      this.setQuery2Value('otherID')
      this.setQuery2Value('otherCategory')
      this.initfrom()
    },
    methods:{
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
          if(this.content[index].isMain=='0'){
            //判断为父级
            if (this.content[index].colorss==true){
              this.content[index].colorss=false//父级变为不亮
              this.father(this.content[index])
              // let mores=this.content[index]
              // this.delete(mores,index)--------------------------important
              this.jv(this.content[index])
              //可以点击了
              for (let um in this.content){ //查看有没有子元素
                if(this.content[um].receivableSource==this.content[index].receivableSource || this.content[um].isMain == 1){
                  this.clicks=true
                  break
                }else {
                  break
                }
              }
              //判断为不亮
              if(this.content[index].shows==false){
                for(let n in this.child){
                  if( this.child[n].receivableSource==this.content[index].receivableSource){
                    this.child[n].colorss=false
                    this.jv(this.child[n])
                  }
                }
              }else{
                for(let n in this.content){
                  if( this.content[n].receivableSource==this.content[index].receivableSource && this.content[n].isMain == 1){
                    this.content[n].colorss=false
                    this.jv(this.content[n])
                  }
                }
              }
              //结束循环 结束判断
            } else{

              let nm=0
              for (let m in this.child){
                if(this.child[m].receivableSource==this.content[index].receivableSource ){
                  nm++
                  break
                }
              }
              if( nm==0 ){
                  //只有父级
                  this.content[index].colorss=true//父级变为亮
                  //判断为亮
                  this.father(this.content[index])
                  console.log('1')

                }else{
                console.log('2')
                  // 携带子集
                  if(this.clicks==true){//可以点击了

                    this.content[index].colorss=true//父级变为亮
                    //判断为亮
                    if(this.content[index].shows==false){
                      for(let n in this.child){
                        if( this.child[n].receivableSource==this.content[index].receivableSource){

                          this.child[n].colorss=true
                          this.shu(this.child[n])
                          if(this.clicks==false){
                            break
                          }
                        }
                      }
                    }else{
                      for(let n in this.content){
                        if( this.content[n].receivableSource==this.content[index].receivableSource && this.content[n].isMain == 1){

                          this.content[n].colorss=true
                          this.shu(this.content[n])
                          if(this.clicks==false){
                            break
                          }
                        }
                      }
                    }

                    // 结束循环 结束判断
                  }else{
                  }
                }

            }
            //结束父级判断
          }else{
            //判断为子级
            //  判断子级是否亮
            if (this.content[index].colorss==true){
              this.content[index].colorss=false//子级判断为不亮
              this.clicks=true//可以点击了
              this.jv(this.content[index])

              //父级不可以亮起 寻找父级
              let fathers=''
              let faindex=''
              for(let n in this.content){
                //找到父级
                if( this.content[index].receivableSource==this.content[n].receivableSource && this.content[n].isMain == 0){

                  this.content[n].colorss=false//父级变为不亮
                  fathers=this.content[n]
                  faindex=n
                }
              }
              //结束循环 结束判断
            }else{
              if(this.clicks==true){
                this.content[index].colorss=true//子级判断为亮
                this.shu(this.content[index])
                // 寻找别的子集
                let light=0
                for(let n in this.content){
                  //找到别的子级
                  if( this.content[n].receivableSource==this.content[index].receivableSource && this.content[n].isMain == 1){
                    //判断别的子级是否亮起
                    if(this.content[n].colorss==false){
                      //判断别的子级为不亮
                      light++
                      break//结束循环
                    }
                  }
                }//循环结束
                //判断父级是否可以亮起
                if(light==0){
                  // 可以亮起 寻找父级
                  for(let n in this.content){
                    //找到父级
                    if( this.content[index].receivableSource==this.content[n].receivableSource && this.content[n].isMain == 0){
                      this.content[n].colorss=true//父级变为亮起
                    }//结束判断
                  }//结束循环
                }//结束判断
              }else{

              }
            }//结束子集为亮的判断
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
        console.log(this.data)
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
                this.content[i].shows=this.shows
              }
              this.receivableSourceList=data.categoryPsd.list

              for(let i=0 ;i<this.content.length;i++){
                if(this.content[i].isMain=='1'){
                  this.child.push(this.content[i])
                  this.content.splice(i,1)
                  i--
                }
              }

            }else{
              this.empty=false
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
