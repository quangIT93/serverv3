
CREATE TABLE IF NOT EXISTS `company_bookmarked` (
    account_id varchar(50) NOT NULL,
    company_id int(11) NOT NULL,
    created_at datetime DEFAULT current_timestamp(),
    PRIMARY KEY (account_id, company_id),
    KEY FK_Companies_Company_bookmarks (company_id),
    CONSTRAINT FK_Accounts_Company_bookmarked FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT FK_Companies_Company_bookmarked FOREIGN KEY (company_id) REFERENCES  companies (id) ON DELETE CASCADE ON UPDATE NO ACTION 
);

