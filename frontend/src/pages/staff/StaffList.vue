<template>
  <div class="panelbox">
    <LeftPannel />
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Staff Listing</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ adminname.charAt(0).toUpperCase() }}</span
            >{{ adminname }}
          </p>
        </div>
      </div>
      <div class="content-page">
        <div>
          <input type="text" v-model="filter.name" />
          <button class="save" @click="filterSearch">Submit</button>
          <button v-if="filter.is_filter == 1" @click="removeSearch">
            Clear
          </button>
          <p v-if="filter.is_filter == 1">
            Showing {{ this.filter.search_count }} on {{ page }} page
          </p>
        </div>
        <div>
          <router-link :to="{ name: 'AddStaff' }" class="button is-success mt-5"
            >Add New</router-link
          >
        </div>
        <div class="section">
          <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th class="has-text-centered">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td class="has-text-centered">
                  <router-link
                    :to="{ name: 'ViewStaff', params: { id: item.id } }"
                    class="button is-primary is-small"
                    >View</router-link
                  >
                  <router-link
                    :to="{ name: 'EditStaff', params: { id: item.id } }"
                    class="button is-info is-small"
                    >Edit</router-link
                  >

                  <a
                    class="button is-danger is-small"
                    @click="deleteStaff(item.id)"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="clearfix btn-group col-md-2 offset-md-5">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            v-if="page != 1"
            @click="prevPage"
          >
            Prev
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            v-for="pageNumber in pages.slice(page - 1, page + 2)"
            :key="pageNumber"
            @click="pageCount(pageNumber)"
          >
            {{ pageNumber }}
          </button>
          <button
            type="button"
            @click="nextPage"
            v-if="page < pages.length"
            class="btn btn-sm btn-outline-secondary"
          >
            Next
          </button>
        </div>
      </div>
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
      items: [],
      adminname: "",
      page: 1,
      result_length: "",
      perPage: 2,
      pages: [],
      filter: {
        name: "",
        is_filter: 0,
        search_count: "",
      },
      id: "",
    };
  },

  created() {
    this.showStaffList();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.id = res.data.user.id;
        this.adminname = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/stafflist");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  watch: {
    items() {
      this.setPages();
    },
  },
  methods: {
    async filterSearch() {
      await axios
        .post("http://localhost:5000/staff_search", {
          name: this.filter.name,
          admin_id: this.id,
        })
        .then((res) => {
          this.items = res.data;
          // this.filter.name = '';
          this.filter.search_count = res.data.length;
          this.filter.is_filter = 1;
          console.log(res.data);
        });
    },
    async removeSearch() {
      this.filter.name = "";
      await axios
        .post("http://localhost:5000/staff_search", {
          name: this.filter.name,
          admin_id: this.id,
        })
        .then((res) => {
          this.items = res.data;
          // this.filter.name = '';
          this.filter.is_filter = 0;
          console.log(res.data);
        });
    },
    async showStaffList() {
      try {
        const params = "?pages=" + this.page + "&size=" + this.perPage;
        const response = await axios.get(
          "http://localhost:5000/staff" + params,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.items = response.data.results;
        this.page = response.data.page;
        this.result_length = response.data.length.length;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteStaff(id) {
      try {
        await axios.delete(`http://localhost:5000/staff/${id}`).then(() => {
          this.$router.go();
        });
        this.showStaffList();
      } catch (err) {
        console.log(err);
      }
    },
    setPages() {
      this.pages = [];
      let numberOfPages = Math.ceil(this.result_length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    //page number wise display
    pageCount(pageNumber) {
      if (!pageNumber) {
        this.page++;
      }
      this.page = pageNumber;

      this.showStaffList();
    },
    //display prev page
    prevPage() {
      this.page--;
      this.showStaffList();
    },
    //display next page
    nextPage() {
      this.page++;
      this.showStaffList();
    },
  },
};
</script>

<style></style>
