<template>
	<div :class="starType" class="star">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item">
    </span>
	</div>
</template>

<script>
  const LENGTH = 5
  const LIS_ON = 'on'
  const LIS_HALF = 'half'
  const LIS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(LIS_ON)
        }
        if (hasDecimal) {
          result.push(LIS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(LIS_OFF)
        }
        return result
      }
    }
  }
</script>

<style>
  .star {
    font-size: 0;
  }

	.star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  .star .on:last-child {
    margin: 0;
  }

  .star-48 .on {
    width: 20px;
    height: 20px;
    margin: 0 22px 0 0;
    background-size: 20px 20px;
    background-image: url(star48_on@2x.png);
  }

  .star-48 .half {
    width: 20px;
    height: 20px;
    margin: 0 22px 0 0;
    background-size: 20px 20px;
    background-image: url(star48_half@2x.png);
  }

  .star-48 .off {
    width: 20px;
    height: 20px;
    margin: 0 22px 0 0;
    background-size: 20px 20px;
    background-image: url(star48_off@2x.png);
  }

  .star-36 .on {
    width: 15px;
    height: 15px;
    margin: 0 6px 0 0;
    background-size: 15px 15px;
    background-image: url(star36_on@2x.png);
  }

  .star-36 .half {
    width: 15px;
    height: 15px;
    margin: 0 6px 0 0;
    background-size: 15px 15px;
    background-image: url(star36_half@2x.png);
  }

  .star-36 .off {
    width: 15px;
    height: 15px;
    margin: 0 6px 0 0;
    background-size: 15px 15px;
    background-image: url(star36_off@2x.png);
  }

  .star-24 .on {
    width: 10px;
    height: 10px;
    margin: 0 3px 0 0;
    background-size: 10px 10px;
    background-image: url(star24_on@2x.png);
  }

  .star-24 .half {
    width: 10px;
    height: 10px;
    margin: 0 3px 0 0;
    background-size: 10px 10px;
    background-image: url(star24_half@2x.png);
  }

  .star-24 .off {
    width: 10px;
    height: 10px;
    margin: 0 3px 0 0;
    background-size: 10px 10px;
    background-image: url(star24_off@2x.png);
  }
</style>