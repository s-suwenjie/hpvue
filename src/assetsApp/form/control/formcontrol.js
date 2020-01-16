const formcontrolmixin = {
  inject: ["p____page"],
  data(){
    return {
      error: false,
      errorTipMessage: ''
    }
  },
  methods:{
    formVerificationEvent(error,errorTipMessage){
      this.error = error
      this.errorTipMessage = errorTipMessage
    }
  }
}

export{
  formcontrolmixin
}
