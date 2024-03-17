"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_file_picker2 + _easycom_uni_card2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_file_picker + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "lost",
  setup(__props) {
    const imageValue = common_vendor.reactive([]);
    const tempFilePaths = common_vendor.reactive([]);
    const params = common_vendor.reactive({
      imtename: "",
      //物品名称
      adress: "",
      //丢失地点
      phone: "",
      //联系电话
      date: getDate({
        format: true
      }),
      //日期
      message: "",
      imgurl: "",
      type: ""
    });
    const types = common_vendor.reactive([
      {
        text: "失物招领",
        value: 0
      },
      {
        text: "寻物启事",
        value: 1
      }
    ]);
    const startDate = common_vendor.computed(() => {
      return getDate("start");
    });
    const endDate = common_vendor.computed(() => {
      return getDate("end");
    });
    function bindDateChange(e) {
      console.log(e);
      params.date = e.detail.value;
      console.log(params);
    }
    function getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    }
    function select(e) {
      tempFilePaths.push(e.tempFilePaths);
      console.log("选择文件：", e, common_vendor.toRaw(tempFilePaths)[0][0]);
    }
    function progress(e) {
      console.log("上传进度：", e);
    }
    function success(e) {
      console.log("上传成功", e);
    }
    function fail(e) {
      console.log("上传失败：", e);
    }
    function publish() {
      const filename_qn = "lxyy" + new Date().getTime() + ("000000" + Math.floor(Math.random() * 999999)).slice(-6) + ".png";
      api_index.getqiniutoken().then((res) => {
        const qiniutoken = res.data.uploadToken;
        common_vendor.index.uploadFile({
          url: "https://up-z2.qiniup.com",
          filePath: common_vendor.toRaw(tempFilePaths)[0][0],
          name: "file",
          header: {
            "content-type": "multipart/form-data"
          },
          formData: {
            "key": filename_qn,
            "token": qiniutoken
          },
          success: function(uploadfileres) {
            if (uploadfileres.statusCode == 200) {
              const filemessage = JSON.parse(uploadfileres.data);
              params.imgurl = "http://s61mdikby.hn-bkt.clouddn.com/" + filemessage.key;
              api_index.insertfindingnotices(params).then((res2) => {
                console.log("新增成功", res2);
              }).catch((err) => {
                console.log("新增失败");
              });
              console.log("上传信息");
              common_vendor.index.showToast({
                title: "发布成功"
              });
              setTimeout(() => {
                common_vendor.index.navigateTo({
                  url: "/pages/lostandfound/lostandfound"
                });
              }, 2e3);
            } else {
              common_vendor.index.showToast({
                title: "失败了"
              });
            }
            console.log(uploadfileres);
          },
          fail: function(err) {
            console.log(err);
          }
        });
      }).catch((err) => {
        console.log("上传失败", err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => params.imtename = $event),
        b: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入物品名称",
          modelValue: params.imtename
        }),
        c: common_vendor.p({
          label: ""
        }),
        d: common_vendor.o(($event) => params.adress = $event),
        e: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入地点名称",
          modelValue: params.adress
        }),
        f: common_vendor.p({
          label: ""
        }),
        g: common_vendor.o(($event) => params.phone = $event),
        h: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入联系电话",
          modelValue: params.phone
        }),
        i: common_vendor.p({
          label: ""
        }),
        j: common_vendor.o(($event) => params.type = $event),
        k: common_vendor.p({
          localdata: types,
          modelValue: params.type
        }),
        l: common_vendor.p({
          label: ""
        }),
        m: common_vendor.t(params.date),
        n: params.date,
        o: common_vendor.unref(startDate),
        p: common_vendor.unref(endDate),
        q: common_vendor.o(bindDateChange),
        r: common_vendor.p({
          label: ""
        }),
        s: params.message,
        t: common_vendor.o(($event) => params.message = $event.detail.value),
        v: common_vendor.p({
          label: ""
        }),
        w: common_vendor.p({
          border: true
        }),
        x: common_vendor.o(select),
        y: common_vendor.o(progress),
        z: common_vendor.o(success),
        A: common_vendor.o(fail),
        B: common_vendor.o(($event) => imageValue = $event),
        C: common_vendor.p({
          limit: "1",
          fileMediatype: "image",
          mode: "grid",
          modelValue: imageValue
        }),
        D: common_vendor.o(publish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79c284f2"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/lost/lost.vue"]]);
wx.createPage(MiniProgramPage);
