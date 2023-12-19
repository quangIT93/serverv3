CREATE TABLE IF NOT EXISTS `company_description_templates` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id)
);