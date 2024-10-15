<template>
	<view class="">
		ui-test
	</view>
</template>

<script lang="uts">
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		created() {
			const obj:UTSJSONObject = {
				str:"yuhe",
				num:1,
				data:[{
					name:'123'
				}]
			}
			// #ifdef UNI-APP-X
			UTSJSONObject.keys(obj).forEach((item,index)=>{
				console.log("key:",item)
				console.log("value:",obj[item]);
			})
			// #endif
			// #ifndef UNI-APP-X
			Object.keys(obj).forEach((item,index)=>{
				console.log("key:",item)
				console.log("value:",obj[item]);
			})
			// #endif
			
		},
		methods: {

		}
	}
</script>
