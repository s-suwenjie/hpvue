import Qs from 'qs'
import { guid } from '@/assets/common.js'
const appformmixin = {
  provide(){
    return{
      p____page:this
    }
  },
  data(){
    return {
      id: '',
      isAdd:false,
      loadFinish:false,
      p____rule:[]
    }
  },
  methods:{
    setQuery2Value(key){
      let query = Qs.parse(location.search.substring(1))
      let js = 'let val = query.' + key + '; if(val) this.' + key + ' = val;'
      eval(js)
    },
  },
  created(){
    this.setQuery2Value('id')
    if(!this.id){
      this.id = guid()
      this.isAdd = true
    }
  }
}

export{
  appformmixin
}

