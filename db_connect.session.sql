CREATE TABLE `hot_topics` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '1: Remotely_job, 2: Constraint by parent_category, 3: Constraint by chilfren category',
  `detail_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `theme_id` tinyint(4) DEFAULT NULL,
  `order` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_hot_topics` (`type`,`detail_id`)
)