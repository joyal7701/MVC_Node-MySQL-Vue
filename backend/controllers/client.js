import { clientFilter, deleteClientsById, updateClientById, getClientById, getClients, insertIndividual } from "../models/clientModel.js";
import jwt from 'jsonwebtoken';
import db from "../config/database.js";

export const addIndividual = (req, res) => {
    const data = req.body;
    insertIndividual(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showClients = (req, res) => {
    const resultPerPage = 1;
    
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
          title: 'unauthorized'
        })
        const data = decoded.userId;
        const page = req.query.pages;

        getClients(data,page, (err, results) => {
            if (err){
                res.send(err);
            }else{
                console.log(results);
                res.json(results);
            }
        });
    });
}

export const showClientById = (req, res) => {
    getClientById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
export const updateClient = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateClientById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const deleteClients = (req, res) => {
    const id = req.params.id;
    deleteClientsById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const clientSearch = (req, res) => {
    const data = req.body;
    const page = req.query.pages;
    clientFilter(data, page, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}