import { invoiceFilter, catSearchFilter, setUnpaidInvoices, insertInvoice, insertInvoiceDetail, getInvoice, paidInvoiceById, setInvoiceSeries } from "../models/invoiceModel.js";
import jwt from 'jsonwebtoken';
// import db from "../config/database.js";

export const createInvoices = (req, res) => {
    const data = req.body;
    insertInvoice(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const invoiceDetails = (req, res) => {
    const data = req.body;
    insertInvoiceDetail(data,  (err, results) => {
        if (err){ 
                    res.json(err);  
            //  res.status(400).json({
            //     status: 'error',
            //     error: 'req body cannot be empty',
            //   });
        }else{
            
            res.json(results);
        }
    });
}


export const showInoives = (req, res) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
          title: 'unauthorized'
        })
        const data = decoded.userId;
    
    getInvoice(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
});
}

export const paidInvoice = (req, res) => {
    const id = req.params.id;
    paidInvoiceById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
//invoice series
export const invoiceSeries = (req, res) => {
   const data = req.params.id;
    console.log(data);
    
    setInvoiceSeries(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

}



//multiple update invoices
export const unpaidInvoices = (req, res) => {
    const data = req.body;
    setUnpaidInvoices(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}


//invoice category search
export const invoiceCatSearch = (req, res) => {
    const data = req.body;
    catSearchFilter(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

//filter  client name on invoice
export const invoiceSearch = (req, res) => {
    const data = req.body;
    invoiceFilter(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}