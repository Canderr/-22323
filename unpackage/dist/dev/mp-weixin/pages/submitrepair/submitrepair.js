"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "submitrepair",
  setup(__props) {
    const submitmessage = common_vendor.reactive({
      faultdescription: "",
      devicename: "",
      phone: "",
      address: "",
      date: getDate({
        format: true
      }),
      //日期
      orderid: Date.now()
    });
    const startDate = common_vendor.computed(() => {
      return getDate("start");
    });
    const endDate = common_vendor.computed(() => {
      return getDate("end");
    });
    function submit() {
      api_index.studentinsertrepairorder(submitmessage).then((res) => {
        if (res.data.status == 1) {
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/repair/repair"
            });
          }, 2e3);
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
        }
        console.log("提交成功", res);
      }).catch((err) => {
        console.log("提交失败");
      });
      console.log(submitmessage);
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
    function bindDateChange(e) {
      submitmessage.date = e.detail.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => submitmessage.devicename = $event),
        b: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入设备名",
          modelValue: submitmessage.devicename
        }),
        c: common_vendor.p({
          label: "设备"
        }),
        d: common_vendor.t(submitmessage.date),
        e: submitmessage.date,
        f: common_vendor.unref(startDate),
        g: common_vendor.unref(endDate),
        h: common_vendor.o(bindDateChange),
        i: common_vendor.p({
          label: "时间"
        }),
        j: common_vendor.o(($event) => submitmessage.phone = $event),
        k: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入联系电话",
          modelValue: submitmessage.phone
        }),
        l: common_vendor.p({
          label: "电话"
        }),
        m: common_vendor.o(($event) => submitmessage.address = $event),
        n: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入设备地址",
          modelValue: submitmessage.address
        }),
        o: common_vendor.p({
          label: "地址"
        }),
        p: submitmessage.faultdescription,
        q: common_vendor.o(($event) => submitmessage.faultdescription = $event.detail.value),
        r: common_vendor.p({
          label: "故障"
        }),
        s: common_vendor.p({
          border: true
        }),
        t: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f07a1fb"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/submitrepair/submitrepair.vue"]]);
wx.createPage(MiniProgramPage);
