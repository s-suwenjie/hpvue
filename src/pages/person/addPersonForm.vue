 <template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #opera>
        <div class="operaLft posRt" @click="videoPlay">
          <p class="videoIcon i-videoPlay"></p>
          <p class="videoHelp">视频帮助</p>
        </div>
      </template>
      <template #control>
        <yhm-form-radio title="单位类型" :select-list="categoryList" @call="categoryEvent" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio title="性别" :select-list="sexList" :value="sex" id="sex" :noEdit="idNo.length=='18'?true:false"></yhm-form-radio>
        <yhm-form-radio title="是否" subtitle="重要联系人" :select-list="importantList" :value="important" id="important"></yhm-form-radio>
        <yhm-form-radio title="政治面貌" :show="isThisUnit" :select-list="politicsStatusList" :value="politicsStatus" id="politicsStatus"></yhm-form-radio>
<!--        <yhm-form-text title="姓名" :value="name" id="name" ref="name" @repeatverify="repeatVerifyEvent" rule="R0000"></yhm-form-text>-->

        <yhm-form-zh-text-checkbox ref="name" @clickCheckBox="clickLoginNameReset" @repeatverify="repeatVerifyEvent" title="姓名" check-title="是否外籍"  :value="name" id="name"  rule="R0000" :check-value="expatriate" check-value-id="expatriate"></yhm-form-zh-text-checkbox>

        <yhm-form-text title="手机号码" :value="phone" id="phone" ref="phone" tip="value" @repeatverify="repeatVerifyEvent" rule="R4000">
          <div v-show="variable" class="formBoxIcon" @click="aaa">
            <span class="icon-uniE9A9" style="font-size: 20px"></span>
          </div>
        </yhm-form-text>
        <yhm-form-select  title="所属公司" v-if="isThisUnit" @click="selectUnit" tip="value" :value="unit" id="unit" rule="R0000" ></yhm-form-select>
        <yhm-form-text title="所属部门" :show="isThisUnit" :value="department" id="department" placeholder="请在部门管理中调整所属部门" no-edit="1"></yhm-form-text>

        <yhm-form-text v-if="isPortNo" title="身份证号" @input="isNoEvent" @repeatverify="isRepeatVerifyEvent" ref="idNo" tip="value" :value="idNo" id="idNo" :rule="idnoRule">


          <div v-show="variable" class="formBoxIcon" @click="copyEvent" title="点击共用手机号">
            <span class="i-copy"></span>
          </div>
        </yhm-form-text>

        <yhm-form-text v-if="!isPortNo" title="护照号" @input="isNoEvent" @repeatverify="isRepeatVerifyEvent" ref="idNo" tip="value" :value="idNo" id="idNo" :rule="idnoRule">
          <div v-show="variable" class="formBoxIcon" @click="copyEvent" title="点击共用手机号">
            <span class="i-copy"></span>
          </div>
        </yhm-form-text>

        <yhm-form-radio title="生日历法" @call="calendarEvent" :select-list="calendarList" :value="calendar" id="calendar"></yhm-form-radio>

        <yhm-form-text title="籍贯" style="position: relative;" :no-edit="noedit" :value="nativePlace" @focus="nativePlaceFocus" id="nativePlace" tip="value">
<!--          <div :class="{'shade':cityShow}" @click="shadeClick"></div>-->
          <div class="nativePlaceBox" v-show="true"
               :class="{
               'nativePlaceBox':cityShow,
               'nativePlaceBoxHide':!cityShow,
               'nativePlaceBox1':category==='1',
               'nativePlaceBox0':category==='0'}">
            <span v-for="(item,index) in cityList" v-show="cityListShow" :key="index" @click="nativePlaceClick(item,index)">{{item.name}}</span>
            <span v-for="(items) in cities" v-show="!cityListShow" :key="items" @click="citiesClick(items)">{{items}}</span>
            <span style="position: absolute;right: 4px;bottom: 4px;font-size: 22px" @click="shadeClick" class="icon-delete2"></span>
          </div>

          <div class="formBoxIcon" @click="personNative">
            <span class="i-help"></span>
          </div>

        </yhm-form-text>

        <yhm-form-text title="公历生日" :value="birthday" id="birthday" :no-edit="isExpatriate"></yhm-form-text>
        <yhm-form-text title="农历生日" :value="birthdayLunar" id="birthdayLunar" :no-edit="isExpatriate"></yhm-form-text>
        <yhm-form-text title="属相" :value="zodiac" id="zodiac" :no-edit="isExpatriate"></yhm-form-text>
        <yhm-form-text title="星座" :value="constellation" id="constellation" :no-edit="isExpatriate"></yhm-form-text>
        <yhm-form-select title="民族" @click="nationEvent" tip="value" :value="nation" id="nation"></yhm-form-select>
        <yhm-form-select title="血型" @click="bloodTypeEvent" tip="bloodType" :value="bloodType" id="bloodType" ></yhm-form-select>
        <yhm-form-textarea title="备注" :show="isThisUnit" :value="remarkStr" id="remarkStr"></yhm-form-textarea>
        <yhm-form-check title="标签" :show="!isThisUnit" :select-list="tagList" submit-value="tagSubmit" :ownerID="id" :tableName="'1029'" :value="tag" id="tag" rule="#" width="1"></yhm-form-check>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

    <div class="switchIconTop switchIconTop2" @click="switchClick" v-show="switchIconShow">
      <span class="i-input-down-arrow switchIcon2 iconUp"></span>
    </div>
    <yhm-form-list-edit  class="duplicateAccount" :class="{isList:isList}">
      <template #switchIcon>
        <div class="switchIconTop" @click="switchClick">
          <span class="i-input-down-arrow switchIcon2"></span>
        </div>
      </template>
      <template #title>重复账户信息</template>
      <template #listHead>
        <yhm-managerth style="width: 38px;background: linear-gradient(0deg, #ec6603, #a24906);" title="查看"></yhm-managerth>
        <yhm-managerth title="姓名" style="background: linear-gradient(0deg, #ec6603, #a24906);"></yhm-managerth>
        <yhm-managerth style="width: 170px;background: linear-gradient(0deg, #ec6603, #a24906);" title="性别"></yhm-managerth>
        <yhm-managerth style="width: 100px;background: linear-gradient(0deg, #ec6603, #a24906);" title="手机号码"></yhm-managerth>
        <yhm-managerth style="width: 230px;background: linear-gradient(0deg, #ec6603, #a24906);" title="身份证号"></yhm-managerth>
        <yhm-managerth style="width: 100px;background: linear-gradient(0deg, #ec6603, #a24906);" title="重要级别"></yhm-managerth>
        <yhm-managerth style="width: 150px;background: linear-gradient(0deg, #ec6603, #a24906);" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="lookPublic(item,0)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name" @click="listView(item)"></yhm-manager-td>
          <yhm-manager-td-center :value="item.sex==0?'女':'男'"></yhm-manager-td-center>
          <yhm-manager-td :value="item.phone"  @click="lookPublic(item,1)"></yhm-manager-td>
          <yhm-manager-td :value="item.idNo" ></yhm-manager-td>
          <yhm-manager-td :value="item.important==0?'重要联系人':'一般联系人'"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="isUrl" @click="select(item)" style="color:#ec6603" value="选择"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

    </yhm-form-list-edit>
    <div class="copyTip" v-if="isCopyTip">复制成功：{{idNo}}</div>
  </div>
</template>

<script>
  import {formatPhone, guid } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  import city from '@/assets/city.json'
  export default {
    name: 'addPersonForm',
    mixins: [formmixin],
    data() {
      return {
        cityList:city,
        cities:[],
        noedit:'0',
        cityListShow:true,
        cityShow:false,
        idnoRule:'R5000',
        provinceAndCity:'',
        id: '',
        ownerID: '',
        isUrl:'',
        verificationId:'',
        isList:false,
        switchIconShow:false,
        flatType:false,//外单位姓名是否重复
        flatTypes:false,//本单位手机号是否重复
        list:[],
        categoryList: [] ,
        category: '',
        sexList: [],
        sex: '',
        name: '',
        phone: '',
        importantList: [],
        important: '',
        abbreviation: '',
        remarkStr: '',
        department: '',
        departmentID: '',
        unit: '',
        unitID: '',
        idNo: '',
        idNoID: '',
        nativePlace: '',
        calendarList: [],
        calendar: '',
        politicsStatusList: [],
        politicsStatus: '',
        birthday: '',
        birthdayLunar: '',
        zodiac: '',
        zodiacID: '',
        constellation: '',
        constellationID: '',
        nation: '',
        nationID: '',
        bloodType: '',
        bloodTypeID: '',
        tagList: [],
        tag: [],
        tagSubmit:[],
        isThisUnit: true,
        isCopyTip: false,

        variable:false,
        variableType:'0',
        isPortNo:true,
        expatriate:'',  //是否外籍  0是 1 否
        isExpatriate:'1',
      }
    },
    methods: {
      shadeClick(){
        this.cityShow=false
      },
      clickLoginNameReset(){
        this.isPortNo=!this.isPortNo
        if(this.expatriate==0){

          this.isExpatriate='1'
        }else{
          this.isExpatriate='0'

        }
      },
      aaa(){
        this.$dialog.confirm({
          width: '300',
          tipValue: '是否共用手机号?',
          btnValueOk:'是',
          btnValueCancel:'否',
          alertImg: 'warn',
          okCallBack: () => {
            this.variableType='1'
          },
        })
      },
      citiesClick(item){//点击选择市
        this.cityShow = false
        this.nativePlace = this.provinceAndCity+ '/' +item//将选中的值赋给输入框
      },
      nativePlaceClick(item,index){//点击选择省
        this.provinceAndCity = item.name
        this.cities = item.cities
        this.cityListShow = false
      },
      nativePlaceFocus(){
        this.cityListShow = true
        this.cityShow = true
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/addPersonForm?id=' + item.id,
          title: '编辑联系人信息',
          closeCallBack: (data)=>{
            if(data){
              this.ajaxJson({
                url:"/Fin/getPrivateAccountInformation",
                data:{
                  id:this.privateAccountId,
                },
                loading:"0",
                call:(information) =>{
                  this.list=information
                  if(this.list.length>0){
                    this.isList=true
                  }
                },
              })
            }
          }
        })
      },
      lookPublic(item,index){
        let title = ''
        let url = ''
        if(index == 0){
          title = '查看联系人信息'
          url = '/personView?id=' + item.id
        }else if(index == 1){
          title = '编辑联系人信息'
          url = '/addPersonForm?id=' + item.id

        }
        this.$dialog.OpenWindow({
          width: '1050',
          height:'800',
          title: title,
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.ajaxJson({
                url:"/Basic/getPersonID",
                data:{
                  id:data,
                },
                loading:"0",
                call:(information) =>{
                  this.list=information
                  if(this.list.length>0){
                    this.isList=true
                  }else {
                    this.isList=false
                    this.switchIconShow=false
                  }
                },
              })
            }
          }
        })
      },
      select(item){
        if(item.personID===this.personID){
          this.$dialog.setReturnValue(item)
          this.$dialog.close()
        }else{
          this.$dialog.alert({
            tipValue: '请选择所选人账户',
            alertImg: 'error',
          })
        }
      },
      switchClick(){//重复账号信息显示隐藏
        this.isList=!this.isList
      },
      /* 视频播放 */
      videoPlay(){
        this.$dialog.OpenWindow({
          width: '1100',
          height: '680',
          title: '视频帮助',
          url: '/videoPlay?videoUrl=http://hp.yhm.hk/UploadFile/videoHelp/person.mp4',
          closeCallBack: ()=>{

          }
        })
      },
      /* 点击复制 */
      copyEvent(){
        if(this.idNo){
          this.$copyText(this.idNo).then(res=>{
            this.isCopyTip =  true
            let that = this
            setInterval(function () {
              that.isCopyTip =  false
            },5000)
          },err=>{

          })
        }
      },
      /* 查询籍贯 */
      personNative(){
        window.open('http://qq.ip138.com/idsearch/')
      },
      /* 所属公司 */
      selectUnit(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?categoryBefore=1&category=' + this.category,
          title: '选择单位',
          closeCallBack: (data)=>{
            if(data){
              this.unit = data.name
              this.unitID = data.id
            }
          }
        })
      },
      /* 选择民族 */
      nationEvent(){
        let name = '69'
        this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectDic?name=' + name,
            title: '选择民族',
            closeCallBack: (data) => {
              if(data){
                this.nation = data.showName
                this.nationID = data.id
              }
            }
        })
      },
      /* 选择血型 */
      bloodTypeEvent(){
        let name = '71'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择血型',
          closeCallBack: (data) => {
            if(data){
              this.bloodType = data.showName
              this.bloodTypeID = data.id
            }
          }
        })
      },

      /* 获取生日属相等 */
      isNoEvent(){
        if(this.idNo.length === 18){
          if (parseInt(this.idNo.substr(16, 1)) % 2 == 1) {
            this.sex = '1'
          } else {
            this.sex = '0'
          }
          let params = {
            idNo: this.idNo,
            calendar: this.calendar
          }
          this.ajaxJson({
            url: '/Basic/getDataByCalendarAndBirthdayVue',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.birthday = data.birthday
                this.birthdayLunar = data.birthdayLunar
                this.zodiac = data.zodiac
                this.zodiacID = data.zodiacID
                this.constellation = data.constellation
                this.constellationID = data.constellationID
                this.nativePlace = data.nativePlace
                this.noedit = '1'
                if(parseInt(this.idNo.substring(16,17))%2===1){
                  this.sex = '1'
                }else{
                  this.sex = '0'
                }
              }else {
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }else if(this.idNo.length === 0){
          this.nativePlace = ''
          this.noedit = '0'
        }
      },
      /* 切换生日历法 */
      calendarEvent(){
        if(this.calendar === '0'){
          this.calendar = '0'
          this.isNoEvent()
        }else{
          this.calendar = '1'
          this.isNoEvent()
        }
      },
      /* 单位类型切换 */
      categoryEvent(){
        if(this.category === '1'){
          this.idnoRule=''
          this.isThisUnit = false
        }else {
          this.idnoRule = 'R5000'
          this.isThisUnit = true
        }
        this.isRepeatVerifyEvent()
      },
      cutOutFront(item){//截取特定字符串前边的
        let tr = item.match(/(\S*)%/)[1];
        return tr
      },
      cutOutBack(item){//截取特定字符串后边的
        let str = item.match(/%(\S*)/)[1];
        return str
      },
      /* 重复账号判断 并弹出重复的联系人数据 */
      duplicateAccount(data){
        this.isList = true
        this.switchIconShow = true
        let arr = []
        if(data.type==='0'){
          this.flatType = false
          this.flatTypes = false
        }
        if(data.html!==''){//姓名已存在
          if(this.category==='1'){//外单位时
            this.flatType = true//标记 外单位姓名是否重复 true为重复
          }
          let name = this.cutOutFront(data.html)//截取字符串并返回 姓名

          arr.push("'" + this.cutOutBack(data.html) + "'")
            this.$refs.name.errorEvent(name)
          // }
        }
        if(data.message!==''){
          if(this.category==='0'){//本单位时
            this.flatTypes = true//标记 本单位手机号是否重复 true为重复
          }
            let phone = this.cutOutFront(data.message)//截取字符串并返回 电话号
            this.$refs.phone.errorEvent(phone)
            arr.push("'" + this.cutOutBack(data.message) + "'")
            this.variable = true
            this.variableType = '2'
        }
        if(data.val!==''){
          let identityCard = this.cutOutFront(data.val)//截取字符串并返回 身份证
          arr.push("'" + this.cutOutBack(data.val) + "'")
          this.$refs.idNo.errorEvent(identityCard)
          this.variableType = '4'
        }

        this.verificationId = arr.join(',')
        let verificationId = this.verificationId.replace(/☆/g,"'"+','+"'")
        let params = {
          id:verificationId
        }

        if(this.verificationId){
          this.ajaxJson({
            url: '/Basic/getPersonID',
            data: params,
            loading: "0",
            call: (data) => {
              this.list = data
            }
          })
        }else{
          this.isList = false
          this.switchIconShow = false
        }
      },

      /* 验证 */
      repeatVerifyEvent() {
        this.variableType='1'
        if(this.category === '1'){
          if (this.name && this.phone){
            let params = {
              id:this.id,
              name: this.name,
              phone: this.phone,
              idNo: this.idNo,

            }
            this.ajaxJson({
              url: '/Basic/verifyPersonVueName',
              data: params,
              loading: "0",
              call: (data) => {
                if (data.type === 1){
                  this.isList = true
                  this.switchIconShow = true
                  this.duplicateAccount(data,'0')
                }else{
                  this.isList = false//关闭底部重复信息
                  this.switchIconShow = false//关闭重复信息框的隐藏按钮
                  this.flatType = false
                  this.flatTypes = false
                }
              }
            })
          }
        }else {
          if (this.name && this.phone && this.idNo.length === 18){
            let params = {
              id:this.id,
              name: this.name,
              phone: this.phone,
              idNo: this.idNo
            }
            this.ajaxJson({
              url: '/Basic/verifyPersonVueName',
              data: params,
              loading: "0",
              call: (data) => {
                alert(data)
                if (data.type === 1) {
                  this.isList = true
                  this.switchIconShow = true
                  this.duplicateAccount(data)
                  // this.$refs.name.errorEvent("用户名已存在")
                }else{
                  this.isList = false
                  this.switchIconShow = false
                  this.flatType = false
                  this.flatTypes = false
                }
              }
            })
          }
        }
      },
      async isRepeatVerifyEvent(){
        if (this.name && this.phone) {
          let params = {
            name: this.name,
            phone: this.phone,
            idNo: this.idNo,
            id: this.id
          }
          let result = await this.ajaxAsync({
            url: '/Basic/verifyPersonVueName',
            data: params,
            loading:"0"
          })
          if(result.type === 1){
            this.duplicateAccount(result)
            // this.$refs.name.errorEvent('联系人已存在')
            if(this.category==='1'){//外单位
              if(this.flatType === true){//外单位姓名重复时 允许
                return true
              }else{
                this.flatType = false
              }
              return false
            }else if(this.category==='0'){
              if(this.flatTypes === true){//本单位手机号重复时 允许
                return true
              }else{
                this.flatTypes = false
              }
              return false
            }
          }
          return true
        }

      },
      async save(){

        let a = await this.isRepeatVerifyEvent()
        let b = this.validator()
        if (this.variableType === '0'){
          this.variableType = '3'
        }
        if (this.variableType === '3'){
          this.save()
        }else
        if(this.variableType === '1'){
          if(b){
            let params = {

              id: this.id,
              category: this.category,
              sex: this.sex,
              important: this.important,
              politicsStatus: this.politicsStatus,
              name: this.name,
              phone: this.phone,
              unit: this.unit,
              unitID: this.unitID,
              department: this.department,
              idNo: this.idNo,
              nativePlace: this.nativePlace,
              calendar: this.calendar,
              birthday: this.birthday,
              birthdayLunar: this.birthdayLunar,
              tagList: this.tagSubmit,
              zodiacID: this.zodiacID,
              zodiac: this.zodiac,
              constellation: this.constellation,
              constellationID: this.constellationID,
              bloodType: this.bloodType,
              bloodTypeID: this.bloodTypeID,
              nation: this.nation,
              nationID: this.nationID,
              expatriate:this.expatriate
            }
            if(this.flatType===false&&this.flatTypes===false&&a){
              this.ajaxJson({
                url: '/Basic/personSaveVue',
                data: params,
                call: (data)=>{
                  if(data.type === 0){
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: ()=>{
                        this.$dialog.close()
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
            if(this.flatType === true){//外单位姓名重复时
              this.$dialog.confirm({
                tipValue: '是否是同一个人?',
                btnValueOk:'否',
                btnValueCancel:'是',
                okCallBack: (data) => {
                  this.ajaxJson({
                    url: '/Basic/personSaveVue',
                    data: params,
                    call: (data)=>{
                      if(data.type === 0){
                        this.$dialog.setReturnValue(this.id)
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: ()=>{
                            this.$dialog.close()
                          }
                        })
                      }else{
                        this.$dialog.alert({
                          alertImg: 'warn',
                          tipValue: data.message
                        })
                      }
                    }
                  })
                }
              })
            }

          }
        }else if(this.variableType === '2'){
          let datas = {}
          let params = {
            id:this.id,
            name: this.name,
            phone: this.phone,
            idNo: this.idNo,
          }
          this.ajaxJson({
            url: '/Basic/verifyPersonVueName',
            data: params,
            loading: "0",
            call: (data) => {
              datas = data

            }
          })
          this.$dialog.confirm({
            width: '300',
            tipValue: '是否共用手机号?',
            btnValueOk:'是',
            btnValueCancel:'否',
            alertImg: 'warn',
            okCallBack: () => {
              if(b){
                let params = {
                  id: this.id,
                  category: this.category,
                  sex: this.sex,
                  important: this.important,
                  politicsStatus: this.politicsStatus,
                  name: this.name,
                  phone: this.phone,
                  unit: this.unit,
                  unitID: this.unitID,
                  department: this.department,
                  idNo: this.idNo,
                  nativePlace: this.nativePlace,
                  calendar: this.calendar,
                  birthday: this.birthday,
                  birthdayLunar: this.birthdayLunar,
                  tagList: this.tagSubmit,
                  zodiacID: this.zodiacID,
                  zodiac: this.zodiac,
                  constellation: this.constellation,
                  constellationID: this.constellationID,
                  bloodType: this.bloodType,
                  bloodTypeID: this.bloodTypeID,
                  nation: this.nation,
                  nationID: this.nationID,
                  expatriate:this.expatriate
                }
                if(datas.html==''&&datas.val==''||this.flatTypes == true){
                  this.ajaxJson({
                    url: '/Basic/personSaveVue',
                    data: params,
                    call: (data)=>{
                      if(data.type === 0){
                        this.$dialog.setReturnValue(this.id)
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: ()=>{
                            this.$dialog.close()
                          }
                        })
                      }else{
                        this.$dialog.alert({
                          alertImg: 'warn',
                          tipValue: data.message
                        })
                      }
                    }
                  })
                }
                if(this.flatType === true){//外单位姓名重复时
                  this.$dialog.confirm({
                    tipValue: '是否是同一个人?',
                    btnValueOk:'否',
                    btnValueCancel:'是',
                    okCallBack: (data) => {
                      this.ajaxJson({
                        url: '/Basic/personSaveVue',
                        data: params,
                        call: (data)=>{
                          if(data.type === 0){
                            this.$dialog.setReturnValue(this.id)
                            this.$dialog.alert({
                              tipValue: data.message,
                              closeCallBack: ()=>{
                                this.$dialog.close()
                              }
                            })
                          }else{
                            this.$dialog.alert({
                              alertImg: 'warn',
                              tipValue: data.message
                            })
                          }
                        }
                      })
                    }
                  })
                }

              }
            },
          })
        }else if(this.variableType = '4'){
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '身份证号重复不能保存',
            closeCallBack: ()=>{
            }
          })
        }
      },
      initData(){
        this.init({
          url: '/Basic/personVueForm',
          all: (data)=>{
            this.categoryList = data.categoryPsd.list  //单位
            this.category = data.categoryPsd.value
            this.sexList = data.sexPsd.list   //性别
            this.sex = data.sexPsd.value
            this.importantList = data.importantPsd.list  //重要联系人
            this.important = data.importantPsd.value
            this.politicsStatusList = data.politicsStatusPsd.list  //政治面貌
            this.politicsStatus = data.politicsStatusPsd.value
            this.phone = data.phone   //手机号码
            this.unit = data.unit   //单位
            this.unitID = data.unitID
            this.department = data.department  //所属部门
            this.departmentID = data.departmentID
            this.idNo = data.idNo   //身份证号
            this.idNoID = data.idNoID
            this.nativePlace = data.nativePlace   //籍贯
            this.calendarList = data.calendarPsd.list  //生日历法
            this.calendar = data.calendarPsd.value
            this.birthdayLunar = data.birthdayLunar  //农历生日
            this.tagList = data.tagPsd.list  //标签
            this.tag = data.tagPsd.value
            if(this.category == '1'){
              this.idnoRule=''
              this.isThisUnit = false
            }else {
              this.idnoRule = 'R5000'
              this.isThisUnit = true
            }
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.birthday = data.birthday   //公历生日
            this.zodiac = data.zodiac   //属相
            this.zodiacID = data.zodiacID
            this.constellation = data.constellation  //星座
            this.constellationID = data.constellationID
            this.nation = data.nation   //民族
            this.nationID = data.nationID
            this.bloodType = data.bloodType  //血型
            this.bloodTypeID = data.bloodTypeID
            this.name = data.name   //姓名
            this.expatriate=data.expatriate

            if(this.expatriate==0){
              this.isPortNo=true
              this.isExpatriate='1'
            }else{
              this.isExpatriate='0'
              this.isPortNo=false
            }

          }
        })
      }
    },
    created () {
      this.setQuery2Value('isUrl')
      this.setQuery2Value('name')
      this.initData()
    },
    watch: {
      // idNo(){
      //   if(this.idNo !== ''){
      //     this.idnoRule = 'R5000'
      //   }
      //   if(this.category === '1' && this.idNo === ''){
      //     this.idnoRule = ''
      //   }
      // }
    }
  }
</script>

<style lang="less" scoped>
  .shade{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  .nativePlaceBoxHide{
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    z-index: 999;
    transition: all 0.5s;
    overflow: hidden;
  }
  .nativePlaceBox1{
    right: 34px;
    top: 42px;
  }
  .nativePlaceBox0{
    top: 42px;
    left: 84px;
  }
  .nativePlaceBox{
    position: absolute;
    width: 881px;
    height: 180px;
    transition: all 0.5s;
    border: 1px solid #bfbfbf;
    z-index: 999;
    background: #fff;
    overflow: hidden;
    font-size: 16px;
    border-radius: 4px;
    padding: 5px;
    margin: 0 auto 20px auto;
    span{
      display: inline-block;
      text-align: center;
      width:auto;
      cursor: pointer;
      padding: 10px;
    }
    span:hover{
      border-radius: 5px;
      background: #49a9ea;
      color: #fff;
    }
  }
  .isList{
    position: fixed;
    bottom: 0!important;
  }
  .duplicateAccount{
    position: fixed;
    bottom: -99%;
    transition: all 0.5s;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 64px;
    box-shadow: 0px -5px 5px #bfbfbf;
  }
  .iconUp{
    color: #fff;
    transform:rotate(180deg);
    transition: all 0.5s;
  }
  .switchIconTop2{
    display: flex;
    justify-content: center;
    background-color: #49a9ea;
    height: 48px!important;
    line-height: 48px !important;
    box-shadow:0 1px 7px #49a9ea ;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 48px;
    padding: 0!important;
    border-radius: 50%;
    margin:0 20px 72px 0;
  }
  .switchIconTop{
    /*display: flex;*/
    margin-top: 10px;
    align-items: center;
    padding:0 22px;
    height: 20px;
    line-height: 20px;

    .switchIcon2{
      font-size: 20px;
      display: inline-block;
      float: right;
    }
  }
</style>
                                                                                                             从v
