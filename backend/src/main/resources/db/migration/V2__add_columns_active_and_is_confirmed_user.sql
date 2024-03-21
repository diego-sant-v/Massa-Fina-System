-- v2_add_columns_to_users_table.sql

ALTER TABLE users
    ADD COLUMN is_active BOOLEAN NOT NULL,
    ADD COLUMN is_confirmed BOOLEAN NOT NULL;
