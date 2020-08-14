<template>
  <td v-if="show" ref="td_control" class="fd_in_txt" :style="getWidth">
    <div :style="getWidth" class="c_main c_main_m" v-validator="validatorEvent">
      <div v-if="getShowTip" class="c_tip c_tip_m">
        <div>
          {{txt}}
          <img src="../../../../../static/css/images/arrow.png">
        </div>
      </div>
      <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" @click="clickEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit === '1'}">
        <div class="c_content_div c_content_div_m c_left ti10" :style="getTxtWidth">{{txt}}</div>
        <span class="c_icon c_icon_m i-input-right-arrow" :class="{rotate180:focusStyle}"></span>
      </div>
    </div>
  </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
    export default {
      name: "yhm-form-td-select-dialog",
      inject: ["p____page"],
      data() {
        return {

          focusStyle: false,
          mouseStyle: false,
          mouseOver: false,
          error: false,
          txt: this.value[this.id],
          txtKey: this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id
        }
      },
      props: {
        width: {
          type: String,
          required: true
        },
        list: {
          type: Array,
          required: true
        },
        listid: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
        },
        value: {
          type: Object,
          required: true
        },
        rule: {
          type: String,
          default: ''
        },
        tip: {
          type: String,
          default: ""
        },
        noEdit: {
          type: String,
          default: ""
        },
        show: {
          type: Boolean,
          default: true
        }
      },
      methods: {
        //初始化验证事件
        validatorEvent(category) {
          if (this.rule !== "") {
            var id = this.txtKey;
            id = id.replace(".", "_")
            if (category === "bind") {
              if (this.p____page.p____rule.indexOf(id) === -1) {
                this.p____page.p____rule.push(id)
                this.p____page.p____rule[id] = this
              }
            } else if (category === "unbind") {
              let index = this.p____page.p____rule.indexOf(id)
              if (index !== -1) {
                this.p____page.p____rule.splice(index, 1)
                this.p____page.p____rule[id] = null
              }
            }
          }
        },
        //鼠标放上事件
        mouseoverEvent() {
          if (!this.error) {
            this.mouseStyle = true
          }
          this.mouseOver = true
        },
        //鼠标移出事件
        mouseoutEvent() {
          if (!this.error) {
            this.mouseStyle = false
          }
          this.mouseOver = false
        },
        //点击事件
        clickEvent() {
          if(this.noEdit !== '1') {
            this.error = false
            this.$emit("call", this.value)
          }
        },
        verification() {
          var result = true;
          if(this.rule === "#"){
            if (this.txt === '') {
              result = false
            }
          }
          this.error = !result
          return result
        }
      },
      computed: {
        getShowTip() {
          return this.tip != "" && this.txt != "" && (this.focusStyle || this.mouseOver)
        },
        getWidth() {
          if (this.width !== '') {
            return 'width:' + accAdd(this.width,-6) + 'px !important;'
          } else {
            return ''
          }
        },
        getTxtWidth() {
          let width = accAdd(this.width, -6)
          if (this.category === 'm') {
            width = accAdd(width, -22)
          } else {
            width = accAdd(width, -38)
          }
          return width
        }
      },
      watch:{
        value:{
          handler(newValue, oldValue) {
            this.txt = newValue[this.id]
          },
          deep: true
        }
      }
    }
</script>

<style scoped>

</style>
