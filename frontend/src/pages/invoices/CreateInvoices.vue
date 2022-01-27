<template>

    <div class="panelbox">
        
            <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>New Invoice</h1>
                </div>
                <div class="right-admindetail">
                    <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
                </div>
            </div>
            <div class="content-page">
            <div class="top-section">
                <div class="container">
                    <form @submit.prevent>
                        <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                        <div class="form-field">
                            <label for="invoice_no">Invoice No.</label>
                            <input type="text" name="invoice_no" v-model="formData.invoice_no" />
                        </div>
                        <div class="form-field">
                            <label for="currency">Currency</label>
                            <select  name="currency" v-model='formData.currency' >
                                <option value='0' >Currency</option>
                                <option v-for='data in currencise' :value='data.code' :key='data.code'>{{ data.code }}</option>
                            </select>
                        </div>
                       
                    </form>
                </div>
            </div>
            <div class="section">
                <div class="container">
                    <div class="form_wrap">
                        <form @submit.prevent>
                            
                            <div>
                                <div class="form-field">
                                    <label for="from">From</label>
                                    <div>
                                        <span>{{formData.name}},</span><br>
                                        <span>{{formData.address}}</span></div>
                                    <input type="hidden" name="from" v-model="formData.from"/>
                                    <!-- <textarea  name="from" v-model="formData.from"></textarea> -->
                                </div>
                                <div class="form-field">
                                    <label for="date">Date</label>
                                    <input type="date" name="date" v-model="formData.date" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="to">To</label>
                               <select  name="currency" v-model='formData.client' >
                                <option v-for='data in clients' :value='data.id' :key='data.id'>{{ data.name }}</option>
                            </select><router-link to="create_client">New Client</router-link>
                            </div>
                            <div class="form-field">
                                    <label for="date">Due Date</label>
                                    <input type="date" name="date" v-model="formData.due_date" />
                                </div>

                            <div class="invoice_desc">
                                <table>
                                    <tr>
                                        <td >Description</td>
                                        <td >Quantity</td>
                                        <td>Rate</td>
                                        <td>Amount</td>
                                    </tr>
                                    <tr v-for="(invoice_product, k) in invoice_products" :key="k">
                                        <td>
                                            <input class="form-control" type="text" v-model="invoice_product.description" />
                                        </td>
                                        <td>
                                            <input class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.qty" @change="calculateLineTotal(invoice_product)"
                                            />
                                        </td>
                                        <td>
                                            <input class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.price" @change="calculateLineTotal(invoice_product)"
                                            />
                                        </td>
                                        <td>
                                            <input readonly class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.amount" />
                                        </td>
                                        <td scope="row" class="trashIconContainer" v-if="k >= 1">
                                            <i class="far fa-trash-alt" @click="deleteRow(k, invoice_product)">Remove</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button type='button' class="btn btn-info" @click="addNewRow">Add</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>{{invoice_subtotal}}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td >
                                            <select  name="currency" v-model='formData.tax' @change="taxChange($event)">
                                                <option value='0' >Tax</option>
                                                <option v-for='data in select_tax' :value='data.tax_rate' :key='data.id'>{{ data.tax_name}} - {{ data.tax_rate}} %</option>
                                            </select>
                                           
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total (USD)</td>
                                        <td>{{invoice_total}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="footer_notes">
                                <div><textarea  name="from" v-model="formData.notes"></textarea></div>
                                <div><button>Edit Default Footer</button></div>
                            </div>
                            <div button-wrap>
                                <button class="save" @click="create_invoice">Save</button>
                                 <button class="signup"  >Download PDF</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
    </div>
</template>

<script>
import axios from "axios";
import LeftPannel from '../LeftPannel.vue';
var i = 0;
export default {
    components: {
        LeftPannel,
    },
    data() {
        return {
            currency: 0,
            currencise: [],
            clients: [],
            name: '',
            id: '',
            formData: {
                from: '',
                invoice_no: '',
                name: '',
                currency: '',
                client: '',
                date: new Date().toISOString().substr(0, 10),
                due_date: new Date().toISOString().substr(0, 10),
                address: '',
                notes: '',
                tax: '',
                subtotal: '',
                total: ''
            },
            invoice_products: [{ 
                description: '',
                qty: '',
                price: '',
                admin_id: '',
                invoice_no: '',
                amount: 0,
            }],
            invoice_subtotal: 0,
            invoice_total: 0,
            invoice_tax: 0,
            select_tax: '',
            errors: [],

            
        }
    },
    created: function () {
    this.getCurrency();
    this.getClient();
   
    // this.formData.invoice_no = '20220101';
    axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                this.formData.from =  res.data.user.name + ', ' + res.data.user.address + ', ' + res.data.user.city + ', ' + res.data.user.state + ', ' + res.data.user.pincode + ', ' + res.data.user.country;
                this.formData.address = res.data.user.address + ', ' + res.data.user.city + ', ' + res.data.user.state + ', ' + res.data.user.pincode + ', ' + res.data.user.country;
                this.formData.name = res.data.user.name;
                this.formData.notes = res.data.user.notes;
                this.id = res.data.user.id;
                this.invoice_products[0]['admin_id'] = this.id;
                this.formData.currency = res.data.user.currency;
                
                // this.invoice_products.id = this.id;
              
                this.name = res.data.user.name;
                if(res.data.user.is_business == 1){
                    this.$router.push('/create_invoice');
                }else{
                    this.$router.push('/business_setting');
                }
                this.invoiceSeries();
                });
        axios.get(`http://localhost:5000/tax_details`,{ headers: { token: localStorage.getItem('token')}}).then((res) => {
            this.select_tax = res.data;
            this.formData.tax = res.data[0]['tax_rate'];
            this.invoice_tax = res.data[0]['tax_rate'];
            console.log(res.data[0]['tax_rate']);
            console.log(this.select_tax);
        });
         
  },
    methods: {
        //get currency from database
         async getCurrency() {
            const response = await axios.get("http://localhost:5000/currency");
                console.log(response.data);
                this.currencise = response.data;
        },
        //get client list from database
        async getClient() {
            try {
                const response = await axios.get("http://localhost:5000/clients", { headers: { token: localStorage.getItem('token')}});
                this.clients = response.data;
                console.log(this.clients);
            } catch (err) {
                console.log(err);
            }
        },
        async invoiceSeries(){
            console.log(this.id);
            try {
                
                const response = await axios.post(`http://localhost:5000/invoice_no/${this.id}`);
                this.formData.invoice_no = response.data;
                
            } catch (err) {
                console.log(err);
            }
        },
        //tax rate change
        taxChange(e){
            
            this.invoice_tax = e.target.value;
            this.formData.tax = this.invoice_tax;
            this.calculateTotal();
        },
        //add dynamic row
        addNewRow() {
            
            // console.log(this.invoice_products[0]['description']);
            // if(this.invoice_products[i]['description'].length >= 1){
            //     console.log(i);
                i++;
            //     console.log(i);
            this.invoice_products.push({
                
                description: '',
                price: '',
                qty: '',
                admin_id: this.id,
                invoice_no: this.formData.invoice_no,
                amount: 0,
            });
            // }
        },
        //total and subtotal calculate
        calculateTotal() {
            var subtotal, total;
            subtotal = this.invoice_products.reduce(function (sum, product) {
                var lineTotal = parseFloat(product.amount);
                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);

            this.invoice_subtotal = subtotal.toFixed(2);
            total = this.invoice_products.reduce(function (sum, product) {
                var lineTotal = parseFloat(product.amount);
                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);
            
            this.invoice_total = total.toFixed(2);
            this.formData.subtotal = this.invoice_subtotal;
            this.invoice_products[0]['invoice_no'] = this.formData.invoice_no;

            total = (subtotal * (this.invoice_tax / 100)) + subtotal;
            total = parseFloat(total);
            if (!isNaN(total)) {
                this.invoice_total = total.toFixed(2);
                this.formData.total = this.invoice_total;
            } else {
                this.invoice_total = '0.00';
                this.formData.total = this.invoice_total;
            }
        },
        //row calculate
        calculateLineTotal(invoice_product) {
            var total = parseFloat(invoice_product.price) * parseFloat(invoice_product.qty);
            if (!isNaN(total)) {
                invoice_product.amount = total.toFixed(2);
                
            }
            this.calculateTotal();
        },
        //remove row
        deleteRow(index, invoice_product) {
            var idx = this.invoice_products.indexOf(invoice_product);
            console.log(idx, index);
            if (idx > -1) {
                this.invoice_products.splice(idx, 1);
            }
            i--;
            this.calculateTotal();
        },
        //invocie generate
        async create_invoice() {
            
            // this.invoice_products[0]['tax'] = this.invoice_tax;
            this.tax = this.invoice_tax;
            // this.input_products[i]['invoice_no'] = this.formData.invoice_no;
            this.errors = [];
            if(!this.formData.invoice_no){
                 this.errors.push('Invoice No. is Required');
            }
            if(!this.formData.currency){
                this.errors.push('Currency is Required'); 
            }
            if(!this.formData.date){
                this.errors.push('Date is Required'); 
            }
            if(!this.formData.due_date){
                this.errors.push('Due Date is Required'); 
            }
            if(!this.formData.client){
                this.errors.push('Client Name is Required'); 
            }
            if(!this.formData.notes){
                this.errors.push('Notes is Required'); 
            }
            if(this.invoice_subtotal == 0 && this.invoice_total == 0){
                this.errors.push('Invoice item is Required');
            }
            // if(!this.invoice_products[1]['description']){
            //     this.errors.push('Description is Required');
            // }
            console.log(this.invoice_products[i]['description'].length);
            if(this.invoice_products[i]['description'].length <= 0 || this.invoice_products[i]['price'].length <= 0 || this.invoice_products[i]['qty'].length <= 0){
                 this.errors.push('Field value is Required');
            }
            console.log(this.errors.length);
           
            if(this.errors.length == 0) {
                console.log(this.formData);
              console.log(JSON.stringify(this.invoice_products));
              await axios.post("http://localhost:5000/invoices", {
                    invoice_no: this.formData.invoice_no,
                    admin_id: this.id,
                    currency: this.formData.currency,
                    from_address: this.formData.from,
                    client_id: this.formData.client,
                    date: this.formData.date,
                    due_date: this.formData.due_date,
                    notes: this.formData.notes,
                    subtotal: this.formData.subtotal,
                    total: this.formData.total,
                    tax: this.formData.tax,
                }).then((res) => {
                    console.log(res.data);
                     this.errors.push(res.data);
                    //  if(res.data == "Project Created"){
                    //      this.$router.push({name: 'projects'});
                    //  }
                });

            await axios.post("http://localhost:5000/invoice_details",{
                user_data: this.invoice_products,
            }).then((res) => {
                    console.log(res.data);
                     this.errors.push(res.data);
                     if(res.data == "Invoice Created"){
                         this.$router.push({name: 'invoice'});
                     }
                });
            }
        }
    }
}
</script>