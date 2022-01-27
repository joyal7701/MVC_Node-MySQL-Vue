<template>
    <div class="container">
        <div class="container">
    <div>
        <h4>Change Password</h4>
        <form @submit.prevent class="aa-login-form" id="frmUpdatePassword"> 
            <label for="">Password<span>*</span></label>
            <input type="password" placeholder="Password" name="password" required v-model="formData.password">
            <div id="password_error" class="field_error"></div> 
            <button type="submit" class="aa-browse-btn" id="btnUpdatePassword" @click="updatePassword">Update Password</button>    
                           
        </form>
    </div>
    <div id="thank_you_msg" class="field_error"></div>
</div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            formData: {
                password: '',
            },
            errors: {},
        }
    },
    methods: {
        updatePassword() {
            axios.post('api/forgot_password_change_process', this.formData).then((response) => {
                    // localStorage.setItem('token', response.data);
                    
                    console.log(response.data);
                    //  this.$router.push({name: 'login'});
                }).catch((errors) => {
                    this.errors = errors.response.data.errors;
                });
        },
    }
}
</script>