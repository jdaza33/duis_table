<template>
<div>
    <div id="app">
      <div class="main">
        <canvas v-canvas="{size}"></canvas>
      </div>
    </div>
</div>
     
</template>

<script>

import canvas from './CanvasDirective.js'

export default {
  data() {
    return {
      size: 5
    };
  },
  //props: ['size'],

  directives: {
    canvas
  },

  methods: {
    maxSize(){
      this.size += 5;
      this.$forceUpdate()
    }
  }

 
};
</script>

<style scopedSlots>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 400px;
    }
    canvas {
      background: rgb(243, 243, 243);
    }
    .main {
      display: flex;
      justify-content: center;
    }
    .color-guide {
      margin: 20px 40px;
    }
    h5 {
      margin-bottom: 10px;
    }
    .user {
      padding: 7px 15px;
      border-radius: 4px;
      color: white;
      font-size: 13px;
      font-weight: bold;
      background: black;
      margin: 10px 0;
    }
    .guest {
      background: black;
      color: black;
    }
    </style>


