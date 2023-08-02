CREATE TABLE keyword_districts (
    keyword_id INTEGER NOT NULL,
    district_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (keyword_id, district_id),
    FOREIGN KEY (keyword_id) REFERENCES keywords_notification (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (district_id) REFERENCES districts (id)
);

CREATE TABLE keyword_categories (
    keyword_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (keyword_id, category_id),
    FOREIGN KEY (keyword_id) REFERENCES keywords_notification (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES parent_categories (id)
);

CREATE TABLE `keyword_categories` (
  `keyword_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`keyword_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `keyword_categories_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `keywords_notification` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `keyword_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci