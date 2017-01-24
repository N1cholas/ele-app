<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'block-active': selectType === 2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0, $event)" class="block positive" :class="{'positive-active': selectType === 0}">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span @click="select(1, $event)" class="block negative" :class="{'negative-active': selectType === 1}">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter(rating => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter(rating => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        this.selectType = type
        this.$emit('type', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
        this.$emit('contentToggle', this.onlyContent)
      }
    }
  }
</script>

<style>
  .ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
    font-size: 0;
  }

  .ratingselect .rating-type .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    color: rgb(77, 85, 93);
    line-height: 16px;
  }

  .ratingselect .rating-type .block .count {
    font-size: 8px;
    margin-left: 2px;
  }

  .ratingselect .rating-type .positive {
    background-color: rgba(0, 160, 220, .2);
  }

  .ratingselect .rating-type .negative {
    background-color: rgba(77, 85, 93, .2);
  }

  .ratingselect .rating-type .block-active {
    color: #fff;
    background-color: rgba(0, 160, 220, 1);
  }

  .ratingselect .rating-type .positive-active {
    color: #fff;
    background-color: rgba(0, 160, 220, 1);
  }

  .ratingselect .rating-type .negative-active {
    color: #fff;
    background-color: rgba(77, 85, 93, 1);
  }

  .ratingselect .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
    color: rgb(147, 153, 159);
    font-size: 0;
  }

  .ratingselect .switch .icon-check_circle {
    font-size: 24px;
    margin-right: 4px;
    vertical-align: middle;
  }

  .ratingselect .switch .text {
    font-size: 12px;
    vertical-align: middle;
  }

  .ratingselect .on .icon-check_circle {
    color: #00c850;
  }
</style>