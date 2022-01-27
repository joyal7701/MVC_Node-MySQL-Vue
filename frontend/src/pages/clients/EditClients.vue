<template>
    <div class="panelbox">
        
            <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>Edit Clients</h1>
                </div>
                <div class="right-admindetail">
                    <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
                </div>
            </div>
            <div class="content-page">
         <div class="header">
                <div class="button"><router-link :to="{name: 'clients'}">Back</router-link></div>
            </div>
        <div class="client-wrap">

            <!-- <form @submit.prevent> -->
                <div>
                
                </div>
                <div v-show="data.client_type === 'Individual'">
                    <div class="individual-wrap">
                        <form @submit.prevent method="post">
                            <!-- <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p> -->
                            <div class="form-field">
                                <label for="name">Name</label>
                                <input type="text" name="name" v-model="data.name" />
                                
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="data.email" disabled />
                                    
                                </div>
                                <div class="form-field">
                                    <label for="website">Website URL</label>
                                    <input type="text" name="website"  v-model="data.website"/>
                                </div>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="phone">Phone Number</label>
                                    <input type="number" name="phone" v-model="data.phone" />
                                    
                                </div>
                                <div class="form-field">
                                    <label for="fax">Fax Number</label>
                                    <input type="number" name="fax" v-model="data.fax" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="address">Address</label>
                                <textarea  name="address" v-model="data.address"></textarea>
                                
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="pincode">Postal Code</label>
                                    <input type="number" name="pincode" v-model="data.pincode" />
                                </div>
                                <div class="form-field">
                                    <label for="city">City</label>
                                    <input type="text" name="city" v-model="data.city"/>
                                </div>
                                <div class="form-field">
                                    <label for="state">State</label>
                                    <input type="text" name="state" v-model="data.state" />
                                </div>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="country">Country</label>
                                   <select  name="country" v-model='data.country' >
                                        <option value='0' >Country</option>
                                        <option v-for='data in countries' :value='data.countryname' :key='data.countryname' >{{ data.countryname }}</option>
                                    </select>
                                    
                                </div>
                                 <div class="form-field">
                                    <label for="name">Currency</label>
                                    <select  name="currency" v-model='data.currency' >
                                        <option value='0' >Currency</option>
                                        <option v-for='data in currencise' :value='data.code' :key='data.code'>{{ data.code }}</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="taxno">Tax Identication Number</label>
                                <input type="number" name="taxno" v-model="data.taxno"/>
                            </div>
                            <div class="form-field">
                                <label for="notes">Notes</label>
                                <textarea  name="notes" v-model="data.notes"></textarea>
                            </div>
                            <div class="button-wrap">
                                <button class="save-draft">Save Draft</button>
                                <button class="save" @click="updateClients">Update</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div v-show="data.client_type === 'Organization'">
                    <div class="organization-wrap">
                        <form @submit.prevent method="post" >
                             <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="form-field">
                                <label for="organization">Organization Name</label>
                                <input type="text" name="organization" v-model="data.organization"/>
                                 
                            </div>
                            <div class="form-field">
                                <label for="name">Name</label>
                                <input type="text" name="name" v-model="data.name" />
                                
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="data.email" disabled />
                                    
                                </div>
                                <div class="form-field">
                                    <label for="website">Website URL</label>
                                    <input type="text" name="website" v-model="data.website" />
                                </div>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="phone">Phone Number</label>
                                    <input type="number" name="phone" v-model="data.phone" />
                                    
                                </div>
                                <div class="form-field">
                                    <label for="fax">Fax Number</label>
                                    <input type="number" name="fax"  v-model="data.fax" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="address">Address</label>
                                <textarea  name="address" v-model="data.address"></textarea>
                               
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="pincode">Postal Code</label>
                                    <input type="number" name="pincode"  v-model="data.pincode"/>
                                </div>
                                <div class="form-field">
                                    <label for="city">City</label>
                                    <input type="text" name="city" v-model="data.city" />
                                </div>
                                <div class="form-field">
                                    <label for="state">State</label>
                                    <input type="text" name="state" v-model="data.state" />
                                </div>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="country">Country</label>
                                    <select  name="country" v-model='data.country' >
                                        <option value='0' >Country</option>
                                        <option v-for='data in countries' :value='data.countryname' :key='data.countryname' >{{ data.countryname }}</option>
                                    </select>
                                    
                                </div>
                                <div class="form-field">
                                    <label for="name">Currency</label>
                                    <select  name="currency" v-model='data.currency' >
                                        <option value='0' >Currency</option>
                                        <option v-for='data in currencise' :value='data.code' :key='data.code'>{{ data.code }}</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="taxno">Tax Identication Number</label>
                                <input type="number" name="taxno" v-model="data.taxno" />
                            </div>
                            <div class="form-field">
                                <label for="notes">Notes</label>
                                <textarea  name="notes" v-model="data.notes" ></textarea>
                            </div>
                            <div class="button-wrap">
                                <button class="save-draft">Save Draft</button>
                                <button class="save" @click="updateClients">Update</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            <!-- </form> -->
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LeftPannel from '../LeftPannel.vue'; 
export default {
     components: {
        LeftPannel,
    },
    data() {
        return{
            
            currencise: [],
            currency: 0,
            countries: [],
            country: 0,
            // currencyVal: '',
            name: '',
            data: {
                name: '',
                email: '',
                website: '',
                organization: '',
                phone: '',
                fax: '',
                address: '',
                pincode: '',
                city: '',
                state: '',
                country: '',
                currency: '',
                taxno: '',
                notes: '',
                client_type: 'Individual',
                id: '',
            },
            errors: [],
            success: {},
        }
    },
    created(){
        this.data.country = 'India';
        this.getCurrency();
        this.getCountry();
        this.getClientById();
        axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                // this.id = res.data;
                // this.$router.push('/login');
                // this.email = res.data.user.email;
                this.name = res.data.user.name;
                if(res.data.user.is_business == 1){
                    this.$router.push('/edit_client');
                }else{
                    this.$router.push('/business_setting');
                }
                });
    },
    methods:{
        async getCurrency() {
            const response = await axios.get("http://localhost:5000/currency");
                console.log(response.data);
                this.currencise = response.data;
        },

       async getCountry() {
            const response = await axios.get("http://localhost:5000/country");
                console.log(response.data);
                this.countries = response.data;
        
          
        },
        async getClientById() {
        
      
        const response = await axios.get(
          `http://localhost:5000/clients/${this.$route.params.id}`
        );
       
        this.data.name = response.data.name;
        this.data.client_type = response.data.client_type;
        this.data.organization = response.data.organization;
        this.data.phone = response.data.phone;
        this.data.email = response.data.email;
        this.data.website = response.data.website;
        this.data.fax = response.data.fax;
        this.data.address = response.data.address;
        this.data.pincode = response.data.pincode;
        this.data.city = response.data.city;
        this.data.state = response.data.state;
        this.data.country = response.data.country;
        this.data.currency = response.data.currency;
        this.data.taxno = response.data.taxno;
        this.data.notes = response.data.notes;
        this.data.id = response.data.id;
        // } 
    },
        async updateClients() {
        this.errors = [];
            if(!this.data.name){
                this.errors.push('Name is Required');
                
            }
            if(this.data.organization){
                if(!this.data.organization){
                this.errors.push('Organization is Required');
                
            }
            }
            
            if(!this.data.email){
                this.errors.push('Email is Required');    
            }
            else if (!this.validEmail(this.data.email)) {
                this.errors.push('Valid email required.');
            }

            if(this.data.phone.length===0){
                this.errors.push('phone is Required');
                
            }else if(!this.validPhone(this.data.phone)){
                this.errors.push('Please enter valid number.');
            }
            
            if(!this.data.address) {
                this.errors.push('Address is Required');    
            }
            if(!this.data.country) {
                this.errors.push('Country is Required');
               
            }
            if(!this.data.currency){
                this.errors.push("Currency is Required");
            }
            
            console.log(this.errors.length);
            console.log(this.data);
            if(this.errors.length == 0) {
        await axios.put(
          `http://localhost:5000/clients/${this.data.id}`,
          {
                    name: this.data.name,
                   
                    organization: this.data.organization,
                    phone: this.data.phone,
                    email: this.data.email,
                    website: this.data.website,
                    fax: this.data.fax,
                    address: this.data.address,
                    pincode: this.data.pincode,
                    city: this.data.city,
                    state: this.data.state,
                    country: this.data.country,
                    currency: this.data.currency,
                    taxno: this.data.taxno,
                    notes: this.data.notes
          }
        ).then((res) => {
            console.log(res.data);
                     this.errors.push(res.data);
                     if(res.data == "Clients updated"){
                         this.$router.push({name: 'clients'});
                     }
        });
        this.data.name = "";
                
                this.data.phone = "";
                this.data.email = "";
                this.data.website = "";
                this.data.fax = "";
                this.data.address = "";
                this.data.pincode = "";
                this.data.city = "";
                this.data.state = "";
                this.data.country = "";
                this.data.currency = "";
                this.data.taxno = "";
                     this.data.notes = '';
                     this.data.organization = '';
                
            }
    },
    validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPhone: function (mobile) {
            var phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            return phone.test(mobile);
        },

       
    },
    
}
</script>
