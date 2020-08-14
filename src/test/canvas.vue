<template>
  <div>
    <canvas id="myCanvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ele: null
      }
    },
    props: {
      width: {
        type: String,
        default: '200'
      },
      height: {
        type: String,
        default: '200'
      },
      src: {
        type: String,
        default: require('./dashback.png')
      },
      percent: {
        type: String,
        default: 75
      },
      padwidth: {
        default: 0.75
      },
      borderwidth: {
        default: 20
      },

    },
    methods: {
      PI (deg)
      {
        return (deg/100)*2*Math.PI;
      },
      draw () {
        let can = document.getElementById("myCanvas")
        let cxt = can.getContext("2d")
        cxt.clearRect(0,0,this.width,this.height)
        let img = new Image()
        img.src = this.src
        img.onload = () => {
          cxt.drawImage(img,0,0,this.width,this.height);

          /* 文字 */
          cxt.fillStyle="#ffffff";
          cxt.font = "47px Arial"
          cxt.fillText(this.percent,(parseInt(this.width)-70)/2,(parseInt(this.height)+29)/2)

          cxt.font = "18px Arial"
          cxt.fillText("分",(parseInt(this.width)+36)/2,(parseInt(this.height)+29)/2)

          cxt.beginPath();
          cxt.arc(parseInt(this.width)/2, parseInt(this.height)/2, this.padwidth*this.width/2, this.PI(100), this.PI(0), true)
          cxt.lineWidth = this.borderwidth*0.6;
          cxt.strokeStyle = 'rgba(255,255,255,.35)';
          cxt.shadowOffsetX = 0
          cxt.shadowOffsetY = 0
          cxt.shadowColor = 'rgb(100,100,100)'
          cxt.shadowBlur = 10
          cxt.stroke();

          cxt.beginPath();
          cxt.arc(parseInt(this.width)/2, parseInt(this.height)/2, this.padwidth*this.width/2, this.PI(this.percent), this.PI(0), true);
          cxt.lineWidth = this.borderwidth;
          cxt.strokeStyle = 'white';
          cxt.shadowOffsetX = 0
          cxt.shadowOffsetY = 0
          cxt.shadowColor = 'rgb(100,100,100)'
          cxt.shadowBlur = 10
          cxt.stroke();
        }
      }
    },
    mounted: function () {
      this.draw()
    },
    created: function () {

    },
    watch: {
      'percent': function(newVal){
        this.draw()
      }
    }
  }
</script>
