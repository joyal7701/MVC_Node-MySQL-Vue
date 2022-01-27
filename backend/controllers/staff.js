import {
  getStaff,
  insertStaff,
  updateStaff,
  getStaffById,
  deleteStaffById,
  staffFilter,
} from "../models/staffModel.js";
import jwt from "jsonwebtoken";

export const staffList = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    const page = req.query.pages;
    getStaff(id, page, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const addStaff = (req, res) => {
  const data = req.body;
  insertStaff(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
};

export const editStaff = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateStaff(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showStaffById = (req, res) => {
  getStaffById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const deleteStaff = (req, res) => {
  const id = req.params.id;
  deleteStaffById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//filter on staff
export const staffSearch = (req, res) => {
  const data = req.body;
  staffFilter(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
