<template>
	<view class="user">

		<view class="top">
			<view class="group" @click="toUserInfo">
				<view class="userinfo">
					<view class="pic">
						<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url" :src="avatar_url"
							mode="aspectFill"></image>
						<image v-else src="../../static/images/user-default.jpg" mode="aspectFill"></image>
					</view>
					<view class="text" v-if="hasLogin">
						<view class="nickname">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</view>
					</view>
					<view class="text" v-else>
						<view class="nickname">点击登录</view>
					</view>

				</view>
				<view class="more">
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="bg">
				<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"
					mode="aspectFill"></image>
				<image v-else src="../../static/images/user-default.jpg" mode="aspectFill"></image>
			</view>
		</view>

		<view class="main">
			<view class="list">
			<!-- 	<view class="group">
					<view class="item" @click="mySpace">
						<view class="left"><text class="iconfont icon-a-24-bianji"></text><text class="text">空间管理</text>
						</view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
					<view class="item" @click="myLike">
						<view class="left"><text class="iconfont icon-a-106-xihuan"></text><text
								class="text">我的点赞</text></view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
					<view class="item">
						<view class="left"><text class="iconfont icon-a-21-xiugai"></text><text class="text">评论过的</text>
						</view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
				</view> -->

			<!-- 	<view class="group">
					<view class="item">
						<view class="left"><text class="iconfont icon-a-32-wenjian"></text><text class="text">关于</text>
						</view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
					<view class="item" @click="goFeedback">
						<view class="left"><text class="iconfont icon-a-5-xinxi"></text><text class="text">意见反馈</text>
						</view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
				</view> -->

				<view class="group">
					<view class="item" @click="logout">
						<view class="left"><text class="iconfont icon-poweroff"></text><text class="text">退出登录</text>
						</view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	export default {
		data() {
			return {
				avatar_url: '',
				totalObj: {
					artNum: 0,
					likeNum: 0
				}
			};
		},
		onLoad() {

		},
		computed: {
			userInfo() {
				console.log('store.userInfo', store.userInfo)
				if (store.userInfo.avatar_file?.url) {
					uniCloud.getTempFileURL({
						fileList: [store.userInfo.avatar_file.url]
					}).then(res => {
						console.log(res)
						this.avatar_url = res.fileList[0].tempFileURL
					})
				}
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}
		},
		methods: {
			//意见反馈
			goFeedback() {
				if (this.goLoginPage()) return;
				uni.navigateTo({
					url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
				})
			},
			//跳转到点赞
			myLike() {
				if (this.goLoginPage()) return;
				uni.navigateTo({
					url: "/pages/quanzi_like/list"
				})
			},


			//跳转到我的长文
			mySpace() {
				if (this.goLoginPage()) return;
				uni.navigateTo({
					url: "/pages/quanzi_article/list"
				})
			},


			//编辑个人资料
			toUserInfo() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
					})
				} else {
					let route = this.$mp.page.route;
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=/' + route
					})
				}
			},


			//退出登录
			logout() {
				if (this.goLoginPage()) return;
				uni.showModal({
					title: "是否确认退出?",
					success: res => {
						console.log(res);
						if (res.confirm) {
							mutations.logout()
						}
					}
				})

			},


			goLoginPage() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return true;
				}
				return false
			}
		}
	}
</script>

<style lang="scss">
	.user {

		.top {
			height: 300rpx;
			background: #bbb;
			padding: 0 30rpx;
			padding-top: var(--status-bar-height);
			position: relative;
			display: flex;
			align-items: center;

			.group {
				position: relative;
				z-index: 10;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				color: #fff;

				.userinfo {
					display: flex;
					width: 100%;
					align-items: center;

					.pic {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;
						border: 2px solid #fff;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.text {
						padding-left: 20rpx;

						.nickname {
							font-size: 44rpx;
							font-weight: 600;
						}

						.year {
							font-size: 26rpx;
							opacity: 0.6;
							padding-top: 5rpx;
						}
					}
				}

				.more {
					.iconfont {
						font-size: 40rpx;
					}
				}

			}

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					filter: blur(20px);
					transform: scale(2);
					opacity: 0.5;
				}
			}
		}

		.main {
			width: 100%;
			min-height: 200rpx;
			background: #fff;
			border-radius: 30rpx;
			transform: translateY(-30rpx);

			.info {
				padding: 10rpx 30rpx;
				display: flex;
				font-size: 30rpx;

				.item {
					padding-right: 20rpx;
					color: #888;

					text {
						font-weight: 600;
						color: #333;
					}
				}
			}

			.list {
				.group {
					padding: 15rpx 30rpx;
					border-bottom: 15rpx solid #f4f4f4;

					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 25rpx 0;
						font-size: 36rpx;
						color: #555;
						border-bottom: 1rpx solid #f8f8f8;

						.left {
							display: flex;
							align-items: center;

							.iconfont {
								font-size: 38rpx;
								margin-right: 10rpx;
							}
						}

						.right {
							.iconfont {
								font-size: 26rpx;
							}
						}
					}

					.item:last-child {
						border: none;
					}
				}

				.group:last-child {
					border: none;
				}
			}
		}

	}
</style>