import {
  insertTrack,
  getTrack,
  getTrackById,
  updateTrack,
  deleteTrackById,
  gettrackCSV,
  trackProjects,
  trackStaffs,
  trackFilter,
} from "../models/trackModel.js";
import jwt from "jsonwebtoken";

export const addTrack = (req, res) => {
  const data = req.body;
  insertTrack(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const trackList = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    getTrack(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const deleteTrack = (req, res) => {
  const id = req.params.id;
  deleteTrackById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showTrackById = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const adminid = decoded.userId;
    getTrackById(req.params.id, adminid, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const editTrack = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateTrack(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const trackCSV = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    gettrackCSV(res, id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const projectsfortrack = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    trackProjects(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

export const staffsfortrack = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    trackStaffs(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

//filter on track
export const trackSearch = (req, res) => {
  const data = req.body;
  trackFilter(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
