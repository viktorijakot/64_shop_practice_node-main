-- create customers table

CREATE TABLE `customers` (
    `id` int(10) UNSIGNED NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- create categories table

CREATE TABLE `categories` (
    `id` int(10) UNSIGNED NOT NULL PRIMARY KEY,
    `name` varchar(255) NOT NULL
) ENGINE=InnoDB;

-- create items table

CREATE TABLE `items` (
    `id` int(10) UNSIGNED NOT NULL PRIMARY KEY,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `price` DECIMAL(12,2) NOT NULL,
    `rating` DOUBLE(3,2) NOT NULL,
    `stock` int(10) NOT NULL,
    `cat_id` int(10) UNSIGNED NOT NULL,
    `img_url` varchar(255) NOT NULL
)
