<!-- 移动端 车牌快捷输入组件 -->
<template>
  <div class="container">
    <div class="plateShade" v-if="show" @click="clickMask"></div>

    <div @click="showWrap" style="width: 100%;display: flex;box-sizing: border-box;">
      <slot></slot>
    </div>
    <transition name="hehe">

      <div v-if="show">
        <!--车牌首字-->
        <div class="first-word-wrap"
             v-if="showFirst">
          <div class="first-word">
            <div class="word"
                 v-for="item in allKeyWord.province"
                 @click="selectFirstWord(item)"
                 :key="item.id">
              <span>{{item}}</span>
            </div>
            <div class="in-delete"
                 @click="deleteItem">
              <i class="cubeic-wrong"></i>
              <i class="icon-delete2 plateIcon"></i>
            </div>
          </div>
          <div class="in-close"
               @click="close">
            收起
          </div>
        </div>

        <!--车牌余字-->
        <div class="keyboard-wrap"
             v-else>

          <div class="keyboard">
            <div class="in-alphabet">
              <span v-for="(item,index) in allKeyWord.alphabet"
                    :key="index"
                    @click="clickKeyBoard(item)">{{item}}</span>
              <div class="in-delete"
                   @click="deleteItem">
                <i class="icon-delete2 plateIcon" ></i>
              </div>
            </div>
          </div>
          <div class="in-close"
               @click="close">
            收起
          </div>

        </div>
      </div>

    </transition>
<!--    <div class="shade"></div>-->

  </div>
</template>
<script>
  export default {
    name:'appLicencePlate',
    data () {
      return {
        list:[],
        selectArr: [],
        allKeyWord: {
          province: ['京', '湘', '津', '鄂', '沪', '粤', '渝', '琼', '冀', '川', '晋', '贵', '辽', '云', '吉', '陕', '黑', '甘', '苏', '青', '浙', '皖', '藏', '闽', '蒙', '赣', '桂', '鲁', '宁', '豫', '新'],
          alphabet: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        },
        show: true,
        showFirst: true,
        length:'7'
      }
    },
  props:{
    plateShow: {
      type: Boolean,
      default: false
    },
  },
    watch: {
      selectArr (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      showWrap () {
        this.show = true
        this.showFirst = !(this.selectArr.length > 0)
      },
      selectFirstWord (item) {
        this.addSelect(item)
        this.showFirst = false
      },
      clickKeyBoard (item) {
        this.addSelect(item)
      },
      addSelect (item) {
        this.list=this.selectArr.join('')
        if(this.list.indexOf('D')==2||this.list.indexOf('F')==2){
          this.length = '8'
        }else{
          this.length = '7'
        }
        // 点击自定义键盘
        if (this.selectArr.length < this.length) {
          this.selectArr.push(item)
        } else {
          // this.$createToast({
          //   txt: '车牌号选择超过规定个数',
          //   type: 'txt'
          // }).show()
          // this.close()
        }
      },
      deleteItem () {
        this.selectArr.pop()
        this.showFirst = !(this.selectArr.length > 0)
      },
      close () {
        this.$emit('btnClick')
        this.show = false

      },
      clickMask () {
        // console.log('clickMask')
        this.close()
        this.$emit('btnClick')
      }
    },
    mounted () {
      this.show=this.plateShow
      // this.selectArr = []
    }
  }
</script>
<style lang="less" scoped>
  @rem:375/10rem;
  .plateShade{
    position: fixed;
    width: 100%;
    height: 26rem;
    background: #fff;
    opacity: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .plateIcon{
    font-size: 12/@rem;
  }
  .shade{
    background-color: #fff;
    opacity: 1;
    height: 100%;
    z-index: 1;
  }
  .container {
    .in-mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;

      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0);
    }
    .first-word-wrap {
      // height: 9.4rem;
      background-color: #e9e9e9;
      padding: 10/@rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 11;
      .first-word {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        &::after {
          //重要
          width: 41/@rem;
          content: "";
        }
        .word {
          box-sizing: border-box;
          font-size: 12/@rem;
          color: #333;
          width: 30/@rem;
          height: 30/@rem;
          box-shadow: 0px 1/@rem 4/@rem rgba(0, 0, 0, 0.35);
          text-align: center;
          margin: 5/@rem;
          span {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            width: 100%;
            height: 100%;
            background-color: #fff;
            color: #333;
            // border: 1px solid #fff;
            border-radius: 0.125rem;
          }
        }
      }
    }
    .keyboard-wrap {
      background-color: #e9e9e9;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10/@rem;
      z-index: 111;
      .keyboard {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .in-alphabet {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          &::after {
            //重要
            width: 174/@rem;
            content: "";
          }
          span {
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 12/@rem;
            color: #333;
            width: 30/@rem;
            height: 30/@rem;
            box-shadow: 0px 1/@rem 4/@rem rgba(0, 0, 0, 0.35);
            background-color: #fff;
            border-radius: 5/@rem;
            margin: 5/@rem;
            &:active {
              background-color: #e4e4e4;
            }
            &.bordernone {
              border: none;
              box-shadow: none;
              background-color: #d2d5db;
              &:active {
                background-color: #d2d5db;
              }
            }
            &.delete {
              background-color: #465266;
            }
            // &:last-child {
            //   flex: 1;
            // }
          }
        }
      }
    }

    .in-close {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 14/@rem;
      color: #49a9ea;
      height: 30/@rem;
      box-shadow: 0px 1/@rem 4/@rem rgba(0, 0, 0, 0.35);
      background-color: #fff;
      border-radius: 5/@rem;
      margin: 5/@rem;
      &:active {
        background-color: #e4e4e4;
      }
      &.bordernone {
        border: none;
        box-shadow: none;
        background-color: #d2d5db;
        &:active {
          background-color: #d2d5db;
        }
      }
      &.delete {
        background-color: #465266;
      }
      &:last-child {
        flex: 1;
      }
    }

    .in-delete {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12/@rem;
      width: 30/@rem;
      height: 30/@rem;
      box-shadow: 0px 1/@rem 4/@rem rgba(0, 0, 0, 0.35);
      background-color: #fff;
      border-radius: 5/@rem;
      margin: 5/@rem;

      &:active {
        background-color: #e4e4e4;
      }
      &.bordernone {
        border: none;
        box-shadow: none;
        background-color: #d2d5db;
        &:active {
          background-color: #d2d5db;
        }
      }
      &.delete {
        background-color: #465266;
      }
    }
  }

  /*淡入淡出*/
  .hehe-enter,
  .hehe-leave-to {
    opacity: 0;
  }
  .hehe-enter-to,
  .hehe-leave {
    opacity: 1;
  }
  .hehe-enter-active,
  .hehe-leave-active {
    transition: all 0.5s;
  }
</style>
