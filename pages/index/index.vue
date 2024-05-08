<template>
	<view class="home">
		<view class="loadingState" v-show="loadState">
			<u-skeleton rows="4" title loading></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="item in dataList">
				<blog-item @delEvent="P_delEvent" @editEvent="showDrawer" :item="item" :isLike.sync="item.isLike"
					:like_count.sync="item.like_count"></blog-item>
			</view>
		</view>
		<button @click="getData">加载更多</button>
		<view>
			<uni-load-more :status="uniLoad"></uni-load-more>
		</view>

		<uni-drawer ref="showRight" mode="right" :width="400" :mask-click="false">
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
			<text class="iconfont icon-a-21-xiugai"></text>
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
	const pagesize = 5;
	export default {
		data() {
			return {
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
				noMore: false,
				dataList: [],
				navAction: 0,
				loadState: true,
				title: '标题',
				content: 'uView的目标是成为uni-app生态最优秀的UI框架',

			}
		},
		onLoad() {
			this.getData();
		},
		// //触底加载更多
		// onReachBottom() {
		// 	this.uniLoad = 'loading'
		// 	if (this.noMore) return this.uniLoad = "noMore";
		// 	this.getData();
		// },
		// computed: {
		// 	userInfo() {
		// 		console.log('store.userInfo', store.userInfo)
		// 		// if (store.userInfo.username) {
		// 		// 	this.getData();
		// 		// }
		// 		return store.userInfo
		// 	},
		// 	hasLogin() {
		// 		if (store.hasLogin) {
		// 			this.getData()
		// 		}
		// 		return store.hasLogin
		// 	}
		// },
		methods: {
			// 触发提交表单
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res, this.formData._id);
					uni.showLoading();
					if (this.formData._id) {
						db.collection("resource").doc(this.formData._id).update(res).then(res=>{					
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})	
							this.getData(true);
							this.closeDrawer()
						}).finally(err=>{
							uni.hideLoading()
						})
					} else {
						db.collection("resource").add(res).then(res => {
							uni.showToast({
								title: "添加成功"
							})
							this.getData(true);
							this.closeDrawer()
						}).finally(err=>{
							uni.hideLoading()
						})
					}
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			P_delEvent() {
				this.getData(true);
			},
			//获取网络列表
			async getData(retain) {
				let lim = this.page * pagesize
				if (!retain) {
					this.page = this.page + 1
				}
				if (store.hasLogin) {
					let artTemp = db.collection("resource").where(`delState != true`).field(
						"title,user_id,link,last_modify_date,delState").getTemp();
					let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
					db.collection(artTemp, userTemp).orderBy("last_modify_date", "desc").limit(lim)
						.get()
						.then(
							async res => {
								console.log(res)
								const data = res.result.data
								if (data.length < this.page * pagesize) {
									this.noMore = true
									if (this.noMore) this.uniLoad = "noMore";
								}
								this.dataList = data
								this.loadState = false
							})
				}
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
			width: 120rpx;
			height: 120rpx;
			background: #0199FE;
			border-radius: 50%;
			color: #fff;
			position: fixed;
			z-index: 100;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(1, 153, 254, 0.8);

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