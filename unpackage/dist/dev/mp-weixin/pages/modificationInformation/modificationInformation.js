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
  __name: "modificationInformation",
  setup(__props) {
    const submitmessage = common_vendor.reactive({
      username: "",
      oldpassword: "",
      password: ""
      //新密码
    });
    function submit() {
      api_index.updatestudentpassword(submitmessage).then((res) => {
        if (res.data.status == 1) {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.removeStorage({
              key: "usermessage",
              success: function(e) {
                console.log("移出成功", e);
              },
              fail: function(e) {
                console.log("移出失败", e);
              }
            });
            common_vendor.index.removeStorage({
              key: "token",
              success: function(e) {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
                console.log("移出成功", e);
              },
              fail: function(e) {
                console.log("移出失败", e);
              }
            });
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }, 2e3);
        } else {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.message,
            showCancel: false
          });
        }
        console.log("修改成功", res);
      }).catch((err) => {
        console.log("修改失败", err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => submitmessage.oldpassword = $event),
        b: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入旧密码",
          type: "password",
          modelValue: submitmessage.oldpassword
        }),
        c: common_vendor.p({
          label: "旧密码"
        }),
        d: common_vendor.o(($event) => submitmessage.password = $event),
        e: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入新密码",
          type: "password",
          modelValue: submitmessage.password
        }),
        f: common_vendor.p({
          label: "新密码"
        }),
        g: common_vendor.p({
          border: true
        }),
        h: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83adf1a2"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/modificationInformation/modificationInformation.vue"]]);
wx.createPage(MiniProgramPage);
