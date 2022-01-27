<template>
    <div class="container">
        <div class="header">
            <h2>Forgot your Password?</h2>
            <p>Enter your email address and we will send you instructions on how to recover your password.</p>
        </div>
        <div class="forgot-wrap">
            <form @submit.prevent>
                <div class="form-field">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="formData.email" placeholder="Enter email address"/>
                    <p class="text-danger" v-text="errors.email"></p>
                </div>
            </form>
            <div class="button">
                <button class="forgot" @click="forgotPassword">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formData: {
                email: '',
            },
            errors: {},
        }
    },
    methods: {
        forgotPassword() {
            axios.post('api/forgot-password', this.formData).then((response) => {
                    // localStorage.setItem('token', response.data);
                    
                    
                     this.$router.push({name: 'login'});
                }).catch((errors) => {
                    this.errors = errors.response.data.errors;
                });
        },
    }
}
</script>