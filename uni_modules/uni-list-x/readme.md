## List 列表
> **组件名：uni-list-x**

### 与uni-ui中的区别

- `uni-icon-x`没有支持自定义图标，暂时extraIcon只能传`uni-icon-x`中有的图标
- props属性必须明确类型
- 插槽处部分样式有变动，可以自己修改传入时的样式
- ellipsis以往是支持1行和2行，x中只支持1行


### 当前还存在的问题

- 【已修复】在Andorid端，取消border之后，第一个`uni-list-item-x`的上border不会取消 
- 【已修复】有一堆style的警告
- 由于uni-bage还没适配，因此相关属性未验证
