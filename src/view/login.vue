<template lang="pug">
.loginForm.notLogedIn(v-if="!userData")
  label
    h1.title 设置 Pixiv 令牌
    input(
      v-model="tokenInput"
      :class="tokenValidator(tokenInput) ? 'good' : 'bad'"
      )
  .status(
    v-if="!error"
    :class="tokenValidator(tokenInput) ? 'good' : 'bad'")
    | {{ tokenValidator(tokenInput) ? '格式正确，请点击保存！' : '哎呀，这个格式看上去不太对……' }}
  .status.bad(v-if="error") {{ error }}
  .submit
    button.btn.btn-primary(@click="submit" :disabled="error || loading || !tokenValidator(tokenInput)") {{ loading ? '登录中……' : '保存令牌' }}
  .tips 
    h2 如何获取 Pixiv 令牌？
    p 访问 <a href="https://www.pixiv.net" target="_blank">www.pixiv.net</a> 源站并登录，打开浏览器控制台(f12)，点击“存储(storage)”一栏，在 cookie 列表里找到“键(key)”为<code>PHPSESSID</code>的一栏，将它的“值(value)”复制后填写到这里。
    p
      | 它应该形如：
      code(title="此处的令牌为随机生成，仅供演示使用" @click="randomToken") {{ example }}
      | 。
    h2 PixivNow 会窃取我的个人信息吗？
    p 我们<strong>不会</strong>存储或转让您的个人信息以及 cookie。
    p 不过我们建议妥善保存您的 cookie。您在此处保存的信息若被他人获取有被盗号的风险。

div.loginForm.isLogedIn(v-if="userData")
  h1 查看您的 Pixiv 令牌
  input.token(readonly="readonly" :value="userData.PHPSESSID")
  .submit
    button(@click="remove") 移除令牌
</template>

<script lang="ts">
import {
  tokenExample,
  tokenValidator,
  userData,
  userLogin,
  userLogout,
} from '../components/userData'

export default {
  data() {
    return {
      userData,
      example: tokenExample(),
      tokenInput: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    tokenValidator,
    goBack() {
      const back = this.$route.query.back
      if (back) this.$router.push(back as string)
    },
    randomToken() {
      this.example = tokenExample()
    },
    submit() {
      if (!tokenValidator(this.tokenInput)) return console.warn('格式不正确')
      this.loading = true
      userLogin(this.tokenInput)
        .then(
          () => {
            this.goBack()
          },
          (err) => {
            this.error = err.message
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    remove() {
      userLogout()
    },
  },
  watch: {
    tokenInput() {
      this.error = ''
    },
  },
  mounted() {},
}
</script>

<style scoped lang="sass">
.loginForm
  width: 400px
  margin: 0 auto
  padding: 1rem
  box-sizing: border-box
  box-shadow: var(--theme-box-shadow)
  border-radius: 4px
  padding: 1rem
  transition: box-shadow .24s ease-in-out

  &:hover
    box-shadow: var(--theme-box-shadow-hover)

@media screen and(max-width: 500px)
  .loginForm
    width: 100%

input
  width: 100%
  display: block
  padding: 4px 8px
  font-size: 1.2rem

.submit
  text-align: center
  margin-top: 1rem

  .btn
    width: 50%

code
  user-select: none

.status
  margin-top: 0.2rem
  text-align: center
  padding: 4px
  color: #fff

  &.good
    background-color: green

  &.bad
    background-color: #a00
</style>