<template>
  <div>
    <div class="shopcart">
      <div @click="toggleList" class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <span class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></span>
            </div>
            <div v-show="totalCount > 0" v-text="totalCount" class="num"></div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div @click.stop.prevent="pay" class="content-right">
          <div v-text="payDesc" :class="payClass" class="pay"></div>
        </div>
      </div>
      <!-- <div class="ball-container">
        <transition-group name="drop" v-on:before-enter="beforeEnter"
                                v-on:enter="enter"
                                v-on:after-enter="afterEnter">
          <div v-for="ball in balls" v-show="ball.show" :key="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div> -->
      <transition name="fold">
        <div v-show="listShow" class="shopcart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="empty" class="empty">清空</span>
          </div>
          <div ref="listContent" class="list-content">
            <ul>
              <li v-for="food in selectFoods" class="food">
                <span v-text="food.name" class="name"></span>
                <div class="price">
                  <div>￥{{food.price * food.count}}</div>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div @click="hideList" v-show="listShow" class="list-mask"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    components: {
      cartcontrol
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalPrice) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach(food => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          window.alert('支付')
        }
      }
    }
  }
</script>

<style>
  .shopcart {
    position: fixed;
    left: 0; bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }

  .shopcart .content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }

  .content .content-left {
    flex: 1;
  }

  .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }

  .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b3437;
    text-align: center;
  }

  .content .content-left .logo-wrapper .highlight {
    background-color: rgb(0, 160, 220);
  }

  .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0; right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
  }

  .content .content-left .logo-wrapper .logo .icon-shopping_cart {
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
  }

  .content .content-left .logo-wrapper .logo .highlight {
    color: #fff;
  }

  .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    font-weight: 700;
    color: #80858a;
  }

  .content .content-left .highlight {
    color: #fff;
  }

  .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(255, 255, 255, .4);
  }

  .content .content-right {
    width: 105px;
    flex: 0 0 105px;
  }

  .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, .4);
    font-weight: 700;
  }

  .content .content-right .not-enough {
    background-color: #2b233b;
  }

  .content .content-right .enough {
    background-color: #00b43c;
    color: #fff;
  }

  .shopcart-list {
    position: absolute;
    top: 0; left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }

  .fold-enter-active, .fold-leave-active {
    transition: transform .5s;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 2px solid rgba(7, 17, 27, .1);
    /*height: 40px;*/
  }

  .shopcart-list .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart-list .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
  }

  .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }

  .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0; bottom: 6px;
  }

  .list-mask {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, .6);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    opacity: 1;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>