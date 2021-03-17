<template>
    <div class="f_main">
<!--      <yhm-view-tab>-->
<!--        <template #tab>-->
<!--          <yhm-view-tab-button :list="tabState" :index="0">钣金拆装或修复</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState" :index="1">服务详情</yhm-view-tab-button>-->
<!--        </template>-->
<!--        <template #content>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="钣金拆装或修复"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list" listid="list" :value="item" id="type" :select-list="relist"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--&lt;!&ndash;            <template #empty>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="m_listNoData" v-show="list.length=='0'?true:false">暂时没有数据</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[1].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="服务名称"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in entityList[0].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="entityList[0].teamRecordingList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--        </template>-->
<!--      </yhm-view-tab>-->
<!--      <div class="f_split"></div>-->
<!--      <yhm-view-tab>-->
<!--        <template #tab>-->
<!--          <yhm-view-tab-button :list="tabState1" :index="0">做底</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState1" :index="1">服务详情</yhm-view-tab-button>-->
<!--        </template>-->
<!--        <template #content>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState1[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list1" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="做底"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list1" listid="list1" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState1[1].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="服务名称"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in entityList[1].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="entityList[1].teamRecordingList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--        </template>-->
<!--      </yhm-view-tab>-->
<!--      <div class="f_split"></div>-->
<!--      <yhm-view-tab>-->
<!--        <template #tab>-->
<!--          <yhm-view-tab-button :list="tabState2" :index="0">喷漆</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState2" :index="1">服务详情</yhm-view-tab-button>-->
<!--        </template>-->
<!--        <template #content>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState2[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list2" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="喷漆"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list2" listid="list2" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState2[1].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="服务名称"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in entityList[2].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="entityList[2].teamRecordingList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--        </template>-->
<!--      </yhm-view-tab>-->
<!--      <div class="f_split"></div>-->
<!--      <yhm-view-tab>-->
<!--        <template #tab>-->
<!--          <yhm-view-tab-button :list="tabState3" :index="0">钣金装配</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState3" :index="1">服务详情</yhm-view-tab-button>-->
<!--        </template>-->
<!--        <template #content>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState3[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list3" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="钣金装配"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list3" listid="list3" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState3[1].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="服务名称"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in entityList[3].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="entityList[3].teamRecordingList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--        </template>-->
<!--      </yhm-view-tab>-->
<!--      <div class="f_split"></div>-->
<!--      <yhm-view-tab>-->
<!--        <template #tab>-->
<!--          <yhm-view-tab-button :list="tabState4" :index="0">抛光</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState4" :index="1">服务详情</yhm-view-tab-button>-->
<!--        </template>-->
<!--        <template #content>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState4[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list4" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="抛光"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list4" listid="list4" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState4[1].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="服务名称"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in entityList[4].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="entityList[4].teamRecordingList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
<!--        </template>-->
<!--      </yhm-view-tab>-->
<!--      <div class="f_split"></div>-->

      <yhm-form-list-show>
        <template #title>分配工作</template>
        <template #listHead>
          <yhm-managerth title="工序名称"></yhm-managerth>
          <yhm-managerth width="180" title="请选择工作人员" ></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(items,index) in processNameList" :class="[{InterlacBg:index%2!=0}]" :key="index">
            <yhm-manager-td-center :value="items"></yhm-manager-td-center>
            <yhm-form-td-select v-show="items=='钣金拆装或修复'" width="150" :work-order="true" @click="selectClick('0')" :list="list" listid="list" v-for="(item,key) in list" :key="key" :value="item" id="type" :select-list="relist"></yhm-form-td-select>
            <yhm-form-td-select v-show="items=='做底'" width="150" :work-order="true" @click="selectClick('1')" :list="list1" listid="list1" v-for="(item,key) in list1" :key="key" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>
            <yhm-form-td-select v-show="items=='喷漆'" width="150" :work-order="true" @click="selectClick('2')" :list="list2" listid="list2" v-for="(item,key) in list2" :key="key" :value="item" id="type" :select-list="relist2"></yhm-form-td-select>
            <yhm-form-td-select v-show="items=='钣金装配'" width="150" :work-order="true" @click="selectClick('3')" :list="list3" listid="list3" v-for="(item,key) in list3" :key="key" :value="item" id="type" :select-list="relist3"></yhm-form-td-select>
            <yhm-form-td-select v-show="items=='抛光'" width="150" :work-order="true" @click="selectClick('4')" :list="list4" listid="list4" v-for="(item,key) in list4" :key="key" :value="item" id="type" :select-list="relist4"></yhm-form-td-select>
            <yhm-form-td-select v-show="worktype=='1'||worktype=='2'" v-if="items=='保养'" width="150" :work-order="true" @click="selectClick(worktype=='1'?0:5)" :list="list5" listid="list5" v-for="(item,key) in list5" :key="key" :value="item" id="type" :select-list="relist5"></yhm-form-td-select>

          </tr>
        </template>
        <template #empty>
            <!--<span class="m_listNoData" v-show="fixOrderMaterial.length == 0">暂时没有数据</span>-->
        </template>
      </yhm-form-list-show>
<!--      <yhm-form-list-show>-->
<!--        <template #listHead>-->
<!--          <yhm-managerth title="工序服务"></yhm-managerth>-->
<!--        </template>-->
<!--        <template #listBody>-->
<!--          <tr v-for="(item,index) in entityList[0].teamRecordingList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--            <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>-->
<!--          </tr>-->
<!--        </template>-->
<!--        <template #empty>-->
<!--          <span class="m_listNoData" v-show="entityList[0].teamRecordingList.length == 0">暂时没有数据</span>-->
<!--        </template>-->
<!--      </yhm-form-list-show>-->
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState5" v-show="worktype!=1" :index="0">钣金拆装或修复</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState5" v-show="worktype!=1" :index="1">做底</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState5" v-show="worktype!=1" :index="2">喷漆</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState5" v-show="worktype!=1" :index="3">钣金装配</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState5" v-show="worktype!=1" :index="4">抛光</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState5" v-if="worktype==1||worktype==2" :index="worktype==1?0:5">保养</yhm-view-tab-button>

        </template>
        <template #content>
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState5[0].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="工序名称"></yhm-managerth>-->
<!--              <yhm-managerth width="180" title="分配工作"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list4" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-center value="抛光"></yhm-manager-td-center>-->
<!--                <yhm-form-td-select width="150" :work-order="true" :list="list4" listid="list4" :value="item" id="type" :select-list="relist1"></yhm-form-td-select>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
          <yhm-view-tab-list :customize="true" :pager="false" v-for="(items,index) in entityList"  v-show="tabState5[index].select">>
            <template #listHead>
              <yhm-managerth title="发生日期"></yhm-managerth>
              <yhm-managerth title="服务名称"></yhm-managerth>
              <yhm-managerth title="车牌号"></yhm-managerth>
              <yhm-managerth title="车主"></yhm-managerth>
              <yhm-managerth title="派工"></yhm-managerth>
              <yhm-managerth title="完成状态"></yhm-managerth>

            </template>
            <template #listBody>
              <tr v-for="(item) in items.teamRecordingList" :key="item.id">
                <yhm-manager-td-date :value="item.workDateStr"></yhm-manager-td-date>
                <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.carOwner"></yhm-manager-td-center>

                <yhm-manager-td-psd v-show="index=='0'" :value="list[0].type" :list="relist"></yhm-manager-td-psd>
                <yhm-manager-td-psd v-show="index=='1'" :value="list1[0].type" :list="relist1"></yhm-manager-td-psd>
                <yhm-manager-td-psd v-show="index=='2'" :value="list2[0].type" :list="relist2"></yhm-manager-td-psd>
                <yhm-manager-td-psd v-show="index=='3'" :value="list3[0].type" :list="relist3"></yhm-manager-td-psd>
                <yhm-manager-td-psd v-show="index=='4'" :value="list4[0].type" :list="relist4"></yhm-manager-td-psd>
                <yhm-manager-td-psd v-show="index=='worktype==1?0:5'" v-if="worktype==1||worktype==2" :value="list5[0].type" :list="relist5"></yhm-manager-td-psd>

                <yhm-manager-td-center v-if="item.teamStateStr=='0'" value="未开始" color="#49a9ea"></yhm-manager-td-center>
                <yhm-manager-td-center v-else-if="item.teamStateStr=='1'" value="进行中" color="#008f8d"></yhm-manager-td-center>
                <yhm-manager-td-center v-else-if="item.teamStateStr=='2'" value="已完成" color="#00b86b"></yhm-manager-td-center>

              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show=" items.teamRecordingList.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderAllocationForm',
    mixins: [formmixin],
    data(){
      return{
        // tabState:[{select:true},{select:false}],
        // tabState1:[{select:true},{select:false}],
        // tabState2:[{select:true},{select:false}],
        // tabState3:[{select:true},{select:false}],
        // tabState4:[{select:true},{select:false}],
        tabState5:[{select:true},{select:false},{select:false},{select:false},{select:false},{select:false}],
        list:[
          {
            type:'',
          }
        ],
        list1:[
          {
            type:'',
          }
        ],
        list2:[
          {
            type:'',
          }
        ],
        list3:[
          {
            type:'',
          }
        ],
        list4:[
          {
            type:'',
          }
        ],
        list5:[
          {
            type:'',
          }
        ],
        processNameList:['钣金拆装或修复','做底','喷漆','钣金装配','抛光','保养'],
        entityList:[],
        type:'',//钣金拆装或修复工人的索引值
        relist:[],//钣金拆装或修复工人总名单
        type1:'',//做底工人的索引值
        relist1:[],//做底工人总名单
        type2:'',//喷漆工人的索引值
        relist2:[],//喷漆工人的总名单
        type3:'',//钣金装配工人的索引值
        relist3:[],//钣金装配工人的总名单
        type4:'',//抛光工人的索引值
        relist4:[],//抛光工人的总名单
        type5:'',//保养工人的索引值
        relist5:[],//保养工人的总名单
        content:{},
      }
    },
    methods:{
      save(){
        let item = {}
        // for(let j=0; j<this.entityList.length; j++){
        //   console.log(j)
        //   for(let i=0; i<=j; i++){
        //     console.log(this.entityList[j].teamList,j)
        //     if(j=='0'){
        //
        //     }
        //   }
        // }
        if(this.worktype!='1'){
          for(let j=0; j<this.entityList[0].teamList.length; j++){
            item = {}
            if(this.entityList[0].teamList[j].userid==this.list[0].type){
              item = this.entityList[0].teamList[j]
              this.entityList[0].teamList = []
              this.entityList[0].teamList.push(item)
            }
          }
          for(let j=0; j<this.entityList[1].teamList.length; j++){
            item = {}
            if(this.entityList[1].teamList[j].userid==this.list1[0].type){
              item = this.entityList[1].teamList[j]
              this.entityList[1].teamList = []
              this.entityList[1].teamList.push(item)
            }
          }
          for(let j=0; j<this.entityList[2].teamList.length; j++){
            item = {}
            if(this.entityList[2].teamList[j].userid==this.list2[0].type){
              item = this.entityList[2].teamList[j]
              this.entityList[2].teamList = []
              this.entityList[2].teamList.push(item)
            }
          }
          for(let j=0; j<this.entityList[3].teamList.length; j++){
            item = {}
            if(this.entityList[3].teamList[j].userid==this.list3[0].type){
              item = this.entityList[3].teamList[j]
              this.entityList[3].teamList = []
              this.entityList[3].teamList.push(item)
            }
          }
          for(let j=0; j<this.entityList[4].teamList.length; j++){
            item = {}
            if(this.entityList[4].teamList[j].userid==this.list4[0].type){
              item = this.entityList[4].teamList[j]
              this.entityList[4].teamList = []
              this.entityList[4].teamList.push(item)
            }
          }
        }
        if(this.worktype=='1'){
          for(let j=0; j<this.entityList[0].teamList.length; j++){
            item = {}
            if(this.entityList[0].teamList[j].userid==this.list5[0].type){
              item = this.entityList[0].teamList[j]
              this.entityList[0].teamList = []
              this.entityList[0].teamList.push(item)
            }
          }
        }else if(this.worktype=='2'){
          for(let j=0; j<this.entityList[5].teamList.length; j++){
            item = {}
            if(this.entityList[5].teamList[j].userid==this.list5[0].type){
              item = this.entityList[5].teamList[j]
              this.entityList[5].teamList = []
              this.entityList[5].teamList.push(item)
            }
          }
        }
        this.ajaxJson({
          url: '/fix/fixrepair/AutoForSave',
          data: {
            orderid:this.orderid,
            entityList:this.entityList,
            relist:this.content.relist
          },
          call: (data) => {
            if(data.type==0){
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                 this.$dialog.close()
                }
              })
            }else{
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
          }
        })
        // console.log(this.entityList)
      },
      selectClick(index){
        for(let i in this.tabState5){
          if(index == i){
            this.tabState5[index].select = true
          }else{
            this.tabState5[i].select = false
          }
        }
      },
      initData () {
        let params = {
          type:this.worktype,
          orderid: this.orderid
        }
        this.ajaxJson({
          url: '/fix/fixrepair/initForAuto',
          data: params,
          call: (data) => {
            if (data) {
              try {
                if(this.worktype=='1'){
                  this.entityList = data.entityList2
                }else{
                  this.entityList = data.entityList
                }
                for(let i in data.relist){
                  if(data.relist[i].type=='0'){
                    this.relist.push(data.relist[i])
                    console.log(this.relist)
                  }
                  if(data.relist[i].type=='1'){
                    this.relist1.push(data.relist[i])
                  }
                  if(data.relist[i].type=='2'){
                    this.relist2.push(data.relist[i])
                  }
                  if(data.relist[i].type=='3'){
                    this.relist3.push(data.relist[i])
                  }
                  if(data.relist[i].type=='4'){
                    this.relist4.push(data.relist[i])
                  }
                  if(data.relist[i].type=='6'){
                    this.relist5.push(data.relist[i])
                  }
                }
                this.list[0].type=this.relist[0].num
                this.list1[0].type=this.relist1[0].num
                this.list2[0].type=this.relist2[0].num
                this.list3[0].type=this.relist3[0].num
                this.list4[0].type=this.relist4[0].num
                this.list5[0].type=this.relist5[0].num
                this.content = data
                if(this.worktype=='2'){
                  this.processNameList = ['钣金拆装或修复','做底','喷漆','钣金装配','抛光','保养']
                  this.tabState5 = [{select:true},{select:false},{select:false},{select:false},{select:false},{select:false}]
                }else if(this.worktype=='1'){
                  this.processNameList = ['保养']
                  this.tabState5 = [{select:true}]
                }else{
                  this.processNameList = ['钣金拆装或修复','做底','喷漆','钣金装配','抛光']
                  this.tabState5 = [{select:true},{select:false},{select:false},{select:false},{select:false}]
                }
              }catch (e) {

              }
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('orderid')
      this.setQuery2Value('worktype')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
