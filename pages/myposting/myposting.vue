<template>
	<uni-card v-for="(item,index) in myposting " :key="item.imgurl">
		<view class="list">
			<view class="left">
				<image mode="aspectFill" :src="item.imgurl"></image>
			</view>
			<view class="middle">
				<view class="title"><text>{{item.imtename}}</text></view>
				<view class="date"><text>{{item.date}}</text></view>
				<view class="desc">
					<text>{{item.message}}</text>
				</view>
			</view>
			<view class="right">
				<button class="btn" @click="todetaillost(item)">查看</button>
			</view>
		</view>
	</uni-card>

</template>

<script setup>
	import {
		selectmyposting
	} from '../../api/index.js'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		reactive
	} from "vue";
	const myposting = reactive([])

	function todetaillost(item) {
		uni.navigateTo({
			url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}&stste=1`
		})
	}
	onShow(() => {
		selectmyposting().then((res) => {
			myposting.length = 0
			const result = res.data.users
			result.forEach(function(item, index, result) {
				myposting.push(item)
			})
			console.log('查询成', myposting)
		})
	})
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		.left {
			width: 100%;
			height: 100%;
	
			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	
		.middle {
			// padding: 20rpx 0;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			// margin-left: 20rpx;
			flex: 3;
	
			.title {
				font-size: 30rpx;
				font-weight: 600;
				width: 300rpx;
			}
	
			.date {
				width: 300rpx;
				color: #bbb;
				font-size: 24rpx;
			}
	
			.desc {
				width: 300rpx;
				color: #000;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
	
			view {
				margin: 5rpx 0;
			}
		}
		.right {
			button.btn {
				padding: 0;
				margin-right: 30rpx;
				width: 100rpx;
				height: 55rpx;
				line-height: 55rpx;
				text-align: center;
				font-size: 24rpx;
				font-weight: 600;
				background-color: rgb(173, 192, 251);
				border-radius: 6rpx;
			}
		
			button.btn::after {
				border: none;
			}
		}
	}
</style>