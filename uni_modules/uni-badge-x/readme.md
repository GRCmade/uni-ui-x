## Badge 数字角标
> **组件名：uni-badge-x**
> 代码块： `uBadgex`


### 主要的变化：

- 在uni-ui中，custom-style	是可以随意给badge来指定样式的，但是在uni-ui-x中是不可以随意指定样式的，因为有些属性例如color只能给text上面加，而一些属性只有给view上面加才生效。因此暂时不支持自定义属性
- 需要更好的支持一下 aboslute的offset，当前问题是overflow相关问题
- 【重要】：在使用时，需要给父组件添加一个属性：`flex-direction: row;`
