/*计算*/
computed:{
  totalPrice:function(){
    var totalPrice=0;
    for(let i=0;i<this.detail.length;i++){
      totalPrice += this.detail[i].money
    }
    return totalPrice;
  }
}


/*异步请求*/

this.initForm(params, 1)


this.initForm(params, 0)


async initForm (params, op) {
  let data = await this.ajaxAsync({
    url: '/PersonOffice/initPaymentPlanDetailForm',
    data: params
  })

  if (op === 0) {
    // 添加
    this.name = data.name

    this.categoryList = data.categoryPsd.list
    this.category = data.categoryPsd.value

    this.brandList = data.brandPsd.list
    this.brand = data.brandPsd.value

    this.lastDate = data.lastDate
    this.code = data.code
    this.money = data.money
    this.cause = data.cause
    this.isAutoList = data.isAutoPsd.list

    this.useNumList = data.useNumPsd.list
    this.useNum = data.useNumPsd.value
    this.fileList = data.files
  } else {
    // 查看和修改
    console.log('我在这里')
    this.categoryList = data.categoryPsd.list
    this.category = data.categoryPsd.value

    this.brandList = data.brandPsd.list
    this.brand = data.brandPsd.value

    this.isAutoList = data.isAutoPsd.list
    this.isAuto = data.isAutoPsd.value
    this.useNumList = data.useNumPsd.list

    this.useNum = data.useNumPsd.value
    this.name = data.name
    this.lastDate = data.lastDate
    this.code = data.code
    this.cause = data.cause
    this.money = data.money
    this.state = data.state
    this.isFinish = data.isFinish
    this.unitID = data.unitID
    this.otherUnitID = data.otherUnitID
    this.otherAccountID = data.otherAccountID
    this.ownerID = data.ownerID
    this.fileList = data.files
  }
  console.log(data)
},
