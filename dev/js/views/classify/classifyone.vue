<template>
    <div style="">
       
     
            <div class="parameterl">
               
                <div class="explaininfo">
                    <p>1.块级元素可以设置 width, height属性</p>
                </div>
                <div class="divwh">
                    <span>aaa</span>
                </div>
<pre>
<code class="html">
   <div class="divwh">
        <span>aaa</span>
    </div>
    <div class="explaininfo">
        <p>1.块级元素可以设置 width, height属性</p>
    </div>
</code>
 <code class="scss">
    .divwh{
        border:1px solid #4f81bd;
        width:300px;
        height:100px;
    }

</code>
</pre>

               
                <div class="explaininfo">
                    <p>2.行内元素设置width,  height无效</p>
                </div>
                 <span class="spanwh">
                    ccc
                </span>
<pre>
<code class="html">
    <span class="spanwh">
        ccc
    </span>
    <div class="explaininfo">
        <p>2.行内元素设置width,  height无效</p>
    </div>
</code>
 <code class="scss">
    .spanwh{
        border:1px solid #4f81bd;
        width:200px;
        height:200px;
    }

</code>
</pre>
            </div>

            <div class="parameter mt-20 mb-20">
                  <div>
                      <span class="bor-right">width</span>
                      <span class="bor-left">这个属性设置元素的宽度。</span>
                  </div>
                  <div>
                      <span class="bor-right">height</span>
                      <span class="bor-left">这个属性设置元素的高度。</span>
                  </div>
            </div>





             <div class="parameterl">
               
                <div class="explaininfo">
                    <p>3.块级元素即使设置了宽度，仍然是独占一行的</p>
                </div>
                 <div class="divwh">
                    <span>aaa</span>
                </div>
                <div class="divwh">
                    <span>aaa</span>
                </div>
                
<pre>
<code class="html">
   <div class="divwh">
        <span>aaa</span>
    </div>
    <div class="divwh">
        <span>aaa</span>
    </div>
</code>
 <code class="scss">
    .divwh{
        border:1px solid #95b3d7;
        width:300px;
        height:100px;
    }

</code>
</pre>


                <div class="explaininfo">
                    <p>4.行内元素不会独占一行，相邻的行内元素会排列在同一行里，
                    知道一行排不下，才会换行，其宽度随元素的内容而变化</p>
                </div> 
                <span class="spanwh">
                    ccc
                </span>
                 <span class="spanwh">
                    ccc
                </span>
                 <span class="spanwh">
                    ccc
                </span>

<pre>
<code class="html">
    <span class="spanwh">
        ccc
    </span>
     <span class="spanwh">
        ccc
    </span>
     <span class="spanwh">
        ccc
    </span>
</code>
 <code class="scss">
     .spanwh{
        border:1px solid #95b3d7;
        width:200px;
        height:200px;
    }

</code>
</pre>

                
            </div>

            <div class="parameter mt-20 mb-20">
                  <div>
                      <span class="bor-right">width</span>
                      <span class="bor-left">这个属性设置元素的宽度。</span>
                  </div>
                  <div>
                      <span class="bor-right">height</span>
                      <span class="bor-left">这个属性设置元素的高度。</span>
                  </div>
            </div>





             <div class="parameterl">
                <div class="explaininfo">
                    <p>5.块级元素可以设置margin 和 padding. </p>
                </div>
                 <div class="divmp">
                    <span>aaa</span>
                </div>
         

<pre>
<code class="html">
   <div class="divmp">
        <span>aaa</span>
    </div>
</code>
 <code class="scss">
    .divmp{
        border:1px solid #eee;
        padding:10px;
        margin:10px;
    }
       
</code>
</pre>


                    <div class="explaininfo">
                        <p>6.行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果</p>
                        <p>但是竖直方向的margin-top,margin-bottom都不会产生边距效果</p>
                        <p>但是竖直方向的padding-top,padding-bottom有效,不过不沾页面空间</p>
                    </div>
                    <span class="spanmp">
                        ccc
                    </span>
<pre>
<code class="html">     
    <span class="spanmp">
        ccc
    </span>
</code>
 <code class="scss">
    .spanmp{
        border:1px solid #333;
        padding:10px;
        margin:10px;
    }
       
</code>
</pre>
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
        

    </div>
</template>
<style>
 .divwh{
        border:1px solid #4f81bd;
        width:300px;
        height:100px;
}
.spanwh{
    border:1px solid #4f81bd;
    width:200px;
    height:200px;
}
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