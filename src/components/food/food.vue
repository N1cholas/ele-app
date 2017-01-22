<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click="hide" class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>

<style>
  .food {
    position: fixed;
    top: 0; left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0, 0, 0);
  }

  .move-enter-active {
    transition: transform .5s linear;
    opacity: 1;
  }

  .move-enter, .move-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .move-leave-active {
    transition: all .5s linear;
    opacity: 1;
  }

  .food .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .food .image-header img {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
  }

  .food .image-header .back {
    position: absolute;
    top: 10px; left: 0;
  }

  .food .image-header .back .icon-arrow_lift {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }
</style>