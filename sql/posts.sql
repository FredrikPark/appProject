CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    markdown TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

