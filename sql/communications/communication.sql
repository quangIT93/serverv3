CREATE TABLE `communications` (
    id int(11) NOT NULL AUTO_INCREMENT,
    account_id varchar(50) NOT NULL,
    title varchar(500) DEFAULT NULL,
    content text DEFAULT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_Accounts_Communications FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    
)