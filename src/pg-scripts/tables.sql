create type statusType as enum ('OPEN', 'ORDERED')

create type paymentType

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid,
	created_at date not null,
	updated_at date not null,
	status statusType
)

-- create table cart_items (
--     cart_id uuid primary key,
--     product_id uuid,
--     count integer,
--     foreign key ("cart_id") references "carts" ("id")
-- )

create table cart_items (
    id uuid primary key default uuid_generate_v4(),
    cart_id uuid,
    product_id uuid,
    count integer,
    price integer,
    foreign key ("cart_id") references "carts" ("id")
)

create table orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid,
    cart_id uuid,
    payment json,
    delivery json,
    comments text,
    status statusType,
    total integer,
    foreign key ("cart_id") references "carts" ("id")
)


--drop table carts;
--drop table cart_items;
--drop table orders;
