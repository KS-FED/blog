<template>
<div>
   <div class="param">
        <div class="questioninfo f15  mb-10">
            <p class="lh40">以flex为入口（写出flex的特性，每个特性的dome），引出box 进而关联到pc上display:table </p>

        </div>
        <div class="questioninfo f15  mb-10">
            <p class="lh40">问题1:display有哪些属性？</p>

        </div>

        <div class="bor-top">
            <p class="lh30 mt-10">none | inline | block | list-item | inline-block | table | inline-table | table-caption | table-cell | table-row | table-row-group | table-column | table-column-group | table-footer-group | table-header-group | run-in | box | inline-box | flexbox | inline-flexbox | flex | inline-flex其余可以参考w3c文档</p>

             <p class="lh30 mt-20">下面列几个重要的取值如下:</p>
             <div class="highlight">
                <pre>
    <code class="language-css">
    <div style="border:1px solid red">
    <span class="nt">table</span><span class="o">:</span><span class="nt">指定对象作为块元素级的表格。类同于html标签"table"（CSS2）</span>

    <span class="nt">inline-table</span><span class="o">:</span><span class="nt">指定对象作为内联元素级的表格。类同于html标签"table"（CSS2）</span>

    <span class="nt">table-cell</span><span class="o">:</span><span class="nt">指定对象作为表格单元格。类同于html标签"td"（CSS2）</span>

    <span class="nt">table-row</span><span class="o">:</span><span class="nt">指定对象作为表格行。类同于html标签"tr"（CSS2）</span>
    </div>
    <div style="border:1px solid red">
    <span class="nt">box</span><span class="o">:</span><span class="nt">将对象作为弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）</span>

    <span class="nt">inline-box</span><span class="o">:</span><span class="nt">将对象作为内联块级弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）</span>

    <span class="nt">flexbox</span><span class="o">:</span><span class="nt">将对象作为弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）</span>

    <span class="nt">inline-flexbox</span><span class="o">:</span><span class="nt">将对象作为内联块级弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）</span>

    <span class="nt">flex</span><span class="o">:</span><span class="nt">将对象作为弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）</span>

    <span class="nt">inline-flex</span><span class="o">:</span><span class="nt">将对象作为内联块级弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）</span>  
    </div>
    </code>
                </pre>
            </div>
        </div>
   </div>








    <div class="param">
        <div class="questioninfo f15  mb-10">
            <p class="lh40">问题2:flex有哪些特性？？</p>

        </div>

        <div class="bor-top">
            <p class="lh30 mt-10">flex-direction | flex-wrap | flex-flow | justify-content | align-items | align-content</p>

            <p class="lh30 mt-20">下面列几个重要的取值如下:</p>
            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">justify-content</span><span class="o">:</span><span class="nt">属性定义了项目在主轴上的对齐方式。</span>

    <span class="nt">align-items</span><span class="o">:</span><span class="nt">属性定义项目在交叉轴上如何对齐。</span>
    </code>
                </pre>
            </div>



            <p class="lh30 mt-20">2.1 justify-content在主轴上的案例如下:</p>
            <div class="highlight">
                <pre>
                <code class="language-css">justify-content: flex-start | flex-end | center | space-between | space-around;依次展示</code>
                </pre>

                <div class="box">
                    <p>左对齐</p>
                    <div class="boxitemflex flexjcstart" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>

                <div class="box">
                    <p>右对齐</p>
                    <div class="boxitemflex flexjcend" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>

                <div class="box">
                    <p>居中对齐</p>
                    <div class="boxitemflex flexjccenter" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>

                <div class="box">
                    <p>两端对齐，间隔相等。</p>
                    <div class="boxitemflex flexjcspacebetween" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>

                <div class="box">
                    <p>每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。</p>
                    <div class="boxitemflex flexjcspacearound" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
            </div>




            <p class="lh30 mt-20">2.2 align-items在交叉轴上的案例如下:</p>
            <div class="highlight">
                <pre>
                <code class="language-css">align-items: flex-start | flex-end | center | baseline | stretch;依次展示</code>
                </pre>

                <div class="box">
                    <p>上对齐</p>
                    <div class="boxitemflex flexaistart" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>

                <div class="box">
                    <p>下对齐</p>
                    <div class="boxitemflex flexaiend" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>

                <div class="box">
                    <p>居中对齐</p>
                    <div class="boxitemflex flexaicenter" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>

                <div class="box">
                    <p>项目的第一行文字的基线对齐。</p>
                    <div class="boxitemflex flexaibaseline" >
                        <div class="bgblue flexoneh f10  cf">111</div>
                        <div class="bgblue flextwoh f15 cf">222</div>
                        <div class="bgblue flexthreeh f20 cf">333</div>
                    </div>
                </div>

                <div class="box">
                    <p>如果项目未设置高度或设为auto，将占满整个容器的高度。</p>
                    <div class="boxitemflex flexaistretch" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
            </div>



            <p class="lh30 mt-20">2.3 justify-content | align-items 都介绍完了,元素居中就实现了。案例如下</p>
            <div class="highlight bor-red">
                 <div class="boxitemflex flexjccenter flexaicenter" >
                        <div class="bgblue  flexoneh"></div>
                        <div class="bgblue  flextwoh"></div>
                        <div class="bgblue  flexthreeh"></div>
                 </div>
            </div>
                
        </div>
   </div>










    <div class="param pt-60">
        <div class="questioninfo f15  mb-10">
            <p class="lh40">问题3:即使flex是弹性伸缩盒子，但是手机端还有些不支持，例如国产某某X5内核神器（解决UC浏览器、微信浏览器兼容性问题）？？</p>

        </div>
        <div class="bor-top">
            <p class="lh30 mt-10">针对不支持的我们提出老版本和新版本结合的方式。display:box，旧语法篇。
            <div class="bor-red p-10">
                <p class="lh30 mt-10"> 前者是flex 2012年的语法，也将是以后标准的语法，大部分浏览器已经实现了无前缀版本。</p>
                <p class="lh30 mt-10">   后者是box 2009年的语法，已经过时，是需要加上对应前缀的。</p></p>
            </div>

            <p class="lh30 mt-20">目前没有浏览器支持 box-pack 属性。Firefox 支持替代的 -moz-box-pack 属性。Safari、Opera 以及 Chrome 支持替代的 -webkit-box-pack 属性。下面列几个重要的取值如下:</p>
            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">box-pack</span><span class="o">:</span><span class="nt">属性定义了项目在主轴上的对齐方式。</span>

    <span class="nt">box-align</span><span class="o">:</span><span class="nt">属性定义项目在交叉轴上如何对齐。</span>
    </code>
                </pre>
            </div>

            <p class="lh30 mt-20">3.1 box-pack在主轴上的案例如下(以谷歌Chrome为例子):</p>
            <div class="highlight">
                <pre>
                <code class="language-css">box-pack: start | end | center | justify;依次展示</code>
                </pre>

                <div class="box">
                    <p>左对齐</p>
                    <div class="boxitembox boxpacks" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
                <div class="box">
                    <p>右对齐</p>
                    <div class="boxitembox boxpacke" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
                <div class="box">
                    <p>剧中对齐</p>
                    <div class="boxitembox boxpackc" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
                <div class="box">
                    <p>两端对齐，间隔相等</p>
                    <div class="boxitembox boxpackj" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
            </div>


            <p class="lh30 mt-20">3.2 box-align在交叉轴上的案例如下(以谷歌Chrome为例子):</p>
            <div class="highlight">
                <pre>
                <code class="language-css">box-align: start | end | center | baseline | stretch;依次展示</code>
                </pre>

                <div class="box">
                    <p>上对齐</p>
                    <div class="boxitembox boxaligns" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>
                <div class="box">
                    <p>下对齐</p>
                    <div class="boxitembox boxaligne" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>
                <div class="box">
                    <p>居中对齐</p>
                    <div class="boxitembox boxalignc" >
                        <div class="bgblue flexoneh"></div>
                        <div class="bgblue flextwoh"></div>
                        <div class="bgblue flexthreeh"></div>
                    </div>
                </div>
                <div class="box">
                    <p>项目的第一行文字的基线对齐。</p>
                    <div class="boxitembox boxalignb" >
                        <div class="bgblue flexoneh f10  cf">111</div>
                        <div class="bgblue flextwoh f15 cf">222</div>
                        <div class="bgblue flexthreeh f20 cf">333</div>
                    </div>
                </div>
                <div class="box">
                    <p>如果项目未设置高度或设为auto，将占满整个容器的高度。</p>
                    <div class="boxitembox boxalignstr" >
                        <div class="bgblue flexonew"></div>
                        <div class="bgblue flextwow"></div>
                        <div class="bgblue flexthreew"></div>
                    </div>
                </div>
            </div>
            
            <p class="lh30 mt-20">3.3 box-pack | box-align 都介绍完了,元素居中就实现了。(以谷歌Chrome为例子)的案例如下</p>
            <div class="highlight bor-red">
                 <div class="boxitembox boxpackc boxalignc" >
                        <div class="bgblue  flexoneh"></div>
                        <div class="bgblue  flextwoh"></div>
                        <div class="bgblue  flexthreeh"></div>
                 </div>
            </div>

        </div>
    </div>




    
    <div class="param pt-60">
        <div class="questioninfo f15  mb-10">
            <p class="lh40">问题4:flex和box都已经介绍完了，那么兼容写法应该怎么写呢？？</p>

        </div>
        <div class="bor-top">
            <p class="lh30 mt-20">4.1  首先定义容器的display属性,下面是大致范围，来自"http://caniuse.com/#search=flex"摘抄</p>

            <p class="lh30 mt-20 bor-red p-10">
                    根据CanIUse的数据可以总结如下：

                    IE10部分支持2012，需要-ms-前缀。

                    Android4.1/4.2-4.3部分支持2009 ，需要-webkit-前缀。

                    Safari7/7.1/8部分支持2012， 需要-webkit-前缀。

                    IOS Safari7.0-7.1/8.1-8.3部分支持2012，需要-webkit-前缀。

                    但是box-pack和box-align是不兼容IE的。
            </p>
            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">display</span><span class="o">:</span><span class="nt">box</span> <span class="o">;</span><span class="c">/* Android 4.4- */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">-webkit-box</span> <span class="o">;</span><span class="c">/* Chrome 4+, Safari 3.1-6, iOS Safari 3.2+ */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">-moz-box</span><span class="o">;</span><span class="c">/* Firefox 19- */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">-webkit-flex</span><span class="o">;</span><span class="c">/* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">-moz-flex</span><span class="o">;</span><span class="c">/* Firefox 18+ */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">-ms-flexbox</span><span class="o">;</span><span class="c">/* IE 10 */</span>

    <span class="nt">display</span><span class="o">:</span><span class="nt">flex</span><span class="o">;</span><span class="c">/* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */</span>
    </code>
                </pre>
            </div>
        </div>

        <div class="bor-top">
            <p class="lh30 mt-20">4.2  其次,子元素主轴对齐方式</p>

            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">-webkit-box-pack</span><span class="o">:</span><span class="nt">center</span> <span class="o">;</span><span class="c"></span>

    <span class="nt">-webkit-justify-content</span><span class="o">:</span><span class="nt">center</span> <span class="o">;</span><span class="c"></span>

    <span class="nt">-moz-justify-content</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">-ms-justify-content</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">-o-justify-content</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">justify-content</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    </code>
                </pre>
            </div>
        </div>

        <div class="bor-top">
            <p class="lh30 mt-20">4.3  最后,子元素交叉轴对齐方式</p>

            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">-webkit-box-align</span><span class="o">:</span><span class="nt">center</span> <span class="o">;</span><span class="c"></span>

    <span class="nt">-moz-align-items</span><span class="o">:</span><span class="nt">center</span> <span class="o">;</span><span class="c"></span>

    <span class="nt">-webkit-align-item</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">-ms-align-items</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">-o-align-items</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    <span class="nt">align-items</span><span class="o">:</span><span class="nt">center</span><span class="o">;</span><span class="c"></span>

    </code>
                </pre>
            </div>
        </div>
    </div>




    

     <div class="param pt-60">
        <div class="questioninfo f15  mb-10">
            <p class="lh40">问题5:flex布局和table布局这两个都能实现剧中效果，那么有什么区别呢？？</p>

        </div>
         <div class="bor-top">
            <p class="lh30 mt-10">5.1 刚在讲过的flex布局中flex兼容IE11以上，IE10 加前缀-ms,box兼容IE10,加前缀-ms,不过没有关系我们有table一样可以实现剧中的效果(IE8以上，已经写过案例证明过了)</p>

            <p class="lh30 mt-20">下面列几个重要的取值如下:</p>
            <div class="highlight">
                <pre>
    <code class="language-css">
    <span class="nt">table</span><span class="o">:</span><span class="nt">指定对象作为块元素级的表格。类同于html标签"table"（CSS2）</span>

    <span class="nt">inline-table</span><span class="o">:</span><span class="nt">指定对象作为内联元素级的表格。类同于html标签"table"（CSS2）</span>

    <span class="nt">table-cell</span><span class="o">:</span><span class="nt">指定对象作为表格单元格。类同于html标签"td"（CSS2）</span>

    <span class="nt">table-row</span><span class="o">:</span><span class="nt">指定对象作为表格行。类同于html标签"tr"（CSS2）</span>
    </code>
                </pre>
            </div>
        </div>


        <p class="lh30 mt-20">5.2 用table-row和table-cell实现flex的1:1布局如下:</p>
        <div class="displaytable bor-red">
            <div class="displayrow">
                <div class="displaycol bgblue">
                    单元格1
                </div>
                <div class="displaycol bggreen">
                    单元格2
                </div>
            </div>
            
        </div>

        <pre>
            <code class="html">
    <div class="displaytable bor-red">
        <div class="displayrow">
            <div class="displaycol bgblue">
                单元格1
            </div>
            <div class="displaycol bgblue">
                单元格2
            </div>
        </div>
    </div>
            </code>
        </pre>



        <p class="lh30 mt-20">5.3 用table-row和table-cell和vertical-align实现居中布局如下:</p>
        <div class="displaytable bor-red mb-20">
            <div class="displayrow">
                <div class="displaycol bgblue h50">
                    单元格1(1:1)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2(1:1)
                </div>
               
            </div>
        </div>
        <div class="displaytable bor-red mb-20">
            <div class="displayrow">
                <div class="displaycol w-150 bgblue h50">
                    单元格1(固定宽度)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2
                </div>
            </div>
        </div>
        <div class="displaytable bor-red">
            <div class="displayrow">
                <div class="displaycol-auto  bgblue h50">
                    单元格1(没有宽度)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2
                </div>
            </div>
        </div>

        <pre>
            <code class="html">
        <div class="displaytable bor-red mb-20">
            <div class="displayrow">
                <div class="displaycol bgblue h50">
                    单元格1(1:1)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2(1:1)
                </div>
               
            </div>
        </div>
        <div class="displaytable bor-red mb-20">
            <div class="displayrow">
                <div class="displaycol w-150 bgblue h50">
                    单元格1(固定宽度)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2
                </div>
            </div>
        </div>
        <div class="displaytable bor-red">
            <div class="displayrow">
                <div class="displaycol-auto  bgblue h50">
                    单元格1(没有宽度)
                </div>
                <div class="displaycol bggreen h50">
                    单元格2
                </div>
            </div>
        </div>
            </code>
            <code class="css">
        .displayrow{
            display: table-row;
            table-layout:fixed
        }
        .displaycol{
            display: table-cell;
            vertical-align: middle;
        }
        .displaycol-auto{
            display: table-cell;
            table-layout:auto;
            width:1px;
            white-space: nowrap;
            vertical-align: middle;
        }
        .displaycol-top{vertical-align: top}
            </code>
        </pre>





    </div>













</div>


</template>
<style>

.param{width:80%;margin:0 auto;}
.questioninfo{color:#259;}
.w-150{width:150px;}
.highlight {
    width: auto;
    overflow: auto;
    word-wrap: normal
}
.h50{height:50px;}
.bor-red{border:1px solid red}
.box{width:100%;border:1px solid red;box-sizing:border-box;margin-bottom:20px;height: 100px}
.boxitemflex{display: flex;height:50px;}
.boxitembox{display: -webkit-box;display: -moz-box;display:-ms-flexbox;height:50px;}
.bgblue{background:blue;margin:0 10px;}
.bggreen{background:green;margin:0 10px;}

.flexonew{width:50px;}
.flextwow{width:100px;}
.flexthreew{width:150px;}

.flexjcstart{justify-content:flex-start;}
.flexjcend{justify-content:flex-end;}
.flexjccenter{justify-content:center;}
.flexjcspacebetween{justify-content:space-between;}
.flexjcspacearound{justify-content:space-around;}


.flexoneh{width:100px;height:20px;}
.flextwoh{width:100px;height:30px;}
.flexthreeh{width:100px;height:50px;}

.flexaistart{align-items:flex-start;}
.flexaiend{align-items:flex-end;}
.flexaicenter{align-items:center;}
.flexaibaseline{align-items:baseline;}
.flexaistretch{align-items:stretch;}



.boxpacks{-webkit-box-pack:start;-moz-box-pack:start;}
.boxpacke{-webkit-box-pack:end;-moz-box-pack:end;}
.boxpackc{-webkit-box-pack:center;-moz-box-pack:center;}
.boxpackj{-webkit-box-pack:justify;-moz-box-pack:justify;}

.boxaligns{-webkit-box-align:start;-moz-box-align:start;}
.boxaligne{-webkit-box-align:end;-moz-box-align:end;}
.boxalignc{-webkit-box-align:center;-moz-box-align:center;}
.boxalignb{-webkit-box-align:baseline;-moz-box-align:baseline;}
.boxalignstr{-webkit-box-align:stretch;-moz-box-align:stretch;}

.displaytable{
    display:table;
    color:#fff;
    width:100%;
    
}
.displayrow{
    display: table-row;
    table-layout:fixed
}
.displaycol{display: table-cell;vertical-align: middle;}
.displaycol-auto{display: table-cell;table-layout:auto;width:1px;white-space: nowrap;vertical-align: middle;}
.displaycol-top{vertical-align: top}




</style>