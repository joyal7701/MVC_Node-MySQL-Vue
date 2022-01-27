import db from "../config/database.js";
import alert from "alert";

export const getStaff = (id, page, result) => {
  const limit = 2;
  const offset = (page - 1) * limit;
  db.query(
    "SELECT * FROM staff WHERE is_status = 1 AND admin_id=? ORDER BY id DESC",
    [id],
    (err, length) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        db.query(
          `SELECT * FROM staff WHERE is_status = 1 AND admin_id = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
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

export const insertStaff = (data, result) => {
  const email = data.email;
  db.query(
    "SELECT email FROM staff WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(results[0]);
        if (results[0] == undefined) {
          db.query("INSERT INTO staff SET ?", [data], (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              result(null, results);
            }
          });
        } else {
          result(alert("Email allready exists"), results);
        }
      }
    }
  );
};

export const updateStaff = (data, id, result) => {
  if (data.photo || data.doc1 || data.doc2) {
    db.query(
      "UPDATE staff SET photo =?,doc1 = ?,doc2 = ?,modifiedDate=current_timestamp() WHERE id = ?",
      [data.photo, data.doc1, data.doc2, id],
      (err, results1) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          db.query(
            "UPDATE staff SET name = ?, email = ?,phone = ?,address = ?,password = ?,note = ?,modifiedDate=current_timestamp() WHERE id = ?",
            [
              data.name,
              data.email,
              data.phone,
              data.address,
              data.password,
              data.note,
              id,
            ],
            (err, results) => {
              if (err) {
                console.log(err);
                result(err, null);
              } else {
                result(null, {
                  result1: results1,
                  result2: results,
                });
              }
            }
          );
          // result(null, results1);
        }
      }
    );
  } else {
    db.query(
      "UPDATE staff SET name = ?, email = ?,phone = ?,address = ?,password = ?,note = ?,modifiedDate=current_timestamp() WHERE id = ?",
      [
        data.name,
        data.email,
        data.phone,
        data.address,
        data.password,
        data.note,
        id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
};

export const getStaffById = (id, result) => {
  db.query("SELECT * FROM staff WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const deleteStaffById = (id, result) => {
  db.query(
    "UPDATE staff SET is_status = '0', deletedDate=current_timestamp()  WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

//staff filter query
export const staffFilter = (data, result) => {
  if (data.name == "") {
    console.log("hi");
    db.query(
      `SELECT * FROM staff WHERE admin_id = ? AND is_status = '1' ORDER BY id DESC`,
      [data.admin_id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM staff WHERE (name LIKE '%${data.name}%' OR email LIKE '%${data.name}%' OR phone LIKE '%${data.name}%' OR address LIKE '%${data.name}%' OR note LIKE '%${data.name}%') AND admin_id = ? AND is_status = '1' ORDER BY id DESC`,
      [data.admin_id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
};
