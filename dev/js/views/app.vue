<template>
    <div>
        <router-view ></router-view>
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        ready (){
            function isanzuo_weixin_browser(){
              var ua = navigator.userAgent.toLowerCase()
              return (/micromessenger/.test(ua)) && ~ua.indexOf('android')
            }
            if(isanzuo_weixin_browser()){
                alert(true)
            }

        }
    }
</script>