<template>
	<view class="courseContainer">
		<view class="date">

			<view class="month">
				<!-- <view>{{month}}</view> -->
				<picker :value="pickerindex" :range="academicyears" @change="bindPickerChange($event,academicyears)"
					mode="selector" :range-key="'academicyear'">
					<view class="academicyear">{{academicyears[pickerindex].academicyear}}</view>
				</picker>
			</view>
			<view class="day">
				<view class="week {{todayMonth == monthNum && day == item?'todayDate':''}}"
					v-for="(item,index) in nowDay">
					<view class="week-item">周{{week[index]}}</view>
				</view>
			</view>
		</view>

		<!-- 课表其余 -->
		<scroll-view scroll-x="false" scroll-y scroll-top="{{scrollTop}}" class="courseScroll">
			<view class="courseContent">
				<view class="courseTime">
					<view v-for="(item,index) in 12" :key="index" class="left">
						<view class="number">{{item}}</view>
						<view class="course-time">
							<view class="time-start">{{course_time[index][0]}}</view>
							<view class="time-end">{{course_time[index][1]}}</view>
						</view>
					</view>
					<view>
						<view>其他课程</view>
					</view>
				</view>

				<view class="course">
					<view v-for="(item,index) in wList" :key="index" class="kcb-item"
						:style="{marginLeft: item.isToday != 7 ? (item.isToday) * 100 + 'rpx' : 0 ,marginTop: (item.jie -1)*110 + 4 + 'rpx',height: item.classNumber*110-8+'rpx'}">
						<view class="smalltext" :style="{backgroundColor:colorArrays[item.id-1]}">
							<view class="smalltextName">{{item.name}}</view>
							<view class="smalltextAddress">{{item.address}}</view>
						</view>
					</view>
				</view>
				<!-- <view wx:for="{{otherCourse}}" wx:key="index" class="otherCourse">
				          <view>{{item.name}}*{{item.teacher}}/{{item.time}}/{{item.address}}</view>
				        </view> -->
			</view>


		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		selectcourse
	} from '../../api/index.js'
	const nowDay = reactive([1, 2, 3, 4, 5, 6, 7])
	const week = reactive(['日', '一', '二', '三', '四', '五', '六'])
	const pickerindex = ref(0)
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
	const colorArrays = reactive([
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
	])
	const course_time = reactive([
		['8:40', ''],
		['', '10:00'],
		['10:30', ''],
		['', '11:50'],
		['14:00', ''],
		['', '15:20'],
		['15:50', ''],
		['', '17:10'],
		['18:30', ''],
		['', '19:50'],
		['20:00', ''],
		['', '21:20'],
	])
	const noweek = reactive()
	const wList = reactive([])

	function bindPickerChange(e, strong) {
		pickerindex.value = e.detail.value

		const query = {
			yearid: academicyears[pickerindex.value].id
		}
		selectyearcourse(query)
	}

	function conversion(params) {
		if (params == '一') return 1
		if (params == '二') return 2
		if (params == '三') return 3
		if (params == '四') return 4
		if (params == '五') return 5
		if (params == '六') return 6
		if (params == '日') return 7
	}

	function selectyearcourse(config) {
		selectcourse(config).then((res) => {
			console.log('請求成功', res)
			wList.length = 0
			const restul = res.data
			restul.forEach(function(item) {
				const star = parseInt(item.coursetimeday.slice(0, 1))
				const end = parseInt(item.coursetimeday.slice(2, 3))
				const day = conversion(item.weeke.slice(-1))
				const classnumber = end - star + 1
				wList.push({
					id: item.courseid,
					isToday: day,
					jie: star,
					classNumber: classnumber,
					name: item.coursename
				})
			})
		})
	}
	onLoad(() => {
		selectyearcourse({yearid:'1-1'})
		// selectcourse({
		// 	yearid: '1-1'
		// }).then((res) => {
		// 	console.log('請求成功', res)
		// 	wList.length = 0
		// 	const restul = res.data
		// 	restul.forEach(function(item) {
		// 		const star = parseInt(item.coursetimeday.slice(0, 1))
		// 		const end = parseInt(item.coursetimeday.slice(2, 3))
		// 		const day = conversion(item.weeke.slice(-1))
		// 		const classnumber = end - star + 1
		// 		wList.push({
		// 			id: item.courseid,
		// 			isToday: day,
		// 			jie: star,
		// 			classNumber: classnumber,
		// 			name: item.coursename
		// 		})
		// 	})
		// })
	})
</script>

<style scoped>
	.academicyear {
		font-size: 20rpx;
	}

	.navScroll {
		display: flex;
		white-space: nowrap;
		height: 75rpx;
		font-size: 25rpx;
	}

	.navScroll .navItem {
		margin: 20rpx 12rpx 0rpx;
	}

	.navScroll .navItem .navContent {
		padding: 5rpx 25rpx;
		line-height: 38rpx;
	}

	.active {
		border-bottom: 1px solid red;
		color: red;
	}

	.date {
		display: flex;
		height: 90rpx;
		padding: 6rpx 0;
		color: #3f3f3f;
		line-height: 1.4;
	}

	.date .month {
		width: 7%;
		font-size: 24rpx;
		display: inline-block;
		color: #3f3f3f;
		text-align: center;
		height: 100%;
		padding: 8rpx 0;
	}

	.date .day {
		width: calc(100% - 8%);
		margin: 0 auto;
	}

	.date .day .week {
		width: calc(100% / 7);
		display: inline-block;
		height: 100%;
		text-align: center;
	}

	.date .day .week-item {
		font-size: 24rpx;
		font-weight: 700;
		line-height: 1.8;
	}

	.date .day .day-item {
		font-size: 22rpx;
		color: #333;
	}

	.date .day .todayDate {
		background: #1380ff;
		border-radius: 8rpx;
		color: #fff;
	}

	.date .day .todayDate .day-item {
		color: #fff;
	}

	.courseScroll {
		width: 100%;
		height: 100%;
		z-index: 2;
		position: fixed;
	}

	.courseScroll .courseContent {
		height: 1580rpx;
		width: 100%;
		display: flex;
	}

	.courseScroll .courseContent .courseTime {
		width: 7%;
		font-size: 24rpx;
		display: inline-block;
		color: #3f3f3f;
		text-align: center;
	}

	.courseScroll .courseContent .courseTime .left {
		width: 100%;
		height: 110rpx;
		justify-content: center;
		display: flex;
		position: relative;
		align-items: center;
		z-index: 0;
		flex-direction: column;
	}

	.courseScroll .courseContent .courseTime .left .course-time {
		height: 110rpx;
		width: 100%;
		position: absolute;
		text-align: center;
		top: 0;
		right: 0;
	}

	.courseScroll .courseContent .courseTime .left .course-time .time-start,
	.courseScroll .courseContent .courseTime .left .course-time .time-end {
		color: #8799a3;
		font-size: 20rpx;
		position: absolute;
		width: 100%;
		left: 0;
	}

	.courseScroll .courseContent .courseTime .left .course-time .time-start {
		top: 12rpx;
	}

	.courseScroll .courseContent .courseTime .left .course-time .time-end {
		bottom: 12rpx;
	}

	.courseScroll .courseContent .courseTime .left .number {
		font-size: 24rpx;
		line-height: 110rpx;
	}

	.course {
		width: 92%;
		margin: 0 auto;
	}

	.course .kcb-item {
		width: calc(92% / 7);
		position: absolute;
		justify-content: center;
		display: flex;
	}

	.course .kcb-item .smalltext {
		height: 100%;
		width: 100%;
		margin: 0 4rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		text-align: center;
		color: #fff;
		border-radius: 8rpx;
		padding: 2rpx 4rpx;
		display: flex;
		flex-direction: column;
	}

	.course .kcb-item .smalltext .smalltextName {
		flex: 1 0 auto;
	}

	.course .kcb-item .smalltext .smalltextAddress {
		/* border-top:none; */
		border-top: 1px solid #fff;
		flex: 0 0 auto;
	}
</style>