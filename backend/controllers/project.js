import {
  projectFilter,
  updateProjectById,
  getProjectById,
  insertProject,
  getProjects,
  deleteProjectsById,
} from "../models/projectModel.js";
import jwt from "jsonwebtoken";

//create project
export const createProject = (req, res) => {
  const data = req.body;
  insertProject(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//display project
export const showProjects = (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    const id = decoded.userId;
    const page = req.query.pages;
    getProjects(id, page, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  });
};

//delete project
export const deleteProjects = (req, res) => {
  const id = req.params.id;
  deleteProjectsById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//display project by id
export const showProjectById = (req, res) => {
  getProjectById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//update project
export const updateProject = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateProjectById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//filter on project
export const projectSearch = (req, res) => {
  const data = req.body;
  projectFilter(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
