DROP TABLE IF EXISTS `post_medias`;

CREATE TABLE IF NOT EXISTS `post_medias` (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    company_id INT(11) NOT NULL,
    post_id INT(11) NOT NULL,
    link_tiktok VARCHAR(255) DEFAULT NULL,
    link_youtube VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    video VARCHAR(255) DEFAULT NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    Constraint FK_Companies_PostMedias FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Posts_PostMedias FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;