<template>
	<view class="uni-breadcrumb">
		<slot />
	</view>
</template>
<script lang="uts">
	/**
	 * Breadcrumb 面包屑导航父组件
	 * @description 显示当前页面的路径，快速返回之前的任意页面
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=xxx
	 * @property {String} separator 分隔符，默认为斜杠'/'
	 */
	export default {
		props: {
			separator: {
				type: String,
				default: '/'
			}
		},
		provide() {
			return {
				uniBreadcrumb: this
			}
		},
		methods:{
			getSeparator():string{
				return this.separator
			}
		}
	}
</script>
<style lang="scss">
	.uni-breadcrumb {
		display: flex;
		flex-direction: row;
	}
</style>
