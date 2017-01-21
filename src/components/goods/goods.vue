<template>
  <div class="goods">
    <div class="menu-warpper" ref="menuWarpper">
      <ul>
        <li @click="selectMenu(index, $event)" v-for="(item, index) in goods" class="menu-items" :class="{'current':currentIndex === index}">
          <span class="text border-1px">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-warpper" ref="foodsWarpper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
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
                <div class="cartcontrol-warpper">
                  <cartcontrol v-on:cart_add="_drop" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  const ERR_OK = 0

  export default {
    components: {
      shopcart, cartcontrol
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
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
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWarpper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWarpper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWarpper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _drop (target) {
        this.$refs.shopcart.drop(target)
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWarpper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
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

  .foods-warpper .food-items .content .cartcontrol-warpper {
    position: absolute;
    right: 0; bottom: 12px;
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

  .current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background-color: #fff;
    font-weight: 700;
  }

  .current .text::after {
    border-top: none;
  }
</style>
