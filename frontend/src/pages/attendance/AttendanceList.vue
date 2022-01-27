<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Attendance</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ adminname.charAt(0).toUpperCase() }}</span
            >{{ adminname }}
          </p>
        </div>
      </div>

      <div><button @click="attendanceCSV">Download</button></div>

      <router-link
        :to="{ name: 'AddAttendance' }"
        class="button is-success mt-5"
        >+ Add Attendance</router-link
      >
      <div>
        <select v-model="staffid">
          <option v-for="data in names" :value="data.id" :key="data.id">
            {{ data.name }}
          </option>
        </select>
        <input type="date" name="date" v-model="indate" />
        <input type="date" name="date" v-model="outdate" />
        <button @click="filterBtn">Submit</button>
        <button v-if="clear == 1" @click="removeFilter">Clear</button>
      </div>
      <table class="table is-striped is-bordered mt-2 is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Hours</th>
            <th>Is Checkout</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ this.convertDate(item.date) }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.checkin }}</td>
            <td>{{ item.checkout }}</td>
            <td>{{ item.hours }}</td>
            <td>{{ item.isCheckout }}</td>
          </tr>
        </tbody>
      </table>
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
      adminname: "",
      items: [],
      names: [],
      name: "",
      staffid: "",
      indate: "",
      outdate: "",
      clear: 0,
    };
  },
  created() {
    this.getName();
    this.showAttendance();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.id = res.data.user.id;
        this.adminname = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/attendancelist");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    async filterBtn() {
      await axios
        .post("http://localhost:5000/attendance_search", {
          admin_id: this.id,
          staffid: this.staffid,
          indate: this.indate,
          outdate: this.outdate,
        })
        .then((res) => {
          this.items = res.data;
          this.clear = 1;
        });
    },
    async getName() {
      try {
        const response = await axios.get(
          "http://localhost:5000/staffsfortrack",
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.names = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async attendanceCSV() {
      try {
        let x = await axios.get("http://localhost:5000/attendancecsv", {
          headers: { token: localStorage.getItem("token") },
        });
        var outer = [];
        for (var i = 0; i < x.data.length; i++) {
          let temp = [];
          temp[0] = x.data[i].name;
          temp[1] = x.data[i].date;
          temp[2] = x.data[i].checkin;
          temp[3] = x.data[i].checkout;
          temp[4] = x.data[i].hours;
          temp[5] = x.data[i].isCheckout;
          outer.push(temp);
        }
        this.download_csv_file(outer);
      } catch (err) {
        console.log(err);
      }
    },
    download_csv_file(csvFileData) {
      var csv = "Name,Date,Checkin,Checkout,hours,isCheckout\n";
      csvFileData.forEach(function (row) {
        csv += row.join(",");
        csv += "\n";
      });
      // document.write(csv);
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      hiddenElement.download = "attendance.csv";
      hiddenElement.click();
    },
    async showAttendance() {
      try {
        const response = await axios.get("http://localhost:5000/attendance", {
          headers: { token: localStorage.getItem("token") },
        });
        this.items = response.data;
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
