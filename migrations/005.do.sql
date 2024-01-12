CREATE VIEW detailed_recipes AS 
    SELECT
        r.*, u.author_name, u.author_image,
        COUNT(comments.id) AS comment_count,
        COUNT(DISTINCT stars.author_id) AS review_count,
        COALESCE(AVG(stars.amount), 0) AS avg_rating
    FROM recipes r
    LEFT JOIN stars ON (r.id = stars.recipe_id)
    LEFT JOIN comments ON (r.id = comments.recipe_id)
    JOIN (SELECT
        id AS author_id,
        name AS author_name,
        image AS author_image FROM users) u
    ON r.author_id = u.author_id
    GROUP BY r.id, u.author_id, u.author_name, u.author_image;
