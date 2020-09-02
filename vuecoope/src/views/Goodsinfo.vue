<template>
  <!-- 招领情况展示页 -->
  <div>
    <Table :columns="tableColumns2" :data="data2" key="table2" style="width:810px;margin:11px 0px 0px 0px">
      <template slot-scope="{ row, index  }" slot="found_name">
        <Input type="text" v-model="editfound_name" v-if="editIndex === index" />
        <span v-else>{{ row.found_name }}</span>
      </template>
      <template slot-scope="{ row }" slot="found_status">
        <!-- <Input type="text" /> -->
        <span>{{ row.found_status }}</span>
      </template>
      <template slot-scope="{ row }" slot="found_person">
        <span>{{ row.found_person}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="found_detail">
        <Input type="text" v-model="editfound_detail" v-if="editIndex === index" />
        <span v-else>{{ row.found_detail }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="found_img">
        <Input type="text" v-model="editfound_img" v-if="editIndex === index" />
        <img :src="'https://temp.c.fmujie.cn/'+row.found_img" alt style="width: 50px;height: 50px" />
      </template>
      <template slot-scope="{ row, index }" slot="found_place">
        <Input type="text" v-model="editfound_place" v-if="editIndex === index" />
        <span v-else>{{ row.found_place }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="found_time">
        <Input type="text" v-model="editfound_time" v-if="editIndex === index" />
        <span v-else>{{ row.found_time }}</span>
      </template>
      <template slot-scope="{ row}" slot="found_phone">
        <span>{{ row.found_phone}}</span>
      </template>
    </Table>
    <Page
      :total="this.pagecount"
      :current.sync="current"
      @on-change="getLostList2(current)"
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
      data2: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editfound_name: "",
      editfound_status: "",
      editfound_person: "",
      editfound_detail: "",
      editfound_place: "",
      editfound_time: "",
      editfound_phone: "",
      list: [],
      //b表格绑定的字段数组
      tableColumns2: [
        {
          title: "名称",
          // key: "found_name",
          slot: "found_name",
          width: 80,
        },
        {
          title: "状态",
          slot: "found_status",
          sortable: true,
          width: 100,
          filters: [
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
              return row.found_status == 0;
            } else if (value == 1) {
              return row.found_status == 1;
            }
          },
          render: (h, { row, index }) => {
            // const row = params.row;
            // console.log(row.status);
            if (row.found_status == 0) {
              // 根据条件判断
              return h(
                "div",
                {
                  style: {
                    color: "green", // 添加样式
                  },
                  // on: {
                  //   click: (e) => this.changeStatus1(row, 0), //点击事件改变status
                  // },
                },
                "已归还"
              );
            } else {
              return h(
                "div",
                {
                  style: {
                    color: "red", // 添加样式
                  },
                  // on: {
                  //   click: (e) => this.changeStatus1(row, 1), //点击事件改变status
                  // },
                },
                "未归还"
              );
            }
          },
        },
        {
          title: "捡拾者",
          slot: "found_person",
          width: 100,
        },
        {
          title: "图片",
          slot: "found_img",
          width: 130,
        },
        {
          title: "详情",
          slot: "found_detail",
          width: 100,
        },
        {
          title: "地点",
          slot: "found_place",
          width: 100,
          sortable: true,
        },
        {
          title: "时间",
          slot: "found_time",
          width: 100,
        },
        {
          title: "电话",
          slot: "found_phone",
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
      this.current = 1;
      this.$axios.get("/api/lf/getdata/2?page=1").then((res) => {
        _this.data2 = res.data[0].data;
        _this.pagecount =  20; 
        // console.log(_this.data1[0].lostname);
      });
    },
     //翻页传参，参数是当前页数。根据参数拿到对应的数据
    getLostList2( current) {
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
