<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  /* min-height: 200px; */
  /* height: 400px; */
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
  height: 610px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
</style>
<template>
  <div class="layout">
    <!-- 左边导航栏 -->
    <Row type="flex">
      <i-col span="4" class="layout-menu-left">
        <i-menu
          v-if="show"
          ref="menu"
          accordion
          :theme="theme3"
          :open-names="openNames"
          width="auto"
        >
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>用户信息管理
            </template>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-paper"></Icon>通告信息管理
            </template>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-people"></Icon>帮助信息管理
            </template>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="stats-bars"></Icon>失物招领信息管理
            </template>
            <!-- <MenuGroup title=""> -->
            <Menu-item name="4-2">
              <div @click="getLostList('a',current=1)">失物信息</div>
            </Menu-item>
            <Menu-item name="4-1">
              <div @click="getLostList('b',current=1)">招领信息</div>
            </Menu-item>

            <!-- </MenuGroup> -->
          </Submenu>
        </i-menu>
      </i-col>
      <i-col span="20">
        <div class="layout-header"></div>
        <div class="layout-breadcrumb">
          <!-- 搜索框 -->
          <div v-if="tablenum =='a'">
            <Input v-model="inputa" placeholder="请输入物品名称" style="width: 500px" key="search1">
              <Select v-model="select3" slot="prepend" style="width: 60px" filterable>
                <!-- <Option value="1" >ID</Option> -->
                <Option value="1">物品名称</Option>
                <Option value="2">地点</Option>
                <Option value="3">详细描述</Option>
              </Select>
              <Button slot="append" icon="ios-search" @click="getLostList3()"></Button>
            </Input>
          </div>
          <div v-if="tablenum =='b'">
            <Input v-model="inputa" placeholder="请输入物品名称" style="width: 500px" key="search2">
              <Select v-model="select3" slot="prepend" style="width: 60px" filterable>
                <!-- <Option value="1" >ID</Option> -->
                <Option value="1">物品名称</Option>
                <Option value="2">地点</Option>
                <Option value="3">详细描述</Option>
              </Select>
              <Button slot="append" icon="ios-search" @click="getLostList4()"></Button>
            </Input>
          </div>
          <!-- 右边：根据导航栏点击内容显示 -->
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <AdminloFind :tablenum="tablenum" :data1="data1" :data2="data2"></AdminloFind>
            <div style="margin: 10px;overflow: hidden">
              <!-- 根据表格显示不同的翻页 -->
              <div style="float: right;">
                <Page
                  :total="this.pagecount"
                  v-if="tablenum =='a'"
                  :current.sync="current"
                  @on-change="getLostList1(current)"
                  show-elevator
                ></Page>

                <Page
                  :total="this.pagecount"
                  v-if="tablenum =='b'"
                  :current.sync="current"
                  @on-change="getLostList2(current)"
                  show-elevator
                ></Page>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="layout-copy">2011-2016 &copy; TalkingData</div> -->
      </i-col>
    </Row>
  </div>
</template>
<script>
import AdminloFind from "@/components/AdminloFind.vue";
// import AdminloLost from "@/components/AdminloLost.vue";
export default {
  components: {
    AdminloFind,
    // AdminloLost,
  },
  data() {
    return {
      tablenum: "",
      show: true,
      theme3: "dark",
      openNames: ["4"],
      data1: [],
      data2: [],
      pagecount: 0,//总页数
      current: 0,//当前页码
      id: "",
      name: 1,
      place: 2,
      inputa: "",
      select3: "",
      lost_status: "",
      // detial:""
    };
  },
  created() {
    // this.getUserList();
  },
  methods: {
    //请求数据给子组件，子组件根据tablenum显示表格
    getLostList(t) {
      var _this = this;
      _this.tablenum = t;
      if (this.tablenum == "a") {
        this.$axios.get("/api/lf/getdata/1?page=1").then((res) => {
          _this.data1 = res.data[0].data;
          _this.pagecount = res.data[0].data.length * 10;
          // console.log(_this.data1[0].lostname);
        });
      }
      if (this.tablenum == "b") {
        this.$axios.get("/api/lf/getdata/2?page=1").then((res) => {
          _this.data2 = res.data[0].data;
          _this.pagecount =  20;
          // console.log(this.tablenum);
          // console.log(this.pagecount);
        });
      }
    },
    //翻页传参，参数是当前页数。根据参数拿到对应的数据（a表格）
    getLostList1(a, current) {
      let _this = this;
      this.$axios
        .get("/api/lf/getdata/1?", {
          params: {
            page: this.current,
          },
        })
        .then((res) => {
          _this.data1 = res.data[0].data;
          // this.$Message.success("请求成功");
          // console.log(this.data1);
        });
    },
    //翻页传参，参数是当前页数。根据参数拿到对应的数据（b表格）
    getLostList2(b, current) {
      let _this = this;
      this.$axios
        .get("/api/lf/getdata/2?", {
          params: {
            page: this.current,
          },
        })
        .then((res) => {
          _this.data2 = res.data[0].data;
          // this.$Message.success("请求成功");
          // console.log(this.data2);
        });
    },
    //搜索传参，参数包括name、place等，根据搜索结果显示数据（a表格）
    getLostList3() {
      let _this = this;
      // console.log(this.select3);
      // console.log(this.inputa);

      let postData = this.$qs.stringify({
        searchKey: this.select3,
        keyWord: this.inputa,
      });
      this.$axios({
        method: "post",
        url: "/api/lf/searchdata/1?",
        data: postData,
      }).then((res) => {
        this.$Message.success("查找成功");
        _this.data1 = res.data[0];
        _this.pagecount = 10;
        // console.log(this.data1);
      });
    },
    //搜索传参，参数包括name、place等，根据搜索结果显示数据（b表格）
    getLostList4() {
      let _this = this;
      // console.log(this.select3);
      // console.log(this.inputa);

      let postData = this.$qs.stringify({
        searchKey: this.select3,
        keyWord: this.inputa,
      });
      this.$axios({
        method: "post",
        url: "/api/lf/searchdata/2?",
        data: postData,
      }).then((res) => {
        this.$Message.success("查找成功");
        _this.data2 = res.data[0];
        _this.pagecount = 10;
        // console.log(this.data1);
      });
    },
  },
};
</script>
<style>
.change {
  color: green;
}
</style>
