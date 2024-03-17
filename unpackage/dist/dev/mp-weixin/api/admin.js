"use strict";
const utils_request = require("../utils/request.js");
function pageselectstudent(config) {
  return utils_request.http({
    url: "/administrator/pageselectstudent",
    method: "GET",
    data: config
  });
}
function deletestudentid(config) {
  return utils_request.http({
    url: "/administrator/deletestudentid",
    method: "POST",
    data: config
  });
}
function pageselectpersonnel(config) {
  return utils_request.http({
    url: "/administrator/pageselectpersonnel",
    method: "GET",
    data: config
  });
}
function deletepersonnelid(config) {
  return utils_request.http({
    url: "/administrator/deletepersonnelid",
    method: "POST",
    data: config
  });
}
function selectstudents(config) {
  return utils_request.http({
    url: "/administrator/selectstudents",
    method: "GET"
  });
}
function selectcourse(config) {
  return utils_request.http({
    url: "/administrator/selectcourse",
    method: "GET"
  });
}
function selectacademicyeartable(config) {
  return utils_request.http({
    url: "/administrator/selectacademicyeartable",
    method: "GET"
  });
}
function insertstudentcourseandtime(config) {
  return utils_request.http({
    url: "/administrator/insertstudentcourseandtime",
    method: "POST",
    data: config
  });
}
function selectstudentbyid(config) {
  return utils_request.http({
    url: "/administrator/selectstudentbyid",
    method: "GET",
    data: config
  });
}
function selectcouseyear(config) {
  return utils_request.http({
    url: "/administrator/selectcouseyear",
    method: "GET",
    data: config
  });
}
function insertstudentgrade(config) {
  return utils_request.http({
    url: "/administrator/insertstudentgrade",
    method: "POST",
    data: config
  });
}
function selectrepairstudent() {
  return utils_request.http({
    url: "/administrator/selectrepairstudent",
    method: "GET"
  });
}
function selectrepairstudentalready() {
  return utils_request.http({
    url: "/administrator/selectrepairstudentalready",
    method: "GET"
  });
}
function updaterepairprogress(config) {
  return utils_request.http({
    url: "/administrator/updaterepairprogress",
    method: "POST",
    data: config
  });
}
function updaterepaireeed(config) {
  return utils_request.http({
    url: "/administrator/updaterepaireeed",
    method: "POST",
    data: config
  });
}
exports.deletepersonnelid = deletepersonnelid;
exports.deletestudentid = deletestudentid;
exports.insertstudentcourseandtime = insertstudentcourseandtime;
exports.insertstudentgrade = insertstudentgrade;
exports.pageselectpersonnel = pageselectpersonnel;
exports.pageselectstudent = pageselectstudent;
exports.selectacademicyeartable = selectacademicyeartable;
exports.selectcourse = selectcourse;
exports.selectcouseyear = selectcouseyear;
exports.selectrepairstudent = selectrepairstudent;
exports.selectrepairstudentalready = selectrepairstudentalready;
exports.selectstudentbyid = selectstudentbyid;
exports.selectstudents = selectstudents;
exports.updaterepaireeed = updaterepaireeed;
exports.updaterepairprogress = updaterepairprogress;
