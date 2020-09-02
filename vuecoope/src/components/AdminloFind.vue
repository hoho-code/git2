<template>
<!-- 后台两个表格的显示 -->
  <div class="about">
    <!-- a表格 -->
    <div v-if="tablenum =='a'">
      <Table :columns="tableColumns1" :data="data1" key="table1">
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
           <img  :src="'https://temp.c.fmujie.cn/'+row.lost_img" alt="" style="width: 50px;height: 50px">
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
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(row,index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEdit(row, index)">操作</Button>
          </div>
        </template>
      </Table>
    </div>
    <!-- b表格 -->
    <div v-if="tablenum =='b'">
      <Table :columns="tableColumns2" :data="data2" key="table2">
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
          <img  :src="'https://temp.c.fmujie.cn/'+row.found_img" alt="" style="width: 50px;height: 50px">
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
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSaveb(row,index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEditb(row, index)">操作</Button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["tablenum", "data1", "data2"],
  //父组件拿到的数组
  data() {
    return {
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
      editfound_name: "",
      editfound_status: "",
      editfound_person: "",
      editfound_detail: "",
      editfound_place: "",
      editfound_time: "",
      editfound_phone: "",
      list: [],
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
                  on: {
                    click: (e) => this.changeStatus(row, 0), //点击事件改变status
                  },
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
                  on: {
                    click: (e) => this.changeStatus(row, 1), //点击事件改变status
                  },
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
          // render: (h, { row, index }) => {
          //   return h(
          //     "div",
          //     {
          //       on: {
          //         click: (e) => this.imgUrl(row,index), //点击事件改变status
          //       },
          //     },
          //     "row.lost_img"
          //   );
          // },
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
        {
          title: "操作",
          slot: "action",
        },
      ],
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
                  on: {
                    click: (e) => this.changeStatus1(row, 0), //点击事件改变status
                  },
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
                  on: {
                    click: (e) => this.changeStatus1(row, 1), //点击事件改变status
                  },
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
        {
          title: "操作",
          slot: "action",
        },
      ],
    };
  },
  //  mounted(){
  //     },
  created() {},
  methods: {
    //a表格改变状态
    changeStatus(row, index) {
      var _this = this;
      //获取到status，判断
      if (row.lost_status == 0) {
        row.lost_status = 1;
        console.log(row.lost_status);
      } else {
        row.lost_status = 0;
      }
      //发送请求
      this.$axios
        .post("/api/lf/updatestatus/1", {
          id: row.lost_id,
          checkUser: row.lost_person,
          checkPhone: row.lost_phone,
          status: row.lost_status,
        })
        .then((res) => {
          if (res.data.status == "ok") {
            // console.log(row.found_status);
            this.$Message.success("修改状态成功");
          } else {
            this.$Message.error("修改状态失败");
          }
        });
    },
    //b表格改变状态
    changeStatus1(row, index) {
      var _this = this;
      if (row.found_status == 0) {
        row.found_status = 1;
        // console.log(row.found_status)
      } else {
        row.found_status = 0;
        console.log(row.found_status);
      }
      this.$axios
        .post("/api/lf/updatestatus/2", {
          // status: 0,
          id: row.found_id,
          checkUser: row.found_person,
          checkPhone: row.found_phone,
          status: row.found_status,
        })
        .then((res) => {
          _this.list = res.data;
          if (_this.list.status == "ok") {
            this.$Message.success("修改状态成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
    },
    handleEdit(row, index) {
      this.editlost_name = row.lost_name;
      this.editlost_status = row.lost_status;
      this.editlost_time = row.lost_time;
      this.editlost_person = row.lost_person;
      this.editlost_detail = row.lost_detail;
      this.editlost_phone = row.lost_phone;
      this.editlost_place = row.lost_place;
      this.editlost_img = row.lost_img;
      this.editIndex = index;
      //保存下此时表格的内容
    },
    //a表格修改表格内容
    handleSave(row, index) {
      this.data1.lost_name = row.lost_name;
      this.data1.lost_status = row.lost_status;
      this.data1.lost_time = row.lost_time;
      this.data1.lost_person = row.lost_person;
      this.data1.lost_detail = row.lost_detail;
      this.data1.lost_phone = row.lost_phone;
      this.data1.lost_place = row.lost_place;
      this.data1.lost_img = row.lost_img;
      //赋值
      // console.log(row.lost_img)
      let _this = this;
      this.editIndex = -1;
      this.$axios
        .post("/api/lf/updatedata/1", {
          id: row.lost_id,
          thing: _this.editlost_name,
          picture: _this.editlost_img,
          time: _this.editlost_time,
          detail: _this.editlost_detail,
          place: _this.editlost_place,
        })
        .then((res) => {
          if (res.data.status == "ok") {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
    },
    handleEditb(row, index) {
      this.editfound_name = row.found_name;
      this.editfound_status = row.found_status;
      this.editfound_time = row.found_time;
      this.editfound_person = row.found_person;
      this.editfound_detail = row.found_detail;
      this.editfound_phone = row.found_phone;
      this.editfound_place = row.found_place;
      this.editfound_img = row.found_img;
      this.editIndex = index;
    },
    //b表格修改表格内容
    handleSaveb(row, index) {
      this.data1.found_name = row.found_name;
      this.data1.found_status = row.found_status;
      this.data1.found_time = row.found_time;
      this.data1.found_person = row.found_person;
      this.data1.found_detail = row.found_detail;
      this.data1.found_phone = row.found_phone;
      this.data1.found_place = row.found_place;
      this.data1.found_img = row.found_img;
      // console.log(row.found_img)
      let _this = this;
      this.editIndex = -1;
      this.$axios
        .post("/api/lf/updatedata/2", {
          id: row.found_id,
          thing: _this.editfound_name,
          picture: _this.editfound_img,
          time: _this.editfound_time,
          detail: _this.editfound_detail,
          place: _this.editfound_place,
        })
        .then((res) => {
          if (res.data.status == "ok") {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
    },
  },
};
</script>
<style >
.demo-upload-list {
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
}
</style>
