<template>
    <div class="panelbox">
        <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>Business Profile Settings</h1>
                </div>
                <div class="right-admindetail">
                    <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
                </div>
            </div>
            <div class="content-page">
                <div class="client-wrap">
            <!-- <form @submit.prevent> -->
                <div v-if="!image" >
                <input type="file" name="profile"  ref="file" @change="onSelect"/>
                </div>
                <div v-else>
                    <img :src="require( `../assets/uploads/${this.image}`)" alt="Profile" />
                    <button @click="removeImage">Remove image</button>
                </div>
                <div>
                <!-- <input type="radio" v-model="data.client_type" @click ="removeValue" value="Individual">Individual
                <input type="radio" v-model="data.client_type" @click ="removeValue" value="Organization">Organization -->
                </div>
                <!-- <div v-show="data.client_type === 'Individual'"> -->
                    <div class="individual-wrap">
                        <form @submit.prevent method="post">
                            <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="form-field">
                                <label for="name">Name</label>
                                <input type="text" name="name" v-model="data.name" />
                                
                            </div>
                            <div class="form-field">
                                <label for="cname">Company Name</label>
                                <input type="text" name="cname" v-model="data.cname"/>
                                 
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
                                    <label for="currency">Currency</label>
                                    <select  name="currency" v-model='data.currency' >
                                        <option value='0' >Currency</option>
                                        <option v-for='data in currencise' :value='data.code' :key='data.code'>{{ data.code }}</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div class="form-field">
                                    <label for="taxname_one">Tax Identication Name 1</label>
                                    <input type="text" name="taxname_one" v-model="data.taxname_one" />
                                </div>
                            <div class="form-field">
                                <label for="taxno_one">Tax Identication Number 1</label>
                                <input type="number" name="taxno_one" v-model="data.taxno_one"/>
                            </div>
                            <div class="form-field">
                                    <label for="taxname_two">Tax Identication Name 2</label>
                                    <input type="text" name="taxname1" v-model="data.taxname_two" />
                                </div>
                            <div class="form-field">
                                <label for="taxno_two">Tax Identication Number 2</label>
                                <input type="number" name="taxno_two" v-model="data.taxno_two"/>
                            </div>
                            <div class="form-field">
                                <label for="notes">Notes</label>
                                <textarea  name="notes" v-model="data.notes"></textarea>
                            </div>
                            <div>
                                <h1>Tax Rate Settings</h1>
                            </div>
                             <div class="invoice_desc">
                                <table>
                                    <tr>
                                        <td >Tax Name</td>
                                        <td>Rate (%)</td>
                                        
                                    </tr>
                                    <tr v-for="(invoice_product, k) in tax_item" :key="k">
                                        <td>
                                            <input class="form-control" type="text" v-model="invoice_product.tax_name" />
                                            <input type="hidden" v-model="invoice_product.id" />
                                        </td>
                                        <td>
                                            <input class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.tax_rate"
                                            />
                                        </td>
                                        <td scope="row" class="trashIconContainer" >
                                            <i class="far fa-trash-alt" @click="deleteRow(k, invoice_product, invoice_product.id)">Remove</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button type='button' class="btn btn-info" @click="addNewRow">Add</button>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </div>
                            
                            <div class="button-wrap">
                                
                                <button class="save" @click="addIndividual">Save</button>
                                
                            </div>
                        </form>
                    </div>
                <!-- </div> -->
                <!-- <div v-show="data.client_type === 'Organization'"> -->
                    <!-- <div class="organization-wrap">
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
                                    <label for="taxname_one">Tax Identication Name 1</label>
                                    <input type="text" name="taxname_one" v-model="data.taxname_one" />
                                </div>
                            <div class="form-field">
                                <label for="taxno_one">Tax Identication Number 1</label>
                                <input type="number" name="taxno_one" v-model="data.taxno_one"/>
                            </div>
                            <div class="form-field">
                                    <label for="taxname_two">Tax Identication Name 2</label>
                                    <input type="text" name="taxname1" v-model="data.taxname_two" />
                                </div>
                            <div class="form-field">
                                <label for="taxno_two">Tax Identication Number 2</label>
                                <input type="number" name="taxno_two" v-model="data.taxno_two"/>
                            </div>
                            <div class="form-field">
                                <label for="notes">Notes</label>
                                <textarea  name="notes" v-model="data.notes" ></textarea>
                            </div>
                            <div class="button-wrap">
                                
                                <button class="save" @click="addOrganization">Save</button>
                                
                            </div>
                        </form> -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </form> -->
        </div>
            </div>
        </div>
    </div>
</template>

<script>
import LeftPannel from './LeftPannel.vue';
import axios from "axios";
var i = 0;
export default {
    components: {
        LeftPannel,
    },
    data() {
        return {
            currencise: [],
            currency: 0,
            countries: [],
            country: 0,
            name: '',
            file: '',
            image: '',
            id: '',
            tax_item: [{ 
                tax_rate: '',
                tax_name: '',
                admin_id: '',
                id: '',
            }],
            get_tax: '',
            data: {
                name: '',
                email: '',
                website: '',
                cname: '',
                phone: '',
                fax: '',
                address: '',
                pincode: '',
                city: '',
                state: '',
                country: '',
                currency: '',
                taxno_one: '',
                taxno_two: '',
                taxname_one: '',
                taxname_two: '',
                notes: '',
                client_type: 'Individual',
                profile: ''
            },
            errors: [],
            //  graphImage = require('../assets/uploads/' + image )
            
        //   publicPath: process.env.BASE_URL,
       
        }
    },
    mounted(){
        this.data.country = 'India';
        this.getCurrency();
        this.getCountry();
        
            axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                // this.id = res.data;
                // this.$router.push('/login');
                // this.email = res.data.user.email;
                this.data.name = res.data.user.name;
                this.data.email = res.data.user.email;
                this.data.phone = res.data.user.phone;
                this.data.cname = res.data.user.cname;
                // this.data.client_type = res.data.user.client_type;
                this.data.website = res.data.user.website;
                this.data.fax = res.data.user.fax;
                this.data.address = res.data.user.address;
                this.data.pincode = res.data.user.pincode;
                this.data.city = res.data.user.city;
                this.data.state = res.data.user.state;
                this.data.country = res.data.user.country;
                this.data.currency = res.data.user.currency;
                this.data.taxname_one = res.data.user.taxname_one;
                this.data.taxno_one = res.data.user.taxno_one;
                this.data.taxname_two = res.data.user.taxname_two;
                this.data.taxno_two = res.data.user.taxno_two;
                this.data.notes = res.data.user.notes;
                this.name = res.data.user.name;
                this.image = res.data.user.image;
                this.id = res.data.user.id;
                this.tax_item[0]['admin_id'] = this.id;
                
            });
            axios.get(`http://localhost:5000/tax_details`,{ headers: { token: localStorage.getItem('token')}}).then((res) => {
                
                console.log(res.data.length);
                console.log(res.data);
                if(!res.data.length == 0){
                    
                    this.tax_item = res.data;
                }
                
               
            });
    },
    methods: {
        
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
        onSelect(){
            const file = this.$refs.file.files[0];
            this.file = file;
        },
        async addIndividual() {
            const formData=new FormData();
            formData.append('file', this.file);
            this.data.profile = this.file['name'];
            console.log(this.data.profile);
            console.log(this.file);

            
            this.errors = [];
            if(!this.data.name){
                this.errors.push('Name is Required'); 
            }
            if(!this.data.cname){
                this.errors.push('Company name is Required'); 
            }
            if(!this.data.email){
                this.errors.push('Email is Required');    
            }
            else if (!this.validEmail(this.data.email)) {
                this.errors.push('Valid email required.');
            }
            if(!this.data.website){
                this.errors.push('Website is Required'); 
            }
            if(this.data.phone.length===0){
                this.errors.push('phone is Required');
                
            }else if(!this.validPhone(this.data.phone)){
                this.errors.push('Please enter valid number.');
            }
            if(!this.data.fax){
                this.errors.push('Fax is Required'); 
            }
            
            if(!this.data.address){
                this.errors.push('Address is Required');
            }
            if(!this.data.pincode){
                this.errors.push('Postal code is Required'); 
            }
            if(!this.data.city){
                this.errors.push('City is Required'); 
            }
            if(!this.data.state){
                this.errors.push('State is Required'); 
            }
            if(!this.data.country){
                this.errors.push('Country is Required');
            }
            if(!this.data.currency){
                this.errors.push('currency is Required');
            }
            if(!this.data.taxname_one){
                this.errors.push('Tax Identification Name 1 is Required'); 
            }
            if(!this.data.taxno_one){
                this.errors.push('Tax Identification Number 1 is Required'); 
            }
            if(!this.data.taxname_two){
                this.errors.push('Tax Identification Name 2 is Required'); 
            }
            if(!this.data.taxno_two){
                this.errors.push('Tax Identification Number 2 is Required'); 
            }
            if(!this.data.notes){
                this.errors.push('Notes is Required'); 
            }
            // console.log(i);
            // if(this.tax_item[i]['tax_name'].length <= 0 || this.tax_item[i]['tax_rate'].length <= 0){
            //      this.errors.push('Tax Name is Required');
            // }
            console.log(this.errors.length);
           
            if(this.errors.length == 0) {
                
                console.log(this.data);
                await axios.post('http://localhost:5000/imageupload', formData).then((res) => {
                console.log(res.data.file);
                this.data.profile = res.data.file;
                 axios.put(
          `http://localhost:5000/add_business`,
          {
                    name: this.data.name,
                    website: this.data.website,
                    cname: this.data.cname,
               //    client_type: this.data.client_type,
                    email: this.data.email,
                    phone: this.data.phone,
                    fax: this.data.fax,
                    address: this.data.address,
                    pincode: this.data.pincode,
                    city: this.data.city,
                    state: this.data.state,
                    country: this.data.country,
                    currency: this.data.currency,
                    taxname_one: this.data.taxname_one,
                    taxno_one: this.data.taxno_one,
                    taxname_two: this.data.taxname_two,
                    taxno_two: this.data.taxno_two,
                    notes: this.data.notes,
                    image: this.data.profile,
          }
        ).then((res) => {
            console.log(res.data);
                     this.errors.push(res.data);
                     if(res.data == "Business updated"){
                         this.$router.push({name: 'dashboard'});
                     }
        });
            });
        if(this.tax_item[i]['tax_name'].length >= 1 || this.tax_item[i]['tax_rate'].length >= 1){
                
            console.log(this.tax_item);
        axios.post('http://localhost:5000/tax_details', {
            user_data: this.tax_item,
        }).then((res) => {
            console.log(res.data);
                     this.errors.push(res.data);
                    //  if(res.data == "Invoice Created"){
                    //      this.$router.push({name: 'invoice'});
                    //  }
        }); 
        }
                
            }
        },
        removeImage(){
            this.image = '';
        },
        addNewRow() {
            
            // console.log(this.tax_item[0]['description']);
            // if(this.tax_item[i]['description'].length >= 1){
            //     console.log(i);
                i++  ;
            //     console.log(i);
            this.tax_item.push({
                
                tax_name: '',
                tax_rate: '',                
                admin_id: this.id,
            });
            // }
        },
        async deleteRow(index, invoice_product, id) {
            var idx = this.tax_item.indexOf(invoice_product);
            console.log(idx, index);
            if (idx > -1) {
                this.tax_item.splice(idx, 1);
            }
            
            idx--;
            index--;
            await axios.delete(`http://localhost:5000/tax_details/${id}`).then((res) => {
                    //  this.$router.go();
                    console.log(res.data);
                });
            // this.calculateTotal();
        },
        // async addOrganization() {
        //     this.errors = [];
            // if(!this.data.organization){
            //     this.errors.push('Organization is Required'); 
            // }
        //     if(!this.data.name){
        //         this.errors.push('Name is Required'); 
        //     }
            
        //     if(!this.data.email){
        //         this.errors.push('Email is Required');    
        //     }
        //     else if (!this.validEmail(this.data.email)) {
        //         this.errors.push('Valid email required.');
        //     }
        //     if(!this.data.website){
        //         this.errors.push('Website is Required'); 
        //     }
        //     if(this.data.phone.length===0){
        //         this.errors.push('phone is Required');
                
        //     }else if(!this.validPhone(this.data.phone)){
        //         this.errors.push('Please enter valid number.');
        //     }
        //     if(!this.data.fax){
        //         this.errors.push('Fax is Required'); 
        //     }
            
        //     if(!this.data.address){
        //         this.errors.push('Address is Required');
        //     }
        //     if(!this.data.pincode){
        //         this.errors.push('Postal code is Required'); 
        //     }
        //     if(!this.data.city){
        //         this.errors.push('City is Required'); 
        //     }
        //     if(!this.data.state){
        //         this.errors.push('State is Required'); 
        //     }
        //     if(!this.data.country){
        //         this.errors.push('Country is Required');
        //     }
        //     if(!this.data.currency){
        //         this.errors.push('currency is Required');
        //     }
        //     if(!this.data.taxname_one){
        //         this.errors.push('Tax Identification Name 1 is Required'); 
        //     }
        //     if(!this.data.taxno_one){
        //         this.errors.push('Tax Identification Number 1 is Required'); 
        //     }
        //     if(!this.data.taxname_two){
        //         this.errors.push('Tax Identification Name 2 is Required'); 
        //     }
        //     if(!this.data.taxno_two){
        //         this.errors.push('Tax Identification Number 2 is Required'); 
        //     }
        //     if(!this.data.notes){
        //         this.errors.push('Notes is Required'); 
        //     }
        //     console.log(this.errors.length);
           
        //     if(this.errors.length == 0) {
        //         await axios.put(
        //   `http://localhost:5000/business_organization`,
        //   {
        //             name: this.data.name,
        //             website: this.data.website,
        //             organization: this.data.cname,
        //             client_type: this.data.client_type,
        //             email: this.data.email,
        //             phone: this.data.phone,
        //             fax: this.data.fax,
        //             address: this.data.address,
        //             pincode: this.data.pincode,
        //             city: this.data.city,
        //             state: this.data.state,
        //             country: this.data.country,
        //             currency: this.data.currency,
        //             taxname_one: this.data.taxname_one,
        //             taxno_one: this.data.taxno_one,
        //             taxname_two: this.data.taxname_two,
        //             taxno_two: this.data.taxno_two,
        //             notes: this.data.notes
        //   }
        // ).then((res) => {
        //     console.log(res.data);
        //              this.errors.push(res.data);
        //              if(res.data == "Business updated"){
        //                  this.$router.push({name: 'dashboard'});
        //              }
        // });
        //     }
        // },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPhone: function (mobile) {
            var phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            return phone.test(mobile);
        },

        // async addOrganization() {
        //     console.log(this.data);
        // }
    }
}
</script>