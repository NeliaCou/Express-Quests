const database = required("../../database");

class MovieManager {
  database;
  constructor() {
    this.database = this.database;
  }

  async getAll() {
    let sql = "SELECT * from movies";
    const sqlValues = [];

    if (req.query.color != null) {
      sql += " WHERE color = ?";
      sqlValues.push(req.query.color);
    }

    if (req.query.max_duration != null) {
      sql += " AND duration <= ?";
      sqlValues.push(req.query.max_duration);
    } else if (req.query.max_duration != null) {
      sql += " WHERE duration <= ?";
      sqlValues.push(req.query.max_duration);
    }

    const [movies] = await this.database.query(sql, sqlValues);
    return movies;
  }
}
module.export = { MovieManager };
