<template>
	<view class="uni-breadcrumb-item">
		<view @click="navTo">
			<text :class="{			'uni-breadcrumb-item--slot': true,
				'uni-breadcrumb-item--slot-link': to!='' && currentPage !== to}">
				{{name}} </text>
		</view>
		<!-- <view v-if="separatorClass" class="uni-breadcrumb-item--separator" :class="separatorClass" ></view> -->
		<text class="uni-breadcrumb-item--separator">{{ separator }}</text>
	</view>
</template>
<script lang="uts">
	/**
	 * BreadcrumbItem 面包屑导航子组件
	 * @property {String/Object} to 路由跳转页面路径/对象
	 * @property {Boolean} replace 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录(仅 h5 支持）
	 */
	export default {
		data() {
			return {
				currentPage: ""
			}
		},
		props: {
			to: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			replace: {
				type: Boolean,
				default: false
			}
		},
		created() {
			const pages : Array<UniPage> = getCurrentPages()
			const page : UniPage = pages[pages.length - 1]

			if (page.route != '') {
				this.currentPage = `/${page.route}`
			}
		},
		inject: {
			uniBreadcrumb: {
				from: "uniBreadcrumb",
				default: null
			}
		},
		computed: {
			separator() : string {
				// #ifdef UNI-APP-X
				return this.$parent?.$callMethod('getSeparator') as string
				// #endif
				// #ifndef UNI-APP-X
				return this.uniBreadcrumb.separator
				// #endif
			}
		},
		methods: {
			navTo() {
				const { to } = this

				if (to == '' || this.currentPage === to) {
					return
				}

				if (this.replace) {
					uni.redirectTo({
						url: to
					})
				} else {
					uni.navigateTo({
						url: to
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	$uni-primary: #2979ff !default;
	$uni-base-color: #6a6a6a !default;
	$uni-main-color: #3a3a3a !default;

	.uni-breadcrumb-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		// white-space: nowrap;
		// font-size: 14px;

		&--slot {
			color: $uni-base-color;
			padding: 0 10px;
			font-size: 14px;

			// 不支持给slot设置样式
			&-link {
				color: $uni-main-color;
				font-weight: bold;

				&:hover {
					color: $uni-primary;
				}
			}
		}

		&--separator {
			font-size: 12px;
			color: $uni-base-color;
		}

		// 不支持下面属性
		// &:first-child &--slot {
		// 	padding-left: 0;
		// }

		// &:last-child &--separator {
		// 	display: none;
		// }
	}
</style>