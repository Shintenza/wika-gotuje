CREATE TABLE comments (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INTEGER REFERENCES users (id),
    recipe_id INTEGER REFERENCES recipes (id),
    added TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL
);

CREATE TABLE stars (
    author_id INTEGER REFERENCES users (id),
    recipe_id INTEGER REFERENCES recipes (id),
    amount INTEGER,
    PRIMARY KEY (author_id, recipe_id)
);
