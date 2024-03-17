"use strict";
const common_vendor = require("../../common/vendor.js");
const api_admin = require("../../api/admin.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_card2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_card + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "adminrpair",
  setup(__props) {
    const items = common_vendor.reactive(["待维修", "已维修"]);
    const current = common_vendor.ref(0);
    common_vendor.ref("right");
    const pendingrepairorders = common_vendor.reactive([]);
    const completed = common_vendor.reactive([]);
    const message = common_vendor.ref(null);
    const msgType = common_vendor.ref("");
    const messageText = common_vendor.ref("");
    common_vendor.reactive({
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
    function selectrepairstudentsss() {
      api_admin.selectrepairstudent().then((res) => {
        pendingrepairorders.length = 0;
        if (res.data.status == 1) {
          const result = res.data.restul;
          result.forEach(function(item, index, res2) {
            pendingrepairorders.push(item);
          });
          console.log("查询所有学生待维修订单及其用户信息成功", pendingrepairorders);
        }
      }).catch((err) => {
        console.log("查询待维修订单失败", err);
      });
    }
    function selectrepairstudentalreadyyyy() {
      api_admin.selectrepairstudentalready().then((res) => {
        completed.length = 0;
        if (res.data.status == 1) {
          const result = res.data.restul;
          result.forEach(function(item, index, res2) {
            completed.push(item);
          });
          console.log("查询待维修订单成功", completed);
        }
      }).catch((err) => {
        console.log("查询待维修订单失败", err);
      });
    }
    common_vendor.onShow(() => {
      selectrepairstudentsss();
      selectrepairstudentalreadyyyy();
    });
    function onClickItem(e) {
      if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
      }
    }
    function repaired(item) {
      common_vendor.index.showModal({
        title: "提示",
        content: "设备是否正已维修？",
        success: function(e) {
          if (e.confirm == true) {
            api_admin.updaterepaireeed(item).then((res) => {
              console.log("设备已维修", res);
              if (res.data.status == 1) {
                msgType.value = "success";
                messageText.value = res.data.message;
                message.value.open();
                selectrepairstudentsss();
                selectrepairstudentalreadyyyy();
              } else {
                msgType.value = "error";
                messageText.value = res.data.message;
                message.value.open();
              }
            }).catch((err) => {
              console.log("请求失败", err);
            });
            console.log(e);
          }
        }
      });
    }
    function underrepair(item) {
      common_vendor.index.showModal({
        title: "提示",
        content: "设备是否正在维修？",
        success: function(e) {
          if (e.confirm == true) {
            api_admin.updaterepairprogress(item).then((res) => {
              if (res.data.status == 1) {
                msgType.value = "success";
                messageText.value = res.data.message;
                message.value.open();
                selectrepairstudentsss();
              } else {
                msgType.value = "error";
                messageText.value = res.data.message;
                message.value.open();
              }
            }).catch((err) => {
              console.log("请求失败", err);
            });
            console.log(e);
          }
        }
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
            a: common_vendor.t(item.repairordersdmessage.orderid),
            b: common_vendor.t(common_vendor.unref(stateone)(item.repairordersdmessage) ? "待完成" : "维修中"),
            c: common_vendor.t(item.repairordersdmessage.devicename),
            d: common_vendor.t(item.repairordersdmessage.phone),
            e: common_vendor.t(item.repairordersdmessage.address),
            f: common_vendor.t(item.repairordersdmessage.date),
            g: common_vendor.o(($event) => underrepair(item.repairordersdmessage), item.repairordersdmessage.orderid),
            h: common_vendor.o(($event) => repaired(item.repairordersdmessage), item.repairordersdmessage.orderid),
            i: item.repairordersdmessage.orderid,
            j: "eb2eecca-1-" + i0
          };
        }),
        d: current.value === 0,
        e: common_vendor.f(completed, (item, index, i0) => {
          return {
            a: common_vendor.t(item.repairordersdmessage.orderid),
            b: common_vendor.t(item.repairordersdmessage.state == 2 ? "已维修" : ""),
            c: common_vendor.t(item.repairordersdmessage.devicename),
            d: common_vendor.t(item.repairordersdmessage.phone),
            e: common_vendor.t(item.repairordersdmessage.address),
            f: common_vendor.t(item.repairordersdmessage.date),
            g: item.repairordersdmessage.orderid,
            h: "eb2eecca-2-" + i0
          };
        }),
        f: current.value === 1,
        g: common_vendor.p({
          type: msgType.value,
          message: messageText.value,
          duration: 2e3
        }),
        h: common_vendor.sr(message, "eb2eecca-3", {
          "k": "message"
        }),
        i: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb2eecca"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/adminrpair/adminrpair.vue"]]);
wx.createPage(MiniProgramPage);
