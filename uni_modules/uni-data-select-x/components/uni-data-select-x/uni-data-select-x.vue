<template>
	<view class="uni-stat__select">
		<view v-if="label" class="uni-label-text hide-on-phone">{{label + '：'}}</view>
		<view class="uni-stat-box" :class="{'uni-stat__actived': current!='' }">
			<view class="uni-select" :class="{'uni-select--disabled':disabled}">
				<view class="uni-select__input-box" @click="toggleSelector">
					<view v-if="current!='' " class="uni-select__input-text">{{textShow}}</view>
					<view v-else class="uni-select__input-text uni-select__input-placeholder">{{typePlaceholder}} </view>
					<view v-if="current!='' && clear && !disabled" @click.stop="clearVal">
						<uni-icons-x type="clear" color="#c0c4cc" size="24" />
					</view>
					<view v-else>
						<uni-icons-x :type="showSelector? 'top' : 'bottom'" size="14" color="#999" />
					</view>
				</view>
				<view class="uni-select--mask" v-if="showSelector" @click="toggleSelector" />
				<view class="uni-select__selector" :style="getOffsetByPlacement" v-if="showSelector">
					<view :class="placement=='bottom'?'uni-popper__arrow_bottom':'uni-popper__arrow_top'"></view>
					<scroll-view scroll-y="true" class="uni-select__selector-scroll">
						<view class="uni-select__selector-empty" v-if="mixinDatacomResData.length === 0">
							<text>{{emptyTips}}</text>
						</view>
						<view v-else class="uni-select__selector-item" v-for="(item,index) in mixinDatacomResData" :key="index"
							@click="change(item)">
							<text :class="{'uni-select__selector__disabled': item.disable}">{{formatItemName(item)}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';

	interface DataItem {
		text : string;
		value : string;
		disable ?: boolean;
		channel_code ?: string;
	}

	type PlaceholderText = {
		opendbStatAppVersions : string;
		opendbAppChannels : string;
		opendbAppList : string;
	}

	export default {
		name: "uni-data-select",
		mixins: [uniCloud.mixinDatacom || {}],
		props: {
			localdata: {
				type: Array as PropType<DataItem[]>,
				default: () : DataItem[] => []
			},
			value: {
				type: String as PropType<string>,
				default: ''
			},
			modelValue: {
				type: String as PropType<string>,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			emptyTips: {
				type: String,
				default: '无选项'
			},
			clear: {
				type: Boolean,
				default: true
			},
			defItem: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			format: {
				type: String,
				default: ''
			},
			placement: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				showSelector: false,
				current: '',
				mixinDatacomResData: [] as DataItem[],
				apps: [] as string[],
				channels: [] as string[],
				cacheKey: "uni-data-select-lastSelectedValue",
				collection: '' // 确保 collection 已定义
			};
		},
		mounted() {
			// this.debounceGet = this.debounce(() : void => {
			// 	this.query();
			// }, 300);
			
			if (this.collection != '' && this.localdata.length > 0) {
				this.debounceGet();
			}
		},
		computed: {
			typePlaceholder() : string {
				const text : PlaceholderText = {
					opendbStatAppVersions: '版本',
					opendbAppChannels: '渠道',
					opendbAppList: '应用'
				};
				const common = this.placeholder;
				const placeholder = text[this.collection] != null ? text[this.collection] : '';
				return placeholder != '' ? common + placeholder : common;
			},
			valueCom() : string {
				// #ifdef VUE3
				return this.modelValue;
				// #endif
				// #ifndef VUE3
				return this.value;
				// #endif
			},
			textShow() : string {
				let text = this.current;
				return text;
			},
			getOffsetByPlacement() : string {
				switch (this.placement) {
					case 'top':
						return "bottom:calc(100% + 12px);";
					case 'bottom':
						return "top:calc(100% + 12px);";
					default:
						return '';
				}
			}
		},
		watch: {
			localdata: {
				immediate: true,
				handler(val : DataItem[], old : DataItem[]) {
					if (Array.isArray(val) && old !== val) {
						this.mixinDatacomResData = val;
					}
					this.mixinDatacomResData = val
					console.log("yuhe", val,old);
				}
			},
			valueCom(val : string, old : string) {
				this.initDefVal();
			},
			mixinDatacomResData: {
				immediate: true,
				handler(val : DataItem[]) {
					if (val.length > 0) {
						this.initDefVal();
					}
				}
			}
		},
		methods: {
			debounceGet() {
				let timer : number | null = null; // 如果是浏览器环境
				if (timer != null) clearTimeout(timer)
				timer = setTimeout(() => {
					this.query();
				}, 300)
			},
			query() {
				// this.mixinDatacomEasyGet();
				console.log("query");
			},
			onMixinDatacomPropsChange() {
				if (this.collection != '') {
					this.debounceGet();
				}
			},
			initDefVal() {
				let defValue : string = '';
				if ((this.valueCom != '' || this.valueCom === '0') && !this.isDisabled(this.valueCom)) {
					defValue = this.valueCom;
				} else {
					let defValue : string = ''; // 默认值
					if (this.collection != '') {
						const strogeValue = this.getCache() as string | null; // 从缓存中获取
						if (strogeValue !== null && strogeValue !== '') {
							defValue = strogeValue; // 如果缓存值有效，赋值为默认值
						} else if (this.defItem > 0 && this.defItem <= this.mixinDatacomResData.length) {
							defValue = this.mixinDatacomResData[this.defItem - 1].value; // 使用默认项的值
						}
					}
					if (defValue != '' || defValue === '0') {
						this.emit(defValue as string);
					}
				}
				const def : DataItem | null = this.mixinDatacomResData.find((item : DataItem) : boolean => {
					return item.value === defValue
				});
				this.current = def != null ? this.formatItemName(def) : '';
			},
			isDisabled(value : string) : boolean {
				let isDisabled = false;
				this.mixinDatacomResData.forEach((item : DataItem) => {
					if (item.value === value) {
						isDisabled = item.disable != false || false;
					}
				});
				return isDisabled;
			},
			clearVal() {
				this.emit('');
				if (this.collection != '') {
					this.removeCache();
				}
			},
			change(item : DataItem) {
				if (item.disable == false) {
					this.showSelector = false;
					this.current = this.formatItemName(item);
					this.emit(item.value as string);
				}
			},
			emit(vall : string) {
				this.$emit('input', vall);
				this.$emit('update:modelValue', vall);
				this.$emit('change', vall);
				if (this.collection != '') {
					this.setCache(vall);
				}
			},
			toggleSelector() {
				if (this.disabled) {
					return;
				}
				this.showSelector = !this.showSelector;
			},
			formatItemName(item : DataItem) : string {
				let { text, value, channel_code } = item;
				channel_code = channel_code != '' ? `(${channel_code})` : '';
				if (this.format != '') {
					let str = this.format;
					let temp = JSON.parseObject(JSON.stringify(item)!)

					for (let key in UTSJSONObject.keys(temp!)) {
						// str = str.replace(new RegExp(`{${key}}`, "g"), temp[key]);
					}
					return str;
				} else {
					return this.collection.indexOf('app-list') > 0 ?
						`${text}(${value})` :
						(text != '' ? text : `未命名${channel_code}`);
				}
				return ''
			},
			getLoadData() : DataItem[] {
				return this.mixinDatacomResData;
			},
			getCurrentCacheKey() : string {
				return this.collection;
			},
			getCache() : string | null {
				let name : string = this.getCurrentCacheKey()
				let cacheData = JSON.parseObject(JSON.stringify(uni.getStorageSync(this.cacheKey))!)
				return cacheData![name] as string | null
			},
			setCache(value : string) {
				let name : string = this.getCurrentCacheKey()
				let cacheData = JSON.parseObject(JSON.stringify(uni.getStorageSync(this.cacheKey))!)
				cacheData![name] = value;
				uni.setStorageSync(this.cacheKey, cacheData);
			},
			removeCache() {
				let name : string = this.getCurrentCacheKey()
				let cacheData = JSON.parseObject(JSON.stringify(uni.getStorageSync(this.cacheKey))!)
				cacheData![name] = ''
				uni.setStorageSync(this.cacheKey, cacheData);
			}
		}
	};
</script>

<style lang="scss">
	$uni-base-color: #6a6a6a !default;
	$uni-main-color: #333 !default;
	$uni-secondary-color: #909399 !default;
	$uni-border-3: #e5e5e5;

	/* #ifndef APP-NVUE */
	@media screen and (max-width: 500px) {
		.hide-on-phone {
			display: none;
		}
	}

	/* #endif */
	.uni-stat__select {
		display: flex;
		align-items: center;
		// padding: 15px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}

	.uni-stat-box {
		width: 100%;
		flex: 1;
	}

	.uni-stat__actived {
		width: 100%;
		flex: 1;
		// outline: 1px solid #2979ff;
	}

	.uni-label-text {
		font-size: 14px;
		font-weight: bold;
		color: $uni-base-color;
		margin: auto 0;
		margin-right: 5px;
	}

	.uni-select {
		font-size: 14px;
		border: 1px solid $uni-border-3;
		box-sizing: border-box;
		border-radius: 4px;
		padding: 0 5px;
		padding-left: 10px;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		user-select: none;
		/* #endif */
		flex-direction: row;
		align-items: center;
		border-bottom: solid 1px $uni-border-3;
		width: 100%;
		flex: 1;
		height: 35px;

		&--disabled {
			background-color: #f5f7fa;
			cursor: not-allowed;
		}
	}

	.uni-select__label {
		font-size: 16px;
		// line-height: 22px;
		height: 35px;
		padding-right: 10px;
		color: $uni-secondary-color;
	}

	.uni-select__input-box {
		height: 35px;
		width: 0px;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.uni-select__input {
		flex: 1;
		font-size: 14px;
		height: 22px;
		line-height: 22px;
	}

	.uni-select__input-plac {
		font-size: 14px;
		color: $uni-secondary-color;
	}

	.uni-select__selector {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		position: absolute;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border: 1px solid #EBEEF5;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 3;
		padding: 4px 0;
	}

	.uni-select__selector-scroll {
		/* #ifndef APP-NVUE */
		max-height: 200px;
		box-sizing: border-box;
		/* #endif */
	}

	/* #ifdef H5 */
	@media (min-width: 768px) {
		.uni-select__selector-scroll {
			max-height: 600px;
		}
	}

	/* #endif */

	.uni-select__selector-empty,
	.uni-select__selector-item {
		/* #ifndef APP-NVUE */
		display: flex;
		cursor: pointer;
		/* #endif */
		line-height: 35px;
		font-size: 14px;
		text-align: center;
		/* border-bottom: solid 1px $uni-border-3; */
		padding: 0px 10px;
	}

	.uni-select__selector-item:hover {
		background-color: #f9f9f9;
	}

	.uni-select__selector-empty:last-child,
	.uni-select__selector-item:last-child {
		/* #ifndef APP-NVUE */
		border-bottom: none;
		/* #endif */
	}

	.uni-select__selector__disabled {
		opacity: 0.4;
		cursor: default;
	}

	/* picker 弹出层通用的指示小三角 */
	.uni-popper__arrow_bottom,
	.uni-popper__arrow_bottom::after,
	.uni-popper__arrow_top,
	.uni-popper__arrow_top::after,
	{
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 6px;
	}

	.uni-popper__arrow_bottom {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		top: -6px;
		left: 10%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.uni-popper__arrow_bottom::after {
		content: " ";
		top: 1px;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #fff;
	}

	.uni-popper__arrow_top {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		bottom: -6px;
		left: 10%;
		margin-right: 3px;
		border-bottom-width: 0;
		border-top-color: #EBEEF5;
	}

	.uni-popper__arrow_top::after {
		content: " ";
		bottom: 1px;
		margin-left: -6px;
		border-bottom-width: 0;
		border-top-color: #fff;
	}


	.uni-select__input-text {
		// width: 280px;
		width: 100%;
		color: $uni-main-color;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
	}

	.uni-select__input-placeholder {
		color: $uni-base-color;
		font-size: 12px;
	}

	.uni-select--mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 2;
	}
</style>