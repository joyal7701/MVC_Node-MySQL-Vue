<template>
    <div class="panelbox">
        <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>Clients</h1>
                </div>
                <div class="right-admindetail">
                    <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
                </div>
            </div>
            <div class="content-page">
                <div>
                    <input type="text" v-model="filter.name"  />
                    <button class="save" @click="filterSearch">Submit</button>
                    <button v-if="filter.is_filter == 1" @click="removeSearch">remove</button>
                    <p v-if="filter.is_filter == 1">Showing {{this.filter.search_count}} on {{page}} page</p>
                </div>
        <div class="header">
        <router-link :to="{name: 'create_client'}">Add Client</router-link>
        </div>
        
        <div class="list-wrap">
            <table class="table is-striped is-bordered mt-2 is-fullwidth">
                <tbody>
                   
                    <tr v-for='data in clients' :key="data.id">
                        <td> {{data.name}}({{data.country}}) </td>
                        <td> <div><div>{{data.email}}</div><div>{{data.phone}}</div></div> </td>
                        <td>
                            <!-- <div> <button type="button" @click="editClient(data.id)">Edit</button> <button type="button" @click="deleteClient(data.id)">Delete</button></div> -->
                            <router-link
                        :to="{ name: 'edit_client', params: { id: data.id } }"
                        class="button is-info is-small"
                    >Edit</router-link>
                    <a class="button is-info is-small" @click="deleteClinets(data.id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
         <!-- Pagination -->
         <div class="clearfix btn-group col-md-2 offset-md-5">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="prevPage"> Prev </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+2)" :key="pageNumber" @click="pageCount(pageNumber)"> {{pageNumber}} </button>
            <button type="button" @click="nextPage" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> Next </button>
          </div>
    </div>
    </div>
    </div>
</template>

<script>
import LeftPannel from './LeftPannel.vue';
import axios from "axios";
 export default {
//     name: 'clients',
    components: {
        LeftPannel,
    },
    data() {
        return {
            clients: [],
            filter_clients: [],
            name: '',
            page: 1,
            result_length: '',
            perPage: 1,
            pages: [],
            filter: {
                name: '',
                is_filter: 0,
                search_count: '',
            },
            id: '',
            
        }
    },
     created() {
        this.getClient();
        axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                this.id = res.data.user.id;
                // this.$router.push('/login');
                // this.email = res.data.user.email;
                this.name = res.data.user.name;
                if(res.data.user.is_business == 1){
                    this.$router.push('/clients');
                }else{
                    this.$router.push('/business_setting');
                }
        });
    },
    watch: {
        clients () {
            this.setPages();
        }
    },
    methods: {
        //page number wise display
        pageCount(pageNumber) {
            if(!pageNumber){
                this.page++;
            }
            this.page = pageNumber;
            
            this.getClient();
        },
        //display prev page
        prevPage() {
            this.page--;
            this.getClient();
        },
        //display next page
        nextPage() {
            this.page++;
            this.getClient();
        },
        //filter
        async filterSearch() {
                this.page = 1;
                const params = '?pages='+this.page + '&size=' + this.perPage;
                console.log(params);
                await axios.post("http://localhost:5000/client_search"+ params, {
            name: this.filter.name,
            admin_id: this.id,
            
            }).then((res) => {
                this.clients = res.data.results;
                this.page = res.data.page;
                this.result_length = res.data.length.length;
                // this.filter.name = '';
                this.filter.is_filter = 1;
                this.filter.search_count = res.data.length.length;
               console.log(res.data);
           });
            
           
        },
        //remove filter
        async removeSearch() {
                this.filter.name = '';
                await axios.post("http://localhost:5000/client_search", {
            name: this.filter.name,
            admin_id: this.id,
            
            }).then((res) => {
                this.clients = res.data;
                
                // this.filter.name = '';
                this.filter.is_filter = 0;
               console.log(res.data);
           });
            
           
        },
        //client list
        async getClient() {
            try {
                
                const params = '?pages='+this.page + '&size=' + this.perPage;
                const response = await axios.get("http://localhost:5000/clients" + params, { headers: { token: localStorage.getItem('token')}});
                this.clients = response.data.results;
                this.page = response.data.page;
                this.result_length = response.data.length.length;
            } catch (err) {
                console.log(err);
            }
        },
        //delete client
        async deleteClinets(id) {
            try {
                await axios.delete(`http://localhost:5000/clients/${id}`).then(() => {
                     this.$router.go();
                });
                this.getClient();
            } catch (err) {
                console.log(err);
            }
        },
        setPages () {
            this.pages = [];
            let numberOfPages = Math.ceil(this.result_length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
    },
   
    
 }
</script>