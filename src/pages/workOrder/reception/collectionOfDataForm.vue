<template>
  <div class="f_main" >
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <!--        <yhm-form-date title="接待日期" :no-edit="state=='5'?true:false" :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>-->
        <yhm-form-date :no-edit="showType=='1'?true:false" title="预计" subtitle="交车时间" :min="currentDate" :min-year="Number(currentDate.slice(0,4))" :value="endDate" id="endDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="里程数" :value="milage" id="milage"></yhm-form-text>
        <yhm-form-radio title="维修类型" width="1" :no-edit="state=='5'?true:false" ref="collectionRadio" :select-list="categoryList" @call="callCategory(category)" :value="category+''" id="category" rule="#"></yhm-form-radio>
        <yhm-form-radio title="保险公司" :no-edit="state=='5'?true:false" width="1" ref="collectionRadio1" :select-list="subList" :value="sub" v-show="subShow" @call="subCall" id="sub" rule="#"></yhm-form-radio>
        <!--        <yhm-form-text title="其它" subtitle="系统编号" :value="otherCode" id="otherCode"></yhm-form-text>-->
        <!--        <yhm-form-radio title="工单来源"  :select-list="orderSourceList" :value="orderSource" id="orderSource"></yhm-form-radio>-->
        <!--        <yhm-form-radio title="状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>-->
        <!--        <yhm-form-radio title="业务来源" :select-list="sourceList" :value="source" id="source"></yhm-form-radio>-->
        <yhm-form-radio title="工单类型" :no-edit="state=='5'?true:false" ref="collectionRadio2" @call="worktypeChange(worktype)" :select-list="worktypeList" :value="worktype" id="worktype" rule="#"></yhm-form-radio>
        <yhm-form-text title="OA项目号" :value="code" placeholder="保存后OA项目号由系统生成" id="code" no-edit="1">
        <!--          <div v-show="state=='5'?false:true" style="display: flex;justify-content: center;align-items: center;" title="获取系统生成的编号">-->
        <!--            <svg t="1606805515247" style="margin-left: 3px;" @click="acquireCode" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="4588" width="28" height="28"><path d="M512 1003.52a497.92 497.92 0 1 1 497.92-497.92A498.56 498.56 0 0 1 512 1003.52zM512 71.68a433.92 433.92 0 1 0 433.92 433.92A434.56 434.56 0 0 0 512 71.68z" fill="#49a9ea" p-id="4589"></path><path d="M152.96 369.92a33.92 33.92 0 0 1 35.2-36.48 39.04 39.04 0 0 1 29.44 16l148.48 198.4V369.92a35.2 35.2 0 1 1 69.76 0V640a30.72 30.72 0 0 1-34.56 33.28 36.48 36.48 0 0 1-29.44-12.8l-147.2-198.4V640a30.72 30.72 0 0 1-34.56 33.28 31.36 31.36 0 0 1-37.12-33.28zM463.36 504.32a162.56 162.56 0 1 1 323.84 0 158.08 158.08 0 0 1-161.92 168.96 159.36 159.36 0 0 1-161.92-168.96z m252.16 0c-3.84-69.12-33.92-104.96-90.24-108.8s-84.48 39.68-88.32 108.8 33.28 104.32 88.32 108.16 86.4-36.48 90.24-108.16zM856.96 603.52A37.12 37.12 0 0 1 896 640c0 21.12-13.44 32-36.48 33.28s-35.84-12.16-37.12-33.28a37.76 37.76 0 0 1 34.56-36.48z" fill="#49a9ea" p-id="4590"></path></svg>-->
        <!--          </div>-->
        </yhm-form-text>
        <yhm-form-radio title="派工方式" :select-list="methodList" ref="collectionRadio3" :value="method" id="method" rule="#"></yhm-form-radio>

        <yhm-form-zh-text-more-checkbox :no-edit="true" @clickCheckBox="clickCheckBoxEvent" title="合计金额" :value="expend" id="expend" :check-value="moneyCheck" check-value-id="moneyCheck" :check-list="moneyCheckList"></yhm-form-zh-text-more-checkbox>

        <!--        <yhm-form-radio title="适用车型" width="1" :no-edit="true" :select-list="applicableModelsList.list" @call="accessNumber" :value="applicableModels" id="applicableModels"></yhm-form-radio>-->
        <yhm-form-textarea title="备注" before-icon=" " :value="remark" id="remark"></yhm-form-textarea>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="fixPhoto" subtitle=""></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>定损单详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :is-error="true" :flicker="true" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="项目名称"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
        <yhm-managerth title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="工时费"></yhm-managerth>
        <yhm-managerth width="40" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(index,item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.nameStr+''"></yhm-manager-td>
          <yhm-manager-td-center :value="formTypeList[item.category].showName+''"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-form-td-delete width="40" :list="list" :value="item" :del-click="true" @click="delServe(item,index,'0')"></yhm-form-td-delete>
        </tr>
      </template>
      <template #customize>
        <div class="aggregateMoney">
          <span></span>
          <div style="margin-right: 32px;">
            <span style="font-weight: bold;color: #666666;margin-right: 5px;">预计收入:</span>
            <span style="color: #4BB414;">￥</span>
            <span style="color: #4BB414;" v-html="getTxt(money)"></span>
          </div>
        </div>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="list.length==0?true:false">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split fittings"></div>
    <yhm-form-list-edit>
      <template #title>维修配件</template>
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" @call="addAccessories"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 36px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 170px" title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="整件数量"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="整件单位"></yhm-managerth>
        <yhm-managerth style="width: 65px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="拆分单位"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
<!--        <yhm-managerth style="width: 90px" title="客户报价"></yhm-managerth>-->
        <yhm-managerth style="width: 90px" title="金额"></yhm-managerth>
<!--        <yhm-managerth style="width: 90px" title="折扣价"></yhm-managerth>-->
        <yhm-managerth style="width: 110px" title="提交状态"></yhm-managerth>
        <!--        <yhm-managerth style="width: 90px" title="含税总价"></yhm-managerth>-->
        <yhm-managerth style="width: 35px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fixOrderMaterial" :key="index" :class="{InterlacBg:index%2!==0}">
          <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>
<!--          <yhm-form-td-textbox width="36" :key="key" no-edit="1" id="index" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-select-dialog :no-edit="item.commit=='0'?'':'1'" width="180" tip="value" @call="selectProduct(item,index)" id="product" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-select-dialog :no-edit="item.commit=='0'?'':'1'" width="150" tip="value" @call="selectModel(item,index)" id="model" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox :no-edit="item.commit=='0'&&item.splitVal!='0'?'':'1'" width="60" @input="accessoriesChange(item,'1')" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" id="quantity" rule="R0000"></yhm-form-td-textbox>


          <yhm-form-td-textbox :no-edit="item.commit=='0'&&item.splitVal!='0'?'':'1'" style="text-align: center;" width="65" tip="value" id="uuStr" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="65" :no-edit="item.commit=='0'&&item.noEdit==''?'':'1'" @input="accessoriesChange(item,'2')" tip="value" id="mdo" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" rule="R0000"></yhm-form-td-textbox>

          <yhm-form-td-textbox width="65" tip="value" :no-edit="item.commit=='0'&&item.noEdit==''?'':'1'" id="mdoStr" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox no-edit="1" width="90" @input="accessoriesChange(item)" tip="money" before-icon="rmb" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" id="originalmoney"></yhm-form-td-textbox>
<!--          <yhm-form-td-textbox width="90" @input="customerQuotation(item)" tip="money" tip-left="-160" tip-arrow-left="180" before-icon="rmb" id="discount"  :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"></yhm-form-td-textbox>-->

          <yhm-form-td-textbox no-edit="1" width="90" @input="accessoriesChange(item)" tip="money" tip-left="-160" tip-arrow-left="180" before-icon="rmb" id="money"  :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"></yhm-form-td-textbox>
<!--          <yhm-form-td-textbox width="90" @input="toprice(item)" tip="money" tip-arrow-left="170" tip-left="-153"  id="priceTax" before-icon="rmb" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"  ></yhm-form-td-textbox>-->
<!--          <yhm-form-td-textbox width="90" tip="money" tip-arrow-left="180" tip-left="-160"  id="totalPriceTax" before-icon="rmb" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"  ></yhm-form-td-textbox>-->
          <yhm-form-td-textbox width="110" style="text-align: center;" no-edit="1" id="stateVal" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-delete width="35" :no-click="item.commit=='0'?false:true" :list="fixOrderMaterial" :value="item" :del-click="true" @click="delServe(item,index,'2')"></yhm-form-td-delete>

        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fixOrderMaterial.length=='0'?true:false">暂时没有数据</span>
      </template>
      <template #customize>
        <div class="aggregateMoney" style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 0 33px;">
          <div>
            <span style="font-weight: bold;color: #666666;margin-right: 5px;">优惠金额:</span>
            <span style="color: #f00;">￥</span>
            <span style="color: #f00;" v-html="getTxt(Number(amount)-Number(mailact)+'')"></span>
          </div>
          <div>
            <span style="font-weight: bold;color: #666666;margin-right: 5px;" @click="$refs.mailactFocus.focus()">客户实际付款金额(点击输入):</span>
            <span style="color: #4BB414;">￥</span>
            <!--            <span style="color: #4BB414;" v-html="getTxt(actualmoney)"></span>-->
            <input type="text" style="color: #4BB414;" placeholder="不能为空" ref="mailactFocus" @input="mailactInput" @blur="mailactBlur" v-model="mailact">
          </div>
          <div style="margin-right: 5px;">
            <span style="font-weight: bold;color: #666666;margin-right: 5px;">总计金额:</span>
            <span style="color: #FD6802;">￥</span>
            <span style="color: #FD6802;" v-html="getTxt(amount+'')"></span>
          </div>
        </div>
      </template>
    </yhm-form-list-edit>

<!--    <yhm-form-list-show>-->
<!--      <template #title>维修配件</template>-->
<!--      <template #operate>-->
<!--&lt;!&ndash;        <yhm-commonbutton value="保存并推送到车间" :flicker="true" v-if="Number(fixOrderMaterialLength)<fixOrderMaterial.length?true:false" color="#00bb6b" border-style="1px solid #00bb6b" icon=" " @call="pushWorkshop" category="three"></yhm-commonbutton>&ndash;&gt;-->
<!--&lt;!&ndash;        <yhm-commonbutton value="保存并推送到车间" :flicker="true" v-else-if="pushWorkshopList.indexOf('0')!=-1&&partsList.length>'0'?true:false" color="#00bb6b" border-style="1px solid #00bb6b" icon=" " @call="pushWorkshop" category="three"></yhm-commonbutton>&ndash;&gt;-->
<!--        <yhm-commonbutton value="添加" icon="btnAdd" :is-error="true" :flicker="true" @call="addMaterials()" category="three"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        <yhm-managerth style="width: 38px" title="查看" v-show="showType=='1'?false:true"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 38px" title="序号"></yhm-managerth>-->
<!--        <yhm-managerth title="商品名称"></yhm-managerth>-->
<!--        <yhm-managerth title="规格型号"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="拆分数量"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="整件数量"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="金额"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="折扣价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 100px" title="提交状态"></yhm-managerth>-->
<!--        &lt;!&ndash;        <yhm-managerth style="width: 120px" title="材料类型"></yhm-managerth>&ndash;&gt;-->
<!--        <yhm-managerth width="40" title="删除" v-show="showType=='1'?false:true"></yhm-managerth>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in fixOrderMaterial" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--          <yhm-manager-td-look v-show="showType=='1'?false:true" v-if="item.commit==0?true:false" @click="lookOverMaterials(item,'维修配件')"></yhm-manager-td-look>-->
<!--          <yhm-manager-td value=" " class="select" v-else></yhm-manager-td>-->
<!--          <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-center :value="item.product"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-center :value="item.mdo+''"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.discount+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-center :value="item.commit==0?'未提交':'已提交至车间'" :color="item.commit==0?'#49a9ea':'#2193b0'"></yhm-manager-td-center>-->
<!--          &lt;!&ndash;          <yhm-form-td-select width="120" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" id="type" :select-list="typeList"></yhm-form-td-select>&ndash;&gt;-->
<!--          <yhm-form-td-delete width="40" :no-click="item.commit==0?false:true" v-show="showType=='1'?false:true" :list="fixOrderMaterial" :value="item" :del-click="true" @click="delServe(item,index,'2')"></yhm-form-td-delete>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="fixOrderMaterial.length == 0">暂时没有数据</span>-->
<!--      </template>-->
<!--      <template #customize>-->
<!--        <div class="aggregateMoney">-->
<!--          <span></span>-->
<!--          <div style="margin-right: 60px;">-->
<!--            <span style="font-weight: bold;color: #666666;margin-right: 5px;">总计金额:</span>-->
<!--            <span style="color: #4BB414;">￥</span>-->
<!--            <span style="color: #4BB414;" v-html="amountMoneySegmentation"></span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </yhm-form-list-show>-->
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>工单详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :is-error="true" :flicker="true" @call="addWorkOrderDetail()" category="three"></yhm-commonbutton>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看" v-show="showType=='1'?false:true"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="序号"></yhm-managerth>
        <yhm-managerth  title="项目名称"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="创建日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="标准价格"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="客户报价"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="收支方向"></yhm-managerth>
        <yhm-managerth  title="备注"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="状态"></yhm-managerth>
        <yhm-managerth width="40" title="删除" v-show="showType=='1'?false:true"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in list2" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look v-show="showType=='1'?false:true" @click="lookOverWorkOrder(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.name"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.discount+''"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state+''" :list="detailsStateList"></yhm-manager-td-psd>
          <yhm-form-td-delete v-show="showType=='1'?false:true" width="40" :list="list2" :value="item" :del-click="true" @click="delServe(item,index,'1')" ></yhm-form-td-delete>
        </tr>
      </template>
      <template #customize>
        <div class="aggregateMoney" style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 0 33px;">
          <div>
            <span style="font-weight: bold;color: #666666;margin-right: 5px;">优惠金额:</span>
            <span style="color: #f00;">￥</span>
            <span style="color: #f00;" v-html="getTxt(Number(productMoney)-Number(productact)+'')"></span>
          </div>
          <div>
            <span style="font-weight: bold;color: #666666;margin-right: 5px;" @click="$refs.actualmoneyFocus.focus()">客户实际付款金额(点击输入):</span>
            <span style="color: #4BB414;">￥</span>
<!--            <span style="color: #4BB414;" v-html="getTxt(actualmoney)"></span>-->
            <input type="text" style="color: #4BB414;" placeholder="不能为空" ref="actualmoneyFocus" @input="actualmoneyInput" @blur="actualmoneyBlur" v-model="productact">
          </div>
          <div>
            <span style="font-weight: bold;color: #666666;margin-right: 5px;">合计金额:</span>
            <span style="color: #FD6802;">￥</span>
            <span style="color: #FD6802;" v-html="getTxt(productMoney+'')"></span>
          </div>
        </div>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="list2.length==0?true:false">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <div v-if="workOrderStatus!='5'">
          <yhm-commonbutton value="保存并推送到车间" :flicker="true" v-if="Number(fixOrderMaterialLength)<fixOrderMaterial.length?true:false" color="#00bb6b" border-style="1px solid #00bb6b" icon=" " @call="pushWorkshop" category="three"></yhm-commonbutton>
          <yhm-commonbutton value="保存并推送到车间" :flicker="true" v-else-if="pushWorkshopList.indexOf('0')!=-1&&partsList.length>'0'?true:false" color="#00bb6b" border-style="1px solid #00bb6b" icon=" " @call="pushWorkshop" category="three"></yhm-commonbutton>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </div>
        <div v-else>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </div>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, formatTime,tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'collectionOfDataForm',
    mixins: [formmixin],
    data(){
      return{
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        //validationRule:"/[(\ )(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/",//验证规则
        key:0,
        partsList:[],
        actualmoney:'0',//客户实际付款金额
        discountmoney:'0',//折扣优惠金额（合计金额-客户实际付款金额）
        moneyCheck:"",
        moneyCheckList:[{showName:"向上取整",num:"0"},{showName:"向下取整",num:"1"}],
        fixOrderMaterialLength:'',
        pushWorkshopList:[],//推送到车间
        codeIconShow:false,//获取系统编号
        milage:'',//里程数
        summaryid:'',//收支明细表id
        currentDate: formatDate(new Date()),//当前日期
        workDate: formatDate(new Date()),//发生日期
        endDate: formatDate(new Date()),//结束日期
        isDelMater:'',//维修配件表需要全部删除时传值
        showType:'0',//为1时表示是在工单创建之后进入的
        method:'',//派工方式
        methodList:[],//派工方式
        worktype:'',//0是维修 1是保养 2是维修加保养
        worktypes:'0',
        worktypeList:[
          {
            img:'',
            num:'0',
            code:'',
            showName:'维修',
          },
          {
            img:'',
            num:'1',
            code:'',
            showName:'保养',
          },
          {
            img:'',
            num:'2',
            code:'',
            showName:'维修保养',
          }
        ],
        code:'',//编号
        otherCode:'',//其它系统编号
        personID:'',//接待人id
        personName:'',//接待人姓名
        expend:'0',//实际支出
        productMoney:'0',//工单详情金额
        subShow:true,//保险公司显示隐藏
        source:'',//业务来源
        sourceList:[],//业务来源素材
        orderSourceList:[],//工单来源
        orderSource:'',//工单来源
        workOrderState:'5',//工单状态
        state:'0',//状态
        stateList:[],//工单状态
        detailsStateList:[],//工单详情状态
        category:'',//维修类型
        categoryList:[],//维修类型素材
        directionList:[],//收支方向素材
        sub:'',//保险公司
        subid:'',//保险公司id
        subName:'',//保险公司名称
        insurance:'',//保险公司选中的 备份
        subList:[],//保险公司
        remark:'',//备注
        amount:'0',//材料表
        applicableModels:'',//适用车型
        content:{},
        money:'0',//定损单详情 总计金额
        mailact:'0',//配件实际金额
        maildis:'0',//配件优惠金额
        productact:'0',//工单详情实际金额
        productdis:'0',//工单详情优惠金额
        partsMoney:[],//
        stockListID:guid(),//材料总表
        orderID:guid(),//
        fixID:guid(),//定损单主表id
        ownerID:guid(),//工单id
        fixOrder:guid(),//工单详情id
        processid:guid(),//定损单详情中的processid
        fileList:[],//上传文件
        list:[],//定损单详情
        list2:[],//工单详情
        formTypeList:[],//定损单详情类型
        fixOrderMaterial:[],//材料详情信息列表
        fixOrderMaterial2:[],//材料详情信息列表 用来计算客户实际金额
        processDetailList:[],//新增节点数据
      }
    },
    computed:{
      getTxt(){
        return  function (value) {
          return tenThousandFormatHtml(value+'')
        }
      },
    },
    methods:{
      customerQuotation(item){
        let containSpecial = RegExp(/[(\ )(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/);
        if(Number(item.discount)<0){//输入为负数时变为0
          item.discount = '0'
        }else if(containSpecial.test(item.discount)){//输入特殊符号时变为0
          item.discount = '0'
        }else{
          item.price =  item.discount+''
          item.money = item.splitVal=='1'?(accMul(Number(item.price),Number(item.quantity))+''):(accMul(Number(item.price),Number(item.mdo))+'')// 金额
        }
      },
      actualmoneyInput(){
        let containSpecial = RegExp(/[(\ )(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/);
        if(Number(this.productact)<0||this.productact==''){//输入为负数时变为0
          this.productact = '0'
        }else if(Number(this.productact)>Number(this.productMoney)){
          this.productact = this.productMoney
        }else if(containSpecial.test(this.productact)){//输入特殊符号时变为0
          this.productact = '0'
        }else if(this.productact.length>=8){
          this.productact = this.productact.slice(0,8)
        }
        // console.log(this.productact/this.productMoney*10 ,'折')
      },
      actualmoneyBlur(){//工单详情 客户实际付款金额 折扣计算
        if(Number(this.productact/this.productMoney*10)<5){
          this.productact = this.productMoney
          // console.log('222222222')
        }
      },
      mailactInput(){//配件详情
        let containSpecial = RegExp(/[(\ )(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/);
        if(Number(this.mailact)<0||this.mailact==''){//输入为负数时变为0
          this.mailact = '0'
        }else if(Number(this.mailact)>Number(this.amount)){
          this.mailact = this.amount
        }else if(containSpecial.test(this.mailact)){//输入特殊符号时变为0
          this.mailact = '0'
        }else if(this.mailact.length>=8){
          this.mailact = this.mailact.slice(0,8)
        }
      },
      mailactBlur(){//配件详情 客户实际付款金额 折扣计算
        if(Number(this.mailact/this.amount*10)<8){
          this.mailact = this.amount
        }
      },
      clickCheckBoxEvent(){
        if (this.moneyCheck=='0'){
          this.expend=Math.ceil(parseFloat(this.expend))+''
        }else {
          this.expend=Math.floor(parseFloat(this.expend))+''
        }
      },
      chanGePushWorkshop(){//数据发生变动时
        for(let m in this.partsList){
          if(this.partsList[m].commit!=''){
            this.pushWorkshopList.push(this.partsList[m].commit)//推送按钮是否可以显示
          }
        }
      },
      pushWorkshop(){//推送到车间
        this.$dialog.confirm({
          tipValue: '确认将维修配件表推送到车间？',
          width:'450',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.save(true)
          }
        })
      },
      pushWorkshopAjax(){//推送到车间的请求
        this.ajaxJson({
          url: '/fix/fixMaterial/updateForCommit',
          data: {
            commit:'1',
            ownerID:this.stockListID,
          },
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.state='5'
                  this.initData()
                }
              })
            } else {
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
          }
        })
      },
      selectProduct(item,index){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectWorkOrderMaterials?category=1'+'&selectType=0'+'&storageType=1',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              item.splitVal = data.split//是否拆分 0拆分 1不拆分
              item.product = data.product//商品名称
              item.productid = data.productID//商品id
              item.category = data.category //cid
              item.applicableModels = data.applicableModels //aid
              item.model = data.model//规格型号
              item.modelID = data.modelID// 规格型号id
              item.quantity = item.splitVal=='0'?'0':'1'//整件数量
              item.mdo = item.splitVal=='1'?'0':'1'//拆分数量
              item.price = data.price+''//单价
              item.originalmoney = data.price+''//未优惠的单价
              item.money = item.splitVal=='1'?(accMul(Number(data.price),Number(item.quantity))+''):(accMul(Number(data.price),Number(item.mdo))+'')// 金额
              item.discount = '0'//客户报价
              item.uuStr = data.unit//整件单位
              item.mdoStr = item.splitVal=='0'?data.mdoStr:''//散件拆分单位
              item.noEdit = item.splitVal=='1'?'1':''//散件拆分单位是否可以编辑
              item.stateVal = item.commit=='0'?'未提交':'已提交至车间'
              this.amountOfAccessories()
            }
          }
        })
      },
      selectModel(item,index){
        if(item.product!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectProductModel?ownerID='+item.productid,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                item.modelID = data.id
                item.model = data.name
                item.price = data.price+''//单价
                this.accessoriesChange(item)
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'请先选择商品',
            alertImg:'warn',
            width:'350',
            closeCallBack: ()=>{

            }
          })
        }
      },
      addAccessories(){//添加维修配件
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectWorkOrderMaterials?category=1'+'&selectType=1'+'&storageType=1',
          title: '选择维修配件',
          closeCallBack: (data) => {
            if (data) {
              // console.log(data)
              this.fixOrderMaterial2 = []
              let insertDate
              let item
              for(let i in data){
                insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderMaterial.length, 1000)))
                item = {}
                item.id = guid()
                item.ownerID = this.stockListID//入库单id
                item.insertDate = formatTime(insertDate)
                item.index = (this.fixOrderMaterial.length+1)+''//序号
                item.num = guid()//序号id
                item.commit = '0'//是否已推送至车间
                item.splitVal = data[i].split//是否拆分 0拆分 1不拆分
                item.product = data[i].product//商品名称
                item.productid = data[i].productID//商品id
                item.category = data[i].category //cid
                item.applicableModels = data[i].applicableModels //aid
                item.type = '0'
                item.state = '0'
                item.model = data[i].model//规格型号
                item.modelID = data[i].modelID// 规格型号id
                item.discount = data[i].discount//折扣价
                item.quantity = item.splitVal=='0'?'0':'1'//整件数量
                item.mdo = item.splitVal=='1'?'0':'1'//拆分数量
                item.price = data[i].price+''//单价
                item.originalmoney = data[i].price+''//未优惠的单价
                item.money = item.splitVal=='1'?(accMul(Number(data[i].price),Number(item.quantity))+''):(accMul(Number(data[i].price),Number(item.mdo))+'')// 金额
                item.discount = '0'//客户报价
                item.uuStr = data[i].unit//整件单位
                item.mdoStr = item.splitVal=='0'?data[i].a_splitDeliveryUnit:''//散件拆分单位
                item.noEdit = item.splitVal=='1'?'1':''//散件拆分单位是否可以编辑
                item.stateVal = item.commit=='0'?'未提交':'已提交至车间'
                this.fixOrderMaterial.unshift(item)
                this.fixOrderMaterial2.push(item)
              }
              for(let a in this.fixOrderMaterial){
                this.fixOrderMaterial[a].index = (Number(a)+1)

              }
              setTimeout(()=>{
                this.key++
                // this.fixOrderMaterial.reverse()
              },0)


              this.amountOfAccessories()
              //
              //   id: guid(),
              //   // insertDate: formatTime(insertDate),
              //   num:guid(),
              //   ownerID:this.stockListID,
              //   commit:'0',
              //   product:data.product,
              //   productid:data.productid,
              //   category:data.category,
              //   applicableModels:data.applicableModels,
              //   type:'0',
              //   state:'0',
              //   money:data.money,
              //   modelID:data.modelID,
              //   discount:data.discount,//折扣价
              //   mdo:data.mdo==''?0:data.mdo,
              //   quantity:data.quantity==''?0:data.quantity,
              //   price:data.price,
              //   model:data.model,

            }
          }
        })
      },
      accessoriesChange(item,type){//修改单条配件金额或数量时计算
        item.money = (item.splitVal=='1'?accMul(Number(item.price),Number(item.quantity)):accMul(Number(item.price),Number(item.mdo)))
        item.money = item.money+''
        this.amountOfAccessories()
      },
      worktypeChange(type){
        if(type=='1'){//工单类型为保养时
          this.processDetailList = []
        }else{
          this.processDetailList = [
            {
              'nameStr':'钣金拆装或修复',
              'id':guid(),
              'ownerID':this.processid,
              'dependid':'',
              'stage':'2',
              'state':'0',
              'type':'0',
              'orderStr':''
            }
          ]
        }
        if(this.list2.length>0){
          this.$dialog.confirm({
            tipValue: '切换工单类型后将会清空工单详情,是否确认切换？',
            width:'450',
            btnValueOk:'确认',
            btnValueCancel:'取消',
            okCallBack: () => {
              this.list2 = []
              this.productMoney = 0
              this.worktypes = type
            },
            closeCallBack:()=>{
              setTimeout(()=>{
                if(this.list2.length!='0'){
                  this.worktype = this.worktypes.concat()
                  this.worktypes = this.worktype.concat()
                }
              },0)
            }
          })
        }
      },
      amountOfAccessories(type,value){//计算维修配件
        setTimeout(()=>{
          this.partsMoney = []
          let partsMoney = []
          let money = 0
          let money2 = 0
          for(let o in this.fixOrderMaterial){
            let item = this.fixOrderMaterial[o]
            this.partsMoney.push(item.splitVal=='1'?accMul(Number(item.price),Number(item.quantity))+'':accMul(Number(item.price),Number(item.mdo))+'')
          }
          for(let p in this.partsMoney){
            money += Number(this.partsMoney[p])
          }
          if(this.fixOrderMaterial.length==0){
            this.isDelMater = '1'
          }else{
            this.isDelMater = ''
          }

          this.amount = money.toFixed(2)
          if(type!='1'){
            for(let i in this.fixOrderMaterial2){
              let item = this.fixOrderMaterial2[i]
              partsMoney.push(item.splitVal=='1'?accMul(Number(item.price),Number(item.quantity))+'':accMul(Number(item.price),Number(item.mdo))+'')
            }
            for(let p in partsMoney){
              money2 += Number(partsMoney[p])
            }
            // console.log(partsMoney,money2,'-------------')
            // console.log(money2 ,this.mailact)
            this.mailact = Number(this.amount).toFixed(2)
          }else{
            this.mailact = (Number(this.mailact)-Number(value)).toFixed(2)
          }
        },0)
      },
      lookOverMaterials(item,name){
        sessionStorage.receptionMaterials = JSON.stringify(item)
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/receptionMaterialsForm',
          title: '编辑维修配件信息',
          closeCallBack: (data) => {
            for(let i in this.fixOrderMaterial){
              if(item.id == this.fixOrderMaterial[i].id){
                this.fixOrderMaterial[i].id = data.id
                this.fixOrderMaterial[i].orderid = data.ownerID
                this.fixOrderMaterial[i].ownerID = data.orderid//工单id
                this.fixOrderMaterial[i].category = data.category//cid
                this.fixOrderMaterial[i].applicableModels = data.applicableModels//aid
                this.fixOrderMaterial[i].discount = data.discount//折扣金额
                this.fixOrderMaterial[i].product = data.product//商品名称
                this.fixOrderMaterial[i].productid = data.productid//商品名称ID
                this.fixOrderMaterial[i].cost = data.cost//成本价
                this.fixOrderMaterial[i].price = data.price//单价
                this.fixOrderMaterial[i].money = data.money//金额
                this.fixOrderMaterial[i].model = data.model//规格型号
                this.fixOrderMaterial[i].modelID = data.modelID//规格型号ID
                this.fixOrderMaterial[i].mdo = data.mdo//拆分数量
                this.fixOrderMaterial[i].quantity = data.quantity//整件数量
              }
              // this.partsMoney.push((Number(this.fixOrderMaterial[i].price) * Number(this.fixOrderMaterial[i].quantity)).toFixed(2))
            }
            this.amountOfAccessories()
            // let money = 0
            // for(let p in this.partsMoney){
            //   money += Number(this.partsMoney[p])
            // }
            // this.amount = money.toFixed(2)
          }
        })
        // receptionMaterialsForm
      },
      delServe(item,index,type){//删除
        if(type=='0'){
          this.ajaxJson({
            url: '/fix/fixedDetail/save',
            data: {
              id:item.id,
              isDel:'1'
            },
            call: (data) => {
              this.list.splice(index,1)
              let money = 0
              let num = 0
              for(let i in this.list){
                money = Number(this.list[i].quantity)*Number(this.list[i].price)
                num+=money
              }
              this.money = num
              // if(data.type==0){
              //   this.$dialog.alert({
              //     tipValue: '删除成功',
              //     closeCallBack: ()=>{
              //
              //       // this.initData()
              //     }
              //   })
              // }
            }
          })
        }else if(type=='1'){
          this.ajaxJson({
            url: '/fix/fixOrderRevenue/save',
            data: {
              id:item.id,
              isDel:'1'
            },
            call: (data) => {
              this.list2.splice(index,1)
              let money = 0
              let money2 = 0
              for(let i in this.list2){
                money+=Number(this.list2[i].money)
                money2+=Number(this.list2[i].discount)
              }
              this.productMoney = money
              this.productact = money2
              // if(data.type==0){
              //   this.$dialog.alert({
              //     tipValue: '删除成功',
              //     closeCallBack: ()=>{
              //
              //       // this.initData()
              //     }
              //   })
              // }else if(data.type=='2'){
              //   this.list2.splice(index,1)
              // }
            }
          })
        }else{
          this.ajaxJson({
              url: '/fix/fixMaterial/deleteById',
              data: {
                id:item.id,
              },
              call: (data) => {
                if(data.type=='0'){
                  if(this.fixOrderMaterial.length=='1'){
                    this.mailact = 0
                    this.amount = 0
                  }else{
                    this.amountOfAccessories('1',this.fixOrderMaterial[index].money)
                  }
                  this.fixOrderMaterial.splice(index,1)
                  // console.log(this.fixOrderMaterial)
                  setTimeout(()=>{
                    for(let i in this.fixOrderMaterial){
                      this.fixOrderMaterial[i].index = (Number(i)+1)+''
                    }
                  },0)
                  if(this.fixOrderMaterial.length==0){
                    this.mailact = 0
                    this.isDelMater = '1'
                  }else{
                    this.isDelMater = ''
                  }
                  // this.$dialog.alert({
                  //   tipValue: '删除成功',
                  //   closeCallBack: ()=>{
                  //
                  //   }
                  // })
                }
              }
          })
        }
        this.chanGePushWorkshop()
      },
      addMaterials(){//添加材料详情信息
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          // url:'/selectPart?category=1&selectType=0',
          // url:'/selectMaterials?selectType=0&offLine=1&ownerID='+this.ownerID,
          url:'/workOrderMateriaListForm?offLine=1',
          title:'添加维修配件',
          closeCallBack:(data) =>{
            if(data){
              //
              // let params = {
              //   id: guid(),
              //   ownerID:this.stockListID,
              //   orderid:this.ownerID,//工单id
              //   state:'0',
              //   category:data.category, //cid
              //   applicableModels:data.applicableModels, //aid
              //   product:data.product, //商品名称
              //   productid:data.productid,//商品名称ID
              //   type:'0',
              //   // cost:this.cost,//成本价
              //   price:data.price, //单价
              //   money:data.money,//金额
              //   discount:data.discount,//折扣价
              //   model:data.model,//规格型号
              //   modelID:data.modelID,//规格型号ID
              //   mdo:data.mdo==''?0:data.mdo,//拆分数量
              //   quantity:data.quantity==''?0:data.quantity,//整件数量
              // }
              // // v-show="showType=='1'?false:true"
              // if(this.showType=='1'){
              //   this.ajaxJson({
              //     url: '/fix/fixMaterial/saveAndConfirm',
              //     data: params,
              //     call: (data)=>{
              //       if (data.type === 0) {
              //         this.partsMoney = []
              //         this.initData()
              //
              //       } else {
              //         this.$dialog.alert({
              //           alertImg: 'error',
              //           tipValue: data.message,
              //           closeCallBack: () => {
              //
              //           }
              //         })
              //       }
              //     }
              //   })
              // }else{
                // for(let j in this.fixOrderMaterial){
                //   if(this.fixOrderMaterial[j].productid == data.productid){
                //     this.$dialog.alert({
                //       tipValue:'不能添加相同的维修配件',
                //       alertImg:'warn',
                //       width:'350'
                //     })
                //     return
                //   }
                // }

                // this.partsMoney = []


              // }
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderMaterial.length, 1000)))
              let num = accAdd(this.fixOrderMaterial.length,1) + ''
              this.partsMoney.push((Number(data.price) * Number(data.quantity)).toFixed(2))
              this.fixOrderMaterial.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                num:guid(),
                ownerID:this.stockListID,
                commit:'0',
                product:data.product,
                productid:data.productid,
                category:data.category,
                applicableModels:data.applicableModels,
                type:'0',
                state:'0',
                money:data.money,
                modelID:data.modelID,
                discount:data.discount,//折扣价
                mdo:data.mdo==''?0:data.mdo,
                quantity:data.quantity==''?0:data.quantity,
                price:data.price,
                model:data.model,
              })
              // this.partsMoney = []
              // let money = 0
              // for(let o in this.fixOrderMaterial){
              //   this.partsMoney.push((Number(this.fixOrderMaterial[o].price) * Number(this.fixOrderMaterial[o].quantity)).toFixed(2))
              // }
              //
              // for(let p in this.partsMoney){
              //   money += Number(this.partsMoney[p])
              // }
              //
              // this.amount = money.toFixed(2)
              this.amountOfAccessories()


              if(this.fixOrderMaterial.length==0){
                this.isDelMater = '1'
              }else{
                this.isDelMater = ''
              }
              setTimeout(()=>{
                this.chanGePushWorkshop()
              },0)
            }
          }
        })
      },
      addWorkOrderDetail(){//添加工单详情
        if(this.worktype!=''){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '600',
            url:'/workOrderAddDetailsForm?offLine=1&worktype='+this.worktype,
            title:'添加工单详情',
            closeCallBack:(data) =>{
              if (data) {
                // console.log(data)
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderMaterial.length, 1000)))
                this.list2.unshift({
                  id:data.id,
                  name:data.name,
                  insertDate: formatTime(insertDate),
                  model:data.model,
                  modelid:data.modelid,
                  discount:data.discount,//折扣价
                  money:data.money,
                  category:data.category,
                  productbase:data.baseprice,//成本价
                  departid:data.departid,
                  direction:data.direction,
                  orderid:this.ownerID,
                  ownerID:this.fixOrder,
                  processid:'',
                  productid:data.productid,
                  remark:data.remark,
                  state:data.state,
                  stateStr:data.stateStr,
                  teamid:data.teamid,
                  workDate:data.workDate
                })

                let money = 0
                let money2 = 0
                for(let i in this.list2){
                  money+=Number(this.list2[i].money)
                  money2+=Number(this.list2[i].discount)
                }
                this.productMoney = money
                this.productact = money2
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'因工单详情需要关联工单类型,请先选择工单类型.',
            alertImg:'warn',
            width:'490',
            closeCallBack: ()=>{
              $('html,body').animate({'scrollTop':0},1000)
              setTimeout(()=>{
                this.$refs.collectionRadio2.$emit('verify')//工单类型
              },1100)
            }
          })
        }
      },
      addMaterialsDetail(){//添加材料详情
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderMateriaListForm?offLine=1',
          title:'添加工单材料详情',
          closeCallBack:(data) =>{
            if (data) {

            }
          }
        })
      },
      lookOverWorkOrder(item){
        this.ajaxJson({
            url: '/fix/fixOrderRevenue/confirm',
            data: {
              id:item.id,
            },
            call: (data) => {
              sessionStorage.workOrderAddDetailsFormData = JSON.stringify(item)
              let url = '/workOrderAddDetailsForm?ownerID='+this.ownerID+'&orderid='+this.orderid+'&id='+item.id + '&type=1'+'&lookOverType=1&workType='+this.worktype
              if(data.type=='2'){
                url = '/workOrderAddDetailsForm?ownerID='+this.ownerID+'&orderid='+this.orderid +'&id='+item.id
                  +'&lookOverType=1'+'&type=1&worktype='+this.worktype
              }
              this.$dialog.OpenWindow({
                width: '1050',
                height: '600',
                url:url,
                title:'编辑工单详情',
                closeCallBack:(data) =>{
                  if (data) {
                    // console.log(data)
                    item.remark = data.remark
                    item.money = data.money
                    item.teamid = data.teamid
                    item.discount = data.discount
                    let money = 0
                    let money2 = 0
                    for(let i in this.list2){
                      money+=Number(this.list2[i].money)
                      money2+=Number(this.list2[i].discount)
                    }
                    this.productMoney = money
                    this.productact = money2

                    // this.initData(false)
                  }
                }
              })
            }
        })
      },
      listView(index,item){
        item.formTypeList = this.formTypeList
        sessionStorage.lossAssessmentDetailsData = JSON.stringify(item)
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/lossAssessmentDetailsForm?ownerID='+this.id +'&id=' + item.id+'&flowPathID=' + this.flowPathID+'&lookOverShow=true',
          title:'编辑定损单详情',
          closeCallBack:(data) =>{
            if (data) {
              let list = this.list[index]
              list.id = data.params.id
              list.ownerID = this.fixID
              list.processid = data.params.processid
              list.productid = data.params.productid
              list.insertDate = data.params.insertDate
              list.nameStr = data.params.nameStr
              list.category = data.params.category
              list.quantity = data.params.quantity
              list.price = data.params.price
              list.money = data.params.money
              let money = 0
              let num = 0
              for(let i in this.list){
                money = Number(this.list[i].quantity)*Number(this.list[i].price)
                num+=money
              }
              this.money = num
              // this.initData()

            }
          }
        })
      },
      addDetail(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/lossAssessmentDetailsForm?ownerID='+this.id+'&flowPathID=' + this.flowPathID+'&lookOverShow=false',
          title:'添加定损单详情',
          closeCallBack:(data) =>{
            if (data) {
              this.list.push({
                id:data.params.id,
                ownerID:this.fixID,
                processid:this.processid,
                productid:data.params.productid,
                insertDate:data.params.insertDate,
                nameStr:data.params.nameStr,
                category:data.params.category,
                quantity:data.params.quantity,
                price:data.params.price,
                money:data.params.money,
              })
              let money = 0
              let num = 0
              for(let i in this.list){
                money = Number(this.list[i].quantity)*Number(this.list[i].price)
                num+=money
              }
              this.money = num
              // this.initData(false)
            }
          }
        })
      },
      acquireCode(){
        let params ={
          subid:this.subid,
          code:this.subCode,
          category:this.category,
          applicableModels:this.content.applicableModels
        }
        if(this.state!='5'){
          this.ajaxJson({
            url: '/fix/fixOrder/initWorkOrder',
            data: params,
            call: (data) => {
              if(data.type==0){
                this.code = data.message
              }
            }
          })
        }
      },
      accessNumber(){
        // let params ={
        //   subid:this.subid,
        //   code:this.subCode,
        //   category:this.category,
        //   applicableModels:this.content.applicableModels
        // }
        // if(this.state!='5'){
        //   this.ajaxJson({
        //     url: '/fix/fixOrder/initWorkOrder',
        //     loading:'0',
        //     data: params,
        //     call: (data) => {
        //       if(data.type==0){
        //         this.code = data.message
        //       }
        //     }
        //   })
        // }
      },
      subCall(){
        if(this.sub==''){
          return
        }
        this.subid = this.subList[this.sub].id
        this.subCode = this.subList[this.sub].code
        this.subName = this.subList[this.sub].showName
        if(this.state!='5'){
          this.accessNumber()
        }
      },
      callCategory(category){//定损单类型
        if(category=='1'||category=='2'||category=='3'){
          this.subShow = false
          if(this.sub!=''){
            this.insurance = this.sub.concat()
          }
          this.sub = ''//保险公司
          this.subName = ''//保险公司名称
          this.subid = ''//保险公司ID
          this.subCode = ''//保险公司编号
        }else if(category=='0'){
          this.subShow = true
          this.sub = this.insurance.concat()
          if(this.sub!=''){
            this.subid = this.subList[this.sub].id//保险公司id
            this.subCode = this.subList[this.sub].code//保险公司缩写
            this.subName = this.subList[this.sub].showName//保险公司名称
          }
        }
        this.accessNumber()
        // if(this.category == '2'){
        //   this.noInvoice = true
        // }else{
        //   this.noInvoice = false
        // }
      },
      save(closeShow){
        this.$refs.collectionRadio.$emit('verify')//维修类型
        this.$refs.collectionRadio1.$emit('verify')//保险公司
        this.$refs.collectionRadio2.$emit('verify')//工单类型
        this.$refs.collectionRadio3.$emit('verify')//派工类型


        let a = this.validator()
        // let b = this.verify()
        if(this.list2.length=='0'){
          this.$dialog.alert({
            tipValue:'至少需要添加一条工单详情',
            alertImg:'warn',
            width:'350'
          })
          return
        }
        if(a){
          if(this.category == ''||this.worktype == ''||this.method==''){
            $('html,body').animate({'scrollTop':0},1000)
            return
          }
          let fixOrderMaterial = []
          for(let n in this.fixOrderMaterial){
            if(this.fixOrderMaterial[n].commit=='0'){
              fixOrderMaterial.push(this.fixOrderMaterial[n])
            }
          }
          let params = {}
          this.expend =Number(this.amount) +Number(this.productMoney)
          if(this.state=='5'){
            for(let i in this.fileList){
              this.fileList[i].ownerID = this.fixID
            }
            params = {
              id:this.ownerID,
              milage:this.milage,//里程数
              isInit:'1',//特殊字段 改变搜索字段 新增和编辑才需要传
              mailMoney:this.amount,//配件金额
              worktype:this.worktype,//工单类型 0维修 1保养
              isDelMater:this.isDelMater,//维修配件表需要全部删除时传值
              sub:this.sub,//保险公司
              subid:this.subid,//保险公司ID
              applicableModels:this.content.applicableModels,//适用车型
              proState:'0',//是否创建主流程表的字段
              principal:'',//负责人
              principalID:'',//负责人ID
              client:this.content.personName,//客服已改为接待人
              clientID:this.content.personID,//客服ID 客服已改为接待人
              method:this.method,//派工类型
              vehicle:this.content.carName,//车牌号
              carOwner:this.content.carOwner,//车主姓名 新加
              carOwnerID:this.content.carOwnerID,//车主ID
              contactPerson:this.content.contactPerson,//联系人姓名
              contactPersonID:this.content.contactPersonID,//联系人ID
              contactPersonPhone:this.content.contactPersonPhone,//联系人手机号
              vehicleID:this.content.carid,//车辆ID
              orderSource:this.content.worksource,//工单来源
              source:this.content.business,//业务来源
              code:this.code,//编号
              otherCode:this.content.otherNode,//其它系统编号

              expend:this.expend,//实际支出 已变为 合计金额
              incomePlan:this.money,//计划收入
              productMoney:this.productMoney,//项目金额 = 实际支出(当前)

              mailact:this.mailact,//配件实际金额
              maildis:(Number(this.amount)-Number(this.mailact)),//配件优惠金额
              mailshen:this.mailact,//配件申请优惠金额
              productact:this.productact,//项目实际金额
              productdis:(Number(this.productMoney)-Number(this.productact)),//项目优惠金额
              productshen:this.productact,//工项申请优惠金额

              workDate:this.workDate,//发生日期
              endDate:this.endDate,//预计交车时间
              category:this.category,//维修类型
              remark:this.remark,//备注
              state:this.workOrderState,//状态
              receptionid:this.id,//接待单id
              discountstate:'1',//优惠金额申请状态 ：0，优惠金额申请初始状态，1优惠金额申请完成状态
              maildiscountstate:'1', //配件优惠金额申请状态
              // discountmoney:this.discountmoney,//折扣优惠金额（合计金额-客户实际付款金额）
              actualmoney:Number(this.productact)+Number(this.mailact),//客户实际付款金额
              fix:{//定损单
                category:this.category,//维修类型
                id:this.fixID,
                list:this.list,//定损单详情
                money:this.money,//定损金额
                ownerID:this.ownerID,//工单id
                param:{
                  id:this.fixID,//定损单主表id
                  list:this.fileList,//文件
                },
                workDate:this.workDate,//发生日期
              },
              fixOrderDetail:{//工单详情总表
                id:this.fixOrder,//工单主表id
                applicableModels:this.content.applicableModels,//车型
                category: "1",//默认零部件
                ownerID:this.ownerID,//工单id
                saveList:this.list2//工单详情
              },
              fixOrderMaterial:{//材料表详情
                id:this.stockListID,//材料总表
                ownerID:this.ownerID,//工单id
                category:'1',//零部件
                applicableModels:this.content.applicableModels,//车型
              },
              summary:{
                id:guid(),
                cost:'0',//成本
                profit:'0',//盈利
                revenue:this.money,//总收入 定损单金额总和
                orderid:this.ownerID,//工单id
                principal:this.content.contactPersonID,//联系人id
                vehicle:this.content.carName,//车牌号
                workDate:this.workDate,//交车日期
                price:this.productMoney,//项目金额
                amount:this.amount,//配件金额
                totalMoney:this.expend,//合计金额
              },
              fixMaterialFormParamList:fixOrderMaterial//材料表数据

            }
          }else{
            params = {
              id:this.ownerID,
              milage:this.milage,//里程数
              mailMoney:this.amount,//配件金额
              isInit:'1',//特殊字段 改变搜索字段 新增和编辑才需要传
              isDelMater:this.isDelMater,//维修配件表需要全部删除时传值
              worktype:this.worktype,//工单类型 0维修 1保养
              sub:this.sub,//保险公司
              subid:this.subid,//保险公司ID
              applicableModels:this.content.applicableModels,//适用车型
              proState:'0',//是否创建主流程表的字段
              principal:'',//负责人
              principalID:'',//负责人ID
              method:this.method,//派工类型
              client:this.content.personName,//客服已改为接待人
              clientID:this.content.personID,//客服ID 客服已改为接待人
              vehicle:this.content.carName,//车牌号
              carOwner:this.content.carOwner,//车主姓名 新加
              carOwnerID:this.content.carOwnerID,//车主ID
              contactPerson:this.content.contactPerson,//联系人姓名
              contactPersonID:this.content.contactPersonID,//联系人ID
              contactPersonPhone:this.content.contactPersonPhone,//联系人手机号
              vehicleID:this.content.carid,//车辆ID
              orderSource:this.content.worksource,//工单来源
              source:this.content.business,//业务来源
              code:this.code,//编号
              otherCode:this.content.otherNode,//其它系统编号

              expend:this.expend,//实际支出 已变为 合计金额
              incomePlan:this.money,//计划收入
              productMoney:this.productMoney,//项目金额 = 实际支出(当前)

              mailact:this.mailact,//配件实际金额
              maildis:(Number(this.amount)-Number(this.mailact)),//配件优惠金额
              mailshen:this.mailact,//配件申请优惠金额
              productact:this.productact,//项目实际金额
              productdis:(Number(this.productMoney)-Number(this.productact)),//项目优惠金额
              productshen:this.productact,//工项申请优惠金额

              workDate:this.workDate,//发生日期
              endDate:this.endDate,//预计交车时间
              category:this.category,//维修类型
              remark:this.remark,//备注
              state:this.workOrderState,//状态
              receptionid:this.id,//接待单id
              discountstate:'1',//优惠金额申请状态 ：0，优惠金额申请初始状态，1优惠金额申请完成状态
              maildiscountstate:'1', //配件优惠金额申请状态
              // discountmoney:this.discountmoney,//折扣优惠金额（合计金额-客户实际付款金额）
              actualmoney:Number(this.productact)+Number(this.mailact),//客户实际付款金额
              fix:{//定损单
                category:this.category,//维修类型
                id:this.fixID,
                list:this.list,//定损单详情
                money:this.money,//定损金额
                ownerID:this.ownerID,//工单id
                param:{
                  id:this.fixID,//定损单主表id
                  list:this.fileList,//文件
                },
                workDate:this.workDate,//发生日期
              },
              fixProcess:{//流程主表
                ownerID:this.ownerID,//工单id
                id:this.processid,
                nameStr:'定损单',
                state:0,
                stage:0,
              },
              processDetailList:this.processDetailList,
              fixOrderDetail:{//工单详情总表
                id:this.fixOrder,//工单主表id
                applicableModels:this.content.applicableModels,//车型
                category: "1",//默认零部件
                ownerID:this.ownerID,//工单id
                saveList:this.list2//工单详情
              },
              fixOrderMaterial:{//材料表详情
                id:this.stockListID,//材料总表
                ownerID:this.ownerID,//工单id
                category:'1',//零部件
                applicableModels:this.content.applicableModels,//车型
              },
              summary:{//收支明细列表数据
                id:this.summaryid,
                cost:'0',//成本
                profit:'0',//盈利
                revenue:this.money,//总收入 定损单金额总和
                orderid:this.ownerID,//工单id
                principal:this.content.contactPersonID,//联系人id
                vehicle:this.content.carName,//车牌号
                workDate:this.workDate,//交车日期
                price:this.productMoney,//项目金额
                amount:this.amount,//配件金额
                totalMoney:this.expend,//合计金额
              },
              fixOrderInit:{//生成工单号
                id:guid(),
                subid:this.subid,
                code:this.subCode,
                category:this.category,//维修类型
                applicableModels:this.content.applicableModels,
                unitType:this.unitType//客户类型 0个人
              },
              fixMaterialFormParamList:fixOrderMaterial//材料表数据
            }
          }
          this.ajaxJson({
            url: '/fix/fixOrder/saveByReception',
            data:params,
            call: (data)=>{
              if (data.type === 0) {
                if(!closeShow){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.state = '5'
                      this.initData()
                      // this.$dialog.close()
                    }
                  })
                }else{
                  this.pushWorkshopAjax()//推送到车间
                }
              } else {
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
          // this.ajaxJson({
          //   url: '/fix/fixOrder/save',
          //   data: {
          //     id:this.ownerID,
          //     sub:this.sub,//保险公司
          //     subid:this.subid,//保险公司ID
          //     applicableModels:this.content.applicableModels,//适用车型
          //     proState:'0',//是否创建主流程表的字段
          //     principal:'',//负责人
          //     principalID:'',//负责人ID
          //     client:this.personName,//客服已改为接待人
          //     clientID:this.personID,//客服ID 客服已改为接待人
          //     vehicle:this.content.carName,//车牌号
          //     carOwner:this.content.carOwner,//车主姓名 新加
          //     carOwnerID:this.content.carOwnerID,//车主ID
          //     contactPerson:this.content.contactPerson,//联系人姓名  新加
          //     contactPersonID:this.content.contactPersonID,//联系人ID
          //     vehicleID:this.content.carid,//车辆ID
          //     worksource:this.content.worksource,//工单来源
          //     source:this.content.business,//业务来源
          //     code:this.code,//编号
          //     otherCode:this.content.otherNode,//其它系统编号
          //     workDate:this.workDate,//发生日期
          //     endDate:this.endDate,//预计交车时间
          //     category:this.category,//维修类型
          //     remark:this.remark,//备注
          //     state:'0',//状态
          //     receptionid:this.id,//接待单id
          //   },
          //   call: (data)=>{
          //     if(data.type=='0'){
          //       this.ajaxJson({
          //         url: '/fix/fixProcess/save',
          //         data: {
          //           ownerID:this.ownerID,
          //           id:this.fixID,
          //           nameStr:'定损单',
          //           state:1,
          //           stage:0,
          //         },
          //         call: (data) => {
          //           if(data.type=='0'){
          //             this.ajaxJson({
          //               url: '/fix/fixed/save',
          //               data:{
          //                 category:this.category,//维修类型
          //                 id:this.fixID,
          //                 list:this.list,//定损单详情
          //                 money:this.money,//定损金额
          //                 ownerID:this.ownerID,//工单id
          //                 param:{
          //                   id:this.fixID,//定损单主表id
          //                   list:this.fileList,//文件
          //                 },
          //                 workDate:this.workDate,//发生日期
          //               },
          //               call: (data)=>{
          //                 if (data.type === 0) {
          //                   this.$dialog.alert({
          //                     tipValue: data.message,
          //                     closeCallBack: () => {
          //
          //                     }
          //                   })
          //                 } else {
          //                   this.$dialog.alert({
          //                     alertImg: 'error',
          //                     tipValue: data.message,
          //                     closeCallBack: () => {
          //                     }
          //                   })
          //                 }
          //               }
          //             })
          //           }
          //         }
          //       })
          //     }
          //   }
          // })
        }
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url: '/fix/fixreception/initForm',
          data: params,
          call: (data) => {
            if (data) {
              this.worktype = data.fixorder.worktype
              this.directionList = data.directionPsd.list
              this.detailsStateList = data.statePsd.list
              this.method = data.method//派工方式
              this.methodList = data.methodPsd.list//派工方式
              this.sourceList = data.workSourcePsd.list//业务来源
              this.categoryList = data.categoryPsd.list//维修类型
              this.subList = data.mapList
              this.formTypeList = data.formTypePsd.list//定损单详情的类型
              this.actualmoney = data.fixorder.actualmoney
              this.discountmoney = data.fixorder.discountmoney

              // console.log(data.fixorder.mailact,data.fixorder.maildis)


              this.$nextTick(()=>{
                // console.log(this.$refs.actualmoneyFocus.value,this.$refs.mailactFocus.value)
                setTimeout(()=>{
                  this.mailact = data.fixorder.mailact//配件实际金额
                },0)
                // alert(this.mailact)
                this.maildis = data.fixorder.maildis//配件优惠金额
                // alert(this.maildis)
                this.productact = data.fixorder.productact//项目实际金额
                // alert(this.productact)
                this.productdis = data.fixorder.productdis//项目优惠金额
                // alert(this.productdis)
                this.actualmoneyInput()
                this.mailactInput()
              })

              this.content = data

              if(data.fixorder.expend!=''){
                this.expend = data.fixorder.expend//合计金额
              }

              this.milage = data.fixorder.milage//里程数

              if(data.fixorder.fixOrderMater.id!=null&&data.fixorder.fixOrderMater.id!=''){
                this.stockListID = data.fixorder.fixOrderMater.id
              }

              this.fixOrderMaterial = data.fixorder.fixMaterialManagerReturnList

              this.fixOrderMaterialLength = data.fixorder.fixMaterialManagerReturnList.length

              this.partsList = data.fixorder.fixMaterialManagerReturnList.concat()
              for(let m in this.partsList){
                if(this.partsList[m].commit!=''){
                  this.pushWorkshopList.push(this.partsList[m].commit)//推送按钮是否可以显示
                }
              }
              // for(let a in this.fixOrderMaterial){
              //   this.fixOrderMaterial[a].index = index--
              // }
              // this.partsMoney = []//清空维修配件的金额数组
              // let money = 0
              let index = this.fixOrderMaterial.length
              for(let o in this.fixOrderMaterial){
                this.fixOrderMaterial[o].index = index--
                this.fixOrderMaterial[o].noEdit = this.fixOrderMaterial[o].splitVal=='1'?'1':''//散件拆分单位是否可以编辑
                this.fixOrderMaterial[o].stateVal = this.fixOrderMaterial[o].commit=='0'?'未提交':'已提交至车间'
                // this.partsMoney.push((Number(this.fixOrderMaterial[o].price) * Number(this.fixOrderMaterial[o].quantity)).toFixed(2))
              }
              // this.fixOrderMaterial.reverse()

              // for(let p in this.partsMoney){
              //   money += Number(this.partsMoney[p])
              // }
              //
              // this.amount = money.toFixed(2)
              this.amountOfAccessories()

              for(let i in this.subList){
                this.subList[i].num = i
              }
              this.subCall()
              if(data.fixorder.summary==null||data.fixorder.summary.id==null||data.fixorder.summary.id==''){
                this.summaryid = guid()//工单id
              }else{
                this.summaryid = data.fixorder.summary.id//工单id
              }

              if(this.state=='5'){

                this.ownerID = data.fixorder.id
                this.workDate = data.fixorder.workDate//发生日期
                this.endDate = data.fixorder.endDate//结束日期
                this.code = data.fixorder.code//编号
                this.remark = data.fixorder.remark//备注
                this.fileList = data.fixorder.fixedForm.photoList//文件
                this.fixID = data.fixorder.fixedForm.id//定损单主表id
                this.fixOrder = data.fixorder.fixOrderDetail.id
                this.productMoney = data.fixorder.productMoney//工单详情总金额
                this.money = data.fixorder.incomePlan//定损单总金额

                this.list = data.fixorder.fixedForm.list//定损单
                this.list2 = data.fixorder.fixOrderDetail.list//工单详情
                let money = 0
                let money2 = 0
                for(let i in this.list2){
                  money+=Number(this.list2[i].money)
                  money2+=Number(this.list2[i].discount)
                }
                this.productMoney = money
                this.productact = money2
                this.category = data.fixorder.fixedForm.category//维修类型
                if(this.category=='1'||this.category=='2'){
                  this.sub = ''
                  this.subid = ''
                }
                if(this.category=='0'){
                  this.subShow = true
                  this.sub = data.fixorder.sub//保险公司
                  this.subid = data.fixorder.subid//保险公司ID
                  // this.subCall()
                }else{
                  this.subShow = false
                }
              }else{
                // this.personName = sessionStorage.getItem('____currentUser')
                // this.personID = sessionStorage.getItem('____currentUserID')
              }
            }
            for(let i in this.subList){
              if(this.subList[i].id == this.subid){
                this.sub = i
              }
            }
            if(this.worktype=='1'){//工单类型为保养时
              this.processDetailList = []
            }else{
              this.processDetailList = [
                {
                  'nameStr':'钣金拆装或修复',
                  'id':guid(),
                  'ownerID':this.processid,
                  'dependid':'',
                  'stage':'2',
                  'state':'0',
                  'type':'0',
                  'orderStr':''
                }
              ]
            }
            if(data.ordertype!=''&&data.ordernum!=''&&data.ordernumid!=''){
              this.category = data.fixorder.fixedForm.category//维修类型
              // this.sub = data.fixorder.sub//保险公司
              for(let i in this.subList){
                if(this.subList[i].id == data.fixorder.sub){
                  this.sub = i
                }
              }
            }

            this.unitType = data.unitType
            this.createName = data.fixorder.createName
            this.insertDate = data.fixorder.insertDate
            this.updateName = data.fixorder.updateName
            this.updateDate = data.fixorder.updateDate
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('state')
      this.setQuery2Value('showType')
      this.setQuery2Value('workOrderStatus')
      if(this.showType == '1'){
        this.setQuery2Value('workOrderState')
      }else{
        this.workOrderState = '5'
      }
      this.worktypes = this.worktype.concat()
      this.initData()
    }
  }
</script>

<style scoped>
  .aggregateMoney{
    width: 100%;
    border-top: 0.5px solid #ccc;
    background-color: #fff;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .select{
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../../../static/css/images/workOrderImg/jinxuan.png");
    background-repeat:no-repeat;
    background-position:center;
  }
</style>
