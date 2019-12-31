import Vue from 'vue';
import customTableVue from '../views/main-components/custom-table.vue';
import store from '../store'

const customTableConstructor  = Vue.extend(customTableVue);
let instance;
let customTable = {};
let temp = {};

if(!instance){
    instance = new customTableConstructor({
        el:document.createElement('div'),
        store:store
    });
    document.body.appendChild(instance.$el)
}


function myFunction(e){
    instance.openModel({
        ref:temp.ref,
        columns:temp.columns,
        tableName:temp.tableName,
        data_view_direction:temp.data_view_direction
    })
    e.preventDefault();
}
customTable.openModel = function(options){
    temp = options;
    HTMLCollection.prototype.toArray=function(){
        return [].slice.call(this);
    };
    options.thead.toArray().forEach(function(e, i){
        e.addEventListener('contextmenu',_contextmenu)
    });
    
    function _contextmenu(e){
        if(e.button == 2){
            e.preventDefault();
            options.ref.style.display = 'block';
            let th_offsetLeft = e.pageX - 225;                     
            options.ref.style.top = e.offsetY + 'px';
            options.ref.style.left = th_offsetLeft+ 'px';
        }
    }
    options.ref.addEventListener('contextmenu',(e)=>{
        e.preventDefault();
    })
    options.ref.addEventListener('mousedown',myFunction)
    window.addEventListener('mousedown',(e)=>{
        options.ref.style.display = 'none';
    })
}

export default customTable;