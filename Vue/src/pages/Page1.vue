<template>
  <div class="page1">
    <!-- <NativeAppShare :share-content="shareAppContent"></NativeAppShare> -->
    <Log position="自定义按钮" bussiness-type="按钮" content="日志埋点测试">
      <button>日志埋点【点击】统计</button>
    </Log>
    <button @click="pageShareBtn(shareBtnContent1)">按钮分享1</button>
    <button @click="pageShareBtn(shareBtnContent2)">按钮分享2</button>
    <!---->
    <div class="fs20" style="text-align:center;">
      <router-link :to="{ name: 'page2', query: { channel: 'wx' } }">
        page2
      </router-link>
    </div>

    <div class="fs20" style="text-align:center;cursor:pointer;" @click="jumpTo">
      购物双倍返规则页
    </div>

    <LuckyWheel
      v-bind="lotterySetObj"
      @rotateClick="
        Toast('转盘开始')
        clickLottery()
      "
      @rotateEnd="
        Toast('转盘结束')
        endLottery()
      "
    />
    />
    <div class="fs40">test</div>
  </div>
</template>

<script>
// import api from '@/api/index'
import Log from '@/components/Log'
// import NativeAppShare from '@/components/NativeAppShare'
import WechatShare from '@/assets/js/WechatShare.js'
import LuckyWheel from '@/components/LuckyWheel'
import Toast from '@/components/toast/index'
export default {
  name: 'Page1',
  components: {
    Log,
    LuckyWheel
  },
  data() {
    return {
      lotterySetObj: {
        // 需要自定义事件修改变化的值必须赋初值，不然更改字段之后，子组件不会更新
        lotteryIndex: 0,
        rotateStart: false
      },
      shareBtnContent1: {
        callBackUrl: '',
        code: '',
        shareDialogTitle: '按钮分享1弹窗标题',
        shareDialogDescription: '按钮分享1弹窗描述',
        showFlag: '1111',
        desc: '按钮分享1微信描述',
        imgUrl: 'https://y.taofen8.com/b0174865c4134b76bec67a58dbc3d0fd.jpg',
        title: '按钮分享1微信标题',
        link: window.location.href
      },
      shareBtnContent2: {
        callBackUrl: '',
        code: '',
        shareDialogTitle: '按钮分享2弹窗标题',
        shareDialogDescription: '按钮分享2弹窗描述',
        showFlag: '1111',
        desc: '按钮分享2微信描述',
        imgUrl: 'https://y.taofen8.com/b0174865c4134b76bec67a58dbc3d0fd.jpg',
        title: '按钮分享2微信标题',
        link: window.location.href
      },
      // 如果分享数据为固定无需下发，则此字段直接写死即可，不需执行appShareBtn方法
      shareOpts: {
        shareController: 'yes',
        shareDialogTitle: '右上角 App分享',
        shareDialogDescription: '先领复活卡再答题先人一步！',
        showFlag: '1111',
        desc: '答对5题就能拿奖金',
        imgUrl: 'https://y.taofen8.com/b0174865c4134b76bec67a58dbc3d0fd.jpg',
        title: '10点答题 赢1000万集分宝'
      }
    }
  },
  created() {
    document.title = 'page1'
    // 统计pv和uv
    this.$store.dispatch('countPvUv', {
      pageName: 'page11111',
      code: 'page11111'
    })
  },
  mounted() {
    let share = new WechatShare(this.shareOpts)
    share.shareByWx()
    share.shareByAppBtn()
  },
  methods: {
    Toast(text) {
      Toast(text)
    },
    // 页面按钮点击分享
    pageShareBtn(shareBtnContent) {
      const share = new WechatShare(shareBtnContent)
      share.shareByPageBtn()
    },
    jumpTo() {
      let { href } = this.$router.resolve({
        name: 'LicaiDoubleRebate'
      })
      href = location.protocol + '//' + location.host + href
      window.location.href = `taofen8-master://contw?id=${href}&p=购物双倍返特权`
    },
    // 点击转盘
    clickLottery() {
      // this.lotterySetObj.lotteryIndex = parseInt(Math.random() * 6)
      this.lotterySetObj.lotteryIndex = 3
      this.lotterySetObj.rotateStart = true
    },
    // 转盘结束
    endLottery() {
      // 状态还原
      this.lotterySetObj.rotateStart = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.page1 {
  button {
    display: block;
    width: 320px;
    height: 64px;
    line-height: 64px;
    margin: 32px auto;
    border: 1px solid #ccc;
  }
  .fs40 {
    font-size: 40px;
  }
}
</style>
