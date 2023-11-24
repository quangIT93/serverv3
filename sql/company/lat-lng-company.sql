ALTER TABLE `companies` ADD COLUMN `latitude` DECIMAL(9,6) DEFAULT NULL AFTER `description`;

ALTER TABLE `companies` ADD COLUMN `longitude` DECIMAL(9,6) DEFAULT NULL AFTER `latitude`;
