<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex:1">
	<!-- #endif -->
	<view class="page">
		<uni-card-x>
			<text>图标组件方便用户在设计页面的时候，减少小图片的使用。可方便自定义图标单色、尺寸。</text>
		</uni-card-x>
		<uni-section-x title="图标" type="line">
			<template v-slot:right>
				<view>
					<switch :checked="checked" @change="change" />
				</view>
			</template>
			<view class="icon-content">
				<view v-for="(item,index) in iconClassList" :key="index" class="icon-item" @click="switchActive(index,item)">
					<uni-icons-x :type="item.font_class" :color="activeIndex === index?'#007aff':'#5e6d82'" :size="30" />
					<text :style="{color:activeIndex === index?'#007aff':'#5e6d82'}"
					>{{ checked? item.unicode: item.font_class }}</text>
				</view>
			</view>
		</uni-section-x>
		
		<!-- <uni-section-x title="自定义图标" subTitle="引入参考App.vue" type="line">
			<view class="icon-content">
				<view class="icon-item" >
					<uni-icons-x customPrefix="customicons" type="youxi" color="#5e6d82" :size="22" />
					<text style="color:#5e6d82;">youxi</text>
				</view>
				<view class="icon-item" >
					<uni-icons-x customPrefix="customicons" type="wenjian" color="#5e6d82" :size="22" />
					<text style="color:#5e6d82;">wenjian</text>
				</view>
				<view class="icon-item" >
					<uni-icons-x customPrefix="customicons" type="zhuanfa" color="#5e6d82" :size="22" />
					<text style="color:#5e6d82;">zhuanfa</text>
				</view>
			</view>
		</uni-section-x> -->
	</view>
	
		
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>


<script lang="uts">
	import {iconlist,IconList} from'./icons.uts'
	export default {
		components: {},
		data() {
			return {
				iconClassList: iconlist as IconList[],
				activeIndex: -1,
				checked: false
			}
		},
		methods: {
			change(e:UniSwitchChangeEvent) {
				this.checked = e.detail.value
			},
			switchActive(index:number,item:IconList) {
				this.activeIndex = index
				// TODO 不支持
				// uni.setClipboardData({
				//     data: !this.checked ? item.name:item.unicode,
				//     success:  ()=> {
				//         uni.showToast({
				//         	icon:'none',
				// 					title:`${!this.checked ?'图标名称':'unicode'}复制成功`
				//         })
				//     }
				// });
			}
		}
	}
</script>

<style lang="scss">

	.icon-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;

		.icon-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			width: calc(100% / 4);
			/* #endif */
			/* #ifdef APP-NVUE */
			width: 187rpx;
			/* #endif */
			align-items: center;
			padding: 10px;
			// text-align: center;
			flex-direction: column;
		}
	}
</style>

