"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "grades",
  setup(__props) {
    const academicyear = common_vendor.reactive([
      "2020-2021-1",
      "2020-2021-2",
      "2021-2022-1",
      "2021-2022-2",
      "2022-2023-1",
      "2022-2023-2",
      "2023-2024-1",
      "2023-2024-2"
    ]);
    const grades = common_vendor.reactive([]);
    const pickerindex = common_vendor.ref(0);
    common_vendor.onShow(() => {
    });
    function selectsutdengrade(config) {
      grades.length = 0;
      api_index.selectgrade(config).then((res) => {
        const result = res.data;
        result.forEach(function(item, index, result2) {
          grades.push(item);
        });
        console.log("成绩查询成功", grades);
      }).catch((err) => {
        console.log("成绩查询失败0", err);
      });
    }
    function bindPickerChange(event) {
      pickerindex.value = event.detail.value;
      console.log(academicyear[pickerindex.value]);
      const params = {
        academicyear: academicyear[pickerindex.value]
      };
      selectsutdengrade(params);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(academicyear[pickerindex.value]),
        b: pickerindex.value,
        c: academicyear,
        d: common_vendor.o(bindPickerChange),
        e: common_vendor.f(grades, (item, index, i0) => {
          return {
            a: common_vendor.t(item.coursename),
            b: common_vendor.t(item.credit),
            c: common_vendor.t(item.couregrade),
            d: item.couregrade >= 60 ? "black" : "red"
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f1dcccc"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/grades/grades.vue"]]);
wx.createPage(MiniProgramPage);
