<template>
    <section class="topheader-section">
	 <div class="row">
   		<div class="col-md-5">
        </div>
        <div class="col-md-7">
        	<header class="topheader align-items-center">
            	<div class="left-logo">
                	<img src="../assets/images/logo.png" />
                </div>
                <div class="right-sign">
                	<a href="#" @click="signinLink">Sign in</a>
                </div>
            </header>
        </div>
    </div>
 </section>
 <section class="ragister-login">
	<div class="row d-flex align-items-center">
        <div class="col-md-5 left-box">
            <div class="inner-slider">
                <div id="sliderlogin" class="carousel slide" data-bs-ride="false" data-interval="false">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#sliderlogin" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#sliderlogin" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#sliderlogin" data-bs-slide-to="2"></button>
                  </div>  
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <h3>We Help Startup And Digital Agencies Complete Projects</h3> 
                    </div>
                    <div class="carousel-item">
                      <h3>We Help Startup And Digital Agencies Complete Projects</h3>
                    </div>
                    <div class="carousel-item">
                      <h3>We Help Startup And Digital Agencies Complete Projects</h3>
                    </div>
                  </div>
				</div>
            </div>
        </div>
        <div class="col-md-7 right-box">
            <div class="form-body">
            	<h1>Register Now</h1>
               <form class="form-box" @submit.prevent>
                    <!-- <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p> -->
                    <p v-if="errors.title">{{errors.title}}</p>
               		<input type="text" name="fullname" placeholder="Full Name*" v-model="formData.fullname" :class="[ errors.fullname ? 'invalid-class' : '' ]">
                       <p>{{errors.fullname}}</p>
                    <input type="text" name="cname" placeholder="Company Name*" v-model="formData.cname" :class="[ errors.cname ? 'invalid-class' : '' ]">
                    <p>{{errors.cname}}</p>
                    <input type="tel" name="phone" placeholder="Phone*" v-model="formData.phone" :class="[ errors.phone ? 'invalid-class' : '' ]">
                    <p>{{errors.phone}}</p>
                    <input type="email" name="email" placeholder="Email*" v-model="formData.email" :class="[ errors.email ? 'invalid-class' : '' ]">
                    <p>{{errors.email}}</p>
                    <input type="password" name="password" placeholder="Password*" v-model="formData.password" :class="[ errors.password ? 'invalid-class' : '' ]">
                    <p>{{errors.password}}</p>
                    <input type="password" name="cpassword" placeholder="Confirm Password*" v-model="formData.cpassword" :class="[ errors.cpassword ? 'invalid-class' : '' ]">
                    <p>{{errors.cpassword}}</p>
                    <input type="submit" value="Create Account" @click="create_user">
               </form>
            </div>
        </div>
    </div>
    
</section>
<section class="bottomcopyright">
	 <div class="row">
   		<div class="col-md-5">
        	<p>© Copyright 2021 Sanatan Tech Innovations Pvt Ltd, All Right Reserved</p>
        </div>
    </div>
 </section>
    <!-- <div class="container">
        <div class="header">
            <img :src="logo" />
            <button @click="signinLink">Sign in</button>
        </div>
        <div class = "register-wrap">
            <div class="form-heading">
                <h2>Register Now</h2>
            </div>

            <div class="register-form">
                <form @submit.prevent>
                    <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                    <div class="form-field">
                        <label for="fullname">Full Name</label>
                        <input type="text" name="fullname" v-model="formData.fullname" />
                        <div v-if="this.formData.fullname.required" class="invalid-feedback">Name field is required</div>
                        
                    </div>
                    <div class="form-field">
                        <label for="cname">Company Name</label>
                        <input type="text" name="cname" v-model="formData.cname" />
                        
                    </div>
                    <div class="form-field">
                        <label for="phone">Phone</label>
                        <input type="number" name="phone"   v-model="formData.phone"/>
                        
                    </div>
                    <div class="form-field">
                        <label for="email">Email</label>
                        <input type="email" name="email" v-model="formData.email"/>
                       
                    </div>
                    <div class="form-field">
                        <label for="password">Password</label>
                        <input type="password" name="password"  v-model="formData.password"/>
                       
                    </div>
                    <div class="form-field">
                        <label for="cpassword">Confirm Password</label>
                        <input type="password" name="cpassword"  v-model="formData.cpassword"/>
                        
                    </div>
                    <button class="signup" @click="create_user" >Create Account</button>
                </form>
            </div>
        </div>
    </div> -->
</template>

<script>
import logo from "../images/logo 1.png";
import axios from "axios";
const bcrypt = require('bcryptjs');
// import {validateName, validatePhone} from '../validate.js';
export default {
    name: 'register',
    props: ['app'],
    data() {
        return {
            formData: {
                fullname: '',
                cname: '',
                phone: '',
                email: '',
                password: '',
                cpassword: '',                
            },
            errors: [],
            logo: logo,
           
            // valid: true,
        }
    },
    
    methods: {
        async create_user() {
            this.errors = [];
            var salt = bcrypt.genSaltSync(10);
            if(!this.formData.fullname){
                // this.errors.push('Fullname is Required');
                this.errors['fullname'] = 'Fullname is Required';
                
            }
            if(!this.formData.cname){
                this.errors['cname'] = 'Company name is Required';
                
            }
            if(this.formData.phone.length===0){
                this.errors['phone'] = 'phone is Required';
                
            }else if(!this.validPhone(this.formData.phone)){
                this.errors['phone'] = 'Please enter valid number.';
            }
            
            if(!this.formData.email){
                this.errors['email'] = 'Email is Required';    
            }
            else if (!this.validEmail(this.formData.email)) {
                this.errors['email'] = 'Valid email required.';
            }
            
            if(!this.formData.password) {
                this.errors['password'] = 'Password is Required';    
            }else if(!this.validPass(this.formData.password)){
                this.errors['password'] = 'Password has one digit, uppercase, lowercase, speical character and 8 character';
            }
            if(!this.formData.cpassword) {
                this.errors['cpassword'] = 'Confirm password is Required';
               
            }else if(this.formData.password !== this.formData.cpassword){
                this.errors['cpassword'] = "Password not match";
            }
            
            console.log(this.errors);
           
            if(!this.errors['fullname'] && !this.errors['cname'] && !this.errors['phone'] && !this.errors['email'] && !this.errors['password'] && !this.errors['cpassword']) {
            // if(this.formData.fullname && this.formData.cname && this.formData.phone && this.formData.email && this.formData.password && this.formData.cpassword){
                await axios.post("http://localhost:5000/register", {
                    fullname: this.formData.fullname,
                    cname: this.formData.cname,
                    phone: this.formData.phone,
                    email: this.formData.email,
                    password: bcrypt.hashSync(this.formData.password, salt)
                }).then((res) => {
                    console.log(res.data);
                     this.errors['title'] = res.data;
                });
                this.formData.fullname = "";
                this.formData.cname = "";
                this.formData.phone = "";
                this.formData.email = "";
                this.formData.password = "";
                this.formData.cpassword = "";

                //this.$router.push({name: 'login'});
                }  
        },
        signinLink() {
            this.$router.push('/login');
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPhone: function (mobile) {
            var phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            return phone.test(mobile);
        },
        validPass: function(password) {
            var pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$/;
            return pass.test(password);
        }
        
    }
}
</script>
