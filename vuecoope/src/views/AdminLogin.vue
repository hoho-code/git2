<template>
  <div class="Adminlogin">
    <!-- <h1>This is an 管理员登录 page</h1> -->
    <div class="htmleaf-container">
      <div class="wrapper">
        <div class="container">
          <h1>Welcome</h1>
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
      // this.$axios.post('https://temp.c.fmujie.cn/api/lf/loginadmin', this.formdata)
      //   .then(res => {
      //     success(
      //       console.log(res)
      //     )
      //   })
      //   .catch(res => {
      //     failure('error')
      //   })
      var _this = this;
      this.$axios.post("/api/lf/loginadmin", this.formdata).then((res) => {
        // alert("登录成功!");
        // this.$router.push('/admin')
        _this.list = res.data;
        if (_this.list.status == "danger") {
         this.$Message.error("用户名或密码错误");
        }
        if (_this.list.status == "ok") {
           this.$Message.success("登录成功");
            // console.log(this.list.status);
          this.$router.push("/admin");
        }
        // console.log(this.list.status);
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/css/adminlogin.css";
</style>