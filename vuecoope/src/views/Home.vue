<template>
<!-- 组件用的iview，这是栅格布局 -->
  <div class="home">
    <Row>
      <i-col span="12">
        <div class="nav_top">
          <div class="welcome">
            <p>您好 欢迎来到失物招领网</p>
          </div>
          <div class="msg">
            <router-link to="/regist" class="nav_font">注册</router-link>
            <router-link to="/Login" class="nav_font">登录</router-link>
            <router-link to="/AdminLogin" class="nav_font">管理员登录</router-link>
          </div>
        </div>
      </i-col>
    </Row>
    <br />

    <Row>
      <i-col span="24">
        <div>
          <div class="nav_img">
            <div class="nav_img_one">
              <img src="../assets/img/nav.png" class="nav_img_one" />
            </div>
            <div>
              <img src="../assets/img/nav.jpeg" class="nav_img_two" />
            </div>
          </div>
          <table id="menu_nav" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div class="menu_nav_fl">
                  <ul class="nav nav-pills">
                    <li>
                      <a href="/">网站首页</a>
                    </li>
                    <li>
                      <router-link to="/lostinfo">寻物启事</router-link>
                    </li>
                    <li>
                      <router-link to="/goodsinfo">招领启事</router-link>
                    </li>
                    <li>
                      <a href>帮助中心</a>
                    </li>
                    <li>
                      <a href>关于我们</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </i-col>
    </Row>
    <br />

    <Row>
      <i-col span="6">
        <div class="left">
          <table class="table_st">
            <tr>
              <td class="td_left">
                <div class="div_title">
                  <router-link to="/lost">发布寻物启事</router-link>
                </div>
                <div class="div_title">
                  <router-link to="/find">发布招领启事</router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="div_title">
                  <span>网站公告</span>
                </div>
                <ul class="div_body">
                  <li>后台删除图片输入delete</li>
                  <li>后台改变状态直接点</li>
                  <li>后台修改完内容没有及时刷新，手动手动</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div class="div_title">
                  <span>招领报喜</span>
                </div>
                <ul class="div_body">
                  <li>张女士找回购物卡和银行卡</li>
                  <li>王先生身份证认领成功！</li>
                  <li>赵先生找回身份证和银行卡</li>
                   <li>问：为什么注册登录页面一模一样</li>
                  <li>答：哪来为什么！！因为爱情</li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
      </i-col>
      <i-col span="18">
        <!-- 挂载页面右部分 -->
        <router-link to="/action" class="nav_font"></router-link>
        <router-view />
      </i-col>
    </Row>

    <Row>
      <i-col span="24">
        <div class="div_footer">
          <table class="table_st">
            <tr>
              <td>
                <div class="div_title">
                  <span>合作伙伴</span>
                </div>
                <div class="div_footer_body"></div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="div_title">
                  <span>友情链接</span>
                </div>
                <div class="div_footer_body"></div>
              </td>
            </tr>
          </table>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
// import Lost from "@/components/Lost.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default {
   components: {
    // Lost
  },
  created() {
    this.$router.push("/action");
  }
};
</script>
<style scoped>
@import "../assets/css/home.css";
</style>
