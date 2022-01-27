<template>
    <div class="panelbox">
        <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>Invoices</h1>
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
                    <router-link :to="{name: 'create_invoice'}">Add New</router-link>
                </div>
        <div class="filter-wrap">
        <div class="filter">
             <input type="checkbox"  @click="checkAll" v-model="formData.isCheckAll">
             <span v-for='data in invoice_cat' :value='data.id' :key='data.name'>
                <button  @click="invoiceUnpaid(data.id)">{{ data.name }}</button> 
             </span>
             
        </div>
        <div>
            <select  name="issort" v-model='formData.isSort' @change="sortChange($event)">
                <option value="" selected>Sort results by</option>
                <option v-for='data in invoice_sort' :value='data.val' :key='data.name' >{{ data.name }}</option>
            </select>
            <select  name="iscat" v-model='formData.isCat' @change="catChange($event)">
                <option value="" selected>Invoice Category</option>
                <option v-for='data in invoice_cat' :value='data.id' :key='data.name' >{{ data.name }}</option>
            </select>
            
        </div>
        <p v-if="is_filter == 1">Showing {{this.search_count}} on {{page}} page</p>
        </div>
        <div class="list-wrap">
            <table class="table is-striped is-bordered mt-2 is-fullwidth">
                <tbody>
                   
                    <tr v-for='data in displayedPosts' :key="data.id">
                        <input type="checkbox"  :value="data.id" @change='updateCheckall()' v-model="formData.checked">
                        <td> {{data.name}} </td>
                        <td> <div>Due: {{convertDate(data.due_date)}}</div> </td>
                        <td>
                            <div>
                                <div>{{data.total}} {{data.currency}}</div>
                                <div v-if="data.is_paid == 0">
                                    <div v-if="dateDifference(this.date, data.due_date) >= 0">Due for {{dateDifference(this.date, data.due_date)}} Days</div>
                                    <div v-else>
                                        Become Due in {{Math.abs(dateDifference(this.date, data.due_date))}} Days
                                    </div>
                                </div>
                                <div v-else>Paid {{convertDate(data.updated_at)}} </div>
                            </div>
                        </td>
                        <td>
                            <div v-if="data.is_paid == 0"><div>Due</div><div><a class="button is-info is-small" @click="paidInvoice(data.id)">click Paid</a></div></div>
                            <div v-else-if="data.is_paid == 1">Paid</div>
                             <div v-else-if="data.is_paid == 2">Archive</div>
                              <div v-else>Cancle</div>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination -->
         <div class="clearfix btn-group col-md-2 offset-md-5">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> Prev </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+2)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
            <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> Next </button>
          </div>
    </div>
    </div>
    </div>
</template>

<script>
import LeftPannel from './LeftPannel.vue';
import axios from "axios";
 export default {
//     name: 'invoices',
    components: {
        LeftPannel,
    },
    data() {
        return {
            invoices: [],
            page: 1,
            perPage: 50,
            pages: [],
            name: '',
            id: '',
            date: new Date().toISOString().substr(0, 10),
            formData: {
                checked: [],
                isCat: '',
                isSort: '',
                isCheckAll: 'false',
                
            },
            filter: {
                name: '',
                is_filter: 0,
                search_count: '',
            },
            search_count: '',
            is_filter: 0,
            invoice_cat:[{id: 2, name:'Archived'},{id: 3, name: 'Cancle'}, {id:1, name: 'Paid'}, {id:0, name: 'Unpaid'}],
            invoice_sort:[{ val:'amt_desc', name:'By Amount Desc'},{val:'dt_desc', name: 'By Date Desc'},{ val:'amt_asc', name:'By Amount Asc'},{val:'dt_asc', name: 'By Date Asc'}],
              
        }
    },
     created() {
        this.getInvoice();
        axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                this.id = res.data.user.id;
                // this.$router.push('/login');
                // this.email = res.data.user.email;
                this.name = res.data.user.name;
                
                this.formData.isCat = "";
                this.formData.isSort = "";
                if(res.data.user.is_business == 1){
                    this.$router.push('/invoices');
                }else{
                    this.$router.push('/business_setting');
                }
        });
        
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.invoices);
        }
    },
    watch: {
        invoices () {
            this.setPages();
        }
    },
    methods: {
        async getInvoice() {
           axios.get("http://localhost:5000/get_inovoice", { headers: { token: localStorage.getItem('token')}}).then((res) => {
                console.log(res.data);
                this.invoices = res.data;
                
            }); 
        },
        setPages () {
            this.pages = [];
            let numberOfPages = Math.ceil(this.invoices.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (invoices) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            
            return  invoices.slice(from, to);
        },
        dateDifference(date, due_date) {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;

            //due date
            var date_due = new Date(due_date);
            var due_year = date_due.getFullYear();
            var due_month = date_due.getMonth()+1;
            var due_dt = date_due.getDate();

            if (due_dt < 10) {
                due_dt = '0' + due_dt;
            }
            if (due_month < 10) {
                due_month = '0' + due_month;
            }
            //current_date
            var curr_date = new Date(date);
            var year = curr_date.getFullYear();
            var month = curr_date.getMonth()+1;
            var dt = curr_date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            
            const date2 = Date.UTC(year, month, dt);
            const date1 = Date.UTC(due_year, due_month, due_dt);
            
                return Math.floor((date2 - date1) / _MS_PER_DAY);
            
            
        },
        convertDate: function(cvt_date){
        var date = new Date(cvt_date);
        var year = date.getFullYear();
        // var month = date.getMonth()+1;
        var month = date.toLocaleString('default', { month: 'short' });

        var dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        
        const cvt_date_formate = month +" "+dt +", "+ year;
        return cvt_date_formate;
        },
        //paid invoice by id set 1
        async paidInvoice(id) {
            try {
                await axios.delete(`http://localhost:5000/paid_invoice/${id}`).then(() => {
                    
                });
                this.getInvoice();
            } catch (err) {
                console.log(err);
            }
        },
        //unpaid multiple set 0
        async invoiceUnpaid(id) {
            console.log(this.formData.checked);//0
            console.log(id);
            try {
                await axios.post(`http://localhost:5000/unpaid_invoices`, {
                    multiple_id: this.formData.checked,
                    cat_id: id,
                }).then((res) => {
                    this.formData.checked = [];
                    
                    console.log(res.data.length);
                });
                this.getInvoice();
            } catch (err) {
                console.log(err);
            }
        },
        
        async checkAll() {
            this.formData.isCheckAll = !this.formData.isCheckAll;
            this.formData.checked = [];
            if(this.formData.isCheckAll){ // Check all
                for (var key in this.invoices) {
                    this.formData.checked.push(this.invoices[key].id);
                   
                }
            }
            
          
        },
        async updateCheckall() {
            if(this.formData.checked.length == this.invoices.length){
                this.formData.isCheckAll = true;
            }else{
                this.formData.isCheckAll = false;
            }
        },
        async catChange(e){
            
            this.formData.isCat = e.target.value;
            console.log(this.formData.isCat);
            await axios.post("http://localhost:5000/invoice_cat_search", {
            sort_by: this.formData.isSort,
            cat_id: this.formData.isCat,
            admin_id: this.id,
            }).then((res) => {
                this.invoices = res.data;
                this.search_count = res.data.length;
                this.is_filter = 1;
                // this.filter.name = '';
              
               console.log(res.data);
           });
        },
        async sortChange(e){
            
            this.formData.isSort = e.target.value;
            console.log(this.formData.isCat);
            await axios.post("http://localhost:5000/invoice_cat_search", {
            sort_by: this.formData.isSort,
            cat_id: this.formData.isCat,
            admin_id: this.id,
            }).then((res) => {
                this.invoices = res.data;
                this.search_count = res.data.length;
                this.is_filter = 1;
                // this.filter.name = '';
              
               console.log(res.data);
           });
        },
        async filterSearch() {
                
                await axios.post("http://localhost:5000/invoices_search", {
            name: this.filter.name,
            admin_id: this.id,
            
            }).then((res) => {
                this.invoices = res.data;
                // this.filter.name = '';
                this.filter.is_filter = 1;
                this.filter.search_count = res.data.length;
               console.log(res.data);
           });
            
           
        },
        async removeSearch() {
            this.filter.name = '';
            await axios.post("http://localhost:5000/invoices_search", {
                name: this.filter.name,
                admin_id: this.id,
            }).then((res) => {
                this.invoices = res.data;
                // this.filter.name = '';
                this.filter.is_filter = 0;
                console.log(res.data);
            }); 
        },
    },
   
    
 }
</script>