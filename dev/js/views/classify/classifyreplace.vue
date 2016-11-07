<template>
      <div class="parameterl">
               
                <div style="color:red">
                    <p>1.替换元素是浏览器根据其标签的元素与属性来判断显示具体的内容。典型的可替换元素有 "img"、 "object"、 "video" 和 表单元素，如"textarea"、 "input" 。 某些元素只在一些特殊情况下表现为可替换元素，例如 "audio"和 "canvas"</p>
                </div>
                <div style="color:red">
                    <p>1.1-----根据input标签的type属性来决定</p>
                    <input type="text" value="111" />
                    <input type="password" value="111"/>
                    <input type="radio" value="111"/>
                    <p>1.2-----src属性的值来读取图片信息</p>
                    <img src="" class="imgstyle" />
                </div>
<pre>
<code class="html">
   <div>
        <input type="text" value="111" />
        <input type="password" value="111"/>
        <input type="radio" value="111"/>
        <img src=""  class="imgstyle"/>
    </div>
</code>
<code class="css">
    .imgstyle{
     border:1px solid #ccc;
     display:inline-block;
     width:50px;
     height:50px;
    }
</code>

</pre>


                <div style="color:red">
                    <p>2.非替换元素是将内容直接告诉浏览器，将其显示出来。</p>
                </div>
                <div class="divwh">
                    <p>我是p段落</p>
                    <label>我是label</label>
                </div>
<pre>
<code class="html">
   <div>
        <p>我是p段落</p>
        <label>我是label</label>
    </div>
</code>

</pre>
</div>


</template>
<style>
.imgstyle{
     border:1px solid #ccc;
     display:inline-block;
     width:50px;
     height:50px;
    }
</style>