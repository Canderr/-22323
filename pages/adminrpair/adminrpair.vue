<template>
	<view>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#6388f8"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<uni-card v-for="(item,index) in pendingrepairorders" :key="item.repairordersdmessage.orderid">
						<view class="toberepaired">
							<view class="repairedorders">
								<view class="repairedorders-one"><text>订单号:{{item.repairordersdmessage.orderid}}</text>
								</view>
								<view class="repairedorders-one">
									<text>{{stateone(item.repairordersdmessage)?'待完成':'维修中'}}</text>
								</view>
							</view>
							<view class="repaireddetail">
								<view class="repairedequipment"><text>{{item.repairordersdmessage.devicename}}</text>
								</view>
								<view class="repairedmessage">
									<text
										class="iconfont">&#xe612;</text>:<text>{{item.repairordersdmessage.phone}}</text>
								</view>
								<view class="repairedmessage">
									<text
										class="iconfont">&#xe609;</text>:<text>{{item.repairordersdmessage.address}}</text>
								</view>
								<view class="repairedmessage">
									<text
										class="iconfont">&#xe600;</text>:<text>{{item.repairordersdmessage.date}}</text>
								</view>
							</view>
							<view class="orderstatus">
								<view class="right" @click="underrepair(item.repairordersdmessage)">设备正在维修</view>
								<view class="left" @click="repaired(item.repairordersdmessage)">设备已维修</view>
							</view>
						</view>
					</uni-card>
				</view>
				<view v-show="current === 1">
					<uni-card v-for="(item,index) in completed" :key="item.repairordersdmessage.orderid">
						<view class="toberepaired">
							<view class="repairedorders">
								<view class="repairedorders-one"><text>订单号:{{item.repairordersdmessage.orderid}}</text>
								</view>
								<view class="repairedorders-one">
									<text>{{item.repairordersdmessage.state==2?'已维修':''}}</text>
								</view>
							</view>
							<view class="repaireddetail">
								<view class="repairedequipment"><text>{{item.repairordersdmessage.devicename}}</text>
								</view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe612;</text>:<text>{{item.repairordersdmessage.phone}}</text>
								</view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe609;</text>:<text>{{item.repairordersdmessage.address}}</text>
								</view>
								<view class="repairedmessage"><text
										class="iconfont">&#xe600;</text>:<text>{{item.repairordersdmessage.date}}</text>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
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
		selectrepairstudent,
		selectrepairstudentalready,
		updaterepairprogress,
		updaterepaireeed
	} from '../../api/admin.js'
	const items = reactive(['待维修', '已维修'])
	const current = ref(0)
	const horizontal = ref('right')
	const pendingrepairorders = reactive([])
	const completed = reactive([])
	const message = ref(null)
	const msgType = ref('')
	const messageText = ref('')
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

	function selectrepairstudentsss() {
		//查询所有学生待维修订单及其用户信息
		selectrepairstudent().then((res) => {
				pendingrepairorders.length = 0
				if (res.data.status == 1) {
					const result = res.data.restul
					// result.foreach(
					result.forEach(function(item, index, res) {
						pendingrepairorders.push(item)
					})
					console.log('查询所有学生待维修订单及其用户信息成功', pendingrepairorders)
				}

			})
			.catch((err) => {
				console.log('查询待维修订单失败', err)
			})
	}

	function selectrepairstudentalreadyyyy() {
		//查询所有学生已维修订单及其用户信息
		selectrepairstudentalready().then((res) => {
				completed.length = 0
				if (res.data.status == 1) {
					const result = res.data.restul
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
	}
	onShow(() => {
		selectrepairstudentsss()
		selectrepairstudentalreadyyyy()
	})

	function onClickItem(e) {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
		}
	}
	//修改设备状态为已维修
	function repaired(item) {
		uni.showModal({
			title: '提示',
			content: '设备是否正已维修？',
			success: function(e) {
				if (e.confirm == true) {
					updaterepaireeed(item).then((res) => {
						console.log('设备已维修', res)
						if (res.data.status == 1) {
							msgType.value = 'success'
							messageText.value = res.data.message
							message.value.open()
							selectrepairstudentsss()
							selectrepairstudentalreadyyyy()
						} else {
							msgType.value = 'error'
							messageText.value = res.data.message
							message.value.open()
						}
					}).catch((err) => {
						console.log('请求失败', err)
					})
					console.log(e)
				}
			}
		})
	}
	//修改设备状态为正在维修
	function underrepair(item) {
		uni.showModal({
			title: '提示',
			content: '设备是否正在维修？',
			success: function(e) {
				if (e.confirm == true) {
					updaterepairprogress(item).then((res) => {
						if (res.data.status == 1) {

							msgType.value = 'success'
							messageText.value = res.data.message
							message.value.open()
							selectrepairstudentsss()
						} else {
							msgType.value = 'error'
							messageText.value = res.data.message
							message.value.open()
						}
					}).catch((err) => {
						console.log('请求失败', err)
					})
					console.log(e)
				}
			}
		})

	}
	//跳转到订单详情页面
	// function topairdetail(item){
	// 	uni.navigateTo({
	// 		url:`/pages/adminrpairdetail/adminrpairdetail?message=${JSON.stringify(item)}`
	// 		// url:`/pages/adminrpairdetail/adminrpairdetail?message=${JSON.stringify(item)}`
	// 	})
	// }
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

			.orderstatus {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.right {
					width: 190rpx;
					border-radius: 20rpx;
					line-height: 65rpx;
					background-color: rgb(209, 154, 102);
				}

				.left {
					width: 160rpx;
					border-radius: 20rpx;
					line-height: 65rpx;
					background-color: rgb(91, 173, 36);
				}
			}
		}
	}
</style>