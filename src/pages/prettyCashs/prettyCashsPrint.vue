<template>
    <div>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'prettyCashsPrint',
    mixins: [formmixin],
    data(){
      return{
        printHtml:'',

      }
    },
    created () {
      this.setQuery2Value('id')
        console.log(this.id)
      let params = {
          id:this.id
      }
      this.ajaxJson({
        data:params,
        url: '/PersonOffice/printPrettyCashs',
        call: (data)=>{
          this.printHtml = data.html
        }
      })
    }
  }
</script>

<style scoped>

</style>
