<template>
    <Breadcrumb>
        <BreadcrumbItem 
          
        >{{'首页'}}<span v-if="title">{{title}}</span></BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    data(){
           return{
                 currentPath:[],
                 title:'',      
           }
    },
    methods: {
    },
    mounted(){
            this.title= localStorage.getItem('title')=='undefined'?'':localStorage.getItem('title')
    },
    watch:{
        '$route'(to){
            this.title= localStorage.getItem('title')=='undefined'?'':localStorage.getItem('title')
             //   this.title= to.matched[1].meta.title      
        }
    }
};
</script>

