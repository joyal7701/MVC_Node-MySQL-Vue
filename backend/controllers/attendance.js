import {
  insertAttendance,
  getAttendance,
  getattendanceCSV,
  attendanceFilter,
} from "../models/attendanceModel.js";
import jwt from "jsonwebtoken";

export const addAttendance = (req, res) => {
  const data = req.body;
  insertAttendance(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const attendanceList = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    getAttendance(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const attendanceCSV = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    getattendanceCSV(res, id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

//filter on attendance
export const attendanceSearch = (req, res) => {
  const data = req.body;
  console.log(data);
  attendanceFilter(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
