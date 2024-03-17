"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_segmented_control2 + _easycom_uni_card2 + _easycom_uni_fab2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_card + _easycom_uni_fab)();
}
const _sfc_main = {
  __name: "lostandfound",
  setup(__props) {
    const items = common_vendor.reactive(["失物招领", "寻物启事"]);
    const current = common_vendor.ref(0);
    const horizontal = common_vendor.ref("right");
    const pattern = common_vendor.reactive({
      icon: "paperplane"
    });
    const lostmessage = common_vendor.reactive([]);
    const findingnotice = common_vendor.reactive([]);
    function onClickItem(e) {
      if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
      }
    }
    function todetaillost(item) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}`
      });
    }
    function todetailfound(item) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}`
      });
    }
    function tolost() {
      common_vendor.index.navigateTo({
        url: "/pages/lost/lost"
      });
    }
    function select() {
      api_index.selectlostandfound().then((res) => {
        lostmessage.length = 0;
        const result = res.data.users;
        result.forEach(function(item, index, result2) {
          lostmessage.push(item);
        });
        console.log("失物招领", res.data);
      }).catch((err) => {
        console.log("查询失败", err);
      });
    }
    function selectfinding() {
      api_index.selectfindingnotices().then((res) => {
        findingnotice.length = 0;
        if (res.data.status == 1) {
          const result = res.data.users;
          result.forEach(function(item, index, reult) {
            findingnotice.push(item);
          });
          console.log("寻物启事", result);
        }
      }).catch((err) => {
        console.log("寻物启事查询失败", err);
      });
    }
    common_vendor.onShow(() => {
      select();
      selectfinding();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items,
          styleType: "text",
          activeColor: "#6388f8"
        }),
        c: common_vendor.f(lostmessage, (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.imtename),
            c: common_vendor.t(item.date),
            d: common_vendor.t(item.message),
            e: common_vendor.o(($event) => todetaillost(item), item.imgurl),
            f: item.imgurl,
            g: "9f88ee8c-1-" + i0
          };
        }),
        d: current.value === 0,
        e: common_vendor.f(findingnotice, (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.imtename),
            c: common_vendor.t(item.date),
            d: common_vendor.t(item.message),
            e: common_vendor.o(($event) => todetailfound(item), item.imgurl),
            f: item.imgurl,
            g: "9f88ee8c-2-" + i0
          };
        }),
        f: current.value === 1,
        g: common_vendor.o(tolost),
        h: common_vendor.p({
          pattern,
          content: _ctx.content,
          horizontal: horizontal.value,
          vertical: _ctx.vertical
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/lostandfound/lostandfound.vue"]]);
wx.createPage(MiniProgramPage);
