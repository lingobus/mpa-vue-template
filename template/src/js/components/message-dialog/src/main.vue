<template lang="jade">
  el-dialog.message-dialog-v1(ref="dlg")
    .dialog-content
      h1
        img.ico(v-if="type", :src="typeImg")
        span.txt {{title}}
      p(v-if="message[0]==='<'", v-html="message")
      p(v-else, v-text="message")
    span(slot="footer", class="dialog-footer")
      standard-button(:style="{width:Math.floor(100/buttons.length)}",
        v-for="btn in buttons",
        :class="'btn-' + buttons.length",
        :size="btnSize",
        key="$index",
        :type="btn.type", @click="action(btn.name)") {{btn.text}}
</template>
<style lang="stylus">
.message-dialog-v1
  .el-dialog--small
    border-radius: 0
    width: 392px
  .dialog-content
    h1 > *
      vertical-align: middle
    h1
      font-size: 42px
      margin-bottom: 26px
    p
      font-size: 20px
    .ico
      width: 54px
      height: 54px
    .txt
      display: inline-block
      text-indent: 24px
  .el-dialog
    border-radius: 22px
  .el-dialog__footer
    margin: 20px auto
  .dialog-footer
    .el-button
      min-width: 6em
      height: 46px
  .btn-1
    width: 100%
  .btn-2
    width: 48%
  .btn-3
    width: 33%
</style>
<script>
import ElDialog from "element-ui/lib/dialog"
import StandardButton from '../../button/standard-button.vue'
export default {
  name: 'message-dialog',
  props: ["type", "title", "message", "buttons", "modal"],
  components: {
    ElDialog,
    StandardButton
  },
  computed: {
    typeImg () {
      if (this.type === 'success') {
      return require('../assets/success.svg')
      } else if (this.type === 'error') {
        return require('../assets/error.svg')
      } else if (this.type === 'info') {
        return require('../assets/info.svg')
      } else if (this.type === 'warnning') {
        return require('../assets/error.svg')
      } else {
      }
    },
    btnSize () {
      if (this.buttons.length  <= 2) {
        return 'large'
      } else {
        return 'small'
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    action (act) {
      this.onAction(act)
      this.$refs.dlg.visible = false
    }
  }
}
</script>
