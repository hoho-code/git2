<template>
  <!-- 失物情况展示页 -->
  <div>
    <Table :columns="tableColumns1" :data="data1" key="table1" style="width:810px;margin:11px 0px 0px 0px">
      <template slot-scope="{ row, index  }" slot="lost_name">
        <Input type="text" v-model="editlost_name" v-if="editIndex === index" />
        <span v-else>{{ row.lost_name }}</span>
      </template>
      <template slot-scope="{ row }" slot="lost_status">
        <!-- <Input type="text" /> -->
        <span>{{ row.lost_status }}</span>
      </template>
      <template slot-scope="{ row }" slot="lost_person">
        <span>{{ row.lost_person}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="lost_detail">
        <Input type="text" v-model="editlost_detail" v-if="editIndex === index" />
        <span v-else>{{ row.lost_detail }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="lost_img">
        <Input type="text" v-model="editlost_img" v-if="editIndex === index" />
        <img :src="'https://temp.c.fmujie.cn/'+row.lost_img" alt style="width: 50px;height: 50px" />
      </template>
      <template slot-scope="{ row, index }" slot="lost_place">
        <Input type="text" v-model="editlost_place" v-if="editIndex === index" />
        <span v-else>{{ row.lost_place }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="lost_time">
        <Input type="text" v-model="editlost_time" v-if="editIndex === index" />
        <span v-else>{{ row.lost_time }}</span>
      </template>
      <template slot-scope="{ row}" slot="lost_phone">
        <span>{{ row.lost_phone}}</span>
      </template>
    </Table>
    <Page
      :total="this.pagecount"
      :current.sync="current"
      @on-change="getLostList1(current)"
      show-elevator
    ></Page>
  </div>
</template>
 <script>
export default {
  //父组件拿到的数组
  data() {
    return {
      data1: [],
      self: this,
      status: "",
      editIndex: -1, // 当前聚焦的输入框的行数
      editlost_name: "", // 第一列输入框
      editlost_status: "", // 第二列输入框
      editlost_person: "", // 第三列输入框
      editlost_detail: "", // 第四列输入框
      editlost_place: "",
      editlost_time: "",
      editlost_phone: "",
      list: [],
      pagecount: 0,
      current: 0,
      //a表格绑定的字段数组
      tableColumns1: [
        {
          title: "名称",
          // key: "lost_name",
          slot: "lost_name",
          width: 80,
        },
        {
          title: "状态",
          slot: "lost_status",
          sortable: true,
          width: 100,
          filters: [
            //可以展开一个下拉框
            {
              label: "已找到",
              value: 0,
            },
            {
              label: "未找到",
              value: 1,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value == 0) {
              return row.lost_status == 0;
            } else if (value == 1) {
              return row.lost_status == 1;
            }
          },
          render: (h, { row, index }) => {
            if (row.lost_status == 0) {
              // 根据条件判断
              return h(
                "div",
                {
                  style: {
                    color: "green", // 添加样式
                  },
                  // on: {
                  //   click: (e) => this.changeStatus(row, 0), //点击事件改变status
                  // },
                },
                "已找到"
              );
            } else {
              return h(
                "div",
                {
                  style: {
                    color: "red", // 添加样式
                  },
                  // on: {
                  //   click: (e) => this.changeStatus(row, 1), //点击事件改变status
                  // },
                },
                "未找到"
              );
            }
          },
        },
        {
          title: "失主",
          slot: "lost_person",
          width: 100,
        },
        {
          title: "图片",
          slot: "lost_img",
          width: 130,
        },
        {
          title: "详情",
          slot: "lost_detail",
          width: 100,
        },
        {
          title: "地点",
          slot: "lost_place",
          width: 100,
          sortable: true,
        },
        {
          title: "时间",
          slot: "lost_time",
          width: 100,
        },
        {
          title: "电话",
          slot: "lost_phone",
          width: 100,
        },
      ],
    };
  },
  //  mounted(){
  //     },
  created() {
    this.getLostList();
  },
  methods: {
    getLostList() {
      var _this = this;
      this.current=1
      this.$axios.get("/api/lf/getdata/1?page=1").then((res) => {
        _this.data1 = res.data[0].data;
        _this.pagecount = res.data[0].data.length * 10;
        // console.log(_this.data1[0].lostname);
      });

      // this.$axios.get("/api/lf/getdata/2?page=1").then((res) => {
      //   _this.data2 = res.data[0].data;
      //   _this.pagecount =  20;
      // console.log(this.tablenum);
      // console.log(this.pagecount);
    },
    //翻页传参，参数是当前页数。根据参数拿到对应的数据（a表格）
    getLostList1(current) {
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
  },
};
</script>
<style >
/* .demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
} */
</style>
