ALTER TABLE profiles ADD COLUMN `job_type_id` tinyint DEFAULT NULL;

ALTER TABLE profiles ADD COLUMN `job_name` varchar(255) DEFAULT NULL;

ALTER TABLE profiles ADD CONSTRAINT FK_JobTypes_Profiles FOREIGN KEY (job_type_id) REFERENCES job_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE TABLE IF NOT EXISTS
    `skill_level_types` (
        id TINYINT(4) NOT NULL AUTO_INCREMENT,
        value VARCHAR(255) NOT NULL,
        value_en VARCHAR(255) NOT NULL,
        value_ko VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
CREATE TABLE IF NOT EXISTS
    `profiles_skills` (
        id int(11) NOT NULL AUTO_INCREMENT,
        account_id varchar(50) NOT NULL,
        skill_name VARCHAR(255) NOT NULL,
        skill_level_id tinyint(4) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_Accounts_ProfilesSkills FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_SkillRoles_ProfilesSkills FOREIGN KEY (skill_level_id) REFERENCES skill_level_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

CREATE TABLE IF NOT EXISTS
    `language_level_types` (
        id TINYINT(4) NOT NULL AUTO_INCREMENT,
        value VARCHAR(255) NOT NULL,
        value_en VARCHAR(255) NOT NULL,
        value_ko VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS
    `profiles_languages` (
        id int(11) NOT NULL AUTO_INCREMENT,
        language_name VARCHAR(255) NOT NULL,
        account_id varchar(50) NOT NULL,
        language_level_id tinyint(4) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_Accounts_ProfilesLanguages FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_LanguagesRoles_ProfilesLanguages FOREIGN KEY (language_level_id) REFERENCES language_level_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );


CREATE TABLE IF NOT EXISTS `profiles_references`(
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesReferences FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS `profiles_courses` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    insitiution_name VARCHAR(255) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesCourses FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `profiles_activities`;

CREATE TABLE IF NOT EXISTS `profiles_activities` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesActivities FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);



CREATE TABLE IF NOT EXISTS `profiles_interships` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employer VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesInterships FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS `profiles_awards` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    award_title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesAwards FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `profiles_hobbies` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_Hobbiess FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS `profiles_jobs` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    job_type_id TINYINT(4) NOT NULL,
    UNIQUE KEY (account_id, job_type_id),
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_Jobs FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT FK_JobTypes_Jobs FOREIGN KEY (job_type_id) REFERENCES job_types(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

