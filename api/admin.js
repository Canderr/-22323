import {http,Request} from '../utils/request.js'
//管理员分页查询学生表
export function pageselectstudent(config){
	return http({
		url:'/administrator/pageselectstudent',
		method:'GET',
		data:config
	})
}
//根据account删除学生
export function deletestudentid(config){
	return http({
		url:'/administrator/deletestudentid',
		method:'POST',
		data:config
	})
}
//管理员分页查询维修员
export function pageselectpersonnel(config){
	return http({
		url:'/administrator/pageselectpersonnel',
		method:'GET',
		data:config
	})
}
//根据account维修员
export function deletepersonnelid(config){
	return http({
		url:'/administrator/deletepersonnelid',
		method:'POST',
		data:config
	})
}
//查询学生表
export function selectstudents(config){
	return http({
		url:'/administrator/selectstudents',
		method:'GET',
	})
}
//查询课程表
export function selectcourse(config){
	return http({
		url:'/administrator/selectcourse',
		method:'GET',
	})
}
//查询学年表
export function selectacademicyeartable(config){
	return http({
		url:'/administrator/selectacademicyeartable',
		method:'GET',
	})
}
//给学生添加课程和课程时间
export function insertstudentcourseandtime(config){
	return http({
		url:'/administrator/insertstudentcourseandtime',
		method:'POST',
		data:config
	})
}
//根据学生id查询学生课程
export function selectstudentbyid(config){
	return http({
		url:'/administrator/selectstudentbyid',
		method:'GET',
		data:config
	})
}

//根据课程id查询课程学年
export function selectcouseyear(config){
	return http({
		url:'/administrator/selectcouseyear',
		method:'GET',
		data:config
	})
}
//给学生上传成绩
export function insertstudentgrade(config){
	return http({
		url:'/administrator/insertstudentgrade',
		method:'POST',
		data:config
	})
}
//查询所有待维修订单及其用户信息
export function selectrepairstudent(){
	return http({
		url:'/administrator/selectrepairstudent',
		method:'GET',
	})
}
//查询所有已维修订单及其用户信息
export function selectrepairstudentalready(){
	return http({
		url:'/administrator/selectrepairstudentalready',
		method:'GET',
	})
}
//修改订单状态为正在维修
export function updaterepairprogress(config){
	return http({
		url:'/administrator/updaterepairprogress',
		method:'POST',
		data:config
	})
}
//修改订单状态为已维修
export function updaterepaireeed(config){
	return http({
		url:'/administrator/updaterepaireeed',
		method:'POST',
		data:config
	})
}