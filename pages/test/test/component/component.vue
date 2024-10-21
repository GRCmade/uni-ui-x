<template>
	<view>
		<view style="padding: 20px;background-color: red;" >
			<input type="text" :value="modelValue" @input="onInput"/>
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
			modelValue:{
				type:String,
				default:''
			}
		},
		methods: {
			onInput(event:UniInputEvent){
				let value = event.detail.value;
				this.$emit("update:modelValue",value)
			},
			click(){
				this.$emit("update:modelValue",this.modelValue+1)
			}
		}
	}
</script>

<style>

</style>