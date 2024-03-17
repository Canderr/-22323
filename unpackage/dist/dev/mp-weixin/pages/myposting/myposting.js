"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "myposting",
  setup(__props) {
    const myposting = common_vendor.reactive([]);
    function todetaillost(item) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}&stste=1`
      });
    }
    common_vendor.onShow(() => {
      api_index.selectmyposting().then((res) => {
        myposting.length = 0;
        const result = res.data.users;
        result.forEach(function(item, index, result2) {
          myposting.push(item);
        });
        console.log("查询成", myposting);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(myposting, (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.imtename),
            c: common_vendor.t(item.date),
            d: common_vendor.t(item.message),
            e: common_vendor.o(($event) => todetaillost(item), item.imgurl),
            f: item.imgurl,
            g: "2b2af2d9-0-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b2af2d9"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/myposting/myposting.vue"]]);
wx.createPage(MiniProgramPage);
