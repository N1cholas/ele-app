<template>
  <div class="cartcontrol">
    <div @click="decreaseCart($event)" v-show="food.count > 0" class="cart-decrease icon-remove_circle_outline"></div>  
    <div v-show="food.count > 0" v-text="food.count" class="cart-count"></div>
    <div @click="addCart($event)" class="cart-add icon-add_circle"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object,
        default () {
          return {}
        }
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
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
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
</style>