
CREATE TABLE IF NOT EXISTS `company_ratings` (
    id int(11) NOT NULL AUTO_INCREMENT,
    company_id int(11) NOT NULL,
    account_id varchar(50) NOT NULL,
    star enum('1', '2', '3', '4', '5') NOT NULL,
    comment text DEFAULT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_Companies_Company_ratings FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Accounts_Company_ratings FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION
);