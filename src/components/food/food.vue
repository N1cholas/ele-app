<template>
  <transition name="move">
    <div v-show="showFlag" ref="food" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click="hide" class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 v-text="food.name" class="title"></h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><!-- 
         --><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="buy">
            <div @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0" class="buy">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div v-show="food.info" class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.ratings"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType"
                        :only-content="onlyContent"
                        :desc="desc" 
                        :ratings="food.ratings"
                        v-on:type="changeSelectType"
                        v-on:contentToggle="_contentToggle"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_down': rating.rateType === 1, 'icon-thumb_up': rating.rateType === 0}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {formatDate} from '../../common/js/date.js'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    components: {
      cartcontrol, split, ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      // 子组件改变props通知父组件
      changeSelectType (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      _contentToggle (contentToggle) {
        this.onlyContent = contentToggle
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
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
    border-radius: 50%;
  }

  .food .image-header .back .icon-arrow_lift {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  .food .content {
    position: relative;
    padding: 18px;
  }

  .food .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);    
  }

  .food .content .detail {
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
    height: 10px;
  }

  .food .content .detail .sell-count, .food .content .detail .rating {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .content .detail .sell-count {
    margin-right: 12px;
  }

  .food .content .price {
    font-weight: 700;
    line-height: 24px;
  }

  .food .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .food .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .cartcontrol-wrapper {
    position: absolute;
    right: 12px; bottom: 12px;
  }

  .food .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    line-height: 24px;
    height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0, 160, 220);
  }

  .buy-enter-active, .buy-leave-active {
    transition: opacity .5s
  }

  .buy-enter, .buy-leave-active {
    opacity: 0
  }

  .food .info {
    padding: 18px;
  }

  .food .info .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .food .info .text {
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }

  .food .rating {
    padding-top: 18px;
  }

  .food .rating .title {
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .food .rating .rating-wrapper {
    padding: 0 18px;
  }

  .food .rating .rating-wrapper .rating-item {
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
  }

  .food .rating .rating-wrapper .rating-item .user {
    position: absolute;
    right: 0; top: 16px;
    font-size: 0;
    line-height: 12px;
  }

  .food .rating .rating-wrapper .rating-item .user .name {
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    margin-right: 6px;
    color: rgb(147, 153, 159);
  }

  .food .rating .rating-wrapper .rating-item .user .avatar {
    border-radius: 50%;
  }

  .food .rating .rating-wrapper .rating-item .time {
    margin-right: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .rating .rating-wrapper .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .food .rating .rating-wrapper .rating-item .text .icon-thumb_down,
  .food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
    margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }

  .food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
    color: rgb(0, 160, 220);
  }

  .food .rating .rating-wrapper .no-rating {
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
</style>