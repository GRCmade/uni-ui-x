<template>
	<view class="uni-badge--x">
		<slot />
		<view class="uni-badge--box" :class="classNames" :style="positionStyle">
			<view class="uni-badge" @click="onClick()">
				<text class="uni-badge-text" :class="textStyles">{{displayValue}}</text>
			</view>
		</view>
	</view>
</template>

<script lang="uts">
	import { UniBadgeX, UniBadgeType,UniBadgeXDotStyle,UniBadgeXPositionStyle,defaultUniBadgeX,UniBadgeAbsolute } from '@/uni_modules/uni-types-x/index.uts';

	/**
	 * BadgeX 数字角标
	 * @description 数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示，默认为实心灰色背景
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=21
	 * @property {String} text 角标内容
	 * @property {String} size = [normal|small] 角标内容
	 * @property {String} type = [info|primary|success|warning|error] 颜色类型
	 * 	@value info 灰色
	 * 	@value primary 蓝色
	 * 	@value success 绿色
	 * 	@value warning 黄色
	 * 	@value error 红色
	 * @property {String} inverted = [true|false] 是否无需背景颜色
	 * @property {Number} maxNum 展示封顶的数字值，超过 99 显示 99+
	 * @property {String} absolute = [rightTop|rightBottom|leftBottom|leftTop] 开启绝对定位, 角标将定位到其包裹的标签的四角上
	 * 	@value rightTop 右上
	 * 	@value rightBottom 右下
	 * 	@value leftTop 左上
	 * 	@value leftBottom 左下
	 * @property {Array[number]} offset	距定位角中心点的偏移量，只有存在 absolute 属性时有效，例如：[-10, -10] 表示向外偏移 10px，[10, 10] 表示向 absolute 指定的内偏移 10px
	 * @property {String} isDot = [true|false] 是否显示为一个小点
	 * @event {Function} click 点击 Badge 触发事件
	 * @example <uni-badge text="1"></uni-badge>
	 */
	export default {
		name: 'UniBadge',
		emits: ['click'],
		props: {
			type: {
				type: String as PropType<UniBadgeType>,
				default: defaultUniBadgeX["type"]
			},
			inverted: {
				type: Boolean,
				default: defaultUniBadgeX["inverted"]
			},
			isDot: {
				type: Boolean,
				default: defaultUniBadgeX["isDot"]
			},
			maxNum: {
				type: Number,
				default: defaultUniBadgeX["maxNum"]
			},
			absolute: {
				type: String as PropType<UniBadgeAbsolute>,
				default: defaultUniBadgeX["absolute"]
			},
			offset: {
				type: Array as PropType<number[]>,
				default: defaultUniBadgeX["offset"]
			},
			text: {
				type: Number,
				default: defaultUniBadgeX["text"]
			},
			size: {
				type: String,
				default: defaultUniBadgeX["size"]
			},
			uix: {
				type: Object as PropType<UniBadgeX>,
				default: () : UniBadgeX => ({} as UniBadgeX)
			},
			// TODO 暂时取消custmStyle
			// customStyle: {
			// 	type: Object,
			// 	default() {
			// 		return {}
			// 	}
			// }
		},
		data() {
			return {};
		},
		computed: {
			// _uix() : UniBadgeX {
			// 	let uixResult : UniBadgeX = {}
			// 	let utsDefault : UTSJSONObject = defaultUniBadgeX
			// 	// #ifdef UNI-APP-X
			// 	let keys = UTSJSONObject.keys(utsDefault)
			// 	// #endif
			// 	// #ifndef UNI-APP-X
			// 	let keys = Object.keys(utsDefault)
			// 	// #endif
			// 	keys.forEach((item, index) => {
			// 		let temp : any | null
			// 		if (this.$props[item] != utsDefault[item]) {
			// 			temp = this.$props[item]
			// 		} else {
			// 			if (this.uix[item] != null) {
			// 				temp = this.uix[item]
			// 			} else {
			// 				temp = utsDefault[item]
			// 			}
			// 		}
			// 		uixResult[item] = temp
			// 	})
			// 	return uixResult
			// },
			width() : number {
				// let num:number =  this.text as number
				return 1 * 8 + 12
			},
			textStyles() : string {
				const {
					inverted,
					type
				} = this
				return [
					inverted == true ? 'uni-badge--' + type + '-inverted' : 'uni-badge-text-color',
				].join(' ')
			},
			classNames() : string {
				const {
					size,
					absolute,
					inverted,
					type
				} = this

				return [
					inverted == false ? 'uni-badge--box--' + type : '',
					'uni-badge--' + size,
					absolute != '' ? 'uni-badge--absolute' : ''
				].join(' ')
			},
			positionStyle() : UTSJSONObject {
				if (this.absolute == '') return {}
				// TODO 超出父组件的盒子会发生剪裁
				// let w:number = this.width / 2
				// let h:number = 10
				// if (this.isDot == true) {
				// 	w = 5
				// 	h = 5
				// }
				// const x = `${(this?.offset?.[0] ?? 0) - w}px`;
				// const y = `${(this?.offset?.[1] ?? 0) - w}px`;
				const x = '0'
				const y = '0'
				

				const whiteList : UniBadgeXPositionStyle[] = [
					{
						right: x,
						top: y
					}, {
						right: x,
						bottom: y
					}, {
						left: x,
						bottom: y
					}, {
						left: x,
						top: y
					}
				]
				let num : number = ["rightTop", "rightBottom", "leftBottom", "leftTop"].indexOf(this.absolute ?? "");
				// #ifdef UNI-APP-X
				let utsJsonA = JSON.parseObject(JSON.stringify(whiteList[num >= 0 ? num : 0]))
				// #endif
				// #ifndef UNI-APP-X
				let utsJsonA = JSON.parse(JSON.stringify(whiteList[num >= 0 ? num : 0]))
				// #endif
				return utsJsonA as UTSJSONObject
			},
			dotStyle() : UniBadgeXDotStyle {
				if (this.isDot == false) {
					return {} as UniBadgeXDotStyle
				}
				return {
					width: '10px',
					minWidth: '0',
					height: '10px',
					padding: '0',
					borderRadius: '10px'
				} as UniBadgeXDotStyle
			},
			displayValue() : number | null {
				const {
					isDot,
					text,
				} = this
				return isDot == true ? null : text
			}
		},
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	};
</script>

<style lang="scss">
	$uni-primary: #2979ff !default;
	$uni-success: #4cd964 !default;
	$uni-warning: #f0ad4e !default;
	$uni-error: #dd524d !default;
	$uni-info: #909399 !default;


	$bage-size: 12px;
	$bage-small: scale(0.8);
	

	.uni-badge--x {
		position: relative;
		display: flex;
		flex-direction: row;
	}

	.uni-badge--absolute {
		position: absolute;
	}

	.uni-badge--small {
		transform: $bage-small;
		transform-origin: center center;
	}

	.uni-badge--slot {
		z-index: 10;
	}

	.uni-badge--box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		min-width: 20px;
		border-radius: 200px;
		z-index: 99;
		/* #ifndef UNI-APP-X */
		line-height: 20px;
		/* #endif */
		&--info {
			background-color: $uni-info;
		}

		&--primary {
			background-color: $uni-primary;
		}

		&--success {
			background-color: $uni-success;
		}

		&--warning {
			background-color: $uni-warning;
		}

		&--error {
			background-color: $uni-error;
		}
	}

	.uni-badge-text-color {
		color: #fff;
	}

	.uni-badge {
		padding: 0 6px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */

		.uni-badge-text {
			font-size: $bage-size;
		}

		&--inverted {
			padding: 0 5px 0 0;
			color: $uni-info;
		}

		&--info-inverted {
			color: $uni-info;
			background-color: transparent;
		}

		&--primary-inverted {
			color: $uni-primary;
			background-color: transparent;
		}

		&--success-inverted {
			color: $uni-success;
			background-color: transparent;
		}

		&--warning-inverted {
			color: $uni-warning;
			background-color: transparent;
		}

		&--error-inverted {
			color: $uni-error;
			background-color: transparent;
		}

	}
</style>