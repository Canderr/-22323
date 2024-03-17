"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (homestudent + administrator)();
}
const homestudent = () => "../../components/home/homestudent/homestudent.js";
const administrator = () => "../../components/home/administrator/administrator.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const typ = common_vendor.ref(1);
    common_vendor.onShow(() => {
      common_vendor.index.getStorage({
        key: "usermessage",
        success: function(e) {
          typ.value = e.data.typ;
          console.log("usermessag", e.data.typ);
        },
        fail: function(e) {
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: typ.value == 1
      }, typ.value == 1 ? {} : {}, {
        b: typ.value == 2
      }, typ.value == 2 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
