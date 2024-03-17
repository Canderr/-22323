<template>
	<view>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#6388f8"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<uni-card v-for="(item,index) in pendingrepairorders" :key="item.orderid">
						<view class="toberepaired">
							<view class="repairedorders">
								<view class="repairedorders-one"><text>订单号:{{item.orderid}}</text></view>
								<view class="repairedorders-one"><text>{{stateone(item)?'待完成':'维修中'}}</text></view>
							</view>
							<view class="repaireddetail">
								<view class="repairedequipment"><text>{{item.devicename}}</text></view>
								<view class="repairedmessage">
									<text class="iconfont">&#xe612;</text>:<text>{{item.phone}}</text>
								</view>
								<view class="repairedmessage">
									<text class="iconfont">&#xe609;</text>:<text>{{item.address}}</text>
								</view>
								<view class="repairedmessage">
									<text class="iconfont">&#xe600;</text>:<text>{{item.date}}</text>
								</view>
							</view>
						</view>
					</uni-card>

				</view>
				<view v-show="current === 1">
					<uni-card  v-for="(item,index) in completed" :key="item.orderid">
						<view class="toberepaired">
							<view class="repairedorders">
								<view class="repairedorders-one"><text>订单号:{{item.orderid}}</text></view>
								<view class="repairedorders-one"><text>{{item.state==2?'已完成':''}}</text></view>
							</view>
							<view class="repaireddetail">
								<view class="repairedequipment"><text>{{item.devicename}}</text></view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe612;</text>:<text>{{item.phone}}</text></view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe609;</text>:<text>{{item.address}}</text></view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe600;</text>:<text>{{item.date}}</text></view>
							</view>
						</view>
					</uni-card>
				</view>
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
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		onReachBottom,
		onShow,
	} from '@dcloudio/uni-app';
	import {
		selectpendingrepairorders,
		selectpendingrepairorderscompleted
	} from '../../api/index.js'
	const items = reactive(['待维修', '已完成'])
	const current = ref(0)
	const horizontal = ref('right')
	const pendingrepairorders = reactive([])
	const completed = reactive([])
	const pattern = reactive({
		icon: 'gear-filled'
	})
	//待维修订单状态
	const stateone = computed(() => (item) => {
		if (item.state == 0) {
			return true
		}
		if (item.state == 1) {
			return false
		}
	})
	onShow(() => {
		//查询学生待维修订单
		selectpendingrepairorders().then((res) => {
				pendingrepairorders.length = 0
				if (res.data.status == 1) {
					const result = res.data.users
					// result.foreach(
					result.forEach(function(item, index, res) {
						pendingrepairorders.push(item)
					})
					console.log('查询待维修订单成功', pendingrepairorders)
				}

			})
			.catch((err) => {
				console.log('查询待维修订单失败', err)
			})

		//查询学生已完成维修订单
		selectpendingrepairorderscompleted().then((res) => {
				completed.length = 0
				if (res.data.status == 1) {
					const result = res.data.users
					// result.foreach(
					result.forEach(function(item, index, res) {
						completed.push(item)
					})
					console.log('查询待维修订单成功', completed)
				}

			})
			.catch((err) => {
				console.log('查询待维修订单失败', err)
			})

	})

	function onClickItem(e) {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
		}
	}

	function tolost() {
		uni.navigateTo({
			url: '/pages/submitrepair/submitrepair'
		})
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: 'iconfont';
		/* Project id 4265986 */
		src: url('//at.alicdn.com/t/c/font_4265986_7e0jxarqqru.woff2?t=1696127619288') format('woff2'),
			url('//at.alicdn.com/t/c/font_4265986_7e0jxarqqru.woff?t=1696127619288') format('woff'),
			url('//at.alicdn.com/t/c/font_4265986_7e0jxarqqru.ttf?t=1696127619288') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 40rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.content {
		padding: 30rpx;

		.toberepaired {
			// border: 1px solid red;
			// box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

			.repairedorders {
				display: flex;
				justify-content: space-between;
				border-bottom: 4rpx solid rgb(217, 217, 217);

				.repairedorders-one {
					height: 70rpx;
					line-height: 70rpx;
				}
			}

			.repaireddetail {
				.repairedequipment {
					margin-top: 20rpx;
				}

				.repairedmessage {
					line-height: 20px;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>