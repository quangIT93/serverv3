DROP TABLE IF EXISTS `post_medias`;

CREATE TABLE IF NOT EXISTS `post_medias` (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    company_id INT(11) NOT NULL,
    post_id INT(11) NOT NULL,
    link_tiktok VARCHAR(255) DEFAULT NULL,
    link_youtube VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    video VARCHAR(255) DEFAULT NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    Constraint FK_Companies_PostMedias FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Posts_PostMedias FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

const listIds = await this.repository.query(`
            SELECT
                posts.id
            FROM posts USE INDEX(descending_post_id_idx)
            INNER JOIN wards ON wards.id = posts.ward_id ${
              _queries?.districtIds
                ? `AND wards.district_id IN (${_queries.districtIds})`
                : ''
            }
            ${
              _queries?.provinceId
                ? `INNER JOIN districts ON districts.id = wards.district_id 
                AND districts.province_id = ${_queries.provinceId}`
                : ''
            }
            INNER JOIN posts_categories ON posts_categories.post_id = posts.id ${
              _queries?.childrenCategoryId
                ? `AND posts_categories.category_id IN (${_queries.childrenCategoryId})`
                : ''
            }
            ${
              _queries?.parentCategoryId
                ? `INNER JOIN child_categories ON child_categories.id = posts_categories.category_id 
                AND child_categories.parent_category_id = ${_queries.parentCategoryId}`
                : ''
            }
            WHERE posts.status = 1
                AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
                AND (posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURDATE()) * 1000)
            GROUP BY posts.id
            ORDER BY date_format(posts.created_at,'%y-%m-%d') DESC, posts.is_inhouse_data,posts.id desc
            LIMIT ${limit * _page}${limit}
        `);