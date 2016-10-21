<template>
    <div style="">
       
        <div>
            <div class="parameterl">
               <div class="divwh">
                    <span>aaa</span>
                </div>
                <div class="divwh">
                    <span>aaa</span>
                </div>
                <div style="color:red">
                    <p>1.块级元素即使设置了宽度，仍然是独占一行的</p>
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
                <div style="color:red">
                    <p>2.行内元素不会独占一行，相邻的行内元素会排列在同一行里，
                    知道一行排不下，才会换行，其宽度随元素的内容而变化</p>
                </div>
            </div>
            <div class="parameter mt-20">
                  <div>
                      <span class="bor-right">width</span>
                      <span class="bor-left">这个属性设置元素的宽度。</span>
                  </div>
                  <div>
                      <span class="bor-right">height</span>
                      <span class="bor-left">这个属性设置元素的高度。</span>
                  </div>
            </div>
            <pre>
                <code class="html">
                   <div class="divwh">
                        <span>aaa</span>
                    </div>
                    <div style="color:red">
                        <p>1.块级元素即使设置了宽度，仍然是独占一行的</p>
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
                    <div style="color:red">
                        <p>2.行内元素不会独占一行，相邻的行内元素会排列在同一行里，
                    知道一行排不下，才会换行，其宽度随元素的内容而变化</p>
                    </div>
                </code>
            </pre>
             <pre>
                <code class="scss">
                    .divwh{
                        border:1px solid #95b3d7;
                        width:300px;
                        height:100px;
                    }
                    .spanwh{
                        border:1px solid #95b3d7;
                        width:200px;
                        height:200px;
                    }
   
                </code>
            </pre>
        </div>

    </div>
</template>
<style>
 .divwh{
        border:1px solid #95b3d7;
        width:300px;
        height:100px;
    }
    .spanwh{
        border:1px solid #95b3d7;
        width:200px;
        height:200px;
    }

</style>