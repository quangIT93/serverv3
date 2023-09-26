
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


CREATE TABLE
    `candidate_bookmarked` (
        candidate_id varchar(50) NOT NULL,
        recruit_id varchar(50) NOT NULL,
        created_at datetime DEFAULT current_timestamp(),
        PRIMARY KEY (candidate_id, recruit_id),
        Constraint FK_Candidate_Candidate_Bookmarked FOREIGN KEY (candidate_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
        Constraint FK_Recruit_Candidate_Bookmarked FOREIGN KEY (recruit_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION )