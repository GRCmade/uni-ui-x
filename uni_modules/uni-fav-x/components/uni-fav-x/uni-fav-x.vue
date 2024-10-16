<template>
	<view :class="{'uni-fav--circle' : circle}"
		:style="[{ backgroundColor: checked ? bgColorChecked : bgColor }]" @click="onClick" class="uni-fav">
		<uni-icons-x :color="fgColor" :style="{color: checked ? fgColorChecked : fgColor}" class="uni-fav-star" size="14"
			type="star-filled" v-if="!checked && (star === true)" />
		<text :style="{color: checked ? fgColorChecked : fgColor}"
			class="uni-fav-text">{{ checked ? contentFav : contentDefault }}</text>
	</view>
</template>

<script lang="uts">
	import { UniFavXContentText, defaultUniFavX } from '@/uni_modules/uni-types-x/uni-types-x.uts';
	/**
	 * Fav 收藏按钮
	 * @description 用于收藏功能，可点击切换选中、不选中的状态
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=864
	 * @property {Boolean} star = [true|false] 按钮是否带星星
	 * @property {String} bgColor 未收藏时的背景色
	 * @property {String} bgColorChecked 已收藏时的背景色
	 * @property {String} fgColor 未收藏时的文字颜色
	 * @property {String} fgColorChecked 已收藏时的文字颜色
	 * @property {Boolean} circle = [true|false] 是否为圆角
	 * @property {Boolean} checked = [true|false] 是否为已收藏
	 * @property {Object} contentText = [true|false] 收藏按钮文字
	 * @property {Boolean} stat 是否开启统计功能
	 * @event {Function} click 点击 fav按钮触发事件
	 * @example <uni-fav :checked="true"/>
	 */

	// import {
	// 	initVueI18n
	// } from '@dcloudio/uni-i18n'
	// import messages from './i18n/index.js'
	// const {	t	} = initVueI18n(messages)
	// TODO 支持国际化
	function t(str : string) : string {
		type messageType = {
			collect : string
			collected : string
		}
		const message : messageType = {
			"collect": "收藏",
			"collected": "已收藏"
		}
		return message[str] as string
	}

	export default {
		name: "UniFav",
		// TODO 兼容 vue3，需要注册事件
		emits: ['click'],
		props: {
			star: {
				type: Boolean,
				default: defaultUniFavX["star"]
			},
			bgColor: {
				type: String,
				default: defaultUniFavX["bgColor"]
			},
			fgColor: {
				type: String,
				default: defaultUniFavX["fgColor"]
			},
			bgColorChecked: {
				type: String,
				default: defaultUniFavX["bgColorChecked"]
			},
			fgColorChecked: {
				type: String,
				default: defaultUniFavX["fgColorChecked"]
			},
			circle: {
				type: Boolean,
				default: defaultUniFavX["circle"]
			},
			checked: {
				type: Boolean,
				default: defaultUniFavX["checked"]
			},
			contentText: {
				type: Object as PropType<UniFavXContentText>,
				default: defaultUniFavX["contentText"]
			}
		},
		computed: {
			contentDefault() : string {
				return this.contentText.contentDefault
			},
			contentFav() : string {
				return this.contentText.contentFav
			},
		},
		watch: {
			// checked() {
			// 	if (uni.report && this.stat) {
			// 		if (this.checked) {
			// 			uni.report("收藏", "收藏");
			// 		} else {
			// 			uni.report("取消收藏", "取消收藏");
			// 		}
			// 	}
			// }
		},
		methods: {
			onClick() {
				this.$emit("click");
			}
		}
	};
</script>

<style lang="scss">
	$fav-height: 25px;

	.uni-fav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: $fav-height;
		// line-height: $fav-height;
		// text-align: center;
		border-radius: 3px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-fav--circle {
		border-radius: 30px !important;
	}

	.uni-fav-star {
		height: $fav-height;
		line-height: 24px;
		margin-right: 3px;
		// align-items: center;
		// justify-content: center;
	}

	.uni-fav-text {
		height: $fav-height;
		line-height: $fav-height;
		// align-items: center;
		// justify-content: center;
		font-size: 12px;
	}
</style>