// Import function from Product Model
import { deleteTaxById, getTaxDetails, insertTaxDetails, insertBusinessOrganization, insertBusinessIndividual,  getCountries, getCurrencise,  getProductById, insertProduct, updatePassword,  } from "../models/usersModel.js";
import bcrypt from 'bcryptjs';

import db from "../config/database.js";
import jwt from 'jsonwebtoken';
let id = '';
 
// admin login 
export const showProductById = (req, res) => {
    const user_email = req.body.email;
    let user_password = false;
    
    const password = req.body.password;
    
    db.query("SELECT id, password FROM users WHERE email = ?",[user_email], (err, results) => {
        if(err) {
            console.log(err);
            // result(err, null);
        } else {
            const data = results[0];
            console.log(data);    
            if(data !== undefined){                
                const hash_pass = results[0].password;
                user_password = bcrypt.compareSync(password, hash_pass ); 
                id = results[0].id;
            }
            // result(null, results);
        }
    });
    getProductById(user_email,  (err, results) => {
        if (err){
            res.send(err);
        }else{
           const email = results;
            if(email !== undefined){
                if(email.email == user_email && user_password == true){
                    let token = jwt.sign({ userId: id}, 'secretkey');  
                    res.status(200).json({title: "Login Success", token: token});
                    // res.json(results);
                }
                else{
                    // res.send("Invalid Creadintial");
                    res.status(200).json({title: "Invalid Creadintial"});
                    // res.json(results);
                }
            }
            else{
                // res.send("No Data");
                res.status(200).json({title: "No Data"});
                //  res.json(results);
            }
            // res.json(results);
        }
    });
}
// register admin
export const createProduct = (req, res) => {
    const data = req.body;
    console.log(data);
    
    insertProduct(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
            console.log(results);
            
        }
    });
}
// Delete Product
// export const deleteProduct = (req, res) => {
    
//     let token = req.headers.token; //token
//      if(token){
//         // localStorage.removeItem(token);
//         return res.status(200).json({title: 'logout success'});
//      }
//      else{
//         return res.status(200).json({title: 'logout all'});
//      }
// }

//get user
export const getUser = (req, res) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
          title: 'unauthorized'
        })
        const tokenid = decoded.userId;
        db.query("SELECT * FROM users WHERE id = ?",[tokenid], (err, results) => {
            if(err) {
                console.log(err);
                // result(err, null);
            } else {
                // console.log(results[0]);
                return res.status(200).json({
                    title: 'user grabbed',
                    user: {
                      email: results[0].email,
                      name: results[0].fullname,
                      id: results[0].id,
                      is_business: results[0].is_business,
                      cname: results[0].cname,
                      phone: results[0].phone,
                      client_type: results[0].client_type,
                      website: results[0].website,
                      fax: results[0].fax,
                      address: results[0].address,
                      pincode: results[0].pincode,
                      city: results[0].city,
                      state: results[0].state,
                      country: results[0].country,
                      currency: results[0].currency,
                      taxname_one: results[0].taxname_one,
                      taxno_one: results[0].taxno_one,
                      taxname_two: results[0].taxname_two,
                      taxno_two: results[0].taxno_two,
                      notes: results[0].notes,
                      image: results[0].image,
                    }
                  })
            }
        }); 
    }) 
}

//update password
export const updatePass = (req, res) => {
    const data = req.body;
    console.log(data);
  
    updatePassword(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
            console.log(results);
            console.log('67');
        }
    });
}

//create project
// export const createProject = (req, res) => {
//     const data = req.body;
//     insertProject(data, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// //display project
// export const showProjects = (req, res) => {
//     getProjects((err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// //delete project
// export const deleteProjects = (req, res) => {
//     const id = req.params.id;
//     deleteProjectsById(id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// //display project by id
// export const showProjectById = (req, res) => {
//     getProjectById(req.params.id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// //update project
// export const updateProject = (req, res) => {
//     const data  = req.body;
//     const id    = req.params.id;
//     updateProjectById(data, id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

export const getCurrency = (req, res) => {
    getCurrencise((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const getCountry = (req, res) => {
    getCountries((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// export const addIndividual = (req, res) => {
//     const data = req.body;
//     insertIndividual(data, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// export const showClients = (req, res) => {
//     getClients((err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// export const showClientById = (req, res) => {
//     getClientById(req.params.id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }
// export const updateClient = (req, res) => {
//     const data  = req.body;
//     const id    = req.params.id;
//     updateClientById(data, id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

// export const deleteClients = (req, res) => {
//     const id = req.params.id;
//     deleteClientsById(id, (err, results) => {
//         if (err){
//             res.send(err);
//         }else{
//             res.json(results);
//         }
//     });
// }

export const addBusinessIndividual = (req, res) => {
    const data = req.body;
    insertBusinessIndividual(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const businessOrganization = (req, res) => {
    const data = req.body;
    insertBusinessOrganization(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const tax_details = (req, res) => {
    const data = req.body;
    insertTaxDetails(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const get_tax_details = (req, res) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
          title: 'unauthorized'
        })
        const data = decoded.userId;
        
        
        getTaxDetails(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
    }) 
}

export const remove_tax = (req, res) => {
    const id = req.params.id;
    
    deleteTaxById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}