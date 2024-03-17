"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "adminrpairdetail",
  setup(__props) {
    common_vendor.onLoad((e) => {
      console.log("接收参数", JSON.parse(e.message));
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/adminrpairdetail/adminrpairdetail.vue"]]);
wx.createPage(MiniProgramPage);
