<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Add Track</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ adminname.charAt(0).toUpperCase() }}</span
            >{{ adminname }}
          </p>
        </div>
      </div>
      <router-link :to="{ name: 'TrackList' }" class="button is-success mt-5"
        >← Back</router-link
      >
      <form @submit.prevent>
        <p v-if="errors.length">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>     
          </ul>
        </p>
        <div>
          <label>Staff Name : </label>
          <select v-model="staffid">
            <option v-for="data in names" :value="data.id" :key="data.id">
              {{ data.name }}
            </option>
          </select>
        </div>
        <div>
          <label>Date : </label>
          <input type="date" name="date" v-model="date" />
        </div>
        <div>
          <label>Start Time : </label>
          <input type="time" name="checkin" v-model="checkin" />
        </div>
        <div>
          <label>End Time : </label>
          <input type="time" name="checkout" v-model="checkout" />
        </div>
        <div>
          <label>Project Name : </label>
          <select v-model="projectid">
            <option
              v-for="data in projectnames"
              :value="data.id"
              :key="data.id"
            >
              {{ data.project_name }}
            </option>
          </select>
        </div>
        <div>
          <label>Task : </label>
          <textarea
           rows="3"
            cols="60"
            type="textarea"
            placeholder="Task"
            required
            v-model="task"
          ></textarea>
        </div>
        <div class="submit">
          <button @click="OnTrackSubmit">Submit</button>
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
      name: "",
      names: [],
      projectname: "",
      projectnames: [],
      date: new Date().toISOString().substr(0, 10),
      staffid: "",
      projectid: "",
      checkin: "",
      checkout: "",
      errors: [],
      task: "",
      adminname:"",
      admin_id:"",
    };
  },
  created() {
    this.getName(), this.getProjectName();
      axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        this.admin_id = res.data.user.id;
        if (res.data.user.is_business == 1) {
          this.$router.push("/addtrack");
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
    async getProjectName() {
      try {
        const response = await axios.get("http://localhost:5000/projectsfortrack", {
          headers: { token: localStorage.getItem("token") },
        });
        this.projectnames = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async OnTrackSubmit() {
      this.errors = [];
      if (!this.staffid) {
        this.errors.push("Staff Name is Required");
      }
      if (!this.projectid) {
        this.errors.push("Project Name is Required");
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
      if (!this.task) {
        this.errors.push("Task is Required");
      }

      if (this.errors.length == 0) {
        await axios
          .post("http://localhost:5000/track", {
            staffid: this.staffid,
            projectid:this.projectid,
            date: this.date,
            checkin: this.checkin,
            checkout: this.checkout,
            task:this.task,
            admin_id:this.admin_id,
          })
          .then((res) => {
            this.errors.push(res.data);
            this.$router.push("/tracklist");
          });
      }
    },
  },
};
</script>

<style></style>
