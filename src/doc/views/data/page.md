## KsPager 

> 常用的日期组件

---

### 基础使用 （分类）

### page
page_current:{{page_current}}
<ks-page 
    :page_current.sync="page_current" 
    :pages="7"
    :total="100"
    :page_size="13"
    v-on:current_change="current_change"></ks-page>
```html
<ks-page 
    :page_current.sync="page_current" 
    :pages="7"
    :total="100"
    :page_size="13"
    v-on:current_change="current_change"></ks-page>
```


### pageGroup
<ks-page-group
    :page_current.sync="page_current" 
    :pages="7"
    :total="100"
    :page_sizes="[10,17,30]"
    v-on:size_change="size_change"
    v-on:current_change="current_change"></ks-page-group>

```html
<ks-page-group
    :page_current="page_current" 
    :pages="7"
    :total="100"
    :page_sizes="[10,17,30]"
    v-on:size_change="size_change"
    v-on:current_change="current_change"></ks-page-group>
```


```javascript
<script lang="babel">
    export default {
        data(){
            return {
                page_current:1
            }
        },
        methods:{
            current_change(val){
                
            },
            size_change(val){},
           
        }

    }
</script>
```
<script lang="babel">
    export default {
        data(){
            return {
                page_current:1
            }
        },
        methods:{
            current_change(val){
                
            },
            size_change(val){},
           
        }

    }
</script>
