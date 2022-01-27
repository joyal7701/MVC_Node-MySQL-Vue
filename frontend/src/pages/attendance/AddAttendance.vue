<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Add Attendance</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ adminname.charAt(0).toUpperCase() }}</span
            >{{ adminname }}
          </p>
        </div>
      </div>
      <router-link
        :to="{ name: 'AttendanceList' }"
        class="button is-success mt-5"
        >← Back</router-link
      >
      <form @submit.prevent>
        <p v-if="errors.length">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>     
          </ul>
        </p>
        <div>
          <label>Staff Name</label>
          <select v-model="staffid">
            <option v-for="data in names" :value="data.id" :key="data.id">
              {{ data.name }}
            </option>
          </select>
        </div>
        <div>
          <label>Check in/ Out Date</label>
          <input type="date" name="date" v-model="date" />
        </div>
        <div>
          <label>Check in Time</label>
          <input type="time" name="checkin" v-model="checkin" />
        </div>
        <div>
          <label>Check Out Time</label>
          <input type="time" name="checkout" v-model="checkout" />
        </div>
        <div class="submit">
          <button @click="OnStaffSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LeftPannel from "../LeftPannel.vue";
import axios from "axios";
export default {
  components: {
    LeftPannel,
  },
  data() {
    return {
      adminname:"",
      admin_id:"",
      name: "",
      names: [],
      date:  new Date().toISOString().substr(0, 10),
      staffid: "",
      checkin: "",
      checkout: "",
      errors: [],
    };
  },
  created() {
    this.getName();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        this.admin_id = res.data.user.id;
        if (res.data.user.is_business == 1) {
          this.$router.push("/addattendance");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    async getName() {
      try {
        const response = await axios.get("http://localhost:5000/staffsfortrack", {
          headers: { token: localStorage.getItem("token") },
        });
        this.names = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async OnStaffSubmit() {
      this.errors = [];
      if (!this.staffid) {
        this.errors.push("Staff Name is Required");
      }
      if (!this.date) {
        this.errors.push("Date is Required");
      }
      if (!this.checkin) {
        this.errors.push("Check in Time is Required");
      }
      if (!this.checkout) {
        this.errors.push("Check Out Time is Required");
      }

      if (this.errors.length == 0) {
        await axios
          .post("http://localhost:5000/attendance", {
            staffid: this.staffid,
            date: this.date,
            checkin: this.checkin,
            checkout: this.checkout,
            isCheckout: "yes",
            admin_id:this.admin_id,
          })
          .then((res) => {
            this.errors.push(res.data);
            this.$router.push("/attendancelist");
          });
      }
    },
  },
};
</script>

<style></style>
