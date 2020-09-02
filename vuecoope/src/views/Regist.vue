<template>
  <div class="Adminlogin">
    <!-- <h1>用户注册</h1> -->
    <div class="htmleaf-container">
      <div class="wrapper">
        <div class="container">
          <h1>欢迎注册</h1>
          <form class="form" :model="formdata">
            <input type="text" placeholder="Username" v-model="formdata.username" />
            <input type="password" placeholder="Password" v-model="formdata.password" />
            <router-link to="/Admin">
              <button type="submit" id="login-button" @click.prevent="handlelogin()">注册</button>
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
        picture: "images/2.png",
      },
      list: [],
    };
  },
  methods: {
    handlelogin() {
      var _this = this;
      if (this.formdata.username == "" || this.formdata.password == "") {
        this.$Message.error("注册失败");
      } else {
        this.$axios.post("/api/lf/register", this.formdata).then((res) => {
          _this.list = res.data;
        });
        if (_this.list.status == "ok") {
          this.$Message.success("注册成功");
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>
<style scoped>
@import "../assets/css/adminlogin.css";
</style>