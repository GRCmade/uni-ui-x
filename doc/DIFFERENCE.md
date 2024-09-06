## uni-ui-x相比uni-ui主要的变化
uni-ui-x由于受写法限制，API支持情况等相关问题，与uni-ui有部分内容不同，但是在开发中，与uni-ui功能保持一致，以给习惯于uni-ui的开发者一致大开发体验。

### 1. 名称发生变化

在uni-ui-x中，组件的名称都是已-x结尾，例如：`uni-list-x`


### 2. 样式无法继承

在uniappx中，样式是不会继承的，详细可见：[样式不继承](https://doc.dcloud.net.cn/uni-app-x/css/#stylenoextends)。

在uni-ui中，uni的部分组件会提供给继承给插槽的属性。

- 在`uni-section`标题栏中，在`right-slot`插槽处会给放入插槽的内容字体大小上的添加`font-size: 14px;`。
- 在`uni-card`中，默认插槽在uni-ui中会默认给文字添加一个`#3a3a3a`的颜色，但是在uni-ui-x中不会继承这个颜色

在uni-ui-x中类似的位置将不会有相似的修改，需要开发者自己控制插槽样式。

### 3.传入的参数类型必须是确定的

在uniappx中，由于联合类型的支持有限，传入的参数类型必须是确定的，详细可见：[联合类型](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#union-type)

在uni-ui中，部分组件会提供一种形式方便调用，比如在`uni-section`组件中，`padding`属性可以很方便的加一个边距，padding可以是`String类型`也可以是`Boolean类型`。

调用法1：

```html
<uni-section title="默认插槽" sub-title="副标题" padding="0 0 5px 10px">默认插槽内容</uni-section>
```

调用法2：

  ```html
  <uni-section title="默认插槽" sub-title="副标题" padding>默认插槽内容</uni-section>
  ```
但是在uni-ui-x中，须根据文档所给出的类型传入对应的类型，只能是调用法1



再比如可以传入字符串`"10"`或者数字10，在uni-ui-x中对类型做了严格的定义，需要传入10



### 4.【重要】提供了一种全新的使用组件的方式：数据绑定式引入

> 受全局引入type的限制，目前需要手动引入type

在过去，通常通过如下的方式（模版内联声明）引入组件：

```vue
<uni-list-x>
	<uni-list-item-x thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumbSize="lg"
	title="列表标题" note="列表描述信息" rightText="右侧文字" showArrow ></uni-list-item-x>
</uni-list-x>

<!-- 或者是如下方式 -->

<uni-list-item-x :thumb="uix.thumb" :thumbSize="uix.thumbSize" :title="uix.title" :note="uix.note" :rightText="uix.rightText" showArrow ></uni-list-item-x>
<script>
	export default {
		data() {
			return {
				uix: {
					title: "列表标题",
					note: "列表描述信息",
					rightText: "右侧文字",
					thumbSize: "lg",
					thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					showArrow: true
				} as UniListItemX
			}
		}
	}
</script>

```

在uix中，提供了一种新的方式（数据绑定式）来引入组件，即通过props中的uix节点来引入，如下所示：

```vue
<template>
	<uni-list-x>
			<uni-list-item-x :uix="uix"></uni-list-item-x>
		</uni-list-x>
</template>

<script>
	import { UniListItemX } from '@/uni_modules/uni-types-x/uni-types-x.uts';
	export default {
		data() {
			return {
				uix: {
					title: "列表标题",
					note: "列表描述信息",
					rightText: "右侧文字",
					thumbSize: "lg",
					thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					showArrow: true
				} as UniListItemX
			}
		}
	}
</script>
```

注：UniListItemX是`<uni-list-item-x >` 的props中的所有type



通过这种方式可以：

- 使得代码更加简洁
- 配合HbuilderX的type注释，可以在使用时即可看到类型和作用
- 在uni-ui-x中，即支持第一种调用方式，也支持第二种方式，这两种方式是兼容的
  - 两种方式具有相同的类型和相同的默认值
  - 在显示时，优先选择uix节点的内容，如果uix节点的内容找不到，再找props上的内容，如果props上也找不到，那么就会返回默认值