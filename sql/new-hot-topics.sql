--
-- Table structure for table `hot_topics`
--

DROP TABLE IF EXISTS `hot_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `hot_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '1: Remotely_job, 2: Constraint by parent_category, 3: Constraint by chilfren category',
  `detail_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `web_image` varchar(255) DEFAULT NULL,
  `theme_id` tinyint(4) DEFAULT 2,
  `query` varchar(255) DEFAULT NULL,
  `order` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_hot_topics` (`type`, `detail_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `hot_topics`
--

LOCK TABLES `hot_topics` WRITE;
/*!40000 ALTER TABLE `hot_topics` DISABLE KEYS */
;
r,
(2,1,1,'Remote','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/remote.png','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/web/remote.png',2,"posts.isRemotely='1'",1,1,'2023-06-24 04:17:15','2023-10-06 10:37:50'),
(3,4,1,'Short time','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/short-time.png','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/web/short-time.png',2,"posts.startDate IS NOT NULL AND posts.end_date IS NOT NULL",4,1,'2023-06-25 17:53:12','2023-10-06 10:38:15'),
(4,5,1,'Job today','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/job-today.png','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/web/job-today.png',2,"posts.createdAt",5,1,'2023-06-28 04:49:24','2023-10-06 10:38:48'),
(5,6,4,'Freelancer','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/Freelancer.png','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/web/Freelancer.png',0,"posts.jobType=4",2,1,'2023-07-07 02:26:09','2023-10-06 10:42:08'),
(6,7,0,'Driver','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/Delivery.png','https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/hot-topics/web/driver.png',2,"categories.id IN (394, 370)",0,1,'2023-08-25 09:09:40','2023-10-06 10:40:36');

;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;