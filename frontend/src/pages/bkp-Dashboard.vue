<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                
                <p class="text-center">{{currentUser.email}}</p>
                <button class="btn btn-danger" @click="logout">Logout</button> 
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        
        data() {
            return {
                employees: {},
                currentUser: {},
                token: localStorage.getItem('token')
            }
        },
        
        methods: {
            logout(){
                axios.post('api/logout').then((response) => {
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                }).catch((errors) => {
                    console.log(errors);
                })
            }
        },
        mounted() {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
           
            axios.get('api/user').then((response) => {
                this.currentUser = response.data;
                console.log(response.data);
            }).catch((errors) => {
                console.log(errors);
            })
        }
    }
</script>
