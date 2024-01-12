CREATE TABLE likes (
    user_id INTEGER REFERENCES users (id),
    recipe_id INTEGER REFERENCES recipes (id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE follows (
    follower_id INTEGER REFERENCES users (id),
    followee_id INTEGER REFERENCES recipes (id),
    CHECK (followee_id != follower_id),
    PRIMARY KEY (follower_id, followee_id)
);
