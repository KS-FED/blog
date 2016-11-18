<template>
 <div class="parameterl">
   				<div class="explaininfo">
                    <p>1.position==absolute本身不加top,left,right,bottom,父级不加relative</p>
                    <p>1.1---脱离文档留,在元素里</p>
                </div>
                <div class="">
					<div >
					  <h2 class="pos">这是带有绝对定位的标题1</h2>
					  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

					</div>
				</div>
				<br/><br/><br/><br/>
				
				<div class="explaininfo">
                    <p>2.position==absolute本身加top,left,right,bottom,父级不加relative</p>
                    <p>2.1---脱离文档留,相对于body去定位</p>
                </div>
				<div >
				  <h2 class="pos_abs">这是带有绝对定位的标题2</h2>
				  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

				</div>
				<br/><br/><br/><br/>

				<div class="explaininfo">
                    <p>3.position==absolute本身不加top,left,right,bottom,父级加relative</p>
                    <p>3.1---脱离文档留,在元素里</p>
                </div>
                <div class="pr">
					<div >
					  <h2 class="pos">这是带有绝对定位的标题3</h2>
					  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

					</div>
				</div>
				<br/><br/><br/><br/>
				
				<div class="explaininfo">
                    <p>4.position==absolute本身加top,left,right,bottom,父级加relative</p>
                    <p>4.1---脱离文档留,相对于父元素进行定位</p>
                </div>
				<div class="pr">
				  <h2 class="pos_abs">这是带有绝对定位的标题4</h2>
				  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

				</div>
				<br/><br/><br/><br/>

				<div class="explaininfo">
                    <p>5.position==absolute本身加top,left,right,bottom,父级加relative</p>
                    <p>5.1---脱离文档留,相对于父元素进行定位</p>
                    <p>5.2---相对于最近的非 static 定位祖先元素的偏移,所以第二个随着第一个absolute偏移</p>
                </div>
				<div class="pr">
				  <div class="pos_abs f40">这是带有绝对定位的标题5
				   	<div class="pos_abs f40">这是带有绝对定位的标题5</div>
				  </div>
				  <h2 class="pos_abs f40">这是带有绝对定位的标题5
				   	<h2 class="pos_abs f40">这是带有绝对定位的标题5</h2>
				  </h2>
				  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

				</div>
				<br/><br/><br/><br/>

				<div class="explaininfo">
                    <p>6.position==absolute本身加top,left,right,bottom,父级加relative</p>
                    <p>6.1---脱离文档留,相对于父元素进行定位</p>
                    <p>6.2---相对于最近的非 static 定位祖先元素的偏移,但是没有加top,left,right,bottom,所以脱离文档留,在元素里</p>
                </div>
				<div class="pr">
				  <div class="pos_abs f40">这是带有绝对定位的标题6
				   	<div class="pos f40">这是带有绝对定位的标题6</div>
				  </div>
				  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>

				</div>
				<br/><br/><br/><br/>
<pre>
 <code class="scss">
     .pos{
		position:absolute;
		color:green;

	}

	.pos_abs
	{
		position:absolute;
		left:10px;
		top:10px
	}

</code>
</div>
</template>
<style>
	.pos{
		position:absolute;
		color:green;

	}

	.pos_abs
	{
		position:absolute;
		left:10px;
		top:10px
	}
	.f40{
		font-size: 40px;
	}

</style>