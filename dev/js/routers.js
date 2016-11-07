export default function (Vue,router){
    router.map({

    '/':{
        router_type:'root',
        name:'root',
        component: function(resolve){
            require(['./views/app.vue'],resolve)
        },
        subRoutes:{

            // 会员主页
            '/home':{
                name:'home',
                title:'主页',
                component: function(resolve){
                    require(['./views/home/index.vue'], (res)=> {
                        resolve(res)
                    })
                }
            },

            // 按钮
            '/hightlight':{
                name:'hightlight',
                title:'高亮demo',
                component: function(resolve){
                    require(['./views/hightlight/index.vue'], (res)=> {
                        resolve(res)
                    })
                }
            },

            // 块级元素和行内元素区别
            '/classifyone':{
                name:'classifyone',
                title:'块级元素和行内元素区别',
                component: function(resolve){
                    require(['./views/classify/classifyone.vue'], (res)=> {
                        resolve(res)
                    })
                }
            },
            // 替换元素和非替换元素区别
            '/classifyreplace':{
                name:'classifyreplace',
                title:'替换元素和非替换元素区别',
                component: function(resolve){
                    require(['./views/classify/classifyreplace.vue'], (res)=> {
                        resolve(res)
                    })
                }
            },
            // IOS8的坑
            '/example1':{
                name:'example1',
                title:'IOS8的坑',
                component: function(resolve){
                    require(['./views/example/example1.vue'], (res)=> {
                        resolve(res)
                    })
                }
            },


        }
    }

    })


    router.beforeEach(transition =>{
        if(transition.to.name == 'root') {
            router.go({ name: 'home'})
        }
        transition.next()
    })
    
    router.afterEach(transition =>{
        setTimeout(()=>{
            
            Array.prototype.slice.call(document.querySelectorAll('pre code')).forEach(val=>{
                if(val.className === 'html'){
                    val.innerHTML = val.innerHTML.replace(/</g,'&lt;').replace(/>/g,'&gt;')
                }
                hljs.highlightBlock(val)
            })
        })
        
    })
}