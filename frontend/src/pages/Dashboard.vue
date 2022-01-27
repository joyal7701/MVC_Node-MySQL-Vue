<template>
<div class="panelbox">
    <left-pannel></left-pannel>
    <!-- <div class="container">
        <div class="row justify-content-center">
             <div class="left pannel">
                <left-pannel></left-pannel>
            </div>
            <div class="col-md-10">
                email: {{email}}<br>
                name: {{name}}
                <p class="text-center"></p>
                
            </div>
           
        </div>  -->
        <div class="right-panel">
    <div class="header">
        <div class="left-title">
            <h1>Dashboard</h1>
        </div>
        <div class="right-admindetail">
            <p><span>{{name.charAt(0).toUpperCase()}}</span> {{name}}</p>
        </div>
    </div>
    <div class="content-page">
        <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
                
            </div>
        </div>
            <div class="row">
                <div class="col-6">
                    <h3>Project hours summary</h3>
                    <div class="table-box">
                        <table>
                            <tr>
                                <th>Project Name</th>
                                <th>Project Time</th>
                            </tr>
                            <tr>
                                <td>Sophia. Isabella</td>
                                <td>5 hour</td>
                            </tr>
                            <tr>
                                <td>Charlotte. solanki</td>
                                <td>1 hour</td>
                            </tr>
                            <tr>
                                <td>Liam Liam</td>
                                <td>4 hour</td>
                            </tr>
                            <tr>
                                <td>Charlotte. solanki</td>
                                <td>2 hour</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-6">
                    <h3>Staff hours summary</h3>
                    <select class="right-dropdown" name="month">
                        <option value="">This month</option>
                        <option value="">Last 30 days</option>
                        <option value="">Last 3 months</option>
                    </select>
                    <div class="table-box">
                        <table>
                            <tr>
                                <th>Staff Name</th>
                                <th>Working Time</th>
                            </tr>
                            <tr>
                                <td>Megha</td>
                                <td>112 hours</td>
                            </tr>
                            <tr>
                                <td>Ashish</td>
                                <td>178 hours</td>
                            </tr>
                            <tr>
                                <td>Hitesh</td>
                                <td>199 hours</td>
                            </tr>
                            <tr>
                                <td>Shivani</td>
                                <td>198 hours</td>
                            </tr>
                        </table>
                </div>
            </div>
    </div>
    <div class="fullrow">
            <div class="row">
                <div class="col-12">
                    <h3>Staff on Leave</h3>
                    <select class="right-dropdown" name="month">
                        <option value="">This month</option>
                        <option value="">Last 30 days</option>
                        <option value="">Last 3 months</option>
                    </select>
                    <div class="table-box fullwidth-table">
                        <table>
                            <tr>
                                <th>Project Name</th>
                                <th>Staff Name</th>
                                <th>First day of absence</th>
                                <th>Last day of absence</th>
                                <th>No. of days</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>18/09/2021</td>
                                <td>Megha Solanki</td>
                                <td>20 December 2021</td>
                                <td>24 December 2021</td>
                                <td>5</td>
                                <td>
                                    <ul>
                                        <li><a class="gray-btn" href="#">Approve</a></li>
                                        <li><a class="gray-btn" href="#">Reject</a></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>18/09/2021</td>
                                <td>Ashish patel</td>
                                <td>24 December 2021</td>
                                <td>27 December 2021</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>18/09/2021</td>
                                <td>Hitesh Rajpurohit</td>
                                <td>21 December 2021</td>
                                <td>23 December 2021</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>18/09/2021</td>
                                <td>Shivani Vakil</td>
                                <td>15 December 2021</td>
                                <td>21 December 2021</td>
                                <td>7</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
    </div>
    </div>
</div>
</div>
    </div>
   
</template>

<script>
import axios from "axios";
import LeftPannel from './LeftPannel.vue';
    export default {
        components: {
            LeftPannel,
        },
        data() {
            return {
                id: '',
                name: '',
                email: ''
            }
        },
        
        mounted(){
             axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem('token')}}).then((res) =>{
                console.log(res.data);
                this.id = res.data;
                // this.$router.push('/login');
                this.email = res.data.user.email;
                this.name = res.data.user.name;
                
                if(res.data.user.is_business == 1){
                    this.$router.push('/dashboard');
                }else{
                    this.$router.push('/business_setting');
                }
            });
        }
    }
</script>
