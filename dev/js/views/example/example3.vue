<template>
<div>
    <div class="example11">
        <div id="p11">
            <span>111222</span>
        </div>
        <div id="p22">
            <span>222</span>
        </div>
    </div>
</div>



</template>
<style>
.example11{
    display:-webkit-flex;
    /*display:flex;*/

    /*display:box;*/
    /*display:-webkit-box; */
    width:100%;
    border:1px solid black;
}
.example22{
    display:-webkit-flex;
    /*display:flex;*/
    
    /*display:box;*/
    /*display:-webkit-box; */
    /*display:-moz-flex;*/
    /*display:-ms-flexbox;*/
    width:100%;
    border:1px solid black;
}



#p11
{
   -webkit-flex:1;
  /*  -webkit-box-flex:1;
    -moz-box-flex:1;*/
    /*-ms-flex:1;*/
    flex: 1;
    border:1px solid red;
}

#p22
{
    -webkit-flex:2;
/*    -webkit-box-flex:2;
    -moz-box-flex:2;*/
    /*-ms-flex:2;*/
    flex: 2;
    border:1px solid blue;
}


</style>
