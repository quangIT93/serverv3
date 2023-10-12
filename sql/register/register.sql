
ALTER TABLE accounts ADD COLUMN `name` varchar(200) DEFAULT NULL AFTER `role`;


ALTER TABLE accounts ADD COLUMN `password` varchar(255) DEFAULT NULL AFTER `name`;


ALTER TABLE otps ADD COLUMN `name` varchar(200) DEFAULT NULL;


ALTER TABLE otps ADD COLUMN `password` varchar(255) DEFAULT NULL;

