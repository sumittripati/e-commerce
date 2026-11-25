CREATE TABLE products (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT products_name_not_blank
        CHECK (LENGTH(TRIM(name)) > 0),
    CONSTRAINT products_price_non_negative
        CHECK (price >= 0),
    CONSTRAINT products_stock_non_negative
        CHECK (stock >= 0)
);