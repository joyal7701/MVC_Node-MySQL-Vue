<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Edit Staff</h1>
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
        <input type="name" placeholder="Name:" v-model="name" />
        <div style="{{display:flex}}">
          <input type="email" Placeholder="Email Address" v-model="email" />
          <input type="phone" Placeholder="Phone Number" v-model="phone" />
          <br />
          <textarea
            type="textarea"
            placeholder="address"
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
          <input type="password" placeholder="Password*" v-model="password" />
          <!-- <input
          type="password"
          placeholder="Confirm Password*"
        
          v-model="cpassword"
        /> -->
        </div>
        <textarea type="textarea" placeholder="Note" v-model="note"></textarea>

        <div class="submit">
          <button class="button is-success" @click="editStaff">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LeftPannel from "../LeftPannel.vue";
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
export default {
  components: {
    LeftPannel,
  },
  data() {
    return {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      cpassword: "",
      note: "",
      photo: "",
      doc1: "",
      doc2: "",
      adminname: "",
      // hash_pass: this.password,
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
          this.$router.push("/editstaff/:id");
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
    async singleStaffSelect() {
      //   const hash_pass = this.password;
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
        this.id = response.data.id;
      } catch (err) {
        console.log(err);
      }
    },
    async editStaff() {
      try {
        const formData = new FormData();
        formData.append("photo", this.photo);
        formData.append("doc1", this.doc1);
        formData.append("doc2", this.doc2);
        await axios
          .put(`http://localhost:5000/upload/${this.id}`, formData)
          .then((res) => {
            this.supportphoto = this.supportdoc1 = this.supportdoc2 = "";
            if (res.data.files.photo) {
              this.supportphoto = res.data.files.photo[0].filename;
              this.supportdoc1 = this.doc1;
              this.supportdoc2 = this.doc2;
            }
            if (res.data.files.doc1) {
              this.supportphoto = this.photo;
              this.supportdoc1 = res.data.files.doc1[0].filename;
              this.supportdoc2 = this.doc2;
            }
            if (res.data.files.doc2) {
              this.supportphoto = this.photo;
              this.supportdoc1 = this.doc1;
              this.supportdoc2 = res.data.files.doc2[0].filename;
            }
            if (res.data.files.photo && res.data.files.doc1) {
              this.supportphoto = res.data.files.photo[0].filename;
              this.supportdoc1 = res.data.files.doc1[0].filename;
              this.supportdoc2 = this.doc2;
            }
            if (res.data.files.photo && res.data.files.doc2) {
              this.supportphoto = res.data.files.photo[0].filename;
              this.supportdoc1 = this.doc1;
              this.supportdoc2 = res.data.files.doc2[0].filename;
            }
            if (res.data.files.doc1 && res.data.files.doc2) {
              this.supportphoto = this.photo;
              this.supportdoc1 = res.data.files.doc1[0].filename;
              this.supportdoc2 = res.data.files.doc2[0].filename;
            }
            if (
              res.data.files.photo &&
              res.data.files.doc1 &&
              res.data.files.doc2
            ) {
              this.supportphoto = res.data.files.photo[0].filename;
              this.supportdoc1 = res.data.files.doc1[0].filename;
              this.supportdoc2 = res.data.files.doc2[0].filename;
            }
            axios.put(`http://localhost:5000/staff/${this.id}`, {
              name: this.name,
              email: this.email,
              phone: this.phone,
              address: this.address,
              password: bcrypt.hashSync(this.password, salt),
              cpassword: this.password,
              note: this.note,
              photo: this.supportphoto,
              doc1: this.supportdoc1,
              doc2: this.supportdoc2,
            });
            (this.name = ""),
              (this.email = ""),
              (this.phone = ""),
              (this.address = ""),
              (this.password = ""),
              (this.cpassword = ""),
              (this.note = ""),
              this.$router.push("/stafflist");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
