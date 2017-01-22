<template>
  <div class="cartcontrol">
    <transition name="move">
      <div @click.stop.prevent="decreaseCart" v-show="food.count > 0" class="cart-decrease">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div v-show="food.count > 0" v-text="food.count" class="cart-count"></div>
    <div @click.stop.prevent="addCart" class="cart-add icon-add_circle"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // this.$emit('cart_add', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style>
  .cartcontrol {
    font-size: 0;
  }

  .cartcontrol .cart-decrease {
    display: inline-block;
    padding: 6px;
  }

  .cartcontrol .cart-decrease .inner {
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    display: inline-block;
  }

  .cartcontrol .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb( 147, 153, 159);
  }

  .cartcontrol .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .move-enter-active, .move-leave-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all .4s linear
  }

  .move-enter, .move-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }

  .move-enter-active .inner, .move-leave-active .inner {
    transition: all .4s linear;
    transform: rotate(0);
  }

  .move-enter .inner, .move-leave-active .inner {
    transform: rotate(180deg);
  }
</style>