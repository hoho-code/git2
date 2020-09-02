<template>
  <div class="list">
    <div class="right">
      <router-view />
      <div class="cates">
        <table>
          <tr>
            <td class="td_one" id="td_title">
              <span class="td_title_fl">寻物启事</span>
              <router-link to="/lostinfo" class="more">更多>></router-link>
            </td>
            <td class="td_one" id="td_title">
              <span class="td_title_fl">招领启事</span>
              <router-link to="/goodsinfo" class="more">更多>></router-link>
            </td>
          </tr>
          <!-- 没有写详情页，就只能看看，这里展示失物启示和招领启事的标题 -->
          <tr>
            <td class="td_one">{{this.data1[0].lost_name}}</td>
            <td class="td_one">{{this.data2[0].found_name}}</td>
          </tr>
          <tr>
            <td class="td_two">{{this.data1[1].lost_name}}</td>
            <td class="td_two">{{this.data2[1].found_name}}</td>
          </tr>
          <tr>
            <td class="td_one">{{this.data1[2].lost_name}}</td>
            <td class="td_one">{{this.data2[2].found_name}}</td>
          </tr>
          <tr>
            <td class="td_two">{{this.data1[3].lost_name}}</td>
            <td class="td_two">{{this.data2[3].found_name}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// import AdminloFind from "@/components/AdminloFind.vue";
// import AdminloLost from "@/components/AdminloLost.vue";
export default {
  components: {
    // AdminloFind,
    // AdminloLost,
  },
  data() {
    return {
      data1: [],
      data2: [],
      lost_name:"",
      found_name:""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      //失物
      this.$axios.get("/api/lf/getdata/1?page=1").then((res) => {
        _this.data1 = res.data[0].data;
        // console.log(this.data1[0].lost_name)
      });
      //招领
      this.$axios.get("/api/lf/getdata/2?page=1").then((res) => {
        this.data2 = res.data[0].data;
      });
    },
  },
};
</script>
<style scoped>
</style>
