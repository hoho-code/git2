
<template>
  <div class="lost">
    <div class="right">
      <!-- iviw的表单组件 -->
      <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <!-- 注释的部分是表单的图片部分，也弄了几天了，最开始拿到的是base64格式，传不上，跟后端伙伴交流了一下他说要拿本地路径或url路径
        本地路径好像在blob之后拿到吧，这个能取到blob，看网上都是取到之后原生ajax一些操作(迷惑.jpg),vue要用axios
        感觉就不太明白，如果要写出来可能还要一些时间，害，话说后来看见这个列表里有一条成功传上去了（当事人现在就是后悔，为什么我瞎呢）-->
<!-- 
        <FormItem label="图片" prop="picture">
          <Upload
            action="/api/lf/increasedata/1"
            style="width: 50px"
            :before-upload="handleUpload"
            accept="image/jpg, image/jpeg, image/png"
            :on-format-error="handleFormatError"
            :max-size="512"
            type="drag"
            id="files"
            name="files"
            :auto-upload="false"
          >
            <div style="position: relative;padding:5px 0;">
              <Icon type="ios-camera" size="30" style="color: #3BBE9B"></Icon>
              <Img
                :src="formValidate.picture"
                style="height:100%;position:absolute;top:0;left:0;right:0; bottom:0; margin:auto;"
                v-if="formValidate.picture"
              />
            </div>
          </Upload>
        </FormItem> -->
        <Form-item label="丢失物品" prop="thingName">
          <i-input
            :value.sync="formValidate.thingName"
            placeholder="请输入丢失物品名称"
            v-model="formValidate.thingName"
          ></i-input>
        </Form-item>
        <Form-item label="详细描述" prop="detail">
          <i-input
            :value.sync="formValidate.detail"
            type="textarea"
            placeholder="请输入..."
            v-model="formValidate.detail"
          ></i-input>
        </Form-item>
        <Form-item label="丢失地点" prop="place">
          <i-input
            :value.sync="formValidate.place"
            placeholder="请输入丢失地点"
            v-model="formValidate.place"
          ></i-input>
        </Form-item>
        <Form-item label="丢失日期" prop="time">
          <i-input
            :value.sync="formValidate.time"
            placeholder="请输入丢失日期"
            v-model="formValidate.time"
          ></i-input>
        </Form-item>
        <Form-item label="丢失人" prop="personName">
          <i-input
            :value.sync="formValidate.personName"
            placeholder="请输入丢失人姓名"
            v-model="formValidate.personName"
          ></i-input>
        </Form-item>
        <Form-item label="电话号码" prop="phoneNumber">
          <i-input
            :value.sync="formValidate.phoneNumber"
            placeholder="请输入电话号码"
            v-model="formValidate.phoneNumber"
          ></i-input>
        </Form-item>
        <Form-item>
          <i-button @click="handleSubmit('formValidate')" type="primary">提交</i-button>
          <i-button type="warning" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        thingName: "",
        time: "",
        detail: "",
        place: "",
        personName: "",
        // picture: "images/3.png",
        picture: "images/3.png",
        phoneNumber: "",
      },
      imgUrl: "",
      ia: "",
      ruleValidate: {
        personName: [
          { required: true, message: "丢失人姓名不能为空", trigger: "blur" },
        ],
        phoneNumbe: [
          { required: true, message: "电话不能为空", trigger: "blur" },
        ],
        place: [{ required: true, message: "地点不能为空", trigger: "blur" }],
        thingName: [
          { required: true, message: "丢失物品不能为空", trigger: "blur" },
        ],
        date: [{ required: true, message: "日期不能为空", trigger: "blur" }],
        detail: [
          { required: true, message: "请输入详细描述", trigger: "blur" },
        ],
        // picture: [{ required: true, message: "请上传图片" }],
      },
      list: [],
    };
  },
  methods: {
    handleSubmit(formValidate, row) {
      // console.log(this.date);
      //表单自验证规则成功后发送请求
      console.log(this.formValidate);
      this.$refs[formValidate].validate((valid) => {
        if (valid) {
          var _this = this;
          // let postData = this.$qs.stringify({
          //   thingName: "row.thingName",
          //   time: "row.time",
          //   detail: "row.detail",
          //   place: "row.place",
          //   personName: "row.personName",
          //   picture: "row.picture",
          //   // picture: "row.picture",
          //   phoneNumber: "row.phoneNumber",
          // });
          // this.$axios({
          //   method: "post",
          //   url: "/api/lf/increasedata/1",
          //   data: postData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          // }).then((res) => {
          //   // _this.list = res.data;
          //   if (res.data.status == "ok") {
          //     this.$Message.success("提交成功");
          //   } else {
          //     this.$Message.error("提交失败");
          //   }
          // });
          this.$axios
            .post(
              "/api/lf/increasedata/1",
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
              this.formValidate
            )
            .then((res) => {
              _this.list = res.data;
              if (_this.list.status == "error") {
                this.$Message.error("提交失败");
              }
              if (_this.list.status == "ok") {
                this.$Message.success("提交成功");
              }
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    //表单重置
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "图片格式不正确",
        desc: "图片格式 " + file.name + " 不正确, 请选择 jpg 或者 png.",
      });
    },

    // handleUpload(file) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = (e) => {
    //     this.formValidate.picture = this.getObjectURL(file);
    //     // this.getObjectURL(file);
    //   };
    //   return false;
    // },
    // getObjectURL(file) {
    //   let url = null;
    //   if (window.createObjcectURL != undefined) {
    //     url = window.createOjcectURL(file);
    //   } else if (window.URL != undefined) {
    //     url = window.URL.createObjectURL(file);
    //   } else if (window.webkitURL != undefined) {
    //     url = window.webkitURL.createObjectURL(file);
    //   }
    
    //   // "image/jpg, image/jpeg, image/png"
    //   // url = url + ".jpg" || url + ".jpeg" || url + ".png";
    //   return url;
    // },
  },
};
</script>
<style  scoped>
.title {
  height: 60px;
  line-height: 60px;
  background: #fff;
  font-size: 20px;
  text-indent: 20px;
}
.ivu-form .ivu-form-item-label {
  text-align: justify !important;
}
.iconlabelUrl {
  width: 240px;
  height: 120px;
}
</style>
