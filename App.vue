<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			uni.onAppRoute((route) => {
				// 判断页面是否需要登录才能访问
				if ((route.path === 'pages/home/home' || route.path == 'pages/personal/personal') && !this
					.checkLogin()) {
					// 跳转到登录页
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				console.log(route)
			})

			console.log(this.checkLogin())
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 检查用户的登录状态
			checkLogin() {
				const token = uni.getStorageSync('token') || ''
				if (token) {
					// 检查 token 是否过期等
					return true
				} else {
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/static/iconfont-weapp-icon.css'
</style>