CREATE TYPE difficulty AS ENUM ('Łatwy', 'Średniozaawansowany', 'Trudny');
CREATE TYPE category AS ENUM (
    'Śniadanie',
    'Danie główne',
    'Deser',
    'Kolacja',
    'Przekąski',
    'Sałatki',
    'Zupy'
);
CREATE TYPE ingredients_availability AS ENUM (
    'Łatwa',
    'Średnia',
    'Trudna'
);
CREATE TYPE diet AS ENUM (
    'Wegetariańska',
    'Wegańska',
    'Niskokaloryczna',
    'Bezglutenowa'
);
CREATE TYPE region AS ENUM (
    'Ameryka Południowa',
    'Ameryka Północna',
    'Azja',
    'Afryka',
    'Australia',
    'Europa'
);

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    prep_time INTEGER NOT NULL,
    difficulty difficulty NOT NULL,
    category category NOT NULL,
    availability ingredients_availability NOT NULL,
    diet diet[],
    region region[],
    portions INTEGER NOT NULL,
    ingredients TEXT[] NOT NULL,
    steps TEXT[] NOT NULL,
    image TEXT NOT NULL,
    author_id INTEGER REFERENCES users (id) NOT NULL,
    added TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMPTZ
);
