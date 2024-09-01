## uni-ui-x相比uni-ui主要的变化
uni-ui-x由于受写法限制，API支持情况等相关问题，与uni-ui有部分内容不同，但是在开发中，与uni-ui功能保持一致，以给习惯于uni-ui的开发者一致大开发体验。

### 1. 名称发生变化

在uni-ui-x中，组件的名称都是已-x结尾，例如：`uni-list-x`


### 2. 样式无法继承

在uniappx中，样式是不会继承的，详细可见：[样式不继承](https://doc.dcloud.net.cn/uni-app-x/css/#stylenoextends)。

在uni-ui中，uni的部分组件会提供给继承给插槽的属性。

- 在`uni-section`标题栏中，在`right-slot`插槽处会给放入插槽的内容字体大小上的添加`font-size: 14px;`。之后类似的位置将不会有相似的修改，需要开发者自己控制样式。

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