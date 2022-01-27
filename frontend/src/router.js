import { createRouter, createWebHistory } from "vue-router";

// import './assets/css/bootstrap.min.css';

import Dasboard from "./pages/Dashboard.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import ChangePassword from "./pages/ChangePassword.vue";
//project module
import Projects from "./pages/Projects.vue";
import CreateProject from "./pages/projects/CreateProjects.vue";
import EditProject from "./pages/projects/EditProjects.vue";
import ViewProject from "./pages/projects/ViewProjects.vue";
//client module
import Clients from "./pages/Clients.vue";
import CreateClient from "./pages/clients/CreateClients.vue";
import EditClient from "./pages/clients/EditClients.vue";
//business setting
import BusinessSetting from "./pages/BusinessSetting.vue";
//invoice module
import Invoice from "./pages/Invoices.vue";
import CreateInvoice from "./pages/invoices/CreateInvoices.vue";

//Staff module
import StaffList from "./pages/staff/StaffList.vue";
import AddStaff from "./pages/staff/AddStaff.vue";
import EditStaff from "./pages/staff/EditStaff.vue";
import ViewStaff from "./pages/staff/ViewStaff.vue";

//Attendance module
import AttendanceList from "./pages/attendance/AttendanceList.vue";
import AddAttendance from "./pages/attendance/AddAttendance.vue";

//Track module
import TrackList from "./pages/track/TrackList.vue";
import AddTrack from "./pages/track/AddTrack.vue";
import EditTrack from "./pages/track/EditTrack.vue";
import ViewTrack from "./pages/track/ViewTrack.vue";

// import PageNotFound from './pages/PageNotFound.vue';

const router = createRouter({
  history: createWebHistory("/"),
  base: "/",
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/dashboard",
      component: Dasboard,
      name: "dashboard",
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: Register,
      name: "register",
      meta: { guest: true },
    },
    { path: "/login", component: Login, name: "login", meta: { guest: true } },
    {
      path: "/change-password",
      component: ChangePassword,
      name: "changepassword",
      meta: { requiresAuth: true },
    },
    //projects module
    {
      path: "/projects",
      component: Projects,
      name: "projects",
      meta: { requiresAuth: true },
    },
    {
      path: "/create_project",
      component: CreateProject,
      name: "create_project",
      meta: { requiresAuth: true },
    },
    {
      path: "/edit_project",
      component: EditProject,
      name: "edit_project",
      meta: { requiresAuth: true },
    },
    {
      path: "/view_project",
      component: ViewProject,
      name: "view_project",
      meta: { requiresAuth: true },
    },
    //clients module
    {
      path: "/clients",
      component: Clients,
      name: "clients",
      meta: { requiresAuth: true },
    },
    {
      path: "/create_client",
      component: CreateClient,
      name: "create_client",
      meta: { requiresAuth: true },
    },
    {
      path: "/edit_client",
      component: EditClient,
      name: "edit_client",
      meta: { requiresAuth: true },
    },
    //business setting
    {
      path: "/business_setting",
      component: BusinessSetting,
      name: "business_setting",
      meta: { requiresAuth: true },
    },
    //invoice module
    {
      path: "/invoices",
      component: Invoice,
      name: "invoice",
      meta: { requiresAuth: true },
    },
    {
      path: "/create_invoice",
      component: CreateInvoice,
      name: "create_invoice",
      meta: { requiresAuth: true },
    },

    //Staff module
    {
      path: "/stafflist",
      component: StaffList,
      name: "StaffList",
      meta: { requiresAuth: true },
    },
    {
      path: "/addstaff",
      component: AddStaff,
      name: "AddStaff",
      meta: { requiresAuth: true },
    },
    {
      path: "/editstaff/:id",
      component: EditStaff,
      name: "EditStaff",
      meta: { requiresAuth: true },
    },
    {
      path: "/viewstaff/:id",
      component: ViewStaff,
      name: "ViewStaff",
      meta: { requiresAuth: true },
    },

    //Attendance module
    {
      path: "/addattendance",
      component: AddAttendance,
      name: "AddAttendance",
      meta: { requiresAuth: true },
    },
    {
      path: "/attendancelist",
      component: AttendanceList,
      name: "AttendanceList",
      meta: { requiresAuth: true },
    },

    //Track module
    {
      path: "/addtrack",
      component: AddTrack,
      name: "AddTrack",
      meta: { requiresAuth: true },
    },
    {
      path: "/tracklist",
      component: TrackList,
      name: "TrackList",
      meta: { requiresAuth: true },
    },
    {
      path: "/viewtrack/:id",
      component: ViewTrack,
      name: "ViewTrack",
      meta: { requiresAuth: true },
    },
    {
      path: "/edittrack/:id",
      component: EditTrack,
      name: "EditTrack",
      meta: { requiresAuth: true },
    },
    // { path: '/forgot-password', component: ForgotPassword, name:'forgotpassword' },
    // { path: '/forgot_password_change', component: ForgotPasswordChange, name:'forgotpasswordchange'},
    // { path: '/clients', component: Clients, name:'clients', meta: { requiresAuth: true } },
    // { path: '/clients/add-client', component: AddClient, name: 'addclient', meta: { requiresAuth: true } }
    // {path: '*', component: PageNotFound, name:'404'}
  ],
});

function loggedIn() {
  return localStorage.getItem("token");
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn()) {
      next({
        path: "/dashboard",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
export default router;
