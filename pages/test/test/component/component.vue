<template>
	<view>
		<view style="padding: 20px;background-color: red;">
			<slot  />
		</view>
	</view>
</template>

<script lang="uts">
	export default {
		data() {
			return {
				
			}
		},
		props:{
			one:{
				type:String,
				default:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>