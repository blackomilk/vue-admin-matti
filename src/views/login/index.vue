<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">育学园运维系统登陆</h3>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      v-if="!dingLogin"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <div class="dingding" @click="handleDingLogin">
        <el-link
          icon="el-icon-data-board"
          class="ding-icon"
          style="color: #fff;"
        />
        钉钉扫码登录
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登陆</el-button
      >
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
    <div v-else class="dingCode">
      <div
        id="ding-login"
        style="margin:0px;padding:0px;width:350px;height:350px"
      ></div>
      <div style="text-align:center">
        <el-button type="primary" style="margin: 0" @click="handlePassLogin">
          返回用户密码登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { dingLogin } from "@/api/user";

export default {
  name: "Login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入正确账号!'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码长度小于4位!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        token: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入账户" }],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
            message: "请输入密码"
          }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      aa: "",
      dingLogin: false,
      code: "",
      http_url: encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoarnzmw1gf5inmjd94&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://localhost:9528/login`
      )
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect_uri;
          // this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.code = this.getQueryString("code");
    if (this.code) {
      this.ddLogin();
    }
    var handleMessage = function(event) {
      var origin = event.origin;
      if (origin == "https://login.dingtalk.com") {
        //判断是否来自ddLogin扫码事件。
        var loginTmpCode = event.data;
        //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        // window.location.href = "" + loginTmpCode;
        location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoarnzmw1gf5inmjd94&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://localhost:9528/login&loginTmpCode=${loginTmpCode}`;
      }
    };
    if (typeof window.addEventListener != "undefined") {
      window.addEventListener("message", handleMessage, false);
    } else if (typeof window.attachEvent != "undefined") {
      window.attachEvent("onmessage", handleMessage);
    }
  },
  methods: {
    ddLogin() {
      dingLogin(this.code).then(res => {
        if (res.data.user_info) {
          this.loginForm.token = res.data.user_info;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // debugger
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getQueryString(nameStr) {
      var reg = new RegExp("(^|&)" + nameStr + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      } else {
        return null;
      }
    },
    handlePassLogin() {
      this.dingLogin = false;
    },
    handleDingLogin() {
      this.dingLogin = true;
      this.$nextTick(() => {
        //钉钉登录
        let obj = DDLogin({
          id: "ding-login",
          goto: this.http_url,
          style: "border:none;background-color: #fff"
        });
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
      let box = document.getElementById("ding-login");
      box.querySelector("iframe").style.position = "absolute";
      box.querySelector("iframe").style.top = "0";
      box.querySelector("iframe").style.bottom = "0";
      box.querySelector("iframe").style.left = "0";
      box.querySelector("iframe").style.right = "0";
      box.querySelector("iframe").style.margin = "auto";
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // debugger
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.dingding {
  font-size: 0.25rem;
  color: #fff;
  cursor: pointer;
  text-align: right;
}
.dingding:hover {
  color: skyblue;
}
.dingCode {
  width: 350px;
  height: 300px;
}
.dingCode img {
  max-width: 100%;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 15px 35px 0;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
