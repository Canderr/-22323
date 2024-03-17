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
  __name: "repair",
  setup(__props) {
    const items = common_vendor.reactive(["待维修", "已完成"]);
    const current = common_vendor.ref(0);
    const horizontal = common_vendor.ref("right");
    const pendingrepairorders = common_vendor.reactive([]);
    const completed = common_vendor.reactive([]);
    const pattern = common_vendor.reactive({
      icon: "gear-filled"
    });
    const stateone = common_vendor.computed(() => (item) => {
      if (item.state == 0) {
        return true;
      }
      if (item.state == 1) {
        return false;
      }
    });
    common_vendor.onShow(() => {
      api_index.selectpendingrepairorders().then((res) => {
        pendingrepairorders.length = 0;
        if (res.data.status == 1) {
          const result = res.data.users;
          result.forEach(function(item, index, res2) {
            pendingrepairorders.push(item);
          });
          console.log("查询待维修订单成功", pendingrepairorders);
        }
      }).catch((err) => {
        console.log("查询待维修订单失败", err);
      });
      api_index.selectpendingrepairorderscompleted().then((res) => {
        completed.length = 0;
        if (res.data.status == 1) {
          const result = res.data.users;
          result.forEach(function(item, index, res2) {
            completed.push(item);
          });
          console.log("查询待维修订单成功", completed);
        }
      }).catch((err) => {
        console.log("查询待维修订单失败", err);
      });
    });
    function onClickItem(e) {
      if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
      }
    }
    function tolost() {
      common_vendor.index.navigateTo({
        url: "/pages/submitrepair/submitrepair"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items,
          styleType: "text",
          activeColor: "#6388f8"
        }),
        c: common_vendor.f(pendingrepairorders, (item, index, i0) => {
          return {
            a: common_vendor.t(item.orderid),
            b: common_vendor.t(common_vendor.unref(stateone)(item) ? "待完成" : "维修中"),
            c: common_vendor.t(item.devicename),
            d: common_vendor.t(item.phone),
            e: common_vendor.t(item.address),
            f: common_vendor.t(item.date),
            g: item.orderid,
            h: "ad4deb87-1-" + i0
          };
        }),
        d: current.value === 0,
        e: common_vendor.f(completed, (item, index, i0) => {
          return {
            a: common_vendor.t(item.orderid),
            b: common_vendor.t(item.state == 2 ? "已完成" : ""),
            c: common_vendor.t(item.devicename),
            d: common_vendor.t(item.phone),
            e: common_vendor.t(item.address),
            f: common_vendor.t(item.date),
            g: item.orderid,
            h: "ad4deb87-2-" + i0
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad4deb87"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/repair/repair.vue"]]);
wx.createPage(MiniProgramPage);
