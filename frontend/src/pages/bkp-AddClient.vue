<template>
    <div class="container">
        <div class="client-wrap">
            <!-- <form @submit.prevent> -->
                <div>
                <input type="radio" v-model="data.client_type" value="Individual">Individual
                <input type="radio" v-model="data.client_type" value="Organization">Organization
                </div>
                <div v-show="data.client_type === 'Individual'">
                    <div class="individual-wrap">
                        <form @submit="addIndividual" method="post">
                            <div class="form-field">
                                <label for="name">Name</label>
                                <input type="text" name="name" v-model="data.name" />
                                <p v-text="errors.name"></p>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="data.email" />
                                    <p v-text="errors.email"></p>
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
                                    <p v-text="errors.phone"></p>
                                </div>
                                <div class="form-field">
                                    <label for="fax">Fax Number</label>
                                    <input type="number" name="fax" v-model="data.fax" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="address">Address</label>
                                <textarea  name="address" v-model="data.address"></textarea>
                                <p v-text="errors.address"></p>
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
                                   <select  name="country" v-model='data.country' @click='getCountry($event)'>
                                        <option value='0' >Country</option>
                                        <option v-for='data in countries' :value='data.name' >{{ data.name }}</option>
                                    </select>
                                    <p v-text="errors.country"></p>
                                </div>
                                 <div class="form-field">
                                    <label for="name">Currency</label>
                                    <select  name="currency" v-model='data.currency' @click='getCurrency($event)'>
                                        <option value='0' >Currency</option>
                                        <option v-for='data in currencise' :value='data.symbol'>{{ data.symbol }}</option>
                                    </select>
                                    <p v-text="errors.currency"></p>
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
                                <button class="save" >Save</button>
                                 <p v-text="success.msg"></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div v-show="data.client_type === 'Organization'">
                    <div class="organization-wrap">
                        <form method="post" @submit="addOrganization">
                            <div class="form-field">
                                <label for="organization">Organization Name</label>
                                <input type="text" name="organization" v-model="data.organization"/>
                                 <p v-text="errors.organization"></p>
                            </div>
                            <div class="form-field">
                                <label for="name">Name</label>
                                <input type="text" name="name" v-model="data.name" />
                                 <p v-text="errors.name"></p>
                            </div>
                            <div class="field-wrap">
                                <div class="form-field">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="data.email" />
                                    <p v-text="errors.email"></p>
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
                                    <p v-text="errors.phone"></p>
                                </div>
                                <div class="form-field">
                                    <label for="fax">Fax Number</label>
                                    <input type="number" name="fax"  v-model="data.fax" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="address">Address</label>
                                <textarea  name="address" v-model="data.address"></textarea>
                                <p v-text="errors.address"></p>
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
                                    <select  name="country" v-model='data.country' @click='getCountry($event)'>
                                        <option value='0' >Country</option>
                                        <option v-for='data in countries' :value='data.name' >{{ data.name }}</option>
                                    </select>
                                    <p v-text="errors.country"></p>
                                </div>
                                <div class="form-field">
                                    <label for="name">Currency</label>
                                    <select  name="currency" v-model='data.currency' @click='getCurrency($event)'>
                                        <option value='0' >Currency</option>
                                        <option v-for='data in currencise' :value='data.symbol' >{{ data.symbol }}</option>
                                    </select>
                                    <p v-text="errors.currency"></p>
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
                                <button class="save" >Save</button>
                                <p v-text="success.msg"></p>
                            </div>
                        </form>
                    </div>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            
            currencise: [],
            currency: 0,
            countries: [],
            country: 0,
            currencyVal: '',
            countryVal: '',
            data: {
                name: '',
                email: '',
                website: '',
                organization: '',
                website: '',
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
            },
            errors: {},
            success: {},
        }
    },
    methods:{
        getCurrency: function(event){
            axios.post('/api/currency')
              .then(function (response) {
                  
                 this.currencise = response.data;
              }.bind(this));
              this.currencyVal = event.target.value;
          
          
        },

        getCountry: function(event){
            axios.post('/api/country')
              .then(function (response) {
                  
                 this.countries = response.data;
              }.bind(this));
         
          this.countryVal = event.target.value;
        },

        addIndividual(e){
            e.preventDefault();
            axios.post('/api/add-client', this.data).then((response) => {
                this.data.name = this.data.email = this.data.phone = this.data.address = this.data.country = this.data.currency = '';
                this.errors = {};
                // this.app.user = response.data;
                 this.$router.push({name: 'clients'});
                this.success = response.data;
                
            }).catch((errors) => {
                console.log(errors.response.data.errors);
                this.errors = errors.response.data.errors;
                
            });
        },
        addOrganization(e){
            e.preventDefault();
            axios.post('/api/add-organization', this.data).then((response) => {
                this.data.organization = this.data.name = this.data.email = this.data.phone = this.data.address = this.data.country = this.data.currency = '';
                this.errors = {};
                // this.app.user = response.data;
                 this.$router.push({name: 'clients'});
                this.success = response.data;
                
            }).catch((errors) => {
                console.log(errors.response.data.errors);
                this.errors = errors.response.data.errors;
                
            });
        },
        updateCart(){
            console.log(data);
        }

       
    },
    create(){
        this.updateCart();
    }
}
</script>
