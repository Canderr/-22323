<template>
	<view>
		<view class="submitmessage">
			<uni-forms border>
				<uni-forms-item label="学生">
					<uni-data-select v-model="value" :localdata="students" @change="changestudent"
						:clear="true"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="课程">
					<uni-data-select v-model="value" :localdata="course" @change="changecourse"
						:clear="true"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="学年">
					<uni-data-select v-model="value" :localdata="academicyear" :clear="true"
						@change="changeacademicyear"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="课程时间">
					<uni-data-select v-model="value" :localdata="coursetime" :clear="true"
						@change="changecoursetime"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="节数">
					<uni-data-select v-model="value" :localdata="range" @change="changeclasstime"
						:clear="true"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="周几">
					<uni-data-select v-model="value" :localdata="week" @change="changeweek"
						:clear="true"></uni-data-select>
				</uni-forms-item>
			</uni-forms>
			<view class="submibutten" @click="submit">提交</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		selectstudents,
		selectacademicyeartable,
		selectcourse,
		insertstudentcourseandtime
	} from '../../api/admin.js'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	const students = reactive([]) //学生
	const course = reactive([]) //课程
	const academicyear = reactive([]) //学年
	const submitmessage = reactive({
		studentid:null,
		course:null,
		academicyear:null,
		coursetime:null,
		classtime:null,
		week:null
	})
	const week = reactive([{
			value: '周一',
			text: '周一'
		},
		{
			value: '周二',
			text: '周二'
		},
		{
			value: '周三',
			text: '周三'
		},
		{
			value: '周四',
			text: '周四'
		},
		{
			value: '周五',
			text: '周五'
		},
		{
			value: '周六',
			text: '周六'
		},
		{
			value: '周日',
			text: '周日'
		},
	])
	const coursetime = reactive([{
			value: '1-8周',
			text: '1-8周'
		},
		{
			value: '1-16周',
			text: '1-8周'
		},
		{
			value: '1-12周',
			text: '1-8周'
		},
		{
			value: '4-7周',
			text: '4-7周'
		}
	])
	//节数
	const range = reactive([{
			value: '1-2节',
			text: '1-2节'
		},
		{
			value: '1-3节',
			text: '1-3节'
		},
		{
			value: '1-4节',
			text: '1-4节'
		},
		{
			value: '2-4节',
			text: '2-4节'
		},
		{
			value: '3-5节',
			text: '3-5节'
		},
		{
			value: '6-8节',
			text: '6-8节'
		},
		{
			value: '7-8节',
			text: '7-8节'
		},

		{
			value: '9-11节',
			text: '9-11节'
		},
		{
			value: '9-12节',
			text: '9-12节'
		},
	])
	//选择学生
	function changestudent(e) {
		// submitmessage.classify=range[e].text
		submitmessage.studentid = e
	}
	//选择课程
	function changecourse(e) {
		// submitmessage.classify=range[e].text
		submitmessage.course = e

	}
	//选择学年
	function changeacademicyear(e) {
		submitmessage.academicyear = e

	}
	//选择课程时间
	function changecoursetime(e) {
		submitmessage.coursetime = e

	}
	//选择节数
	function changeclasstime(e) {
		submitmessage.classtime = e

	}
	//选择周一至周日
	function changeweek(e) {
		submitmessage.week = e

	}

	function submit() {
		insertstudentcourseandtime(submitmessage).then((res)=>{
			if(res.data.status==1){
				uni.showToast({
					title:res.data.message,
					icon:'success'
				})
			}else{
				uni.showModal({
					title:'提示',
					content:res.data.message,
					showCancel: false,
				})
			}
			console.log('请求成功',res)
		})
		.catch((err)=>{
			console.log('请求失败',err)
		})
		console.log(submitmessage)
	}
	onShow(() => {
		//学生数据
		selectstudents().then((res) => {
			if (res.data.status == 1) {
				students.length = 0
				const restul = res.data.users
				restul.forEach(function(item, index, restul) {
					students.push({
						value: item.id,
						text: item.username
					})
				})
			}
		}).catch((err) => {
			console.log('学生数据请求失败', err)
		})
		//学年数据
		selectacademicyeartable().then((res) => {
			if (res.data.status == 1) {
				academicyear.length = 0
				const restul = res.data.users
				restul.forEach(function(item, index, restul) {
					academicyear.push({
						value: item.id,
						text: item.academicyear
					})
				})
			}
		}).catch((err) => {
			console.log('学生数据请求失败', err)
		})

		//课程数据
		selectcourse().then((res) => {
			if (res.data.status == 1) {
				course.length = 0
				const restul = res.data.users
				restul.forEach(function(item, index, restul) {
					course.push({
						value: item.coursevarchid,
						text: item.coursename
					})
				})
			}
		}).catch((err) => {
			console.log('学生数据请求失败', err)
		})


	})
</script>

<style lang="scss" scoped>
	view {
		padding: 30rpx;

		.submitmessage {
			box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

			.submibutten {
				line-height: 25rpx;
				text-align: center;
				border-radius: 30rpx;
				margin: 10rpx auto;
				background-color: rgb(77, 116, 247);
				color: #fff;
			}
		}
	}
</style>