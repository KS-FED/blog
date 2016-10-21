<template>
	<div style="">
	   
	    <div>
            <div class="parameterl">
               <div class="divmp">
                    <span>aaa</span>
                </div>
                <div style="color:red">
                    <p>1.块级元素可以设置margin 和 padding. </p>
                </div>

                <span class="spanmp">
                    ccc
                </span>
                <div style="color:red">
                    <p>2.行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果</p>
                    <p>但是竖直方向的margin-top,margin-bottom都不会产生边距效果</p>
                    <p>但是竖直方向的padding-top,padding-bottom有效,不过不沾页面空间</p>
                </div>
            </div>
            <div class="parameter mt-20">
                  <div>
                      <span class="bor-right">padding</span>
                      <span class="bor-left">这个属性在一个声明中设置所有内边距属性。</span>
                  </div>
                  <div>
                      <span class="bor-right">margin</span>
                      <span class="bor-left">这个简写属性设置一个元素所有外边距的宽度，或者设置各边上外边距的宽度。</span>
                  </div>
                  
            </div>
            <pre>
                <code class="html">
                   <div class="divmp">
                        <span>aaa</span>
                    </div>
                    <div style="color:red">
                        <p>1.块级元素可以设置margin 和 padding. </p>
                    </div>

                    <span class="spanmp">
                        ccc
                    </span>
                    <div style="color:red">
                        <p>2.行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果</p>
                        <p>但是竖直方向的margin-top,margin-bottom都不会产生边距效果</p>
                        <p>但是竖直方向的padding-top,padding-bottom有效,不过不沾页面空间</p>
                    </div>
                </code>
            </pre>
             <pre>
                <code class="scss">
                    .divmp{
                        border:1px solid #eee;
                        padding:10px;
                        margin:10px;
                    }
                    .spanmp{
                        border:1px solid #333;
                        padding:10px;
                        margin:10px;
                    }
                       
                </code>
            </pre>
        </div>

    </div>
</template>
<style>
 .divmp{
    border:1px solid #eee;
    padding:10px;
    margin:10px;
}
.spanmp{
    border:1px solid #333;
    padding:10px;
    margin:10px;
}

</style>