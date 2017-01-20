<template>
	<div class="header">
		<div class="content-warpper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span><!-- 
           --><span class="name" v-text="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span><!-- 
           --><span class="text" v-text="seller.supports[0].description"></span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showDetail" class="supports-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-warpper">
      <span class="bulletin-title"></span><!-- 
       --><span v-text="seller.bulletin" class="bulletin-text"></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail"><!-- 
     --><div class="detail-warpper clearfix" style="min-height: 100%;width: 100%">
          <div class="detail-main">
            <h1 v-text="seller.name" class="detail-name"></h1>
            <div class="star-warpper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="detail-title">
              <div class="detail-line"></div>
              <div class="detail-text">优惠信息</div>
              <div class="detail-line"></div>
            </div>
            <ul v-if="seller.supports" class="detail-supports">
               <li v-for="(item,index) in seller.supports" class="detail-supports-item">
                 <span class="icon" :class="classMap[seller.supports[index].type]">
                 </span>
                 <span v-text="seller.supports[index].description"
                       class="detail-item-text"></span>
               </li>
            </ul>
            <div class="detail-title">
              <div class="detail-line"></div>
              <div class="detail-text">商家公告</div>
              <div class="detail-line"></div>
            </div>
            <div class="detail-bulletin">
              <p v-text="seller.bulletin" class="detail-content"></p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <div class="icon-close"></div>
        </div>
      </div>
    </transition>
	</div>
</template>

<script>
  import '../../common/fonts/ele-app-fonts.eot'
  import '../../common/fonts/ele-app-fonts.svg'
  import '../../common/fonts/ele-app-fonts.ttf'
  import '../../common/fonts/ele-app-fonts.woff'
  import '../../common/style/icon.css'

  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail: function () {
        this.detailShow = true
      },
      hideDetail: function () {
        this.detailShow = false
      }
    },
    components: {
      star
    }
  }
</script>

<style scoped>
  .header {
    color: #fff;
    background: rgba(7, 17, 27, .5);
    position: relative;
    overflow: hidden;
  }

  .content-warpper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }

  .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .avatar img {
    border-radius: 2px;
  }

  .content {
    display: inline-block;
    font-size: 14px;
    margin: 0 0 0 16px;
  }

  .title {
    margin: 2px 0 8px;
  }

  .brand {
    width: 30px;
    height: 18px;
    display: inline-block;
    background-image: url('brand@2x.png');
    background-size: 30px 18px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .brand {
      background-image: url('brand@3x.png');
    }
  }

  .name {
    margin: 0 0 0 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  .description {
    margin: 0 0 10px;
    line-height: 12px;
    font-size: 12px;
  }

  .supports .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 4px 0 0;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .decrease {
    background-image: url(decrease_1@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .decrease {
      background-image: url(decrease_1@3x.png);
    }
  }

  .discount {
    background-image: url(discount_1@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .discount {
      background-image: url(discount_1@3x.png);
    }
  }

  .guarantee {
    background-image: url(guarantee_1@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .guarantee {
      background-image: url(guarantee_1@3x.png);
    }
  }

  .invoice {
    background-image: url(invoice_1@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .invoice {
      background-image: url(invoice_1@3x.png);
    }
  }

  .special {
    background-image: url(special_1@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .special {
      background-image: url(special_1@3x.png);
    }
  }

  .text {
    font-size: 10px;
    line-height: 12px;
    vertical-align: top;
  }

  .supports-count {
    position: absolute;
    right: 12px; bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, .2);
  }

  .count {
    font-size: 10px;
    vertical-align: top;
  }

  .supports-count .icon-keyboard_arrow_right {
    font-size: 10px;
    line-height: 24px !important;
    margin: 0 0 0 2px;
  }

  .bulletin-warpper {
    height: 26px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7, 17, 27, .2);
  }

  .bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url(bulletin@2x.png);
    background-size: 22px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
    margin: 8px 0 0;
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      background-image: url(bulletin@3x.png);
      background-repeat: no-repeat;
      vertical-align: top;
      margin: 8px 0 0;
    }
  }

  .bulletin-text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }

  .bulletin-warpper .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px; top: 8px;
  }

  .background {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    top: 0; left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, .8);
    backdrop-filter: blur(10px);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  /*清除浮动*/
  .clearfix {
    display: inline-block;
  }

  .clearfix::after {
    content: '.';
    display: block;
    width: 0;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }

  .detail-wrapper {
    width: 100%;
    -webkit-min-height: 100%;
  }

  .detail-main {
    margin: 64px 0 0;
    padding: 0 0 64px;
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0;
    clear: both;
    font-size: 32px;
  }

  .detail-name {
    font-family: "微软雅黑";
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .star-warpper {
    margin: 18px 0 0;
    padding: 2px 0;
    text-align: center;
  }

  .detail-title {
    display: flex;
    width: 80%;
    margin: 30px auto 24px;
  }

  .detail-line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }

  .detail-text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: "微软雅黑";
  }

  .detail-supports {
    width: 80%;
    margin: 0 auto;
  }

  .detail-supports-item {
    padding: 0 12px;
    margin: 0 0 12px;
    font-size: 0;
  }

  .detail-supports-item:last-child {
    margin-bottom: 0;
  }

  .detail-supports-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .detail-supports-item .decrease {
    background-image: url(decrease_2@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .detail-supports-item .decrease {
      background-image: url(decrease_2@3x.png);
    }
  }

  .detail-supports-item .discount {
    background-image: url(discount_2@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .detail-supports-item .discount {
      background-image: url(discount_2@3x.png);
    }
  }

  .detail-supports-item .guarantee {
    background-image: url(guarantee_2@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .detail-supports-item .guarantee {
      background-image: url(guarantee_2@3x.png);
    }
  }

  .detail-supports-item .invoice {
    background-image: url(invoice_2@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .detail-supports-item .invoice {
      background-image: url(invoice_2@3x.png);
    }
  }

  .detail-supports-item .special {
    background-image: url(special_2@2x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .detail-supports-item .special {
      background-image: url(special_2@3x.png);
    }
  }

  .detail-item-text {
    font-size: 12px;
    line-height: 16px;
    font-family: "微软雅黑";
  }

  .detail-bulletin {
    width: 80%;
    margin: 0 auto;
  }

  .detail-content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
