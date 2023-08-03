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
  CONSTRAINT `keyword_categories_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `keywords_notification` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `keyword_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


alter table keywords_notification drop CONSTRAINT `FK_Keyword_District`;
alter table keywords_notification drop CONSTRAINT `FK_Keyword_Category`;
alter table keywords_notification drop CONSTRAINT `FK_Keyword_Account`;
alter table keywords_notification drop index `account_id`;
alter table keywords_notification CONSTRAINT `FK_Keyword_Category` FOREIGN KEY (`category_id`) REFERENCES `parent_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
alter table keywords_notification CONSTRAINT `FK_Keyword_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
