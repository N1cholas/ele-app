<template>
  <div id="app">
    <app-header :seller="seller"></app-header>
    <section class="tab border-1px">
      <div class="tab-items">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-items">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-items">
        <router-link to="/seller">商家</router-link>
      </div>
    </section>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import appHeader from './components/header/header.vue'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller')
      .then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        } else {
          console.log('Something wrong!!')
        }
      })
    },
    components: {
      appHeader
    }
  }
</script>

<style>
  body {
    font-family: "微软雅黑" !important;
  }

  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-family: "微软雅黑";
  }
  /*start*/
  .tab {
    position: relative;
  }

  .tab::after {
    display: block;
    position: absolute;
    width: 100%;
    left: 0; bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
  }

  .tab::before {
    display: block;
    position: absolute;
    width: 100%;
    left: 0; top: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
  }

  @media (-webkit-min-deivce-pixel-ratio: 1.5), (min-deivce-pixel-ratio: 1.5) {
    .border-1px::after {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
    }

    .border-1px::before {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
    }
  }
    
  @media (-webkit-min-deivce-pixel-ratio: 2), (min-deivce-pixel-ratio: 2) {
    .border-1px::after {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }

    .border-1px::before {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
  /*end*/
  .tab-items {
    flex: 1;
    text-align: center;
  }

  .tab-items a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab-items a.active {
    color: rgb(240, 20, 20);
  }
</style>
