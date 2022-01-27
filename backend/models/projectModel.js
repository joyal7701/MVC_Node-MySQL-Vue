import db from "../config/database.js";

export const insertProject = (data, result) => {
  db.query("INSERT INTO projects SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result("Project Created", results);
    }
  });
};

export const getProjects = (id, page, result) => {
  const limit = 2;
  const offset = (page - 1) * limit;
  db.query(
    `SELECT * FROM projects WHERE is_status = 1 AND admin_id = ? ORDER BY id DESC`,
    [id],
    (err, length) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        db.query(
          `SELECT * FROM projects WHERE is_status = 1 AND admin_id = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
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

export const deleteProjectsById = (id, result) => {
  // db.query("DELETE FROM projects WHERE id = ?", [id], (err, results) => {
  //     if(err) {
  //         console.log(err);
  //         result(err, null);
  //     } else {
  //         result(null, results);
  //     }
  // });
  db.query(
    "UPDATE projects SET is_status = '0' WHERE id = ?",
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

export const getProjectById = (id, result) => {
  db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const updateProjectById = (data, id, result) => {
  db.query(
    "UPDATE projects SET project_name = ?, client_name = ?, email = ?, phone = ?, description = ?, sign_date = ?, deadline_date = ? WHERE id = ?",
    [
      data.project_name,
      data.client_name,
      data.email,
      data.phone,
      data.description,
      data.sign_date,
      data.deadline_date,
      id,
    ],
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

//project filter query
export const projectFilter = (data, result) => {
  if (data.name == "") {
    db.query(
      `SELECT * FROM projects WHERE admin_id = ? AND is_status = '1' ORDER BY id DESC`,
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
      `SELECT * FROM projects WHERE (project_name LIKE '%${data.name}%' OR email LIKE '%${data.name}%' OR phone LIKE '%${data.name}%' OR client_name LIKE '%${data.name}%' OR description LIKE '%${data.name}%') AND admin_id = ? AND is_status = '1' ORDER BY id DESC`,
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
