import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path:'/', name:'home', component: ()=> import('./views/Home'),
      children: [
        { path: '/home/desktop', name: 'home.desktop', component: ()=> import('./components/desktop') , meta: {title: '北京海派奥特经贸有限公司办公系统'}},
        { path: '/home/approvalPersonaliseManager', name: 'approvalPersonaliseManager.vue', component: ()=> import('./pages/approvalPriority/approvalPersonaliseManager') , meta: {title: '审批定制管理'}},
        { path: '/home/approvalPriorityManager', name: 'approvalPriorityManager.vue', component: ()=> import('./pages/approvalPriority/approvalPriorityManager') , meta: {title: '审批管理'}},
        { path: '/home/reversalAccountManager', name: 'reversalAccountManager.vue', component: ()=> import('./pages/approvalPriority/reversalAccountManager') , meta: {title: '冲账管理'}},
        { path: '/home/boardFeesManager', name: 'boardFeEsManager.vue', component: ()=> import('./pages/approvalPriority/boardFeesManager') ,meta: {title: '董事会费管理'}},
        { path: '/home/rversalManager', name: 'rversalManager.vue', component: ()=> import('./pages/rversal/rversalManager.vue')  ,meta: {title: '冲账管理'}},
        { path: '/home/flowsManager', name: 'flowsManager.vue', component: ()=> import('./pages/flows/flowsManager') , meta: {title: '流程管理'}},
        { path: '/home/paymentPlanDate', name: 'paymentPlanDate.vue', component: ()=> import('./pages/paymentPlan/myPaymentPlanDate') , meta: {title: '付款计划'}},
        { path: '/home/psdManager', name: 'psdManager.vue', component: ()=> import('./pages/psd/psdManager') , meta: {title: '素材管理'}},
        { path: '/home/usersManager', name: 'usersManager.vue', component: ()=> import('./pages/users/usersManager') , meta: {title: '用户管理'}},
        { path: '/home/myPaymentPlanManager', name: 'paymentPlanManager.vue', component: ()=> import('./pages/paymentPlan/myPaymentPlanManager') , meta: {title: '付款计划'}},
        { path: '/home/myManager/paymentApplyManager', name: 'paymentApplyManager.vue',component: ()=> import('./pages/paymentApply/myPaymentApplyManager') , meta: {title: '付款申请'}},
        { path: '/home/myManager/reimbursementManager', name: 'reimbursementManager.vue',component: ()=> import('./pages/reimbursement/myReimbursementManager') , meta: {title: '我的报销'}},
        { path: '/home/myManager/signatureManager', name: 'signatureManager.vue',component: ()=> import('./pages/signaturePage/signatureManager') , meta: {title: '补签字'}},
        { path: '/home/appManager', name: 'appManager.vue',component: ()=> import('./pages/app/appManager') , meta: {title: '菜单管理'}},
        { path: '/home/myElectronicInvoiceManager', name: 'myElectronicInvoiceManager.vue',component: ()=> import('./pages/electronicInvoice/myElectronicInvoiceManager') , meta: {title: '我的电子发票'}},
        { path: '/home/prettyCashsManager', name: 'prettyCashsManager.vue',component: ()=> import('./pages/prettyCashs/prettyCashsManager.vue') , meta: {title: '备用金'}},

        { path: '/home/approvalPrettyCashs', name: 'approvalPrettyCashs.vue',component: ()=> import('./pages/prettyCashs/approvalPrettyCashs.vue') , meta: {title: '备用金审批'}},
        { path: '/home/approvalPayManager', name: 'approvalPayManager.vue',component: ()=> import('./pages/paymentApply/approvalApplyManager') , meta: {title: '付款申请审批'}},
        { path: '/home/approvalPayPlanManager', name: 'approvalPayPlanManager.vue',component: ()=> import('./pages/paymentPlan/approvalPayPlanManager') , meta: {title: '付款计划审批'}},
        { path: '/home/approvalReimbursementManager', name: 'approvalReimbursementManager.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementManager') , meta: {title: '报销审批'}},

        { path: '/home/electronicInvoiceManager', name: 'electronicInvoiceManager.vue', component: ()=> import('./pages/electronicInvoice/electronicInvoiceManager')  , meta: {title: '电子发票'}},
        { path: '/home/departmentManager', name: 'departmentManager.vue', component: ()=> import('./pages/department/departmentManager')  , meta: {title: '部门管理'}},
        { path: '/home/usersUpdatePwdManager', name: 'usersUpdatePwdManager.vue', component: ()=> import('./pages/users/usersUpdatePwdManager')  , meta: {title: '修改密码'}},
        { path: '/home/viewManager/paymentApplyViewManager', name: 'paymentApplyViewManager.vue', component: ()=> import('./pages/paymentApply/finPaymentApplyManager')  , meta: {title: '付款申请管理'}},
        { path: '/home/viewManager/reimbursementViewManager', name: 'reimbursementViewManager.vue', component: ()=> import('./pages/reimbursement/finReimbursementViewManager')  , meta: {title: '报销管理'}},
        { path: '/home/viewManager/paymentPlanViewManager', name: 'paymentPlanViewManager.vue', component: ()=> import('./pages/paymentPlan/finPaymentPlanManager')  , meta: {title: '付款计划管理'}},
        { path: '/home/businessAssortManager', name: 'businessAssortManager.vue', component: ()=> import('./pages/basic/businessAssort/businessAssortManager')},
        { path: '/home/repairReception/workAssortManager', name: 'workAssortManager.vue', component: ()=> import('./pages/basic/workAssort/workAssortManager'), meta: {title: '工单分类'}},
        { path: '/home/repairReception/sourceManager', name: 'sourceManager.vue', component: ()=> import('./pages/basic/source/sourceManager') ,meta: {title: '业务来源'}},
        { path: '/home/repairReception/operationAssortManager', name: 'operationAssortManager.vue', component: ()=> import('./pages/basic/operationAssort/operationAssortManager'), meta: {title: '作业分类'}},
        { path: '/home/keeprepairManager', name: 'keeprepairManager.vue', component: ()=> import('./pages/basic/keeprepair/keeprepairManager'), meta: {title: '维修项目'}},
        { path: '/home/unitManager', name: 'unitManager.vue', component: ()=> import('./pages/unit/unitManager')  , meta: {title: '单位管理'}},
        { path: '/home/personManager', name: 'personManager.vue', component: ()=> import('./pages/person/personManager')  , meta: {title: '联系人管理'}},
        { path: '/home/supplierManager', name: 'supplierManager.vue', component: ()=> import('./pages/basic/supplier/supplierManager')},

        { path: '/home/bankDetailCashierManager', name: 'bankDetailCashierManager.vue', component: ()=> import('./pages/bankDetailCashier/bankDetailCashierManager')},

        { path: '/home/checkManager', name: 'checkManager.vue', component: ()=> import('./pages/check/checkManager') , meta: {title: '支票管理'}},
        { path: '/home/checkExpendManager', name: 'checkExpendManager.vue', component: ()=> import('./pages/check/checkExpendManager') , meta: {title: '支票管理'}},
        { path: '/home/checkTilingManager', name: 'checkTilingManager.vue', component: ()=> import('./pages/check/checkTilingManager') , meta: {title: '支票管理'}},

        { path: '/home/myReceivableManager', name: 'myReceivableManager.vue', component: ()=> import('./pages/receivable/myReceivableManager')},
        { path: '/home/finReceivableManager', name: 'finReceivableManager.vue', component: ()=> import('./pages/receivable/finReceivableManager')},

        { path: '/home/invoiceTilingManager', name: 'invoiceTilingManager.vue', component: ()=> import('./pages/invoice/invoiceTilingManager') , meta: {title: '发票管理'}},
        { path: '/home/invoiceListManager', name: 'invoiceListManager.vue', component: ()=> import('./pages/invoice/invoiceListManager') , meta: {title: '发票管理'}},
        { path: '/home/invoiceWarehouManager', name: 'invoiceWarehouManager.vue', component: ()=> import('./pages/invoice/invoiceWarehouManager') , meta: {title: '发票管理'}},
        { path: '/home/openInvoiceManager', name: 'openInvoiceManager.vue', component: ()=> import('./pages/openInvoice/openInvoiceManager')},

        { path: '/home/invoiceManager', name: 'invoiceManager.vue', component: ()=> import('./pages/basic/invoice/invoiceManager') , meta: {title: '发票管理'}},
        { path: '/home/settleAccountManager', name: 'settleAccountManager.vue', component: ()=> import('./pages/basic/settleAccount/settleAccountManager')},
        { path: '/home/returnVisit/satisfactionManager', name: 'satisfactionManager.vue', component: ()=> import('./pages/basic/satisfaction/satisfactionManager'), meta: {title: '客户回访'}},
        { path: '/home/complaintManager', name: 'complaintManager.vue', component: ()=> import('./pages/basic/complaint/complaintManager'), meta: {title: '客户投诉'}},
        { path: '/home/repairWorkManager', name: 'repairWorkManager.vue', component: ()=> import('./pages/basic/repairWork/repairWorkManager')},

        { path: '/home/publicAccountManager', name: 'publicAccountManager.vue', component: ()=> import('./pages/accNum/publicAccount/publicAccountManager') , meta: {title: '对公账号'}},
        { path: '/home/privateAccountManager', name: 'privateAccountManager.vue', component: ()=> import('./pages/accNum/privateAccount/privateAccountManager') , meta: {title: '对私账号'}},

        { path: '/home/productManager', name: 'productManager.vue', component: ()=> import('./pages/product/product/productManager')  ,meta: {title: '商品管理'}},
        { path: '/home/myPurchaseManager', name: 'myPurchaseManager.vue', component: ()=> import('./pages/purchase/myPurchaseManager')  ,meta: {title: '采购计划'}},
        { path: '/home/approvalPurchaseManager', name: 'approvalPurchaseManager.vue', component: ()=> import('./pages/purchase/approvalPurchaseManager')  ,meta: {title: '采购审批'}},
        { path: '/home/awaitPurchaseManager', name: 'awaitPurchaseManager.vue', component: ()=> import('./pages/purchase/awaitPurchaseManager')},
        { path: '/home/purchasePersonManager', name: 'purchasePersonManager.vue', component: ()=> import('./pages/purchase/purchasePersonManager')},
        { path: '/home/warehouseEntryManager', name: 'warehouseEntryManager.vue', component: ()=> import('./pages/Inventory/warehouseEntryManager')},
        { path: '/home/inStockManager', name: 'inStockManager.vue', component: ()=> import('./pages/Inventory/inStockManager')},
        { path: '/home/warehouseExitManager', name: 'warehouseExitManager.vue', component: ()=> import('./pages/Inventory/warehouseExitManager')},

        { path: '/home/information/carManager', name: 'carManager.vue', component: ()=> import('./pages/basic/insurancePolicy/information/car/carManager')},

        { path: '/home/information/handlePersonManager', name: 'handlePersonManager.vue', component: ()=> import('./pages/basic/insurancePolicy/information/handlePerson/handlePersonManager'), meta: {title: '办理人员'}},
        { path: '/home/lnsurance/policyInformationManager', name: 'policyInformationManager.vue', component: ()=> import('./pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationManager'), meta: {title: '保单信息'}},
        { path: '/home/lnsurance/financialInformationManager', name: 'financialInformationManager.vue', component: ()=> import('./pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationManager'), meta: {title: '财务信息'}},
        { path: '/home/lnsurance/insuranceCompanyManager', name: 'insuranceCompanyManager.vue', component: ()=> import('./pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyManager'), meta: {title: '保险公司'}},
        { path: '/home/insuranceUnitManager', name: 'insuranceUnitManager.vue', component: ()=> import('./pages/insurance/unit/insuranceUnitManager'), meta: {title: '管理保险公司'}},

        { path: '/home/insurance/clientManager', name: 'clientManager.vue', component: ()=> import('./pages/insurance/client/clientManager'), meta: {title: '客户管理'}},

        { path: '/home/cashierManager', name: 'cashierManager.vue', component: ()=> import('./pages/cashier/cashierManager') ,meta: {title: '收银管理'}},
        { path: '/home/approvalInsuranceManager', name: 'approvalInsuranceManager.vue', component: ()=> import('./pages/InsuranceApproval/approvalInsuranceManager') ,meta: {title: '保险审批'}},
        { path: '/home/vehicleManager', name: 'vehicleManager.vue', component: ()=> import('./pages/basic/vehicle/vehicleManager') ,meta: {title: '车辆管理'}},
        { path: '/home/track/trackManager', name: 'trackManager.vue', component: ()=> import('./pages/basic/track/trackManager') ,meta: {title: '跟踪信息'}},
        { path: '/home/billing/billingManager', name: 'billingManager.vue', component: ()=> import('./pages/insurance/billing/billingManager') ,meta: {title: '出单管理'}},
        { path: '/home/policy/policyManager', name: 'policyManager.vue', component: ()=> import('./pages/insurance/policy/policyManager') ,meta: {title: '保单管理'}},

        { path: '/home/trackDetails/trackDetailsManager', name: 'trackDetailsManager.vue', component: ()=> import('./pages/basic/trackDetails/trackDetailsManager') ,meta: {title: '跟踪细节'}},

        { path: '/home/insuranceProcessManager', name: 'insuranceProcessManager.vue', component: ()=> import('./pages/approvalPriority/insuranceProcessManager') ,meta: {title: '保险审批制定'}},

      ]
    },
    { path: '/approvalPersonaliseForm', name: 'approvalPersonaliseForm', component: ()=> import('./pages/approvalPriority/approvalPersonaliseForm')},
    { path: '/approvalPriorityForm', name: 'approvalPriorityForm', component: ()=> import('./pages/approvalPriority/approvalPriorityForm')},
    { path: '/reversalAccountForm', name: 'reversalAccountForm', component: ()=> import('./pages/approvalPriority/reversalAccountForm')},
    { path: '/boardFeesForm', name: 'boardFeesForm', component: ()=> import('./pages/approvalPriority/boardFeesForm')},
    { path: '/rversalForm', name: 'rversalForm', component: ()=> import('./pages/rversal/rversalForm.vue')},
    { path: '/myPaymentPlanForm', name: 'PaymentPlanForm', component: ()=> import('./pages/paymentPlan/myPaymentPlanForm')},
    { path: '/myPaymentPlanDetailForm', name: 'PaymentPlanDetailForm', component: ()=> import('./pages/paymentPlan/myPaymentPlanDetailForm')},
    { path: '/PaymentPlanFormView', name: 'PaymentPlanFormView', component: ()=> import('./pages/paymentPlan/myPaymentPlanFormView')},
    { path: '/PaymentPlanDetailFormView', name: 'PaymentPlanDetailFormView', component: ()=> import('./pages/paymentPlan/myPaymentPlanDetailFormView')},

    { path: '/selectDic', name: 'selectDic', component: ()=> import('./pages/selects/selectDic')},

    { path: '/dicForm089', name: 'dicForm089', component: ()=> import('./pages/selects/dic/dicForm089')},
    { path: '/dicForm090', name: 'dicForm090', component: ()=> import('./pages/selects/dic/dicForm090')},
    { path: '/dicForm091', name: 'dicForm091', component: ()=> import('./pages/selects/dic/dicForm091')},

    { path: '/selectPublicAccount', name: 'selectPublicAccount', component: ()=> import('./pages/selects/selectPublicAccount')},
    { path: '/selectPrivateAccount', name: 'selectPrivateAccount', component: ()=> import('./pages/selects/selectPrivateAccount')},
    { path: '/selectUnit', name: 'selectUnit', component: ()=> import('./pages/selects/selectUnit')},
    { path: '/selectPaymentApplyDetail', name: 'selectPaymentApplyDetail', component: ()=> import('./pages/selects/selectPaymentApplyDetail')},
    { path: '/selectUsersWxInfo', name: 'selectUsersWxInfo', component: ()=> import('./pages/selects/selectUsersWxInfo')},
    { path: '/selectBankDetail', name: 'selectBankDetail', component: ()=> import('./pages/selects/selectBankDetail')},
    { path: '/selectChecksDetail', name: 'selectChecksDetail', component: ()=> import('./pages/selects/selectChecksDetail')},
    { path: '/selectPrettyCashs', name: 'selectPrettyCashs', component: ()=> import('./pages/selects/selectPrettyCashs.vue')},
    { path: '/selectPlate', name: 'selectPlate.vue',component: ()=> import('./pages/selects/selectPlate') },
    { path: '/selectPerson', name: 'selectPerson', component: ()=> import('./pages/selects/selectPerson')},
    { path: '/selectPlanDate', name: 'selectPlanDate', component: ()=> import('./pages/selects/selectPlanDate')},
    { path: '/selectDepartment', name: 'selectDepartment', component: ()=> import('./pages/selects/selectDepartment')},
    { path: '/selectElectronicInvoice', name: 'selectElectronicInvoice', component: ()=> import('./pages/selects/selectElectronicInvoice')},
    { path: '/selectInvoiceDetail', name: 'selectInvoiceDetail.vue',component: ()=> import('./pages/selects/selectInvoiceDetail') },
    { path: '/selectVersion', name: 'selectVersion.vue',component: ()=> import('./pages/selects/selectVersion') },
    { path: '/selectPage', name: 'selectPage.vue',component: ()=> import('./test/selectPage') ,meta: {title: '页面测试'}},
    { path: '/selectProduct', name: 'selectProduct.vue',component: ()=> import('./pages/product/product/selectProduct') },
    { path: '/selectModel', name: 'selectModel.vue',component: ()=> import('./pages/selects/selectModel') },
    { path: '/selectFormPlate', name: 'selectFormPlate.vue',component: ()=> import('./pages/insurance/billing/selectFormPlate') },


    { path: '/demo', name: 'home.vue', component: ()=> import('./pages/selects/demo') ,meta: {title: '组件测试'}},

    { path: '/checkForm', name: 'checkForm.vue', component: ()=> import('./pages/check/checkForm')},
    { path: '/addCheckNumForm', name: 'addCheckNumForm.vue', component: ()=> import('./pages/check/addCheckNumForm')},
    { path: '/checkExpendView', name: 'checkExpendView.vue', component: ()=> import('./pages/check/checkExpendView')},
    { path: '/checkFillOut', name: 'checkFillOut.vue', component: ()=> import('./pages/check/checkOpera/checkFillOut')},
    { path: '/blackCheckOut', name: 'blackCheckOut.vue', component: ()=> import('./pages/check/checkOpera/blackCheckOut')},
    { path: '/toVoidCheck', name: 'toVoidCheck.vue', component: ()=> import('./pages/check/checkOpera/toVoidCheck')},
    { path: '/accEntry', name: 'accEntry.vue', component: ()=> import('./pages/check/checkOpera/accEntry')},
    { path: '/viewCheck', name: 'viewCheck.vue', component: ()=> import('./pages/check/checkOpera/viewCheck')},
    { path: '/myReceivableForm', name: 'myReceivableForm.vue', component: ()=> import('./pages/receivable/myReceivableForm')},
    { path: '/finReceivableView', name: 'finReceivableView.vue', component: ()=> import('./pages/receivable/finReceivableView')},
    { path: '/myReceivableView', name: 'myReceivableView.vue', component: ()=> import('./pages/receivable/myReceivableView')},
    { path: '/myReceivableRegisterForm', name: 'myReceivableRegisterForm.vue', component: ()=> import('./pages/receivable/myReceivableRegisterForm')},

    { path: '/addInvoiceNumForm', name: 'addInvoiceNumForm.vue', component: ()=> import('./pages/invoice/addInvoiceNumForm')},

    { path: '/addUnitForm', name: 'addUnitForm', component: ()=> import('./pages/unit/addUnitForm')},
    { path: '/addUnitSimplifyForm', name: 'addUnitSimplifyForm', component: ()=> import('./pages/unit/addUnitSimplifyForm')},
    { path: '/unitView', name: 'unitView.vue', component: ()=> import('./pages/unit/unitView')},
    { path: '/unitDetailView', name: 'unitDetailView.vue', component: ()=> import('./pages/unit/unitDetailView')},
    { path: '/addPersonForm', name: 'addPersonForm', component: ()=> import('./pages/person/addPersonForm')},
    { path: '/addPersonSimplifyForm', name: 'addPersonSimplifyForm', component: ()=> import('./pages/person/addPersonSimplifyForm')},
    { path: '/personView', name: 'personView', component: ()=> import('./pages/person/personView.vue')},

    { path: '/publicAccountForm', name: 'publicAccountForm', component: ()=> import('./pages/accNum/publicAccount/publicAccountForm')},
    { path: '/publicAccountView', name: 'publicAccountView', component: ()=> import('./pages/accNum/publicAccount/publicAccountView')},
    { path: '/privateAccountForm', name: 'privateAccountForm', component: ()=> import('./pages/accNum/privateAccount/privateAccountForm')},
    { path: '/privateAccountView', name: 'privateAccountView', component: ()=> import('./pages/accNum/privateAccount/privateAccountView')},

    { path: '/paymentApplyForm', name: 'paymentApplyForm', component: ()=> import('./pages/paymentApply/myPaymentApplyForm')},
    { path: '/paymentApplyFormView', name: 'paymentApplyFormView', component: ()=> import('./pages/paymentApply/myPaymentApplyView')},
    { path: '/paymentInvoice', name: 'paymentInvoice', component: ()=> import('./pages/paymentApply/myPaymentInvoice')},
    { path: '/paymentWindowManager', name: 'paymentWindowManager', component: ()=> import('./pages/paymentApply/myPaymentWindowManager')},

    { path: '/flowsForm', name: 'flowsForm', component: ()=> import('./pages/flows/flowsForm')},
    { path: '/flowDetailForm', name: 'flowDetailForm', component: ()=> import('./pages/flows/flowDetailForm')},
    { path: '/login', name: 'login', component: ()=> import('./pages/login.vue') , meta: {title: '北京海派奥特经贸有限公司办公系统'}},
    { path: '/psdForm', name: 'psdForm', component: ()=> import('./pages/psd/psdForm')},
    { path: '/bankDetailForm', name: 'bankDetailForm', component: ()=> import('./pages/bankDetail/bankDetailForm')},
    { path: '/bankDetailCashierForm', name: 'bankDetailCashierForm', component: ()=> import('./pages/bankDetailCashier/bankDetailCashierForm')},

    { path: '/reimbursementForm', name: 'reimbursementForm', component: ()=> import('./pages/reimbursement/myReimbursementForm')},
    { path: '/reimbursementDetailForm', name: 'reimbursementDetailForm', component: ()=> import('./pages/reimbursement/myReimbursementDetailForm')},
    { path: '/appTopForm', name: 'appTopForm', component: ()=> import('./pages/app/appTopForm')},
    { path: '/appLeftForm', name: 'appLeftForm', component: ()=> import('./pages/app/appLeftForm')},
    { path: '/appForm', name: 'appForm', component: ()=> import('./pages/app/appForm')},

    { path: '/myElectronicInvoiceForm', name: 'myElectronicInvoiceForm', component: ()=> import('./pages/electronicInvoice/myElectronicInvoiceForm')},
    { path: '/myElectronicInvoiceReimburseManager', name: 'myElectronicInvoiceReimburseManager', component: ()=> import('./pages/electronicInvoice/myElectronicInvoiceReimburseManager')},
    { path: '/rejectReason', name: 'rejectReason', component: ()=> import('./pages/common/rejectReason')},
    { path: '/electronicInvoiceForm', name: 'electronicInvoiceForm', component: ()=> import('./pages/electronicInvoice/electronicInvoiceForm')},
    { path: '/electronicInvoiceView', name: 'electronicInvoiceView', component: ()=> import('./pages/electronicInvoice/electronicInvoiceView')},
    { path: '/usersForm', name: 'usersForm', component: ()=> import('./pages/users/usersForm')},
    { path: '/departmentForm', name: 'departmentForm', component: ()=> import('./pages/department/departmentForm')},
    { path: '/departmentPersonForm', name: 'departmentPersonForm', component: ()=> import('./pages/department/departmentPersonForm')},
    { path: '/bindingManager', name: 'bindingManager', component: ()=> import('./appPages/appLogin/bindingManager')},

    { path: '/menu', name: 'menu', component: ()=> import('./appPages/menu/menu.vue')},
    { path: '/purchasingApproval', name: 'purchasingApproval', component: ()=> import('./appPages/menu/purchasingApproval.vue')},
    { path: '/approvalPaymentBuy', name: 'approvalPaymentBuy', component: ()=> import('./appPages/paymentBuy/approvalPaymentBuy.vue')},
    { path: '/approvalReimbursement', name: 'approvalReimbursement', component: ()=> import('./appPages/reimbursement/approvalReimbursement.vue')},

    { path: '/correct', name: 'correct', component: ()=> import('./appPages/promptmessage/correct')},
    { path: '/failure', name: 'failure', component: ()=> import('./appPages/promptmessage/failure')},
    { path: '/loginSc', name: 'loginSc', component: ()=> import('./appPages/appLogin/loginSc.vue')},
    { path: '/loginScSuccess', name: 'loginScSuccess', component: ()=> import('./appPages/appLogin/landing/loginScSuccess')},
    { path: '/loginScCancel', name: 'loginScCancel', component: ()=> import('./appPages/appLogin/landing/loginScCancel')},

    { path: '/approvalPayForm', name: 'approvalPayForm.vue',component: ()=> import('./pages/paymentPlan/approvalPayPlanForm') },
    { path: '/approvalPlanDetailForm', name: 'approvalPlanDetailForm.vue',component: ()=> import('./pages/paymentPlan/approvalPayPlanDetailForm') },
    { path: '/approvalApplyView', name: 'approvalApplyView.vue',component: ()=> import('./pages/paymentApply/approvalApplyForm') },
    { path: '/approvalReimbursementForm', name: 'approvalReimbursementForm.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementForm.vue') },
    { path: '/approvalReimbursementDetailForm', name: 'approvalReimbursementDetailForm.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementDetailForm.vue') },
    { path: '/approvalReimbursementFund', name: 'approvalReimbursementFund.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementFund.vue') },
    { path: '/approvalReimbursementPrint', name: 'approvalReimbursementPrint.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementPrint.vue') },
    { path: '/approvalReimbursementPrintBYJ', name: 'approvalReimbursementPrintBYJ.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementPrintBYJ.vue') },
    { path: '/approvalReimbursementSingleSplitForm', name: 'approvalReimbursementSingleSplitForm.vue',component: ()=> import('./pages/reimbursement/approvalReimbursementSingleSplitForm') },

    { path: '/invoiceWarehouFrom', name: 'invoiceWarehouFrom.vue',component: ()=> import('./pages/invoice/invoiceWarehouFrom') },
    { path: '/invoiceView', name: 'invoiceView.vue',component: ()=> import('./pages/invoice/invoiceView') },
    { path: '/toVoidInvoice', name: 'toVoidInvoice.vue',component: ()=> import('./pages/invoice/invoiceOpera/toVoidInvoice') },
    { path: '/toVoidInvoiceMore', name: 'toVoidInvoiceMore.vue',component: ()=> import('./pages/invoice/invoiceOpera/toVoidInvoiceMore') },
    { path: '/openInvoiceForm', name: 'openInvoiceForm.vue',component: ()=> import('./pages/openInvoice/openInvoiceForm') },
    { path: '/openInvoiceView', name: 'openInvoiceView.vue',component: ()=> import('./pages/openInvoice/openInvoiceView') },

    { path: '/paymentApplyViewForm', name: 'paymentApplyViewForm.vue',component: ()=> import('./pages/paymentApply/finPaymentApplyForm') },
    { path: '/reimbursementViewForm', name: 'reimbursementViewForm.vue',component: ()=> import('./pages/reimbursement/finReimbursementViewForm') },
    { path: '/reimbursementViewDetailForm', name: 'reimbursementViewDetailForm.vue',component: ()=> import('./pages/reimbursement/finReimbursementViewDetailForm') },
    { path: '/reimbursementDetailFormView', name: 'reimbursementDetailFormView.vue',component: ()=> import('./pages/reimbursement/myReimbursementDetailFormView') },
    { path: '/reimbursementFormView', name: 'reimbursementFormView.vue',component: ()=> import('./pages/reimbursement/myReimbursementFormView') },
    { path: '/paymentPlanViewForm', name: 'paymentPlanViewForm.vue',component: ()=> import('./pages/paymentPlan/finPaymentPlanForm') },
    { path: '/paymentPlanViewDetailForm', name: 'paymentPlanViewDetailForm.vue',component: ()=> import('./pages/paymentPlan/finPaymentPlanDetailForm') },
    { path: '/businessAssortForm', name: 'businessAssortForm.vue',component: ()=> import('./pages/basic/businessAssort/businessAssortForm') },
    { path: '/workAssortForm', name: 'workAssortForm.vue',component: ()=> import('./pages/basic/workAssort/workAssortForm') },
    { path: '/sourceForm', name: 'sourceForm.vue',component: ()=> import('./pages/basic/source/sourceForm') },
    { path: '/operationAssortForm', name: 'operationAssortForm.vue',component: ()=> import('./pages/basic/operationAssort/operationAssortForm') },
    { path: '/keeprepairForm', name: 'keeprepairForm.vue',component: ()=> import('./pages/basic/keeprepair/keeprepairForm') },

    { path: '/supplierForm', name: 'supplierForm.vue',component: ()=> import('./pages/basic/supplier/supplierForm') },
    { path: '/invoiceForm', name: 'invoiceForm.vue',component: ()=> import('./pages/basic/invoice/invoiceForm') },

    { path: '/openBankForm', name: 'openBankForm.vue',component: ()=> import('./pages/bankAcc/openBankForm') },
    { path: '/openBankDetailForm', name: 'openBankDetailForm.vue',component: ()=> import('./pages/bankAcc/openBankDetailForm') },
    { path: '/settleAccountForm', name: 'settleAccountForm.vue',component: ()=> import('./pages/basic/settleAccount/settleAccountForm') },
    { path: '/satisfactionForm', name: 'satisfactionForm.vue',component: ()=> import('./pages/basic/satisfaction/satisfactionForm') },
    { path: '/complaintForm', name: 'complaintForm.vue',component: ()=> import('./pages/basic/complaint/complaintForm') },
    { path: '/repairWorkForm', name: 'repairWorkForm.vue',component: ()=> import('./pages/basic/repairWork/repairWorkForm') },
    { path: '/openColourForm', name: 'openColourForm.vue',component: ()=> import('./pages/basic/repairWork/openColourForm') },
    { path: '/openBrandForm', name: 'openBrandForm.vue',component: ()=> import('./pages/basic/repairWork/openBrandForm') },
    { path: '/openModelForm', name: 'openModelForm.vue',component: ()=> import('./pages/basic/repairWork/openModelForm') },
    /*{ path: '/saveModelForm', name: 'saveModelForm.vue',component: ()=> import('./pages/basic/repairWork/saveModelForm') },*/
    /*{ path: '/saveVersionForm', name: 'saveVersionForm.vue',component: ()=> import('./pages/basic/repairWork/saveVersionForm') },*/
    { path: '/carForm', name: 'carForm.vue',component: ()=> import('./pages/basic/insurancePolicy/information/car/carForm') },

    { path: '/handlePersonForm', name: 'handlePersonForm.vue',component: ()=> import('./pages/basic/insurancePolicy/information/handlePerson/handlePersonForm') },
    { path: '/policyInformationForm', name: 'policyInformationForm.vue',component: ()=> import('./pages/basic/insurancePolicy/lnsurance/policyInformation/policyInformationForm') },
    { path: '/financialInformationForm', name: 'financialInformationForm.vue',component: ()=> import('./pages/basic/insurancePolicy/lnsurance/financialInformation/financialInformationForm') },
    { path: '/insuranceCompanyForm', name: 'insuranceCompanyForm.vue',component: ()=> import('./pages/basic/insurancePolicy/lnsurance/insuranceCompany/insuranceCompanyForm') },
    { path: '/insuranceUnitForm', name: 'insuranceUnitForm.vue',component: ()=> import('./pages/insurance/unit/insuranceUnitForm') },
    { path: '/insuranceUnitDetailsForm', name: 'insuranceUnitDetailsForm.vue',component: ()=> import('./pages/insurance/unit/insuranceUnitDetailsForm') },
    { path: '/insuranceUnitView', name: 'insuranceUnitView.vue',component: ()=> import('./pages/insurance/unit/insuranceUnitView') },
    { path: '/clientForm', name: 'clientForm.vue',component: ()=> import('./pages/insurance/client/clientForm') },
    { path: '/clientView', name: 'clientView.vue',component: ()=> import('./pages/insurance/client/clientView') },

    { path: '/handleImageForm', name: 'handleImageForm.vue',component: ()=> import('./pages/common/handleImageForm.vue') ,meta: {title: '图片预览'}},
    { path: '/onlyGoogle', name: 'onlyGoogle.vue',component: ()=> import('./pages/common/onlyGoogle') },
    { path: '/batchAllocationForm', name: 'batchAllocationForm.vue',component: ()=> import('./pages/common/batchAllocationForm') },
    { path: '/videoPlay', name: 'videoPlay.vue',component: ()=> import('./pages/common/videoPlay') },
    { path: '/productForm', name: 'productForm.vue',component: ()=> import('./pages/product/product/productForm') },
    { path: '/myPurchaseForm', name: 'myPurchaseForm.vue',component: ()=> import('./pages/purchase/myPurchaseForm') },
    { path: '/myPurchaseView', name: 'myPurchaseView.vue',component: ()=> import('./pages/purchase/myPurchaseView') },
    { path: '/approvalPurchaseView', name: 'approvalPurchaseView.vue',component: ()=> import('./pages/purchase/approvalPurchaseView') },

    { path: '/awaitPurchaseView', name: 'awaitPurchaseView.vue',component: ()=> import('./pages/purchase/awaitPurchaseView') },
    { path: '/purchasePersonForm', name: 'purchasePersonForm.vue',component: ()=> import('./pages/purchase/purchasePersonForm') },
    { path: '/warehouseEntryForm', name: 'warehouseEntryForm.vue',component: ()=> import('./pages/Inventory/warehouseEntryForm') },
    { path: '/warehouseEntryView', name: 'warehouseEntryView.vue',component: ()=> import('./pages/Inventory/warehouseEntryView') },
    { path: '/warehouseExitForm', name: 'warehouseExitForm.vue',component: ()=> import('./pages/Inventory/warehouseExitForm') },
    { path: '/warehouseExitView', name: 'warehouseExitView.vue',component: ()=> import('./pages/Inventory/warehouseExitView') },

    { path: '/prettyCashsForm', name: 'prettyCashsForm.vue',component: ()=> import('./pages/prettyCashs/prettyCashsForm.vue') },

    { path: '/prettyCashsView', name: 'prettyCashsView.vue',component: ()=> import('./pages/prettyCashs/prettyCashsView.vue') },
    { path: '/approvalPrettyCashsView', name: 'approvalPrettyCashsView.vue',component: ()=> import('./pages/prettyCashs/approvalPrettyCashsView.vue') },

    { path: '/modelForm', name: 'modelForm.vue',component: ()=> import('./pages/product/model/modelForm') },

    { path: '/businessAssortForm', name: 'businessAssortForm.vue',component: ()=> import('./pages/basic/businessAssort/businessAssortForm') },
    { path: '/vehicleForm', name: 'vehicleForm.vue',component: ()=> import('./pages/basic/vehicle/vehicleForm') },
    { path: '/vehicleView', name: 'vehicleView.vue',component: ()=> import('./pages/basic/vehicle/vehicleView') },
    { path: '/saveModelForm', name: 'saveModelForm.vue',component: ()=> import('./pages/basic/vehicle/saveModelForm') },
    { path: '/saveVersionForm', name: 'saveVersionForm.vue',component: ()=> import('./pages/basic/vehicle/saveVersionForm') },

    { path: '/approvalInsuranceView', name: 'approvalInsuranceView.vue',component: ()=> import('./pages/InsuranceApproval/approvalInsuranceView') },
    { path: '/insuranceRejectReason', name: 'insuranceRejectReason.vue',component: ()=> import('./pages/InsuranceApproval/insuranceRejectReason') },

    { path: '/cashierView', name: 'cashierView.vue',component: ()=> import('./pages/cashier/cashierView') },
    { path: '/cashierBankDetailForm', name: 'cashierBankDetailForm.vue',component: ()=> import('./pages/cashier/cashierBankDetailForm') },

    { path: '/trackForm', name: 'trackForm.vue',component: ()=> import('./pages/basic/track/trackForm') },
    { path: '/trackView', name: 'trackView.vue',component: ()=> import('./pages/basic/track/trackView') },
    { path: '/trackFormView', name: 'trackFormView.vue',component: ()=> import('./pages/basic/track/trackFormView') },

    { path: '/trackDetailsView', name: 'trackDetailsView.vue',component: ()=> import('./pages/basic/trackDetails/trackDetailsView') },

    { path: '/billingForm', name: 'billingForm.vue',component: ()=> import('./pages/insurance/billing/billingForm') },
    { path: '/billingView', name: 'billingView.vue',component: ()=> import('./pages/insurance/billing/billingView') },

    { path: '/policyView', name: 'policyView.vue',component: ()=> import('./pages/insurance/policy/policyView') },

    { path: '/insuranceProcessForm', name: 'insuranceProcessForm.vue',component: ()=> import('./pages/approvalPriority/insuranceProcessForm') },


    /*手机页面*/
    {
      path:'/homeApp',name:'homeApp',component: ()=> import('./views/homeApp.vue'),
      children:[
        { path: '/homeApp/testApp', name: 'testApp',component: ()=> import('./pagesApp/testApp.vue') ,meta: {title: 'app端测试'}},
        { path: '/homeApp/m_myApprovalManager', name: 'm_myApprovalManager',component: ()=> import('./pagesApp/myApproval/myApprovalManager.vue') ,meta: {title: '北京海派办公系统'}},

        { path: '/homeApp/m_myPaymentPlanManager', name: 'm_myPaymentPlanManager',component: ()=> import('./pagesApp/paymentPlan/m_myPaymentPlanManager') ,meta: {title: '付款计划审批'}},
        { path: '/homeApp/m_myPaymentPlanView', name: 'm_myPaymentPlanView',component: ()=> import('./pagesApp/paymentPlan/m_myPaymentPlanView') ,meta: {title: '付款计划审批'}},
        { path: '/homeApp/m_finPaymentPlanManager', name: 'm_finPaymentPlanManager',component: ()=> import('./pagesApp/paymentPlan/m_finPaymentPlanManager') ,meta: {title: '付款计划管理'}},
        { path: '/homeApp/m_finPaymentPlanView', name: 'm_finPaymentPlanView',component: ()=> import('./pagesApp/paymentPlan/m_finPaymentPlanView') ,meta: {title: '付款计划管理'}},

        { path: '/homeApp/m_paymentApplyManager', name: 'm_paymentApplyManager',component: ()=> import('./pagesApp/paymentApply/m_paymentApplyManager') ,meta: {title: '付款申请审批'}},
        { path: '/homeApp/m_paymentApplyView', name: 'm_paymentApplyView',component: ()=> import('./pagesApp/paymentApply/m_paymentApplyView') ,meta: {title: '付款申请审批'}},
        { path: '/homeApp/m_finPaymentApplyManager', name: 'm_finPaymentApplyManager',component: ()=> import('./pagesApp/paymentApply/m_finPaymentApplyManager') ,meta: {title: '付款申请管理'}},
        { path: '/homeApp/m_finPaymentApplyView', name: 'm_finPaymentApplyView',component: ()=> import('./pagesApp/paymentApply/m_finPaymentApplyView') ,meta: {title: '付款申请管理'}},
        { path: '/homeApp/m_paymentApplyForm', name: 'm_paymentApplyForm',component: ()=> import('./pagesApp/paymentApply/m_paymentApplyForm') ,meta: {title: '付款申请'}},
        { path: '/homeApp/m_paymentApplyTosub', name: 'm_paymentApplyTosub',component: ()=> import('./pagesApp/paymentApply/m_paymentApplyTosub') ,meta: {title: '付款申请'}},
        { path: '/homeApp/m_paymentApplySubed', name: 'm_paymentApplySubed',component: ()=> import('./pagesApp/paymentApply/m_paymentApplySubed') ,meta: {title: '付款申请'}},

        { path: '/homeApp/m_reimbursementManager', name: 'm_reimbursementManager',component: ()=> import('./pagesApp/reimbursement/m_reimbursementManager') ,meta: {title: '报销申请审批'}},
        { path: '/homeApp/m_reimbursementView', name: 'm_reimbursementView',component: ()=> import('./pagesApp/reimbursement/m_reimbursementView') ,meta: {title: '报销申请审批'}},
        { path: '/homeApp/m_finReimbursementManager', name: 'm_finReimbursementManager',component: ()=> import('./pagesApp/reimbursement/m_finReimbursementManager') ,meta: {title: '报销申请管理'}},
        { path: '/homeApp/m_finReimbursementView', name: 'm_finReimbursementView',component: ()=> import('./pagesApp/reimbursement/m_finReimbursementView') ,meta: {title: '报销申请管理'}},

        { path: '/homeApp/m_approvalPurchaseManager', name: 'm_approvalPurchaseManager',component: ()=> import('./pagesApp/purchase/approvalPurchaseManager.vue') ,meta: {title: '采购计划'}},
        { path: '/homeApp/m_approvalPurchaseView', name: 'm_approvalPurchaseView',component: ()=> import('./pagesApp/purchase/approvalPurchaseView.vue') ,meta: {title: '采购计划'}},

        { path: '/homeApp/m_fundDynamicsChartView', name: 'm_fundDynamicsChartView',component: ()=> import('./pagesApp/fundDynamics/m_fundDynamicsChartView') ,meta: {title: '资金动态'}},
        { path: '/homeApp/m_fundDynamicsView', name: 'm_fundDynamicsView',component: ()=> import('./pagesApp/fundDynamics/m_fundDynamicsView') ,meta: {title: '资金动态'}},
        { path: '/homeApp/m_bankDetailCashierView', name: 'm_bankDetailCashierView',component: ()=> import('./pagesApp/bankDetailCashier/bankDetailCashierView') ,meta: {title: '查看收支明细信息'}},

        { path: '/homeApp/m_orderSystemMenu', name: 'm_orderSystemMenu',component:()=> import('./pagesApp/orderSystem/m_orderSystemMenu'), meta: {title: '点餐系统'}},
        { path: '/homeApp/m_orderSystemHistory', name: 'm_orderSystemHistory',component:()=> import('./pagesApp/orderSystem/m_orderSystemHistory'), meta: {title: '历史记录'}},

        { path: '/homeApp/m_rejectForm', name: 'm_rejectForm',component: ()=> import('./pagesApp/common/rejectForm.vue') ,meta: {title: '驳回理由'}},

        { path: '/homeApp/m_menu', name: 'm_menu',component: ()=> import('./pagesApp/m_menu') ,meta: {title: '测试菜单'}},
        { path: '/homeApp/m_menuBar', name: 'm_menuBar',component: ()=> import('./pagesApp/m_menuBar') ,meta: {title: '测试导航菜单'}},
        { path: '/homeApp/m_menuBars', name: 'm_menuBars',component: ()=> import('./pagesApp/m_menuBars') ,meta: {title: '测试导航菜单副本'}},

        { path: '/homeApp/m_tab', name: 'm_tab',component: ()=> import('./pagesApp/m_tab') ,meta: {title: '测试菜单'}},
      ]
    },

  ]
})
