"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
require("../../../utils/request.js");
const _sfc_main = {
  __name: "homestudent",
  setup(__props) {
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
    const menuitem = common_vendor.reactive([
      {
        id: 1,
        icon: "kebiao",
        text: "课表"
      },
      {
        id: 2,
        icon: "chengjichaxun-01",
        text: "成绩"
      },
      {
        id: 3,
        icon: "dibudaohanglan-",
        text: "失物招领"
      },
      // {
      // 	id: 4,
      // 	icon: 'xinwenzixun',
      // 	text: '新闻资讯'
      // },
      {
        id: 5,
        icon: "baoxiu",
        text: "报修"
      }
      // {
      // 	id: 6,
      // 	icon: 'baoxiu',
      // 	text: '报修'
      // }
    ]);
    const course = common_vendor.reactive([]);
    const pickerindex = common_vendor.ref(0);
    function bindPickerChange(e, strong) {
      pickerindex.value = e.detail.value;
      const query = {
        yearid: academicyears[pickerindex.value].id
      };
      selectcourseyear(query);
    }
    function selectcourseyear(config) {
      api_index.selectcourse(config).then((res) => {
        course.length = 0;
        const a = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        const week = new Date().getDay();
        const str = a[week];
        const resutl = res.data;
        const arr = [];
        for (let item of resutl) {
          if (item.weeke == str) {
            course.push(item);
            arr.push(item);
          }
        }
        console.log("分类类成功", arr);
        console.log("请求成功", course);
      }).catch((err) => {
        console.log("请求失败", err);
      });
    }
    common_vendor.onShow(() => {
      selectcourseyear({
        yearid: "1-1"
      });
    });
    common_vendor.onLoad(() => {
      selectcourseyear({
        yearid: "1-1"
      });
    });
    function navigator(id) {
      if (id == 1) {
        common_vendor.index.navigateTo({
          url: "/pages/coursetable/coursetable"
        });
      }
      if (id == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/grades/grades"
        });
      }
      if (id == 3) {
        common_vendor.index.navigateTo({
          url: "/pages/lostandfound/lostandfound"
        });
      }
      if (id == 5) {
        common_vendor.index.navigateTo({
          url: "/pages/repair/repair"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(menuitem, (item, index, i0) => {
          return {
            a: common_vendor.n("t-icon-" + item.icon),
            b: common_vendor.t(item.text),
            c: index,
            d: common_vendor.o(($event) => navigator(item.id), index)
          };
        }),
        b: common_vendor.t(academicyears[pickerindex.value].academicyear),
        c: pickerindex.value,
        d: academicyears,
        e: common_vendor.o(($event) => bindPickerChange($event)),
        f: common_vendor.f(course, (item, index, i0) => {
          return {
            a: common_vendor.t(item.coursename),
            b: common_vendor.t(item.courseweek),
            c: common_vendor.t(item.coursetimeday),
            d: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b44dc252"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/components/home/homestudent/homestudent.vue"]]);
wx.createComponent(Component);
