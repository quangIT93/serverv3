ALTER TABLE candidate_bookmarked DROP CONSTRAINT `FK_Recruit_Candidate_Bookmarked`;

ALTER TABLE candidate_bookmarked ADD CONSTRAINT `FK_Recruit_Candidate_Bookmarked` FOREIGN KEY (`recruit_id`) REFERENCES `companies` (`account_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

DELETE FROM candidate_bookmarked
WHERE recruit_id NOT IN (SELECT account_id FROM companies);
