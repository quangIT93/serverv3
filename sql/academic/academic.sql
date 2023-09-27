
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

INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Cấp 1','Primary school','초등학교',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Cấp 2','Secondary school','중학교',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Cấp 3','High school','고등학교',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Trung cấp/ nghề','Trade school','전문학교',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Cao đẳng','Community College','전문 대학',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Đại học','University','대학교',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Sau đại học (Thạc sĩ, Tiến sĩ)',"After university (Master's degree, Doctoral degree)",'대학 졸업 후 (석사, 박사)',1);
INSERT INTO `academic_types` (value,value_en,value_ko,status) VALUES ('Khác','Other','다른',1);



