<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="#6388f8"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<!-- <view class="lost" v-for="(item,index) in lostmessage" :key="item.imgurl">
					<view class="lostimg">
						<image :src="item.imgurl" mode="aspectFit">
						</image>
					</view>
					<view class="losttext">
						<text>{{item.message}}</text>
					</view>
					<view class="loststate">
						<text>认领中</text>
					</view>
				</view> -->
				<uni-card v-for="(item,index) in lostmessage " :key="item.imgurl">
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
			</view>
			<view v-show="current === 1">
				<uni-card  v-for="(item,index) in findingnotice " :key="item.imgurl">
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
							<button class="btn" @click="todetailfound(item)">查看</button>
						</view>
					</view>
				</uni-card>
			</view>
		</view>

		<view>
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				@fabClick="tolost"></uni-fab>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		selectlostandfound,
		selectfindingnotices
	} from '../../api/index.js'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	const items = reactive(['失物招领', '寻物启事'])
	const current = ref(0)
	const horizontal = ref('right')
	const pattern = reactive({
		icon: 'paperplane'
	})
	const lostmessage = reactive([]) //失物招领数据
	const findingnotice = reactive([]) //寻物启事数据
	function onClickItem(e) {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
		}
	}
	// 失物招领跳转到详情页面
	function todetaillost(item) {
		uni.navigateTo({
			url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}`
		})
	}
	//寻物启事跳转到
	function todetailfound(item) {
		uni.navigateTo({
			url: `/pages/detail/detail?lostmessage=${JSON.stringify(item)}`
		})
	}
	//跳转到发布页面
	function tolost() {
		uni.navigateTo({
			url: '/pages/lost/lost'
		})
	}
	//查询失物招领
	function select() {
		selectlostandfound().then((res) => {
				lostmessage.length = 0
				const result = res.data.users
				result.forEach(function(item, index, result) {
					lostmessage.push(item)
				})
				console.log('失物招领', res.data)
			})
			.catch((err) => {
				console.log('查询失败', err)
			})
	}
	//查询寻物启事
	function selectfinding() {
		selectfindingnotices().then((res) => {
				findingnotice.length = 0
				if (res.data.status == 1) {
					const result = res.data.users
					result.forEach(function(item, index, reult) {
						findingnotice.push(item)
					})
					console.log('寻物启事', result)
				}
			})
			.catch((err) => {
				console.log('寻物启事查询失败', err)
			})
	}

	onShow(() => {
		select()
		selectfinding()
	})
</script>

<style lang="scss">
	.content {

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

	
	}
</style>