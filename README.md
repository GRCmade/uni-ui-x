## uni-ui-x


### uni-ui-x相比uni-ui主要的变化

uni-ui-x由于受写法限制，API支持情况等相关问题，与uni-ui有部分内容不同，但是在开发中，与uni-ui功能保持一致，以给习惯于uni-ui的开发者一致大开发体验

主要的区别如下所示：
1. **样式无法继承**

  在uniappx中，样式是不会继承的，详细可见：[样式不继承](https://doc.dcloud.net.cn/uni-app-x/css/#stylenoextends)。

  在uni-ui中，uni的部分组件会提供给用于继承给自组件的样式。比如，在`uni-section`标题栏中，在`right-slot`插槽处会给放入插槽的内容字体大小上的添加`font-size: 14px;`,之后类似的位置将不会有相似的修改，需要开发者自己合理调控组件的样式

  因此，当涉及插槽位置的样式出现与uni-ui不一致的问题，则需要开发者自己修改传入时的样式。

2. **传入的参数类型必须是确定的**

  在uniappx中，由于联合类型的支持有限，传入的参数类型必须是确定的，详细可见：[联合类型](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#union-type)

  在uni-ui中，部分组件会提供一种形式方便调用，比如在`uni-section`组件中，`padding`属性可以很方便的加一个边距，padding可以是`String类型`也可以是`Boolean类型`。

  你可以这样调用

  ```html
  <uni-section title="默认插槽" sub-title="副标题" padding="0 0 5px 10px">默认插槽内容</uni-section>
  ```

  也可以这样调用，会默认给见10px的边距

  ```html
  <uni-section title="默认插槽" sub-title="副标题" padding>默认插槽内容</uni-section>
  ```

  但是在uni-ui-x中，须根据文档所给出的类型传入对应的类型

3. 

