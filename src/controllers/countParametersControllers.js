const countParameters = [
  {
    id: 1,
    historyId: 1,
    userId: 101,
    filmId: 201,
    visualisationDate: "2023-01-15",
  },
  {
    id: 2,
    historyId: 2,
    userId: 102,
    filmId: 202,
    visualisationDate: "2023-02-02",
  },
  {
    id: 3,
    historyId: 3,
    userId: 103,
    filmId: 203,
    visualisationDate: "2023-03-10",
  },
];

const database = require("../../database");

const getCountParameters = (req, res) => {
  let sql = "SELECT * from countParameters";
  const sqlValues = [];

  if (req.query.historyId && req.query.userId) {
    sql += " WHERE historyId = ? AND userId = ?";
    sqlValues.push(req.query.historyId, req.query.userId);
  } else if (req.query.historyId) {
    sql += " WHERE historyId = ?";
    sqlValues.push(req.query.historyId);
  } else if (req.query.userId) {
    sql += " WHERE userId = ?";
    sqlValues.push(req.query.userId);
  }

  database
    .query(sql, sqlValues)
    .then(([countParameters]) => {
      res.json(countParameters); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send("Error retrieving data from database");
    });
};

const getcountParametersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from countParameters where id = ?", [id])
    .then(([countParameters]) => {
      if (countParameters[0] != null) {
        res.json(countParameters[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const postcountParameters = (req, res) => {
  const { historyId, userId, filmId, visualisationDate } = req.body;

  database
    .query(
      "INSERT INTO countParameters(historyId, userId, filmId, visualisationDate) VALUES ( ?, ?, ?, ?)",
      [historyId, userId, filmId, visualisationDate]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      res.status(422).send({ message: err.message });
    });
};

const updateCountParameters = (req, res) => {
  const id = parseInt(req.params.id);
  const { historyId, userId, filmId, visualisationDate } = req.body;

  database
    .query(
      "update countParameters set historyId = ?, userId = ?, filmId = ?, visualisationDate = ? where id = ?",
      [historyId, userId, filmId, visualisationDate, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(422);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(422).send({ message: err.message });
    });
};

const deleteCountParameters = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from countParameters where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCountParameters,
  getcountParametersById,
  postcountParameters,
  updateCountParameters,
  deleteCountParameters,
};
