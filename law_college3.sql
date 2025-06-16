-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: law_college
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_attendance`
--

DROP TABLE IF EXISTS `app_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` datetime(6) NOT NULL,
  `session_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `recorded_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_attendance_student_id_session_id_6c315349_uniq` (`student_id`,`session_id`),
  KEY `app_attendance_recorded_by_id_d6dd6ca2_fk_app_teacher_id` (`recorded_by_id`),
  KEY `app_attendance_timestamp_8e1da59a` (`timestamp`),
  KEY `app_attendance_status_fbb86643` (`status`),
  KEY `app_attenda_session_f28ac5_idx` (`session_id`,`student_id`,`status`,`timestamp`),
  CONSTRAINT `app_attendance_recorded_by_id_d6dd6ca2_fk_app_teacher_id` FOREIGN KEY (`recorded_by_id`) REFERENCES `app_teacher` (`id`),
  CONSTRAINT `app_attendance_session_id_db88754c_fk_app_session_id` FOREIGN KEY (`session_id`) REFERENCES `app_session` (`id`),
  CONSTRAINT `app_attendance_student_id_e9880899_fk_app_student_id` FOREIGN KEY (`student_id`) REFERENCES `app_student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_attendance`
--

LOCK TABLES `app_attendance` WRITE;
/*!40000 ALTER TABLE `app_attendance` DISABLE KEYS */;
INSERT INTO `app_attendance` VALUES (1,0,'2025-04-02 00:00:00.000000',210,4,2),(2,1,'2025-04-02 00:00:00.000000',210,6,2),(3,1,'2025-04-02 00:00:00.000000',210,8,2),(4,1,'2025-04-02 00:00:00.000000',210,10,2),(5,1,'2025-04-02 00:00:00.000000',210,12,2),(6,1,'2025-04-02 00:00:00.000000',210,14,2),(7,1,'2025-04-02 00:00:00.000000',210,16,2),(8,1,'2025-04-02 00:00:00.000000',210,18,2),(9,0,'2025-04-02 00:00:00.000000',210,20,2),(10,0,'2025-04-02 00:00:00.000000',210,22,2),(11,1,'2025-03-31 13:21:22.094293',232,4,2),(12,0,'2025-03-31 13:21:22.117264',232,6,2),(13,1,'2025-03-31 13:21:22.125505',232,8,2),(14,1,'2025-03-31 13:21:22.148070',232,10,2),(15,1,'2025-03-31 13:21:22.156687',232,12,2),(16,1,'2025-03-31 13:21:22.166301',232,14,2),(17,1,'2025-03-31 13:21:22.175712',232,16,2),(18,1,'2025-03-31 13:21:22.185677',232,18,2),(19,1,'2025-03-31 13:21:22.194379',232,20,2),(20,1,'2025-03-31 13:21:22.202288',232,22,2),(21,0,'2025-03-03 00:00:00.000000',180,4,2),(22,1,'2025-03-03 00:00:00.000000',180,6,2),(23,1,'2025-03-03 00:00:00.000000',180,8,2),(24,0,'2025-03-03 00:00:00.000000',180,10,2),(25,1,'2025-03-03 00:00:00.000000',180,12,2),(26,0,'2025-03-03 00:00:00.000000',180,14,2),(27,0,'2025-03-03 00:00:00.000000',180,16,2),(28,1,'2025-03-03 00:00:00.000000',180,18,2),(29,1,'2025-03-03 00:00:00.000000',180,20,2),(30,0,'2025-03-03 00:00:00.000000',180,22,2),(31,1,'2025-04-06 06:35:56.034514',153,4,12),(32,1,'2025-04-06 06:35:56.064317',153,6,12),(33,0,'2025-04-06 06:35:56.074533',153,8,12),(34,1,'2025-04-06 06:35:56.082768',153,10,12),(35,1,'2025-04-06 06:35:56.091007',153,12,12),(36,1,'2025-04-06 06:35:56.100386',153,14,12),(37,0,'2025-04-06 06:35:56.109405',153,16,12),(38,1,'2025-04-06 06:35:56.118021',153,18,12),(39,1,'2025-04-06 06:35:56.126288',153,20,12),(40,1,'2025-04-06 06:35:56.135647',153,22,12),(42,1,'2025-03-06 00:00:00.000000',627,56,10),(43,1,'2025-03-17 00:00:00.000000',182,4,2),(44,1,'2025-03-17 00:00:00.000000',182,6,2),(45,1,'2025-03-17 00:00:00.000000',182,8,2),(46,0,'2025-03-17 00:00:00.000000',182,10,2),(47,1,'2025-03-17 00:00:00.000000',182,12,2),(48,1,'2025-03-17 00:00:00.000000',182,14,2),(49,1,'2025-03-17 00:00:00.000000',182,16,2),(50,1,'2025-03-17 00:00:00.000000',182,18,2),(51,1,'2025-03-17 00:00:00.000000',182,20,2),(52,1,'2025-03-17 00:00:00.000000',182,22,2),(53,1,'2025-03-05 00:00:00.000000',206,4,2),(54,0,'2025-03-05 00:00:00.000000',206,6,2),(55,1,'2025-03-05 00:00:00.000000',206,8,2),(56,1,'2025-03-05 00:00:00.000000',206,10,2),(57,1,'2025-03-05 00:00:00.000000',206,12,2),(58,1,'2025-03-05 00:00:00.000000',206,14,2),(59,1,'2025-03-05 00:00:00.000000',206,16,2),(60,1,'2025-03-05 00:00:00.000000',206,18,2),(61,1,'2025-03-05 00:00:00.000000',206,20,2),(62,1,'2025-03-05 00:00:00.000000',206,22,2),(63,0,'2025-03-07 00:00:00.000000',393,53,2),(64,0,'2025-03-08 00:00:00.000000',233,4,2),(65,0,'2025-03-08 00:00:00.000000',233,6,2),(66,0,'2025-03-08 00:00:00.000000',233,8,2),(67,0,'2025-03-08 00:00:00.000000',233,10,2),(68,0,'2025-03-08 00:00:00.000000',233,12,2),(69,0,'2025-03-08 00:00:00.000000',233,14,2),(70,0,'2025-03-08 00:00:00.000000',233,16,2),(71,0,'2025-03-08 00:00:00.000000',233,18,2),(72,0,'2025-03-08 00:00:00.000000',233,20,2),(73,0,'2025-03-08 00:00:00.000000',233,22,2),(74,1,'2025-03-12 00:00:00.000000',207,4,2),(75,1,'2025-03-12 00:00:00.000000',207,6,2),(76,1,'2025-03-12 00:00:00.000000',207,8,2),(77,1,'2025-03-12 00:00:00.000000',207,10,2),(78,1,'2025-03-12 00:00:00.000000',207,12,2),(79,1,'2025-03-12 00:00:00.000000',207,14,2),(80,1,'2025-03-12 00:00:00.000000',207,16,2),(81,1,'2025-03-12 00:00:00.000000',207,18,2),(82,1,'2025-03-12 00:00:00.000000',207,20,2),(83,1,'2025-03-12 00:00:00.000000',207,22,2),(84,0,'2025-03-14 00:00:00.000000',394,53,2),(85,0,'2025-03-10 00:00:00.000000',181,4,2),(86,1,'2025-03-10 00:00:00.000000',181,6,2),(87,0,'2025-03-10 00:00:00.000000',181,8,2),(88,0,'2025-03-10 00:00:00.000000',181,10,2),(89,0,'2025-03-10 00:00:00.000000',181,12,2),(90,0,'2025-03-10 00:00:00.000000',181,14,2),(91,1,'2025-03-10 00:00:00.000000',181,16,2),(92,1,'2025-03-10 00:00:00.000000',181,18,2),(93,1,'2025-03-10 00:00:00.000000',181,20,2),(94,1,'2025-03-10 00:00:00.000000',181,22,2),(95,1,'2025-03-15 00:00:00.000000',234,4,2),(96,0,'2025-03-15 00:00:00.000000',234,6,2),(97,1,'2025-03-15 00:00:00.000000',234,8,2),(98,0,'2025-03-15 00:00:00.000000',234,10,2),(99,1,'2025-03-15 00:00:00.000000',234,12,2),(100,0,'2025-03-15 00:00:00.000000',234,14,2),(101,0,'2025-03-15 00:00:00.000000',234,16,2),(102,1,'2025-03-15 00:00:00.000000',234,18,2),(103,1,'2025-03-15 00:00:00.000000',234,20,2),(104,0,'2025-03-15 00:00:00.000000',234,22,2),(105,1,'2025-03-19 00:00:00.000000',208,4,2),(106,1,'2025-03-19 00:00:00.000000',208,6,2),(107,0,'2025-03-19 00:00:00.000000',208,8,2),(108,0,'2025-03-19 00:00:00.000000',208,10,2),(109,0,'2025-03-19 00:00:00.000000',208,12,2),(110,0,'2025-03-19 00:00:00.000000',208,14,2),(111,0,'2025-03-19 00:00:00.000000',208,16,2),(112,0,'2025-03-19 00:00:00.000000',208,18,2),(113,0,'2025-03-19 00:00:00.000000',208,20,2),(114,0,'2025-03-19 00:00:00.000000',208,22,2);
/*!40000 ALTER TABLE `app_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_calendarexception`
--

DROP TABLE IF EXISTS `app_calendarexception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_calendarexception` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_calendarexception`
--

LOCK TABLES `app_calendarexception` WRITE;
/*!40000 ALTER TABLE `app_calendarexception` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_calendarexception` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_program`
--

DROP TABLE IF EXISTS `app_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_program` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `duration_years` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `app_program_name_3894eb_idx` (`name`),
  CONSTRAINT `app_program_chk_1` CHECK ((`duration_years` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_program`
--

LOCK TABLES `app_program` WRITE;
/*!40000 ALTER TABLE `app_program` DISABLE KEYS */;
INSERT INTO `app_program` VALUES (1,'BALLB 5 Yr',5),(2,'LLB 3 Yr',3);
/*!40000 ALTER TABLE `app_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_section`
--

DROP TABLE IF EXISTS `app_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_section` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `year` int unsigned NOT NULL,
  `program_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_section_program_id_year_name_aa2cf440_uniq` (`program_id`,`year`,`name`),
  KEY `app_section_program_c69638_idx` (`program_id`,`year`,`name`),
  CONSTRAINT `app_section_program_id_396c8d0f_fk_app_program_id` FOREIGN KEY (`program_id`) REFERENCES `app_program` (`id`),
  CONSTRAINT `app_section_chk_1` CHECK ((`year` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_section`
--

LOCK TABLES `app_section` WRITE;
/*!40000 ALTER TABLE `app_section` DISABLE KEYS */;
INSERT INTO `app_section` VALUES (1,'Section A',1,1),(2,'Section B',1,1),(3,'Section A',2,1),(7,'Section A',3,1),(8,'Section A',4,1),(9,'Section A',5,1),(4,'Section A',1,2),(6,'Section B',1,2),(10,'Section A',2,2),(11,'Section A',3,2);
/*!40000 ALTER TABLE `app_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_semester`
--

DROP TABLE IF EXISTS `app_semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_semester` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `semester` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `semester` (`semester`),
  CONSTRAINT `app_semester_chk_1` CHECK ((`semester` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_semester`
--

LOCK TABLES `app_semester` WRITE;
/*!40000 ALTER TABLE `app_semester` DISABLE KEYS */;
INSERT INTO `app_semester` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);
/*!40000 ALTER TABLE `app_semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_session`
--

DROP TABLE IF EXISTS `app_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_session` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `timetable_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_session_timetable_id_date_9e7cd061_uniq` (`timetable_id`,`date`),
  KEY `app_session_timetab_3c60ce_idx` (`timetable_id`,`date`,`status`),
  CONSTRAINT `app_session_timetable_id_a942e66c_fk_app_timetable_id` FOREIGN KEY (`timetable_id`) REFERENCES `app_timetable` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=879 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_session`
--

LOCK TABLES `app_session` WRITE;
/*!40000 ALTER TABLE `app_session` DISABLE KEYS */;
INSERT INTO `app_session` VALUES (48,'2025-03-06','Scheduled',5),(49,'2025-03-13','Scheduled',5),(50,'2025-03-20','Scheduled',5),(51,'2025-03-27','Scheduled',5),(52,'2025-04-03','Scheduled',5),(53,'2025-04-10','Scheduled',5),(54,'2025-04-17','Scheduled',5),(55,'2025-04-24','Scheduled',5),(56,'2025-05-01','Scheduled',5),(57,'2025-05-08','Scheduled',5),(58,'2025-05-15','Scheduled',5),(59,'2025-05-22','Scheduled',5),(60,'2025-05-29','Scheduled',5),(61,'2025-06-05','Scheduled',5),(62,'2025-06-12','Scheduled',5),(63,'2025-06-19','Scheduled',5),(64,'2025-06-26','Scheduled',5),(65,'2025-07-03','Scheduled',5),(66,'2025-07-10','Scheduled',5),(67,'2025-07-17','Scheduled',5),(68,'2025-07-24','Scheduled',5),(69,'2025-07-31','Scheduled',5),(70,'2025-08-07','Scheduled',5),(71,'2025-08-14','Scheduled',5),(72,'2025-08-21','Scheduled',5),(73,'2025-08-28','Scheduled',5),(74,'2025-03-01','Scheduled',6),(75,'2025-03-08','Scheduled',6),(76,'2025-03-15','Scheduled',6),(77,'2025-03-22','Scheduled',6),(78,'2025-03-29','Scheduled',6),(79,'2025-04-05','Scheduled',6),(80,'2025-04-12','Scheduled',6),(81,'2025-04-19','Scheduled',6),(82,'2025-04-26','Scheduled',6),(83,'2025-05-03','Scheduled',6),(84,'2025-05-10','Scheduled',6),(85,'2025-05-17','Scheduled',6),(86,'2025-05-24','Scheduled',6),(87,'2025-05-31','Scheduled',6),(88,'2025-06-07','Scheduled',6),(89,'2025-06-14','Scheduled',6),(90,'2025-06-21','Scheduled',6),(91,'2025-06-28','Scheduled',6),(92,'2025-07-05','Scheduled',6),(93,'2025-07-12','Scheduled',6),(94,'2025-07-19','Scheduled',6),(95,'2025-07-26','Scheduled',6),(96,'2025-08-02','Scheduled',6),(97,'2025-08-09','Scheduled',6),(98,'2025-08-16','Scheduled',6),(99,'2025-08-23','Scheduled',6),(100,'2025-08-30','Scheduled',6),(101,'2025-03-03','Scheduled',8),(102,'2025-03-10','Scheduled',8),(103,'2025-03-17','Scheduled',8),(104,'2025-03-24','Scheduled',8),(105,'2025-03-31','Scheduled',8),(106,'2025-04-07','Scheduled',8),(107,'2025-04-14','Scheduled',8),(108,'2025-04-21','Scheduled',8),(109,'2025-04-28','Scheduled',8),(110,'2025-05-05','Scheduled',8),(111,'2025-05-12','Scheduled',8),(112,'2025-05-19','Scheduled',8),(113,'2025-05-26','Scheduled',8),(114,'2025-06-02','Scheduled',8),(115,'2025-06-09','Scheduled',8),(116,'2025-06-16','Scheduled',8),(117,'2025-06-23','Scheduled',8),(118,'2025-06-30','Scheduled',8),(119,'2025-07-07','Scheduled',8),(120,'2025-07-14','Scheduled',8),(121,'2025-07-21','Scheduled',8),(122,'2025-07-28','Scheduled',8),(123,'2025-08-04','Scheduled',8),(124,'2025-08-11','Scheduled',8),(125,'2025-08-18','Scheduled',8),(126,'2025-08-25','Scheduled',8),(127,'2025-03-07','Scheduled',9),(128,'2025-03-14','Scheduled',9),(129,'2025-03-21','Scheduled',9),(130,'2025-03-28','Scheduled',9),(131,'2025-04-04','Scheduled',9),(132,'2025-04-11','Scheduled',9),(133,'2025-04-18','Scheduled',9),(134,'2025-04-25','Scheduled',9),(135,'2025-05-02','Scheduled',9),(136,'2025-05-09','Scheduled',9),(137,'2025-05-16','Scheduled',9),(138,'2025-05-23','Scheduled',9),(139,'2025-05-30','Scheduled',9),(140,'2025-06-06','Scheduled',9),(141,'2025-06-13','Scheduled',9),(142,'2025-06-20','Scheduled',9),(143,'2025-06-27','Scheduled',9),(144,'2025-07-04','Scheduled',9),(145,'2025-07-11','Scheduled',9),(146,'2025-07-18','Scheduled',9),(147,'2025-07-25','Scheduled',9),(148,'2025-08-01','Scheduled',9),(149,'2025-08-08','Scheduled',9),(150,'2025-08-15','Scheduled',9),(151,'2025-08-22','Scheduled',9),(152,'2025-08-29','Scheduled',9),(153,'2025-03-01','Completed',10),(154,'2025-03-08','Scheduled',10),(155,'2025-03-15','Scheduled',10),(156,'2025-03-22','Scheduled',10),(157,'2025-03-29','Scheduled',10),(158,'2025-04-05','Scheduled',10),(159,'2025-04-12','Scheduled',10),(160,'2025-04-19','Scheduled',10),(161,'2025-04-26','Scheduled',10),(162,'2025-05-03','Scheduled',10),(163,'2025-05-10','Scheduled',10),(164,'2025-05-17','Scheduled',10),(165,'2025-05-24','Scheduled',10),(166,'2025-05-31','Scheduled',10),(167,'2025-06-07','Scheduled',10),(168,'2025-06-14','Scheduled',10),(169,'2025-06-21','Scheduled',10),(170,'2025-06-28','Scheduled',10),(171,'2025-07-05','Scheduled',10),(172,'2025-07-12','Scheduled',10),(173,'2025-07-19','Scheduled',10),(174,'2025-07-26','Scheduled',10),(175,'2025-08-02','Scheduled',10),(176,'2025-08-09','Scheduled',10),(177,'2025-08-16','Scheduled',10),(178,'2025-08-23','Scheduled',10),(179,'2025-08-30','Scheduled',10),(180,'2025-03-03','Completed',11),(181,'2025-03-10','Completed',11),(182,'2025-03-17','Completed',11),(183,'2025-03-24','Scheduled',11),(184,'2025-03-31','Scheduled',11),(185,'2025-04-07','Scheduled',11),(186,'2025-04-14','Scheduled',11),(187,'2025-04-21','Scheduled',11),(188,'2025-04-28','Scheduled',11),(189,'2025-05-05','Scheduled',11),(190,'2025-05-12','Scheduled',11),(191,'2025-05-19','Scheduled',11),(192,'2025-05-26','Scheduled',11),(193,'2025-06-02','Scheduled',11),(194,'2025-06-09','Scheduled',11),(195,'2025-06-16','Scheduled',11),(196,'2025-06-23','Scheduled',11),(197,'2025-06-30','Scheduled',11),(198,'2025-07-07','Scheduled',11),(199,'2025-07-14','Scheduled',11),(200,'2025-07-21','Scheduled',11),(201,'2025-07-28','Scheduled',11),(202,'2025-08-04','Scheduled',11),(203,'2025-08-11','Scheduled',11),(204,'2025-08-18','Scheduled',11),(205,'2025-08-25','Scheduled',11),(206,'2025-03-05','Completed',12),(207,'2025-03-12','Completed',12),(208,'2025-03-19','Completed',12),(209,'2025-03-26','Scheduled',12),(210,'2025-04-02','Completed',12),(211,'2025-04-09','Scheduled',12),(212,'2025-04-16','Scheduled',12),(213,'2025-04-23','Scheduled',12),(214,'2025-04-30','Scheduled',12),(215,'2025-05-07','Scheduled',12),(216,'2025-05-14','Scheduled',12),(217,'2025-05-21','Scheduled',12),(218,'2025-05-28','Scheduled',12),(219,'2025-06-04','Scheduled',12),(220,'2025-06-11','Scheduled',12),(221,'2025-06-18','Scheduled',12),(222,'2025-06-25','Scheduled',12),(223,'2025-07-02','Scheduled',12),(224,'2025-07-09','Scheduled',12),(225,'2025-07-16','Scheduled',12),(226,'2025-07-23','Scheduled',12),(227,'2025-07-30','Scheduled',12),(228,'2025-08-06','Scheduled',12),(229,'2025-08-13','Scheduled',12),(230,'2025-08-20','Scheduled',12),(231,'2025-08-27','Scheduled',12),(232,'2025-03-01','Completed',13),(233,'2025-03-08','Completed',13),(234,'2025-03-15','Completed',13),(235,'2025-03-22','Scheduled',13),(236,'2025-03-29','Scheduled',13),(237,'2025-04-05','Scheduled',13),(238,'2025-04-12','Scheduled',13),(239,'2025-04-19','Scheduled',13),(240,'2025-04-26','Scheduled',13),(241,'2025-05-03','Scheduled',13),(242,'2025-05-10','Scheduled',13),(243,'2025-05-17','Scheduled',13),(244,'2025-05-24','Scheduled',13),(245,'2025-05-31','Scheduled',13),(246,'2025-06-07','Scheduled',13),(247,'2025-06-14','Scheduled',13),(248,'2025-06-21','Scheduled',13),(249,'2025-06-28','Scheduled',13),(250,'2025-07-05','Scheduled',13),(251,'2025-07-12','Scheduled',13),(252,'2025-07-19','Scheduled',13),(253,'2025-07-26','Scheduled',13),(254,'2025-08-02','Scheduled',13),(255,'2025-08-09','Scheduled',13),(256,'2025-08-16','Scheduled',13),(257,'2025-08-23','Scheduled',13),(258,'2025-08-30','Scheduled',13),(288,'2025-03-03','Scheduled',15),(289,'2025-03-10','Scheduled',15),(290,'2025-03-17','Scheduled',15),(291,'2025-03-24','Scheduled',15),(292,'2025-03-31','Scheduled',15),(293,'2025-04-07','Scheduled',15),(294,'2025-04-14','Scheduled',15),(295,'2025-04-21','Scheduled',15),(296,'2025-04-28','Scheduled',15),(297,'2025-05-05','Scheduled',15),(298,'2025-05-12','Scheduled',15),(299,'2025-05-19','Scheduled',15),(300,'2025-05-26','Scheduled',15),(301,'2025-06-02','Scheduled',15),(302,'2025-06-09','Scheduled',15),(303,'2025-06-16','Scheduled',15),(304,'2025-06-23','Scheduled',15),(305,'2025-06-30','Scheduled',15),(306,'2025-07-07','Scheduled',15),(307,'2025-07-14','Scheduled',15),(308,'2025-07-21','Scheduled',15),(309,'2025-07-28','Scheduled',15),(310,'2025-08-04','Scheduled',15),(311,'2025-08-11','Scheduled',15),(312,'2025-08-18','Scheduled',15),(313,'2025-08-25','Scheduled',15),(393,'2025-03-07','Completed',19),(394,'2025-03-14','Completed',19),(395,'2025-03-21','Scheduled',19),(396,'2025-03-28','Scheduled',19),(397,'2025-04-04','Scheduled',19),(398,'2025-04-11','Scheduled',19),(399,'2025-04-18','Scheduled',19),(400,'2025-04-25','Scheduled',19),(401,'2025-05-02','Scheduled',19),(402,'2025-05-09','Scheduled',19),(403,'2025-05-16','Scheduled',19),(404,'2025-05-23','Scheduled',19),(405,'2025-05-30','Scheduled',19),(406,'2025-06-06','Scheduled',19),(407,'2025-06-13','Scheduled',19),(408,'2025-06-20','Scheduled',19),(409,'2025-06-27','Scheduled',19),(410,'2025-07-04','Scheduled',19),(411,'2025-07-11','Scheduled',19),(412,'2025-07-18','Scheduled',19),(413,'2025-07-25','Scheduled',19),(414,'2025-08-01','Scheduled',19),(415,'2025-08-08','Scheduled',19),(416,'2025-08-15','Scheduled',19),(417,'2025-08-22','Scheduled',19),(418,'2025-08-29','Scheduled',19),(575,'2025-03-06','Scheduled',25),(576,'2025-03-13','Scheduled',25),(577,'2025-03-20','Scheduled',25),(578,'2025-03-27','Scheduled',25),(579,'2025-04-03','Scheduled',25),(580,'2025-04-10','Scheduled',25),(581,'2025-04-17','Scheduled',25),(582,'2025-04-24','Scheduled',25),(583,'2025-05-01','Scheduled',25),(584,'2025-05-08','Scheduled',25),(585,'2025-05-15','Scheduled',25),(586,'2025-05-22','Scheduled',25),(587,'2025-05-29','Scheduled',25),(588,'2025-06-05','Scheduled',25),(589,'2025-06-12','Scheduled',25),(590,'2025-06-19','Scheduled',25),(591,'2025-06-26','Scheduled',25),(592,'2025-07-03','Scheduled',25),(593,'2025-07-10','Scheduled',25),(594,'2025-07-17','Scheduled',25),(595,'2025-07-24','Scheduled',25),(596,'2025-07-31','Scheduled',25),(597,'2025-08-07','Scheduled',25),(598,'2025-08-14','Scheduled',25),(599,'2025-08-21','Scheduled',25),(600,'2025-08-28','Scheduled',25),(627,'2025-03-06','Completed',27),(628,'2025-03-13','Scheduled',27),(629,'2025-03-20','Scheduled',27),(630,'2025-03-27','Scheduled',27),(631,'2025-04-03','Scheduled',27),(632,'2025-04-10','Scheduled',27),(633,'2025-04-17','Scheduled',27),(634,'2025-04-24','Scheduled',27),(635,'2025-05-01','Scheduled',27),(636,'2025-05-08','Scheduled',27),(637,'2025-05-15','Scheduled',27),(638,'2025-05-22','Scheduled',27),(639,'2025-05-29','Scheduled',27),(640,'2025-06-05','Scheduled',27),(641,'2025-06-12','Scheduled',27),(642,'2025-06-19','Scheduled',27),(643,'2025-06-26','Scheduled',27),(644,'2025-07-03','Scheduled',27),(645,'2025-07-10','Scheduled',27),(646,'2025-07-17','Scheduled',27),(647,'2025-07-24','Scheduled',27),(648,'2025-07-31','Scheduled',27),(649,'2025-08-07','Scheduled',27),(650,'2025-08-14','Scheduled',27),(651,'2025-08-21','Scheduled',27),(652,'2025-08-28','Scheduled',27),(837,'2025-07-03','Scheduled',35),(838,'2025-07-10','Scheduled',35),(839,'2025-07-17','Scheduled',35),(840,'2025-07-24','Scheduled',35),(841,'2025-07-31','Scheduled',35),(842,'2025-08-07','Scheduled',35),(843,'2025-08-14','Scheduled',35),(844,'2025-08-21','Scheduled',35),(845,'2025-08-28','Scheduled',35),(846,'2025-09-04','Scheduled',35),(847,'2025-09-11','Scheduled',35),(848,'2025-09-18','Scheduled',35),(849,'2025-09-25','Scheduled',35),(850,'2025-10-02','Scheduled',35),(851,'2025-10-09','Scheduled',35),(852,'2025-10-16','Scheduled',35),(853,'2025-10-23','Scheduled',35),(854,'2025-10-30','Scheduled',35),(855,'2025-11-06','Scheduled',35),(856,'2025-11-13','Scheduled',35),(857,'2025-11-20','Scheduled',35),(858,'2025-07-04','Scheduled',36),(859,'2025-07-11','Scheduled',36),(860,'2025-07-18','Scheduled',36),(861,'2025-07-25','Scheduled',36),(862,'2025-08-01','Scheduled',36),(863,'2025-08-08','Scheduled',36),(864,'2025-08-15','Scheduled',36),(865,'2025-08-22','Scheduled',36),(866,'2025-08-29','Scheduled',36),(867,'2025-09-05','Scheduled',36),(868,'2025-09-12','Scheduled',36),(869,'2025-09-19','Scheduled',36),(870,'2025-09-26','Scheduled',36),(871,'2025-10-03','Scheduled',36),(872,'2025-10-10','Scheduled',36),(873,'2025-10-17','Scheduled',36),(874,'2025-10-24','Scheduled',36),(875,'2025-10-31','Scheduled',36),(876,'2025-11-07','Scheduled',36),(877,'2025-11-14','Scheduled',36),(878,'2025-11-21','Scheduled',36);
/*!40000 ALTER TABLE `app_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_student`
--

DROP TABLE IF EXISTS `app_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_student` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roll_number` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  `section_id` bigint NOT NULL,
  `phone` varchar(15) NOT NULL,
  `semester` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `app_student_section_id_99aa63b7_fk_app_section_id` (`section_id`),
  KEY `app_student_roll_nu_e9d941_idx` (`roll_number`,`email`,`section_id`,`semester`),
  CONSTRAINT `app_student_section_id_99aa63b7_fk_app_section_id` FOREIGN KEY (`section_id`) REFERENCES `app_section` (`id`),
  CONSTRAINT `app_student_chk_1` CHECK ((`semester` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5417652 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_student`
--

LOCK TABLES `app_student` WRITE;
/*!40000 ALTER TABLE `app_student` DISABLE KEYS */;
INSERT INTO `app_student` VALUES (4,'G240002','Ishita','Verma','ishita.verma@example.com',2,'92091321894',1),(5,'G240003','Rohan','Iyer','rohan.iyer@example.com',1,'9876543212',1),(6,'G240004','Priya','Chopra','priya.chopra@example.com',2,'9876543213',1),(7,'G240005','Vivaan','Malhotra','vivaan.malhotra@example.com',1,'9876543214',1),(8,'G240006','Aditya','Kapoor','aditya.kapoor@example.com',2,'9876543215',1),(9,'G240007','Kabir','Menon','kabir.menon@example.com',1,'9876543216',1),(10,'G240008','Swati','Bose','swati.bose@example.com',2,'9876543217',1),(11,'G240009','Ananya','Chopra','ananya.chopra@example.com',1,'9876543218',1),(12,'G240010','Dev','Iyer','dev.iyer@example.com',2,'9876543219',1),(13,'G240011','Harsh','Verma','harsh.verma@example.com',1,'9876543220',1),(14,'G240012','Ritika','Patel','ritika.patel@example.com',2,'9876543221',1),(15,'G240013','Pooja','Singh','pooja.singh@example.com',1,'9876543222',1),(16,'G240014','Tanya','Kapoor','tanya.kapoor@example.com',2,'9876543223',1),(17,'G240015','Simran','Sharma','simran.sharma@example.com',1,'9876543224',1),(18,'G240016','Vikram','Malhotra','vikram.malhotra@example.com',2,'9876543225',1),(19,'G240017','Neha','Bose','neha.bose@example.com',1,'9876543226',1),(20,'G240018','Ishaan','Menon','ishaan.menon@example.com',2,'9876543227',1),(21,'G240019','Arjun','Chopra','arjun.chopra@example.com',1,'9876543228',1),(22,'G240020','Devika','Patel','devika.patel@example.com',2,'9876543229',1),(23,'NG240001','Aarav','Kapoor','aarav.kapoor@example.com',4,'9876543230',1),(24,'NG240002','Rohan','Bose','rohan.bose@example.com',6,'9876543231',1),(25,'NG240003','Vivaan','Singh','vivaan.singh@example.com',4,'9876543232',1),(26,'NG240004','Kabir','Malhotra','kabir.malhotra@example.com',6,'9876543233',1),(27,'NG240005','Neha','Sharma','neha.sharma@example.com',4,'9876543234',1),(28,'NG240006','Ananya','Patel','ananya.patel@example.com',6,'9876543235',1),(29,'NG240007','Dev','Chopra','dev.chopra@example.com',4,'9876543236',1),(30,'NG240008','Swati','Iyer','swati.iyer@example.com',6,'9876543237',1),(34,'NG240009','Harsh','Verma','harshs.verma@example.com',4,'9876543238',1),(35,'NG240010','Pooja','Menon','pooja.menon@example.com',6,'9876543239',1),(36,'NG240011','Ishita','Sharma','ishita.sharma@example.com',4,'9876543240',1),(37,'NG240012','Simran','Kapoor','simran.kapoor@example.com',6,'9876543241',1),(38,'NG240013','Tanya','Bose','tanya.bose@example.com',4,'9876543242',1),(39,'NG240014','Ritika','Chopra','ritika.chopra@example.com',6,'9876543243',1),(40,'NG240015','Vikram','Patel','vikram.patel@example.com',4,'9876543244',1),(44,'NG240016','Ishaan','Menon','ishaanw.menon@example.com',6,'9876543245',1),(45,'NG240017','Priya','Malhotra','priya.malhotra@example.com',4,'9876543246',1),(46,'NG240018','Aditya','Singh','aditya.singh@example.com',6,'9876543247',1),(47,'NG240019','Devika','Verma','devika.verma@example.com',4,'9876543248',1),(48,'NG240020','Arjun','Iyer','arjun.iyer@example.com',6,'9876543249',1),(49,'G240021','pranu','sirsufale','panu@gmail.com',1,'848285',1),(53,'NG25022','panu','magar','sdfdsd@gmail.com',9,'12345',9),(56,'G25021','somethng','someh','some@gmail.com',11,'8484849',5),(5417651,'G240001','MOHD ZEESHAN','MOHD ANEES','mohd@gmail.com',9,'1646464864',9);
/*!40000 ALTER TABLE `app_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_student_subjects`
--

DROP TABLE IF EXISTS `app_student_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_student_subjects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_student_subjects_student_id_subject_id_b5353fd6_uniq` (`student_id`,`subject_id`),
  KEY `app_student_subjects_subject_id_03b8e00f_fk_app_subject_id` (`subject_id`),
  CONSTRAINT `app_student_subjects_student_id_f12d8b3f_fk_app_student_id` FOREIGN KEY (`student_id`) REFERENCES `app_student` (`id`),
  CONSTRAINT `app_student_subjects_subject_id_03b8e00f_fk_app_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `app_subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=512 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_student_subjects`
--

LOCK TABLES `app_student_subjects` WRITE;
/*!40000 ALTER TABLE `app_student_subjects` DISABLE KEYS */;
INSERT INTO `app_student_subjects` VALUES (11,4,30),(12,4,31),(1,4,32),(2,4,33),(4,4,35),(5,4,80),(6,4,81),(8,4,83),(9,4,84),(10,4,85),(23,5,30),(24,5,31),(13,5,32),(14,5,33),(16,5,35),(17,5,80),(18,5,81),(20,5,83),(21,5,84),(22,5,85),(35,6,30),(36,6,31),(25,6,32),(26,6,33),(28,6,35),(29,6,80),(30,6,81),(32,6,83),(33,6,84),(34,6,85),(47,7,30),(48,7,31),(37,7,32),(38,7,33),(40,7,35),(41,7,80),(42,7,81),(44,7,83),(45,7,84),(46,7,85),(59,8,30),(60,8,31),(49,8,32),(50,8,33),(52,8,35),(53,8,80),(54,8,81),(56,8,83),(57,8,84),(58,8,85),(71,9,30),(72,9,31),(61,9,32),(62,9,33),(64,9,35),(65,9,80),(66,9,81),(68,9,83),(69,9,84),(70,9,85),(83,10,30),(84,10,31),(73,10,32),(74,10,33),(76,10,35),(77,10,80),(78,10,81),(80,10,83),(81,10,84),(82,10,85),(95,11,30),(96,11,31),(85,11,32),(86,11,33),(88,11,35),(89,11,80),(90,11,81),(92,11,83),(93,11,84),(94,11,85),(107,12,30),(108,12,31),(97,12,32),(98,12,33),(100,12,35),(101,12,80),(102,12,81),(104,12,83),(105,12,84),(106,12,85),(119,13,30),(120,13,31),(109,13,32),(110,13,33),(112,13,35),(113,13,80),(114,13,81),(116,13,83),(117,13,84),(118,13,85),(131,14,30),(132,14,31),(121,14,32),(122,14,33),(124,14,35),(125,14,80),(126,14,81),(128,14,83),(129,14,84),(130,14,85),(143,15,30),(144,15,31),(133,15,32),(134,15,33),(136,15,35),(137,15,80),(138,15,81),(140,15,83),(141,15,84),(142,15,85),(155,16,30),(156,16,31),(145,16,32),(146,16,33),(148,16,35),(149,16,80),(150,16,81),(152,16,83),(153,16,84),(154,16,85),(167,17,30),(168,17,31),(157,17,32),(158,17,33),(160,17,35),(161,17,80),(162,17,81),(164,17,83),(165,17,84),(166,17,85),(179,18,30),(180,18,31),(169,18,32),(170,18,33),(172,18,35),(173,18,80),(174,18,81),(176,18,83),(177,18,84),(178,18,85),(191,19,30),(192,19,31),(181,19,32),(182,19,33),(184,19,35),(185,19,80),(186,19,81),(188,19,83),(189,19,84),(190,19,85),(203,20,30),(204,20,31),(193,20,32),(194,20,33),(196,20,35),(197,20,80),(198,20,81),(200,20,83),(201,20,84),(202,20,85),(215,21,30),(216,21,31),(205,21,32),(206,21,33),(208,21,35),(209,21,80),(210,21,81),(212,21,83),(213,21,84),(214,21,85),(227,22,30),(228,22,31),(217,22,32),(218,22,33),(220,22,35),(221,22,80),(222,22,81),(224,22,83),(225,22,84),(226,22,85),(239,23,30),(240,23,31),(229,23,32),(230,23,33),(232,23,35),(233,23,80),(234,23,81),(236,23,83),(237,23,84),(238,23,85),(251,24,30),(252,24,31),(241,24,32),(242,24,33),(244,24,35),(245,24,80),(246,24,81),(248,24,83),(249,24,84),(250,24,85),(263,25,30),(264,25,31),(253,25,32),(254,25,33),(256,25,35),(257,25,80),(258,25,81),(260,25,83),(261,25,84),(262,25,85),(275,26,30),(276,26,31),(265,26,32),(266,26,33),(268,26,35),(269,26,80),(270,26,81),(272,26,83),(273,26,84),(274,26,85),(287,27,30),(288,27,31),(277,27,32),(278,27,33),(280,27,35),(281,27,80),(282,27,81),(284,27,83),(285,27,84),(286,27,85),(299,28,30),(300,28,31),(289,28,32),(290,28,33),(292,28,35),(293,28,80),(294,28,81),(296,28,83),(297,28,84),(298,28,85),(311,29,30),(312,29,31),(301,29,32),(302,29,33),(304,29,35),(305,29,80),(306,29,81),(308,29,83),(309,29,84),(310,29,85),(323,30,30),(324,30,31),(313,30,32),(314,30,33),(316,30,35),(317,30,80),(318,30,81),(320,30,83),(321,30,84),(322,30,85),(335,34,30),(336,34,31),(325,34,32),(326,34,33),(328,34,35),(329,34,80),(330,34,81),(332,34,83),(333,34,84),(334,34,85),(347,35,30),(348,35,31),(337,35,32),(338,35,33),(340,35,35),(341,35,80),(342,35,81),(344,35,83),(345,35,84),(346,35,85),(359,36,30),(360,36,31),(349,36,32),(350,36,33),(352,36,35),(353,36,80),(354,36,81),(356,36,83),(357,36,84),(358,36,85),(371,37,30),(372,37,31),(361,37,32),(362,37,33),(364,37,35),(365,37,80),(366,37,81),(368,37,83),(369,37,84),(370,37,85),(383,38,30),(384,38,31),(373,38,32),(374,38,33),(376,38,35),(377,38,80),(378,38,81),(380,38,83),(381,38,84),(382,38,85),(395,39,30),(396,39,31),(385,39,32),(386,39,33),(388,39,35),(389,39,80),(390,39,81),(392,39,83),(393,39,84),(394,39,85),(407,40,30),(408,40,31),(397,40,32),(398,40,33),(400,40,35),(401,40,80),(402,40,81),(404,40,83),(405,40,84),(406,40,85),(419,44,30),(420,44,31),(409,44,32),(410,44,33),(412,44,35),(413,44,80),(414,44,81),(416,44,83),(417,44,84),(418,44,85),(431,45,30),(432,45,31),(421,45,32),(422,45,33),(424,45,35),(425,45,80),(426,45,81),(428,45,83),(429,45,84),(430,45,85),(443,46,30),(444,46,31),(433,46,32),(434,46,33),(436,46,35),(437,46,80),(438,46,81),(440,46,83),(441,46,84),(442,46,85),(455,47,30),(456,47,31),(445,47,32),(446,47,33),(448,47,35),(449,47,80),(450,47,81),(452,47,83),(453,47,84),(454,47,85),(467,48,30),(468,48,31),(457,48,32),(458,48,33),(460,48,35),(461,48,80),(462,48,81),(464,48,83),(465,48,84),(466,48,85),(469,49,30),(470,49,31),(471,49,32),(472,49,33),(474,49,35),(475,49,36),(476,49,37),(477,49,38),(478,49,39),(479,49,80),(480,49,81),(482,49,83),(483,49,84),(484,49,85),(485,49,86),(486,49,87),(487,49,88),(488,49,89),(489,49,90),(496,53,70),(498,53,72),(499,53,73),(500,53,74),(501,53,75),(507,56,50),(508,56,51),(509,56,53),(510,56,54),(511,56,55),(502,56,101),(503,56,103),(504,56,104),(505,56,105),(506,56,106);
/*!40000 ALTER TABLE `app_student_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_subject`
--

DROP TABLE IF EXISTS `app_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_subject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_law_subject` tinyint(1) NOT NULL,
  `semester` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_subject_name_semester_18d89403_uniq` (`name`,`semester`),
  KEY `app_subject_semeste_668e2b_idx` (`semester`,`is_law_subject`),
  CONSTRAINT `app_subject_chk_1` CHECK ((`semester` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_subject`
--

LOCK TABLES `app_subject` WRITE;
/*!40000 ALTER TABLE `app_subject` DISABLE KEYS */;
INSERT INTO `app_subject` VALUES (30,'Political Science I',0,1),(31,'Microeconomics I',0,1),(32,'Sociology I',0,1),(33,'General English',0,1),(35,'Legal Development',0,1),(36,'Political Theory II',0,2),(37,'Macroeconomics II',0,2),(38,'Theories of Sociology II',0,2),(39,'Constitutional Development',0,2),(40,'Law and Literature',0,3),(41,'Foundations of Political Obligations - III',0,3),(42,'Indian Economy - III',0,3),(43,'Urban, Rural & Tribal Sociology of India - III',0,3),(44,'Constitutional Law I',1,3),(45,'Legal Language and Legal Writing',0,4),(46,'International Relations and Obligations IV',0,4),(47,'Economic Policies IV',0,4),(48,'Contemporary Issues of Sociology IV',0,4),(49,'Constitutional Law II',1,4),(50,'Local Self Government',0,5),(51,'Jurisprudence',1,5),(53,'Family Law I',1,5),(54,'Law of Contract I',1,5),(55,'Banking Law & Negotiable Instruments Act',1,5),(56,'Principles of Public Administration - VI',0,6),(57,'Family Law II',1,6),(58,'Law of Contract II',1,6),(59,'Social Research Methods',0,6),(60,'Bhartiya Nyaya Sanhita',1,7),(61,'Property Law and Easement Act',1,7),(62,'Labour Law I',1,7),(63,'Administrative Law',1,7),(64,'Professional Ethics',1,7),(65,'Bharatiya Nagarik Suraksha Sanhita',1,8),(66,'Company Law',1,8),(67,'Labour Law II',1,8),(68,'Interpretation of Statutes',1,8),(69,'Alternative Dispute Resolution (ADR)',1,8),(70,'Bharatiya Sakshya Adhiniyam',1,9),(72,'Principles of Taxation',1,9),(73,'Environmental Law',1,9),(74,'Land Laws Including Tenure and Tenancy Law',1,9),(75,'Drafting, Pleading & Conveyance',1,9),(76,'Intellectual Property Law',1,10),(77,'Public International Law',1,10),(78,'Insurance Law',1,10),(79,'Moot Court & Clinical Legal Education',1,10),(80,'Law of Contract I',1,1),(81,'Constitutional Law I',1,1),(83,'Jurisprudence',1,1),(84,'Family Law I',1,1),(85,'Banking Law & Negotiable Instruments Act',1,1),(86,'Law of Contract II',1,2),(87,'Constitutional Law II',1,2),(88,'Family Law II',1,2),(89,'Motor Vehicle Act',1,2),(90,'Social Research Methods',0,2),(91,'Bhartiya Nyaya Sanhita',1,3),(92,'Property Law and Easement Act',1,3),(93,'Labour Law I',1,3),(94,'Administrative Law',1,3),(95,'Professional Ethics',1,3),(96,'Bharatiya Nagarik Suraksha Sanhita',1,4),(97,'Company Law',1,4),(98,'Labour Law II',1,4),(99,'Interpretation of Statutes',1,4),(100,'ADR (Clinical Legal Education)',1,4),(101,'Bharatiya Sakshya Adhiniyam',1,5),(103,'Principles of Taxation',1,5),(104,'Environmental Law',1,5),(105,'Land Laws',1,5),(106,'Drafting, Pleading & Conveyance',1,5),(110,'Torts, Motor Vechicles Act and Consumer Protection Act',1,6),(112,'Civil Procedure Code and Limitation Act',1,10),(113,'Local Language /  Foreign Language (Optional)',0,2),(114,'Civil Procedure Code & Limitation Act',1,6),(115,'Public International Law',1,6),(116,'Intellectual Property Law',1,6),(117,'Insuranace Law (Optional Legal)',1,6),(118,'Moot Court (Clinical Legal Edn.)',1,6);
/*!40000 ALTER TABLE `app_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_teacher`
--

DROP TABLE IF EXISTS `app_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_teacher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `user_id` int NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `app_teacher_email_aad138_idx` (`email`),
  CONSTRAINT `app_teacher_user_id_d565d5e5_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_teacher`
--

LOCK TABLES `app_teacher` WRITE;
/*!40000 ALTER TABLE `app_teacher` DISABLE KEYS */;
INSERT INTO `app_teacher` VALUES (1,'John','Doe','john.doe@example.com','11111111555',2,1),(2,'Pranav','Sirsufale','pranav@gmail.com','8482852301',3,0),(5,'teacher','three','three@gmail.com','333333333',6,0),(6,'teacher','four','four@gmail.com',NULL,7,0),(7,'teacher','five','five@gmail.com',NULL,8,0),(8,'teacher','six','six@gmail.com',NULL,9,0),(9,'teacher','seven','seven@gmail.com',NULL,10,0),(10,'teacher','eight','eight@gmail.com',NULL,11,0),(11,'teacher','nine','nine@gmail.com',NULL,12,0),(12,'teacher','ten','ten@gmail.com','999999999',13,0),(14,'admin','admin_last_name','admin@gmail.com',NULL,14,1),(17,'teacher','eleven','eleven@gmail.com','9075272433',15,1),(20,'teacher','twelve','thrteen@gmail.com','448484',21,1);
/*!40000 ALTER TABLE `app_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_timetable`
--

DROP TABLE IF EXISTS `app_timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_timetable` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `day_of_week` varchar(9) NOT NULL,
  `start_time` time(6) NOT NULL,
  `semester_start_date` date NOT NULL,
  `semester_end_date` date NOT NULL,
  `section_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  `teacher_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_timetable_section_id_subject_id_da_9efb96f4_uniq` (`section_id`,`subject_id`,`day_of_week`,`start_time`),
  KEY `app_timetable_subject_id_9212521a_fk_app_subject_id` (`subject_id`),
  KEY `app_timetable_teacher_id_a975a114_fk_app_teacher_id` (`teacher_id`),
  KEY `app_timetab_section_f8fd94_idx` (`section_id`,`subject_id`,`teacher_id`),
  CONSTRAINT `app_timetable_section_id_8df1f292_fk_app_section_id` FOREIGN KEY (`section_id`) REFERENCES `app_section` (`id`),
  CONSTRAINT `app_timetable_subject_id_9212521a_fk_app_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `app_subject` (`id`),
  CONSTRAINT `app_timetable_teacher_id_a975a114_fk_app_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `app_teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_timetable`
--

LOCK TABLES `app_timetable` WRITE;
/*!40000 ALTER TABLE `app_timetable` DISABLE KEYS */;
INSERT INTO `app_timetable` VALUES (5,'Thursday','08:30:00.000000','2025-03-01','2025-08-31',1,30,1),(6,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',1,30,1),(8,'Monday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(9,'Friday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(10,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(11,'Monday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2),(12,'Wednesday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2),(13,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2),(15,'Monday','08:30:00.000000','2025-03-01','2025-08-31',7,50,11),(17,'Saturday','13:00:00.000000','2025-03-01','2025-08-31',7,106,11),(19,'Friday','13:00:00.000000','2025-03-01','2025-08-31',9,74,2),(25,'Thursday','09:30:00.000000','2025-03-01','2025-08-31',8,64,9),(27,'Thursday','10:30:00.000000','2025-03-01','2025-08-31',11,105,10),(35,'Thursday','13:00:00.000000','2025-07-01','2025-11-25',9,78,2),(36,'Friday','12:00:00.000000','2025-07-01','2025-11-25',9,79,2);
/*!40000 ALTER TABLE `app_timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Calendar Exception',7,'add_calendarexception'),(26,'Can change Calendar Exception',7,'change_calendarexception'),(27,'Can delete Calendar Exception',7,'delete_calendarexception'),(28,'Can view Calendar Exception',7,'view_calendarexception'),(29,'Can add Program',8,'add_program'),(30,'Can change Program',8,'change_program'),(31,'Can delete Program',8,'delete_program'),(32,'Can view Program',8,'view_program'),(33,'Can add Subject',9,'add_subject'),(34,'Can change Subject',9,'change_subject'),(35,'Can delete Subject',9,'delete_subject'),(36,'Can view Subject',9,'view_subject'),(37,'Can add Section',10,'add_section'),(38,'Can change Section',10,'change_section'),(39,'Can delete Section',10,'delete_section'),(40,'Can view Section',10,'view_section'),(41,'Can add Student',11,'add_student'),(42,'Can change Student',11,'change_student'),(43,'Can delete Student',11,'delete_student'),(44,'Can view Student',11,'view_student'),(45,'Can add Teacher',12,'add_teacher'),(46,'Can change Teacher',12,'change_teacher'),(47,'Can delete Teacher',12,'delete_teacher'),(48,'Can view Teacher',12,'view_teacher'),(49,'Can add Timetable',13,'add_timetable'),(50,'Can change Timetable',13,'change_timetable'),(51,'Can delete Timetable',13,'delete_timetable'),(52,'Can view Timetable',13,'view_timetable'),(53,'Can add Session',14,'add_session'),(54,'Can change Session',14,'change_session'),(55,'Can delete Session',14,'delete_session'),(56,'Can view Session',14,'view_session'),(57,'Can add Attendance',15,'add_attendance'),(58,'Can change Attendance',15,'change_attendance'),(59,'Can delete Attendance',15,'delete_attendance'),(60,'Can view Attendance',15,'view_attendance'),(61,'Can add semester',16,'add_semester'),(62,'Can change semester',16,'change_semester'),(63,'Can delete semester',16,'delete_semester'),(64,'Can view semester',16,'view_semester');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$Me9YZI6YfmhjX5LJI0WBHt$W3xNBZ+tlmjsWwiziX7f07jSwR0bRoMOR57Hkls+fCA=','2025-05-19 05:15:21.395644',0,'pranav','','','',0,1,'2025-03-25 03:20:11.593406'),(2,'pbkdf2_sha256$870000$50fSDLFD0fE5lURLDq9qVc$BNEr7PBQ8zvmLjjDUETH2F3B40uEw7B4GuvK6NjULQo=',NULL,1,'john.doe','John','Doe','john.doe@example.com',0,1,'2025-03-25 03:21:57.704575'),(3,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-05-23 00:50:19.480044',0,'pranav.sirsufale','','','',0,1,'2025-03-25 10:20:28.637956'),(4,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher1','','','one@gmail.com',0,1,'2025-03-27 17:05:18.948975'),(5,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher2','teacher','two','two@gmail.com',0,1,'2025-03-27 17:05:19.379372'),(6,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher3','teacher','three','three@gmail.com',0,1,'2025-03-27 17:05:19.425674'),(7,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher4','','','four@gmail.com',0,1,'2025-03-27 17:05:19.444986'),(8,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher5','','','five@gmail.com',0,1,'2025-03-27 17:05:19.500480'),(9,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher6','','','six@gmail.com',0,1,'2025-03-27 17:05:19.528860'),(10,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-04-11 09:51:05.614202',0,'teacher7','','','seven@gmail.com',0,1,'2025-03-27 17:05:19.545909'),(11,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-04-11 18:01:46.134674',0,'teacher8','','','eight@gmail.com',0,1,'2025-03-27 17:05:19.564738'),(12,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-04-06 06:33:02.787255',0,'teacher9','','','nine@gmail.com',0,1,'2025-03-27 17:05:19.595600'),(13,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-04-06 06:34:33.125471',0,'teacher10','teacher','ten','ten@gmail.com',0,1,'2025-03-27 17:05:19.613329'),(14,'pbkdf2_sha256$870000$X7EOnRDXkTdYSQUgd627z2$wG8Mh0ph0O6YOnWzCNuP/a/nyaofD22DHmLnjTTAAOI=','2025-05-23 02:58:16.860957',0,'admin','','','admin@gmail.com',0,1,'2025-03-30 18:07:31.745190'),(15,'pbkdf2_sha256$870000$Ong2J2Ocd6HnBWKPqUGtby$6FjCbTT0/WkLWChlJQDlhS0OZkwo54l7T74ELuLd6/M=',NULL,1,'eleven@gmail.com','teacher','eleven','eleven@gmail.com',0,1,'2025-04-08 09:53:17.824046'),(16,'pbkdf2_sha256$870000$T7u4rcXlACnw5tx0Holjjd$O2YlqKudbfw3o8RY+cvotl2RljqKS339v6VGZC9JSWI=',NULL,0,'twelve@gmail.com','teacher','twelve','twelve@gmail.com',0,1,'2025-04-11 11:45:02.081316'),(21,'pbkdf2_sha256$870000$PM1QK7z6WbVdU8JNJT7NsG$o0EbPNljQk6zFl3W2+v3PyhSmtOqoZ8FeHEU252mOBw=',NULL,1,'thrteen@gmail.com','teacher','twelve','thrteen@gmail.com',0,1,'2025-04-26 06:12:20.662326');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(15,'app','attendance'),(7,'app','calendarexception'),(8,'app','program'),(10,'app','section'),(16,'app','semester'),(14,'app','session'),(11,'app','student'),(9,'app','subject'),(12,'app','teacher'),(13,'app','timetable'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-25 03:06:34.988284'),(2,'auth','0001_initial','2025-03-25 03:06:36.003056'),(3,'admin','0001_initial','2025-03-25 03:06:36.309402'),(4,'admin','0002_logentry_remove_auto_add','2025-03-25 03:06:36.334389'),(5,'admin','0003_logentry_add_action_flag_choices','2025-03-25 03:06:36.360373'),(6,'app','0001_initial','2025-03-25 03:06:38.244642'),(7,'contenttypes','0002_remove_content_type_name','2025-03-25 03:06:38.446699'),(8,'auth','0002_alter_permission_name_max_length','2025-03-25 03:06:38.578755'),(9,'auth','0003_alter_user_email_max_length','2025-03-25 03:06:38.643459'),(10,'auth','0004_alter_user_username_opts','2025-03-25 03:06:38.663449'),(11,'auth','0005_alter_user_last_login_null','2025-03-25 03:06:38.788991'),(12,'auth','0006_require_contenttypes_0002','2025-03-25 03:06:38.793584'),(13,'auth','0007_alter_validators_add_error_messages','2025-03-25 03:06:38.812366'),(14,'auth','0008_alter_user_username_max_length','2025-03-25 03:06:38.931673'),(15,'auth','0009_alter_user_last_name_max_length','2025-03-25 03:06:39.067123'),(16,'auth','0010_alter_group_name_max_length','2025-03-25 03:06:39.128580'),(17,'auth','0011_update_proxy_permissions','2025-03-25 03:06:39.162562'),(18,'auth','0012_alter_user_first_name_max_length','2025-03-25 03:06:39.295542'),(19,'sessions','0001_initial','2025-03-25 03:06:39.384131'),(20,'app','0002_student_phone','2025-03-25 04:03:27.779276'),(21,'app','0003_alter_subject_name_alter_subject_unique_together','2025-03-27 04:27:46.029908'),(22,'app','0004_alter_timetable_teacher','2025-03-28 15:05:47.581771'),(23,'app','0003_teacher_is_admin_alter_teacher_first_name_and_more','2025-03-30 18:03:06.030454'),(24,'app','0004_alter_attendance_timestamp','2025-04-07 11:07:30.062189'),(25,'app','0005_student_semester','2025-04-09 10:24:06.004797'),(26,'app','0006_alter_student_semester','2025-04-09 10:31:20.708328'),(27,'app','0007_alter_student_roll_number','2025-04-10 05:25:40.579698'),(28,'app','0008_alter_subject_name','2025-04-11 06:35:46.973086'),(29,'app','0009_alter_attendance_status_alter_attendance_timestamp','2025-04-28 06:19:28.610270'),(30,'app','0010_alter_attendance_status','2025-04-28 06:19:28.847155'),(31,'app','0011_alter_attendance_status','2025-04-28 06:19:29.016066'),(32,'app','0012_attendance_dummy','2025-04-28 07:24:24.231075'),(33,'app','0013_remove_attendance_dummy','2025-04-28 07:26:47.226729'),(34,'app','0014_alter_attendance_timestamp_and_more','2025-04-30 12:42:32.265980'),(35,'app','0014_alter_student_roll_number','2025-05-22 14:49:53.590706'),(36,'app','0015_semester','2025-05-22 15:10:42.601576'),(37,'app','0016_alter_student_semester','2025-05-22 16:44:54.081301');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23  9:19:14
