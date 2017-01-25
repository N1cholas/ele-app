<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="delivery-title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType"
                    :only-content="onlyContent"
                    :ratings="ratings"
                    v-on:type="changeSelectType"
                    v-on:contentToggle="_contentToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="recommend in rating.recommend">{{recommend}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date.js'
  import BScroll from 'better-scroll'

  const ALL = 2
  const ERR_OK = 0

  export default {
    props: {
      seller: {
        typr: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    created () {
      this.$http.get('/api/ratings').then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.ratings = res.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    },
    methods: {
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
    components: {
      star, split, ratingselect
    }
  }
</script>

<style>
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .ratings .overview {
    display: flex;
    padding: 18px 0;
  }

  .ratings .overview .overview-left {
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .2);
    text-align: center;
    padding: 6px 0;
  }

  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-left {
      flex: 0 0 107px;
      width: 107px;
    }
  }

  .ratings .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px
  }

  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-right {
      padding-left: 8px;
    }
  }

  .ratings .overview .overview-left .score {
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
    margin-bottom: 6px;
  }

  .ratings .overview .overview-left .title {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    padding-bottom: 6px;
  }

  .ratings .overview .overview-left .rank {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .ratings .overview .overview-right .score-wrapper {
    /*margin-bottom: 8px;*/
    line-height: 18px;
    font-size: 0;
  }

  .ratings .overview .overview-right .score-wrapper .title {
    font-size: 12px;
    color: rgb(7, 17, 27);
    vertical-align: top;
    display: inline-block;
    line-height: 18px;
  }

  .ratings .overview .overview-right .score-wrapper .star {
    vertical-align: top;
    display: inline-block;
    margin: 0 12px;
  }

  .ratings .overview .overview-right .score-wrapper .score {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: rgb(255, 153, 0);
    line-height: 18px;
  }

  .ratings .overview .overview-right .delivery-wrapper {
    font-size: 0
  }

  .ratings .overview .overview-right .delivery-wrapper .delivery-title {
    display: inline-block;
    line-height: 18px;
    vertical-align: middle;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .ratings .overview .overview-right .delivery-wrapper .delivery {
    font-size: 12px;
    color: rgb(147, 153, 159);
    margin-left: 12px;
    vertical-align: middle;
  }

  .ratings .rating-wrapper {
    padding: 0 18px;
  }

  .ratings .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .ratings .rating-wrapper .rating-item .avatar {
    flex: 0 0 28px;
    margin-right: 12px;
  }

  .ratings .rating-wrapper .rating-item .avatar img {
    border-radius: 50%;
  }

  .ratings .rating-wrapper .rating-item .content {
    position: relative;
    flex: 1;
  }

  .ratings .rating-wrapper .rating-item .content .name {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 4px;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .star {
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .ratings .text {
    line-height: 18px;
    color: rgb(147. 153, 159);
    font-size: 12px;
    margin-bottom: 8px;
  }

  .ratings .recommend {
    line-height: 16px;
    font-size: 0;
  }

  .ratings .recommend .icon-thumb_up, .ratings .recommend .item {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }

  .ratings .recommend .icon-thumb_up {
    color: rgb(0, 160, 220);
  }

  .ratings .recommend .item {
    padding: 0 6px;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background-color: #fff;
  }

  .ratings .time {
    position: absolute;
    top: 0; right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
</style>
<!-- <style lang="stylus" rel="stylesheet/stylus"></style> -->
