import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import desktop from '../components/desktop'

/*备用金功能*/
import prettyCashsManager from '../pages/prettyCashs/prettyCashsManager.vue'
import prettyCashsForm from '../pages/prettyCashs/prettyCashsForm.vue'
import prettyCashsView from '../pages/prettyCashs/prettyCashsView.vue'
import approvalPrettyCashs from '../pages/prettyCashs/approvalPrettyCashs.vue'
import approvalPrettyCashsView from '../pages/prettyCashs/approvalPrettyCashsView.vue'
import selectPrettyCashs from '../pages/selects/selectPrettyCashs.vue'

/* 处理图片 */
import handleImageForm from '../pages/common/handleImageForm.vue'

/* 驳回理由 */
import rejectReason from '../pages/common/rejectReason'

/* 跳转非谷歌页面 */
import onlyGoogle from '../pages/common/onlyGoogle'

/* 界面帮助视频播放 */
import videoPlay from '../pages/common/videoPlay'

/* 分批拨付 */
import batchAllocationForm from '../pages/common/batchAllocationForm'

/* 付款计划 */
import paymentPlanManager from '../pages/paymentPlan/myPaymentPlanManager'
import PaymentPlanForm from '../pages/paymentPlan/myPaymentPlanForm'
import PaymentPlanDetailForm from '../pages/paymentPlan/myPaymentPlanDetailForm'

import PaymentPlanFormView from '../pages/paymentPlan/myPaymentPlanFormView'
import PaymentPlanDetailFormView from '../pages/paymentPlan/myPaymentPlanDetailFormView'

import approvalPayPlanManager from '../pages/paymentPlan/approvalPayPlanManager'
import approvalPayForm from '../pages/paymentPlan/approvalPayPlanForm'
import approvalPlanDetailForm from '../pages/paymentPlan/approvalPayPlanDetailForm'

import paymentPlanViewManager from '../pages/paymentPlan/finPaymentPlanManager'
import paymentPlanViewForm from '../pages/paymentPlan/finPaymentPlanForm'
import paymentPlanViewDetailForm from '../pages/paymentPlan/finPaymentPlanDetailForm'

import paymentPlanDate from '../pages/paymentPlan/myPaymentPlanDate'

/* 支票功能 */
import checkManager from '../pages/check/checkManager'
import checkForm from '../pages/check/checkForm'
import addCheckNumForm from '../pages/check/addCheckNumForm'
import checkExpendView from '../pages/check/checkExpendView'
import checkExpendManager from '../pages/check/checkExpendManager'
import checkTilingManager from '../pages/check/checkTilingManager'
import selectChecksDetail from '../pages/selects/selectChecksDetail'

/* 支票支出->操作 支票填开  - 空白支票外带 - 作废 - 入账 - 查看票样*/
import checkFillOut from '../pages/check/checkOpera/checkFillOut'
import blackCheckOut from '../pages/check/checkOpera/blackCheckOut'
import toVoidCheck from '../pages/check/checkOpera/toVoidCheck'
import accEntry from '../pages/check/checkOpera/accEntry'
import viewCheck from '../pages/check/checkOpera/viewCheck'

/* 应收账款模块 */
import myReceivableManager from '../pages/receivable/myReceivableManager'
import myReceivableForm from '../pages/receivable/myReceivableForm'
import myReceivableView from '../pages/receivable/myReceivableView'
import myReceivableRegisterForm from '../pages/receivable/myReceivableRegisterForm'
import finReceivableManager from '../pages/receivable/finReceivableManager'
import finReceivableView from '../pages/receivable/finReceivableView'

/* 发票功能 */
import invoiceTilingManager from '../pages/invoice/invoiceTilingManager'
import invoiceListManager from '../pages/invoice/invoiceListManager'
import invoiceWarehouManager from '../pages/invoice/invoiceWarehouManager'
import addInvoiceNumForm from '../pages/invoice/addInvoiceNumForm'
import invoiceWarehouFrom from '../pages/invoice/invoiceWarehouFrom'
import selectInvoiceDetail from '../pages/selects/selectInvoiceDetail'
import toVoidInvoice from '../pages/invoice/invoiceOpera/toVoidInvoice'
import toVoidInvoiceMore from '../pages/invoice/invoiceOpera/toVoidInvoiceMore'
import invoiceView from '../pages/invoice/invoiceView'

/*开发票*/
import openInvoiceManager from '../pages/openInvoice/openInvoiceManager'
import openInvoiceForm from '../pages/openInvoice/openInvoiceForm'
import openInvoiceView from '../pages/openInvoice/openInvoiceView'

/* 付款申请 */
import paymentApplyManager from '../pages/paymentApply/myPaymentApplyManager'
import paymentApplyForm from '../pages/paymentApply/myPaymentApplyForm'
import paymentInvoice from '../pages/paymentApply/myPaymentInvoice'
import paymentWindowManager from '../pages/paymentApply/myPaymentWindowManager'

import paymentApplyFormView from '../pages/paymentApply/myPaymentApplyView'

import approvalPayManager from '../pages/paymentApply/approvalApplyManager'
import approvalApplyView from '../pages/paymentApply/approvalApplyForm'

import paymentApplyViewManager from '../pages/paymentApply/finPaymentApplyManager'
import paymentApplyViewForm from '../pages/paymentApply/finPaymentApplyForm'

/* 报销 */
import reimbursementManager from '../pages/reimbursement/myReimbursementManager'
import reimbursementForm from '../pages/reimbursement/myReimbursementForm'
import reimbursementDetailForm from '../pages/reimbursement/myReimbursementDetailForm'

import approvalReimbursementManager from '../pages/reimbursement/approvalReimbursementManager'
import approvalReimbursementForm from '../pages/reimbursement/approvalReimbursementForm.vue'
import approvalReimbursementDetailForm from '../pages/reimbursement/approvalReimbursementDetailForm.vue'
import approvalReimbursementFund from '../pages/reimbursement/approvalReimbursementFund.vue'
import approvalReimbursementPrint from '../pages/reimbursement/approvalReimbursementPrint.vue'
import approvalReimbursementPrintBYJ from '../pages/reimbursement/approvalReimbursementPrintBYJ.vue'
import approvalReimbursementSingleSplitForm from '../pages/reimbursement/approvalReimbursementSingleSplitForm'

import reimbursementViewManager from '../pages/reimbursement/finReimbursementViewManager'
import reimbursementViewForm from '../pages/reimbursement/finReimbursementViewForm'
import reimbursementViewDetailForm from '../pages/reimbursement/finReimbursementViewDetailForm'
import reimbursementFormView from '../pages/reimbursement/myReimbursementFormView'
import reimbursementDetailFormView from '../pages/reimbursement/myReimbursementDetailFormView'

/* 补签字 */
import signatureManager from '../pages/signaturePage/signatureManager'

/* 素材管理 */
import psdManager from '../pages/psd/psdManager'
import psdForm from '../pages/psd/psdForm'

/* 菜单管理 */
import appManager from '../pages/app/appManager'
import appTopForm from '../pages/app/appTopForm'
import appLeftForm from '../pages/app/appLeftForm'
import appForm from '../pages/app/appForm'

/* 我的电子发票*/
import myElectronicInvoiceManager from '../pages/electronicInvoice/myElectronicInvoiceManager'
import myElectronicInvoiceForm from '../pages/electronicInvoice/myElectronicInvoiceForm'

import myElectronicInvoiceReimburseManager from '../pages/electronicInvoice/myElectronicInvoiceReimburseManager'
import electronicInvoiceManager from '../pages/electronicInvoice/electronicInvoiceManager'
import electronicInvoiceForm from '../pages/electronicInvoice/electronicInvoiceForm'
import electronicInvoiceView from '../pages/electronicInvoice/electronicInvoiceView'
import selectElectronicInvoice from '../pages/selects/selectElectronicInvoice'
import selectUsersWxInfo from '../pages/selects/selectUsersWxInfo'

/*用户管理*/
import usersManager from '../pages/users/usersManager'
import usersForm from '../pages/users/usersForm'
import usersUpdatePwdManager from '../pages/users/usersUpdatePwdManager'

/* 选择页面 */
import selectUnit from '../pages/selects/selectUnit'
import selectPublicAccount from '../pages/selects/selectPublicAccount'
import selectDic from '../pages/selects/selectDic'
import selectPaymentApplyDetail from '../pages/selects/selectPaymentApplyDetail'
import selectPerson from '../pages/selects/selectPerson'
import selectPlanDate from '../pages/selects/selectPlanDate'
import selectDepartment from '../pages/selects/selectDepartment'
import selectPrivateAccount from '../pages/selects/selectPrivateAccount'
import selectBankDetail from '../pages/selects/selectBankDetail'

/* 单位 - 联系人 */
import unitManager from '../pages/unit/unitManager'
import addUnitForm from '../pages/unit/addUnitForm'
import unitView from '../pages/unit/unitView'
import unitDetailView from '../pages/unit/unitDetailView'
import addUnitSimplifyForm from '../pages/unit/addUnitSimplifyForm'

import personManager from '../pages/person/personManager'
import personView from '../pages/person/personView'
import addPersonForm from '../pages/person/addPersonForm'
import addPersonSimplifyForm from '../pages/person/addPersonSimplifyForm'

/* 测试demo */
import demo from '../pages/selects/demo'

/* 采购 */
import  myPurchaseManager from '../pages/purchase/myPurchaseManager'
import  myPurchaseForm from '../pages/purchase/myPurchaseForm'
import  myPurchaseView from '../pages/purchase/myPurchaseView'

import  approvalPurchaseManager from '../pages/purchase/approvalPurchaseManager'
import  approvalPurchaseView from '../pages/purchase/approvalPurchaseView'

import awaitPurchaseManager from '../pages/purchase/awaitPurchaseManager'
import awaitPurchaseView from '../pages/purchase/awaitPurchaseView'
import purchasePersonManager from '../pages/purchase/purchasePersonManager'
import purchasePersonForm from '../pages/purchase/purchasePersonForm'

/* 流程管理 */
import flowsManager from '../pages/flows/flowsManager'
import flowsForm from '../pages/flows/flowsForm'
import flowDetailForm from '../pages/flows/flowDetailForm'
import login from '../pages/login.vue'

/*添加收支明细*/
import bankDetailForm from '../pages/bankDetail/bankDetailForm'
import bankDetailCashierManager from '../pages/bankDetailCashier/bankDetailCashierManager'
import bankDetailCashierForm from '../pages/bankDetailCashier/bankDetailCashierForm'

/* 审批流程定制 */
import approvalPersonaliseManager from '../pages/approvalPriority/approvalPersonaliseManager'
import approvalPersonaliseForm from '../pages/approvalPriority/approvalPersonaliseForm'

/* 公司优先级 */
import approvalPriorityManager from '../pages/approvalPriority/approvalPriorityManager'
import approvalPriorityForm from '../pages/approvalPriority/approvalPriorityForm'

/* 冲账人 */
import reversalAccountManager from '../pages/approvalPriority/reversalAccountManager'
import reversalAccountForm from '../pages/approvalPriority/reversalAccountForm'

/* 董事费人员 */
import boardFeesManager from '../pages/approvalPriority/boardFeesManager'
import boardFeesForm from '../pages/approvalPriority/boardFeesForm'

/* 冲账信息列表显示 */
import rversalManager from '../pages/rversal/rversalManager.vue'
import rversalForm from '../pages/rversal/rversalForm.vue'

/*部门*/
import departmentManager from '../pages/department/departmentManager'
import departmentForm from '../pages/department/departmentForm'
import departmentPersonForm from '../pages/department/departmentPersonForm'


/*移动端绑定账号 - 正确 - 错误 - 已确定登陆 - 取消登录 - 扫码登录页面*/
import bindingManager from '../appPages/appLogin/bindingManager'
import correct from '../appPages/promptmessage/correct'
import failure from '../appPages/promptmessage/failure'
import loginScSuccess from '../appPages/appLogin/landing/loginScSuccess'
import loginScCancel from '../appPages/appLogin/landing/loginScCancel'
import loginSc from '../appPages/appLogin/loginSc.vue'

/* 移动端我的操作 菜单 采购审批列表*/
import menu from '../appPages/menu/menu.vue'
import purchasingApproval from '../appPages/menu/purchasingApproval.vue'

/* 移动端采购计划 */
import approvalPaymentBuy from '../appPages/paymentBuy/approvalPaymentBuy.vue'

/* 移动端报销 */
import approvalReimbursement from '../appPages/reimbursement/approvalReimbursement.vue'

/*对公 - 对私账号*/
import publicAccountManager from '../pages/accNum/publicAccount/publicAccountManager'
import publicAccountForm from '../pages/accNum/publicAccount/publicAccountForm'
import publicAccountView from '../pages/accNum/publicAccount/publicAccountView'
import privateAccountManager from '../pages/accNum/privateAccount/privateAccountManager'
import privateAccountForm from '../pages/accNum/privateAccount/privateAccountForm'
import privateAccountView from '../pages/accNum/privateAccount/privateAccountView'

/*基础数据*/
import businessAssortManager from '../pages/basic/businessAssort/businessAssortManager'
import businessAssortForm from '../pages/basic/businessAssort/businessAssortForm'
/*工单分类*/
import workAssortManager from '../pages/basic/workAssort/workAssortManager'
import workAssortForm from '../pages/basic/workAssort/workAssortForm'
/*作业分类*/
import operationAssortManager from '../pages/basic/operationAssort/operationAssortManager'
import operationAssortForm from '../pages/basic/operationAssort/operationAssortForm'
/*业务来源*/
import sourceManager from '../pages/basic/source/sourceManager'
import sourceForm from '../pages/basic/source/sourceForm'

/*维修项目*/
import keeprepairManager from '../pages/basic/keeprepair/keeprepairManager'
import keeprepairForm from '../pages/basic/keeprepair/keeprepairForm'

/*供应商信息*/
import supplierManager from '../pages/basic/supplier/supplierManager'
import supplierForm from '../pages/basic/supplier/supplierForm'
/*发票类型*/
import invoiceManager from '../pages/basic/invoice/invoiceManager'
import invoiceForm from '../pages/basic/invoice/invoiceForm'
/*结算类型*/
import settleAccountManager from '../pages/basic/settleAccount/settleAccountManager'
import settleAccountForm from '../pages/basic/settleAccount/settleAccountForm'
/*客户回访*/
import satisfactionManager from '../pages/basic/satisfaction/satisfactionManager'
import satisfactionForm from '../pages/basic/satisfaction/satisfactionForm'
/*客户投诉*/
import complaintManager from '../pages/basic/complaint/complaintManager'
import complaintForm from '../pages/basic/complaint/complaintForm'
/*维修工单*/
import repairWorkManager from '../pages/basic/repairWork/repairWorkManager'
import repairWorkForm from '../pages/basic/repairWork/repairWorkForm'
import openColourForm from '../pages/basic/repairWork/openColourForm'
import openBrandForm from '../pages/basic/repairWork/openBrandForm'
import openModelForm from '../pages/basic/repairWork/openModelForm'
import saveModelForm from '../pages/basic/repairWork/saveModelForm'
import selectVersion from '../pages/selects/selectVersion'
import saveVersionForm from '../pages/basic/repairWork/saveVersionForm'

/*保险*/
/*车辆信息*/
import carManager from '../pages/basic/insurancePolicy/information/car/carManager'
import carForm from '../pages/basic/insurancePolicy/information/car/carForm'
/*客户信息*/
/*import clientManager from './pages/basic/insurancePolicy/information/client/clientManager'
import clientForm from './pages/basic/insurancePolicy/information/client/clientForm'*/
/*办理人员*/
import handlePersonManager from '../pages/basic/insurancePolicy/information/handlePerson/handlePersonManager'
import handlePersonForm from '../pages/basic/insurancePolicy/information/handlePerson/handlePersonForm'
/*保单信息*/
import policyInformationManager from '../pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationManager'
import policyInformationForm from '../pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationForm'
/*保险公司*/
import insuranceCompanyManager from '../pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyManager'
import insuranceCompanyForm from '../pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyForm'

/* 管理保险公司 */
import insuranceUnitManager from '../pages/insurance/unit/insuranceUnitManager'
import insuranceUnitForm from '../pages/insurance/unit/insuranceUnitForm'

/*财务信息*/
import financialInformationManager from '../pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationManager'
import financialInformationForm from '../pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationForm'
/*客户管理*/
import clientManager from '../pages/insurance/client/clientManager'
import clientForm from '../pages/insurance/client/clientForm'
import selectPlate from '../pages/selects/selectPlate'

/* 增加开户行Form - 增加银行Form */
import openBankForm from '../pages/bankAcc/openBankForm'
import openBankDetailForm from '../pages/bankAcc/openBankDetailForm'

/*商品相关*/
import productManager from '../pages/product/product/productManager'
import productForm from '../pages/product/product/productForm'
import selectProduct from '../pages/product/product/selectProduct'
import modelForm from '../pages/product/model/modelForm'
import selectModel from '../pages/product/model/selectModel'

/* 库存管理 */
import warehouseEntryManager from '../pages/Inventory/warehouseEntryManager'
import warehouseEntryForm from '../pages/Inventory/warehouseEntryForm'
import warehouseEntryView from '../pages/Inventory/warehouseEntryView'
import inStockManager from '../pages/Inventory/inStockManager'
import warehouseExitManager from '../pages/Inventory/warehouseExitManager'
import warehouseExitForm from '../pages/Inventory/warehouseExitForm'
import warehouseExitView from '../pages/Inventory/warehouseExitView'

import selectPage from './selectPage'

/* 手机页面 */
import homeApp from '../views/homeApp.vue'
import testApp from '../pagesApp/testApp.vue'

/* 菜单管理 */
import m_myApprovalManager from '../pagesApp/myApproval/myApprovalManager.vue'

/* 采购计划 */
import m_approvalPurchaseManager from '../pagesApp/purchase/approvalPurchaseManager.vue'
import m_approvalPurchaseView from '../pagesApp/purchase/approvalPurchaseView.vue'

/* 驳回 */
import m_rejectForm from '../pagesApp/common/rejectForm.vue'

/* 移动端 - 测试菜单 */
import m_menu  from '../pagesApp/m_menu'

/* 移动端 - 测试导航菜单 */
import m_menuBar  from '../pagesApp/m_menuBar'
import m_menuBars  from '../pagesApp/m_menuBars'

import m_tab  from '../pagesApp/m_tab'

/* 移动端 - 付款计划 */
import m_myPaymentPlanManager from '../pagesApp/paymentPlan/m_myPaymentPlanManager'
import m_myPaymentPlanView from '../pagesApp/paymentPlan/m_myPaymentPlanView'

import m_finPaymentPlanManager from '../pagesApp/paymentPlan/m_finPaymentPlanManager'
import m_finPaymentPlanView from '../pagesApp/paymentPlan/m_finPaymentPlanView'
/* 移动端 - 付款申请 */
import m_paymentApplyManager from '../pagesApp/paymentApply/m_paymentApplyManager'
import m_paymentApplyView from '../pagesApp/paymentApply/m_paymentApplyView'
import m_paymentApplyForm from '../pagesApp/paymentApply/m_paymentApplyForm'
import m_paymentApplyTosub from '../pagesApp/paymentApply/m_paymentApplyTosub'
import m_paymentApplySubed from '../pagesApp/paymentApply/m_paymentApplySubed'

import m_finPaymentApplyManager from '../pagesApp/paymentApply/m_finPaymentApplyManager'
import m_finPaymentApplyView from '../pagesApp/paymentApply/m_finPaymentApplyView'

/* 移动端 - 报销申请 */
import m_reimbursementManager from '../pagesApp/reimbursement/m_reimbursementManager'
import m_reimbursementView from '../pagesApp/reimbursement/m_reimbursementView'

import m_finReimbursementManager from '../pagesApp/reimbursement/m_finReimbursementManager'
import m_finReimbursementView from '../pagesApp/reimbursement/m_finReimbursementView'

/* 移动端 - 资金图表动态 - 资金动态*/
import m_fundDynamicsChartView from '../pagesApp/fundDynamics/m_fundDynamicsChartView'
import m_fundDynamicsView from '../pagesApp/fundDynamics/m_fundDynamicsView'
/* 移动端 - 收支明细*/
import m_bankDetailCashierView from '../pagesApp/bankDetailCashier/bankDetailCashierView'
Vue.use(Router)
