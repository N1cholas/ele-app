<template>
  <div class="goods">
    <div class="menu-warpper" ref="menuWarpper">
      <ul>
        <li v-for="item in goods" class="menu-items">
          <span class="text border-1px">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-warpper" ref="foodsWarpper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 v-text="item.name" class="title"></h1>
          <ul>
            <li v-for="food in item.foods" class="food-items border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 v-text="food.name" class="name"></h2>
                <p v-text="food.description" class="desc"></p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><!-- 
               --><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><!-- 
               --><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: {}
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods')
      .then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
          })
          // this._initScroll()
        }
      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWarpper, {})

        this.foodsScroll = new BScroll(this.$refs.foodsWarpper, {})
      }
    }
  }
</script>

<style>
	.goods {
    position: absolute;
    top: 172px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .menu-warpper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }

  .footer-warpper {
    flex: 1;
  }

  .menu-items {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }

  .menu-items .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 2px 0 0;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .menu-items .decrease {
    background-image: url(decrease_3@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .menu-items .decrease {
      background-image: url(decrease_3@3x.png);
    }
  }

  .menu-items .discount {
    background-image: url(discount_3@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .menu-items .discount {
      background-image: url(discount_3@3x.png);
    }
  }

  .menu-items .guarantee {
    background-image: url(guarantee_3@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .menu-items .guarantee {
      background-image: url(guarantee_3@3x.png);
    }
  }

  .menu-items .invoice {
    background-image: url(invoice_3@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .menu-items .invoice {
      background-image: url(invoice_3@3x.png);
    }
  }

  .menu-items .special {
    background-image: url(special_3@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .menu-items .special {
      background-image: url(special_3@3x.png);
    }
  }

  .menu-items .text {
    font-size: 12px;
    display: table-cell;
    vertical-align: middle;
    width: 56px;
    position: relative;
  }

  .menu-items .text::after {
    display: block;
    position: absolute;
    width: 100%;
    left: 0; bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
  }

  @media (-webkit-min-deivce-pixel-ratio: 1.5), (min-deivce-pixel-ratio: 1.5) {
    .border-1px::after {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
    }
  }

  @media (-webkit-min-deivce-pixel-ratio: 2), (min-deivce-pixel-ratio: 2) {
    .border-1px::after {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }

  .foods-warpper {
    flex: 1;
  }

  .foods-warpper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
  }

  .foods-warpper .food-items {
    display: flex;
    margin: 18px;
    position: relative;
    padding: 0 0 18px;
  }

  .foods-warpper .food-items::after {
    display: block;
    position: absolute;
    width: 100%;
    left: 0; bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
  }

  .foods-warpper .food-items:last-child {
    margin-bottom: 0;
  }

  .foods-warpper .food-items:last-child::after {
    display: none;
  }

  .foods-warpper .food-items .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .foods-warpper .food-items .content {
    flex: 1;
  }

  .foods-warpper .food-items .content .name {
    margin: 2px 0 8px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .foods-warpper .food-items .content .desc,.foods-warpper .food-items .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .foods-warpper .food-items .content .desc {
    margin-bottom: 8px;
  }

  .foods-warpper .food-items .content .count {
    margin-right: 12px;
  }

  .foods-warpper .food-items .content .price {
    font-weight: 700;
    line-height: 24px;
  }

  .foods-warpper .food-items .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .foods-warpper .food-items .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159) !important;
  }
</style>
