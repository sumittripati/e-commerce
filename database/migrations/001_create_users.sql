CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_name_not_blank
        CHECK (LENGTH(TRIM(name)) > 0),
    CONSTRAINT users_email_not_blank
        CHECK (LENGTH(TRIM(email)) > 0)

)