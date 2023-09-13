CREATE TABLE
    `profiles_skills` (
        id int(11) NOT NULL AUTO_INCREMENT,
        account_id varchar(50) NOT NULL,
        skill_name VARCHAR(255) NOT NULL,
        skill_level_id tinyint(4) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_Accounts_ProfilesSkills FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT FK_SkillRoles_ProfilesSkills FOREIGN KEY (skill_level_id) REFERENCES level_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    )

CREATE TABLE
    `level_types` (
        id TINYINT(4) NOT NULL AUTO_INCREMENT,
        value VARCHAR(255) NOT NULL,
        value_en VARCHAR(255) NOT NULL,
        value_ko VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci

CREATE TABLE
    `language_types` (
        id TINYINT(4) NOT NULL AUTO_INCREMENT,
        value VARCHAR(255) NOT NULL,
        value_en VARCHAR(255) NOT NULL,
        value_ko VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci

CREATE TABLE
    `profiles_languages` (
        id int(11) NOT NULL AUTO_INCREMENT,
        language_name VARCHAR(255) NOT NULL,
        account_id varchar(50) NOT NULL,
        language_level_id tinyint(4) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_Accounts_ProfilesLanguages FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT FK_LanguagesRoles_ProfilesLanguages FOREIGN KEY (language_level_id) REFERENCES language_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    )


CREATE TABLE `profiles_references`(
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesReferences FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)


CREATE TABLE `profiles_courses` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    insitiution_name VARCHAR(255) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesCourses FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)


CREATE TABLE `profiles_activities` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    oganization VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesActivities FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)



CREATE TABLE `profiles_interships` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employer VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesInterships FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)


CREATE TABLE `profiles_awards` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    award_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_ProfilesAwards FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `profiles_hobbies` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_Hobbiess FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)



