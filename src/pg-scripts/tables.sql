-- create type statusType as enum ('OPEN', 'ORDERED')
--
-- create type paymentType

-- create table carts (
-- 	id uuid primary key default uuid_generate_v4(),
-- 	user_id uuid,
-- 	created_at date not null,
-- 	updated_at date not null,
-- 	status statusType
-- )

-- create table carts (
-- 	id uuid primary key default uuid_generate_v4(),
-- 	user_id uuid,
-- 	created_at date,
-- 	updated_at date,
-- 	status text
-- )

-- create table cart_items (
--     cart_id uuid primary key,
--     product_id uuid,
--     count integer,
--     foreign key ("cart_id") references "carts" ("id")
-- )

-- create table cart_items (
--     id uuid primary key default uuid_generate_v4(),
--     cart_id uuid,
--     product_id uuid,
--     count integer,
--     price NUMERIC(9,2),
--     foreign key ("cart_id") references "carts" ("id")
-- )
--
-- create table orders (
--     id uuid primary key default uuid_generate_v4(),
--     user_id uuid,
--     cart_id uuid,
--     payment json,
--     delivery json,
--     comments text,
--     status text,
--     total integer,
--     foreign key ("cart_id") references "carts" ("id")
-- )


--drop table carts;
--drop table cart_items;
--drop table orders;



--


drop table cart_items;
drop table orders;
drop table carts;



create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid,
	created_at date,
	updated_at date,
	status text
)

create table orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid,
    cart_id uuid,
    payment json,
    delivery json,
    comments text,
    status text,
    total integer,
    foreign key ("cart_id") references "carts" ("id")
)


create table cart_items (
    id uuid primary key default uuid_generate_v4(),
    cart_id uuid,
    product_id uuid,
    count integer,
    price NUMERIC(9,2),
    foreign key ("cart_id") references "carts" ("id")
)


insert into carts (id, user_id, created_at, updated_at, status) values
('a6a25281-0a14-4a34-a71f-966c7ce26481', 'e6f7d8c9-0b1a-2d3c-4e5f-6a7b8c9d0e1f', '2023-07-09', '2023-07-09', 'OPEN'),
('e63dd9c6-88e1-4f23-998c-31fa312366b1', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '2023-07-08', '2023-07-08', 'ORDERED'),
('85d6865c-0f66-457e-b0ca-eb4f949d2232', 'f6e5d4c3-b2a1-9c8d-7e6f-5a4b3c2d1e0f', '2023-07-07', '2023-07-07', 'OPEN')

insert into cart_items (cart_id, product_id, count) values
('a6a25281-0a14-4a34-a71f-966c7ce26481', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 2),
('e63dd9c6-88e1-4f23-998c-31fa312366b1', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 1),
('85d6865c-0f66-457e-b0ca-eb4f949d2232', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 3)

insert into orders (id, user_id, cart_id, payment, delivery, comments, status, total) values
(
  'ee6b5459-8ee5-487b-81c8-eb70e9bea50f',
  'e6f7d8c9-0b1a-2d3c-4e5f-6a7b8c9d0e1f',
  'a6a25281-0a14-4a34-a71f-966c7ce26481',
  '{"type": "creditCard", "address": {"street": "123 Main St", "city": "City", "state": "State", "zip": "12345"}}',
  '{"type": "express", "address": {"street": "456 Elm St", "city": "City", "state": "State", "zip": "67890"}}',
  'Some comments',
  'OPEN',
  100
),
(
  'a2f899be-a7ff-4a48-83aa-95aedfaeb408',
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'e63dd9c6-88e1-4f23-998c-31fa312366b1',
  '{"type": "creditCard", "address": {"street": "123 Main St", "city": "City", "state": "State", "zip": "12345"}}',
  '{"type": "express", "address": {"street": "456 Elm St", "city": "City", "state": "State", "zip": "67890"}}',
  'Some comments 2',
  'OPEN',
  33
)


