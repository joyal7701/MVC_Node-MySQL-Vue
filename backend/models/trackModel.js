import db from "../config/database.js";
import fastcsv from "fast-csv";
import fs from "fs";

export const insertTrack = (data, result) => {
  db.query(
    "INSERT INTO track SET staffid = ?,projectid = ?,date = ?,checkin = ?,checkout = ?,task= ?,admin_id=?,time=TIMEDIFF(checkout, checkin)",
    [
      data.staffid,
      data.projectid,
      data.date,
      data.checkin,
      data.checkout,
      data.task,
      data.admin_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result("Track Added", results);
      }
    }
  );
};

export const getTrack = (id, result) => {
  db.query(
    "SELECT st.name,pt.project_name,track.* from `track` INNER JOIN staff as st ON track.staffid=st.id INNER JOIN projects as pt ON track.projectid=pt.id WHERE track.admin_id=?",
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

export const getTrackById = (id, adminid, result) => {
  db.query(
    "SELECT st.name,pt.project_name,track.* from `track` INNER JOIN staff as st ON track.staffid=st.id INNER JOIN projects as pt ON track.projectid=pt.id WHERE track.id=? AND track.admin_id=?",
    [id, adminid],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const updateTrack = (data, id, result) => {
  db.query(
    "UPDATE track SET staffid = ?,projectid = ?,date = ?,checkin = ?,checkout = ?,task= ?,time=TIMEDIFF(checkout, checkin),modifiedDate=current_timestamp() WHERE id = ?",
    [
      data.staffid,
      data.projectid,
      data.date,
      data.checkin,
      data.checkout,
      data.task,
      id,
    ],
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

export const deleteTrackById = (id, result) => {
  db.query("DELETE FROM track WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const gettrackCSV = (res, id) => {
  db.query(
    "SELECT st.name,date,checkin,checkout,time,pt.project_name,task from `track` INNER JOIN staff as st ON track.staffid=st.id INNER JOIN projects as pt ON track.projectid=pt.id WHERE track.admin_id=?",
    [id],
    (err, track) => {
      if (err) {
        console.log(err);
      } else {
        res.send(track);
      }
    }
  );
};

export const trackProjects = (id, result) => {
  db.query(
    "SELECT * FROM projects WHERE is_status = 1 AND admin_id = ?",
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

export const trackStaffs = (id, result) => {
  db.query(
    "SELECT * FROM staff WHERE is_status = 1 AND admin_id = ?",
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

export const trackFilter = (data, result) => {
  let xyz = "";
  let ar = [data.admin_id];
  // if (data.staffid !== "") {
  //   xyz += "staffid= ? ";
  //   ar.push(data.staffid);
  // }
  // if (data.projectid !== "") {
  //   xyz += "projectid= ? ";
  //   ar.push(data.projectid);
  // }
  if (data.staffid !== "" && data.projectid !== "") {
    xyz += "staffid= ? AND projectid= ?";
    ar.push(data.staffid);
    ar.push(data.projectid);
  } else {
    if (data.staffid !== "") {
      xyz += "staffid= ? ";
      ar.push(data.staffid);
    } else {
      xyz += "projectid= ? ";
      ar.push(data.projectid);
    }
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
    "SELECT st.name,pt.project_name,track.* from `track` INNER JOIN staff as st ON track.staffid=st.id INNER JOIN projects as pt ON track.projectid=pt.id WHERE track.admin_id=? AND (" +
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
