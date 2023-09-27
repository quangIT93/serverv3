CREATE TABLE IF NOT EXISTS `user_points` (
    account_id varchar(50) NOT NULL,
    total_point INT(11) NOT NULL,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (account_id),
    CONSTRAINT FK_Accounts_UserPoints FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION,

) 

CREATE TABLE IF NOT EXISTS `point_types` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    type ENUM('c', 'r') NOT NULL,
    name VARCHAR(50) NOT NULL,
    point INT(11) NOT NULL,
    status TINYINT(4) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `user_logs` (
    id int(11) NOT NULL AUTO_INCREMENT,
    account_id varchar(50) NOT NULL,
    point_type_id int(11) NOT NULL,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_UserLogs FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT FK_PointTypes_UserLogs FOREIGN KEY (point_type_id) REFERENCES point_types(id) ON DELETE CASCADE ON UPDATE NO ACTION
)