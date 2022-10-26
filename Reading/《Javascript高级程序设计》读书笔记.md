## 第3章 基本概念

- 对未初始化和未定义的变量，typeof结果均为undefined

```
var message;
console.log(message) //undefined
console.log(typeof message)//undefined
console.log(typeof tag) // undefined
console.log(tag)//报错 Uncaught ReferenceError: tag is not defined

结果表明，对未初始化和未定义的变量，typeof均返回undefined

```

- typeof是一个运算符，而非函数
- null值表示一个空指针，typeof null == object
- 浮点数的最高精度是17位小数，小数点后带有6个0以上的浮点数值转换为以e表示法表示的数值。

