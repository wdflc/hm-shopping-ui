<template>
    <div class="login">
        <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
        <div class="container">
            <div class="title">
                <h3>手机号登陆</h3>
                <p>未注册的手机号登陆后将自动注册</p>
            </div>
            <div class="form">
                <div class="form-item">
                    <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
                </div>
                <div class="form-item">
                    <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
                    <img v-if="picUrl" :src="picUrl" @click="getPicCode">
                </div>
                <div class="form-item">
                    <input v-model="msgCode" class="inp" placeholder="请输入短信验证码">
                    <button @click="getCode">
                      {{second === totalSecond ? '获取验证码' : second + '秒后重新发送'}}
                      </button>
                </div>
            </div>
          <button class="login-btn" @click="login">登陆</button>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
import { codeLogin, getMsgCode } from '@/api/login'
export default {
  name: 'LoginPage',
  async created () {
    this.getPicCode()
  },
  data () {
    return {
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '', // 手机号
      picCode: '', // 图形验证码
      msgCode: '',
      picUrl: '',
      picKey: ''
    }
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await
      request.get('/captcha/image')
      this.picUrl = base64
      this.picKey = key
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      const cleanCode = this.msgCode.trim()// trim() 去除前后半角/全角空格、换行、制表符
      console.log(cleanCode)
      if (!/^\d{6}$/.test(cleanCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/')
      this.$toast('登录成功')
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功请注意查收')
        this.timer = setInterval(() => {
          this.second--
          if (this.secod < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    }

  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.container {
  /* 容器整体内边距：上下49px，左右29px */
  padding: 49px 29px;

  /* 标题区域样式 */
  .title {
    /* 标题区域与下方内容的间距 */
    margin-bottom: 20px;

    /* 主标题样式 */
    h3 {
      /* 标题字体大小 */
      font-size: 20px;
      /* 正常字重（非加粗） */
      font-weight: normal;
    }

    /* 副标题/说明文字样式 */
    p {
      /* 行高设置（文字垂直间距） */
      line-height: 40px;
      /* 说明文字字体大小 */
      font-size: 14px;
      /* 说明文字颜色：浅灰色 */
      color: #b8b8b8;
    }
  }

  /* 表单项样式 */
  .form-item {
    /* 表单项底部边框：1px 深灰色实线 */
    border-bottom: 1px solid #434343;
    /* 表单项内部内边距 */
    padding: 8px;
    /* 表单项之间的间距 */
    margin-bottom: 14px;
    /* 使用 Flex 布局，让子元素垂直居中 */
    display: flex;
    align-items: center;

    /* 输入框样式 */
    .inp {
      /* 将输入框设置为块级元素 */
      display: block;
      /* 去掉默认边框 */
      border: none;
      /* 去掉聚焦时的默认轮廓线 */
      outline: none;
      /* 输入框高度 */
      height: 32px;
      font-size: 14px;
      flex:1;
    }
    img {
        width: 94px;
        height: 31px;
    }
    button {
        height: 36px;
        border: none;
        font-size: 15px;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
    }
  }
  /* 基础样式（两端通用） */
  .login-btn {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #1677ff;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent; /* 移除移动端点击默认高亮 */
    user-select: none; /* 禁止选中文本 */
  }

  /* 桌面端：鼠标悬停效果 */
  .login-btn:hover {
    background-color: #0f62d9;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3);
  }

  /* 移动端：触摸时的模拟hover效果（通过JS控制） */
  .login-btn.touch-hover {
    background-color: #0f62d9;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3);
  }

  /* 两端通用：点击/触摸按下时的效果 */
  .login-btn:active {
    background-color: #0a4ca3;
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(22, 119, 255, 0.2);
  }

  /* 响应式微调（仅尺寸适配，无滑动逻辑） */
  @media (max-width: 768px) {
    .login-btn {
      width: 90%;
      margin: 0 auto; /* 移动端居中 */
    }
  }
}
</style>
