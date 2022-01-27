<template>
  <div class="left-sidebar">
    <router-view></router-view>
    <div class="logo-div">
      <img
        src="../assets/images/logo-w.png"
        alt="Sanatan tech innovation pvt ltd white logo"
      />
    </div>
    <div class="mainmenu">
      <ul>
        <li>
          <router-link to="dashboard"
            ><img src="../assets/images/menu.png" /> Dashboard</router-link
          >
        </li>
        <li>
          <router-link to="AttendanceList"
            ><img src="../assets/images/user.png" /> Attendance</router-link
          >
        </li>
        <li>
          <router-link to="dashboard"
            ><img src="../assets/images/business-and-finance.png" />
            Reports</router-link
          >
        </li>
        <li>
          <router-link to="clients"
            ><img src="../assets/images/customer.png" /> Clients</router-link
          >
        </li>
        <li>
          <router-link to="invoices"
            ><img src="../assets/images/check.png" /> Invoices</router-link
          >
        </li>
        <li>
          <router-link to="projects"
            ><img src="../assets/images/layers.png" /> Projects</router-link
          >
        </li>
        <li>
          <router-link to="TrackList"
            ><img src="../assets/images/sand-clock.png" /> Track</router-link
          >
        </li>
        <li>
          <router-link to="StaffList"
            ><img src="../assets/images/staff.png" /> Staff</router-link
          >
        </li>
        <li>
          <router-link to="business_setting"
            ><img src="../assets/images/settings.png" /> Business
            Settings</router-link
          >
        </li>
        <li>
          <a href="#" @click="logout"
            ><img src="../assets/images/logout.png" /> Logout</a
          >
        </li>
      </ul>
    </div>
    <!-- <div><router-link to="dashboard">Dashboard</router-link ></div>
        <div><router-link to="dashboard">Attendance</router-link ></div>
        <div><router-link to="dashboard">Reports</router-link ></div>
        <div><router-link to="clients">Clients</router-link ></div>
        <div><router-link to="dashboard">Invoices</router-link ></div>
        <div><router-link to="projects">Projects</router-link ></div>
        <div><router-link to="dashboard">Track</router-link ></div>
        <div><router-link to="dashboard">Staff</router-link ></div>
        <div><router-link to="dashboard">Business Settings</router-link ></div>
        <div><router-link to="change-password">change Password</router-link ></div>
        <div><button class="btn btn-danger" @click="logout">Logout</button> </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
