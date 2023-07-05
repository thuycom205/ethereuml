SELECT wp_posts.ID as ID, wp_posts.post_content as content , wctag.meta_value as sum_id FROM wp_posts
                                                                    join wp_postmeta wmla on wp_posts.ID = wmla.post_id
join wp_postmeta wctag on  wp_posts.ID = wctag.post_id
WHERE post_type = 'gpt_linked' and wmla.meta_key = 'tag' and wmla.meta_value = 'candles'  and  wctag.meta_key = 'sum_id'
ORDER BY sum_id asc ;


SELECT *
FROM ( SELECT wp_posts.ID as ID, wp_posts.post_content as content , wctag.meta_value as sum_id FROM wp_posts
                                                                                                        join wp_postmeta wmla on wp_posts.ID = wmla.post_id
                                                                                                        join wp_postmeta wctag on  wp_posts.ID = wctag.post_id
       WHERE post_type = 'gpt_sum' and wmla.meta_key = 'tag' and wmla.meta_value = 'candles'  and  wctag.meta_key = 'sum_id'
       ORDER BY sum_id asc) AS A
         left JOIN ( SELECT wp_posts.ID as ID, wp_posts.post_content as content , wctag.meta_value as sum_id FROM wp_posts
                                                                                                                 join wp_postmeta wmla on wp_posts.ID = wmla.post_id
                                                                                                                 join wp_postmeta wctag on  wp_posts.ID = wctag.post_id
                WHERE post_type = 'gpt_linked' and wmla.meta_key = 'tag' and wmla.meta_value = 'candles'  and  wctag.meta_key = 'sum_id'
                ORDER BY sum_id asc) AS B

              ON A.ID=B.sum_id;



SELECT DISTINCT meta_value FROM wp_postmeta  where meta_key='tag';
//check the origin 
SELECT wp_posts.ID as ID, wp_posts.post_content as content , wctag.meta_value as sum_id FROM wp_posts
                                                                                                 join wp_postmeta wmla on wp_posts.ID = wmla.post_id
                                                                                                 join wp_postmeta wctag on  wp_posts.ID = wctag.post_id


  SELECT meta_key, meta_value from  wp_postmeta where post_id = 8386;

update wp_postmeta
set meta_value='gamification_in_ecommerce_mobile_app' where meta_key='tag_google' and post_id in (8391
8390
8389
8388
8387
8386);

WHERE post_type = 'gpt_ori' and wmla.meta_key = 'tag' and wmla.meta_value = 'test1'
ORDER BY sum_id asc ;
//delete
Delete from wp_posts where ID in (7846,7847,7848);
