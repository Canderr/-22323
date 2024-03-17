<template>

	<view class="bigbox">
		<view class="box">
			<uni-card>
				<view class="form">
					<uni-forms border>
						<uni-forms-item label="">
							<text>物品名称:</text>
							<uni-easyinput :inputBorder="false" placeholder="请输入物品名称"
								v-model="params.imtename"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="">
							<text>地点名称:</text>
							<uni-easyinput :inputBorder="false" placeholder="请输入地点名称"
								v-model="params.adress"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="">
							<text>联系电话:</text>
							<uni-easyinput :inputBorder="false" placeholder="请输入联系电话"
								v-model="params.phone"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="">
							<text>类型:</text>
							<uni-data-checkbox v-model="params.type" :localdata="types" />
						</uni-forms-item>
						<uni-forms-item label="">
							<text>时间:</text>
							<view class="uni-list">
								<view class="uni-list-cell">
									<view class="uni-list-cell-db">
										<picker mode="date" :value="params.date" :start="startDate" :end="endDate"
											@change="bindDateChange">
											<view class="uni-input">{{params.date}}</view>
										</picker>
									</view>
								</view>
							</view>
						</uni-forms-item>

						<uni-forms-item label="">
							<text>物品描述:</text>
							<textarea placeholder="请描述详细信息" v-model="params.message"></textarea>
						</uni-forms-item>

					</uni-forms>
				</view>

				<view class="file">
					<uni-file-picker limit="1" v-model="imageValue" fileMediatype="image" mode="grid" @select="select"
						@progress="progress" @success="success" @fail="fail"></uni-file-picker>
				</view>
				<view class="butten" @click="publish">发布</view>
			</uni-card>

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		toRaw,
		computed
	} from 'vue'
	import {
		getqiniutoken,
		insertfindingnotices
	} from '../../api/index.js'
	const imageValue = reactive([])
	const tempFilePaths = reactive([])
	const params = reactive({
		imtename: '', //物品名称
		adress: '', //丢失地点
		phone: '', //联系电话
		date: getDate({
			format: true
		}), //日期
		message: '',
		imgurl: '',
		type: ''
	})
	const types = reactive([{
			text: '失物招领',
			value: 0,
		},
		{
			text: '寻物启事',
			value: 1,
		}
	])
	const startDate = computed(() => {
		return getDate('start')
	})
	const endDate = computed(() => {
		return getDate('end');
	})

	function bindDateChange(e) {
		console.log(e)
		params.date = e.detail.value
		console.log(params)
		// this.date = e.detail.value
	}
	//获取当前时间
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}

	function select(e) {
		tempFilePaths.push(e.tempFilePaths)
		console.log('选择文件：', e, toRaw(tempFilePaths)[0][0])
	}

	// 获取上传进度
	function progress(e) {
		console.log('上传进度：', e)

	}

	// 上传成功
	function success(e) {
		console.log('上传成功', e)
	}

	// 上传失败
	function fail(e) {
		console.log('上传失败：', e)
	}
	// 发布上传照片到七牛云
	function publish() {
		const filename_qn = 'lxyy' + new Date().getTime() + ('000000' + Math.floor(Math.random() * 999999)).slice(-6) +
			'.png';
		getqiniutoken()
			.then((res) => {
				const qiniutoken = res.data.uploadToken
				uni.uploadFile({
					url: 'https://up-z2.qiniup.com',
					filePath: toRaw(tempFilePaths)[0][0],
					name: 'file',
					header: {
						'content-type': 'multipart/form-data'
					},
					formData: {
						'key': filename_qn,
						'token': qiniutoken
					},
					success: function(uploadfileres) {
						if (uploadfileres.statusCode == 200) {
							const filemessage = JSON.parse(uploadfileres.data)
							params.imgurl = 'http://s61mdikby.hn-bkt.clouddn.com/' + filemessage.key
							insertfindingnotices(params)
								.then((res) => {
									console.log('新增成功', res)
								})
								.catch((err) => {
									console.log('新增失败')
								})
							console.log('上传信息')
							uni.showToast({
								title: '发布成功'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/lostandfound/lostandfound'
								})
							}, 2000)
						} else {
							uni.showToast({
								title: '失败了'
							})
						}
						console.log(uploadfileres)
					},
					fail: function(err) {
						console.log(err)
					}
				})
			})
			.catch((err) => {
				console.log('上传失败', err)
			})
	}
</script>

<style lang="scss" scoped>
	.view {
		// background-color: rgb(241,240,242);
	}

	.bigbox {
		// padding: 30rpx;

		.box {
			// padding: 30rpx;
			// width: 100%;
			border-radius: 20rpx;

			textarea {
				width: 100%;
				height: 300rpx;
				border-bottom: 4rpx solid rgb(236, 236, 236);
			}

			.file {
				margin-top: 20rpx;
			}

			.butten {
				width: 80%;
				text-align: center;
				line-height: 80rpx;
				border-radius: 30rpx;
				margin: 20rpx auto;
				color: #fff;
				background-color: rgb(77, 116, 247);
			}
		}
	}
</style>