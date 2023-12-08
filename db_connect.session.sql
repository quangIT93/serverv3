-- ALTER table posts ADD column `created_at_date` date default NOW();

-- UPDATE posts set created_at_date = created_at;

-- ALTER TABLE posts ADD COLUMN company_resource_id tinyint(4) default 2;

-- ALTER TABLE posts ADD COLUMN `url` varchar(255) NOT NULL DEFAULT 'https://neoworks.vn';

-- UPDATE posts set company_resource_id = (SELECT company from post_resource where post_resource.post_id = posts.id);

-- UPDATE posts set `url` = (SELECT `url` from post_resource where post_resource.post_id = posts.id) WHERE company_resource_id != 2;

-- CREATE INDEX idx_sort_fields ON posts(`created_at_date` DESC, `company_resource_id`, `id` DESC);

-- 수습 - 초보자 - 경혐자 - 능통자 - 전문가
UPDATE skill_level_types
SET value_ko = '수습'
WHERE id = 1;

UPDATE skill_level_types
SET value_ko = '초보자'
WHERE id = 2;

UPDATE skill_level_types
SET value_ko = '경험자'
WHERE id = 3;

UPDATE skill_level_types
SET value_ko = '능통자'
WHERE id = 4;

UPDATE skill_level_types
SET value_ko = '전문가'
WHERE id = 5;