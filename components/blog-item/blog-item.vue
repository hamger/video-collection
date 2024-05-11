<template>
	<view class="blogitem">
		<view class="head">
			<view class="userinfo">
				<view class="title">
					{{item.title}}
				</view>
				<uni-link v-if="item.link" :href="item.link" :text="item.link"></uni-link>
			</view>
			<view class="more" @click="clickMore">
				<text class="iconfont icon-ellipsis"></text>
			</view>
		</view>
		<u-action-sheet :actions="list" cancelText="取消" :show="sheetShow" 
		:closeOnClickOverlay="true" :closeOnClickAction="true" 
		@select="sheetSelect"
		@close="onClose"
		></u-action-sheet>
	</view>
</template>

<script>
	import pageJson from "@/pages.json"
	import {giveName,giveAvatar,likeFun} from "../../utils/tools.js"	
	import {
		store		
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db=uniCloud.database()
	export default {
		name:"blog-item",
		props:{
			item:{
				type:Object,
				default(){
					return {
						
					}
				}
			},
			isLike:Boolean,
			like_count:Number
		},
		data() {
			return {
				sheetShow:false,
				list:[
					{
						name:"修改",
						type:"edit",
						disabled:true
					},
					{
						name:"删除",
						type:"del",
						color:"#F56C6C",
						disabled:true
					}
				]
			};
		},
		methods:{
			giveName,
			giveAvatar,
			//点击更多操作
			clickMore(){
				let uid = uniCloud.getCurrentUserInfo().uid
				console.log(this.item.user_id[0]._id, this.uniIDHasRole('admin'), this.uniIDHasRole('webmaster'))
				if(uid == this.item.user_id[0]._id || this.uniIDHasRole('admin') || this.uniIDHasRole('webmaster')){
					this.list.forEach(item=>{
						item.disabled=false
					})
				}
				this.sheetShow=true;
			},
			
			//点击选择
			sheetSelect(e){				
				this.sheetShow=false
				let type=e.type;
				console.log(type);
				if(type=="del"){
					this.delFun()
				} else if (type=="edit") {
					this.$emit("editEvent", this.item)
				}
			},
			
			delFun(){
				console.log('2q3r')
				this.$emit("delEvent")
				uni.showLoading({
					title:"加载中..."
				})
				db.collection("resource").doc(this.item._id).update({
					delState:true
				}).then(res=>{					
					uni.hideLoading();
					uni.showToast({
						title:"删除成功",
						icon:"none"
					})
					this.$emit("delEvent")
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			//取消弹窗
			onClose(){
				this.sheetShow=false
			},
			//点击跳转到详情
			goDetail(){
				uni.navigateTo({
					url:"/pages/detail/detail?id="+this.item._id
				})
			},
		}
	}
</script>

<style lang="scss">
.blogitem{
	.head{
		position: relative;
		font-size: 32rpx;
		.userinfo{
			.title {
			}
			.link {
				font-size: 30rpx;
				word-wrap: break-word;
			}
		}
		.more{
			position: absolute;
			right: -11rpx;
			top: -11rpx;		
			.iconfont{ 
				font-size: 50rpx;
				color:#888;
			}
		}
	}	
}
</style>