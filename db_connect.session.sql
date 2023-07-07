-- CREATE TABLE `hot_topics` (
-- `id` int(11) NOT NULL AUTO_INCREMENT,
--   `type` tinyint(4) NOT NULL COMMENT '1: Remotely_job, 2: Constraint by parent_category, 3: Constraint by chilfren category',
--   `detail_id` int(11) NOT NULL,
--   `title` varchar(255) DEFAULT NULL,
--   `image` varchar(255) DEFAULT NULL,
--   `theme_id` tinyint(4) DEFAULT NULL,
--   `order` tinyint(4) DEFAULT NULL,
--   `status` tinyint(4) DEFAULT 1,
--   `created_at` datetime DEFAULT current_timestamp(),
--     `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
--     PRIMARY KEY (`id`),
--     UNIQUE KEY `unique_hot_topics` (`type`,`detail_id`)
-- )

CREATE TABLE `companies` (
  id int(11) NOT NULL AUTO_INCREMENT,
  account_id varchar(50) NOT NULL,
  logo varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  tax_code varchar(255) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  ward_id varchar(20) DEFAULT NULL,
  phone varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  website varchar(255) DEFAULT NULL,
  description varchar(1000) DEFAULT NULL,
  status tinyint(4) DEFAULT 1,
  company_role_id tinyint(4) DEFAULT NULL,
  company_size_id tinyint(4) DEFAULT NULL,
  category_id int(11) DEFAULT NULL,
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (id),
  UNIQUE KEY `unique_companies` (`account_id`),
  Constraint FK_Accounts_Companies FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  Constraint FK_CompanyRoles_Companies FOREIGN KEY (company_role_id) REFERENCES company_roles (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  Constraint FK_CompanySizes_Companies FOREIGN KEY (company_size_id) REFERENCES company_sizes (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  Constraint FK_Categories_Companies FOREIGN KEY (category_id) REFERENCES parent_categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  Constraint FK_Wards_Companies FOREIGN KEY (ward_id) REFERENCES wards (id) ON DELETE NO ACTION ON UPDATE NO ACTION
)

-- CREATE TABLE `company_roles` (
--   id TINYINT(4) NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   name_en VARCHAR(255) NOT NULL,
--   name_ko VARCHAR(255) NOT NULL,
--   status TINYINT(4) DEFAULT 1,
--   `order` TINYINT(4) DEFAULT 1,
--   created_at DATETIME DEFAULT current_timestamp(),
--   updated_at DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
--   PRIMARY KEY (id)
-- )

-- INSERT INTO `company_roles`
-- (`name`, `name_en`, `name_ko`, `status`)
-- VALUES('Chủ sở hữu', 'CEO', 'CEO', 1),
-- ('Nhân viên', 'Employee', '직원', 1),
-- ('Nhà tuyển dụng', 'Recruiter', '채용 담당자', 1),
-- ('Khác', 'Other', '기타', 1),
-- ('Người sáng lập', '', '', 0),
-- ('Người đồng sáng lập', '', '', 0);

-- CREATE TABLE `company_sizes` (
--   id TINYINT(4) NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   name_en VARCHAR(255) NOT NULL,
--   name_ko VARCHAR(255) NOT NULL,
--   status TINYINT(4) DEFAULT 1,
--   `order` TINYINT(4) DEFAULT 1,
--   created_at DATETIME DEFAULT current_timestamp(),
--   updated_at DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
--   PRIMARY KEY (id)
-- )

-- INSERT INTO `company_sizes`
-- (`name`, `name_en`, `name_ko`, `status`)
-- VALUES('01 - 50 Nhân viên', '01 - 50 Employees', '01 - 50 직원', 1),
-- ('50 - 200 Nhân viên', '50 - 200 Employees', '50 - 200 직원', 1),
-- ('200 - 1000 Nhân viên', '200 - 1000 Employees', '200 - 1000 직원', 1),
-- ('>1000 Nhân viên', '>1000 Employees', '>1000 직원', 1);