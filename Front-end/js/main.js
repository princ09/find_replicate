var FileList = {
    props:[
        'filename'
    ],
    data(){
        return{
            emp_name :""
        }
    },
    methods:{
        getFile(){
            
            axios.get('http://localhost:3000/config/?file='+this.filename).then(response => {
             var json_of_file = response.data;
             this.emp_name = json_of_file[0].employee_name;

            });
        }
    },
    created(){
        this.getFile();
    },
    template:`
    <p>{{this.emp_name}}</p>
    `
}


var TempFileList = {
    props: [
        'getList'
    ],
    data() {
        return {

            common_list: []

        }
    },
    components: {
        'file_list':FileList
    },
    methods: {
        getData() {
            axios.get('http://localhost:3000/common').then(response => {
                this.common_list = response.data;
                console.log(this.config_list);


            });
        }

    },

    created() {
        this.getData();
    },
    template: `
     <div>
     <ul>
         <li v-for="name in common_list">
            <b>Filename:</b> {{name.name}}<file_list :filename="name.name"><file_list>
         </li>
     </ul>
   </div>
     `
}

var ConfigFileList = {

    data() {
        return {
            config_list: [],
            employee_names:[]
        }
    },
    methods: {
        getData() {
            axios.get('http://localhost:3000/config').then(response => {
                this.config_list = response.data;
                

            });
        },
        getFileContent(name){
            
            return json_name;
        }
    },

    components: {
        //'list':\
        'file_list':FileList
    },
    mounted() {
        this.getData();
    },
    created() {

    },
    template: `
       <div>
         <ul>
             <li v-for="name in config_list">
             <b>Filename:</b> {{name.name}}<file_list :filename="name.name"><file_list>
                 
         </ul>
       </div>
     
   
   `
}

var Main = {
    data() {
        return {
            //   getList:[]
        }
    },
    /* methods:{
             get_List(config_list){
                 console.log(config_list);
                 this.getList = config_list;
                
             }
         },
     */
    components: {
        //'list':List
        'config_list': ConfigFileList,
        'temp_list': TempFileList
    },

    template: `
         <div clas="container">
         <div class="row">
             <div class="col-md-4">
                 <config_list ></config_list>
             </div>
             <div class="col-md-2">
                 <button>Replicate</button>
             </div>
             <div class="col-md-4">
                 <temp_list></temp_list>
             </div>
             <div class="col-md-2">
                 <button>Patch</button>
             </div>
         </div>
     </div>
             
       
         `
}
const bus = new Vue();
var myObject = new Vue({
    //router,
    el: '#app',

    components: {
        //'list':List,
        'parent': Main


    }
});