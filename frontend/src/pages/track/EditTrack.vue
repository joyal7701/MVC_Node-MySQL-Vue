<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Edit Track</h1>
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
        <div>
          <input type="date" placeholder="Date" v-model="date" />
        </div>
        <div>
          <label>Staff Name</label>
          <select v-model="staffid">
            <option v-for="data in names" :value="data.id" :key="data.id">
              {{ data.name }}
            </option>
          </select>
        </div>
        <div>
          <label>Project Name</label>
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
            placeholder="task"
            v-model="task"
          ></textarea>
        </div>
        <div>
          <input type="time" placeholder="Start" v-model="checkin" />
        </div>
        <div>
          <input type="time" placeholder="End" v-model="checkout" />
        </div>
        <div class="submit">
          <button class="button is-success" @click="editTrack">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LeftPannel from "../LeftPannel.vue";
export default {
  components: {
    LeftPannel,
  },
  data() {
    return {
      id: "",
      adminname: "",
      staffid: "",
      projectid: "",
      date: "",
      checkin: "",
      checkout: "",
      task: "",
      name: "",
      names: [],
      projectname: "",
      projectnames: [],
    };
  },
  created: function () {
    this.singleTrackSelect(), this.getName(), this.getProjectName();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/edittrack/:id");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    async getName() {
      try {
        const response = await axios.get("http://localhost:5000/staff", {
          headers: { token: localStorage.getItem("token") },
        });
        this.names = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getProjectName() {
      try {
        const response = await axios.get("http://localhost:5000/projects", {
          headers: { token: localStorage.getItem("token") },
        });
        this.projectnames = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async singleTrackSelect() {
      try {
        const response = await axios.get(
          `http://localhost:5000/track/${this.$route.params.id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.staffid = response.data.staffid;
        this.projectid = response.data.projectid;
        this.date = this.convertDate(response.data.date);
        this.checkin = response.data.checkin;
        this.checkout = response.data.checkout;
        this.task = response.data.task;
        this.id = response.data.id;
      } catch (err) {
        console.log(err);
      }
    },
    async editTrack() {
      try {
        await axios.put(`http://localhost:5000/track/${this.id}`, {
          staffid: this.staffid,
          projectid: this.projectid,
          date: this.date,
          checkin: this.checkin,
          checkout: this.checkout,
          task: this.task,
        });
        (this.staffid = ""),
          (this.projectid = ""),
          (this.date = ""),
          (this.checkin = ""),
          (this.checkout = ""),
          (this.task = ""),
          this.$router.push("/tracklist");
      } catch (err) {
        console.log(err);
      }
    },
    convertDate: function (cvt_date) {
      var date = new Date(cvt_date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      const cvt_date_formate = year + "-" + month + "-" + dt;
      return cvt_date_formate;
    },
  },
};
</script>

<style></style>
