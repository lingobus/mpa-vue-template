<template>
  <transition name="lb-alert-fade">
    <div
      class="el-message lb-alert"
      :class="customClass"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <img class="el-message__img" style="width:20px;height:20px" :src="typeImg" alt="" v-if="!iconClass">
      <div class="el-message__group" :class="{ 'is-with-icon': iconClass }">
        <p>
          <i class="el-message__icon" :class="iconClass" v-if="iconClass"></i>
          <span v-if="messageHTML" v-html="messageHTML"></span>
          <span v-else>{{ message }}</span>
        </p>
        <div v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></div>
      </div>
    </div>
  </transition>
</template>
<style lang="stylus">
.lb-alert-fade-enter, .lb-alert-fade-leave-active
  opacity: 0
.lb-alert
  top: 50%
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)
  border: solid 1px #e7eaec
  transform: translate(-50%,-100%)
  .el-message__img
    top: 10px
    left: 10px
</style>
<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        messageHTML: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null
      }
    },

    computed: {
      typeImg() {
        if (this.type === 'success') {
          return require('../assets/success.svg')
        } else if (this.type === 'error') {
          return require('../assets/error.svg')
        } else if (this.type === 'info') {
          return require('../assets/info.svg')
        } else if (this.type === 'warnning') {
          return require('../assets/error.svg')
        }
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false
          this.$el.addEventListener('transitionend', this.destroyElement)
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement)
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      },

      close() {
        this.closed = true
        if (typeof this.onClose === 'function') {
          this.onClose(this)
        }
      },

      clearTimer() {
        clearTimeout(this.timer)
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close()
            }
          }, this.duration)
        }
      }
    },

    mounted() {
      this.startTimer()
    }
  }
</script>
