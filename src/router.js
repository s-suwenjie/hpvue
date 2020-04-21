import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import desktop from './components/desktop'
import login from './pages/login'

Vue.use(Router)

/* 设置支票预警值 */
import prewarningValueManager from './pages/prewarning/prewarningValueManager'

/*备用金功能*/
import prettyCashsManager from './pages/prettyCashs/prettyCashsManager.vue'
import prettyCashsForm from './pages/prettyCashs/prettyCashsForm.vue'
import prettyCashsView from './pages/prettyCashs/prettyCashsView.vue'
import approvalPrettyCashs from './pages/prettyCashs/approvalPrettyCashs.vue'
import approvalPrettyCashsView from './pages/prettyCashs/approvalPrettyCashsView.vue'
import finPrettyCashsManagerAll from './pages/prettyCashs/finPrettyCashsManagerAll.vue'
import finPrettyCashsView from './pages/prettyCashs/finPrettyCashsView.vue'
import selectPrettyCashs from './pages/selects/selectPrettyCashs.vue'

import fullRefundForm from './pages/prettyCashs/fullRefundForm.vue'


/* 处理图片 */
import handleImageForm from './pages/common/handleImageForm.vue'

/* 驳回理由 */
import rejectReason from './pages/common/rejectReason'

/* 跳转非谷歌页面 */
import onlyGoogle from './pages/common/onlyGoogle'

/* 界面帮助视频播放 */
import videoPlay from './pages/common/videoPlay'

/* 分批拨付 */
import batchAllocationForm from './pages/common/batchAllocationForm'

/* 付款计划 */
import paymentPlanManager from './pages/paymentPlan/myPaymentPlanManager'
import PaymentPlanForm from './pages/paymentPlan/myPaymentPlanForm'
import PaymentPlanDetailForm from './pages/paymentPlan/myPaymentPlanDetailForm'

import PaymentPlanFormView from './pages/paymentPlan/myPaymentPlanFormView'
import PaymentPlanDetailFormView from './pages/paymentPlan/myPaymentPlanDetailFormView'

import approvalPayPlanManager from './pages/paymentPlan/approvalPayPlanManager'
import approvalPayForm from './pages/paymentPlan/approvalPayPlanForm'
import approvalPlanDetailForm from './pages/paymentPlan/approvalPayPlanDetailForm'

import paymentPlanViewManager from './pages/paymentPlan/finPaymentPlanManager'
import paymentPlanViewForm from './pages/paymentPlan/finPaymentPlanForm'
import paymentPlanViewDetailForm from './pages/paymentPlan/finPaymentPlanDetailForm'

import paymentPlanDate from './pages/paymentPlan/myPaymentPlanDate'


/* 支票功能 */
import checkManager from './pages/check/checkManager'
import checkForm from './pages/check/checkForm'
import addCheckNumForm from './pages/check/addCheckNumForm'
import checkExpendView from './pages/check/checkExpendView'
import checkExpendManager from './pages/check/checkExpendManager'
import checkTilingManager from './pages/check/checkTilingManager'
import selectChecksDetail from './pages/selects/selectChecksDetail'
import showCheckWarnView from './pages/check/showCheckWarnView'

/* 支票支出->操作 支票填开  - 空白支票外带 - 作废 - 入账 - 查看票样*/
import checkFillOut from './pages/check/checkOpera/checkFillOut'
import blackCheckOut from './pages/check/checkOpera/blackCheckOut'
import toVoidCheck from './pages/check/checkOpera/toVoidCheck'
import accEntry from './pages/check/checkOpera/accEntry'
import viewCheck from './pages/check/checkOpera/viewCheck'

/* 应收账款模块 */
import myReceivableManager from './pages/receivable/myReceivableManager'
import myReceivableForm from './pages/receivable/myReceivableForm'
import myReceivableView from './pages/receivable/myReceivableView'
import myReceivableRegisterForm from './pages/receivable/myReceivableRegisterForm'
import finReceivableManager from './pages/receivable/finReceivableManager'
import finReceivableView from './pages/receivable/finReceivableView'

/* 发票功能 */
import invoiceTilingManager from './pages/invoice/invoiceTilingManager'
import invoiceListManager from './pages/invoice/invoiceListManager'
import invoiceWarehouManager from './pages/invoice/invoiceWarehouManager'
import addInvoiceNumForm from './pages/invoice/addInvoiceNumForm'
import invoiceWarehouFrom from './pages/invoice/invoiceWarehouFrom'
import selectInvoiceDetail from './pages/selects/selectInvoiceDetail'
import toVoidInvoice from './pages/invoice/invoiceOpera/toVoidInvoice'
import toVoidInvoiceMore from './pages/invoice/invoiceOpera/toVoidInvoiceMore'
import invoiceView from './pages/invoice/invoiceView'

/*开发票*/
import openInvoiceManager from './pages/openInvoice/openInvoiceManager'
import openInvoiceForm from './pages/openInvoice/openInvoiceForm'
import openInvoiceView from './pages/openInvoice/openInvoiceView'

/* 付款申请 */
import paymentApplyManager from './pages/paymentApply/myPaymentApplyManager'
import paymentApplyForm from './pages/paymentApply/myPaymentApplyForm'
import paymentInvoice from './pages/paymentApply/myPaymentInvoice'
import paymentWindowManager from './pages/paymentApply/myPaymentWindowManager'

import paymentApplyFormView from './pages/paymentApply/myPaymentApplyView'

import approvalPayManager from './pages/paymentApply/approvalApplyManager'
import approvalApplyView from './pages/paymentApply/approvalApplyForm'

import paymentApplyViewManager from './pages/paymentApply/finPaymentApplyManager'
import paymentApplyViewForm from './pages/paymentApply/finPaymentApplyForm'

import payApplyReconDetailForm from './pages/paymentApply/payApplyReconDetailForm'

import approvalBatchAllca from './pages/paymentApply/approvalBatchAllca'

/* 付款申请打印 */
import approvalApplyPrint from './pages/paymentApply/approvalApplyPrint'


/* 报销 */
import reimbursementManager from './pages/reimbursement/myReimbursementManager'
import reimbursementForm from './pages/reimbursement/myReimbursementForm'
import reimbursementDetailForm from './pages/reimbursement/myReimbursementDetailForm'

import approvalReimbursementManager from './pages/reimbursement/approvalReimbursementManager'
import approvalReimbursementForm from './pages/reimbursement/approvalReimbursementForm.vue'
import approvalReimbursementDetailForm from './pages/reimbursement/approvalReimbursementDetailForm.vue'
import approvalReimbursementFund from './pages/reimbursement/approvalReimbursementFund.vue'
import approvalReimbursementPrint from './pages/reimbursement/approvalReimbursementPrint.vue'
import approvalReimbursementPrintBYJ from './pages/reimbursement/approvalReimbursementPrintBYJ.vue'
import approvalReimbursementSingleSplitForm from './pages/reimbursement/approvalReimbursementSingleSplitForm'

import reimbursementViewManager from './pages/reimbursement/finReimbursementViewManager'
import reimbursementViewForm from './pages/reimbursement/finReimbursementViewForm'
import reimbursementViewDetailForm from './pages/reimbursement/finReimbursementViewDetailForm'
import reimbursementFormView from './pages/reimbursement/myReimbursementFormView'
import reimbursementDetailFormView from './pages/reimbursement/myReimbursementDetailFormView'

import reimbursementReconDetailForm from './pages/reimbursement/reimbursementReconDetailForm'


/* 打印报销单 */
import approvalPrintReimbursementTicket from './pages/reimbursement/approvalPrintReimbursementList/approvalPrintReimbursementTicket'

/* 补签字 */
import signatureManager from './pages/signaturePage/signatureManager'

/* 素材管理 */
import psdManager from './pages/psd/psdManager'
import psdForm from './pages/psd/psdForm'

/* 菜单管理 */
import appManager from './pages/app/appManager'
import appTopForm from './pages/app/appTopForm'
import appLeftForm from './pages/app/appLeftForm'
import appForm from './pages/app/appForm'

/* 我的电子发票*/
import myElectronicInvoiceManager from './pages/electronicInvoice/myElectronicInvoiceManager'
import myElectronicInvoiceForm from './pages/electronicInvoice/myElectronicInvoiceForm'

import myElectronicInvoiceReimburseManager from './pages/electronicInvoice/myElectronicInvoiceReimburseManager'
import electronicInvoiceManager from './pages/electronicInvoice/electronicInvoiceManager'
import electronicInvoiceForm from './pages/electronicInvoice/electronicInvoiceForm'
import electronicInvoiceView from './pages/electronicInvoice/electronicInvoiceView'
import selectElectronicInvoice from './pages/selects/selectElectronicInvoice'
import selectUsersWxInfo from './pages/selects/selectUsersWxInfo'

/*用户管理*/
import usersManager from './pages/users/usersManager'
import usersForm from './pages/users/usersForm'
import usersUpdatePwdManager from './pages/users/usersUpdatePwdManager'

/* 选择页面 */
import selectDic from './pages/selects/selectDic'
import dicForm089 from './pages/selects/dic/dicForm089'
import dicForm090 from './pages/selects/dic/dicForm090'
import dicForm091 from './pages/selects/dic/dicForm091'
import selectPublicAccount from './pages/selects/selectPublicAccount'
import selectPrivateAccount from './pages/selects/selectPrivateAccount'
import selectUnit from './pages/selects/selectUnit'
import selectPaymentApplyDetail from './pages/selects/selectPaymentApplyDetail'
import selectBankDetail from './pages/selects/selectBankDetail'
import selectPlate from './pages/selects/selectPlate'
import selectPerson from './pages/selects/selectPerson'
import selectPlanDate from './pages/selects/selectPlanDate'
import selectDepartment from './pages/selects/selectDepartment'
import selectVersion from './pages/selects/selectVersion'
import selectProduct from './pages/product/product/selectProduct'
import selectModel from './pages/selects/selectModel'
import selectProductModel from './pages/product/model/selectProductModel'
import selectFormPlate from './pages/insurance/billing/selectFormPlate'
import selectPrint from './pages/selects/selectPrint'


/* 单位 - 联系人 */
import unitManager from './pages/unit/unitManager'
import addUnitForm from './pages/unit/addUnitForm'
import unitView from './pages/unit/unitView'
import unitDetailView from './pages/unit/unitDetailView'
import addUnitSimplifyForm from './pages/unit/addUnitSimplifyForm'
import unitBankDetailForm from './pages/unit/unitBankDetailForm'

import personManager from './pages/person/personManager'
import addPersonForm from './pages/person/addPersonForm'
import addPersonSimplifyForm from './pages/person/addPersonSimplifyForm'
import personView from './pages/person/personView.vue'

/* 来访人员 */
import visitPersonManager from './pages/visitPerson/visitPersonManager'
import visitPersonForm from './pages/visitPerson/visitPersonForm'

/* 测试demo */
import demo from './pages/selects/demo'
import selectPage from './test/selectPage'
import testApp from './pagesApp/testApp.vue'


/* 采购 */
import myPurchaseManager from './pages/purchase/myPurchaseManager'
import myPurchaseForm from './pages/purchase/myPurchaseForm'
import myPurchaseView from './pages/purchase/myPurchaseView'

import approvalPurchaseManager from './pages/purchase/approvalPurchaseManager'
import approvalPurchaseView from './pages/purchase/approvalPurchaseView'

import awaitPurchaseManager from './pages/purchase/awaitPurchaseManager'
import awaitPurchaseView from './pages/purchase/awaitPurchaseView'
import purchasePersonManager from './pages/purchase/purchasePersonManager'
import purchasePersonForm from './pages/purchase/purchasePersonForm'

/* 流程管理 */
import flowsManager from './pages/flows/flowsManager'
import flowsForm from './pages/flows/flowsForm'
import flowDetailForm from './pages/flows/flowDetailForm'

/*添加收支明细*/
import bankDetailForm from './pages/bankDetail/bankDetailForm'
import bankDetailCashierForm from './pages/bankDetailCashier/bankDetailCashierForm'
import bankDetailCashierManager from './pages/bankDetailCashier/bankDetailCashierManager'


/* 审批流程定制 */
import approvalPersonaliseManager from './pages/approvalPriority/approvalPersonaliseManager'
import approvalPersonaliseForm from './pages/approvalPriority/approvalPersonaliseForm'

/* 公司优先级 */
import approvalPriorityManager from './pages/approvalPriority/approvalPriorityManager'
import approvalPriorityForm from './pages/approvalPriority/approvalPriorityForm'

/* 定制审批 */
import approPriationManager from './pages/approvalPriority/approPriationManager.vue'
import unionCostsManager from './pages/approvalPriority/unionCostsManager.vue'
import approPriationForm from './pages/approvalPriority/approPriationForm.vue'
import unionCostsForm from './pages/approvalPriority/unionCostsForm.vue'

/* 冲账人 */
import reversalAccountManager from './pages/approvalPriority/reversalAccountManager'
import reversalAccountForm from './pages/approvalPriority/reversalAccountForm'

/* 董事费人员 */
import boardFeEsManager from './pages/approvalPriority/boardFeesManager'
import boardFeesForm from './pages/approvalPriority/boardFeesForm'

/* 冲账信息列表显示 */
import rversalManager from './pages/rversal/rversalManager.vue'
import rversalForm from './pages/rversal/rversalForm.vue'

/*部门*/
import departmentManager from './pages/department/departmentManager'
import departmentForm from './pages/department/departmentForm'
import departmentPersonForm from './pages/department/departmentPersonForm'

/* 理财产品 */
import conductFinManager from './pages/conductFin/conductFinManager'
import conductFinForm from './pages/conductFin/conductFinForm'
import conductFinView from './pages/conductFin/conductFinView'
import conductFinRedeemForm from './pages/conductFin/conductFinRedeemForm'


/*移动端绑定账号 - 正确 - 错误 - 已确定登陆 - 取消登录 - 扫码登录页面*/
import bindingManager from './appPages/appLogin/bindingManager'
import correct from './appPages/promptmessage/correct'
import failure from './appPages/promptmessage/failure'
import loginScSuccess from './appPages/appLogin/landing/loginScSuccess'
import loginScCancel from './appPages/appLogin/landing/loginScCancel'
import loginSc from './appPages/appLogin/loginSc.vue'


/* 移动端我的操作 菜单 采购审批列表*/
import menu from './appPages/menu/menu.vue'
import purchasingApproval from './appPages/menu/purchasingApproval.vue'

/* 移动端采购计划 */
import approvalPaymentBuy from './appPages/paymentBuy/approvalPaymentBuy.vue'

/* 移动端报销 */
import approvalReimbursement from './appPages/reimbursement/approvalReimbursement.vue'

/*对公 - 对私账号*/
import publicAccountManager from './pages/accNum/publicAccount/publicAccountManager'
import publicAccountForm from './pages/accNum/publicAccount/publicAccountForm'
import publicAccountView from './pages/accNum/publicAccount/publicAccountView'

import privateAccountManager from './pages/accNum/privateAccount/privateAccountManager'
import privateAccountForm from './pages/accNum/privateAccount/privateAccountForm'
import privateAccountView from './pages/accNum/privateAccount/privateAccountView'

/*保险*/

/*保险理赔*/
import claimsManager from './pages/insurance/claims/claimsManager'
import claimsForm from './pages/insurance/claims/claimsForm'
import claimsView from './pages/insurance/claims/claimsView'

/*办理人员*/
import handlePersonManager from './pages/basic/insurancePolicy/information/handlePerson/handlePersonManager'
import handlePersonForm from './pages/basic/insurancePolicy/information/handlePerson/handlePersonForm'

/*保单信息*/
import policyInformationManager from './pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationManager'
import policyInformationForm from './pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationForm'

/*保险公司*/
import insuranceCompanyManager from './pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyManager'
import insuranceCompanyForm from './pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyForm'

/* 管理保险公司 */
import insuranceUnitManager from './pages/insurance/unit/insuranceUnitManager'
import insuranceUnitForm from './pages/insurance/unit/insuranceUnitForm'

/*财务信息*/
import financialInformationManager from './pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationManager'
import financialInformationForm from './pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationForm'

/*客户管理*/
import clientManager from './pages/insurance/client/clientManager'
import clientForm from './pages/insurance/client/clientForm'
import clientView from './pages/insurance/client/clientView'

/* 增加开户行Form - 增加银行Form */
import openBankForm from './pages/bankAcc/openBankForm'
import openBankDetailForm from './pages/bankAcc/openBankDetailForm'

/*商品相关*/
import productManager from './pages/product/product/productManager'
import productForm from './pages/product/product/productForm'
import modelForm from './pages/product/model/modelForm'

/* 库存管理 */
import warehouseEntryManager from './pages/Inventory/warehouseEntryManager'
import warehouseEntryForm from './pages/Inventory/warehouseEntryForm'
import warehouseEntryView from './pages/Inventory/warehouseEntryView'

import inStockManager from './pages/Inventory/inStockManager'

import warehouseExitManager from './pages/Inventory/warehouseExitManager'
import warehouseExitForm from './pages/Inventory/warehouseExitForm'
import warehouseExitView from './pages/Inventory/warehouseExitView'

/* 手机页面 */
import homeApp from './views/homeApp.vue'

/* 菜单管理 */
import m_myApprovalManager from './pagesApp/myApproval/myApprovalManager.vue'

/* 采购计划 */
import m_approvalPurchaseManager from './pagesApp/purchase/approvalPurchaseManager.vue'
import m_approvalPurchaseView from './pagesApp/purchase/approvalPurchaseView.vue'

/* 驳回 */
import m_rejectForm from './pagesApp/common/rejectForm.vue'

/* 移动端 - 测试菜单 */
import m_menu from './pagesApp/m_menu'

/* 移动端 - 理财管理 - 查看详情*/

import  m_financialManagementView from './pagesApp/financialManagement/m_financialManagementView'

/* 移动端 - 测试导航菜单 */
// import m_menuBar from './pagesApp/m_menuBar'
// import m_menuBars from './pagesApp/m_menuBars'

/* 导航 */
import m_tab from './pagesApp/m_tab'

/* 移动端 - 付款计划 */
import m_myPaymentPlanManager from './pagesApp/paymentPlan/m_myPaymentPlanManager'
import m_myPaymentPlanView from './pagesApp/paymentPlan/m_myPaymentPlanView'

import m_finPaymentPlanManager from './pagesApp/paymentPlan/m_finPaymentPlanManager'
import m_finPaymentPlanView from './pagesApp/paymentPlan/m_finPaymentPlanView'

/* 移动端 - 付款申请 */
import m_paymentApplyManager from './pagesApp/paymentApply/m_paymentApplyManager'
import m_paymentApplyView from './pagesApp/paymentApply/m_paymentApplyView'
import m_paymentApplyForm from './pagesApp/paymentApply/m_paymentApplyForm'
import m_paymentApplyTosub from './pagesApp/paymentApply/m_paymentApplyTosub'
import m_paymentApplySubed from './pagesApp/paymentApply/m_paymentApplySubed'

import m_finPaymentApplyManager from './pagesApp/paymentApply/m_finPaymentApplyManager'
import m_finPaymentApplyView from './pagesApp/paymentApply/m_finPaymentApplyView'

/* 移动端 - 报销申请 */
import m_reimbursementManager from './pagesApp/reimbursement/m_reimbursementManager'
import m_reimbursementView from './pagesApp/reimbursement/m_reimbursementView'

import m_finReimbursementManager from './pagesApp/reimbursement/m_finReimbursementManager'
import m_finReimbursementView from './pagesApp/reimbursement/m_finReimbursementView'

/* 移动端 - 资金图表动态 - 资金动态*/
import m_fundDynamicsChartView from './pagesApp/fundDynamics/m_fundDynamicsChartView'
import m_fundDynamicsView from './pagesApp/fundDynamics/m_fundDynamicsView'

/* 移动端 - 收支明细*/
import m_bankDetailCashierView from './pagesApp/bankDetailCashier/bankDetailCashierView'

/* 移动端 - 订餐菜单 - 订餐历史 - 订餐统计*/
import m_orderSystemMenu from './pagesApp/orderSystem/m_orderSystemMenu'
import m_orderSystemHistory from './pagesApp/orderSystem/m_orderSystemHistory'
import m_orderStatistics from './pagesApp/orderSystem/m_orderStatistics'

/* 移动端 - 保险 - 利率审批 */
import m_interestRateManager from './pagesApp/insurance/m_interestRateManager'
import m_interestRateView from './pagesApp/insurance/m_interestRateView'



/* 收银管理 */
import cashierManager from './pages/cashier/cashierManager'
import cashierView from './pages/cashier/cashierView'
import cashierBankDetailForm from './pages/cashier/cashierBankDetailForm'
import cashierBankDetailPrivateForm from './pages/cashier/cashierBankDetailPrivateForm'
import cashierApprovalApplyForm from './pages/cashier/cashierApprovalApplyForm'

/* 保险审批 */
import approvalInsuranceManager from './pages/InsuranceApproval/approvalInsuranceManager'
import approvalInsuranceView from './pages/InsuranceApproval/approvalInsuranceView'

/* 保险驳回 */
import insuranceRejectReason from './pages/InsuranceApproval/insuranceRejectReason'

/* 车辆管理 */
import vehicleManager from './pages/basic/vehicle/vehicleManager'
import vehicleForm from './pages/basic/vehicle/vehicleForm'
import vehicleView from './pages/basic/vehicle/vehicleView'

import saveModelForm from './pages/basic/vehicle/saveModelForm'
import saveVersionForm from './pages/basic/vehicle/saveVersionForm'


/* 跟踪信息 */
import trackManager from './pages/basic/track/trackManager'
import trackForm from './pages/basic/track/trackForm'
import trackView from './pages/basic/track/trackView'
import trackFormView from './pages/basic/track/trackFormView'
import trackDetailsView from './pages/basic/trackDetails/trackDetailsView'
import trackDetailsManager from './pages/basic/trackDetails/trackDetailsManager'


/* 出单管理 */
import billingManager from './pages/insurance/billing/billingManager'
import billingForm from './pages/insurance/billing/billingForm'
import billingView from './pages/insurance/billing/billingView'
import billingApprovalApplyForm from './pages/insurance/billing/billingApprovalApplyForm'

/* 保单管理 */
import policyManager from './pages/insurance/policy/policyManager'
import policyView from './pages/insurance/policy/policyView'
/* 应收账款*/
import accountsReceivableManager from './pages/insurance/accountsReceivable/accountsReceivableManager'
import accountsReceivableView from './pages/insurance/accountsReceivable/accountsReceivableView'
/*客户返利*/
import customerRebatesManager from './pages/insurance/customerRebates/customerRebatesManager'
import customerRebatesView from './pages/insurance/customerRebates/customerRebatesView'
/*付保险费*/
import payInsuranceFeeManager from './pages/insurance/paymentInsurance/payInsuranceFeeManager'


/* 保险审批制定 */
import insuranceProcessManager from './pages/approvalPriority/insuranceProcessManager'
import insuranceProcessForm from './pages/approvalPriority/insuranceProcessForm'
/*收银审批制定*/
import cashRegisterManager from './pages/approvalPriority/cashRegisterManager'
import cashRegisterForm from './pages/approvalPriority/cashRegisterForm'
/* 维护保险公司 */
import insuranceUnitDetailsForm from './pages/insurance/unit/insuranceUnitDetailsForm'
import insuranceUnitView from './pages/insurance/unit/insuranceUnitView'

/* 微信服务号消息模板管理 */
import wxMessageTemplateManager from './pages/wxMessageTemplate/wxMessageTemplateManager.vue'
import wxMessageTemplateForm from './pages/wxMessageTemplate/wxMessageTemplateForm.vue'

/* 微信服务号消息管理 */
import wxMessageManager from './pages/wxMessage/wxMessageManager.vue'

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home,
      children: [
        { path: '/home/desktop', name: 'home.desktop', component:desktop, meta: {title: '北京海派奥特经贸有限公司办公系统'}},
        { path: '/home/wxMessageTemplateManager', name: 'wxMessageTemplateManager.vue', component: wxMessageTemplateManager , meta: {title: '微信服务号消息模板管理'}},
        { path: '/home/wxMessageManager', name: 'wxMessageManager.vue', component: wxMessageManager , meta: {title: '微信服务号消息管理'}},
        { path: '/home/approvalPersonaliseManager', name: 'approvalPersonaliseManager.vue', component: approvalPersonaliseManager , meta: {title: '审批定制管理'}},
        { path: '/home/approvalPriorityManager', name: 'approvalPriorityManager.vue', component: approvalPriorityManager , meta: {title: '审批管理'}},
        { path: '/home/reversalAccountManager', name: 'reversalAccountManager.vue', component: reversalAccountManager , meta: {title: '冲账管理'}},
        { path: '/home/boardFeesManager', name: 'boardFeEsManager.vue', component: boardFeEsManager ,meta: {title: '董事会费管理'}},
        { path: '/home/rversalManager', name: 'rversalManager.vue', component: rversalManager  ,meta: {title: '冲账管理'}},
        { path: '/home/flowsManager', name: 'flowsManager.vue', component: flowsManager , meta: {title: '流程管理'}},
        { path: '/home/paymentPlanDate', name: 'paymentPlanDate.vue', component: paymentPlanDate , meta: {title: '付款计划'}},
        { path: '/home/psdManager', name: 'psdManager.vue', component: psdManager , meta: {title: '素材管理'}},
        { path: '/home/usersManager', name: 'usersManager.vue', component: usersManager , meta: {title: '用户管理'}},
        { path: '/home/myPaymentPlanManager', name: 'paymentPlanManager.vue', component: paymentPlanManager , meta: {title: '付款计划'}},
        { path: '/home/myManager/paymentApplyManager', name: 'paymentApplyManager.vue',component:  paymentApplyManager, meta: {title: '付款申请'}},
        { path: '/home/myManager/reimbursementManager', name: 'reimbursementManager.vue',component:  reimbursementManager, meta: {title: '我的报销'}},
        { path: '/home/myManager/signatureManager', name: 'signatureManager.vue',component:  signatureManager, meta: {title: '补签字'}},
        { path: '/home/appManager', name: 'appManager.vue',component:  appManager, meta: {title: '菜单管理'}},
        { path: '/home/myElectronicInvoiceManager', name: 'myElectronicInvoiceManager.vue',component:  myElectronicInvoiceManager, meta: {title: '我的电子发票'}},
        { path: '/home/prettyCashsManager', name: 'prettyCashsManager.vue',component:  prettyCashsManager, meta: {title: '备用金'}},
        { path: '/home/approvalPrettyCashs', name: 'approvalPrettyCashs.vue',component:  approvalPrettyCashs, meta: {title: '备用金审批'}},
        { path: '/home/viewManager/finPrettyCashsManagerAll', name: 'finPrettyCashsManagerAll.vue',component:  finPrettyCashsManagerAll, meta: {title: '备用金管理'}},
        { path: '/home/approvalPayManager', name: 'approvalPayManager.vue',component:  approvalPayManager, meta: {title: '付款申请审批'}},
        { path: '/home/approvalPayPlanManager', name: 'approvalPayPlanManager.vue',component:  approvalPayPlanManager, meta: {title: '付款计划审批'}},
        { path: '/home/approvalReimbursementManager', name: 'approvalReimbursementManager.vue',component:  approvalReimbursementManager, meta: {title: '报销审批'}},
        { path: '/home/electronicInvoiceManager', name: 'electronicInvoiceManager.vue', component: electronicInvoiceManager  , meta: {title: '电子发票'}},
        { path: '/home/departmentManager', name: 'departmentManager.vue', component: departmentManager  , meta: {title: '部门管理'}},
        { path: '/home/usersUpdatePwdManager', name: 'usersUpdatePwdManager.vue', component: usersUpdatePwdManager  , meta: {title: '修改密码'}},
        { path: '/home/viewManager/paymentApplyViewManager', name: 'paymentApplyViewManager.vue', component: paymentApplyViewManager  , meta: {title: '付款申请管理'}},

        { path: '/home/viewManager/claimsManager', name: 'claimsManager.vue', component: claimsManager  , meta: {title: '保险理赔'}},
        { path: '/home/viewManager/reimbursementViewManager', name: 'reimbursementViewManager.vue', component: reimbursementViewManager  , meta: {title: '报销管理'}},
        { path: '/home/viewManager/paymentPlanViewManager', name: 'paymentPlanViewManager.vue', component: paymentPlanViewManager  , meta: {title: '付款计划管理'}},

        { path: '/home/unitManager', name: 'unitManager.vue', component: unitManager  , meta: {title: '单位管理'}},
        { path: '/home/personManager', name: 'personManager.vue', component: personManager  , meta: {title: '联系人管理'}},
        { path: '/home/visitPersonManager', name: 'visitPersonManager.vue', component: visitPersonManager  , meta: {title: '来访人员'}},

        { path: '/home/bankDetailCashierManager', name: 'bankDetailCashierManager.vue', component: bankDetailCashierManager},
        { path: '/home/checkManager', name: 'checkManager.vue', component: checkManager , meta: {title: '支票管理'}},
        { path: '/home/checkExpendManager', name: 'checkExpendManager.vue', component: checkExpendManager , meta: {title: '支票管理'}},
        { path: '/home/checkTilingManager', name: 'checkTilingManager.vue', component: checkTilingManager , meta: {title: '支票管理'}},
        { path: '/home/myReceivableManager', name: 'myReceivableManager.vue', component: myReceivableManager},
        { path: '/home/finReceivableManager', name: 'finReceivableManager.vue', component: finReceivableManager},
        { path: '/home/invoiceTilingManager', name: 'invoiceTilingManager.vue', component: invoiceTilingManager , meta: {title: '发票管理'}},
        { path: '/home/invoiceListManager', name: 'invoiceListManager.vue', component: invoiceListManager , meta: {title: '发票管理'}},
        { path: '/home/invoiceWarehouManager', name: 'invoiceWarehouManager.vue', component: invoiceWarehouManager , meta: {title: '发票管理'}},
        { path: '/home/openInvoiceManager', name: 'openInvoiceManager.vue', component: openInvoiceManager},

        { path: '/home/publicAccountManager', name: 'publicAccountManager.vue', component: publicAccountManager , meta: {title: '对公账号'}},
        { path: '/home/privateAccountManager', name: 'privateAccountManager.vue', component: privateAccountManager , meta: {title: '对私账号'}},
        { path: '/home/productManager', name: 'productManager.vue', component: productManager  ,meta: {title: '商品管理'}},
        { path: '/home/myPurchaseManager', name: 'myPurchaseManager.vue', component: myPurchaseManager  ,meta: {title: '采购计划'}},
        { path: '/home/approvalPurchaseManager', name: 'approvalPurchaseManager.vue', component: approvalPurchaseManager  ,meta: {title: '采购审批'}},
        { path: '/home/awaitPurchaseManager', name: 'awaitPurchaseManager.vue', component: awaitPurchaseManager},
        { path: '/home/purchasePersonManager', name: 'purchasePersonManager.vue', component: purchasePersonManager},
        { path: '/home/warehouseEntryManager', name: 'warehouseEntryManager.vue', component: warehouseEntryManager},
        { path: '/home/inStockManager', name: 'inStockManager.vue', component: inStockManager},
        { path: '/home/warehouseExitManager', name: 'warehouseExitManager.vue', component: warehouseExitManager},
        { path: '/home/information/handlePersonManager', name: 'handlePersonManager.vue', component: handlePersonManager, meta: {title: '办理人员'}},
        { path: '/home/lnsurance/policyInformationManager', name: 'policyInformationManager.vue', component: policyInformationManager, meta: {title: '保单信息'}},
        { path: '/home/lnsurance/financialInformationManager', name: 'financialInformationManager.vue', component: financialInformationManager, meta: {title: '财务信息'}},
        { path: '/home/lnsurance/insuranceCompanyManager', name: 'insuranceCompanyManager.vue', component: insuranceCompanyManager, meta: {title: '保险公司'}},
        { path: '/home/insuranceUnitManager', name: 'insuranceUnitManager.vue', component: insuranceUnitManager, meta: {title: '管理保险公司'}},
        { path: '/home/insurance/clientManager', name: 'clientManager.vue', component: clientManager, meta: {title: '客户管理'}},

        { path: '/home/approPriationManager', name: 'approPriationManager.vue', component: approPriationManager, meta: {title: '审批定制'}},
        { path: '/home/unionCostsManager', name: 'unionCostsManager.vue', component: unionCostsManager, meta: {title: '审批定制'}},

        { path: '/home/cashierManager', name: 'cashierManager.vue', component: cashierManager ,meta: {title: '收银管理'}},
        { path: '/home/approvalInsuranceManager', name: 'approvalInsuranceManager.vue', component: approvalInsuranceManager ,meta: {title: '保险审批'}},
        { path: '/home/vehicleManager', name: 'vehicleManager.vue', component: vehicleManager ,meta: {title: '车辆管理'}},
        { path: '/home/track/trackManager', name: 'trackManager.vue', component: trackManager ,meta: {title: '跟踪信息'}},
        { path: '/home/billing/billingManager', name: 'billingManager.vue', component: billingManager ,meta: {title: '出单管理'}},
        { path: '/home/policy/policyManager', name: 'policyManager.vue', component: policyManager ,meta: {title: '保单管理'}},
        { path: '/home/accountsReceivable/accountsReceivableManager', name: 'accountsReceivableManager.vue', component: accountsReceivableManager ,meta: {title: '应收账款'}},
        { path: '/home/customerRebates/customerRebatesManager', name: 'customerRebatesManager.vue', component: customerRebatesManager ,meta: {title: '客户返利'}},
        { path: '/home/paymentInsurance/payInsuranceFeeManager', name: 'payInsuranceFeeManager.vue', component: payInsuranceFeeManager ,meta: {title: '支付保险费'}},

        { path: '/home/trackDetails/trackDetailsManager', name: 'trackDetailsManager.vue', component: trackDetailsManager ,meta: {title: '跟踪细节'}},
        { path: '/home/insuranceProcessManager', name: 'insuranceProcessManager.vue', component: insuranceProcessManager ,meta: {title: '保险审批制定'}},
        { path: '/home/cashRegisterManager', name: 'cashRegisterManager.vue', component: cashRegisterManager ,meta: {title: '收银审批制定'}},
        { path: '/home/conductFinManager', name: 'conductFinManager.vue', component: conductFinManager ,meta: {title: '理财管理'}},
        { path: '/home/prewarningValueManager', name: 'prewarningValueManager.vue', component: prewarningValueManager},

      ]
    },

    { path: '/login', name: 'login', component: login , meta: {title: '北京海派奥特经贸有限公司办公系统'}},

    { path: '/wxMessageTemplateForm', name: 'wxMessageTemplateForm', component: wxMessageTemplateForm},
    { path: '/approvalPersonaliseForm', name: 'approvalPersonaliseForm', component: approvalPersonaliseForm},
    { path: '/approvalPriorityForm', name: 'approvalPriorityForm', component: approvalPriorityForm},
    { path: '/reversalAccountForm', name: 'reversalAccountForm', component: reversalAccountForm},
    { path: '/boardFeesForm', name: 'boardFeesForm', component: boardFeesForm},
    { path: '/rversalForm', name: 'rversalForm', component: rversalForm},
    { path: '/myPaymentPlanForm', name: 'PaymentPlanForm', component: PaymentPlanForm},
    { path: '/myPaymentPlanDetailForm', name: 'PaymentPlanDetailForm', component: PaymentPlanDetailForm},
    { path: '/PaymentPlanFormView', name: 'PaymentPlanFormView', component: PaymentPlanFormView},
    { path: '/PaymentPlanDetailFormView', name: 'PaymentPlanDetailFormView', component: PaymentPlanDetailFormView},

    { path: '/selectDic', name: 'selectDic', component: selectDic},

    { path: '/dicForm089', name: 'dicForm089', component: dicForm089},
    { path: '/dicForm090', name: 'dicForm090', component: dicForm090},
    { path: '/dicForm091', name: 'dicForm091', component: dicForm091},

    { path: '/selectPublicAccount', name: 'selectPublicAccount', component: selectPublicAccount},
    { path: '/selectPrivateAccount', name: 'selectPrivateAccount', component: selectPrivateAccount},
    { path: '/selectUnit', name: 'selectUnit', component: selectUnit},
    { path: '/selectPaymentApplyDetail', name: 'selectPaymentApplyDetail', component: selectPaymentApplyDetail},
    { path: '/selectUsersWxInfo', name: 'selectUsersWxInfo', component: selectUsersWxInfo},
    { path: '/selectBankDetail', name: 'selectBankDetail', component: selectBankDetail},
    { path: '/selectChecksDetail', name: 'selectChecksDetail', component: selectChecksDetail},
    { path: '/selectPrettyCashs', name: 'selectPrettyCashs', component: selectPrettyCashs},
    { path: '/selectPlate', name: 'selectPlate.vue',component: selectPlate },
    { path: '/selectPerson', name: 'selectPerson', component: selectPerson},
    { path: '/selectPlanDate', name: 'selectPlanDate', component: selectPlanDate},
    { path: '/selectDepartment', name: 'selectDepartment', component: selectDepartment},
    { path: '/selectElectronicInvoice', name: 'selectElectronicInvoice', component: selectElectronicInvoice},
    { path: '/selectInvoiceDetail', name: 'selectInvoiceDetail.vue',component: selectInvoiceDetail },
    { path: '/selectVersion', name: 'selectVersion.vue',component: selectVersion },
    { path: '/selectPage', name: 'selectPage.vue',component: selectPage ,meta: {title: '页面测试'}},
    { path: '/selectProduct', name: 'selectProduct.vue',component: selectProduct },
    { path: '/selectModel', name: 'selectModel.vue',component: selectModel },
    { path: '/selectProductModel', name: 'selectProductModel.vue',component: selectProductModel },
    { path: '/selectFormPlate', name: 'selectFormPlate.vue',component: selectFormPlate },
    { path: '/selectPrint', name: 'selectPrint.vue',component: selectPrint },

    { path: '/demo', name: 'demo.vue', component: demo ,meta: {title: '组件测试'}},

    { path: '/checkForm', name: 'checkForm.vue', component: checkForm},
    { path: '/showCheckWarnView', name: 'showCheckWarnView.vue', component: showCheckWarnView},
    { path: '/addCheckNumForm', name: 'addCheckNumForm.vue', component: addCheckNumForm},
    { path: '/checkExpendView', name: 'checkExpendView.vue', component: checkExpendView},
    { path: '/checkFillOut', name: 'checkFillOut.vue', component: checkFillOut},
    { path: '/blackCheckOut', name: 'blackCheckOut.vue', component: blackCheckOut},
    { path: '/toVoidCheck', name: 'toVoidCheck.vue', component: toVoidCheck},
    { path: '/accEntry', name: 'accEntry.vue', component: accEntry},
    { path: '/viewCheck', name: 'viewCheck.vue', component: viewCheck},
    { path: '/myReceivableForm', name: 'myReceivableForm.vue', component: myReceivableForm},
    { path: '/finReceivableView', name: 'finReceivableView.vue', component: finReceivableView},
    { path: '/myReceivableView', name: 'myReceivableView.vue', component: myReceivableView},
    { path: '/myReceivableRegisterForm', name: 'myReceivableRegisterForm.vue', component: myReceivableRegisterForm},

    { path: '/addInvoiceNumForm', name: 'addInvoiceNumForm.vue', component: addInvoiceNumForm},

    { path: '/addUnitForm', name: 'addUnitForm', component: addUnitForm},
    { path: '/addUnitSimplifyForm', name: 'addUnitSimplifyForm', component: addUnitSimplifyForm},
    { path: '/unitBankDetailForm', name: 'unitBankDetailForm', component: unitBankDetailForm},

    { path: '/unitView', name: 'unitView.vue', component: unitView},
    { path: '/unitDetailView', name: 'unitDetailView.vue', component: unitDetailView},

    { path: '/addPersonForm', name: 'addPersonForm', component: addPersonForm},
    { path: '/visitPersonForm', name: 'visitPersonForm', component: visitPersonForm},

    { path: '/addPersonSimplifyForm', name: 'addPersonSimplifyForm', component: addPersonSimplifyForm},
    { path: '/personView', name: 'personView', component: personView},

    { path: '/publicAccountForm', name: 'publicAccountForm', component: publicAccountForm},
    { path: '/publicAccountView', name: 'publicAccountView', component: publicAccountView},
    { path: '/privateAccountForm', name: 'privateAccountForm', component: privateAccountForm},
    { path: '/privateAccountView', name: 'privateAccountView', component: privateAccountView},

    { path: '/paymentApplyForm', name: 'paymentApplyForm', component: paymentApplyForm},
    { path: '/paymentApplyFormView', name: 'paymentApplyFormView', component: paymentApplyFormView},
    { path: '/paymentInvoice', name: 'paymentInvoice', component: paymentInvoice},
    { path: '/paymentWindowManager', name: 'paymentWindowManager', component: paymentWindowManager},

    { path: '/flowsForm', name: 'flowsForm', component: flowsForm},
    { path: '/flowDetailForm', name: 'flowDetailForm', component: flowDetailForm},

    { path: '/conductFinForm', name: 'conductFinForm', component: conductFinForm},
    { path: '/conductFinView', name: 'conductFinView', component: conductFinView},
    { path: '/conductFinRedeemForm', name: 'conductFinRedeemForm', component: conductFinRedeemForm},

    { path: '/psdForm', name: 'psdForm', component: psdForm},
    { path: '/bankDetailForm', name: 'bankDetailForm', component: bankDetailForm},
    { path: '/bankDetailCashierForm', name: 'bankDetailCashierForm', component: bankDetailCashierForm},

    { path: '/payApplyReconDetailForm', name: 'payApplyReconDetailForm.vue', component: payApplyReconDetailForm},


    { path: '/reimbursementForm', name: 'reimbursementForm', component: reimbursementForm},
    { path: '/reimbursementDetailForm', name: 'reimbursementDetailForm', component: reimbursementDetailForm},
    { path: '/appTopForm', name: 'appTopForm', component: appTopForm},
    { path: '/appLeftForm', name: 'appLeftForm', component: appLeftForm},
    { path: '/appForm', name: 'appForm', component: appForm},

    { path: '/myElectronicInvoiceForm', name: 'myElectronicInvoiceForm', component: myElectronicInvoiceForm},
    { path: '/myElectronicInvoiceReimburseManager', name: 'myElectronicInvoiceReimburseManager', component: myElectronicInvoiceReimburseManager},
    { path: '/rejectReason', name: 'rejectReason', component: rejectReason},
    { path: '/electronicInvoiceForm', name: 'electronicInvoiceForm', component: electronicInvoiceForm},
    { path: '/electronicInvoiceView', name: 'electronicInvoiceView', component: electronicInvoiceView},
    { path: '/usersForm', name: 'usersForm', component: usersForm},
    { path: '/departmentForm', name: 'departmentForm', component: departmentForm},
    { path: '/departmentPersonForm', name: 'departmentPersonForm', component: departmentPersonForm},
    { path: '/bindingManager', name: 'bindingManager', component: bindingManager},

    { path: '/menu', name: 'menu', component: menu},
    { path: '/purchasingApproval', name: 'purchasingApproval', component: purchasingApproval},
    { path: '/approvalPaymentBuy', name: 'approvalPaymentBuy', component: approvalPaymentBuy},
    { path: '/approvalReimbursement', name: 'approvalReimbursement', component: approvalReimbursement},

    { path: '/correct', name: 'correct', component: correct},
    { path: '/failure', name: 'failure', component: failure},
    { path: '/loginSc', name: 'loginSc', component: loginSc},
    { path: '/loginScSuccess', name: 'loginScSuccess', component: loginScSuccess},
    { path: '/loginScCancel', name: 'loginScCancel', component: loginScCancel},

    { path: '/approvalPayForm', name: 'approvalPayForm.vue',component: approvalPayForm },
    { path: '/approvalPlanDetailForm', name: 'approvalPlanDetailForm.vue',component: approvalPlanDetailForm },
    { path: '/approvalApplyView', name: 'approvalApplyView.vue',component: approvalApplyView },
    { path: '/approvalApplyPrint', name: 'approvalApplyPrint.vue',component: approvalApplyPrint },

    { path: '/approvalReimbursementForm', name: 'approvalReimbursementForm.vue',component: approvalReimbursementForm },
    { path: '/approvalReimbursementDetailForm', name: 'approvalReimbursementDetailForm.vue',component: approvalReimbursementDetailForm },
    { path: '/approvalReimbursementFund', name: 'approvalReimbursementFund.vue',component: approvalReimbursementFund },
    { path: '/approvalReimbursementPrint', name: 'approvalReimbursementPrint.vue',component: approvalReimbursementPrint },
    { path: '/approvalReimbursementPrintBYJ', name: 'approvalReimbursementPrintBYJ.vue',component: approvalReimbursementPrintBYJ },
    { path: '/approvalReimbursementSingleSplitForm', name: 'approvalReimbursementSingleSplitForm.vue',component: approvalReimbursementSingleSplitForm },
    { path: '/approvalBatchAllca', name: 'approvalBatchAllca.vue',component: approvalBatchAllca },

    { path: '/invoiceWarehouFrom', name: 'invoiceWarehouFrom.vue',component: invoiceWarehouFrom },
    { path: '/invoiceView', name: 'invoiceView.vue',component: invoiceView },
    { path: '/toVoidInvoice', name: 'toVoidInvoice.vue',component: toVoidInvoice },
    { path: '/toVoidInvoiceMore', name: 'toVoidInvoiceMore.vue',component: toVoidInvoiceMore },
    { path: '/openInvoiceForm', name: 'openInvoiceForm.vue',component: openInvoiceForm },
    { path: '/openInvoiceView', name: 'openInvoiceView.vue',component: openInvoiceView },

    { path: '/paymentApplyViewForm', name: 'paymentApplyViewForm.vue',component: paymentApplyViewForm },
    { path: '/reimbursementViewForm', name: 'reimbursementViewForm.vue',component: reimbursementViewForm },
    { path: '/reimbursementViewDetailForm', name: 'reimbursementViewDetailForm.vue',component: reimbursementViewDetailForm },
    { path: '/reimbursementDetailFormView', name: 'reimbursementDetailFormView.vue',component: reimbursementDetailFormView },
    { path: '/reimbursementFormView', name: 'reimbursementFormView.vue',component: reimbursementFormView },
    { path: '/paymentPlanViewForm', name: 'paymentPlanViewForm.vue',component: paymentPlanViewForm },
    { path: '/paymentPlanViewDetailForm', name: 'paymentPlanViewDetailForm.vue',component: paymentPlanViewDetailForm },
    { path: '/reimbursementReconDetailForm', name: 'reimbursementReconDetailForm.vue',component: reimbursementReconDetailForm },

    { path: '/approvalPrintReimbursementTicket', name: 'approvalPrintReimbursementTicket.vue',component: approvalPrintReimbursementTicket },


    { path: '/openBankForm', name: 'openBankForm.vue',component: openBankForm },
    { path: '/openBankDetailForm', name: 'openBankDetailForm.vue',component: openBankDetailForm },

    { path: '/approPriationForm', name: 'approPriationForm.vue',component: approPriationForm },
    { path: '/unionCostsForm', name: 'unionCostsForm.vue',component: unionCostsForm },

    { path: '/handlePersonForm', name: 'handlePersonForm.vue',component: handlePersonForm },
    { path: '/policyInformationForm', name: 'policyInformationForm.vue',component: policyInformationForm },
    { path: '/financialInformationForm', name: 'financialInformationForm.vue',component: financialInformationForm },
    { path: '/insuranceCompanyForm', name: 'insuranceCompanyForm.vue',component: insuranceCompanyForm },
    { path: '/insuranceUnitForm', name: 'insuranceUnitForm.vue',component: insuranceUnitForm },
    { path: '/insuranceUnitDetailsForm', name: 'insuranceUnitDetailsForm.vue',component: insuranceUnitDetailsForm },
    { path: '/insuranceUnitView', name: 'insuranceUnitView.vue',component: insuranceUnitView },
    { path: '/clientForm', name: 'clientForm.vue',component: clientForm },

    { path: '/clientView', name: 'clientView.vue',component: clientView },
    { path: '/claimsForm', name: 'claimsForm.vue',component: claimsForm },
    { path: '/claimsView', name: 'claimsView.vue',component: claimsView },

    { path: '/handleImageForm', name: 'handleImageForm.vue',component: handleImageForm ,meta: {title: '图片预览'}},
    { path: '/onlyGoogle', name: 'onlyGoogle.vue',component: onlyGoogle },
    { path: '/batchAllocationForm', name: 'batchAllocationForm.vue',component: batchAllocationForm },
    { path: '/videoPlay', name: 'videoPlay.vue',component: videoPlay },
    { path: '/productForm', name: 'productForm.vue',component: productForm },
    { path: '/myPurchaseForm', name: 'myPurchaseForm.vue',component: myPurchaseForm },
    { path: '/myPurchaseView', name: 'myPurchaseView.vue',component: myPurchaseView },
    { path: '/approvalPurchaseView', name: 'approvalPurchaseView.vue',component: approvalPurchaseView },

    { path: '/awaitPurchaseView', name: 'awaitPurchaseView.vue',component: awaitPurchaseView },
    { path: '/purchasePersonForm', name: 'purchasePersonForm.vue',component: purchasePersonForm },
    { path: '/warehouseEntryForm', name: 'warehouseEntryForm.vue',component: warehouseEntryForm },
    { path: '/warehouseEntryView', name: 'warehouseEntryView.vue',component: warehouseEntryView },
    { path: '/warehouseExitForm', name: 'warehouseExitForm.vue',component: warehouseExitForm },
    { path: '/warehouseExitView', name: 'warehouseExitView.vue',component: warehouseExitView },

    { path: '/prettyCashsForm', name: 'prettyCashsForm.vue',component: prettyCashsForm },

    { path: '/prettyCashsView', name: 'prettyCashsView.vue',component: prettyCashsView },
    { path: '/approvalPrettyCashsView', name: 'approvalPrettyCashsView.vue',component: approvalPrettyCashsView },
    { path: '/finPrettyCashsView', name: 'finPrettyCashsView.vue',component: finPrettyCashsView },
    { path: '/fullRefundForm', name: 'fullRefundForm.vue',component: fullRefundForm },

    { path: '/modelForm', name: 'modelForm.vue',component: modelForm },

    { path: '/vehicleForm', name: 'vehicleForm.vue',component: vehicleForm },
    { path: '/vehicleView', name: 'vehicleView.vue',component: vehicleView },
    { path: '/saveModelForm', name: 'saveModelForm.vue',component: saveModelForm },
    { path: '/saveVersionForm', name: 'saveVersionForm.vue',component: saveVersionForm },

    { path: '/approvalInsuranceView', name: 'approvalInsuranceView.vue',component: approvalInsuranceView },
    { path: '/insuranceRejectReason', name: 'insuranceRejectReason.vue',component: insuranceRejectReason },

    { path: '/cashierView', name: 'cashierView.vue',component: cashierView },
    { path: '/cashierBankDetailForm', name: 'cashierBankDetailForm.vue',component: cashierBankDetailForm },
    { path: '/cashierBankDetailPrivateForm', name: 'cashierBankDetailPrivateForm.vue', component: cashierBankDetailPrivateForm },
    { path: '/cashierApprovalApplyForm', name: 'cashierApprovalApplyForm.vue', component: cashierApprovalApplyForm },
    { path: '/trackForm', name: 'trackForm.vue',component: trackForm },
    { path: '/trackView', name: 'trackView.vue',component: trackView },
    { path: '/trackFormView', name: 'trackFormView.vue',component: trackFormView },

    { path: '/trackDetailsView', name: 'trackDetailsView.vue',component: trackDetailsView },

    { path: '/billingForm', name: 'billingForm.vue',component: billingForm },
    { path: '/billingView', name: 'billingView.vue',component: billingView },
    { path: '/billingApprovalApplyForm', name: 'billingApprovalApplyForm.vue',component: billingApprovalApplyForm },

    { path: '/policyView', name: 'policyView.vue',component: policyView },
    { path: '/accountsReceivableView', name: 'accountsReceivableView.vue',component: accountsReceivableView },
    { path: '/customerRebatesView', name: 'customerRebatesView.vue',component: customerRebatesView },

    { path: '/insuranceProcessForm', name: 'insuranceProcessForm.vue',component: insuranceProcessForm },
    { path: '/cashRegisterForm', name: 'cashRegisterForm.vue',component: cashRegisterForm },


    /* APP端路由 */
    {
      path:'/homeApp',name:'homeApp', component: homeApp,
      children:[
        { path: '/homeApp/testApp', name: 'testApp', component: testApp ,meta: {title: 'app端测试'}},
        { path: '/homeApp/m_myApprovalManager', name: 'm_myApprovalManager', component: m_myApprovalManager ,meta: {title: '北京海派办公系统'}},

        { path: '/homeApp/m_myPaymentPlanManager', name: 'm_myPaymentPlanManager', component: m_myPaymentPlanManager ,meta: {title: '付款计划审批'}},
        { path: '/homeApp/m_myPaymentPlanView', name: 'm_myPaymentPlanView', component: m_myPaymentPlanView ,meta: {title: '付款计划审批'}},
        { path: '/homeApp/m_finPaymentPlanManager', name: 'm_finPaymentPlanManager', component: m_finPaymentPlanManager ,meta: {title: '付款计划管理'}},
        { path: '/homeApp/m_finPaymentPlanView', name: 'm_finPaymentPlanView', component: m_finPaymentPlanView ,meta: {title: '付款计划管理'}},

        { path: '/homeApp/m_paymentApplyManager', name: 'm_paymentApplyManager', component: m_paymentApplyManager ,meta: {title: '付款申请审批'}},
        { path: '/homeApp/m_paymentApplyView', name: 'm_paymentApplyView', component: m_paymentApplyView ,meta: {title: '付款申请审批'}},
        { path: '/homeApp/m_finPaymentApplyManager', name: 'm_finPaymentApplyManager', component: m_finPaymentApplyManager ,meta: {title: '付款申请管理'}},
        { path: '/homeApp/m_finPaymentApplyView', name: 'm_finPaymentApplyView', component: m_finPaymentApplyView ,meta: {title: '付款申请管理'}},
        { path: '/homeApp/m_paymentApplyForm', name: 'm_paymentApplyForm', component: m_paymentApplyForm ,meta: {title: '付款申请'}},
        { path: '/homeApp/m_paymentApplyTosub', name: 'm_paymentApplyTosub', component: m_paymentApplyTosub ,meta: {title: '付款申请'}},
        { path: '/homeApp/m_paymentApplySubed', name: 'm_paymentApplySubed', component: m_paymentApplySubed ,meta: {title: '付款申请'}},

        { path: '/homeApp/m_reimbursementManager', name: 'm_reimbursementManager', component: m_reimbursementManager ,meta: {title: '报销申请审批'}},
        { path: '/homeApp/m_reimbursementView', name: 'm_reimbursementView', component: m_reimbursementView ,meta: {title: '报销申请审批'}},
        { path: '/homeApp/m_finReimbursementManager', name: 'm_finReimbursementManager', component: m_finReimbursementManager ,meta: {title: '报销申请管理'}},
        { path: '/homeApp/m_finReimbursementView', name: 'm_finReimbursementView', component: m_finReimbursementView ,meta: {title: '报销申请管理'}},

        { path: '/homeApp/m_approvalPurchaseManager', name: 'm_approvalPurchaseManager', component: m_approvalPurchaseManager ,meta: {title: '采购计划'}},
        { path: '/homeApp/m_approvalPurchaseView', name: 'm_approvalPurchaseView', component: m_approvalPurchaseView ,meta: {title: '采购计划'}},

        { path: '/homeApp/m_fundDynamicsChartView', name: 'm_fundDynamicsChartView', component: m_fundDynamicsChartView ,meta: {title: '资金动态'}},
        { path: '/homeApp/m_fundDynamicsView', name: 'm_fundDynamicsView', component: m_fundDynamicsView ,meta: {title: '资金动态'}},
        { path: '/homeApp/m_bankDetailCashierView', name: 'm_bankDetailCashierView', component: m_bankDetailCashierView ,meta: {title: '查看收支明细信息'}},

        { path: '/homeApp/m_orderSystemMenu', name: 'm_orderSystemMenu',component: m_orderSystemMenu, meta: {title: '点餐系统'}},
        { path: '/homeApp/m_orderSystemHistory', name: 'm_orderSystemHistory',component: m_orderSystemHistory, meta: {title: '历史记录'}},
        { path: '/homeApp/m_orderStatistics', name: 'm_orderStatistics',component: m_orderStatistics, meta: {title: '订餐统计'}},
        { path: '/homeApp/m_interestRateManager', name: 'm_interestRateManager',component: m_interestRateManager, meta: {title: '利率审批管理'}},
        { path: '/homeApp/m_interestRateView', name: 'm_interestRateView',component: m_interestRateView, meta: {title: '利率审批'}},

        { path: '/homeApp/m_financialManagementView', name: 'm_financialManagementView',component: m_financialManagementView, meta: {title: '详细信息'}},

        { path: '/homeApp/m_rejectForm', name: 'm_rejectForm', component: m_rejectForm ,meta: {title: '驳回理由'}},

        { path: '/homeApp/m_menu', name: 'm_menu', component: m_menu ,meta: {title: '测试导航菜单'}},
        // { path: '/homeApp/m_menuBar', name: 'm_menuBar', component: m_menuBar ,meta: {title: '测试导航菜单'}},
        // { path: '/homeApp/m_menuBars', name: 'm_menuBars', component: m_menuBars ,meta: {title: '测试导航菜单副本'}},

        { path: '/homeApp/m_tab', name: 'm_tab', component: m_tab ,meta: {title: '测试菜单'}},
      ]
    }

  ]
})



