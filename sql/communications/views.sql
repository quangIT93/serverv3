DROP TABLE IF EXISTS `communication_views`;

CREATE TABLE `communication_views` (
    communication_id int(11) NOT NULL,
    account_id varchar(50) NOT NULL,
    created_at datetime DEFAULT current_timestamp(),
    PRIMARY KEY (communication_id, account_id),
    Constraint FK_Communications_CommunicationViews FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Accounts_CommunicationViews FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION
)