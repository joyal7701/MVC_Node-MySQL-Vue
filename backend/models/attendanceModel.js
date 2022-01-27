import db from "../config/database.js";
import fastcsv from "fast-csv";
import fs from "fs";

export const insertAttendance = (data, result) => {
  console.log(data);
  db.query(
    "INSERT INTO attendance SET staffid = ?,date = ?,checkin = ?,checkout = ?,isCheckout=?,admin_id=?,hours=TIMEDIFF(checkout, checkin)",
    [
      data.staffid,
      data.date,
      data.checkin,
      data.checkout,
      data.isCheckout,
      data.admin_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result("Attendance Added", results);
      }
    }
  );
};

export const getAttendance = (id, result) => {
  db.query(
    "SELECT st.name,attendance.* FROM `attendance` INNER JOIN staff as st ON attendance.staffid=st.id WHERE attendance.admin_id=?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getattendanceCSV = (res, id) => {
  db.query(
    "SELECT st.name,date,checkin,checkout,hours,isCheckout FROM `attendance` INNER JOIN staff as st ON attendance.staffid=st.id WHERE attendance.admin_id=?",
    [id],
    (err, attendance) => {
      if (err) {
        console.log(err);
      } else {
        res.send(attendance);
      }
    }
  );
};

//attendance filter query
export const attendanceFilter = (data, result) => {
  let xyz = "";
  let ar = [data.admin_id];
  if (data.staffid !== "") {
    xyz += "staffid= ? ";
    ar.push(data.staffid);
  }
  if (data.indate !== "" || data.outdate !== "") {
    if (xyz !== "") {
      xyz += " AND ";
    }
    if (data.indate !== "" && data.outdate !== "") {
      xyz += "date BETWEEN ? AND ?";
      ar.push(data.indate);
      ar.push(data.outdate);
    } else if (data.indate !== "") {
      xyz += "date= ? ";
      ar.push(data.indate);
    } else if (data.outdate !== "") {
      xyz += "date= ? ";
      ar.push(data.outdate);
    }
  }
  db.query(
    "SELECT st.name,attendance.* FROM attendance INNER JOIN staff as st ON attendance.staffid=st.id WHERE attendance.admin_id = ? AND (" +
      xyz +
      ") AND st.is_status=1 ORDER BY date DESC",
    ar,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
