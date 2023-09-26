
CREATE TABLE IF NOT EXISTS `academic_types` (
    `id` TINYINT(4) NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(50) NOT NULL,
    `value_en` VARCHAR(15) NOT NULL,
    `value_ko` VARCHAR(10) NOT NULL,
    `status` TINYINT(4) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
)

ALTER TABLE `profiles_educations` ADD COLUMN `academic_type_id` TINYINT(4) DEFAULT 8 AFTER `extra_information`;

ALTER TABLE `profiles_educations` ADD CONSTRAINT FK_AcademicTypes_ProfilesEducations FOREIGN KEY (academic_type_id) REFERENCES academic_types(id) ON DELETE CASCADE ON UPDATE NO ACTION;


