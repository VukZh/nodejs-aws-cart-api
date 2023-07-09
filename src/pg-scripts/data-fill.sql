insert into carts (id, user_id, created_at, updated_at, status) values
('a6a25281-0a14-4a34-a71f-966c7ce26481', 'e6f7d8c9-0b1a-2d3c-4e5f-6a7b8c9d0e1f', '2023-07-09', '2023-07-09', 'OPEN'),
('e63dd9c6-88e1-4f23-998c-31fa312366b1', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '2023-07-08', '2023-07-08', 'ORDERED'),
('85d6865c-0f66-457e-b0ca-eb4f949d2232', 'f6e5d4c3-b2a1-9c8d-7e6f-5a4b3c2d1e0f', '2023-07-07', '2023-07-07', 'OPEN')

insert into cart_items (cart_id, product_id, count) values
('a6a25281-0a14-4a34-a71f-966c7ce26481', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 2),
('e63dd9c6-88e1-4f23-998c-31fa312366b1', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 1),
('85d6865c-0f66-457e-b0ca-eb4f949d2232', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 3)

