<template>

    <div style="padding:20px 100px;">
        <h2>技术分享 👌</h2>
        <br>
        <a class="h3" v-link="{name:'hightlight'}">hightlight 高亮代码demo</a><br>
        <a class="h3" v-link="{name:'classifyone'}">块级元素和行内元素区别</a><br>
        <a class="h3" v-link="{name:'classifyreplace'}">替换元素和非替换元素区别</a><br>
        <a class="h3" v-link="{name:'example1'}">IOS8的坑</a><br>
        <a class="h3" v-link="{name:'tablecompare'}">table比较</a><br>
        <a class="h3" v-link="{name:'position'}">position定位</a><br>
    </div>
</template>
<script >
    export default {
        data (){
            return {

            }
        },
        ready (){
        }
    }
</script>