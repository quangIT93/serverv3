SELECT
	company_resource.id as cid,
    posts.status,
        posts.id,
        posts.account_id,
        posts.title,
        posts.company_name,
        posts.ward_id,
        posts.start_date,
        posts.end_date,
        posts.start_time,
        posts.end_time,
        posts.salary_min,
        posts.salary_max,
        posts.salary_type as salary_type_id,
        posts.money_type,
        posts.status,
        posts.is_inhouse_data,
        posts.job_type,
        job_types.name as job_type_name,
        wards.full_name as ward,
        wards.name as ward_name,
        districts.id as district_id,
        districts.full_name as district,
        districts.name as district_name,
        provinces.full_name as province,
        provinces.name as province_name,
        provinces.id as province_id,
        salary_types.value as salary_type,
        post_images.image AS image,
        posts.expired_date,
        company_resource.icon as company_resource_icon,
        
        posts.created_at,
        -- DATE_FORMAT(posts.created_at,'%y/%d/%m') as created_at_format,
        
        CONCAT(DATE_FORMAT(posts.created_at,'%y/%d/%m'), posts.company_resource_id) as sort_column
        FROM (select * from posts order by id desc,DATE_FORMAT(created_at,'%y/%d/%m') desc) posts
    LEFT JOIN wards
    ON wards.id = posts.ward_id
    LEFT JOIN districts
    ON districts.id = wards.district_id
    LEFT JOIN provinces
    ON provinces.id = districts.province_id
    LEFT JOIN salary_types
    ON salary_types.id = posts.salary_type
    LEFT JOIN post_images
    ON post_images.post_id = posts.id
    LEFT JOIN post_resource
    ON post_resource.post_id = posts.id
    LEFT JOIN (select * from company_resource order by field(company_resource.id,2)) company_resource
    ON company_resource.id = post_resource.company
    LEFT JOIN job_types
    ON job_types.id = posts.job_type
    WHERE posts.status = 1
    -- DATE_FORMAT(posts.created_at,'%y/%d/%m') = '23/29/07'
    GROUP BY posts.id 
    ORDER BY sort_column DESC
    LIMIT 100