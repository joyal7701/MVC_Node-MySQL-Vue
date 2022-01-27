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
                	<a href="#" v-on:click="signupLink()">Sign up</a>
                </div>
            </header>
        </div>
    </div>
    </section>
    <section class="ragister-login loginpage">
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
            	<h1>Log in to your account</h1>
               <form class="form-box" @submit.prevent>
                   <!-- <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p> --><p>{{errors.title}}</p>
                    <input type="email" name="email" placeholder="Email Address*" v-model="formData.email" :class="[ errors.email ? 'invalid-class' : '' ]">
                    <p>{{errors.email}}</p>
                    <input type="password" name="pass" placeholder="Password*" v-model="formData.password" :class="[ errors.pass ? 'invalid-class' : '' ]">
                    <p>{{errors.pass}}</p>
                    <div class="logindiv">
                    <input type="submit" value="Login And Continue" @click="login_user">
                    	<span>or</span>
                      <div class="google-div">
                      <a href="#"><img src="../assets/images/google.png"> Sign in with Google</a>
                      </div>
                    </div>
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
        <div class="left-wrap">
           
        </div>
        <div class="right-wrap">
            <div class="header">
                <img :src="logo" />
                <button @click="signupLink">Sign up</button>
            </div>
            <div class = "login-wrap">
                <div class="register-wrap">
                    <h2>Log in to your account</h2>
                </div>
                <div class="login-form">
                    <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                    <form @submit.prevent>
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input type="email"   name="email" v-model="formData.email"/>
                            
                        </div>
                        <div class="form-field">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" v-model="formData.password"/>
                             
                        </div>
                    </form>
                    <div class="button">
                        <button class="login" @click="login_user">Login And Continue</button>
                        <span> OR </span>
                        <button>Sign in with Google</button>
                    </div>
                </div>
                <div>
                    <div @click="forgotPassword">Forgot Password?</div>
                    <div>
                        <p>New user? 
                            <router-link to="register">Create New Account</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
     -->
</template>

<script>
import logo from "../images/logo 1.png";
import axios from "axios";

// import LeftCarousel from '../components/LeftCarousel.vue';



export default {
    components: {
        // LeftCarousel,
       
    },
    data(){
        return {
            formData: {
                email: '',
                password: '',
                
            },
            errors: [],
            logo: logo
        }
    },
    methods: {
         async login_user(e){
             e.preventDefault();
             this.errors = [];
             
        //     const response = await axios.get(
        //   `http://localhost:5000/clients/${this.$route.params.id}`
        // );
        // this.email = response.data.email;
        // this.password = response.data.password;
        // console.log(this.formData);
         if(!this.formData.email){
            // this.errors.push({email:'Email is Required'});
            this.errors['email'] = "Email is Required";
        }
        if(!this.formData.password) {
            // this.errors.push('Password is Required');
            this.errors['pass'] = "Password is Required";
        }
        
        if(this.formData.email && this.formData.password){
            await axios.post("http://localhost:5000/login", {
                    email: this.formData.email,
                    password: this.formData.password
                }).then((res) => {
                    console.log(res.data.title);
                    localStorage.setItem('token', res.data.token);
                    // this.errors.push(res.data.title);
                    this.errors['title'] = res.data.title;
                    if(res.data.title == "Login Success"){
                        this.$router.push('/dashboard');
                    }
                });
            // await axios.get("http://localhost:5000/data").then((res) => {
            //     console.log(res.data);
            //     this.errors.push(res.data);
            // })
                this.formData.email = "";
                this.formData.password = "";

            // this.$router.push('/dashboard');
        }
        
       
        // this.$router.push('/dashboard');
        },
        signupLink(){
            this.$router.push('/register');
        },
        forgotPassword() {
            this.$router.push({name:"forgotpassword"});
        }
    }
    
}
</script>