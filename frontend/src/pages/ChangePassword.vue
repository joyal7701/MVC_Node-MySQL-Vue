<template>

    <div class="container">
        <div class="form_wrap">
            <form @submit.prevent>
                <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                <div class="form-field">
                    <label for="current_password">Current Password</label>
                    <input type="text"   name="current_pass"  v-model="user.current_pass"/>   
                </div>
                <div class="form-field">
                    <label for="new_password"> New Password</label>
                    <input type="text" class="form-control" name="npassword" v-model="user.npassword"/>                         
                </div>
                <div class="form-field">
                    <label for="c_password">Confirm Password</label>
                    <input type="text" class="form-control" name="cpassword" v-model="user.cpassword" />                         
                </div>
                 <button class="signup" @click="password_change" >Submit</button>
            </form>
        </div>
        <div class="dashboard">
            <router-link to="/dashboard">Home</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            user: {   
                id: '',             
                npassword: '',
                cpassword: '',
                current_pass: ''                
            },
            errors: [],   
        }
    },
    mounted(){
             axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                this.id = res.data.user.id;
            });
        },
    methods: {
        async password_change() {
            this.errors = [];
            if(!this.user.current_pass){
                 this.errors.push(' Current Password is Required');
            }
            if(!this.user.npassword) {
                this.errors.push(' New Password is Required');    
            }else if(!this.validPass(this.user.npassword)){
                this.errors.push('Password has one digit, uppercase, lowercase, speical character and 8 character');
            }
            if(!this.user.cpassword) {
                this.errors.push('Confirm password is Required');
               
            }else if(this.user.npassword !== this.user.cpassword){
                this.errors.push("Password not match");
            }
            if(this.errors.length == 0) {
            
                await axios.post("http://localhost:5000/updat-pass", {
                    id: this.id,
                    current_pass: this.user.current_pass,
                    npassword: this.user.npassword
                }).then((res) => {
                    console.log(res.data);
                     this.errors.push(res.data);
                });
                this.user.current_pass = "";
                this.user.npassword = "";
                this.user.cpassword = "";
            }  
        },
        validPass: function(password) {
            var pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$/;
            return pass.test(password);
        }
    }
}
</script>