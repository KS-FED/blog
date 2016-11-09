<template>
<div>
   <div class="parameterl">
   				<div class="explaininfo">
                    <p>1.display:-webkit-box属性加的情况下，IOS8以上和以下显示一样</p>
                    <p>1.1---如果是块块的话，对应比例正常显示</p>
                    <p>1.2---如果是块内或者内快的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>
                    <p>1.3---如果是内内的话，内联元素对应显示自己本身</p>
                </div>
                <div class="">
					<p>有display:-webkit-box属性IOS8以上</p>
					<!-- 有 -->
					<div class="example1">
						<p id="p1">Hello</p>
						<p id="p2">W3School</p>
					</div>
					<br/>

					<div class="example1">
						<span id="p1">Hello</span>
						<span id="p2">W3School</span>
					</div>
					<br/>

					<div class="example1">
						<p id="p1">Hello</p>
						<span id="p2">W3School</span>
					</div>
					<br/>

					<div class="example1">
						<span id="p1">Hello</span>
						<p id="p2">W3School</p>
					</div>
					<br/><br/>
				</div>

                 <div class="">
                    <p>有display:-webkit-box属性IOS8以下</p>
                    <!-- 有 -->
                    <div class="example1">
                        <p id="p1">Hello</p>
                        <p id="p2">W3School</p>
                    </div>
                    <br/>

                    <div class="example1">
                        <span id="p1">Hello</span>
                        <span id="p2">W3School</span>
                    </div>
                    <br/>

                    <div class="example1">
                        <p id="p1">Hello</p>
                        <span id="p2">W3School</span>
                    </div>
                    <br/>

                    <div class="example1">
                        <span id="p1">Hello</span>
                        <p id="p2">W3School</p>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
                <div class="explaininfo">
                    <p>2.display:-webkit-box属性不加的情况下，IOS8以上和以下显示不一样</p>
                    <p>2.1---IOS8以上所有内联都会转化成块状并且正常显示</p>
                    <p>2.2---IOS8以下所有块状都会转化成内联显示自己本身</p>
                </div>
                <div class="">
                    <p>没有display:-webkit-box属性IOS8以上</p>
                    <!-- 有 -->
                    <div class="example2">
                        <p id="p1">Hello</p>
                        <p id="p2">W3School</p>
                    </div>
                    <br/>
                    <div class="example2">
                        <span id="p1">Hello</span>
                        <span id="p2">W3School</span>
                    </div>
                    <br/>
                    <!-- 有 -->
                    <div class="example2">
                        <p id="p2">W3School</p>
                        <span id="p1">Hello</span>
                    </div>
                    <br/>
                    <div class="example2">
                        <span id="p1">Hello</span>
                        <p id="p2">W3School</p>
                    </div>
                        <br/><br/>
                </div>

                 <div class="inline">
                    <p>没有display:-webkit-box属性IOS8以下</p>
                    <!-- 有 -->
                   <img src="../../../img/ios8.png"/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>


			<div>
				
			</div>
   </div>

</div>


</template>
<style>
.example1{
    display:flex;
    display:-webkit-flex;
    display:box;
    display:-webkit-box; /*有*/
    display:-moz-flex;
    display:-ms-flexbox;
    width:100%;
    border:1px solid black;
}
.example2{
     display:flex;
    display:-webkit-flex;
    display:box;
    /*display:-webkit-box; 没有*/
    display:-moz-flex;
    display:-ms-flexbox;
    width:100%;
    border:1px solid black;
}



#p1
{
   -webkit-flex:1;
    -webkit-box-flex:1;
    -moz-box-flex:1;
    -ms-flex:1;
    flex: 1;
    border:1px solid red;
}

#p2
{
    -webkit-flex:2;
    -webkit-box-flex:2;
    -moz-box-flex:2;
    -ms-flex:2;
    flex: 2;
    border:1px solid blue;
}
.inline #p1
{
   -webkit-flex:1;
    -webkit-box-flex:1;
    -moz-box-flex:1;
    -ms-flex:1;
    flex: 1;
    border:1px solid red;
    display: inline;
}




</style>