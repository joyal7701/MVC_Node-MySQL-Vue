import db from "../config/database.js";

export const insertInvoice = (data, result) => {
    console.log(data);
    db.query("INSERT INTO invoices SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result("Invoice created", results);
        }
    });    
}

export const insertInvoiceDetail = (data, result) => {   
    var i;  
    for(i of data.user_data){
        db.query("INSERT INTO invoice_details SET ?", [i]
        );
        result("Invoice Created");
    }
    
       
}

export const getInvoice = (data, result) => {
    
    db.query("SELECT cl.name, invoices.* FROM `invoices` INNER JOIN clients as cl ON invoices.client_id = cl.id WHERE invoices.admin_id = ? ORDER BY id DESC", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });      
}

export const paidInvoiceById = (id, result) => {
    var date = new Date();
    // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {             
    //     if(err) {
    //         console.log(err);
    //         result(err, null);
    //     } else {
    //         result(null, results);
    //     }
    // }); 

    db.query("UPDATE invoices SET is_paid = '1', updated_at = ? WHERE id = ?", [date, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result("Project updated", results);
        }
    });    
}

export const setInvoiceSeries = (data, result) => { 
    db.query("SELECT COUNT(admin_id) AS count FROM invoices WHERE admin_id = ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const todaysDate = new Date();
            const currentYear = todaysDate.getFullYear();
            const currentMonth = todaysDate.getMonth()+1;
            if (currentMonth < 10) {
                var month = '0'+''+currentMonth;
            }
            var count = results[0]['count'];
            count++;
            if(count < 10){
                var temp = '0'+''+count;
            }
            var series = currentYear+''+month+'-'+temp;
            console.log(series);
            // console.log(results.length);
            result(series, results);
            
        }
    });   
}



//update multiple  invoices 
export const setUnpaidInvoices = (data, result) => {
    var date = new Date();
    var i = 0;
    const cat_id = data.cat_id;
    const detial = data.multiple_id;
    for(i of detial){
        if(cat_id == 0){
            //unpaid
            if(i){
                db.query("UPDATE invoices SET is_paid = '0', updated_at = ? WHERE id = ?", [date, i]);
            }
        }
        else if(cat_id == 1){
            //paid
            if(i){
                db.query("UPDATE invoices SET is_paid = '1', updated_at = ? WHERE id = ?", [date, i]);
            }
        }
        else if(cat_id == 2){
            //archived
            if(i){
                db.query("UPDATE invoices SET is_paid = '2', updated_at = ? WHERE id = ?", [date, i]);
            }
        }
        else{
            //cancle
            if(i){
                db.query("UPDATE invoices SET is_paid = '3', updated_at = ? WHERE id = ?", [date, i]);
            }
        }
    }
    result("Status Update");
    
}



//invoice category search
export const catSearchFilter = (data, result) => {
    var order, invoices = 'invoices',total = 'total',due_date = 'due_date', cat;
    //sort by category
    if(data.cat_id == '0'){
        cat = 0;
    }
    else if(data.cat_id == '1'){
        cat = 1;
    }
    else if(data.cat_id == '2'){
        cat = 2;
    }
    else if(data.cat_id == '3'){
        cat = 3;
    }
    else if(data.cat_id == ''){
        cat = '';  
    }
    else{
        order = 'id DESC';
    }

    //sort by order
    if(data.sort_by == 'amt_desc'){
        order = invoices+'.'+total+ ' ' + 'DESC';
    }
    else if(data.sort_by == "dt_desc"){
        order = invoices+'.'+due_date + ' ' + 'DESC';
    }
    else if(data.sort_by == 'amt_asc'){
        order = invoices+'.'+total+ ' ' + 'ASC';
    }
    else if(data.sort_by == 'dt_asc'){
        order = invoices+'.'+due_date + ' ' + 'ASC';
    }
    else{
        order = 'id DESC';
    }
    const sql = db.query(`SELECT cl.name, invoices.* FROM invoices INNER JOIN clients as cl ON invoices.client_id = cl.id WHERE (invoices.is_paid LIKE '%${cat}%' ) AND invoices.admin_id = ? ORDER By ${order} `, [data.admin_id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {            
            result(null, results);
        }
    });            
}
//filter client name on invoice
export const invoiceFilter = (data, result) => {
    if(data.name == ''){
        db.query(`SELECT cl.name, invoices.* FROM invoices INNER JOIN clients as cl ON invoices.client_id = cl.id WHERE invoices.admin_id = ? ORDER BY invoices.id DESC`, [data.admin_id], (err, results) => {             
            
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                
                result(null, results);
            }
        }); 
    }else{
        db.query(`SELECT cl.name, invoices.* FROM invoices INNER JOIN clients as cl ON invoices.client_id = cl.id WHERE (cl.name LIKE '%${data.name}%') AND invoices.admin_id = ? AND cl.is_status = '1' ORDER BY invoices.id DESC`, [data.admin_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                
                result(null, results);
            }
        });  
    }
     
}