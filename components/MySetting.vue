<template>
  <div>
    <button style="width:100%" v-on:click="onSet">設定</button>
    <div style="margin-top:10px">
      <span>年月日表記:</span>
      <div>
        <input type="radio" id="date1" name="date" value="1" v-on:change="selectDateType1" v-bind:checked="dateType == 1" />
        <label for="date1">{{ dateType1String }}</label>
        <input type="radio" id="date2" name="date" value="2" v-on:change="selectDateType2" v-bind:checked="dateType == 2" />
        <label for="date2">{{ dateType2String }}</label>
      </div>
    </div>
    <div style="margin-top:10px">
      <input type="checkbox" id="disp-year" v-on:change="changeCheckYear" v-bind:checked="dispYear" />
      <label for="disp-year">年を表示する</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyCookie from '@/plugins/Cookie'

export default Vue.extend({
  data () {
    return {
      dateType: 1,
      dispYear: true,
      dateType1String: 'YYYY年MM月DD日',
      dateType2String: 'YY/MM/DD'
    }
  },
  methods: {
    onSet: function () {
      this.$accessor.actionSetDateType({ dateType: this.dateType })
      this.$accessor.actionSetDispYear({ dispYear: this.dispYear })

      const cookie: MyCookie = new MyCookie()
      cookie.setNumber('dateType', this.dateType)
      cookie.setBool('dispYear', this.dispYear)

      this.$router.back()
    },
    selectDateType1: function () {
      this.dateType = 1
    },
    selectDateType2: function () {
      this.dateType = 2
    },
    changeCheckYear: function () {
      this.dispYear = !this.dispYear
      this.dateType1String = this.dispYear ? 'YYYY年MM月DD日' : 'MM月DD日'
      this.dateType2String = this.dispYear ? 'YY/MM/DD' : 'MM/DD'
    }
  },
  beforeCreate: function () {
    console.log('MySetting beforeCreate')
  },
  created: function () {
    console.log('MySetting created')

    this.dateType = this.$accessor.dateType
    this.dispYear = this.$accessor.dispYear
    this.dateType1String = this.dispYear ? 'YYYY年MM月DD日' : 'MM月DD日'
    this.dateType2String = this.dispYear ? 'YY/MM/DD' : 'MM/DD'
  },
  beforeMount: function () {
    console.log('MySetting beforeMount')
  },
  mounted: async function () {
    console.log('MySetting mounted')
  },
  beforeUpdate: function () {
    console.log('MySetting beforeUpdate')
  },
  updated: function () {
    console.log('MySetting updated')
  },
  beforeDestroy: function () {
    console.log('MySetting beforeDestroy')
  },
  destroyed: function () {
    console.log('MySetting destroyed')
  }
})
</script>
