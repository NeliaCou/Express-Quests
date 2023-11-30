DROP TABLE IF EXISTS movies;

CREATE TABLE
    movies (
        id int primary key NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        director varchar(255) NOT NULL,
        year varchar(255) NOT NULL,
        color varchar(255) NOT NULL,
        duration int NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

SELECT * FROM movies;

INSERT INTO
    movies (
        title,
        director,
        year,
        color,
        duration
    )
VALUES (
        'Citizen Kane',
        'Orson Wells',
        '1941',
        '0',
        120
    ), (
        'The Godfather',
        'Francis Ford Coppola',
        '1972',
        '1',
        180
    ), (
        'Pulp Fiction',
        'Quentin Tarantino',
        '1994',
        '1',
        180
    ), (
        'Apocalypse Now',
        'Francis Ford Coppola',
        '1979',
        '1',
        150
    ), (
        '2001 a space odyssey',
        'Stanley Kubrick',
        '1968',
        '1',
        160
    ), (
        'The Dark Knight',
        'Christopher Nolan',
        '2008',
        '1',
        150
    );

DROP TABLE IF EXISTS users;

CREATE TABLE
    users (
        id int primary key NOT NULL AUTO_INCREMENT,
        firstname varchar(255) NOT NULL,
        lastname varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        city varchar(255) DEFAULT NULL,
        language varchar(255) DEFAULT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
    users (
        firstname,
        lastname,
        email,
        city,
        language
    )
VALUES (
        'John',
        'Doe',
        'john.doe@example.com',
        'Paris',
        'English'
    ), (
        'Valeriy',
        'Appius',
        'valeriy.appius@example.com',
        'Moscow',
        'Russian'
    ), (
        'Ralf',
        'Geronimo',
        'ralf.geronimo@example.com',
        'New York',
        'Italian'
    ), (
        'Maria',
        'Iskandar',
        'maria.iskandar@example.com',
        'New York',
        'German'
    ), (
        'Jane',
        'Doe',
        'jane.doe@example.com',
        'London',
        'English'
    ), (
        'Johanna',
        'Martino',
        'johanna.martino@example.com',
        'Milan',
        'Spanish'
    );

DROP TABLE IF EXISTS countParameters;

CREATE TABLE
    countParameters (
        id int primary key NOT NULL AUTO_INCREMENT,
        historyId int NOT NULL,
        userId int NOT NULL,
        filmId int NOT NULL,
        visualisationDate varchar(255) DEFAULT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
    countParameters (
        historyId,
        userId,
        filmId,
        visualisationDate
    )
VALUES (1, 101, 201, '2023-01-15'), (2, 102, 202, '2023-02-02'), (3, 103, 203, '2023-03-10'), (4, 104, 204, '2023-04-05'), (5, 105, 205, '2023-05-20'), (6, 101, 206, '2023-06-12');