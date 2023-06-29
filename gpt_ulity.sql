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
