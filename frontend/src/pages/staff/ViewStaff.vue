<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>View Staff</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ adminname.charAt(0).toUpperCase() }}</span
            >{{ adminname }}
          </p>
        </div>
      </div>
      <router-link :to="{ name: 'StaffList' }" class="button is-success mt-5"
        >← Back</router-link
      >
      <div v-if="photo">
        <img
          :src="require(`../../assets/uploads/${this.photo}`)"
          alt="Profile"
        />
      </div>
      <div v-if="doc1">
        <img
          :src="require(`../../assets/uploads/${this.doc1}`)"
          alt="Profile"
        />
      </div>
      <div v-if="doc2">
        <img
          :src="require(`../../assets/uploads/${this.doc2}`)"
          alt="Profile"
        />
      </div>

      <div>
        <input type="name" placeholder="Name:" required v-model="name" />
      </div>
      <div style="{{display:flex}}">
        <input
          type="email"
          Placeholder="Email Address"
          required
          v-model="email"
        />
        <input
          type="phone"
          Placeholder="Phone Number"
          required
          v-model="phone"
        />
        <br />
        <textarea
          type="textarea"
          placeholder="address"
          required
          v-model="address"
        ></textarea>
      </div>

      <div style="{{display:flex}}">
        <label>Photo</label>
        <a :href="'../assets/' + this.photo" target="blank">Click here</a>

        <label>Document 1</label>
        <a href="https://localhost:8080/" target="blank">Click here</a>

        <label>Document 2</label>
        <a href="res.data.files.doc2[0].filename" target="blank">Click here</a>

        <img
          v-for="image in images"
          :src="require(image.url)"
          :key="image.name"
        />
      </div>

      <div style="{{display:flex}}">
        <input
          type="password"
          placeholder="Password*"
          required
          v-model="password"
        />
      </div>
      <textarea
        type="textarea"
        placeholder="Note"
        required
        v-model="note"
      ></textarea>
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
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      // cpassword: "",
      note: "",
      photo: "",
      doc1: "",
      doc2: "",
      adminname: "",
    };
  },
  created: function () {
    this.singleStaffSelect();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/viewstaff/:id");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    async singleStaffSelect() {
      try {
        const response = await axios.get(
          `http://localhost:5000/staff/${this.$route.params.id}`
        );
        this.name = response.data.name;
        this.email = response.data.email;
        this.phone = response.data.phone;
        this.address = response.data.address;
        this.password = response.data.password;
        // this.cpassword = response.data.password;
        this.note = response.data.note;
        this.photo = response.data.photo;
        this.doc1 = response.data.doc1;
        this.doc2 = response.data.doc2;
        console.log("photo is " + this.photo);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
