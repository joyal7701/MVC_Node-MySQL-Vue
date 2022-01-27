<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Add Staff</h1>
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
      <form @submit.prevent enctype="multipart/form-data">
      <p v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      </p>
        <input type="name" placeholder="Name" required v-model="name" />
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
          <input
            type="file"
            name="photo"
            key="photo"
            id="photo"
            ref="photo"
            @change="onPhoto"
          />
          <label>Document 1</label>
          <input
            type="file"
            name="doc1"
            key="doc1"
            id="doc1"
            ref="doc1"
            @change="onDoc1"
          />
          <label>Document 2</label>
          <input
            type="file"
            name="doc2"
            key="doc2"
            id="doc2"
            ref="doc2"
            @change="onDoc2"
          />
        </div>

        <div style="{{display:flex}}">
          <input
            type="password"
            placeholder="Password*"
            required
            v-model="password"
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            required
            v-model="cpassword"
          />
        </div>
        <textarea
          type="textarea"
          placeholder="Note"
          required
          v-model="note"
        ></textarea>

        <div class="submit">
          <button @click="staffdataSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LeftPannel from "../LeftPannel.vue";
const bcrypt = require("bcryptjs");

export default {
  name: "Create",
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
      cpassword: "",
      photo: "",
      note: "",
      supportphoto: "",
      doc1: "",
      supportdoc1: "",
      doc2: "",
      supportdoc2: "",
      errors: [],
      adminname: "",
      admin_id: "",
    };
  },
  created() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.adminname = res.data.user.name;
        this.admin_id = res.data.user.id;
        if (res.data.user.is_business == 1) {
          this.$router.push("/addstaff");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  methods: {
    onPhoto() {
      const photo = this.$refs.photo.files[0];
      this.photo = photo;
    },
    onDoc1() {
      const doc1 = this.$refs.doc1.files[0];
      this.doc1 = doc1;
    },
    onDoc2() {
      const doc2 = this.$refs.doc2.files[0];
      this.doc2 = doc2;
    },

    async staffdataSubmit() {
      this.errors = [];
      var salt = bcrypt.genSaltSync(10);

      if (!this.name) {
        this.errors.push("Name is Required");
      }
      if (!this.email) {
        this.errors.push("Email is Required");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (this.phone.length === 0) {
        this.errors.push("phone is Required");
      } else if (!this.validPhone(this.phone)) {
        this.errors.push("Please enter valid number.");
      }
      if (!this.address) {
        this.errors.push("Address is Required");
      }
      if (!this.password) {
        this.errors.push("Password is Required");
      } else if (!this.validPass(this.password)) {
        this.errors.push(
          "Password has one digit, uppercase, lowercase, speical character and 8 character"
        );
      }
      if (!this.cpassword) {
        this.errors.push("Confirm password is Required");
      } else if (this.password !== this.cpassword) {
        this.errors.push("Password not match");
      }
      if (!this.note) {
        this.errors.push("Note is Required");
      }
      if (!this.photo) {
        this.errors.push("photo is Required");
      }
      if (!this.doc1) {
        this.errors.push("doc1 is Required");
      }
      if (!this.doc2) {
        this.errors.push("doc2 is Required");
      }

      const formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("doc1", this.doc1);
      formData.append("doc2", this.doc2);

      if (this.errors.length == 0) {
        await axios
          .post("http://localhost:5000/upload", formData)
          .then((res) => {
            this.supportphoto = res.data.files.photo[0].filename;
            this.supportdoc1 = res.data.files.doc1[0].filename;
            this.supportdoc2 = res.data.files.doc2[0].filename;
            console.log(res.data.files);
            axios
              .post("http://localhost:5000/staff", {
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                password: bcrypt.hashSync(this.password, salt),
                note: this.note,
                photo: this.supportphoto,
                doc1: this.supportdoc1,
                doc2: this.supportdoc2,
                admin_id: this.admin_id,
              })
              .then((res) => {
                this.errors.push(res.data);
                this.$router.push("/stafflist");
                (this.name = ""),
                  (this.email = ""),
                  (this.phone = ""),
                  (this.address = ""),
                  (this.password = ""),
                  (this.cpassword = ""),
                  // (this.iamge = ""),
                  (this.note = "");
              });
          });
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone: function (mobile) {
      var phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      return phone.test(mobile);
    },
    validPass: function (password) {
      var pass =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$/;
      return pass.test(password);
    },
  },
};
</script>

<style></style>
