create type statusType as enum ('OPEN', 'ORDERED')

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid,
	created_at date not null,
	updated_at date not null,
	status statusType
)

create table cart_items (
    cart_id uuid primary key,
    product_id uuid,
    count integer,
    foreign key ("cart_id") references "carts" ("id")
)


--drop table carts;
--drop table cart_items;
