"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "administrator",
  setup(__props) {
    const menu = common_vendor.reactive([
      {
        id: 1,
        text: "学生管理"
      },
      // {
      // 	id: 2,
      // 	text: '维修人员管理'
      // },
      {
        id: 3,
        text: "学生成绩上传"
      },
      {
        id: 4,
        text: "课程添加"
      },
      {
        id: 5,
        text: "报修订单"
      }
      // {
      // 	id:6,
      // 	text:'失物招领订单'
      // }
    ]);
    function tomarrger(id) {
      if (id == 1) {
        common_vendor.index.navigateTo({
          url: "/pages/studentmanage/studentmanage"
        });
      }
      if (id == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/maintenancemanage/maintenancemanage"
        });
      }
      if (id == 3) {
        common_vendor.index.navigateTo({
          url: "/pages/resultsuploaded/resultsuploaded"
        });
      }
      if (id == 4) {
        common_vendor.index.navigateTo({
          url: "/pages/courseaddition/courseaddition"
        });
      }
      if (id == 5) {
        common_vendor.index.navigateTo({
          url: "/pages/adminrpair/adminrpair"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(menu, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.id,
            c: common_vendor.o(($event) => tomarrger(item.id), item.id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6d47b6d"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/components/home/administrator/administrator.vue"]]);
wx.createComponent(Component);
