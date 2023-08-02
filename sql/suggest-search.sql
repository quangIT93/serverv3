CREATE TABLE IF NOT EXISTS suggest_search (
    id INTEGER PRIMARY KEY auto_increment,
    `keyword` varchar(255) NOT NULL,
    status tinyint(1) NOT NULL DEFAULT 1,
    `order` int(11) NOT NULL DEFAULT 0,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (keyword)
);

INSERT INTO suggest_search (`keyword`, `order`) VALUES ('IT System', 1),
('IT phần mềm', 2),
('kế toán', 3),
('influencer', 4),
('marketing', 5),
('bán hàng', 6),
('lễ tân', 7),
('phục vụ', 8),
('gia sư', 9),
('kinh doanh', 10);

CREATE TABLE `company_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `order` tinyint(4) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Companies_CompanyImages` (`company_id`),
  CONSTRAINT `FK_Companies_CompanyImages` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci