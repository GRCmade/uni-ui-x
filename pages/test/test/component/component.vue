<template>
	<view>
		<view style="padding: 20px;background-color: red;">
			<input type="text" :value="modelValue" @input="onInput" />
			{{num}}
		</view>
		<button @click="click2">click2</button>
	</view>
</template>

<script lang="uts">
	import { StrNum2NumInt } from "@/uni_modules/uni-types-x/index.uts"
	export default {
		data() {
			return {

			}
		},
		props: {
			modelValue: {
				type: String,
				default: ''
			},
			num: {
				type: [String, Number],
				default: '1'
			}
		},
		computed: {
			_num() : number {
				return StrNum2NumInt(this.num)
			}
		},
		methods: {
			onInput(event : UniInputEvent) {
				let value = event.detail.value;
				this.$emit("update:modelValue", value)
			},
			click() {
				this.$emit("update:modelValue", this.modelValue + 1)
			},
			click2() {
				console.log(this._num + 5)
				console.log(parseInt("10.22"))
			}
		}
	}
</script>

<style>

</style>