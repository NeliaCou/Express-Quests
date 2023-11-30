const request = require("supertest");

const app = require("../src/app");

const database = require("../database");

describe("GET /api/countParameters", () => {
  it("should return all countParameters", async () => {
    const response = await request(app).get("/api/countParameters");
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/countParameters/:id", () => {
  it("should return one countParameter", async () => {
    const response = await request(app).get("/api/countParameters/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no countParameter", async () => {
    const response = await request(app).get("/api/countParameters/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/countParameters", () => {
  it("should return created countParameters", async () => {
    const newCountParameter = {
      historyId: 3,
      userId: 4,
      filmId: 5,
      visualisationDate: "2022-03-12",
    };

    const response = await request(app)
      .post("/api/countParameters")
      .send(newCountParameter);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM countParameters WHERE id=?",
      response.body.id
    );

    const [countParameterInDatabase] = result;

    expect(countParameterInDatabase).toHaveProperty("id");

    expect(countParameterInDatabase).toHaveProperty("historyId");
    expect(countParameterInDatabase.historyId).toStrictEqual(
      newCountParameter.historyId
    );
    expect(typeof countParameterInDatabase.historyId).toBe("number");

    expect(countParameterInDatabase).toHaveProperty("userId");
    expect(countParameterInDatabase.userId).toStrictEqual(
      newCountParameter.userId
    );
    expect(typeof countParameterInDatabase.userId).toBe("number");

    expect(countParameterInDatabase).toHaveProperty("filmId");
    expect(countParameterInDatabase.filmId).toStrictEqual(
      newCountParameter.filmId
    );
    expect(typeof countParameterInDatabase.filmId).toBe("number");

    expect(countParameterInDatabase).toHaveProperty("visualisationDate");
    expect(countParameterInDatabase.visualisationDate).toStrictEqual(
      newCountParameter.visualisationDate
    );
    expect(typeof countParameterInDatabase.visualisationDate).toBe("string");
  });

  it("should return an error", async () => {
    const countParameterWithMissingProps = {
      historyId: 7,
      userId: 6,
      filmId: 3,
      visualisationDate: "2020-03-11",
    };

    const response = await request(app)
      .post("/api/countParameters")
      .send(countParameterWithMissingProps);

    expect(response.status).toEqual(201);
  });
});

describe("PUT /api/countParameters/:id", () => {
  it("should edit countParameter", async () => {
    const newCountParameter = {
      historyId: 3,
      userId: 4,
      filmId: 2,
      visualisationDate: "2020-02-11",
    };
    const [result] = await database.query(
      "INSERT INTO countParameters(historyId, userId, filmId, visualisationDate) VALUES (?, ?, ?, ?)",
      [
        newCountParameter.historyId,
        newCountParameter.userId,
        newCountParameter.filmId,
        newCountParameter.city,
        newCountParameter.visualisationDate,
      ]
    );

    const id = result.insertId;

    const updatedCountParameter = {
      historyId: 2,
      userId: 7,
      filmId: 4,
      visualisationDate: "2023-02-11",
    };

    const response = await request(app)
      .put(`/api/countParameters/${id}`)
      .send(updatedCountParameter);

    expect(response.status).toEqual(204);

    const [results] = await database.query(
      "SELECT * FROM countParameters WHERE id=?",
      id
    );

    const [countParameterInDatabase] = results;

    expect(countParameterInDatabase).toHaveProperty("id");

    expect(countParameterInDatabase).toHaveProperty("historyId");
    expect(countParameterInDatabase.historyId).toStrictEqual(
      updatedCountParameter.historyId
    );

    expect(countParameterInDatabase).toHaveProperty("userId");
    expect(countParameterInDatabase.userId).toStrictEqual(
      updatedCountParameter.userId
    );

    expect(countParameterInDatabase).toHaveProperty("filmId");
    expect(countParameterInDatabase.filmId).toStrictEqual(
      updatedCountParameter.filmId
    );

    expect(countParameterInDatabase).toHaveProperty("visualisationDate");
    expect(countParameterInDatabase.visualisationDate).toStrictEqual(
      updatedCountParameter.visualisationDate
    );
  });

  it("should return an error", async () => {
    const countParameterWithMissingProps = { historyId: 2 };

    const response = await request(app)
      .put(`/api/countParameters/1`)
      .send(countParameterWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return no countParameter", async () => {
    const newCountParameter = {
      historyId: 4,
      userId: 7,
      filmId: 2,
      visualisationDate: "2023-02-21",
    };

    const response = await request(app)
      .put("/api/countParameters/0")
      .send(newCountParameter);

    expect(response.status).toEqual(422);
  });
});

describe("DELETE /api/countParameter/:id", () => {
  it("should delete a countParameter", async () => {
    const addedCountParameter = {
      historyId: 9,
      userId: 3,
      filmId: 2,
      visualisationDate: "2013-02-21",
    };

    const [result] = await database.query(
      "INSERT INTO countParameters(historyId, userId, filmId, visualisationDate) VALUES (?, ?, ?, ?)",
      [
        addedCountParameter.historyId,
        addedCountParameter.userId,
        addedCountParameter.filmId,
        addedCountParameter.visualisationDate,
      ]
    );

    const id = result.insertId;

    const response = await request(app).delete(`/api/countParameters/${id}`);

    expect(response.status).toEqual(204);

    const [results] = await database.query(
      "SELECT * FROM countParameters WHERE id=?",
      id
    );

    const [countParameterInDatabase] = results;

    expect(countParameterInDatabase).toBeUndefined();
  });

  it("should return status 404 for non-existing countParameter", async () => {
    const nonExistingCountParameterId = 999;
    const response = await request(app).delete(
      `/api/countParameters/${nonExistingCountParameterId}`
    );

    expect(response.status).toEqual(404);
  });
});
