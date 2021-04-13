import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import desktop from './components/desktop'
import login from './pages/login'

Vue.use(Router)
/*设置岗位工资*/
import wagePostManager from './pages/staff/wagePost/wagePostManager.vue'
import wagePostView from './pages/staff/wagePost/wagePostView.vue'
import wagePostForm from './pages/staff/wagePost/wagePostForm.vue'
/*设置花费补助*/
import telephoneSubsidyManager from './pages/staff/telephoneSubsidy/telephoneSubsidyManager.vue'
import telephoneSubsidyView from './pages/staff/telephoneSubsidy/telephoneSubsidyView.vue'
import telephoneSubsidyForm from './pages/staff/telephoneSubsidy/telephoneSubsidyForm.vue'
/*设置基本工资*/
import basicWageManager from './pages/staff/basicWage/basicWageManager.vue'
import basicWageView from './pages/staff/basicWage/basicWageView.vue'
import basicWageForm from './pages/staff/basicWage/basicWageForm.vue'
/*设置工龄工资*/
import wageWorkingManager from './pages/staff/wageWorking/wageWorkingManager.vue'
import wageWorkingView from './pages/staff/wageWorking/wageWorkingView.vue'
import wageWorkingForm from './pages/staff/wageWorking/wageWorkingForm.vue'

/*设定业绩*/
import repairTargerManager from './pages/repairTarger/repairTargerManager.vue'
import repairTargerView from './pages/repairTarger/repairTargerView.vue'
import repairTargerForm from './pages/repairTarger/repairTargerForm.vue'




/*员工档案*/
import employeeFilesManager from './pages/staff/employeeFiles/employeeFilesManager.vue'
import employeeFilesView from './pages/staff/employeeFiles/employeeFilesView.vue'
import employeeFilesForm from './pages/staff/employeeFiles/employeeFilesForm.vue'
import staffQuitForm from './pages/staff/employeeFiles/staffQuitForm.vue'
import staffQuitView from './pages/staff/employeeFiles/staffQuitView.vue'
/*设置五险百分比*/
import fiveInsurancesManager from './pages/staff/fiveInsurances/fiveInsurancesManager.vue'
import fiveInsurancesView from './pages/staff/fiveInsurances/fiveInsurancesView.vue'
import fiveInsurancesForm from './pages/staff/fiveInsurances/fiveInsurancesForm.vue'
/*设置养老基数*/
import fiveInsurancesBaseManager from './pages/staff/fiveInsurancesBase/fiveInsurancesBaseManager.vue'
import fiveInsurancesBaseForm from './pages/staff/fiveInsurancesBase/fiveInsurancesBaseForm.vue'
import fiveInsurancesBaseView from './pages/staff/fiveInsurancesBase/fiveInsurancesBaseView.vue'

/*短信模板*/
import smsTemplateForm from './pages/sms/template/smsTemplateForm.vue'
import smsTemplateManager from './pages/sms/template/smsTemplateManager.vue'
/*短信消息*/
import smsMessageForm from './pages/sms/message/smsMessageForm.vue'
import smsMessageManager from './pages/sms/message/smsMessageManager.vue'

/*财务分析*/
import bankDetailAnalysis from './pages/bankDetail/bankDetailAnalysis.vue'
import bankDetailAnalysisExecl from './pages/bankDetail/bankDetailAnalysisExecl.vue'

/*字典*/
import dic25 from './pages/common/dic25'
import dic16 from './pages/common/dic16'
import dicManager from './pages/common/dicManager'
import dictionariesManager from './pages/common/dictionariesManager'
import dicView from './pages/common/dicView'

/*销项税*/
import outPutTaxView from './pages/tax/outPutTax/outPutTaxView.vue'
import outPutTaxManager from './pages/tax/outPutTax/outPutTaxManager.vue'

/*进项税*/
import inputTaxForm from './pages/tax/inputTax/inputTaxForm.vue'
import inputTaxView from './pages/tax/inputTax/inputTaxView.vue'
import inputTaxManager from './pages/tax/inputTax/inputTaxManager.vue'
import authenticationDate from './pages/tax/inputTax/authenticationDate.vue'
import deduction from './pages/tax/inputTax/deduction.vue'
import deductionDateAndMoney from './pages/tax/inputTax/deductionDateAndMoney.vue'

/*发票抬头*/
import invoiceRiseForm from './pages/tax/invoiceRise/invoiceRiseForm.vue'
import invoiceRiseManager from './pages/tax/invoiceRise/invoiceRiseManager.vue'
import invoiceRiseView from './pages/tax/invoiceRise/invoiceRiseView.vue'
import approvalInvoiceRiseManager from './pages/tax/invoiceRise/approvalInvoiceRiseManager.vue'

/*扫码页面*/
import scanCode from './pages/scanCode/scanCode'

/* 审批通过 留言 */
import approvalMessage from './pages/common/approvalMessage'
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


/*销户*/
import accountCancellation from './pages/accNum/publicAccount/accountCancellation.vue'


/* 处理图片 */
import handleImageForm from './pages/common/handleImageForm.vue'

/* 驳回理由 */
import rejectReason from './pages/common/rejectReason'

/*新的审批理由页面*/
import springBootApprovalMessage from './pages/common/springBootApprovalMessage'
import springBootRejectReason from './pages/common/springBootRejectReason'

import passMessage from './pages/common/passMessage'
import gainsayMessage from './pages/common/gainsayMessage'

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

/*配置中心*/
import configManager from './pages/config/configManager.vue'
import configForm from './pages/config/configForm.vue'

/*项目管理*/
import projectManager from './pages/project/projectManager.vue'
import projectForm from './pages/project/projectForm.vue'
import projectDetailForm from './pages/project/projectDetailForm.vue'

/*审批流程管理*/
import approveFlowsManager from './pages/approveFlows/approveFlowsManager.vue'
import approveFlowsForm from './pages/approveFlows/approveFlowsForm.vue'
import approveFlowsDetailForm from './pages/approveFlows/approveFlowsDetailForm.vue'

/*人员标签*/
import personTagManager from './pages/personTag/personTagManager.vue'
import personTagForm from './pages/personTag/personTagForm.vue'
import selectPersonTag from './pages/personTag/selectPersonTag.vue'
/*开票公司白名单*/
import invoicUnitWhitelistManager from './pages/invoicUnitWhitelist/invoicUnitWhitelistManager.vue'
import invoicUnitWhitelistForm from './pages/invoicUnitWhitelist/invoicUnitWhitelistForm.vue'

/*审批代理*/
import approveProxyManager from './pages/approveProxy/approveProxyManager.vue'
// import approveProxyForm from './pages/approveProxy/approveProxyForm.vue'

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

/*应收账款明细*/
import receivableCenterView from './pages/receivableCenter/receivableCenterView.vue'


/* 发票功能 */
import invoiceTilingManager from './pages/invoice/invoiceTilingManager'
import invoiceListManager from './pages/invoice/invoiceListManager'
import invoiceWarehouManager from './pages/invoice/invoiceWarehouManager'
import addInvoiceNumForm from './pages/invoice/addInvoiceNumForm'
import invoiceWarehouFrom from './pages/invoice/invoiceWarehouFrom'
import selectInvoiceDetail from './pages/selects/selectInvoiceDetail'

import SelectInvoiceRise from './pages/selects/selectInvoiceRise'

import toVoidInvoice from './pages/invoice/invoiceOpera/toVoidInvoice'
import toVoidInvoiceMore from './pages/invoice/invoiceOpera/toVoidInvoiceMore'
import invoiceView from './pages/invoice/invoiceView'
// import unitInvoiceinitForm from './pages/invoice/unitInvoiceinitForm'


/*开发票*/
import openInvoiceManager from './pages/openInvoice/openInvoiceManager'
import openInvoiceForm from './pages/openInvoice/openInvoiceForm'
import openInvoiceView from './pages/openInvoice/openInvoiceView'
import openInvoiceTrial from './pages/openInvoice/openInvoiceTrial'
import approvalOpenInvoiceManager from './pages/openInvoice/approvalOpenInvoiceManager'
import openInvoiceFinManager from './pages/openInvoice/openInvoiceFinManager'
import openInvoiceFinForm from './pages/openInvoice/openInvoiceFinForm'
import openInvoiceToVoid from './pages/openInvoice/openInvoiceToVoid'
import openInvoiceVehicleForm from './pages/openInvoice/openInvoiceVehicleForm'
import openInvoiceTrialVehicle from './pages/openInvoice/openInvoiceTrialVehicle'
import openInvoiceTrialOther from './pages/openInvoice/openInvoiceTrialOther'
import openInvoiceToVoidInvoice from './pages/openInvoice/openInvoiceToVoidInvoice'
import openInvoiceManagerAll from './pages/openInvoice/openInvoiceManagerAll'
import selectOpenInvoice from './pages/selects/selectOpenInvoice'
import selectsInvoiceSignatureForm from './pages/selects/selectsInvoiceSignatureForm'

import printingOpenInvoice from './pages/openInvoice/printingOpenInvoice'


import invoiceManager from './pages/invoicelookUp/invoiceManager'

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
import finReimbursementDetailManager from './pages/reimbursement/finReimbursementDetailManager'
import reimbursementViewForm from './pages/reimbursement/finReimbursementViewForm'
import reimbursementViewDetailForm from './pages/reimbursement/finReimbursementViewDetailForm'
import reimbursementFormView from './pages/reimbursement/myReimbursementFormView'
import reimbursementDetailFormView from './pages/reimbursement/myReimbursementDetailFormView'

import reimbursementReconDetailForm from './pages/reimbursement/reimbursementReconDetailForm'



/* 客户返利 */
import BankDetailRebateManager from './pages/budgetDetail/BankDetailRebate/BankDetailRebateManager'
import BankDetailRebateDetail from './pages/budgetDetail/BankDetailRebate/BankDetailRebateDetail'

/* 散户维修费 */
import BankDetailRepairManager from './pages/budgetDetail/BankDetailRebate/BankDetailRepairManager'
import BankDetailInsuranceAll from './pages/budgetDetail/BankDetailRebate/BankDetailInsuranceAll'

/* 续保 */
import bankDetailRenewalManager from './pages/budgetDetail/BankDetailRebate/bankDetailRenewalManager'

/* 保险手续费 */
import BankDetailCommissionManager from './pages/budgetDetail/BankDetailRebate/BankDetailCommissionManager'

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

//税号管理
import taxManager from './pages/tax/tax/taxManager'
import taxFrom from './pages/tax/tax/taxFrom'
import taxView from './pages/tax/tax/taxView'
import openInvoiceNum from './pages/tax/tax/openInvoiceNum'
import selectTax from './pages/selects/selectTax'


/*用户管理*/
import usersManager from './pages/users/usersManager'
import usersForm from './pages/users/usersForm'
import usersUpdatePwdManager from './pages/users/usersUpdatePwdManager'

/* 选择页面 */
import selectDic from './pages/selects/selectDic'
import selectCoupon from './pages/selects/selectCoupon'
import dicForm089 from './pages/selects/dic/dicForm089'
import dicForm090 from './pages/selects/dic/dicForm090'
import dicForm091 from './pages/selects/dic/dicForm091'
import selectPublicAccount from './pages/selects/selectPublicAccount'
import selectPrivateAccount from './pages/selects/selectPrivateAccount'
import selectUnit from './pages/selects/selectUnit'
import selectPaymentApplyDetail from './pages/selects/selectPaymentApplyDetail'
import selectBankDetail from './pages/selects/selectBankDetail'
import selectNumber from './pages/selects/selectNumber'
import selectPlate from './pages/selects/selectPlate'
import selectPerson from './pages/selects/selectPerson'
import selectStock from './pages/selects/selectStock'
import selectPlanDate from './pages/selects/selectPlanDate'
import selectDepartment from './pages/selects/selectDepartment'
import selectVersion from './pages/selects/selectVersion'
import selectProduct from './pages/product/product/selectProduct'
import selectModel from './pages/selects/selectModel'
import selectProductModel from './pages/product/model/selectProductModel'
import selectFormPlate from './pages/insurance/billing/selectFormPlate'
import selectPrint from './pages/selects/selectPrint'
import selectLocation from './pages/selects/selectLocation'
import selectAccount from './pages/selects/selectAccount'
import selectPart from './pages/selects/selectPart'
import selectProcessServices from './pages/selects/selectProcessServices'
import selectService from './pages/selects/selectService'
import selectMaterials from './pages/selects/selectMaterials'
import selectPeopleManagement from './pages/selects/selectPeopleManagement'
import selectUnitInvoice from './pages/selects/selectUnitInvoice'
import selectStoredCard from './pages/selects/selectStoredCard'
import selectMonthlyAccount from './pages/selects/selectMonthlyAccount'
import selectDeposit from './pages/selects/selectDeposit'
import selectPayDeposit from './pages/selects/selectPayDeposit'
import selectOfficialWorkOrder from './pages/selects/selectOfficialWorkOrder'
import selectContract from './pages/selects/selectContract'
/* 单位 - 联系人 */
import unitManager from './pages/unit/unitManager'
import addUnitForm from './pages/unit/addUnitForm'
import unitInvoiceFrom from './pages/unit/unitInvoiceFrom'
import unitInvoiceView from './pages/unit/unitInvoiceView'
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
import exercise from './pages/cartogram/exercise'
import selectPage from './test/selectPage'
import testApp from './pagesApp/testApp.vue'


/* 采购 */
import myPurchaseManager from './pages/purchase/myPurchaseManager'
import myPurchaseForm from './pages/purchase/myPurchaseForm'
import myPurchaseView from './pages/purchase/myPurchaseView'

import approvalPurchaseManager from './pages/purchase/approvalPurchaseManager'
import approvalPurchaseView from './pages/purchase/approvalPurchaseView'

import finPurchaseManager from './pages/purchase/finPurchaseManager'

import awaitPurchaseManager from './pages/purchase/awaitPurchaseManager'
import awaitPurchaseView from './pages/purchase/awaitPurchaseView'
import purchasePersonManager from './pages/purchase/purchasePersonManager'
import purchasePersonForm from './pages/purchase/purchasePersonForm'

/*pos账户*/
import finPosAccountManager from './pages/posAccount/finPosAccountManager'
import finPosAccountDetailsForm from './pages/posAccount/finPosAccountDetailsForm'
import finPosAccountDetailForm from './pages/posAccount/finPosAccountDetailForm'
import finPosAccountDetailManager from './pages/posAccount/finPosAccountDetailManager'
import finPosAccountDetailView from './pages/posAccount/finPosAccountDetailView'
/* 流程管理 */
import flowsManager from './pages/flows/flowsManager'
import flowsForm from './pages/flows/flowsForm'
import flowDetailForm from './pages/flows/flowDetailForm'

/*添加收支明细*/
import bankDetailForm from './pages/bankDetail/bankDetailForm'
import bankDetailCashierForm from './pages/bankDetailCashier/bankDetailCashierForm'
import bankDetailCashierManager from './pages/bankDetailCashier/bankDetailCashierManager'

/*财务分析*/

import bankDetailAnalyView from './pages/bankDetail/bankDetailAnalyView'


/*应收账款添加收支明细*/
import receivableBankDetailForm from './pages/bankDetail/receivableBankDetailForm'

/* 审批流程定制 */
import approvalPersonaliseManager from './pages/approvalPriority/approvalPersonaliseManager'
import approvalPersonaliseForm from './pages/approvalPriority/approvalPersonaliseForm'

/* 公司优先级 */
import approvalPriorityManager from './pages/approvalPriority/approvalPriorityManager'
import approvalPriorityForm from './pages/approvalPriority/approvalPriorityForm'
/*优惠活动审批制定*/
import promotionsApproveManager from './pages/approvalPriority/promotionsApproveManager'
import promotionsApproveForm from './pages/approvalPriority/promotionsApproveForm'

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
import conductFinEntry from './pages/conductFin/conductFinEntry'
import bankProductInterest from './pages/conductFin/bankProductInterest'

/*移动端绑定账号 - 正确 - 错误 - 已确定登陆 - 取消登录 - 用户不存在 - 扫码登录页面*/
import bindingManager from './appPages/appLogin/bindingManager'
import correct from './appPages/promptmessage/correct'
import failure from './appPages/promptmessage/failure'
import loginScSuccess from './appPages/appLogin/landing/loginScSuccess'
import loginScCancel from './appPages/appLogin/landing/loginScCancel'
import loginInexistence from './appPages/appLogin/landing/loginInexistence'
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
import claimsListView from './pages/insurance/claims/claimsListView'
import claimsOpenInvoice from './pages/insurance/claims/claimsOpenInvoice'
import selectBankDetailInsurance from './pages/selects/selectBankDetailInsurance'


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
import insuranceUnitUpload from './pages/insurance/unit/insuranceUnitUpload'
import insuranceUnitUploadView from './pages/insurance/unit/insuranceUnitUploadView'
import insuranceBankDetailForm from './pages/insurance/unit/insuranceBankDetailForm'
import contractForm from './pages/insurance/unit/contractForm'

/*管理层跟踪信息*/
import bossTrackManager from './pages/insurance/bossTrack/bossTrackManager'
import bossTrackDetailsManager from './pages/insurance/bossTrack/bossTrackDetailsManager'
import followApprovalManager from './pages/insurance/bossTrack/followApprovalManager'
import bossPerfectedManager from './pages/insurance/bossTrack/bossPerfectedManager'
import bossPerfectedView from './pages/insurance/bossTrack/bossPerfectedView'
import bossPerfectedForm from './pages/insurance/bossTrack/bossPerfectedForm'
import importFrom from './pages/insurance/bossTrack/importFrom'

/* 保险给HP返利*/
import cashGiveHPManager from './pages/insurance/cashGiveHP/cashGiveHPManager'
import cashGiveHPForm from './pages/insurance/cashGiveHP/cashGiveHPForm'
import cashGiveForm from './pages/insurance/cashGiveHP/cashGiveForm'
/*保险优惠政策*/
import promotionsManager from './pages/insurance/promotions/promotionsManager'
import promotionsForm from './pages/insurance/promotions/promotionsForm'
import promotionsView from './pages/insurance/promotions/promotionsView'
import selectPromotions from './pages/selects/selectPromotions'
import promotionsAppManager from './pages/insurance/promotions/promotionsAppManager'

/*审批发票抬头*/

import invoicelookUpManager from './pages/invoicelookUp/invoicelookUpManager'
/*增开保险发票*/
import insuranceInvoiceManager from './pages/insurance/insuranceInvoice/insuranceInvoiceManager'
import selectInsuranceInvoice from './pages/insurance/insuranceInvoice/selectInsuranceInvoice'
import insuranceInvoiceDetails from './pages/insurance/insuranceInvoice/insuranceInvoiceDetails'
import selectInvoiceView from './pages/insurance/insuranceInvoice/selectInvoiceView'

/*财务信息*/
import financialInformationManager from './pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationManager'
import financialInformationForm from './pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationForm'

/*客户管理*/
import clientManager from './pages/insurance/client/clientManager'
import clientForm from './pages/insurance/client/clientForm'
import clientView from './pages/insurance/client/clientView'
import quotationFrom from './pages/insurance/client/quotationFrom'
import templateCheForm from './pages/insurance/client/templateCheForm'
import templateShangYeFrom from './pages/insurance/client/templateShangYeFrom'
import templateFourForm from './pages/insurance/client/templateFourForm'
import templateFiveForm from './pages/insurance/client/templateFiveForm'

//客户管理_售后业务
import clientTwoManager from './pages/insurance/client/clientTwo/clientTwoManager'


/* 增加开户行Form - 增加银行Form */
import openBankForm from './pages/bankAcc/openBankForm'
import openBankDetailForm from './pages/bankAcc/openBankDetailForm'

/*商品相关*/
import productManager from './pages/product/product/productManager'
import productForm from './pages/product/product/productForm'
import modelForm from './pages/product/model/modelForm'


/*库位管理*/
import stockPositionManager from './pages/stockPosition/stockPositionManager.vue'
import stockPositionForm from './pages/stockPosition/stockPositionForm.vue'
import stockPositionView from './pages/stockPosition/stockPositionView.vue'

import stockInManager from './pages/stockIn/stockInManager.vue'
import stockInForm from './pages/stockIn/stockInForm.vue'
import stockInDetailForm from './pages/stockIn/stockInDetailForm.vue'
import stockInView from './pages/stockIn/stockInView.vue'
import stockInOperateManager from './pages/stockIn/stockInOperateManager.vue'
import stockinInfoManager from './pages/stockIn/stockinInfoManager.vue'
import stockinInfoView from './pages/stockIn/stockinInfoView.vue'

/*库存盘点*/
import stockInventoryManager from './pages/stockIn/stockInventory/stockInventoryManager.vue'
import stockInventoryFrom from './pages/stockIn/stockInventory/stockInventoryFrom.vue'
import stockInventoryView from './pages/stockIn/stockInventory/stockInventoryView.vue'


/* 库存管理 */
import warehouseEntryManager from './pages/Inventory/warehouseEntryManager'
import warehouseEntryForm from './pages/Inventory/warehouseEntryForm'
import warehouseEntryView from './pages/Inventory/warehouseEntryView'

import inStockManager from './pages/Inventory/inStockManager'

import warehouseExitManager from './pages/Inventory/warehouseExitManager'
import warehouseExitForm from './pages/Inventory/warehouseExitForm'
import warehouseExitView from './pages/Inventory/warehouseExitView'
/*日常办公*/
import courierCompanyManager from './pages/dailyOffice/courierCompany/courierCompanyManager'
import courierCompanyForm from './pages/dailyOffice/courierCompany/courierCompanyForm'
import selectExpressNot from './pages/dailyOffice/courierCompany/selectExpressNot'
import expressReconciliationForm from './pages/dailyOffice/courierCompany/expressReconciliationForm'
import courierCompanyDetailsView from './pages/dailyOffice/courierCompany/courierCompanyDetailsView'
import courierCompanyView from './pages/dailyOffice/courierCompany/courierCompanyView'
import storedCardForm from './pages/dailyOffice/courierCompany/storedCardForm'
import rechargeRecordView from './pages/dailyOffice/courierCompany/rechargeRecordView'
import warnManager from './pages/dailyOffice/warn/warnManager'
import myWarnManager from './pages/dailyOffice/myWarn/myWarnManager'
import depositManager from './pages/dailyOffice/deposit/depositManager'
import payDepositManager from './pages/dailyOffice/payDeposit/payDepositManager'

/*合同管理*/
import contractManager from './pages/dailyOffice/contract/contractManager'
import contractsignForm from './pages/dailyOffice/contract/contractsignForm'
import contractsignView from './pages/dailyOffice/contract/contractsignView'
/*旧件回收*/
import coreRecyclingManager from './pages/stockIn/coreRecycling/coreRecyclingManager.vue'
import coreRecyclingFrom from './pages/stockIn/coreRecycling/coreRecyclingFrom.vue'
import coreWarehouseManager from './pages/stockIn/coreWarehouse/coreWarehouseManager.vue'
import coreWarehouseView from './pages/stockIn/coreWarehouse/coreWarehouseView.vue'
import RecoveryApprovalManager from './pages/stockIn/coreRecyclingApproval/RecoveryApprovalManager'


import warnForm from './pages/dailyOffice/warn/warnForm'
import warnDetailform from './pages/dailyOffice/warn/warnDetailform'
import warnTimeoutSelect from './pages/dailyOffice/warn/warnTimeoutSelect'
import warnFormView from './pages/dailyOffice/warn/warnFormView'
import myWarnForm from './pages/dailyOffice/myWarn/myWarnForm'
import depositForm from './pages/dailyOffice/deposit/depositForm'
import depositView from './pages/dailyOffice/deposit/depositView'
import payDepositForm from './pages/dailyOffice/payDeposit/payDepositForm'
import payDepositView from './pages/dailyOffice/payDeposit/payDepositView'
import receipt from './pages/dailyOffice/payDeposit/receipt'

import expressDeliveryManager from './pages/dailyOffice/expressDelivery/expressDeliveryManager'
import expressDeliveryForm from './pages/dailyOffice/expressDelivery/expressDeliveryForm'
import expressDeliveryView from './pages/dailyOffice/expressDelivery/expressDeliveryView'
import expressDeliveryBasic from './pages/dailyOffice/expressDelivery/expressDeliveryBasic'
import expressDeliverySend from './pages/dailyOffice/expressDelivery/expressDeliverySend'
import expressDeliveryRecipient from './pages/dailyOffice/expressDelivery/expressDeliveryRecipient'
import expressDeliveryItems from './pages/dailyOffice/expressDelivery/expressDeliveryItems'
import expressDeliveryCost from './pages/dailyOffice/expressDelivery/expressDeliveryCost'
import expressDeliveryConfirm from './pages/dailyOffice/expressDelivery/expressDeliveryConfirm'
import selectDoes from './pages/dailyOffice/expressDelivery/selectDoes'
import cancelAppointment from './pages/dailyOffice/expressDelivery/cancelAppointment'
import myAdminExpressView from './pages/dailyOffice/expressDelivery/myAdminExpressView'

import myExpressManager from './pages/dailyOffice/myExpress/myExpressManager'
import expressApprovalManager from './pages/dailyOffice/myExpress/expressApprovalManager'
import expressApprovalView from './pages/dailyOffice/myExpress/expressApprovalView'
import myExpressForm from './pages/dailyOffice/myExpress/myExpressForm'
import myExpressView from './pages/dailyOffice/myExpress/myExpressView'
/*重要物品外出登记*/
import myArticleRegistrationManager from './pages/dailyOffice/myArticleRegistration/myArticleRegistrationManager'
import reimbursementLlimitManager from './pages/dailyOffice/myArticleRegistration/reimbursementLlimitManager'
import myArticleRegistrationForm from './pages/dailyOffice/myArticleRegistration/myArticleRegistrationForm'
import reimbursementLlimitForm from './pages/dailyOffice/myArticleRegistration/reimbursementLlimitForm'
import reimbursementLlimitView from './pages/dailyOffice/myArticleRegistration/reimbursementLlimitView'

import insurancePolicyView from './pages/dailyOffice/myExpress/insurancePolicyView'
import addressbookView from './pages/dailyOffice/myExpress/addressbookView'




/* 手机页面 */
import homeApp from './views/homeApp.vue'

/* 菜单管理 ->分类 ->消息 ->我的 */
import m_myApprovalManager from './pagesApp/myApproval/myApprovalManager.vue'
import newsManager from './pagesApp/myApproval/newsManager.vue'
import mineManager from './pagesApp/myApproval/mineManager.vue'

/* 采购计划 */
import m_approvalPurchaseManager from './pagesApp/purchase/m_approvalPurchaseManager.vue'
import m_approvalPurchaseView from './pagesApp/purchase/m_approvalPurchaseView.vue'



/* 统计图->保险理赔->支付续保费->支付客户返利->散户维修费->保险手续费->资金日报->业务回款全部维修费用->代付保险费->代收保险费  */
import insuranceCartogram from './pages/cartogram/insuranceCartogram'
import renewPremiumCartogram from './pages/cartogram/renewPremiumCartogram'
import rebateCartogram from './pages/cartogram/rebateCartogram'
import maintenanceCostCartogram from './pages/cartogram/maintenanceCostCartogram'
import BankDetailCommissionCartogram from './pages/cartogram/BankDetailCommissionCartogram'
import cashJournalCartogram from './pages/cartogram/cashJournalCartogram'
import allMaintenanceCartogram from './pages/cartogram/allMaintenanceCartogram'
import payInsuranceCartogram from './pages/insurance/paymentInsurance/payInsuranceCartogram'
import receiveInsuranceCartogram from './pages/insurance/receiveInsurance/receiveInsuranceCartogram'

import expressCartogram from './pages/cartogram/expressCartogram'


import reimbursementCartogram from './pages/cartogram/reimbursementCartogram'
import myreimbursementTwoCartogram from './pages/cartogram/myreimbursementTwoCartogram'

import reimbursementViewCartogram from './pages/cartogram/reimbursementViewCartogram'

import invoiceCartogram from './pages/cartogram/invoiceCartogram'//开票通知统计图

import capitalTrendsTodayCartogram from './pages/cartogram/capitalTrendsTodayCartogram'


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

/* 移动端 - 备用金 */
import m_approvalPrettyCashsManager from './pagesApp/prettyCashs/m_approvalPrettyCashsManager'
import m_approvalPrettyCashsView from './pagesApp/prettyCashs/m_approvalPrettyCashsView'

import m_finPrettyCashsManager from './pagesApp/prettyCashs/m_finPrettyCashsManager'
import m_finPrettyCashsView from './pagesApp/prettyCashs/m_finPrettyCashsView'

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
/*退保收银*/
import surrenderCashierManager from './pages/cashier/surrenderCashierManager'
/* 保险审批 */
import approvalInsuranceManager from './pages/InsuranceApproval/approvalInsuranceManager'
import approvalInsuranceView from './pages/InsuranceApproval/approvalInsuranceView'
import approvalPassMessage from './pages/InsuranceApproval/approvalPassMessage'


/* 保险驳回 */
import insuranceRejectReason from './pages/InsuranceApproval/insuranceRejectReason'

/* 车辆管理 */
import vehicleManager from './pages/basic/vehicle/vehicleManager'
import vehicleForm from './pages/basic/vehicle/vehicleForm'
import vehicleView from './pages/basic/vehicle/vehicleView'
import addTestForm from './pages/basic/vehicle/addTestForm'

//车辆管理_售后业务
import vehicleTwoManager from './pages/basic/vehicleTwo/vehicleTwoManager'

import saveModelForm from './pages/basic/vehicle/saveModelForm'
import saveVersionForm from './pages/basic/vehicle/saveVersionForm'

/* 跟踪信息 */
import trackManager from './pages/basic/track/trackManager'
import trackForm from './pages/basic/track/trackForm'
import trackView from './pages/basic/track/trackView'
import trackFormView from './pages/basic/track/trackFormView'
import trackDetailsView from './pages/basic/trackDetails/trackDetailsView'
import trackDetailsManager from './pages/basic/trackDetails/trackDetailsManager'
import perfectedManager from './pages/basic/track/perfectedManager'
import perfectedForm from './pages/basic/track/perfectedForm'


/* 出单管理 */
import billingManager from './pages/insurance/billing/billingManager'
import billingForm from './pages/insurance/billing/billingForm'
import billingFile from './pages/insurance/billing/billingFile'
import billingView from './pages/insurance/billing/billingView'
import billingApprovalApplyForm from './pages/insurance/billing/billingApprovalApplyForm'

import finBillingManager from './pages/insurance/finBilling/finBillingManager'

/* 保单管理 */
import policyManager from './pages/insurance/policy/policyManager'
import policyView from './pages/insurance/policy/policyView'
import surrenderView from './pages/insurance/policy/surrenderView'
import poNumbering from './pages/insurance/policy/poNumbering'
import poNumberView from './pages/insurance/policy/poNumberView'
import policyExpectedView from './pages/insurance/policy/policyExpectedView'

/* 保险业务补录 */
import insuranceMakeUpManager from './pages/insurance/makeUp/insuranceMakeUpManager'
import insuranceMakeUpForm from './pages/insurance/makeUp/insuranceMakeUpForm'
import insuranceMakeUpAccountForm from './pages/insurance/makeUp/insuranceMakeUpAccountForm'


/* 应收账款*/
import accountsReceivableManager from './pages/insurance/accountsReceivable/accountsReceivableManager'
import accountsReceivableView from './pages/insurance/accountsReceivable/accountsReceivableView'
import accountExpectedView from './pages/insurance/accountsReceivable/accountExpectedView'
import unitDatailsView from './pages/insurance/accountsReceivable/accountsDatailsView'

/*财务管理=>资金=>应收账款*/
import receivableManager from './pages/insurance/accountsReceivable/receivableManager'
import receivableForm from './pages/insurance/accountsReceivable/receivableForm'
import receivableView from './pages/insurance/accountsReceivable/receivableView'
import receivableForceWriteOffFrom from './pages/insurance/accountsReceivable/receivableForceWriteOffFrom'
import selectReceivableForceWriteOff from './pages/selects/selectReceivableForceWriteOff'
import ReceivableForceWriteOffManager from './pages/insurance/accountsReceivable/ReceivableForceWriteOffManager'


/* 工单 */
import  workOrderManager from  './pages/workOrder/workOrderManager'
import  workOrderForm from  './pages/workOrder/workOrderForm'
import  workOrderView from  './pages/workOrder/workOrderView'
import  workOrderFlowChartForm  from './pages/workOrder/workOrderFlowChartForm'
import  lossAssessmentForm from './pages/workOrder/lossAssessmentForm'
import  lossAssessmentDetailsForm from './pages/workOrder/lossAssessmentDetailsForm'
import  workOrderDetailsManagerView from './pages/workOrder/workOrderDetailsManagerView'
import  workOrderAddDetailsForm from './pages/workOrder/workOrderAddDetailsForm'
import  workOrderMaterialListManagerView from './pages/workOrder/workOrderMaterialListManagerView'
import  workOrderMateriaListForm from './pages/workOrder/workOrderMateriaListForm'
import  workOrderStockOutManagerView from  './pages/workOrder/workOrderStockOutManagerView'
import  workOrderServiceView from './pages/workOrder/workOrderServiceView'
import  workOrderCheckoutManagerView from './pages/workOrder/workOrderCheckoutManagerView'
import  workOrderProcessForm from './pages/workOrder/workOrderProcessForm'
import  workOrderSettleAccountsForm from './pages/workOrder/workOrderSettleAccountsForm'
import  workOrderStatementForm from './pages/workOrder/workOrderStatementForm'
import  workOrderSummarizingForm  from './pages/workOrder/workOrderSummarizingForm'
import  workOrderCheckoutAffirmManager  from './pages/workOrder/workOrderCheckoutAffirmManager'
import  receptionForm  from './pages/workOrder/reception/receptionForm'
import  receptionView  from './pages/workOrder/reception/receptionView'
import  receptionMaterialsForm from './pages/workOrder/reception/receptionMaterialsForm'
import  payAreturnVisitForm from './pages/workOrder/reception/payAreturnVisitForm'
import  receptionManager  from './pages/workOrder/reception/receptionManager'
import  collectionOfDataForm  from './pages/workOrder/reception/collectionOfDataForm'
import  collectionOfDataView  from './pages/workOrder/reception/collectionOfDataView'
import  teamOrGroupForm from  './pages/workOrder/teamOrGroup/teamOrGroupForm'
import  teamOrGroupManager  from './pages/workOrder/teamOrGroup/teamOrGroupManager'
import  teamOrGroupManager1  from './pages/workOrder/teamOrGroup/teamOrGroupManager1'
import  teamOrGroupManager2  from './pages/workOrder/teamOrGroup/teamOrGroupManager2'
import  teamOrGroupManager3  from './pages/workOrder/teamOrGroup/teamOrGroupManager3'
import  teamOrGroupManager4  from './pages/workOrder/teamOrGroup/teamOrGroupManager4'
import  sheetMetalRepairForm  from './pages/workOrder/sheetMetalRepairForm'
import  workOrderToBeConfirmedView  from './pages/workOrder/workOrderToBeConfirmedView'
import  workOrderReasonsForFefusal from './pages/workOrder/reception/workOrderReasonsForFefusal'
import  selectWorkOrder from './pages/workOrder/selectWorkOrder'
import  workOrderUploadFile from './pages/workOrder/workOrderUploadFile'
import  workOrderAllocationForm from './pages/workOrder/workOrderAllocationForm'
import  workOrderInvoiceManager from './pages/workOrder/workOrderInvoiceManager'
import  workOrderCashierDeskManager from './pages/workOrder/cashierDesk/workOrderCashierDeskManager'
import  workOrderCashierDeskForm from './pages/workOrder/cashierDesk/workOrderCashierDeskForm'
import  workOrderCartogram from './pages/cartogram/workOrderCartogram'
import  selectWorkOrderPlate from './pages/workOrder/selectWorkOrderPlate'
import  selectWorkOrderClient from './pages/workOrder/select/selectWorkOrderClient'
import  selectWorkOrderMaterials from './pages/workOrder/select/selectWorkOrderMaterials'

import  selectWorkOrderInsurance from './pages/workOrder/select/selectWorkOrderInsurance'

import  workOrderClaimDataForm from './pages/workOrder/workOrderClaimDataForm'


/*工单推修管理*/
import  pushRepairManager from './pages/workOrder/pushRepair/pushRepairManager'
import  pushRepairRecordManager from './pages/workOrder/pushRepair/pushRepairRecordManager'
import  pushRepairForm from './pages/workOrder/pushRepair/pushRepairForm'
import  pushRepairDetailForm from './pages/workOrder/pushRepair/pushRepairDetailForm'
import  pushRepairAddPersonForm from './pages/workOrder/pushRepair/pushRepairAddPersonForm'
import  pushRepairSelect from './pages/workOrder/pushRepair/pushRepairSelect'
import  pushRepairAddForm from './pages/workOrder/pushRepair/pushRepairAddForm'
import  pushPersonSelect from './pages/workOrder/pushRepair/pushPersonSelect'
import  pushCorporationSelect from './pages/workOrder/pushRepair/pushCorporationSelect'
import  addPushCorporationForm from './pages/workOrder/pushRepair/addPushCorporationForm'
import  settleAccountsForm from './pages/workOrder/pushRepair/settleAccountsForm'
import  selectPushRepair from './pages/workOrder/select/selectPushRepair'
import  selectPushRepairUnit from './pages/workOrder/select/selectPushRepairUnit'

/*工单保险公司管理*/
import workOrderInsuranceUnitManager from './pages/workOrder/workOrderInsuranceUnit/workOrderInsuranceUnitManager'
import workOrderInsuranceUnitForm from './pages/workOrder/workOrderInsuranceUnit/workOrderInsuranceUnitForm'


/* 工单开票申请 */
import  workOrderInvoiceForm  from './pages/workOrder/workOrderInvoice/workOrderInvoiceForm'

/* 工单离线数据 */
import  offlineWorkOrderManager  from './pages/workOrder/offlineWorkOrder/offlineWorkOrderManager'
import  offlineWorkOrderForm  from './pages/workOrder/offlineWorkOrder/offlineWorkOrderForm'
import  offlineWorkOrderView  from './pages/workOrder/offlineWorkOrder/offlineWorkOrderView'
import  offlineWorkOrderDetailForm  from './pages/workOrder/offlineWorkOrder/offlineWorkOrderDetailForm'
import  offlineWorlOrderTicketForm  from './pages/workOrder/offlineWorkOrder/offlineWorkOrderTicketForm'
import  offlineOpenInvoiceView  from './pages/workOrder/offlineWorkOrder/offlineOpenInvoiceView'


/* 工单模块 --> 派工管理*/
import  peopleManagementManager from './pages/workOrder/peopleManagement/peopleManagementManager'
import  peopleManagementForm from './pages/workOrder/peopleManagement/peopleManagementForm'

/* 工单模块 --> 工序管理*/
import  processManagementForm from './pages/workOrder/process/processManagementForm'
import  processManagementManager from './pages/workOrder/process/processManagementManager'


/* 应收账款 */
import receivableManagerView from './pages/insurance/accountsReceivable/receivableManagerView'
import receivableBadDebtForm from './pages/insurance/accountsReceivable/receivableBadDebtForm'

import receivableSourceForm from './pages/insurance/accountsReceivable/receivableSourceForm'


import receivableSourceManagerView from './pages/insurance/accountsReceivable/receivableSourceManagerView'
import receivableBadDebtView from './pages/insurance/accountsReceivable/receivableBadDebtView'

/*客户返利*/
import customerRebatesManager from './pages/insurance/customerRebates/customerRebatesManager'
import customerRebatesView from './pages/insurance/customerRebates/customerRebatesView'
import customerRebates from './pages/insurance/customerRebates/customerRebates'
/*付保险费*/
import payInsuranceFeeManager from './pages/insurance/paymentInsurance/payInsuranceFeeManager'
/*收保险费*/
import receiveInsuranceManager from './pages/insurance/receiveInsurance/receiveInsuranceManager'
import receiveInsuranceFiles from './pages/insurance/receiveInsurance/receiveInsuranceFiles'
import receivePaymentDetails from './pages/insurance/receiveInsurance/receivePaymentDetails'

/* 保险返利费管理*/
import commissionFeeManager from './pages/insurance/commissionFee/commissionFeeManager'
import commissionFeeForm from './pages/insurance/commissionFee/commissionFeeForm'

/* 保险审批制定 */
import insuranceProcessManager from './pages/approvalPriority/insuranceProcessManager'
import insuranceProcessForm from './pages/approvalPriority/insuranceProcessForm'
/*收银审批制定*/
import cashRegisterManager from './pages/approvalPriority/cashRegisterManager'
import cashRegisterForm from './pages/approvalPriority/cashRegisterForm'
/*特殊车型制定*/
import vipRateManager from './pages/insurance/vipRate/vipRateManager'
import vipRateForm from './pages/insurance/vipRate/vipRateForm'
/* 维护保险公司 */
import insuranceUnitDetailsForm from './pages/insurance/unit/insuranceUnitDetailsForm'
import insuranceUnitView from './pages/insurance/unit/insuranceUnitView'
import statementDetails from './pages/insurance/unit/statementDetails'
import selectBankView from './pages/insurance/unit/selectBankView'
import waveForm from './pages/insurance/unit/waveForm'

/* 微信服务号消息模板管理 */
import wxMessageTemplateManager from './pages/wxMessageTemplate/wxMessageTemplateManager.vue'
import wxMessageTemplateForm from './pages/wxMessageTemplate/wxMessageTemplateForm.vue'

/* 微信服务号消息管理 */
import wxMessageManager from './pages/wxMessage/wxMessageManager.vue'

/*微信优惠券*/
import wxCouponManager from './pages/wxCoupon/wxCouponManager.vue'
import wxCouponForm from './pages/wxCoupon/wxCouponForm.vue'
import selectWxCoupon from './pages/wxCoupon/selectWxCoupon.vue'

/*微信优惠券明细*/
import wxCouponDetailManager from './pages/wxCouponDetail/wxCouponDetailManager.vue'
import extendedCouponManager from './pages/wxCouponDetail/extendedCouponManager.vue'
import wxCouponDetailForm from './pages/wxCouponDetail/wxCouponDetailForm.vue'
import selectDateTime from './pages/wxCouponDetail/selectDateTime.vue'

/*微信优惠券核销管理*/
import wxCouponWriteOffManager from './pages/wxCouponWriteOff/wxCouponWriteOffManager.vue'
import wxCouponWriteOffView from './pages/wxCouponWriteOff/wxCouponWriteOffView.vue'
/*微信优惠券核销管理 用来在个人办公 工单收银中使用*/
import workOrderCancellationCouponManager from './pages/wxCouponWriteOff/workOrderCancellationCouponManager.vue'

/*会员管理*/
import wxMemberManager from './pages/wxMember/wxMemberManager.vue'
import wxMemberview from './pages/wxMember/wxMemberview.vue'

import wxMemberForm from './pages/wxMember/wxMemberForm.vue'
import wxMemberSelect from './pages/wxMember/wxMemberSelect.vue'



/* 出库管理 */
import stockOutManager from './pages/stockOut/stockOutManager'
import stockOutForm from './pages/stockOut/stockOutForm'
import stockOutView from './pages/stockOut/stockOutView'
import stockOutDetailsForm from './pages/stockOut/stockOutDetailsForm'
import stockInModifyView from './pages/stockIn/stockInModifyView'
import stockOutOperateManager from './pages/stockOut/stockOutOperateManager'
import stockOutOperateView from './pages/stockOut/stockOutOperateView'
import stockOutSelectProductView from './pages/stockOut/stockOutSelectProductView'
import stockOutselectModelview from './pages/stockOut/stockOutselectModelview'
import stockOperateView from './pages/stockIn/stockOperateView'
import stockinLocationFrom from './pages/stockIn/stockinLocationFrom'
import stockOperateviewView from './pages/stockIn/stockOperateviewView'
import stockOutOperateForm from './pages/stockOut/stockOutOperateForm'


/*选择*/
import selectReceivableDetail from './pages/selects/selectReceivableDetail.vue'


export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home,
      children: [
        { path: '/home/desktop', name: 'home.desktop', component:desktop, meta: {title: '北京海派奥特经贸有限公司办公系统'}},
        { path: '/home/configManager', name: 'configManager.vue', component: configManager , meta: {title: '配置中心'}},
        { path: '/home/projectManager', name: 'projectManager.vue', component: projectManager , meta: {title: '项目管理'}},
        { path: '/home/approveProxyManager', name: 'approveProxyManager.vue', component: approveProxyManager , meta: {title: '审批代理管理'}},
        { path: '/home/smsMessageManager', name: 'smsMessageManager.vue', component: smsMessageManager , meta: {title: '短信消息管理'}},
        { path: '/home/smsTemplateManager', name: 'smsTemplateManager.vue', component: smsTemplateManager , meta: {title: '短信模板管理'}},

        { path: '/home/stockInManager', name: 'stockInManager.vue', component: stockInManager , meta: {title: '入库管理'}},
        { path: '/home/stockInOperateManager', name: 'stockInOperateManager.vue', component: stockInOperateManager , meta: {title: '入库操作'}},
        { path: '/home/stockinInfoManager', name: 'stockinInfoManager.vue', component: stockinInfoManager , meta: {title: '库存信息'}},
        { path: '/home/stockInventoryManager', name: 'stockInventoryManager.vue', component: stockInventoryManager , meta: {title: '库存盘点'}},
        { path: '/home/coreRecyclingManager', name: 'coreRecyclingManager.vue', component: coreRecyclingManager , meta: {title: '旧件回收'}},
        { path: '/home/coreWarehouseManager', name: 'coreWarehouseManager.vue', component: coreWarehouseManager , meta: {title: '旧件仓库'}},
        { path: '/home/RecoveryApprovalManager', name: 'RecoveryApprovalManager.vue', component: RecoveryApprovalManager , meta: {title: '旧件审批'}},
        { path: '/home/stockPositionManager', name: 'stockPositionManager.vue', component: stockPositionManager , meta: {title: '库位管理'}},
        { path: '/home/wxMessageTemplateManager', name: 'wxMessageTemplateManager.vue', component: wxMessageTemplateManager , meta: {title: '微信服务号消息模板管理'}},
        { path: '/home/wxMessageManager', name: 'wxMessageManager.vue', component: wxMessageManager , meta: {title: '微信服务号消息管理'}},
        { path: '/home/wxCouponManager', name: 'wxCouponManager.vue', component: wxCouponManager , meta: {title: '微信优惠券管理'}},
        { path: '/home/wxCouponWriteOffManager', name: 'wxCouponWriteOffManager.vue', component: wxCouponWriteOffManager , meta: {title: '微信优惠券核销管理'}},
        { path: '/home/workOrderCancellationCouponManager', name: 'workOrderCancellationCouponManager.vue', component: workOrderCancellationCouponManager , meta: {title: '微信优惠券核销管理'}},
        { path: '/home/wxCouponDetailManager', name: 'wxCouponDetailManager.vue', component: wxCouponDetailManager , meta: {title: '微信优惠券明细管理'}},
        { path: '/home/extendedCouponManager', name: 'extendedCouponManager.vue', component: extendedCouponManager , meta: {title: '延期微信优惠券'}},
        { path: '/home/wxMemberManager', name: 'wxMemberManager.vue', component: wxMemberManager , meta: {title: '微信会员管理'}},
        { path: '/home/approvalPersonaliseManager', name: 'approvalPersonaliseManager.vue', component: approvalPersonaliseManager , meta: {title: '审批定制管理'}},
        { path: '/home/approvalPriorityManager', name: 'approvalPriorityManager.vue', component: approvalPriorityManager , meta: {title: '审批管理'}},
        { path: '/home/promotionsApproveManager', name: 'promotionsApproveManager.vue', component: promotionsApproveManager , meta: {title: '优惠活动审批制定'}},
        { path: '/home/reversalAccountManager', name: 'reversalAccountManager.vue', component: reversalAccountManager , meta: {title: '冲账管理'}},
        { path: '/home/boardFeesManager', name: 'boardFeEsManager.vue', component: boardFeEsManager ,meta: {title: '董事会费管理'}},
        { path: '/home/rversalManager', name: 'rversalManager.vue', component: rversalManager  ,meta: {title: '冲账管理'}},
        { path: '/home/flowsManager', name: 'flowsManager.vue', component: flowsManager , meta: {title: '流程管理'}},

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

        { path: '/home/viewManager/finReimbursementDetailManager', name: 'finReimbursementDetailManager.vue', component: finReimbursementDetailManager  , meta: {title: '特殊报销'}},

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
        { path: '/home/approvalOpenInvoiceManager', name: 'approvalOpenInvoiceManager.vue', component: approvalOpenInvoiceManager},
        { path: '/home/openInvoiceFinManager', name: 'openInvoiceFinManager.vue', component: openInvoiceFinManager},
        { path: '/home/openInvoiceManagerAll', name: 'openInvoiceManagerAll.vue', component: openInvoiceManagerAll},
        { path: '/home/taxManager', name: 'taxManager.vue', component: taxManager , meta: {title: '税号'}},
        { path: '/home/invoiceRiseManager', name: 'invoiceRiseManager.vue', component: invoiceRiseManager , meta: {title: '发票抬头'}},
        { path: '/home/approvalInvoiceRiseManager', name: 'approvalInvoiceRiseManager.vue', component: approvalInvoiceRiseManager , meta: {title: '发票抬头审批'}},
        { path: '/home/inputTaxManager', name: 'inputTaxManager.vue', component: inputTaxManager , meta: {title: '进项税'}},
        { path: '/home/outPutTaxManager', name: 'outPutTaxManager.vue', component: outPutTaxManager , meta: {title: '销项税'}},

        { path: '/home/publicAccountManager', name: 'publicAccountManager.vue', component: publicAccountManager , meta: {title: '对公账号'}},
        { path: '/home/privateAccountManager', name: 'privateAccountManager.vue', component: privateAccountManager , meta: {title: '对私账号'}},
        { path: '/home/productManager', name: 'productManager.vue', component: productManager  ,meta: {title: '商品管理'}},
        { path: '/home/myPurchaseManager', name: 'myPurchaseManager.vue', component: myPurchaseManager  ,meta: {title: '采购计划'}},
        { path: '/home/finPurchaseManager', name: 'finPurchaseManager.vue', component: finPurchaseManager  ,meta: {title: '采购计划'}},
        { path: '/home/finPosAccountManager', name: 'finPosAccountManager.vue', component: finPosAccountManager  ,meta: {title: 'POS账户'}},
        { path: '/home/finPosAccountDetailManager', name: 'finPosAccountDetailManager.vue', component: finPosAccountDetailManager  ,meta: {title: '添加收支明细'}},
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
        { path: '/home/unit/insuranceUnitManager', name: 'insuranceUnitManager.vue', component: insuranceUnitManager, meta: {title: '管理保险公司'}},
        { path: '/home/cashGiveHP/cashGiveHPManager', name: 'cashGiveHPManager.vue', component: cashGiveHPManager, meta: {title: '保险公司给HP返利'}},
        { path: '/home/promotions/promotionsManager', name: 'promotionsManager.vue', component: promotionsManager, meta: {title: '保险优惠活动'}},
        { path: '/home/promotions/promotionsAppManager', name: 'promotionsAppManager.vue', component: promotionsAppManager, meta: {title: '优惠活动审批'}},
        { path: '/home/commissionFee/commissionFeeManager', name: 'commissionFeeManager.vue', component: commissionFeeManager, meta: {title: '保险手续费'}},

        { path: '/home/workOrderManager', name: 'workOrderManager.vue', component: workOrderManager, meta: {title: '工单管理'}},
        { path: '/home/workOrderInvoiceManager', name: 'workOrderInvoiceManager.vue', component: workOrderInvoiceManager, meta: {title: '工单开票'}},
        { path: '/home/workOrderCashierDeskManager', name: 'workOrderCashierDeskManager.vue', component: workOrderCashierDeskManager, meta: {title: '工单收银'}},
        { path: '/home/receptionManager', name: 'receptionManager.vue', component: receptionManager, meta: {title: '接待管理'}},
        { path: '/home/teamOrGroupManager', name: 'teamOrGroupManager.vue', component: teamOrGroupManager, meta: {title: '待作业'}},
        { path: '/home/teamOrGroupManager1', name: 'teamOrGroupManager1.vue', component: teamOrGroupManager1, meta: {title: '做底'}},
        { path: '/home/teamOrGroupManager2', name: 'teamOrGroupManager2.vue', component: teamOrGroupManager2, meta: {title: '喷漆'}},
        { path: '/home/teamOrGroupManager3', name: 'teamOrGroupManager3.vue', component: teamOrGroupManager3, meta: {title: '钣金'}},
        { path: '/home/teamOrGroupManager4', name: 'teamOrGroupManager4.vue', component: teamOrGroupManager4, meta: {title: '抛光'}},

        { path: '/home/pushRepairManager', name: 'pushRepairManager.vue', component: pushRepairManager, meta: {title: '推修管理'}},
        { path: '/home/pushRepairRecordManager', name: 'pushRepairRecordManager.vue', component: pushRepairRecordManager, meta: {title: '推修记录'}},
        { path: '/home/workOrderInsuranceUnitManager', name: 'workOrderInsuranceUnitManager.vue', component: workOrderInsuranceUnitManager, meta: {title: '保险公司管理'}},

        { path: '/home/offlineWorkOrderManager', name: 'offlineWorkOrderManager.vue', component: offlineWorkOrderManager, meta: {title: '工单离线数据'}},
        { path: '/home/insurance/clientManager', name: 'clientManager.vue', component: clientManager, meta: {title: '客户管理'}},

        { path: '/home/insurance/clientTwoManager', name: 'clientTwoManager.vue', component: clientTwoManager, meta: {title: '客户管理'}},

        { path: '/home/approPriationManager', name: 'approPriationManager.vue', component: approPriationManager, meta: {title: '审批定制'}},
        { path: '/home/unionCostsManager', name: 'unionCostsManager.vue', component: unionCostsManager, meta: {title: '审批定制'}},

        { path: '/home/cashierManager', name: 'cashierManager.vue', component: cashierManager ,meta: {title: '收银管理'}},
        { path: '/home/surrenderCashierManager', name: 'surrenderCashierManager.vue', component: surrenderCashierManager ,meta: {title: '退保收银'}},
        { path: '/home/approvalInsuranceManager', name: 'approvalInsuranceManager.vue', component: approvalInsuranceManager ,meta: {title: '保险审批'}},
        { path: '/home/vehicleManager', name: 'vehicleManager.vue', component: vehicleManager ,meta: {title: '车辆管理'}},

        { path: '/home/vehicleTwoManager', name: 'vehicleTwoManager.vue', component: vehicleTwoManager ,meta: {title: '车辆管理'}},


        { path: '/home/track/trackManager', name: 'trackManager.vue', component: trackManager ,meta: {title: '跟踪信息'}},
        { path: '/home/track/perfectedManager', name: 'perfectedManager.vue', component: perfectedManager ,meta: {title: '待完善信息'}},
        { path: '/home/billing/billingManager', name: 'billingManager.vue', component: billingManager ,meta: {title: '出单管理'}},
        { path: '/home/policy/policyManager', name: 'policyManager.vue', component: policyManager ,meta: {title: '保单管理'}},
        { path: '/home/accountsReceivable/accountsReceivableManager', name: 'accountsReceivableManager.vue', component: accountsReceivableManager ,meta: {title: '应收账款'}},

        { path: '/home/accountsReceivable/receivableManager', name: 'receivableManager.vue', component: receivableManager ,meta: {title: '应收账款'}},
        { path: '/home/accountsReceivable/ReceivableForceWriteOffManager', name: 'ReceivableForceWriteOffManager.vue', component: ReceivableForceWriteOffManager ,meta: {title: '应收账款'}},


        { path: '/home/customerRebates/customerRebatesManager', name: 'customerRebatesManager.vue', component: customerRebatesManager ,meta: {title: '客户返利'}},
        { path: '/home/paymentInsurance/payInsuranceFeeManager', name: 'payInsuranceFeeManager.vue', component: payInsuranceFeeManager ,meta: {title: '支付保险费'}},
        { path: '/home/receiveInsurance/receiveInsuranceManager', name: 'receiveInsuranceManager.vue', component: receiveInsuranceManager ,meta: {title: '收保险费'}},

        { path: '/home/trackDetails/trackDetailsManager', name: 'trackDetailsManager.vue', component: trackDetailsManager ,meta: {title: '跟踪细节'}},
        { path: '/home/insuranceProcessManager', name: 'insuranceProcessManager.vue', component: insuranceProcessManager ,meta: {title: '保险审批制定'}},
        { path: '/home/cashRegisterManager', name: 'cashRegisterManager.vue', component: cashRegisterManager ,meta: {title: '特殊车型制定'}},
        { path: '/home/vipRate/vipRateManager', name: 'vipRateManager.vue', component: vipRateManager ,meta: {title: '管理特殊车型'}},
        { path: '/home/conductFinManager', name: 'conductFinManager.vue', component: conductFinManager ,meta: {title: '理财管理'}},
        { path: '/home/prewarningValueManager', name: 'prewarningValueManager.vue', component: prewarningValueManager},
        { path: '/home/bankDetailAnalysis', name: 'bankDetailAnalysis.vue', component: bankDetailAnalysis, meta: {title: '财务分析'}},
        { path: '/home/employeeFilesManager', name: 'employeeFilesManager.vue', component: employeeFilesManager, meta: {title: '员工档案'}},
        { path: '/home/fiveInsurancesManager', name: 'fiveInsurancesManager.vue', component: fiveInsurancesManager, meta: {title: '设置五险百分比'}},
        { path: '/home/fiveInsurancesBaseManager', name: 'fiveInsurancesBaseManager.vue', component: fiveInsurancesBaseManager, meta: {title: '设置五险基数'}},
        { path: '/home/basicWageManager', name: 'basicWageManager.vue', component: basicWageManager, meta: {title: '设置基本工资'}},
        { path: '/home/wagePostManager', name: 'wagePostManager.vue', component: wagePostManager, meta: {title: '设置岗位工资'}},
        { path: '/home/telephoneSubsidyManager', name: 'telephoneSubsidyManager.vue', component: telephoneSubsidyManager, meta: {title: '设置花费补助'}},
        { path: '/home/repairTargerManager', name: 'repairTargerManager.vue', component: repairTargerManager, meta: {title: '设置业绩'}},
        { path: '/home/wageWorkingManager', name: 'wageWorkingManager.vue', component: wageWorkingManager, meta: {title: '设置工龄工资'}},

        { path: '/home/BankDetailRebateManager', name: 'BankDetailRebateManager.vue', component: BankDetailRebateManager ,meta: {title: '支付客户返利'}},
        { path: '/home/bankDetailRenewalManager', name: 'bankDetailRenewalManager.vue', component: bankDetailRenewalManager ,meta: {title: '续保管理'}},
        { path: '/home/BankDetailRepairManager', name: 'BankDetailRepairManager.vue',component: BankDetailRepairManager, meta: {title: '自费维修'}},
        { path: '/home/BankDetailInsuranceAll', name: 'BankDetailInsuranceAll.vue',component: BankDetailInsuranceAll,  meta: {title: '售后回款'} },

        { path: '/home/BankDetailCommissionManager', name: 'BankDetailCommissionManager.vue',component: BankDetailCommissionManager },
        { path: '/home/stockOutManager', name: 'stockOutManager.vue',component: stockOutManager ,meta: {title: '出库管理'}},
        { path: '/home/stockOutOperateManager', name:'stockOutOperateManager.vue', component:stockOutOperateManager,meta: {title: '出库操作'} },
        { path: '/home/makeUp/insuranceMakeUpManager', name:'insuranceMakeUpManager.vue', component:insuranceMakeUpManager,meta: {title: '保险出单补录'} },
        { path: '/home/processManagementManager', name: 'processManagementManager', component: processManagementManager,meta: {title: '服务管理'}},
        { path: '/home/finBillingManager', name: 'finBillingManager', component: finBillingManager,meta: {title: '保单页面'}},
        { path: '/home/peopleManagementManager', name: 'peopleManagementManager', component: peopleManagementManager,meta: {title: '派工管理'}},
        { path: '/home/bossTrack/bossTrackDetailsManager', name: 'bossTrackDetailsManager', component: bossTrackDetailsManager,meta: {title: '跟踪页面'}},
        { path: '/home/bossTrack/bossTrackManager', name: 'bossTrackManager', component: bossTrackManager,meta: {title: '跟踪页面'}},
        { path: '/home/bossTrack/followApprovalManager', name: 'followApprovalManager', component: followApprovalManager,meta: {title: '跟踪审批'}},
        { path: '/home/bossTrack/bossPerfectedManager', name: 'bossPerfectedManager', component: bossPerfectedManager,meta: {title: '待分配客户'}},
        { path: '/home/invoicelookUp/invoicelookUpManager', name: 'invoicelookUpManager', component: invoicelookUpManager,meta: {title: '发票抬头'}},
        { path: '/home/invoiceManager', name: 'invoiceManager', component: invoiceManager,meta: {title: '发票抬头列表'}},
        { path: '/home/approveFlowsManager', name: 'approveFlowsManager.vue', component: approveFlowsManager ,meta: {title: '审批流程管理'}},
        { path: '/home/personTagManager', name: 'personTagManager.vue', component: personTagManager ,meta: {title: '人员标签管理'}},
        { path: '/home/insuranceInvoice/insuranceInvoiceManager', name: 'insuranceInvoiceManager', component: insuranceInvoiceManager,meta: {title: '保险开票'}},
        { path: '/home/courierCompanyManager', name: 'courierCompanyManager', component: courierCompanyManager,meta: {title: '管理快递公司'}},
        { path: '/home/contractManager', name: 'contractManager', component: contractManager,meta: {title: '合同管理'}},
        { path: '/home/expressDeliveryManager', name: 'expressDeliveryManager', component: expressDeliveryManager,meta: {title: '管理往来信函'}},
        { path: '/home/myExpressManager', name: 'myExpressManager', component: myExpressManager,meta: {title: '我的快递'}},
        { path: '/home/myArticleRegistrationManager', name: 'myArticleRegistrationManager', component: myArticleRegistrationManager,meta: {title: '重要物品外出登记'}},
        { path: '/home/reimbursementLlimitManager', name: 'reimbursementLlimitManager', component: reimbursementLlimitManager,meta: {title: '花费额度'}},
        { path: '/home/expressApprovalManager', name: 'expressApprovalManager', component: expressApprovalManager,meta: {title: '快递审批'}},
        { path: '/home/warnManager', name: 'warnManager', component: warnManager,meta: {title: '提醒中心'}},
        { path: '/home/myWarnManager', name: 'myWarnManager', component: myWarnManager,meta: {title: '个人提醒中心'}},
        { path: '/home/dicManager', name: 'dicManager', component: dicManager,meta: {title: '字典'}},
        { path: '/home/dictionariesManager', name: 'dictionariesManager', component: dictionariesManager,meta: {title: '字典'}},

        { path: '/home/depositManager', name: 'depositManager', component: depositManager,meta: {title: '押金管理'}},//-----------------title待修改
        { path:'/home/payDepositManager', name:'payDepositManager.vue',component: payDepositManager,meta: {title: '押金管理'}},

        { path: '/home/invoicUnitWhitelistManager', name: 'invoicUnitWhitelistManager', component: invoicUnitWhitelistManager,meta: {title: '开票白名单'}},

      ]
    },

    { path: '/login', name: 'login', component: login , meta: {title: '北京海派奥特经贸有限公司办公系统'}},
    { path: '/configForm', name: 'configForm', component: configForm},
    { path: '/projectForm', name: 'projectForm', component: projectForm},
    // { path: '/approveProxyForm', name: 'approveProxyForm', component: approveProxyForm},
    { path: '/wxCouponWriteOffView', name: 'wxCouponWriteOffView', component: wxCouponWriteOffView},

    { path: '/smsMessageForm', name: 'smsMessageForm', component: smsMessageForm},
    { path: '/smsTemplateForm', name: 'smsTemplateForm', component: smsTemplateForm},
    { path: '/workOrderForm', name: 'workOrderForm', component: workOrderForm},
    { path: '/workOrderView', name: 'workOrderView', component: workOrderView},
    { path: '/workOrderFlowChartForm', name: 'workOrderFlowChartForm', component: workOrderFlowChartForm},
    { path: '/lossAssessmentForm', name: 'lossAssessmentForm', component: lossAssessmentForm},
    { path: '/lossAssessmentDetailsForm', name: 'lossAssessmentDetailsForm', component: lossAssessmentDetailsForm},
    { path: '/workOrderDetailsManagerView', name: 'workOrderDetailsManagerView', component: workOrderDetailsManagerView},
    { path: '/workOrderAddDetailsForm', name: 'workOrderAddDetailsForm', component: workOrderAddDetailsForm},
    { path: '/workOrderMaterialListManagerView', name: 'workOrderMaterialListManagerView', component: workOrderMaterialListManagerView},
    { path: '/workOrderMateriaListForm', name: 'workOrderMateriaListForm', component: workOrderMateriaListForm},
    { path: '/workOrderStockOutManagerView', name: 'workOrderStockOutManagerView', component: workOrderStockOutManagerView},
    { path: '/workOrderServiceView', name: 'workOrderServiceView', component: workOrderServiceView},
    { path: '/workOrderCheckoutManagerView', name: 'workOrderCheckoutManagerView', component: workOrderCheckoutManagerView},
    { path: '/contractForm', name: 'contractForm', component: contractForm},
    { path: '/contractsignForm', name: 'contractsignForm', component: contractsignForm},
    { path: '/contractsignView', name: 'contractsignView', component: contractsignView},

    { path: '/processManagementForm', name: 'processManagementForm', component: processManagementForm},

    { path: '/workOrderProcessForm', name: 'workOrderProcessForm', component: workOrderProcessForm},
    { path: '/receptionForm', name: 'receptionForm', component: receptionForm},
    { path: '/receptionView', name: 'receptionView', component: receptionView},
    { path: '/payAreturnVisitForm', name: 'payAreturnVisitForm', component: payAreturnVisitForm},

    { path: '/receptionMaterialsForm', name: 'receptionMaterialsForm', component: receptionMaterialsForm},
    { path: '/stockInventoryFrom', name: 'stockInventoryFrom', component: stockInventoryFrom},
    { path: '/stockInventoryView', name: 'stockInventoryView', component: stockInventoryView},

    { path: '/collectionOfDataForm', name: 'collectionOfDataForm', component: collectionOfDataForm},
    { path: '/collectionOfDataView', name: 'collectionOfDataView', component: collectionOfDataView},
    { path: '/teamOrGroupForm', name: 'teamOrGroupForm', component: teamOrGroupForm},
    { path: '/sheetMetalRepairForm', name: 'sheetMetalRepairForm', component: sheetMetalRepairForm},
    { path: '/selectWorkOrder', name: 'selectWorkOrder', component: selectWorkOrder},
    { path: '/selectWorkOrderPlate', name: 'selectWorkOrderPlate', component: selectWorkOrderPlate},
    { path: '/selectWorkOrderClient', name: 'selectWorkOrderClient', component: selectWorkOrderClient},
    { path: '/selectWorkOrderMaterials', name: 'selectWorkOrderMaterials', component: selectWorkOrderMaterials},
    { path: '/selectWorkOrderInsurance', name: 'selectWorkOrderInsurance', component: selectWorkOrderInsurance},

    { path: '/workOrderToBeConfirmedView', name: 'workOrderToBeConfirmedView', component: workOrderToBeConfirmedView},
    { path: '/workOrderReasonsForFefusal', name: 'workOrderReasonsForFefusal', component: workOrderReasonsForFefusal},
    { path: '/workOrderInvoiceForm', name: 'workOrderInvoiceForm', component: workOrderInvoiceForm},
    { path: '/workOrderUploadFile', name: 'workOrderUploadFile', component: workOrderUploadFile},
    { path: '/workOrderAllocationForm', name: 'workOrderAllocationForm', component: workOrderAllocationForm},
    { path: '/workOrderCashierDeskForm', name: 'workOrderCashierDeskForm', component: workOrderCashierDeskForm},
    { path: '/workOrderClaimDataForm', name: 'workOrderClaimDataForm', component: workOrderClaimDataForm},
    { path: '/workOrderCartogram', name: 'workOrderCartogram', component: workOrderCartogram},

    { path: '/pushRepairForm', name: 'pushRepairForm', component: pushRepairForm},
    { path: '/pushRepairDetailForm', name: 'pushRepairDetailForm', component: pushRepairDetailForm},
    { path: '/pushRepairAddPersonForm', name: 'pushRepairAddPersonForm', component: pushRepairAddPersonForm},
    { path: '/addPushCorporationForm', name: 'addPushCorporationForm', component: addPushCorporationForm},
    { path: '/pushRepairSelect', name: 'pushRepairSelect', component: pushRepairSelect},
    { path: '/pushPersonSelect', name: 'pushPersonSelect', component: pushPersonSelect},
    { path: '/pushRepairAddForm', name: 'pushRepairAddForm', component: pushRepairAddForm},

    { path: '/pushCorporationSelect', name: 'pushCorporationSelect', component: pushCorporationSelect},


    { path: '/settleAccountsForm', name: 'settleAccountsForm', component: settleAccountsForm},
    { path: '/selectPushRepair', name: 'selectPushRepair', component: selectPushRepair},
    { path: '/selectPushRepairUnit', name: 'selectPushRepairUnit', component: selectPushRepairUnit},

    { path: '/workOrderInsuranceUnitForm', name: 'workOrderInsuranceUnitForm', component: workOrderInsuranceUnitForm},

    { path: '/workOrderSettleAccountsForm', name: 'workOrderSettleAccountsForm', component: workOrderSettleAccountsForm},
    { path: '/workOrderStatementForm', name: 'workOrderStatementForm', component: workOrderStatementForm},
    { path: '/workOrderSummarizingForm', name: 'workOrderSummarizingForm', component: workOrderSummarizingForm},
    { path: '/workOrderCheckoutAffirmManager', name: 'workOrderCheckoutAffirmManager', component: workOrderCheckoutAffirmManager},
    { path: '/offlineWorkOrderForm', name: 'offlineWorkOrderForm', component: offlineWorkOrderForm},
    { path: '/offlineWorkOrderDetailForm', name: 'offlineWorkOrderDetailForm', component: offlineWorkOrderDetailForm},
    { path: '/offlineWorlOrderTicketForm', name: 'offlineWorlOrderTicketForm', component: offlineWorlOrderTicketForm},
    { path: '/offlineOpenInvoiceView', name: 'offlineOpenInvoiceView', component: offlineOpenInvoiceView},

    { path: '/offlineWorkOrderView', name: 'offlineWorkOrderView', component: offlineWorkOrderView},

    { path: '/peopleManagementForm', name: 'peopleManagementForm', component: peopleManagementForm},
    { path: '/projectDetailForm', name: 'projectDetailForm', component: projectDetailForm},
    { path: '/taxFrom', name: 'taxFrom', component: taxFrom},
    { path: '/taxView', name: 'taxView', component: taxView},
    { path: '/openInvoiceNum', name: 'openInvoiceNum', component: openInvoiceNum},
    { path: '/selectTax', name: 'selectTax', component: selectTax},
    { path: '/invoiceRiseForm', name: 'invoiceRiseForm', component: invoiceRiseForm},
    { path: '/invoiceRiseView', name: 'invoiceRiseView', component: invoiceRiseView},
    { path: '/inputTaxView', name: 'inputTaxView', component: inputTaxView},
    { path: '/inputTaxForm', name: 'inputTaxForm', component: inputTaxForm},
    { path: '/authenticationDate', name: 'authenticationDate', component: authenticationDate},
    { path: '/deduction', name: 'deduction', component: deduction},
    { path: '/deductionDateAndMoney', name: 'deductionDateAndMoney', component: deductionDateAndMoney},
    { path: '/outPutTaxView', name: 'outPutTaxView', component: outPutTaxView},
    { path: '/paymentPlanDate', name: 'paymentPlanDate.vue', component: paymentPlanDate , meta: {title: '付款计划'}},

    { path: '/stockInForm', name: 'stockInForm', component: stockInForm},
    { path: '/stockInDetailForm', name: 'stockInDetailForm', component: stockInDetailForm},
    { path: '/stockInView', name: 'stockInView', component: stockInView},
    { path: '/stockPositionForm', name: 'stockPositionForm', component: stockPositionForm},
    { path: '/stockPositionView', name: 'stockPositionView', component: stockPositionView},
    { path: '/stockinInfoView', name: 'stockinInfoView', component: stockinInfoView},

    { path: '/wxMessageTemplateForm', name: 'wxMessageTemplateForm', component: wxMessageTemplateForm},
    { path: '/wxCouponForm', name: 'wxCouponForm', component: wxCouponForm},
    { path: '/selectWxCoupon', name: 'selectWxCoupon', component: selectWxCoupon},
    { path: '/wxCouponDetailForm', name: 'wxCouponDetailForm', component: wxCouponDetailForm},
    { path: '/selectDateTime', name: 'selectDateTime', component: selectDateTime},
    { path: '/wxMemberForm', name: 'wxMemberForm', component: wxMemberForm},
    { path: '/wxMemberview', name: 'wxMemberview', component: wxMemberview},
    { path: '/wxMemberSelect', name: 'wxMemberSelect', component: wxMemberSelect},

    { path: '/approvalPersonaliseForm', name: 'approvalPersonaliseForm', component: approvalPersonaliseForm},
    { path: '/approvalPriorityForm', name: 'approvalPriorityForm', component: approvalPriorityForm},
    { path: '/reversalAccountForm', name: 'reversalAccountForm', component: reversalAccountForm},
    { path: '/boardFeesForm', name: 'boardFeesForm', component: boardFeesForm},
    { path: '/rversalForm', name: 'rversalForm', component: rversalForm},
    { path: '/myPaymentPlanForm', name: 'PaymentPlanForm', component: PaymentPlanForm},
    { path: '/myPaymentPlanDetailForm', name: 'PaymentPlanDetailForm', component: PaymentPlanDetailForm},
    { path: '/PaymentPlanFormView', name: 'PaymentPlanFormView', component: PaymentPlanFormView},
    { path: '/PaymentPlanDetailFormView', name: 'PaymentPlanDetailFormView', component: PaymentPlanDetailFormView},
    { path: '/bankDetailAnalysisExecl', name: 'bankDetailAnalysisExecl', component: bankDetailAnalysisExecl},
    { path: '/employeeFilesForm', name: 'employeeFilesForm', component: employeeFilesForm},
    { path: '/employeeFilesView', name: 'employeeFilesView', component: employeeFilesView},
    { path: '/staffQuitForm', name: 'staffQuitForm', component: staffQuitForm},
    { path: '/staffQuitView', name: 'staffQuitView', component: staffQuitView},
    { path: '/fiveInsurancesForm', name: 'fiveInsurancesForm', component: fiveInsurancesForm},
    { path: '/fiveInsurancesView', name: 'fiveInsurancesView', component: fiveInsurancesView},
    { path: '/fiveInsurancesBaseForm', name: 'fiveInsurancesBaseForm', component: fiveInsurancesBaseForm},
    { path: '/fiveInsurancesBaseView', name: 'fiveInsurancesBaseView', component: fiveInsurancesBaseView},
    { path: '/basicWageForm', name: 'basicWageForm', component: basicWageForm},
    { path: '/basicWageView', name: 'basicWageView', component: basicWageView},
    { path: '/wagePostForm', name: 'wagePostForm', component: wagePostForm},
    { path: '/wagePostView', name: 'wagePostView', component: wagePostView},
    { path: '/telephoneSubsidyForm', name: 'telephoneSubsidyForm', component: telephoneSubsidyForm},
    { path: '/telephoneSubsidyView', name: 'telephoneSubsidyView', component: telephoneSubsidyView},
    { path: '/wageWorkingForm', name: 'wageWorkingForm', component: wageWorkingForm},
    { path: '/wageWorkingView', name: 'wageWorkingView', component: wageWorkingView},


    { path: '/repairTargerView', name: 'repairTargerView', component: repairTargerView},
    { path: '/repairTargerForm', name: 'repairTargerForm', component: repairTargerForm},


    { path: '/selectDic', name: 'selectDic', component: selectDic},
    { path: '/selectCoupon', name: 'selectCoupon', component: selectCoupon},

    { path: '/dicForm089', name: 'dicForm089', component: dicForm089},
    { path: '/dicForm090', name: 'dicForm090', component: dicForm090},
    { path: '/dicForm091', name: 'dicForm091', component: dicForm091},

    { path: '/insuranceCartogram', name: 'insuranceCartogram.vue', component: insuranceCartogram},
    { path: '/renewPremiumCartogram', name: 'renewPremiumCartogram.vue', component: renewPremiumCartogram},
    { path: '/rebateCartogram', name: 'rebateCartogram.vue', component: rebateCartogram},
    { path: '/maintenanceCostCartogram', name: 'maintenanceCostCartogram.vue', component: maintenanceCostCartogram},
    { path: '/BankDetailCommissionCartogram', name: 'BankDetailCommissionCartogram.vue', component: BankDetailCommissionCartogram},
    { path: '/cashJournalCartogram', name: 'cashJournalCartogram.vue', component: cashJournalCartogram},
    { path: '/allMaintenanceCartogram', name: 'allMaintenanceCartogram.vue', component: allMaintenanceCartogram},
    { path: '/expressCartogram', name: 'expressCartogram.vue', component: expressCartogram},
    { path: '/reimbursementCartogram', name: 'reimbursementCartogram.vue', component: reimbursementCartogram},
    { path: '/reimbursementViewCartogram', name: 'reimbursementViewCartogram.vue', component: reimbursementViewCartogram},
    { path: '/myreimbursementTwoCartogram', name: 'myreimbursementTwoCartogram.vue', component: myreimbursementTwoCartogram},

    { path: '/approveFlowsForm', name: 'approveFlowsForm.vue', component: approveFlowsForm},
    { path: '/approveFlowsDetailForm', name: 'approveFlowsDetailForm.vue', component: approveFlowsDetailForm},
    { path: '/personTagForm', name: 'personTagForm.vue', component: personTagForm},
    { path: '/selectPersonTag', name: 'selectPersonTag.vue', component: selectPersonTag},


    { path: '/selectPublicAccount', name: 'selectPublicAccount', component: selectPublicAccount},
    { path: '/selectPrivateAccount', name: 'selectPrivateAccount', component: selectPrivateAccount},
    { path: '/selectUnit', name: 'selectUnit', component: selectUnit},
    { path: '/selectPaymentApplyDetail', name: 'selectPaymentApplyDetail', component: selectPaymentApplyDetail},
    { path: '/selectUsersWxInfo', name: 'selectUsersWxInfo', component: selectUsersWxInfo},
    { path: '/selectBankDetail', name: 'selectBankDetail', component: selectBankDetail},
    { path: '/selectChecksDetail', name: 'selectChecksDetail', component: selectChecksDetail},
    { path: '/selectPrettyCashs', name: 'selectPrettyCashs', component: selectPrettyCashs},
    { path: '/selectPlate', name: 'selectPlate.vue',component: selectPlate },
    { path: '/selectUnitInvoice', name: 'selectUnitInvoice.vue',component: selectUnitInvoice },
    { path: '/selectNumber', name: 'selectNumber.vue',component: selectNumber },
    { path: '/selectContract', name: 'selectContract.vue',component: selectContract },
    { path: '/selectPromotions', name: 'selectPromotions.vue',component: selectPromotions },
    { path: '/selectPerson', name: 'selectPerson', component: selectPerson},
    { path: '/selectStock', name: 'selectStock', component: selectStock},
    { path: '/selectPlanDate', name: 'selectPlanDate', component: selectPlanDate},
    { path: '/selectDepartment', name: 'selectDepartment', component: selectDepartment},
    { path: '/selectElectronicInvoice', name: 'selectElectronicInvoice', component: selectElectronicInvoice},
    { path: '/selectInvoiceDetail', name: 'selectInvoiceDetail.vue',component: selectInvoiceDetail },
    { path: '/SelectInvoiceRise', name: 'SelectInvoiceRise.vue',component: SelectInvoiceRise },
    { path: '/selectVersion', name: 'selectVersion.vue',component: selectVersion },
    { path: '/selectPage', name: 'selectPage.vue',component: selectPage ,meta: {title: '页面测试'}},
    { path: '/selectProduct', name: 'selectProduct.vue',component: selectProduct },
    { path: '/selectModel', name: 'selectModel.vue',component: selectModel },
    { path: '/selectStoredCard', name: 'selectStoredCard.vue',component: selectStoredCard },
    { path: '/selectMonthlyAccount', name: 'selectMonthlyAccount.vue',component: selectMonthlyAccount },
    { path: '/selectOpenInvoice', name: 'selectOpenInvoice.vue',component: selectOpenInvoice },
    { path: '/selectsInvoiceSignatureForm', name: 'selectsInvoiceSignatureForm.vue',component: selectsInvoiceSignatureForm },

    { path: '/selectProductModel', name: 'selectProductModel.vue',component: selectProductModel },
    { path: '/selectFormPlate', name: 'selectFormPlate.vue',component: selectFormPlate },
    { path: '/selectPrint', name: 'selectPrint.vue',component: selectPrint },
    { path: '/selectLocation', name: 'selectLocation.vue',component: selectLocation },
    { path: '/selectAccount', name: 'selectAccount.vue',component: selectAccount },
    { path: '/selectPart', name: 'selectPart.vue',component: selectPart },
    { path: '/selectProcessServices', name: 'selectProcessServices.vue',component: selectProcessServices },
    { path: '/selectPeopleManagement', name: 'selectPeopleManagement.vue',component: selectPeopleManagement },
    { path: '/selectService', name: 'selectService.vue',component: selectService },
    { path: '/selectMaterials', name: 'selectMaterials.vue',component: selectMaterials },
    { path: '/selectInsuranceInvoice', name: 'selectInsuranceInvoice.vue',component: selectInsuranceInvoice },
    { path: '/selectDeposit', name: 'selectDeposit.vue',component: selectDeposit },
    { path: '/perfectedForm', name: 'perfectedForm.vue',component: perfectedForm },
    { path: '/selectPayDeposit', name: 'selectPayDeposit.vue',component: selectPayDeposit },
    { path: '/selectOfficialWorkOrder', name: 'selectOfficialWorkOrder.vue',component: selectOfficialWorkOrder },

    { path: '/commissionFeeForm', name: 'commissionFeeForm.vue',component: commissionFeeForm },

    { path: '/exercise', name: 'exercise.vue', component: exercise ,meta: {title: '测试页面'}},
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
    { path: '/unitInvoiceFrom', name: 'unitInvoiceFrom', component: unitInvoiceFrom},
    { path: '/unitInvoiceView', name: 'unitInvoiceView', component: unitInvoiceView},
    { path: '/addUnitSimplifyForm', name: 'addUnitSimplifyForm', component: addUnitSimplifyForm},
    { path: '/unitBankDetailForm', name: 'unitBankDetailForm', component: unitBankDetailForm},

    { path: '/unitView', name: 'unitView.vue', component: unitView},
    { path: '/unitDetailView', name: 'unitDetailView.vue', component: unitDetailView},
    { path: '/coreRecyclingFrom', name: 'coreRecyclingFrom.vue', component: coreRecyclingFrom},

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
    { path: '/bankProductInterest', name: 'bankProductInterest', component: bankProductInterest},

    { path: '/conductFinRedeemForm', name: 'conductFinRedeemForm', component: conductFinRedeemForm},
    { path: '/conductFinEntry', name: 'conductFinEntry', component: conductFinEntry},

    { path: '/psdForm', name: 'psdForm', component: psdForm},
    { path: '/bankDetailForm', name: 'bankDetailForm', component: bankDetailForm},
    { path: '/bankDetailCashierForm', name: 'bankDetailCashierForm', component: bankDetailCashierForm},
    { path: '/receivableBankDetailForm', name: 'receivableBankDetailForm', component: receivableBankDetailForm},

    { path: '/bankDetailAnalyView', name: 'bankDetailAnalyView', component: bankDetailAnalyView},

    { path: '/payApplyReconDetailForm', name: 'payApplyReconDetailForm.vue', component: payApplyReconDetailForm},


    { path: '/reimbursementForm', name: 'reimbursementForm', component: reimbursementForm},
    { path: '/reimbursementDetailForm', name: 'reimbursementDetailForm', component: reimbursementDetailForm},
    { path: '/appTopForm', name: 'appTopForm', component: appTopForm},
    { path: '/appLeftForm', name: 'appLeftForm', component: appLeftForm},
    { path: '/appForm', name: 'appForm', component: appForm},

    { path: '/myElectronicInvoiceForm', name: 'myElectronicInvoiceForm', component: myElectronicInvoiceForm},
    { path: '/myElectronicInvoiceReimburseManager', name: 'myElectronicInvoiceReimburseManager', component: myElectronicInvoiceReimburseManager},
    { path: '/rejectReason', name: 'rejectReason', component: rejectReason},
    { path: '/springBootApprovalMessage', name: 'springBootApprovalMessage', component: springBootApprovalMessage},
    { path: '/springBootRejectReason', name: 'springBootRejectReason', component: springBootRejectReason},
    { path: '/passMessage', name: 'passMessage', component: passMessage},
    { path: '/gainsayMessage', name: 'gainsayMessage', component: gainsayMessage},
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
    { path: '/loginInexistence', name: 'loginInexistence', component: loginInexistence},


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
    { path: '/openInvoiceTrial', name: 'openInvoiceTrial.vue',component: openInvoiceTrial },
    { path: '/openInvoiceToVoid', name: 'openInvoiceToVoid.vue',component: openInvoiceToVoid },
    { path: '/openInvoiceVehicleForm', name: 'openInvoiceVehicleForm.vue',component: openInvoiceVehicleForm },
    { path: '/openInvoiceFinForm', name: 'openInvoiceFinForm.vue',component: openInvoiceFinForm },

    { path: '/openInvoiceTrialVehicle', name: 'openInvoiceTrialVehicle.vue',component: openInvoiceTrialVehicle },
    { path: '/openInvoiceTrialOther', name: 'openInvoiceTrialOther.vue',component: openInvoiceTrialOther },
    { path: '/openInvoiceToVoidInvoice', name: 'openInvoiceToVoidInvoice.vue',component: openInvoiceToVoidInvoice },
    { path: '/printingOpenInvoice', name: 'printingOpenInvoice.vue',component: printingOpenInvoice },

    // { path: '/unitInvoiceinitForm', name: 'unitInvoiceinitForm.vue',component: unitInvoiceinitForm },

    { path: '/paymentApplyViewForm', name: 'paymentApplyViewForm.vue',component: paymentApplyViewForm },
    { path: '/reimbursementViewForm', name: 'reimbursementViewForm.vue',component: reimbursementViewForm },
    { path: '/reimbursementViewDetailForm', name: 'reimbursementViewDetailForm.vue',component: reimbursementViewDetailForm },
    { path: '/reimbursementDetailFormView', name: 'reimbursementDetailFormView.vue',component: reimbursementDetailFormView },
    { path: '/reimbursementFormView', name: 'reimbursementFormView.vue',component: reimbursementFormView },
    { path: '/paymentPlanViewForm', name: 'paymentPlanViewForm.vue',component: paymentPlanViewForm },
    { path: '/paymentPlanViewDetailForm', name: 'paymentPlanViewDetailForm.vue',component: paymentPlanViewDetailForm },
    { path: '/reimbursementReconDetailForm', name: 'reimbursementReconDetailForm.vue',component: reimbursementReconDetailForm },

    { path: '/approvalPrintReimbursementTicket', name: 'approvalPrintReimbursementTicket.vue',component: approvalPrintReimbursementTicket },


    { path: '/BankDetailRebateDetail', name: 'BankDetailRebateDetail.vue',component: BankDetailRebateDetail },



    { path: '/openBankForm', name: 'openBankForm.vue',component: openBankForm },
    { path: '/openBankDetailForm', name: 'openBankDetailForm.vue',component: openBankDetailForm },

    { path: '/approPriationForm', name: 'approPriationForm.vue',component: approPriationForm },
    { path: '/unionCostsForm', name: 'unionCostsForm.vue',component: unionCostsForm },
    { path: '/promotionsApproveForm', name: 'promotionsApproveForm.vue',component: promotionsApproveForm },

    { path: '/handlePersonForm', name: 'handlePersonForm.vue',component: handlePersonForm },
    { path: '/policyInformationForm', name: 'policyInformationForm.vue',component: policyInformationForm },
    { path: '/financialInformationForm', name: 'financialInformationForm.vue',component: financialInformationForm },
    { path: '/insuranceCompanyForm', name: 'insuranceCompanyForm.vue',component: insuranceCompanyForm },
    { path: '/insuranceUnitForm', name: 'insuranceUnitForm.vue',component: insuranceUnitForm },
    { path: '/insuranceUnitUpload', name: 'insuranceUnitUpload.vue',component: insuranceUnitUpload },
    { path: '/insuranceUnitUploadView', name: 'insuranceUnitUploadView.vue',component: insuranceUnitUploadView },
    { path: '/insuranceBankDetailForm', name: 'insuranceBankDetailForm.vue',component: insuranceBankDetailForm },
    { path: '/insuranceUnitDetailsForm', name: 'insuranceUnitDetailsForm.vue',component: insuranceUnitDetailsForm },
    { path: '/insuranceUnitView', name: 'insuranceUnitView.vue',component: insuranceUnitView },
    { path: '/waveForm', name: 'waveForm.vue',component: waveForm },
    { path: '/selectBankView', name: 'selectBankView.vue',component: selectBankView },
    { path: '/statementDetails', name: 'statementDetails.vue',component: statementDetails },
    { path: '/cashGiveHPForm', name: 'cashGiveHPForm.vue',component: cashGiveHPForm },
    { path: '/promotionsForm', name: 'promotionsForm.vue',component: promotionsForm },
    { path: '/promotionsView', name: 'promotionsView.vue',component: promotionsView },

    { path: '/cashGiveForm', name: 'cashGiveForm.vue',component: cashGiveForm },
    { path: '/clientForm', name: 'clientForm.vue',component: clientForm },
    { path: '/bossPerfectedView', name: 'bossPerfectedView.vue',component: bossPerfectedView },
    { path: '/bossPerfectedForm', name: 'bossPerfectedForm.vue',component: bossPerfectedForm },

    { path: '/clientView', name: 'clientView.vue',component: clientView },
    { path: '/quotationFrom', name: 'quotationFrom.vue',component: quotationFrom },
    { path: '/templateCheForm', name: 'templateCheForm.vue',component: templateCheForm },
    { path: '/templateShangYeFrom', name: 'templateShangYeFrom.vue',component: templateShangYeFrom },
    { path: '/templateFiveForm', name: 'templateFiveForm.vue',component: templateFiveForm },
    { path: '/templateFourForm', name: 'templateFourForm.vue',component: templateFourForm },
    { path: '/claimsForm', name: 'claimsForm.vue',component: claimsForm },
    { path: '/claimsView', name: 'claimsView.vue',component: claimsView },
    { path: '/claimsListView', name: 'claimsListView.vue',component: claimsListView },
    { path: '/claimsOpenInvoice', name: 'claimsOpenInvoice.vue',component: claimsOpenInvoice },
    { path: '/selectBankDetailInsurance', name: 'selectBankDetailInsurance.vue',component: selectBankDetailInsurance },

    { path: '/finPosAccountDetailsForm', name: 'finPosAccountDetailsForm.vue',component: finPosAccountDetailsForm },
    { path: '/finPosAccountDetailForm', name: 'finPosAccountDetailForm.vue',component: finPosAccountDetailForm },
    { path: '/finPosAccountDetailView', name: 'finPosAccountDetailView.vue',component: finPosAccountDetailView },

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
    { path: '/addTestForm', name: 'addTestForm.vue',component: addTestForm },
    { path: '/vehicleView', name: 'vehicleView.vue',component: vehicleView },
    { path: '/saveModelForm', name: 'saveModelForm.vue',component: saveModelForm },
    { path: '/saveVersionForm', name: 'saveVersionForm.vue',component: saveVersionForm },
    { path: '/saveVersionForm', name: 'saveVersionForm.vue',component: saveVersionForm },

    { path: '/approvalInsuranceView', name: 'approvalInsuranceView.vue',component: approvalInsuranceView },
    { path: '/approvalPassMessage', name: 'approvalPassMessage.vue',component: approvalPassMessage },
    { path: '/insuranceRejectReason', name: 'insuranceRejectReason.vue',component: insuranceRejectReason },

    { path: '/cashierView', name: 'cashierView.vue',component: cashierView },
    { path: '/cashierBankDetailForm', name: 'cashierBankDetailForm.vue',component: cashierBankDetailForm },
    { path: '/cashierBankDetailPrivateForm', name: 'cashierBankDetailPrivateForm.vue', component: cashierBankDetailPrivateForm },

    { path: '/trackForm', name: 'trackForm.vue',component: trackForm },
    { path: '/trackView', name: 'trackView.vue',component: trackView },
    { path: '/trackFormView', name: 'trackFormView.vue',component: trackFormView },

    { path: '/trackDetailsView', name: 'trackDetailsView.vue',component: trackDetailsView },

    { path: '/billingForm', name: 'billingForm.vue',component: billingForm },
    { path: '/billingFile', name: 'billingFile.vue',component: billingFile },
    { path: '/billingView', name: 'billingView.vue',component: billingView },
    { path: '/billingApprovalApplyForm', name: 'billingApprovalApplyForm.vue',component: billingApprovalApplyForm },

    { path: '/policyView', name: 'policyView.vue',component: policyView },
    { path: '/surrenderView', name: 'surrenderView.vue',component: surrenderView },
    { path: '/policyExpectedView', name: 'policyExpectedView.vue',component: policyExpectedView },
    { path: '/poNumbering', name: 'poNumbering.vue',component: poNumbering },
    { path: '/poNumberView', name: 'poNumberView.vue',component: poNumberView },
    { path: '/receivableForm', name: 'receivableForm.vue',component: receivableForm },
    { path: '/receivableForceWriteOffFrom', name: 'receivableForceWriteOffFrom.vue',component: receivableForceWriteOffFrom },
    { path: '/selectReceivableForceWriteOff', name: 'selectReceivableForceWriteOff.vue',component: selectReceivableForceWriteOff },

    { path: '/accountCancellation', name: 'accountCancellation.vue',component: accountCancellation },

    { path: '/receivableView', name: 'receivableView.vue',component: receivableView },
    { path: '/coreWarehouseView', name: 'coreWarehouseView.vue',component: coreWarehouseView },
    { path: '/accountsReceivableView', name: 'accountsReceivableView.vue',component: accountsReceivableView },
    { path: '/accountExpectedView', name: 'accountExpectedView.vue',component: accountExpectedView },
    { path: '/unitDatailsView', name: 'unitDatailsView.vue',component: unitDatailsView },
    { path: '/customerRebatesView', name: 'customerRebatesView.vue',component: customerRebatesView },
    { path: '/customerRebates', name: 'customerRebates.vue',component: customerRebates },

    { path: '/insuranceProcessForm', name: 'insuranceProcessForm.vue',component: insuranceProcessForm },
    { path: '/cashRegisterForm', name: 'cashRegisterForm.vue',component: cashRegisterForm },
    { path: '/vipRateForm', name: 'vipRateForm.vue',component: vipRateForm },

    { path: '/stockOutForm', name: 'stockOutForm.vue',component: stockOutForm},
    { path: '/stockOutView', name: 'stockOutView.vue',component: stockOutView},
    { path:'/stockOutDetailsForm',name:'stockOutDetailsForm.vue',component: stockOutDetailsForm},
    { path:'/approvalMessage', name:'approvalMessage.vue',component: approvalMessage},
    { path:'/stockInModifyView', name:'stockInModifyView.vue',component: stockInModifyView},
    { path:'/receivableCenterView', name:'receivableCenterView.vue',component: receivableCenterView},

    { path:'/stockOutOperateView', name:'stockOutOperateView.vue', component:stockOutOperateView },
    { path:'/stockOutSelectProductView', name:'stockOutSelectProductView.vue', component:stockOutSelectProductView },
    { path:'/stockOutselectModelview', name:'stockOutselectModelview.vue', component:stockOutselectModelview },
    { path:'/stockOperateView', name:'stockOperateView.vue', component:stockOperateView },
    { path:'/stockinLocationFrom', name:'stockinLocationFrom.vue', component:stockinLocationFrom },
    { path:'/stockOperateviewView', name:'stockOperateviewView.vue', component:stockOperateviewView },
    { path:'/stockOutOperateForm', name:'stockOutOperateForm.vue', component:stockOutOperateForm },
    { path:'/receivableManagerView', name:'receivableManagerView.vue',component: receivableManagerView},
    { path:'/receivableBadDebtForm', name:'receivableBadDebtForm.vue',component: receivableBadDebtForm},
    { path:'/insuranceMakeUpForm', name:'insuranceMakeUpForm.vue',component: insuranceMakeUpForm},
    { path:'/insuranceMakeUpAccountForm', name:'insuranceMakeUpAccountForm.vue',component: insuranceMakeUpAccountForm},
    { path:'/importFrom', name:'importFrom.vue',component: importFrom},
    { path:'/courierCompanyForm', name:'courierCompanyForm.vue',component: courierCompanyForm},
    { path:'/selectExpressNot', name:'selectExpressNot.vue',component: selectExpressNot},
    { path:'/expressReconciliationForm', name:'expressReconciliationForm.vue',component: expressReconciliationForm},
    { path:'/courierCompanyDetailsView', name:'courierCompanyDetailsView.vue',component: courierCompanyDetailsView},
    { path:'/storedCardForm', name:'storedCardForm.vue',component: storedCardForm},
    { path:'/rechargeRecordView', name:'rechargeRecordView.vue',component: rechargeRecordView},
    { path:'/courierCompanyView', name:'courierCompanyView.vue',component: courierCompanyView},
    { path:'/expressDeliveryForm', name:'expressDeliveryForm.vue',component: expressDeliveryForm},
    { path:'/expressDeliveryView', name:'expressDeliveryView.vue',component: expressDeliveryView},
    { path:'/myAdminExpressView', name:'myAdminExpressView.vue',component: myAdminExpressView},
    { path:'/expressDeliveryBasic', name:'expressDeliveryBasic.vue',component: expressDeliveryBasic},
    { path:'/expressDeliverySend', name:'expressDeliverySend.vue',component: expressDeliverySend},
    { path:'/expressDeliveryRecipient', name:'expressDeliveryRecipient.vue',component: expressDeliveryRecipient},
    { path:'/expressDeliveryItems', name:'expressDeliveryItems.vue',component: expressDeliveryItems},
    { path:'/expressDeliveryCost', name:'expressDeliveryCost.vue',component: expressDeliveryCost},
    { path:'/expressDeliveryConfirm', name:'expressDeliveryConfirm.vue',component: expressDeliveryConfirm},
    { path:'/selectDoes', name:'selectDoes.vue',component: selectDoes},
    { path:'/cancelAppointment', name:'cancelAppointment.vue',component: cancelAppointment},


    { path:'/warnForm', name:'warnForm.vue',component: warnForm},
    { path:'/depositForm', name:'depositForm.vue',component: depositForm},
    { path:'/depositView', name:'depositView.vue',component: depositView},
    { path:'/payDepositForm', name:'payDepositForm.vue',component: payDepositForm},
    { path:'/payDepositView', name:'payDepositView.vue',component: payDepositView},
    { path:'/receipt', name:'receipt.vue',component: receipt},


    { path:'/warnFormView', name:'warnFormView.vue',component: warnFormView},

    { path:'/warnDetailform', name:'warnDetailform.vue',component: warnDetailform},
    { path:'/warnTimeoutSelect', name:'warnTimeoutSelect.vue',component: warnTimeoutSelect},
    { path:'/myWarnForm', name:'myWarnForm.vue',component: myWarnForm},
    { path:'/myExpressForm', name:'myExpressForm.vue',component: myExpressForm},
    { path:'/myArticleRegistrationForm', name:'myArticleRegistrationForm.vue',component: myArticleRegistrationForm},
    { path:'/reimbursementLlimitForm', name:'reimbursementLlimitForm.vue',component: reimbursementLlimitForm},
    { path:'/reimbursementLlimitView', name:'reimbursementLlimitView.vue',component: reimbursementLlimitView},
    { path:'/expressApprovalView', name:'expressApprovalView.vue',component: expressApprovalView},
    { path:'/myExpressView', name:'myExpressView.vue',component: myExpressView},
    { path:'/insurancePolicyView', name:'insurancePolicyView.vue',component: insurancePolicyView},
    { path:'/addressbookView', name:'addressbookView.vue',component: addressbookView},


    { path:'/selectReceivableDetail', name:'selectReceivableDetail.vue',component: selectReceivableDetail},
    { path:'/insuranceInvoiceDetails', name:'insuranceInvoiceDetails.vue',component: insuranceInvoiceDetails},
    { path:'/selectInvoiceView', name:'selectInvoiceView.vue',component: selectInvoiceView},


    { path:'/receivableSourceForm', name:'receivableSourceForm.vue',component: receivableSourceForm},
    { path:'/invoicUnitWhitelistForm', name:'invoicUnitWhitelistForm.vue',component: invoicUnitWhitelistForm},

    { path:'/receivableSourceManagerView', name:'receivableSourceManagerView.vue',component: receivableSourceManagerView},
    { path:'/receivableBadDebtView', name:'receivableBadDebtView.vue',component: receivableBadDebtView},
    { path:'/receiveInsuranceCartogram', name:'receiveInsuranceCartogram.vue',component: receiveInsuranceCartogram},
    { path:'/invoiceCartogram', name:'invoiceCartogram.vue',component: invoiceCartogram},
    { path:'/receiveInsuranceFiles', name:'receiveInsuranceFiles.vue',component: receiveInsuranceFiles},
    { path:'/receivePaymentDetails', name:'receivePaymentDetails.vue',component: receivePaymentDetails},
    { path:'/payInsuranceCartogram', name:'payInsuranceCartogram.vue',component: payInsuranceCartogram},
    { path:'/capitalTrendsTodayCartogram', name:'capitalTrendsTodayCartogram.vue',component: capitalTrendsTodayCartogram},
    { path:'/scanCode', name:'scanCode.vue',component: scanCode},
    { path:'/dic25', name:'dic25.vue',component: dic25},
    { path:'/dic16', name:'dic16.vue',component: dic16},
    { path:'/dicView', name:'dicView.vue',component: dicView},

    /* APP端路由 */
    {
      path:'/homeApp',name:'homeApp', component: homeApp,
      children:[
        { path: '/homeApp/testApp', name: 'testApp', component: testApp ,meta: {title: 'app端测试'}},
        { path: '/homeApp/m_myApprovalManager', name: 'm_myApprovalManager', component: m_myApprovalManager ,meta: {title: '北京海派办公系统'}},
        { path: '/homeApp/newsManager', name: 'newsManager', component: newsManager ,meta: {title: '北京海派办公系统'}},
        { path: '/homeApp/mineManager', name: 'mineManager', component: mineManager ,meta: {title: '北京海派办公系统'}},

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

        { path: '/homeApp/m_approvalPrettyCashsManager', name: 'm_approvalPrettyCashsManager', component: m_approvalPrettyCashsManager ,meta: {title: '备用金'}},
        { path: '/homeApp/m_approvalPrettyCashsView', name: 'm_approvalPrettyCashsView', component: m_approvalPrettyCashsView ,meta: {title: '备用金'}},
        { path: '/homeApp/m_finPrettyCashsManager', name: 'm_finPrettyCashsManager', component: m_finPrettyCashsManager ,meta: {title: '备用金'}},
        { path: '/homeApp/m_finPrettyCashsView', name: 'm_finPrettyCashsView', component: m_finPrettyCashsView ,meta: {title: '备用金'}},


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
