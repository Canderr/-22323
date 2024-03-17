"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const params = common_vendor.reactive({
      lostmessage: {},
      state: ""
    });
    const popup = common_vendor.ref(null);
    common_vendor.onLoad((e) => {
      params.lostmessage = JSON.parse(e.lostmessage);
      params.state = JSON.parse(e.stste);
      console.log(JSON.parse(e.lostmessage));
    });
    function open() {
      popup.value.open("center");
    }
    function close() {
      popup.value.close();
    }
    function confirm(value) {
      console.log(value);
      api_index.updateost(params.lostmessage).then((res) => {
        console.log("修改成功", res);
      });
      popup.value.close();
    }
    function type() {
      if (params.lostmessage.type == 3 && params.lostmessage.findingtype == 0) {
        return true;
      } else {
        return false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: params.lostmessage.type == 0
      }, params.lostmessage.type == 0 ? {} : {}, {
        b: params.lostmessage.type == 1
      }, params.lostmessage.type == 1 ? {} : {}, {
        c: params.lostmessage.type == 3
      }, params.lostmessage.type == 3 ? {
        d: common_vendor.t(type() ? "已认领" : "已找到")
      } : {}, {
        e: params.lostmessage.imgurl,
        f: common_vendor.t(params.lostmessage.imtename),
        g: common_vendor.t(params.lostmessage.date),
        h: common_vendor.t(params.lostmessage.adress),
        i: common_vendor.t(params.lostmessage.phone),
        j: common_vendor.t(params.lostmessage.message),
        k: common_vendor.o(_ctx.onClick),
        l: params.state == 1
      }, params.state == 1 ? common_vendor.e({
        m: params.lostmessage.type == 0
      }, params.lostmessage.type == 0 ? {} : {}, {
        n: params.lostmessage.type == 1
      }, params.lostmessage.type == 1 ? {} : {}, {
        o: common_vendor.o(open)
      }) : {}, {
        p: common_vendor.o(close),
        q: common_vendor.o(confirm),
        r: common_vendor.p({
          mode: "base",
          duration: 2e3,
          ["before-close"]: true,
          title: params.lostmessage.type == 1 ? "失物是否已找到" : "失主是否已认领"
        }),
        s: common_vendor.sr(popup, "eca06f3c-1", {
          "k": "popup"
        }),
        t: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
