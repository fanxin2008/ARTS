### 子元素ancher被点击时，阻止事件冒泡至父级
##### javascript
```javascript
var url = $("#clickable a").attr("href");

$("#clickable").click(function() {
    window.location = url;
    return true;
})
```
##### html
``` html
<div id="clickable">
    <!-- Other content. -->
    <a href="http://foo.com">I don't want #clickable to handle this click event.</a>
</div>
```

当点击a标签时，如何不让事件冒泡至父级div，进而触发clickable的点击事件？

有两种方法：

* 使用 jQuery 传递的事件句柄参数，根据参数判断触发事件的对象，来处理对应事件的操作。
```
$("#clickable").click(function(e) {
    var senderElement = e.target;
    // Check if sender is the <div> element e.g.
    // if($(e.target).is("div")) {
    window.location = url;
    return true;
});
```
* 通过 jQuery 的事件句柄，阻止事件进一步向上冒泡
```
$("#clickable a").click(function(e) {
   // Do something
   e.stopPropagation();
});
```