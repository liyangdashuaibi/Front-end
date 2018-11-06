=========

### Describe: 
一个简易的可以在输入框输入IMG表情的插件

### Usage:
~~~html
<img src=''>
<div id="easyEditor" contenteditable="true"></div>

<script src="emoji-list-with-image.js"></script>
<script src="easyEditor.js"></script>
~~~

~~~js
var editor = new EasyEditor(id);

document.querySelect('img').addEventListener('click', function () { editor.insertEmoji( { src: this.getAttribute('src') } ) });
~~~

demo: https://thorliyang.github.io/PracticeCode/editor/

