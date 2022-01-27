<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>View Track</h1>
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
          <label>Date : </label>
          <input type="name" placeholder="Date" v-model="date" />
        </div>
        <div>
          <label>Staff Name : </label>
          <input type="name" placeholder="Name" v-model="staffname" />
        </div>
        <div>
          <label>Project Name : </label>
          <input type="name" placeholder="Name" v-model="project_name" />
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
          <label>Start : </label>
          <input type="name" placeholder="Start" v-model="checkin" />
        </div>
        <div>
          <label>End : </label>
          <input type="name" placeholder="End" v-model="checkout" />
        </div>
        <div>
          <label>Time : </label>
          <input type="name" placeholder="Time" v-model="time" />
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
      adminname: "",
      staffid: "",
      project_name: "",
      date: "",
      checkin: "",
      checkout: "",
      task: "",
      name: "",
      staffname: "",
      time: "",
    };
  },
  created: function () {
    this.singleTrackSelect();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/viewtrack/:id");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    async singleTrackSelect() {
      try {
        const response = await axios.get(
          `http://localhost:5000/track/${this.$route.params.id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.staffname = response.data.name;
        this.project_name = response.data.project_name;
        this.date = this.convertDate(response.data.date);
        this.checkin = response.data.checkin;
        this.checkout = response.data.checkout;
        this.task = response.data.task;
        this.time = response.data.time;
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

      const cvt_date_formate = dt + "/" + month + "/" + year;
      return cvt_date_formate;
    },
  },
};
</script>

<style></style>
