<template>
  <div class="chooseBtnBox lplRadioLetter">
    <p class="btnLine"></p>
    <p class="btnTit">{{title}}：</p>
    <div class="chooseContent">
      <button @click="clickEvent($event,'')" class="btn"  type="button" :class="{choice:selectValue.value === ''}">★</button>
      <button @click="clickEvent($event,'A')" class="btn"  type="button" :class="{choice:selectValue.value === 'A'}">A</button>
      <button @click="clickEvent($event,'B')" class="btn"  type="button" :class="{choice:selectValue.value === 'B'}">B</button>
      <button @click="clickEvent($event,'C')" class="btn"  type="button" :class="{choice:selectValue.value === 'C'}">C</button>
      <button @click="clickEvent($event,'D')" class="btn"  type="button" :class="{choice:selectValue.value === 'D'}">D</button>
      <button @click="clickEvent($event,'E')" class="btn"  type="button" :class="{choice:selectValue.value === 'E'}">E</button>
      <button @click="clickEvent($event,'F')" class="btn"  type="button" :class="{choice:selectValue.value === 'F'}">F</button>
      <button @click="clickEvent($event,'G')" class="btn"  type="button" :class="{choice:selectValue.value === 'G'}">G</button>
    </div>
    <div class="split"></div>
    <div class="chooseContent">
      <button @click="clickEvent($event,'H')" class="btn"  type="button" :class="{choice:selectValue.value === 'H'}">H</button>
      <button @click="clickEvent($event,'I')" class="btn"  type="button" :class="{choice:selectValue.value === 'I'}">I</button>
      <button @click="clickEvent($event,'J')" class="btn"  type="button" :class="{choice:selectValue.value === 'J'}">J</button>
      <button @click="clickEvent($event,'K')" class="btn"  type="button" :class="{choice:selectValue.value === 'K'}">K</button>
      <button @click="clickEvent($event,'L')" class="btn"  type="button" :class="{choice:selectValue.value === 'L'}">L</button>
      <button @click="clickEvent($event,'M')" class="btn"  type="button" :class="{choice:selectValue.value === 'M'}">M</button>
      <button @click="clickEvent($event,'N')" class="btn"  type="button" :class="{choice:selectValue.value === 'N'}">N</button>
    </div>
    <div class="split"></div>
    <div class="chooseContent">
      <button @click="clickEvent($event,'O')" class="btn"  type="button" :class="{choice:selectValue.value === 'O'}">O</button>
      <button @click="clickEvent($event,'P')" class="btn"  type="button" :class="{choice:selectValue.value === 'P'}">P</button>
      <button @click="clickEvent($event,'Q')" class="btn"  type="button" :class="{choice:selectValue.value === 'Q'}">Q</button>
      <button @click="clickEvent($event,'R')" class="btn"  type="button" :class="{choice:selectValue.value === 'R'}">R</button>
      <button @click="clickEvent($event,'S')" class="btn"  type="button" :class="{choice:selectValue.value === 'S'}">S</button>
      <button @click="clickEvent($event,'T')" class="btn"  type="button" :class="{choice:selectValue.value === 'T'}">T</button>
    </div>
    <div class="split"></div>
    <div class="chooseContent">
      <button @click="clickEvent($event,'U')" class="btn"  type="button" :class="{choice:selectValue.value === 'U'}">U</button>
      <button @click="clickEvent($event,'V')" class="btn"  type="button" :class="{choice:selectValue.value === 'V'}">V</button>
      <button @click="clickEvent($event,'W')" class="btn"  type="button" :class="{choice:selectValue.value === 'W'}">W</button>
      <button @click="clickEvent($event,'X')" class="btn"  type="button" :class="{choice:selectValue.value === 'X'}">X</button>
      <button @click="clickEvent($event,'Y')" class="btn"  type="button" :class="{choice:selectValue.value === 'Y'}">Y</button>
      <button @click="clickEvent($event,'Z')" class="btn"  type="button" :class="{choice:selectValue.value === 'Z'}">Z</button>
      <button @click="clickEvent($event,'#')" class="btn"  type="button" :class="{choice:selectValue.value === '#'}">#</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "yhm-radiofilterletter",
        props:{
          title: {
            type:String,
            default:"字母"
          },
          selectValue:{
            value:{
              type:String,
              default:""
            }
          }
        },
        methods:{
          clickEvent(event,val){
            event.target.blur()
            this.selectValue.value = val
            this.$emit("initData");
          }
        }
    }
</script>

<style scoped>
  *{
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .chooseBtnBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
  }
  .chooseBtnBox .btnLine {
    width: 3px;
    height: 20px;
    background-color: #49a9ea;
    margin-right: 10px;
  }
  .chooseBtnBox .btnTit {
    color: #999;
    white-space: nowrap;
  }
  .chooseBtnBox .split{
    width: 8px;
    margin: 0 8px;
    border: 1px solid #49a9ea;
  }
  .chooseBtnBox .chooseContent {
    border: 1px solid #dedede;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
  }
  .chooseBtnBox .chooseContent .btn {
    border-right: 1px solid #dedede;
    width: 25px;
    height: 30px;
    cursor: pointer;
    color: #333;
    font-size: 12px;
    background-color: #FFF;
  }
  .chooseBtnBox .chooseContent .btn:first-child {
    border-radius: 5px 0 0 5px;
  }
  .chooseBtnBox .chooseContent .btn:last-child {
    border-right: none;
    border-radius: 0 5px 5px 0;
  }

  .chooseBtnBox .chooseContent .btn:hover{
    background-color: #49a9ea !important;
    color: #fff !important;
  }
  .chooseBtnBox .chooseContent .choice {
    background-color: #49a9ea !important;
    color: #fff !important;
  }
</style>
