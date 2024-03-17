<template>
	<view class="box">
		<view class="backgroud-header">
			<text>成绩查询</text>
		</view>

		<view class="grades">
			<picker :value="pickerindex" :range="academicyear" @change="bindPickerChange" mode="selector">
				<view class="academicyear">{{academicyear[pickerindex]}}学期</view>
			</picker>
			<view class="gradesitem" v-for="(item,index) in grades">
				<view class="gradesitem-left">
					<text>{{item.coursename}}\n</text>
					<text>学分:{{item.credit}}</text>
				</view>
				<view class="gradesitem-right">
					<text :style="{color:(item.couregrade>=60?'black':'red')}">{{item.couregrade}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		selectgrade
	} from '../../api/index.js'
	const academicyear = reactive([
		'2020-2021-1',
		'2020-2021-2',
		'2021-2022-1',
		'2021-2022-2',
		'2022-2023-1',
		'2022-2023-2',
		'2023-2024-1',
		'2023-2024-2'
	])
	const grades = reactive([])
	const pickerindex = ref(0)
	
	onShow(() => {

	})

	function selectsutdengrade(config) {
		grades.length = 0
		selectgrade(config).then((res) => {
				const result = res.data
				result.forEach(function(item, index, result) {
					grades.push(item)
				})
				console.log('成绩查询成功', grades)
			})
			.catch((err) => {
				console.log('成绩查询失败0', err)
			})
	}

	function bindPickerChange(event) {
		pickerindex.value = event.detail.value
		console.log(academicyear[pickerindex.value])
		const params = {
			academicyear: academicyear[pickerindex.value]
		}
		selectsutdengrade(params)
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		justify-content: center;

		.backgroud-header {
			position: fixed;
			font-size: 70rpx;
			text-align: center;
			line-height: 440rpx;
			color: white;
			background: linear-gradient(to bottom left, rgb(110, 73, 212), rgb(105, 125, 222));
			width: 100%;
			height: 650rpx;
			border-bottom-left-radius: 30%;
			border-bottom-right-radius: 30%;
			z-index: -1;
		}

		.grades {
			width: 85%;
			padding: 30rpx;
			// border: 1px solid red;
			margin-top: 50%;
			background-color: rgb(254, 254, 254);
			border-radius: 20rpx;
			box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
			picker {
				color: rgb(178, 180, 179);
				border-bottom: 3px solid rgb(246, 246, 246);
			}

			.gradesitem {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 150rpx;
				line-height: 60rpx;
				border-bottom: 3px solid rgb(246, 246, 246);

				.gradesitem-right {
					letter-spacing: 5rpx;
				}
			}
		}
	}
</style>