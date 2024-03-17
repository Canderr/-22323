<template>
	<uni-card @click="onClick">
		<view class="state">
			<text v-if="params.lostmessage.type==0">未认领</text>
			<text v-if="params.lostmessage.type==1">寻找中</text>
			<text v-if="params.lostmessage.type==3">{{type()?'已认领':'已找到'}}</text>
		</view>
		<image style="width: 100%;" :src="params.lostmessage.imgurl"></image>
		<view class="top">
			<view class="title">{{params.lostmessage.imtename}}</view>
			<view class="date">{{params.lostmessage.date}}</view>
		</view>
		<view class="desc">
			地点：{{params.lostmessage.adress}}
		</view>
		<view class="desc">
			联系方式：{{params.lostmessage.phone}}
		</view>
		<view class="deteil">
			<text>{{params.lostmessage.message}}</text>
		</view>

	</uni-card>
	<view class="butten" v-if="params.state==1" @click="open">
		<text v-if="params.lostmessage.type==0">失主已认领</text>
		<text v-if="params.lostmessage.type==1">找到了</text>
	</view>
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog mode="base" :duration="2000" :before-close="true" @close="close" @confirm="confirm"
			:title="params.lostmessage.type==1?'失物是否已找到':'失主是否已认领'"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from "vue";
	import {updateost} from '../../api/index.js'
	const params = reactive({
		lostmessage: {},
		state: ''
	})
	const popup = ref(null)
	onLoad((e) => {
		params.lostmessage = JSON.parse(e.lostmessage)
		params.state = JSON.parse(e.stste)
		console.log(JSON.parse(e.lostmessage))
	})

	function open() {
		popup.value.open('center')
	}

	function close() {
		popup.value.close()
	}
	function confirm(value) {
		console.log(value)
		updateost(params.lostmessage).then((res)=>{
			console.log('修改成功',res)
		})
		popup.value.close()
	}
	//显示已认领或已找到
	function type(){
		if(params.lostmessage.type==3&&params.lostmessage.findingtype==0){
			//已认领
			return true
		}else{
			//已找到
			return false
		}
	}
</script>

<style lang="scss" scoped>
	.butten {
		width: 200rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 30rpx;
		margin: 50rpx auto;
		background-color: rgb(77,116,247);
		color: #fff;
	}

	.state {
		text-align: center;
	}

	.deteil {
		word-wrap: break-word;
	}

	.top {
		margin-top: 10rpx;
		height: 80rpx;
		display: flex;
		position: relative;
		align-items: baseline;

		.title {
			font-size: 38rpx;
			font-weight: 600;
			margin-right: 20rpx;
		}

		.date {
			font-size: 24rpx;
			color: #bbb;
		}

		.desc {
			font-size: 28rpx;
			/* text-indent: 56rpx; */
		}
	}
</style>