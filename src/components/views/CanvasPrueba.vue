<template>
     <div>
          <canvas 
          id="canvas" 
          v-on:mousedown="handleMouseDown" 
          v-on:mouseup="handleMouseUp" 
          v-on:mousemove="handleMouseMove" 
          width="800px" 
          height="400px">
          </canvas>
     </div>
</template>

<script>

import pusher from "pusher";

export default {
  data() {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      table: null
    };
  },

  props: ['channel'],

  created() {

    this.channel.bind("client-new-paint", data => {
         console.log('Recibiendo --> ', data)
      this.mouse = data
    });
  },

  computed: {
    currentMouse: function() {
      this.table = document.getElementById("canvas");
      var rect = this.table.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      };
    }
  },

  methods: {
    draw: function(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        this.table = document.getElementById("canvas");

        var ctx = this.table.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);

        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = "#F63E02";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      this.table = document.getElementById("canvas");
      var ctx = this.table.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
      console.log('Enviando --> ', this.table)
      this.channel.trigger("client-new-paint", this.mouse);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      this.draw(event);
    }
  },

  ready() {
    this.table = document.getElementById("canvas");
    var ctx = this.table.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    // this.draw();
  }
};
</script>

<style scoped>
body {
  margin: 2rem;
  background: #eee;
}

canvas {
  background: rgb(124, 50, 50);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
</style>


