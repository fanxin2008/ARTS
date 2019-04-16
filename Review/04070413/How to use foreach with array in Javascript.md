#### question in stackoverflow [翻译]
##### [How ca I loop through all the entires in an array using Javascript?](https://stackoverflow.com/questions/9329446/how-to-use-foreach-with-array-in-javascript?page=1&tab=votes#tab-top)

*该文选自Stack Overflow问题的回答*

###*最重要的提示*

* 不要使用```for-in```，除非该对象有明确的边界，或者很清楚它的优缺点
* 推荐的用法如下：
> * ```for-of``` 循环（ES2015及以上支持）
> * ```Array forEach``` 函数，还有与其相似的```such/some```函数（ES2015及以上支持）
> * 单纯老派的```for```循环
> * 有保障的使用```for-in```

---
 Javascript有强大的语法功能，可以循环遍历数组和类似数组的对象。我将回答划分为两部分：对数组的遍历和对类似数组对象的遍历，例如：arguments对象、ES2015支持的迭代对象以及DOM集合等等。

我会指出，您可以在ES5引擎上，通过将ES2015转换为ES5来使用相关语法。

#### 对数组对象来说
在目前JS支持最广泛的ES5中，有3个选择来遍历数组，在ES2015也就是ES6中，又增加了2个方法：
1. 使用forEach（ES5+）
2. 使用简单的for循环
3. 正确地使用for-in
4. 使用for-of（隐式使用迭代器）（ES6）
5. 显式使用迭代器（ES6）

##### 1. 使用forEach

在任何现代浏览器其中（不包含IE8）中，支持ES5对Array增加的新特性，均可以使用forEach：
```
var a = ["a", "b", "c"];
a.forEach(function(entry) {
	console.log(entry);
})
```
forEach接收一个回调函数作为可选参数，在回调执行是可以使用当前对象的上下文环境（this）。回调函数对数组中的每个条目执行操作，按顺序跳过数组中不存在的条目。在上述例子中，虽然只使用了一个参数，但是回调是被三个参数调用的：每个条目的value，该条目的index，以及该数组的索引。

除非你一定要支持IE8这种过时的浏览器，否则你是可以在主流浏览器的通用页面无需垫片使用forEach。如果无需支持过时浏览器，则可以轻松实现forEach的模拟。

forEach的好处是，在包含作用域中声明条目的索引和值，他们作为参数传递给迭代函数，很好的支持了迭代函数。

不必担心每个迭代函数的开销。除此之外，forEach是循环遍历函数，ES5还定义了一些“定制功能”，如：
> * every：当回调函数首次返回false时，将跳出循环
> * some：当回调函数首次返回true时，将跳出循环
> * filter：返回一个新的数组，包含过滤函数返回true的条目，忽略返回false的条目
> * map：根据回调函数的返回条目，返回一个新数组
> * reduce：通过反复调用回调函数来获得一个值，用于统计数组内容等
> * reduceRight：与reduce类似，但是按降序而不是按升序排列
#####  2. 使用简单的for循环
有时，老方法是最好的：
```
var index;
var a = ["a", "b", "c"];
for (index = 0; index < a.length; ++index) {
	console.log(a[index]);
}
```
如果在循环中，数组的长度是不变的，在性能敏感的编码中，将数组的长度保存下来，循环的效率可能会有一点提升
```
var index, len;
var a = ["a", "b", "c"];
for (index = 0, len = a.length; index < len; ++index) {
    console.log(a[index]);
}
```
或者倒序循环
```
var index;
var a = ["a", "b", "c"];
for (index = a.length; index >0 ; --index) {
    console.log(a[index]);
}
```
在ES6或者更高版本js引擎中，您可以将索引和值变量定义为for循环的局部变量。
```
let a = ["a", "b", "c"];
for (let index = 0; index < a.length; ++index) {
    let value = a[index];
    console.log(index, value);
}
```
当你想如下代码这样做时，意味着为每个循环重建索引和值，意味着在循环体中创建的闭包，来实现在特定迭代事件中保持索引和值。
```
let divs = document.querySelectorAll("div");
for (let index = 0; index < divs.length; ++index) {
	divs[index].addEventListener('click', e => {
		console.log("Index is :" + index);
	});
}
```
如果你有5个div，当点击第一个时打印”Index is ：0”，当点击最后一个时，将打印“Index is ：4”。如果将let替换为var，将不会是这个结果。
##### 3. 正确的使用for-in
你可能听到别人讲的for-in，但是，那绝对不是真正的for-in。for-in循环遍历对象的可枚举属性，而不是数字的索引。即便是在ES6中，遍历顺序也无法保证。ES6中定义了对象属性如OwnPropertyKeys 和 Enumerate 还有通过Object.getOwnPropertyKeys调用的属性的顺序，for-in不会遵循那个顺序。

仅仅可在数组上使用for-in的例子：
> * 该对象是一个稀疏阵列，其中有很大的间隙
> * 正在使用非元素属性，并且希望将它们包含在循环中
如下示例，如果使用适当的安全措施，则可以使用for-in访问这些稀疏数组元素
```
var key;
var a = [];
a[0] = "a";
a[10] = "b";
a[10000] = "c";
for (key in a) {
	if (a.hasOwnProperty(key) && 
	/^0$|^[1-9]\d*$/.test(key) && 
	key <= 4294967294) {
        console.log(a[key]);
    }
}
```

注意以下三点：
1. 对象具有该名称的属性
2. 键值是十进制数组
3. 键值强制转换为数字时，需要小于2^32 - 2（4294967294）。这个数字是从哪里来的呢？它是规范中数组索引定义的一部分。其他数字（非整数，负数，大于2^32 - 2）均不是数组的索引值。2^32 - 1是数组允许的最大长度。数组长度是一个32位的无符号整型。
##### 4. for-of（隐式调用迭代函数）
ES6中新增了迭代器。使用迭代器的最简单方式就是在for-of语句中。
```
const a = ["a", "b", "c"];
for (const val of a ) {
	console.log(val);
}
```
在for-of的包装下，从数组中获取一个迭代器并循环遍历它，从中获取条目值。此处使用for-in没有问题，因为它使用由数组定义的迭代器，并且该迭代器迭代数组的条目（而不是数组的属性）。
##### 5. 显式调用迭代器（ES6+）
有时，你想显式使用迭代器，即便它比for-of笨重很多，你也可以使用它。
```
const a = ["a", "b", "c"];
const it = a.values();
let entry;
while (!(entry = it.next()).done){
	console.log(entry.value);
}
```
迭代器是与规范中的iterator定义匹配的对象。每次调用它时，他的next方法都会返回一个新的结果对象。结果对象有一个属性，done，告诉我们它是否完成，还有一个value记录该迭代值。

value的含义取决于迭代器；数组支持至少三个返回迭代器的函数：
> * values：上文中使用的例子。它返回一个迭代器，数组中的条目作为被迭代的参数传入。
> * keys：它返回一个迭代器，数组中的条目的索引作为被迭代的参数传入。
> * entries：它返回一个迭代器，数组中的条目索引和值以[key, value]的形式传入。
#### 对于类似数组的对象来说
除了真正的数组，还存在很多类似数组的对象，这些对象有length属性和带有数字名称的属性，如NodeList对象，arguments参数对象等。我们如何遍历其中内容？
##### 1. 使用forEach（ES5+）
Array.prototype的各种函数是有通用意义的，通常可以通过call或者apply的调用方式在类似数组的对象上使用。
假如你想使用forEach遍历Node对象的childNodes属性。可以这样做：
```
Array.prototype.forEach.call(node.childNodes, function(child) {
	//Do something with `child`
})
```
如果频繁的执行上述操作，可以将函数的引用声明到变量中以供调用。
```
var forEach = Array.prototype.forEach;
forEach.call(node.childNodes, function(child) {
	//Do something with `child`
});
```
##### 2. 使用for循环
显然，for循环可以用在类似数组的对象上。
##### 3. 正确的使用for-in循环
for-in在数组上的正确使用方式，同样可以使用在与数组类似的对象上。
##### 4. for-of （隐式的使用迭代器）
for-of将使用对象提供的迭代器（如果有的话）；我们可以看到for-of和各种类似数组的对象一起使用，如querySelectorAll的NodeList已更新为支持迭代。但是getElementsByTagName的HTMLCollection则不支持迭代。
##### 5.使用显示调用迭代器
使用方式同数组一样。

#### 如何创建一个真正的数组
有时，我们希望将类似数组的对象转换为真正的数组对象。有以下方法：
##### 1. 使用array的slice方法
我们可以使用数组的slice方法，就如上文中提到的通用，可用于类似数组的对象。
```
var trueArray = Array.prototype.slice.call(arrayLikeObject);
```
因此，如果我们想将NodeList转换为真正的数组，可以这样：
```
var divs = Array.prototype.slice.call(document.querySelectorAll("div"));
```
##### 2. 使用展开语法（Spread syntax）
展开语法可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开；还可以在构造字面量对象时，将对象表达式按key-value的方式展开。
ES6可以支持这种语法：
```
var trueArray = [...iterableObject];
```
上例中，如果我们想将NodeList转换为真正的数组，使用展开语法可以这样写：
```
var divs = [...document.querySelectorAll("div")];
```
##### 3. 使用Array.from
Array.from （在ES2015+支持，但是很容易实现垫片）从类数组对象创建一个真实数组，可以通过映射函数传递数组条目。如下：
```
var divs = Array.from(document.querySelectorAll("div"));
```
如果想获得具有某种类型的元素的标记名称的数组，则可以使用映射函数：
```
// Arrow function (ES2015):
var divs = Array.from(document.querySelectorAll(".some-class"), element => element.tagName);

// Standard function (since `Array.from` can be shimmed):
var divs = Array.from(document.querySelectorAll(".some-class"), function(element) {
    return element.tagName;
});
```


