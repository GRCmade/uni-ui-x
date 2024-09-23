## uni-ui-x

### 已支持的组件列表

| 组件名| 组件说明	|
| :----------------| :-----------------------------	|
| uni-icon-x| 图标组件，暂时不支持自定义图标	|
| uni-data-picker-x| 支持并不好，需要之后重写	|
| uni-section-x| 支持	|
| uni-list-x| 部分支持：uni-list-item-x	|
| uni-card-x| 支持	|
| uni-badge-x| 支持	|
| uni-breadcrumb-x| 支持	|
| uni-fab-x| 支持	|
| uni-fav-x| 支持	|
| uni-notice-bar-x| 支持	|



### uni-ui-x与uni-ui的区别

主要的区别如下所示：
- 组件名称发生变化
- 样式无法继承，注意default的slot区别较大
- 传入的参数类型必须是确定的
- 【重要】提供了一种全新的使用组件的方式：数据绑定式引入
- 暂时不支持国际化

更详细的说明见：[uni-ui-x相比uni-ui主要的变化](./doc/DIFFERENCE.md)


### 当前存在的问题

- 类型名称`UniListItemXExtraIcon`是否太长了，需要缩减
