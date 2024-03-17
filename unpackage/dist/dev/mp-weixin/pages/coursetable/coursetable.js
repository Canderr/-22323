"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "coursetable",
  setup(__props) {
    const nowDay = common_vendor.reactive([1, 2, 3, 4, 5, 6, 7]);
    const week = common_vendor.reactive(["日", "一", "二", "三", "四", "五", "六"]);
    const pickerindex = common_vendor.ref(0);
    const academicyears = common_vendor.reactive([
      {
        academicyear: "2020-2021-1",
        id: "1-1"
      },
      {
        academicyear: "2020-2021-2",
        id: "1-2"
      },
      {
        academicyear: "2021-2022-1",
        id: "2-1"
      },
      {
        academicyear: "2021-2022-2",
        id: "2-2"
      },
      {
        academicyear: "2022-2023-1",
        id: "3-1"
      },
      {
        academicyear: "2022-2023-1",
        id: "3-2"
      },
      {
        academicyear: "2023-2024-1",
        id: "4-1"
      },
      {
        academicyear: "2023-2024-2",
        id: "4-2"
      }
    ]);
    const colorArrays = common_vendor.reactive([
      "#AEEC34",
      "#FFC44F",
      "#85B0FD",
      "#FEA17C",
      "#FF9392",
      "#D48DF9",
      "#7FCFF8",
      "#85B8CF",
      "#90C652",
      "#D8AA5A",
      "#FC9F9D",
      "#0A9A84",
      "#61BC69",
      "#12AEF3",
      "#E29AAD"
    ]);
    const course_time = common_vendor.reactive([
      ["8:40", ""],
      ["", "10:00"],
      ["10:30", ""],
      ["", "11:50"],
      ["14:00", ""],
      ["", "15:20"],
      ["15:50", ""],
      ["", "17:10"],
      ["18:30", ""],
      ["", "19:50"],
      ["20:00", ""],
      ["", "21:20"]
    ]);
    common_vendor.reactive();
    const wList = common_vendor.reactive([]);
    function bindPickerChange(e, strong) {
      pickerindex.value = e.detail.value;
      const query = {
        yearid: academicyears[pickerindex.value].id
      };
      selectyearcourse(query);
    }
    function conversion(params) {
      if (params == "一")
        return 1;
      if (params == "二")
        return 2;
      if (params == "三")
        return 3;
      if (params == "四")
        return 4;
      if (params == "五")
        return 5;
      if (params == "六")
        return 6;
      if (params == "日")
        return 7;
    }
    function selectyearcourse(config) {
      api_index.selectcourse(config).then((res) => {
        console.log("請求成功", res);
        wList.length = 0;
        const restul = res.data;
        restul.forEach(function(item) {
          const star = parseInt(item.coursetimeday.slice(0, 1));
          const end = parseInt(item.coursetimeday.slice(2, 3));
          const day = conversion(item.weeke.slice(-1));
          const classnumber = end - star + 1;
          wList.push({
            id: item.courseid,
            isToday: day,
            jie: star,
            classNumber: classnumber,
            name: item.coursename
          });
        });
      });
    }
    common_vendor.onLoad(() => {
      selectyearcourse({ yearid: "1-1" });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(academicyears[pickerindex.value].academicyear),
        b: pickerindex.value,
        c: academicyears,
        d: common_vendor.o(($event) => bindPickerChange($event)),
        e: common_vendor.f(nowDay, (item, index, i0) => {
          return {
            a: common_vendor.t(week[index])
          };
        }),
        f: common_vendor.f(12, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.t(course_time[index][0]),
            c: common_vendor.t(course_time[index][1]),
            d: index
          };
        }),
        g: common_vendor.f(wList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: colorArrays[item.id - 1],
            d: index,
            e: item.isToday != 7 ? item.isToday * 100 + "rpx" : 0,
            f: (item.jie - 1) * 110 + 4 + "rpx",
            g: item.classNumber * 110 - 8 + "rpx"
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e3c8dd2"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/coursetable/coursetable.vue"]]);
wx.createPage(MiniProgramPage);
