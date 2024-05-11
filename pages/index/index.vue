<template>
	<view class="home">
		<view class="loadingState" v-show="loadState">
			<u-skeleton rows="4" title loading></u-skeleton>
		</view>
		<uni-search-bar @confirm="search" placeholder="搜索资源" v-model="searchValue" @clear="clear" cancelButton="none">
		</uni-search-bar>
		<view class="content">
			<view class="item" v-for="item in dataList">
				<blog-item @delEvent="() => getData(true)" @editEvent="showDrawer" :item="item"
					:isLike.sync="item.isLike" :like_count.sync="item.like_count"></blog-item>
			</view>
		</view>
		<view>
			<uni-load-more :status="uniLoad"></uni-load-more>
		</view>

		<uni-drawer ref="showRight" mode="right" :width="370" :mask-click="false">
			<view class="add-drawer">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item label="标题" name="title">
						<uni-easyinput type="text" v-model="formData.title" placeholder="请输入" />
					</uni-forms-item>
					<uni-forms-item label="链接" name="link">
						<uni-easyinput type="textarea" v-model="formData.link" placeholder="请输入" />
					</uni-forms-item>
				</uni-forms>
				<button @click="submit" type="primary" style="margin-bottom: 20rpx">提交</button>
				<button @click="closeDrawer">取消</button>
			</view>
		</uni-drawer>

		<view class="add" @click="() => showDrawer()">
			<text class="iconfont icon-plus"></text>
		</view>

		<view class="to-top" v-show="showToTop" @click="backToTop">
			<text class="iconfont icon-totop"></text>
		</view>

	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database();
	const dbCmd = db.command;
	const pagesize = 10;
	export default {
		data() {
			return {
				showToTop: false,
				searchValue: '',
				page: 1,
				// 表单数据
				formData: {
					title: '',
					link: ''
				},
				rules: {
					// 对title字段进行必填验证
					title: {
						rules: [{
								required: true,
								errorMessage: '请输入',
							},
							{
								minLength: 1,
								maxLength: 50,
								errorMessage: '长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对link字段进行必填验证
					link: {
						rules: [{
							required: true,
							errorMessage: '请输入',
						}, ]
					}
				},
				uniLoad: "more",
				dataList: [],
				navAction: 0,
				loadState: true,
				title: '标题',
				content: 'uView的目标是成为uni-app生态最优秀的UI框架',

			}
		},
		onLoad() {
			if (store.hasLogin) {
				this.getData();
			}
		},
		//触底加载更多
		onReachBottom() {
			console.log('onReachBottom: this.uniLoad ', this.uniLoad)
			if (this.uniLoad == 'noMore') return
			this.getData();
		},
		computed: {
			hasLogin() {
				return store.hasLogin
			}
		},
		watch: {
			hasLogin: {
				handler: function(newVal, oldVal) {
					if (newVal) {
						this.getData()
					}
				}
			}
		},
		methods: {
			search(res) {
				this.getData(true, res.value)
			},
			clear(res) {
				this.getData(true)
			},
			// 监听页面滚动事件
			onPageScroll(e) {
				// 当滚动位置超过200时显示“返回顶部”按钮
				this.showToTop = e.scrollTop > 0;
			},
			backToTop() {
				// 点击“返回顶部”按钮
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100, // 滚动动画时长
				});
			},
			// 触发提交表单
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res, this.formData._id);
					uni.showLoading();
					if (this.formData._id) {
						db.collection("resource").doc(this.formData._id).update(res).then(res => {
							uni.showToast({
								title: "修改成功",
								icon: "none"
							})
							this.getData(true);
							this.closeDrawer()
						}).finally(err => {
							uni.hideLoading()
						})
					} else {
						db.collection("resource").add(res).then(res => {
							uni.showToast({
								title: "添加成功"
							})
							this.getData(true);
							this.closeDrawer()
						}).finally(err => {
							uni.hideLoading()
						})
					}
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			//获取网络列表
			async getData(retain, title = '') {
				let lim = this.page * pagesize
				if (!retain) {
					this.page = this.page + 1
				}
				this.uniLoad = 'loading'
				let artTemp = db.collection("resource").where(`delState != true`).field(
					"title,user_id,link,last_modify_date,delState").getTemp();
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
				// 根据标题模糊查询
				db.collection(artTemp, userTemp).where({
						title: new RegExp(title)
					}).orderBy("last_modify_date", "desc").limit(lim)
					.get()
					.then(
						async res => {
							console.log('getdata', res)
							const data = res.result.data
							if (data.length < lim) {
								this.uniLoad = "noMore";
							} else {
								this.uniLoad = "more";
							}
							this.dataList = data
							this.loadState = false
						})

			},
			showDrawer(item = {
				title: '',
				link: ''
			}) {
				this.formData = item
				console.log(this.formData)
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			}

		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}

		.loadingState {
			padding: 30rpx;
		}

		.content {
			.item {
				padding: 30rpx;
				border-bottom: #F7F7F7 15rpx solid
			}
		}

		.add {
			width: 80rpx;
			height: 80rpx;
			// background: #0199FE;
			border-radius: 50%;

			position: fixed;
			z-index: 100;
			bottom: 120rpx;
			right: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.3);

			.iconfont {
				font-size: 50rpx;
			}
		}

		.to-top {
			width: 80rpx;
			height: 80rpx;
			// background: #0199FE;
			border-radius: 50%;

			position: fixed;
			z-index: 100;
			bottom: 220rpx;
			right: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.3);

			.iconfont {
				font-size: 50rpx;
			}
		}

		.add-drawer {
			padding: 20rpx;
			padding-top: 180rpx;
		}
	}
</style>