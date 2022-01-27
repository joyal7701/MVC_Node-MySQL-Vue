// import connection
import db from "../config/database.js";
import bcrypt from 'bcryptjs';
 

 
// Get Single Product
// export const getProductById = (email, result) => {
//     console.log(result);
//     db.query("SELECT email, password FROM users WHERE email = ?", [email], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             console.log(results[0]);
//               result(null, results);
//         }
//     });    
// }
export const getProductById = (email, result) => {
    console.log(email);
    // console.log(password);
    db.query("SELECT email, password FROM users WHERE email = ?",[email], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
 


// Insert Product to Database
export const insertProduct = (data, result) => {
    const email = data.email;
    db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else{
            console.log(results[0]);
            if(results[0] == undefined){
                
                db.query("INSERT INTO users SET ?", [data], (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result("register Success", results);
                    }
                });
            }else{
                // res.status(200).json({title: "Email address allready exists"});
                result(" allready exists", results);
                // console.log(result("Email allready exists", results));
            }
            
        }
     
});
      
}
 
// Update Product to Database
export const updatePassword = (data, result) => {
    var salt = bcrypt.genSaltSync(10);
    const id = data.id;
    const password = data.current_pass;
    const new_pass = bcrypt.hashSync(data.npassword, salt)
    console.log(password);
    db.query("SELECT password FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else{
            console.log(results[0]);
            var pass = results[0].password;
            if(pass){
                var user_password = bcrypt.compareSync(password, pass );
                console.log(user_password);
                if(user_password == true){
                    db.query("UPDATE users SET password = ? WHERE id = ?", [new_pass, id], (err, results) => {             
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result("update success", results);
                        }
                    });
                }
                else{
                    result("current password not match", results);
                }
                
            }else{
                // res.status(200).json({title: "Email address allready exists"});
                result(" no data exists", results);
                // console.log(result("Email allready exists", results));
            }
            
        }
     
    });
      
}
// export const insertProject = (data, result) => {
//     db.query("INSERT INTO projects SET ?", [data], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result("Project Created", results);
//         }
//     });   
// }

// export const getProjects = (result) => {
//     db.query("SELECT * FROM projects WHERE is_status = 1", (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }

// export const deleteProjectsById = (id, result) => {
//     // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {             
//     //     if(err) {
//     //         console.log(err);
//     //         result(err, null);
//     //     } else {
//     //         result(null, results);
//     //     }
//     // }); 
//     db.query("UPDATE projects SET is_status = '0' WHERE id = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result("Project updated", results);
//         }
//     });    
// }

// export const getProjectById = (id, result) => {
//     db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results[0]);
//         }
//     });   
// }

// export const updateProjectById = (data, id, result) => {
//     console.log(id);
//     db.query("UPDATE projects SET project_name = ?, client_name = ?, email = ?, phone = ?, description = ?, sign_date = ?, deadline_date = ? WHERE id = ?", [data.project_name, data.client_name, data.email, data.phone, data.description, data.sign_date, data.deadline_date, id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result("Project updated", results);
//         }
//     });   
// }

export const getCurrencise = (result) => {
    db.query("SELECT code FROM currency", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

export const getCountries = (result) => {
    db.query("SELECT countryname FROM country", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// export const insertIndividual = (data, result) => {
//     const email = data.email;
//     db.query("SELECT email FROM clients WHERE email = ?", [email], (err, results) => {
//         if (err) {
//             console.log(err);
//             result(err, null);
//         }
//         else{
//             console.log(results[0]);
//             if(results[0] == undefined){
                
//                 db.query("INSERT INTO clients SET ?", [data], (err, results) => {             
//                     if(err) {
//                         console.log(err);
//                         result(err, null);
//                     } else {
//                         result("Client successfully add", results);
//                     }
//                 });
//             }else{
//                 // res.status(200).json({title: "Email address allready exists"});
//                 result("Email allready exists", results);
//                 // console.log(result("Email allready exists", results));
//             }
            
//         }
     
// });
      
// }

// export const getClients = (result) => {
//     db.query("SELECT * FROM clients WHERE is_status = 1", (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }

// export const getClientById = (id, result) => {
//     db.query("SELECT * FROM clients WHERE id = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results[0]);
//         }
//     });   
// }

// export const updateClientById = (data, id, result) => {
//     db.query("UPDATE clients SET  name = ?, organization = ?, email = ?, website = ?, phone = ?, fax = ?, address = ?, pincode = ?, city = ?, state = ?, country = ?, currency = ?, taxno = ?, notes = ? WHERE id = ?", [data.name, data.organization, data.email, data.website, data.phone, data.fax, data.address, data.pincode, data.city, data.state, data.country, data.currency, data.taxno, data.notes, id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result("Clients updated", results);
//         }
//     });   
// }

// export const deleteClientsById = (id, result) => {
//     // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {             
//     //     if(err) {
//     //         console.log(err);
//     //         result(err, null);
//     //     } else {
//     //         result(null, results);
//     //     }
//     // }); 
//     db.query("UPDATE clients SET is_status = '0' WHERE id = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result("Project updated", results);
//         }
//     });    
// }

export const insertBusinessIndividual = (data, result) => {
    const email = data.email;
    // db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         result(err, null);
    //     }
    //     else{
    //         console.log(results[0]);
    //         if(results[0] == undefined){
                
                db.query("UPDATE users SET fullname = ?, cname = ?, image = ?, phone = ?, client_type = ?, website = ?, fax = ?, address = ?, pincode = ?, city = ?, state = ?, country = ?, currency = ?, taxname_one = ?, taxno_one = ?, taxname_two = ?, taxno_two = ?, notes = ?, is_business = '1' WHERE email = ?", [data.name, data.cname,  data.image, data.phone, data.client_type, data.website, data.fax, data.address, data.pincode, data.city, data.state, data.country, data.currency, data.taxname_one, data.taxno_one, data.taxname_two, data.taxno_two, data.notes, data.email], (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result("Business updated", results);
                    }
                });
            // }else{
            //     // res.status(200).json({title: "Email address allready exists"});
            //     result("Email allready exists", results);
            //     // console.log(result("Email allready exists", results));
            // }
            
        // }
     
};

export const insertBusinessOrganization = (data, result) => {
    const email = data.email;
    // db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         result(err, null);
    //     }
    //     else{
    //         console.log(results[0]);
    //         if(results[0] == undefined){
                
                db.query("UPDATE users SET fullname = ?, phone = ?, cname = ?, client_type = ?, website = ?, fax = ?, address = ?, pincode = ?, city = ?, state = ?, country = ?, currency = ?, taxname_one = ?, taxno_one = ?, taxname_two = ?, taxno_two = ?, notes = ?, is_business = '1' WHERE email = ?", [data.name, data.phone, data.organization, data.client_type, data.website, data.fax, data.address, data.pincode, data.city, data.state, data.country, data.currency, data.taxname_one, data.taxno_one, data.taxname_two, data.taxno_two, data.notes, data.email], (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result("Business updated", results);
                    }
                });
            // }else{
            //     // res.status(200).json({title: "Email address allready exists"});
            //     result("Email allready exists", results);
            //     // console.log(result("Email allready exists", results));
            // }
            
        // }
     
};

export const insertTaxDetails = (data, result) => {
     var i; 
    for(i of data.user_data){
        const tax_name = i.tax_name;
        const admin_id = i.admin_id;
        const tax_rate = i.tax_rate;
        if(i.id){
            db.query("UPDATE tax_details SET tax_name = ?, tax_rate = ? WHERE admin_id = ? AND id = ?", [tax_name, tax_rate, admin_id, i.id] ,(results) => {     
            console.log(i.id);
            if(results){
                result("Tax Update", results);
            }
            
            });
        }
        else{
            db.query("INSERT INTO tax_details (tax_name, tax_rate, admin_id) VALUES (?, ?, ?)", [i.tax_name, i.tax_rate, i.admin_id], (results) => {
            console.log('no id');
            if(results){
                result("Tax Insert", results);
            }
                
            
        });
        }
    }                
           
};
export const getTaxDetails = (data, result) => {
    db.query("SELECT * FROM tax_details WHERE admin_id = ? AND is_active = '1'", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
};

export const deleteTaxById = (id, result) => {
   
    // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {             
    //     if(err) {
    //         console.log(err);
    //         result(err, null);
    //     } else {
    //         result(null, results);
    //     }
    // }); 
    db.query("UPDATE tax_details SET is_active = '0' WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result("Tax remove", results);
        }
    });    
}