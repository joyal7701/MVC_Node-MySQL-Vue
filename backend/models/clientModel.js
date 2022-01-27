import db from "../config/database.js";

export const insertIndividual = (data, result) => {
  const email = data.email;
  db.query(
    "SELECT email FROM clients WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(results[0]);
        if (results[0] == undefined) {
          db.query("INSERT INTO clients SET ?", [data], (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              result("Client successfully add", results);
            }
          });
        } else {
          // res.status(200).json({title: "Email address allready exists"});
          result("Email allready exists", results);
          // console.log(result("Email allready exists", results));
        }
      }
    }
  );
};

export const getClients = (id, page, result) => {
  const limit = 1;
  const offset = (page - 1) * limit;
  db.query(
    `SELECT * FROM clients WHERE is_status = 1 AND admin_id = ? ORDER BY id DESC`,
    [id],
    (err, length) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        db.query(
          `SELECT * FROM clients WHERE is_status = 1 AND admin_id = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
          [id],
          (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              const numberofPage = Math.ceil(results.length / limit);
              result({ results, page, numberofPage, length });
            }
          }
        );
      }
    }
  );
};

export const getClientById = (id, result) => {
  db.query("SELECT * FROM clients WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const updateClientById = (data, id, result) => {
  db.query(
    "UPDATE clients SET  name = ?, organization = ?, email = ?, website = ?, phone = ?, fax = ?, address = ?, pincode = ?, city = ?, state = ?, country = ?, currency = ?, taxno = ?, notes = ? WHERE id = ?",
    [
      data.name,
      data.organization,
      data.email,
      data.website,
      data.phone,
      data.fax,
      data.address,
      data.pincode,
      data.city,
      data.state,
      data.country,
      data.currency,
      data.taxno,
      data.notes,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result("Clients updated", results);
      }
    }
  );
};

export const deleteClientsById = (id, result) => {
  // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {
  //     if(err) {
  //         console.log(err);
  //         result(err, null);
  //     } else {
  //         result(null, results);
  //     }
  // });
  db.query(
    "UPDATE clients SET is_status = '0' WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result("Project updated", results);
      }
    }
  );
};

export const clientFilter = (data, page, result) => {
  const limit = 1;
  const offset = (page - 1) * limit;
  // if(data.name == ''){
  db.query(
    `SELECT * FROM clients WHERE (name LIKE '%${data.name}%' OR email LIKE '%${data.name}%' OR phone LIKE '%${data.name}%' OR country LIKE '%${data.name}%') AND is_status = 1 AND admin_id = ? ORDER BY id DESC`,
    [data.admin_id],
    (err, length) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        db.query(
          `SELECT * FROM clients WHERE (name LIKE '%${data.name}%' OR email LIKE '%${data.name}%' OR phone LIKE '%${data.name}%' OR country LIKE '%${data.name}%') AND is_status = 1 AND admin_id = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
          [data.admin_id],
          (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              const numberofPage = Math.ceil(results.length / limit);
              result({ results, page, numberofPage, length });
            }
          }
        );
      }
    }
  );
  // db.query(`SELECT * FROM clients WHERE admin_id = ? AND is_status = '1' ORDER BY id DESC`, [data.admin_id], (err, results) => {
  //     if(err) {
  //         console.log(err);
  //         result(err, null);
  //     } else {

  //         result(null, results);
  //     }
  // });
  // }else{
  //     db.query(`SELECT * FROM clients WHERE (name LIKE '%${data.name}%' OR email LIKE '%${data.name}%' OR phone LIKE '%${data.name}%' OR country LIKE '%${data.name}%') AND admin_id = ? AND is_status = '1' ORDER BY id DESC`, [data.admin_id], (err, results) => {
  //         if(err) {
  //             console.log(err);
  //             result(err, null);
  //         } else {

  //             result(null, results);
  //         }
  //     });
  // }
};
