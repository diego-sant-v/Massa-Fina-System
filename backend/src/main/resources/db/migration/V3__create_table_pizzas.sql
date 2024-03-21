-- v3_create_table_pizza.sql

CREATE TABLE IF NOT EXISTS pizzas (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      type_pizza VARCHAR(255) NOT NULL,
    edge VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

