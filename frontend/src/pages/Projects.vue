<template>
  <div class="panelbox">
    <left-pannel></left-pannel>
    <div class="right-panel">
      <div class="header">
        <div class="left-title">
          <h1>Projects</h1>
        </div>
        <div class="right-admindetail">
          <p>
            <span>{{ name.charAt(0).toUpperCase() }}</span> {{ name }}
          </p>
        </div>
      </div>
      <div class="content-page">
        <div>
          <input type="text" v-model="filter.name" />
          <button class="save" @click="filterSearch">Submit</button>
          <button v-if="filter.is_filter == 1" @click="removeSearch">
            remove
          </button>
          <p v-if="filter.is_filter == 1">
            Showing {{ this.filter.search_count }} on {{ page }} page
          </p>
        </div>
        <div class="header">
          <router-link :to="{ name: 'create_project' }">Add New</router-link>
        </div>

        <div class="section">
          <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Short description</th>
                <th>Client information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, index) in projects" :key="project.id">
                <td>{{ index + 1 }}</td>
                <td>{{ project.project_name }}</td>
                <td>{{ project.description }}</td>
                <td>
                  <div>
                    <div>{{ project.client_name }}</div>
                    <div>{{ project.email }}</div>
                    <div>{{ project.phone }}</div>
                  </div>
                </td>
                <td class="has-text-centered">
                  <router-link
                    :to="{ name: 'view_project', params: { id: project.id } }"
                    class="button is-info is-small"
                    >View</router-link
                  >
                  <router-link
                    :to="{ name: 'edit_project', params: { id: project.id } }"
                    class="button is-info is-small"
                    >Edit</router-link
                  >
                  <a
                    class="button is-info is-small"
                    @click="deleteProjects(project.id)"
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
import LeftPannel from "./LeftPannel.vue";
export default {
  components: {
    LeftPannel,
  },
  data() {
    return {
      projects: [],
      name: "",
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
    this.getProjects();
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        this.id = res.data.user.id;
        // this.$router.push('/login');
        // this.email = res.data.user.email;
        this.name = res.data.user.name;
        if (res.data.user.is_business == 1) {
          this.$router.push("/projects");
        } else {
          this.$router.push("/business_setting");
        }
      });
  },
  watch: {
    projects() {
      this.setPages();
    },
  },
  methods: {
    async filterSearch() {
      await axios
        .post("http://localhost:5000/project_search", {
          name: this.filter.name,
          admin_id: this.id,
        })
        .then((res) => {
          this.projects = res.data;
          // this.filter.name = '';
          this.filter.search_count = res.data.length;
          this.filter.is_filter = 1;
          console.log(res.data);
        });
    },
    async removeSearch() {
      this.filter.name = "";
      await axios
        .post("http://localhost:5000/project_search", {
          name: this.filter.name,
          admin_id: this.id,
        })
        .then((res) => {
          this.projects = res.data;
          // this.filter.name = '';
          this.filter.is_filter = 0;
          console.log(res.data);
        });
    },
    async getProjects() {
      try {
        const params = "?pages=" + this.page + "&size=" + this.perPage;
        const response = await axios.get(
          "http://localhost:5000/projects" + params,
          { headers: { token: localStorage.getItem("token") } }
        );
        this.projects = response.data.results;
        this.page = response.data.page;
        this.result_length = response.data.length.length;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProjects(id) {
      try {
        await axios.delete(`http://localhost:5000/projects/${id}`).then(() => {
          this.$router.go();
        });
        this.getProjects();
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

      this.getProjects();
    },
    //display prev page
    prevPage() {
      this.page--;
      this.getProjects();
    },
    //display next page
    nextPage() {
      this.page++;
      this.getProjects();
    },
  },
};
</script>
