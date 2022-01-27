<template>
   <div class="panelbox">
        
            <left-pannel></left-pannel>
        <div class="right-panel">
            <div class="header">
                <div class="left-title">
                    <h1>Edit Project</h1>
                </div>
                <div class="right-admindetail">
                    <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
                </div>
            </div>
            <div class="content-page">
        <div class="header">
                <div class="button"><router-link :to="{name: 'projects'}">Back</router-link></div>
            </div>
                <div class="container">
                    <div class="form_wrap">
                        <form @submit.prevent>
                            <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="form-field">
                                <label for="project_name">Project Name</label>
                                <input type="text" name="project_name" v-model="formData.project_name" />
                        
                        
                            </div>
                            <div class="form-field">
                                <label for="client_name">Client Name</label>
                                <input type="text" name="client_name" v-model="formData.client_name" />
                        
                            </div>
                            <div>
                                <div class="form-field">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" v-model="formData.email" disabled />
                       
                                </div>
                                <div class="form-field">
                                    <label for="phone">Phone</label>
                                    <input type="number" name="phone"   v-model="formData.phone"/>
                        
                                </div>
                            </div>  
                            <div class="form-field">
                                <label for="description">Description</label>
                                <textarea name="description" v-model="formData.description"></textarea>
                       
                            </div>
                            <div>
                                <div class="form-field">
                                    <label for="sign_date">Project Sign Date</label>
                                    <input type="date" name="sign_date"  v-model="formData.sign_date"/>
                        
                                </div>
                                <div class="form-field">
                                    <label for="deadline_date">Project Deadline Date</label>
                                    <input type="date" name="deadline_date"  v-model="formData.deadline_date"/>
                        
                                </div>
                            </div>
                            <button class="button is-success" @click="updateProduct">UPDATE</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
</template>
 
<script>
// import axios
import axios from "axios";
import LeftPannel from '../LeftPannel.vue'; 
export default {
  name: "EditProject",
  components: {
        LeftPannel,
    },
  data() {
    return {
        name: '',
      formData: {
                project_name: '',
                client_name: '',
                email: '',
                phone: '',
                description: '',
                sign_date: '',
                deadline_date: '',
                id: '',
            },
            errors: []
    };
  },
  created: function () {
    this.getProjectById();
    axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                // this.id = res.data;
                // this.$router.push('/login');
                // this.email = res.data.user.email;
                this.name = res.data.user.name;
                if(res.data.user.is_business == 1){
                    this.$router.push('/edit_project');
                }else{
                    this.$router.push('/business_setting');
                }
                });
  },
  methods: {
    // Get Product By Id
    async getProjectById() {
       
      
        const response = await axios.get(
          `http://localhost:5000/projects/${this.$route.params.id}`
        );
       


        // const date = new Date(response.data.deadline_date).toLocaleString();
        // const cvt_date = date.getFullYear()+'-' + date.getMonth() + '-'+date.getDate();
        this.formData.project_name = response.data.project_name;
        this.formData.client_name = response.data.client_name;
        this.formData.email = response.data.email;
        this.formData.phone = response.data.phone;
        this.formData.description = response.data.description;
        this.formData.sign_date = this.convertDate(response.data.sign_date);
        this.formData.deadline_date = this.convertDate(response.data.deadline_date);
        this.formData.id = response.data.id;
        // } 
    },
 
    // Update product
    async updateProduct() {
        this.errors = [];
            if(!this.formData.project_name){
                this.errors.push('Project Name is Required');
                
            }
            if(!this.formData.client_name){
                this.errors.push('Client Name is Required');
                
            }
            if(!this.formData.email){
                this.errors.push('Email is Required');    
            }
            else if (!this.validEmail(this.formData.email)) {
                this.errors.push('Valid email required.');
            }

            if(this.formData.phone.length===0){
                this.errors.push('phone is Required');
                
            }else if(!this.validPhone(this.formData.phone)){
                this.errors.push('Please enter valid number.');
            }
            
            if(!this.formData.description) {
                this.errors.push('Description is Required');    
            }
            if(!this.formData.sign_date) {
                this.errors.push('Project sign date is Required');
               
            }
            if(!this.formData.deadline_date){
                this.errors.push("Project deadline date not match");
            }
            
            console.log(this.errors.length);
            console.log(this.formData);
            if(this.errors.length == 0) {
                console.log(this.formData);
               
        await axios.put(
          `http://localhost:5000/projects/${this.formData.id}`,
          { 
        
            project_name: this.formData.project_name,
                    client_name: this.formData.client_name,
                    email: this.formData.email,
                    phone: this.formData.phone,
                    description: this.formData.description,
                    sign_date: this.formData.sign_date,
                    deadline_date: this.formData.deadline_date
          }
        ).then((res) => {
            console.log(res.data);
                     this.errors.push(res.data);
                     if(res.data == "Project updated"){
                         this.$router.push({name: 'projects'});
                     }
        });
        // this.formData.project_name = "";
        //         this.formData.client_name = "";
        //         this.formData.email = "";
        //         this.formData.phone = "";
        //         this.formData.description = "";
        //         this.formData.sign_date = "";
        //         this.formData.deadline_date = "";
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
        convertDate: function(cvt_date){
            var date = new Date(cvt_date);
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
        
            const cvt_date_formate = year+'-' + month + '-'+dt;
            return cvt_date_formate;
        }
  },
};
</script>