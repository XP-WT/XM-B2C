<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- logo -->
			<view class="addr">
				<!-- <image src="../../static/img/logo.png" mode="" class="logo"></image> -->
				<text @tap="modalShow=true" style="padding-bottom: 6upx;border-bottom: 1px solid #000000;">总部旗舰店</text>
				<tui-icon name="turningdown"></tui-icon>
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input placeholder="熙美诚品" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
				</view>
			</view>
		</view>
		<view class='trait'>
			<view class='trait-item'>
				<image mode='' src='../../static/img/pp.png' class='pp-img'></image>品牌保障
			</view>
			<view class='trait-item'>
				<image mode='' src='../../static/img/ls.png' class='pp-img'></image>千店连锁
			</view>
			<view class='trait-item'>
				<image mode='' src='../../static/img/js.png' class='pp-img'></image>急速发货
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(row)">
				<view class="img">
					<image :src="row.img"></image>
				</view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<!-- 分隔条 -->
		<view class="line"></view>
		<!-- 特色专区 -->
		<view class="seckill">
			<view class="left">
				<view class="left-icon"></view>
				<text>品牌甄选</text>
			</view>
			<view class="more">
				<text>精选好货</text>
			</view>
		</view>
		<view class="promotion">
			<view class="list">
				<view class="column" v-for="(row, index) in Promotion" @tap="toPromotion(row)" :key="index">
					<view class="top">
						<view class="title">{{ row.title }}</view>
					</view>
					<view class="left">
						<view class="ad"><text style="font-size: 30upx;">10</text>元起</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right">
						<image :src="row.img"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 限时抢购 -->
		<view class="line"></view>
		<view class="seckill">
			<view class="left">
				<view class="left-icon">
				</view>
				<text>限时抢购</text>
				<view class="countdown">
					<view>00</view>
					:
					<view>00</view>
					:
					<view>00</view>
				</view>
			</view>
			<view class="more">
				<text>更多</text>
			</view>
		</view>
		<!-- 商品横向滚动 -->
		<view>
			<scroll-view scroll-x="true" class="scroll-left" @scroll="scroll" scroll-left="0">
				<view class="scroll-item" v-for="(item,index) in seckillList" :key="index">
					<image :src="item.img" mode="" class="img"></image>
					<text class="title">{{item.name}}</text>
					<view class="txt">
						<view class="left">
							<text class="price">{{item.price}}</text>
							<text class="slogan">￥15.00</text>
						</view>
						<image src="../../static/img/tabBar/cart-on.png" mode="" class="cart"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="line"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">
				<image src="/static/img/hua.png"></image>
				猜你喜欢
				<image src="/static/img/hua.png"></image>
			</view>
			<view class="product-list">
				<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
					<image mode="widthFix" :src="product.img"></image>
					<view class="name">{{ product.name }}</view>
					<view class="info">
						<view class="price">{{ product.price }}</view>
						<!-- <view class="slogan">{{ product.slogan }}</view> -->
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
		<modal :show="modalShow" @cancel="modalShow=false" :custom="true">
			<view class="tui-modal-custom">
				<view class="local">
					<view class="icon location"></view>
					<text>杭州华城国际大厦</text>
				</view>
				<view class="stores">
					附近的门店
				</view>
				<radio-group class="uni-list" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
						<view>
							<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
						</view>
						<view>
							<label class="label-2-text" :for="item.name">
								<text>{{item.value}}</text>
							</label>
						</view>
					</label>
				</radio-group>
			</view>
		</modal>
	</view>
</template>

<script>
	var ttt = 0;
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';
	import modal from "@/components/modal/modal"
	import tuiIcon from "@/components/icon/icon"
	import md5 from "@/common/utils/md5.js"
	import {ajax} from '@/common/ajax/ajax.js'
	export default {
		components: {
			modal,
			tuiIcon,
		},
		data() {
			return {
				secret:'',
				timestamp:'',
				store:'',
				showHeader: true,
				afterHeaderOpacity: 1, //不透明度
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				nVueTitle: null,
				city: '北京',
				currentSwiper: 0,
				// 轮播图片
				swiperList: [{
						id: 1,
						src: 'url1',
						img: 'https://dh.xmvogue.com/Public/Uploads/20200225/5e54907ca6a16.jpg'
					},
					// { id: 2, src: 'url2', img: '/static/img/2.jpg' },
					// { id: 3, src: 'url3', img: '/static/img/3.jpg' }
				],
				// 分类菜单
				categoryList: [{
						id: 1,
						name: '家具百货',
						img: '/static/img/category/1.png'
					},
					{
						id: 2,
						name: '彩妆护肤',
						img: '/static/img/category/2.png'
					},
					{
						id: 3,
						name: '饰品系列',
						img: '/static/img/category/3.png'
					},
					{
						id: 4,
						name: '季节产品',
						img: '/static/img/category/4.png'
					},
					{
						id: 5,
						name: '精美包饰',
						img: '/static/img/category/5.png'
					},
					{
						id: 6,
						name: '毛绒玩具',
						img: '/static/img/category/6.png'
					},
					{
						id: 7,
						name: '数码配件',
						img: '/static/img/category/7.png'
					},
					{
						id: 8,
						name: '文体礼品',
						img: '/static/img/category/8.png'
					},
					{
						id: 9,
						name: '文体礼品',
						img: '/static/img/category/10.png'
					},
					{
						id: 10,
						name: '休闲零食',
						img: '/static/img/category/9.png'
					}

				],
				// 限时抢购
				seckillList: [{
						goods_id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/goods/p2.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/goods/p3.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/goods/p4.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/goods/p5.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '/static/img/goods/p6.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '/static/img/goods/p7.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
				],
				Promotion: [{
						title: '商品名称',
						img: '/static/img/s1.jpg',
					},
					{
						title: '商品名称',
						img: '/static/img/s1.jpg',
					},
					{
						title: '商品名称',
						img: '/static/img/s1.jpg',
					},
					{
						title: '商品名称',
						img: '/static/img/s1.jpg',
					},
				],
				//猜你喜欢列表
				productList: [{
						goods_id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/goods/p2.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/goods/p3.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/goods/p4.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/goods/p5.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '/static/img/goods/p6.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '/static/img/goods/p7.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: '/static/img/goods/p8.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 8,
						img: '/static/img/goods/p9.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					},
					{
						goods_id: 9,
						img: '/static/img/goods/p10.jpg',
						name: '商品名称',
						price: '￥5.8',
						slogan: '1235人付款'
					}
				],
				loadingText: '正在加载...',
				amapPlugin: null,
				// 定位弹窗
				modalShow: false,
				radioItems: [{
						name: '1',
						value: '总部旗舰店',
						checked: 'true'
					},
					{
						name: '2',
						value: '城星店'
					}
				],
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({
				title: '触发上拉加载'
			});
			let len = this.productList.length;
			if (len >= 40) {
				this.loadingText = '到底了';
				return false;
			}
			// 演示,随机加入商品,生成环境请替换为ajax请求
			let end_goods_id = this.productList[len - 1].goods_id;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥5.8',
					slogan: '1235人付款'
				};
				this.productList.push(p);
			}
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				key: '26d69af6f08310775c14fafe9ab58e37'
			});
			this.getLocation();
			this.timestamp = (new Date()).getTime();
			this.secret=md5.hex_md5("XM#" + md5.hex_md5(String(this.timestamp)) + "@secret");
			this.getgoods()
		},
		methods: {
			// 获取商品
			getgoods() {
				ajax({
					url:'/Index/getInfo/',
					data:{
						store: this.store,
						secret: this.secret,
						timestamp: this.timestamp,
					},
					method:'POST',
					success:function(res){
						console.log(res);
					},
					error:function(){
					}
				})
				
			},

			// 获取当前位置
			getLocation() {
				const that = this
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data);
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			radioChange(e) {
				console.log(e)
			},
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: '../search/search/search'
				})

			},
			//轮播图跳转
			toSwiper(e) {
				uni.showToast({
					title: e.src,
					icon: 'none'
				});
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.setStorageSync('catName', e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid=' + e.id + '&name=' + e.name
				});
			},
			//推荐商品跳转
			toPromotion(e) {
				uni.showToast({
					title: e.title,
					icon: 'none'
				});
			},
			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: '商品' + e.goods_id,
					icon: 'none'
				});
				uni.navigateTo({
					url: '../goods/goods'
				});
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			}
		}
	};
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.tui-modal-box {
		width: 70% !important;

		.uni-list {
			padding-top: 20upx;

			.uni-list-cell {
				display: flex;
				font-size: 28upx;
				margin-bottom: 10upx;

				.uni-radio-input-checked {
					background-color: red !important;
					border-color: red;
				}
			}
		}

		.local {
			display: flex;
			justify-content: left;
			font-size: 30upx;
			padding-bottom: 8upx;
			margin-left: -40upx;
			margin-top: -20upx;

			.icon {
				font-size: 40upx;
			}
		}

		.stores {
			margin-left: -30upx;
			font-size: 25upx;
		}
	}

	.pullDown-effects {
		position: fixed;
		//top: calc(100upx - 36vw);
		top: 0;
		z-index: 9;
		width: 100%;
		height: 36vw;
		/*  #ifdef  APP-PLUS  */
		padding-top: var(--status-bar-height);

		/*  #endif  */
		image {
			width: 100%;
			height: 36vw;
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;

		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			// width: 160upx;
			height: 50upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.logo {
				width: 100%;
				height: 100%;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			margin-left: 20upx;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150upx;
				height: 5upx;
				border-radius: 3upx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0upx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.trait {
		display: flex;
		height: 60upx;
		width: 92%;
		margin: auto;
		align-items: center;
		margin-top: 5upx;
		.trait-item {
			display: flex;
			font-size: 25upx;
			line-height: 60upx;
			width: 33.3%;
			margin-left: 20upx;
			align-items: center;
			image {
				width: 40upx;
				height: 40upx;
				margin: 10upx;
			}
		}
	}

	.category-list {
		width: 100%;
		margin: auto;
		padding: 0 0 30upx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.category {
			width: 20%;
			margin-top: 20upx;
			display: flex;
			flex-wrap: wrap;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					width: 14vw;
					height: 14vw;
				}
			}

			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}

	.line {
		width: 100%;
		height: 20upx;
		background-color: #f5f5f5;
		margin: auto;
	}

	.seckill {
		width: 92%;
		margin: auto;
		padding: 10upx 0;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		align-items: center;

		.left {
			display: flex;
			justify-content: left;
			align-items: center;

			.left-icon {
				width: 6upx;
				height: 30upx;
				background-color: #f06c7a;
				margin-right: 10upx;
			}

			text {
				font-weight: 550;
				font-family: Yuanti SC;
				letter-spacing: 6upx;
			}

			.countdown {
				margin-left: 20upx;
				display: flex;
				height: 40upx;
				display: flex;
				align-items: center;
				font-size: 20upx;

				view {
					height: 30upx;
					background-color: #f06c7a;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					border-radius: 4upx;
					margin: 0 4upx;
					padding: 0 2upx;
				}
			}
		}

		.more {
			font-size: 20upx;
			opacity: 0.6;
		}
	}

	.scroll-left {
		width: 92%;
		height: 320upx;
		overflow: hidden;
		white-space: nowrap;
		display: flex;
		margin: auto;

		.scroll-item {
			display: inline-block;
			width: 25%;
			height: 320upx;
			margin: 20upx 20upx;
			text-align: left;
			font-size: 25upx;

			.img {
				width: 100%;
				height: 150upx;
				text-align: center;
			}

			.title {
				display: block;
				padding: 12upx 0;
			}

			.txt {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 10upx;

				.left {
					.price {
						display: block;
						color: red;
					}

					.slogan {
						font-size: 20upx;
						text-decoration: line-through;
					}
				}

				.cart {
					width: 40upx;
					height: 40upx;
				}
			}
		}
	}

	.promotion {
		padding-top: 20upx;
		width: 92%;
		margin: 0 4%;

		.text {
			width: 100%;
			height: 60upx;
			font-size: 34upx;
			font-weight: 600;
			margin-top: -10upx;
		}

		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.column:first-child {
				background: linear-gradient(top, #f9dcdd, #f8e6e5);

			}

			.column:nth-child(2) {
				background: linear-gradient(top, #d9fbf6, #f2fdfd);

			}

			.column:nth-child(3) {
				background: linear-gradient(top, #e3effe, #f1f8fe);

			}

			.column:nth-child(4) {
				background: linear-gradient(top, #fde5db, #f9eee9);

			}

			.column {
				margin-bottom: 20upx;
				width: 43%;
				padding: 15upx 3%;
				border-radius: 10upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.top {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 5upx;

					.title {
						font-size: 26upx;
					}

					.countdown {
						margin-left: 20upx;
						display: flex;
						height: 40upx;
						display: flex;
						align-items: center;
						font-size: 20upx;

						view {
							height: 30upx;
							background-color: #f06c7a;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
							border-radius: 4upx;
							margin: 0 4upx;
							padding: 0 2upx;
						}
					}
				}

				.left {
					width: 50%;
					height: 18.86vw;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;

					.ad {
						margin-top: 5upx;
						width: 100%;
						font-size: 22upx;
						color: #acb0b0;
					}

					.into {

						font-size: 20upx;
						color: #caa989;
						margin-bottom: 20upx;
						border: 1px solid #caa989;
						padding: 8upx;
						border-radius: 10upx;
					}
				}

				.right {
					width: 18.86vw;
					height: 18.86vw;

					image {
						width: 18.86vw;
						height: 18.86vw;
					}
				}
			}
		}
	}

	.goods-list {

		// background-color: #f4f4f4;
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #f47825;
			font-size: 30upx;
			margin-top: 10upx;

			image {
				width: 30upx;
				height: 30upx;
			}
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						text-decoration: line-through;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
