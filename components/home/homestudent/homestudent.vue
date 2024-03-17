<template>
	<view>
		<view class="menu">
			<view class="menuitem" v-for="(item,index) in menuitem" :key="index" @click="navigator(item.id)">
				<i :class="'t-icon-'+item.icon" style="height: 60rpx;width: 60rpx;"></i>
				<text class="wenzi">{{item.text}}</text>
			</view>
		</view>

		<view class="todays-course">
			<view class="todays-course-header">
				<view class="coursetitle"><text>今日课程</text></view>
				<view class="">
					<picker :value="pickerindex" :range="academicyears" @change="bindPickerChange($event,academicyears)"
						mode="selector" :range-key="'academicyear'">
						<view class="academicyear">{{academicyears[pickerindex].academicyear}}学期</view>
					</picker>
				</view>
			</view>
			<!-- -({{item.courseteacher}})- -->
			<!-- -({{item.classroom}}) -->
			<view class="couresitem" v-for="(item,index) in course" :key="index">
				<view class="couresitem-one">
					<text>{{item.coursename}}({{item.courseweek}})</text>
				</view>
				<view class="couresitem-one"><text>{{item.coursetimeday}}</text></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onBeforeMount
	} from 'vue'
	import {
		onShow,
		onLoad,
		onInit
	} from '@dcloudio/uni-app';
	import {
		selectcourse,
		selectacademicyeartable
	} from '../../../api/index.js'
	import {
		selectcouseyear
	} from '../../../api/admin.js';
	const academicyears = reactive([{
			academicyear: '2020-2021-1',
			id: '1-1'
		},
		{
			academicyear: '2020-2021-2',
			id: '1-2'
		},
		{
			academicyear: '2021-2022-1',
			id: '2-1'
		},
		{
			academicyear: '2021-2022-2',
			id: '2-2'
		},
		{
			academicyear: '2022-2023-1',
			id: '3-1'
		},
		{
			academicyear: '2022-2023-1',
			id: '3-2'
		},
		{
			academicyear: '2023-2024-1',
			id: '4-1'
		},
		{
			academicyear: '2023-2024-2',
			id: '4-2'
		}
	])
	const menuitem = reactive([{
			id: 1,
			icon: 'kebiao',
			text: '课表'
		},
		{
			id: 2,
			icon: 'chengjichaxun-01',
			text: '成绩'
		},
		{
			id: 3,
			icon: 'dibudaohanglan-',
			text: '失物招领'
		},
		// {
		// 	id: 4,
		// 	icon: 'xinwenzixun',
		// 	text: '新闻资讯'
		// },
		{
			id: 5,
			icon: 'baoxiu',
			text: '报修'
		},
		// {
		// 	id: 6,
		// 	icon: 'baoxiu',
		// 	text: '报修'
		// }
	])

	const course = reactive([])
	const pickerindex = ref(0)

	function bindPickerChange(e, strong) {
		pickerindex.value = e.detail.value
		const query = {
			yearid: academicyears[pickerindex.value].id
		}
		selectcourseyear(query)
		// console.log(academicyears[pickerindex.value].academicyear)
	}

	function getday() {
		const a = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
		const week = new Date().getDay();
		const str = a[week];
	}

	//查询学年课程表
	function selectcourseyear(config) {
		selectcourse(config).then((res) => {
				course.length = 0
				const a = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				const week = new Date().getDay();
				const str = a[week];
				const resutl = res.data
				const arr = []
				//今日课程
				for (let item of resutl) {
					if (item.weeke == str) {
						course.push(item)
						arr.push(item)
					}
				}
				console.log('分类类成功', arr)
				console.log('请求成功', course)
			})
			.catch((err) => {
				console.log('请求失败', err)
			})
	}

	onShow(() => {
		selectcourseyear({
			yearid: '1-1'
		})
	})
	onLoad(() => {
		selectcourseyear({
			yearid: '1-1'
		})
	})

	function navigator(id) {
		if (id == 1) {
			uni.navigateTo({
				url: '/pages/coursetable/coursetable'
			})
		}
		if (id == 2) {
			uni.navigateTo({
				url: '/pages/grades/grades'
			})
		}
		if (id == 3) {
			uni.navigateTo({
				url: '/pages/lostandfound/lostandfound'
			})
		}
		if (id == 5) {
			uni.navigateTo({
				url: '/pages/repair/repair'
			})
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: 'iconfont';
		/* Project id 4265986 */
		src: url('//at.alicdn.com/t/c/font_4265986_0c9hbwev5vxf.woff2?t=1695537517613') format('woff2'),
			url('//at.alicdn.com/t/c/font_4265986_0c9hbwev5vxf.woff?t=1695537517613') format('woff'),
			url('//at.alicdn.com/t/c/font_4265986_0c9hbwev5vxf.ttf?t=1695537517613') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 60rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.header {
		height: 380rpx;
		background-color: rgb(77, 116, 247);
		// border: 1px solid red;
		line-height: 380rpx;
		color: white;
		text-align: center;
		font-size: 35rpx;
	}

	.menu {
		display: flex;
		// justify-content: space-around;
		flex-wrap: wrap;
		background-color: rgb(253, 255, 254);
		border-radius: 30rpx;
		padding: 0 30rpx;

		.menuitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 130rpx;
			margin: 10rpx 90rpx;
			font-size: 28rpx;
		}

	}

	.todays-course {
		margin-top: 20rpx;
		border-radius: 30rpx;
		background-color: rgb(253, 255, 254);
		padding: 20rpx;

		.todays-course-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.academicyear {
				color: rgb(178, 180, 179);
			}

		}

		.coursetitle {
			font-size: 28rpx;
			padding: 20rpx;
		}

		.couresitem {
			border-radius: 20rpx;
			padding: 20rpx;
			box-shadow: 2px 2px 2px 1px rgba(247, 247, 247);
			border: 2rpx solid rgb(247, 247, 247);
			padding: 20rpx;
			margin-bottom: 10rpx;

			.couresitem-one {
				margin-bottom: 10rpx;
			}

			padding: 20rpx;
		}
	}
</style>