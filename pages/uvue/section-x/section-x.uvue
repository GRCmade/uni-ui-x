<template>
	<view class="page">
		<uni-card-x>
			<text> uni-section-x 组件主要用于文章、列表详情等标题展示 </text>
		</uni-card-x>
		
		<uni-section-x class="mb-10" title="基础用法" sub-title="副标题"></uni-section-x>
		<uni-section-x class="mb-10" title="竖线装饰" sub-title="副标题" type="line"></uni-section-x>
		<uni-section-x class="mb-10" title="装饰器插槽" sub-title="副标题">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section-x>
		<uni-section-x class="mb-10" title="默认插槽" sub-title="副标题" padding="5px 0px 5px 20px">默认插槽内容</uni-section-x>
		<uni-section-x class="mb-10" title="主标题">
			<template v-slot:right>
				right slot
			</template>
		</uni-section-x>
	</view>
</template>

<script lang="uts">
	export default {
		data() {
			return {
				title: 'Hello',
				test: false
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	$uni-success: #18bc37 !default;

	.mb-10 {
		margin-bottom: 10px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 20px;
		background-color: $uni-success;
	}

	.example-info {
		background-color: #fff;

		&-text {
			text-align: center;
		}
	}
</style>