SELECT
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
        posts.created_at,
        posts.status,
        posts.is_inhouse_data,
        posts.job_type,
        wards.name as ward_name,
        districts.id as district_id,
        districts.name as district_name,
        provinces.name as province_name,
        provinces.id as province_id,
        post_images.image AS image,
        posts.expired_date,
        company_resource.icon as company_resource_icon
        FROM posts use index (rev_id_idx)
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
    LEFT JOIN company_resource
    ON company_resource.id = post_resource.company 
    LEFT JOIN job_types
    ON job_types.id = posts.job_type
where  status = 1   order by created_at_date DESC, field(company_resource_id,2) desc,id desc