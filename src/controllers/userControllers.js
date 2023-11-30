const users = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    city: "Paris",
    language: "English",
  },
  {
    firstname: "Valeriy",
    lastname: "Appius",
    email: "valeriy.appius@example.com",
    city: "Moscow",
    language: "Russian",
  },
  {
    firstname: "Ralf",
    lastname: "Geronimo",
    email: "ralf.geronimo@example.com",
    city: "New York",
    language: "Italian",
  },
  {
    firstname: "Maria",
    lastname: "Iskandar",
    email: "maria.iskandar@example.com",
    city: "New York",
    language: "German",
  },
  {
    firstname: "Jane",
    lastname: "Doe",
    email: "jane.doe@example.com",
    city: "London",
    language: "English",
  },
  {
    firstname: "Johanna",
    lastname: "Martino",
    email: "johanna.martino@example.com",
    city: "Milan",
    language: "Spanish",
  },
];

const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language && req.query.city) {
    sql += " WHERE language = ? AND city = ?";
    sqlValues.push(req.query.language, req.query.city);
  } else if (req.query.language) {
    sql += " WHERE language = ?";
    sqlValues.push(req.query.language);
  } else if (req.query.city) {
    sql += " WHERE city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(200);
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      res.status(422).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(422).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.sendStatus(204);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUser,
  deleteUser,
};
