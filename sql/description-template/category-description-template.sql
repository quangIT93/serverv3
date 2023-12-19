CREATE TABLE IF NOT EXISTS `category_description_templates` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_category_id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_ChildCategories_CategoryDescriptionTemplate FOREIGN KEY (child_category_id) REFERENCES child_categories (id) ON DELETE CASCADE ON UPDATE NO ACTION
);
