// import express
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
// import function from controller
// import { showProducts, showProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import {
  remove_tax,
  get_tax_details,
  businessOrganization,
  addBusinessIndividual,
  tax_details,
  getCountry,
  getCurrency,
  showProductById,
  createProduct,
  getUser,
  updatePass,
} from "../controllers/users.js";
import {
  projectSearch,
  createProject,
  showProjects,
  showProjectById,
  updateProject,
  deleteProjects,
} from "../controllers/project.js";
import {
  addIndividual,
  showClients,
  showClientById,
  updateClient,
  deleteClients,
  clientSearch,
} from "../controllers/client.js";
import {
  invoiceSearch,
  invoiceCatSearch,
  unpaidInvoices,
  createInvoices,
  invoiceDetails,
  showInoives,
  paidInvoice,
  invoiceSeries,
} from "../controllers/invoices.js";
import {
  staffList,
  showStaffById,
  addStaff,
  editStaff,
  deleteStaff,
  staffSearch,
} from "../controllers/staff.js";
import {
  addAttendance,
  attendanceList,
  attendanceCSV,
  attendanceSearch,
} from "../controllers/attendance.js";
import {
  addTrack,
  showTrackById,
  trackList,
  editTrack,
  deleteTrack,
  trackCSV,
  projectsfortrack,
  staffsfortrack,
  trackSearch,
} from "../controllers/track.js";
// init express router

const router = express.Router();

router.use(
  session({
    secret: "email",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(cookieParser());
// Get All Product
// router.get('/products', showProducts);

// login admin
router.post("/login", showProductById);

// register admin
router.post("/register", createProduct);
//password update
router.post("/updat-pass", updatePass);

//project module
router.post("/projects", createProject);
router.get("/projects", showProjects);
router.get("/projects/:id", showProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProjects);
router.post("/project_search", projectSearch);

//get currency
router.get("/currency", getCurrency);
//get country
router.get("/country", getCountry);

//get user
router.get("/user", getUser);

//client module
router.post("/add_individual", addIndividual);
router.get("/clients", showClients);
router.get("/clients/:id", showClientById);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClients);
router.post("/client_search", clientSearch);

//business profile
router.put("/add_business", addBusinessIndividual);
router.put("/business_organization", businessOrganization);
router.post("/tax_details", tax_details);
router.get("/tax_details", get_tax_details);
router.delete("/tax_details/:id", remove_tax);

// image upload in business profile
const storage = multer.diskStorage({
  destination: "../frontend/src/assets/uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/imageupload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file.filename });
});

//invoice router
router.post("/invoices", createInvoices);
router.post("/invoice_details", invoiceDetails);
router.get("/get_inovoice", showInoives);
router.delete("/paid_invoice/:id", paidInvoice);
router.post("/invoice_no/:id", invoiceSeries);
router.post("/unpaid_invoices", unpaidInvoices);
router.post("/invoice_cat_search", invoiceCatSearch);
router.post("/invoices_search", invoiceSearch);

//For Staff Module
var multipleUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "doc1", maxCount: 1 },
  { name: "doc2", maxCount: 1 },
]);

router.post("/upload", multipleUpload, (req, res) => {
  console.log(req.files);
  res.json({ files: req.files });
});

router.put("/upload/:id", multipleUpload, (req, res) => {
  console.log(req.files);
  res.json({ files: req.files });
});

//Staff router
router.get("/staff", staffList);
router.get("/staff/:id", showStaffById);
router.post("/staff", addStaff);
router.put("/staff/:id", editStaff);
router.delete("/staff/:id", deleteStaff);
router.post("/staff_search", staffSearch);

//Attendance router
router.post("/attendance", addAttendance);
router.get("/attendance", attendanceList);
router.get("/attendancecsv", attendanceCSV);
router.post("/attendance_search", attendanceSearch);

//Track router
router.post("/track", addTrack);
router.get("/track/:id", showTrackById);
router.get("/track", trackList);
router.put("/track/:id", editTrack);
router.delete("/track/:id", deleteTrack);
router.get("/trackcsv", trackCSV);
router.get("/projectsfortrack", projectsfortrack);
router.get("/staffsfortrack", staffsfortrack);
router.post("/track_search", trackSearch);

export default router;
