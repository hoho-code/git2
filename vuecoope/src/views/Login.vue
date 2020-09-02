<template>
  <div class="Adminlogin">
    <!-- <h1>用户登录</h1> -->
    <div class="htmleaf-container">
      <div class="wrapper">
        <div class="container">
          <h1>欢迎登录</h1>
          <form class="form" :model="formdata">
            <input type="text" placeholder="Username" v-model="formdata.username" />
            <input type="password" placeholder="Password" v-model="formdata.password" />
            <router-link to="/Admin">
              <button type="submit" id="login-button" @click.prevent="handlelogin()">Login</button>
            </router-link>
          </form>
        </div>

        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "AdminLogin",
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
      list: [],
    };
  },
  methods: {
    handlelogin() {
      var _this = this;
      this.$axios.post("/api/lf/login", this.formdata).then((res) => {
        _this.list = res.data;
        if (_this.list.status == "error") {
          this.$Message.error("用户名或密码错误");
        }
        if (_this.list.status == "ok") {
          this.$Message.success("登录成功");
          this.$router.push("/"); //没有专门写一个登录后的页面，直接跳到首页了
        }
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/css/adminlogin.css";
</style>