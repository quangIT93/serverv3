CREATE TABLE IF NOT EXISTS `company_description_templates` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    parent_category_id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_ParentCategories_CategoryDescriptionTemplate FOREIGN KEY (parent_category_id) REFERENCES parent_categories (id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;