-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: law_college
-- ------------------------------------------------------
-- Server version	8.0.33

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
  `status` varchar(7) NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  `session_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `recorded_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_attendance_student_id_session_id_6c315349_uniq` (`student_id`,`session_id`),
  KEY `app_attendance_session_id_db88754c_fk_app_session_id` (`session_id`),
  KEY `app_attendance_recorded_by_id_d6dd6ca2_fk_app_teacher_id` (`recorded_by_id`),
  CONSTRAINT `app_attendance_recorded_by_id_d6dd6ca2_fk_app_teacher_id` FOREIGN KEY (`recorded_by_id`) REFERENCES `app_teacher` (`id`),
  CONSTRAINT `app_attendance_session_id_db88754c_fk_app_session_id` FOREIGN KEY (`session_id`) REFERENCES `app_session` (`id`),
  CONSTRAINT `app_attendance_student_id_e9880899_fk_app_student_id` FOREIGN KEY (`student_id`) REFERENCES `app_student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_attendance`
--

LOCK TABLES `app_attendance` WRITE;
/*!40000 ALTER TABLE `app_attendance` DISABLE KEYS */;
INSERT INTO `app_attendance` VALUES (1,'Present','2025-03-30 08:27:10.312871',210,4,2),(2,'Present','2025-03-30 08:27:10.396610',210,6,2),(3,'Present','2025-03-30 08:27:10.427995',210,8,2),(4,'Present','2025-03-30 08:27:10.455512',210,10,2),(5,'Present','2025-03-30 08:27:10.466505',210,12,2),(6,'Present','2025-03-30 08:27:10.480496',210,14,2),(7,'Present','2025-03-30 08:27:10.491494',210,16,2),(8,'Present','2025-03-30 08:27:10.501720',210,18,2),(9,'Present','2025-03-30 08:27:10.512068',210,20,2),(10,'Present','2025-03-30 08:27:10.540261',210,22,2),(11,'Present','2025-03-30 10:07:09.129796',232,4,2),(12,'Present','2025-03-30 10:07:09.174186',232,6,2),(13,'Present','2025-03-30 10:07:09.193563',232,8,2),(14,'Present','2025-03-30 10:07:09.202814',232,10,2),(15,'Present','2025-03-30 10:07:09.232768',232,12,2),(16,'Present','2025-03-30 10:07:09.269746',232,14,2),(17,'Present','2025-03-30 10:07:09.280740',232,16,2),(18,'Present','2025-03-30 10:07:09.297730',232,18,2),(19,'Present','2025-03-30 10:07:09.309724',232,20,2),(20,'Present','2025-03-30 10:07:09.326713',232,22,2),(21,'Present','2025-03-30 10:48:21.585488',180,4,2),(22,'Absent','2025-03-30 10:48:21.634039',180,6,2),(23,'Present','2025-03-30 10:48:21.678370',180,8,2),(24,'Absent','2025-03-30 10:48:21.714473',180,10,2),(25,'Present','2025-03-30 10:48:21.723472',180,12,2),(26,'Absent','2025-03-30 10:48:21.732484',180,14,2),(27,'Absent','2025-03-30 10:48:22.158498',180,16,2),(28,'Present','2025-03-30 10:48:22.170492',180,18,2),(29,'Present','2025-03-30 10:48:22.191301',180,20,2),(30,'Absent','2025-03-30 10:48:22.199296',180,22,2);
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
  CONSTRAINT `app_program_chk_1` CHECK ((`duration_years` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_program`
--

LOCK TABLES `app_program` WRITE;
/*!40000 ALTER TABLE `app_program` DISABLE KEYS */;
INSERT INTO `app_program` VALUES (1,'BALLB 5 Yr',5),(2,'LLB 3 Yr',3),(5,'BALLB  5  Yr',5);
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
  CONSTRAINT `app_section_program_id_396c8d0f_fk_app_program_id` FOREIGN KEY (`program_id`) REFERENCES `app_program` (`id`),
  CONSTRAINT `app_section_chk_1` CHECK ((`year` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_section`
--

LOCK TABLES `app_section` WRITE;
/*!40000 ALTER TABLE `app_section` DISABLE KEYS */;
INSERT INTO `app_section` VALUES (1,'Section A',1,1),(2,'Section B',1,1),(3,'Section A',2,1),(7,'Section A',3,1),(8,'Section A',4,1),(9,'Section A',5,1),(4,'Section A',1,2),(6,'Section B',1,2),(10,'Section A',2,2),(11,'Section A',3,2),(5,'Section A',1,5);
/*!40000 ALTER TABLE `app_section` ENABLE KEYS */;
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
  CONSTRAINT `app_session_timetable_id_a942e66c_fk_app_timetable_id` FOREIGN KEY (`timetable_id`) REFERENCES `app_timetable` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=262 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_session`
--

LOCK TABLES `app_session` WRITE;
/*!40000 ALTER TABLE `app_session` DISABLE KEYS */;
INSERT INTO `app_session` VALUES (22,'2025-03-03','Scheduled',4),(23,'2025-03-10','Scheduled',4),(24,'2025-03-17','Scheduled',4),(25,'2025-03-24','Scheduled',4),(26,'2025-03-31','Scheduled',4),(27,'2025-04-07','Scheduled',4),(28,'2025-04-14','Scheduled',4),(29,'2025-04-21','Scheduled',4),(30,'2025-04-28','Scheduled',4),(31,'2025-05-05','Scheduled',4),(32,'2025-05-12','Scheduled',4),(33,'2025-05-19','Scheduled',4),(34,'2025-05-26','Scheduled',4),(35,'2025-06-02','Scheduled',4),(36,'2025-06-09','Scheduled',4),(37,'2025-06-16','Scheduled',4),(38,'2025-06-23','Scheduled',4),(39,'2025-06-30','Scheduled',4),(40,'2025-07-07','Scheduled',4),(41,'2025-07-14','Scheduled',4),(42,'2025-07-21','Scheduled',4),(43,'2025-07-28','Scheduled',4),(44,'2025-08-04','Scheduled',4),(45,'2025-08-11','Scheduled',4),(46,'2025-08-18','Scheduled',4),(47,'2025-08-25','Scheduled',4),(48,'2025-03-06','Scheduled',5),(49,'2025-03-13','Scheduled',5),(50,'2025-03-20','Scheduled',5),(51,'2025-03-27','Scheduled',5),(52,'2025-04-03','Scheduled',5),(53,'2025-04-10','Scheduled',5),(54,'2025-04-17','Scheduled',5),(55,'2025-04-24','Scheduled',5),(56,'2025-05-01','Scheduled',5),(57,'2025-05-08','Scheduled',5),(58,'2025-05-15','Scheduled',5),(59,'2025-05-22','Scheduled',5),(60,'2025-05-29','Scheduled',5),(61,'2025-06-05','Scheduled',5),(62,'2025-06-12','Scheduled',5),(63,'2025-06-19','Scheduled',5),(64,'2025-06-26','Scheduled',5),(65,'2025-07-03','Scheduled',5),(66,'2025-07-10','Scheduled',5),(67,'2025-07-17','Scheduled',5),(68,'2025-07-24','Scheduled',5),(69,'2025-07-31','Scheduled',5),(70,'2025-08-07','Scheduled',5),(71,'2025-08-14','Scheduled',5),(72,'2025-08-21','Scheduled',5),(73,'2025-08-28','Scheduled',5),(74,'2025-03-01','Scheduled',6),(75,'2025-03-08','Scheduled',6),(76,'2025-03-15','Scheduled',6),(77,'2025-03-22','Scheduled',6),(78,'2025-03-29','Scheduled',6),(79,'2025-04-05','Scheduled',6),(80,'2025-04-12','Scheduled',6),(81,'2025-04-19','Scheduled',6),(82,'2025-04-26','Scheduled',6),(83,'2025-05-03','Scheduled',6),(84,'2025-05-10','Scheduled',6),(85,'2025-05-17','Scheduled',6),(86,'2025-05-24','Scheduled',6),(87,'2025-05-31','Scheduled',6),(88,'2025-06-07','Scheduled',6),(89,'2025-06-14','Scheduled',6),(90,'2025-06-21','Scheduled',6),(91,'2025-06-28','Scheduled',6),(92,'2025-07-05','Scheduled',6),(93,'2025-07-12','Scheduled',6),(94,'2025-07-19','Scheduled',6),(95,'2025-07-26','Scheduled',6),(96,'2025-08-02','Scheduled',6),(97,'2025-08-09','Scheduled',6),(98,'2025-08-16','Scheduled',6),(99,'2025-08-23','Scheduled',6),(100,'2025-08-30','Scheduled',6),(101,'2025-03-03','Scheduled',8),(102,'2025-03-10','Scheduled',8),(103,'2025-03-17','Scheduled',8),(104,'2025-03-24','Scheduled',8),(105,'2025-03-31','Scheduled',8),(106,'2025-04-07','Scheduled',8),(107,'2025-04-14','Scheduled',8),(108,'2025-04-21','Scheduled',8),(109,'2025-04-28','Scheduled',8),(110,'2025-05-05','Scheduled',8),(111,'2025-05-12','Scheduled',8),(112,'2025-05-19','Scheduled',8),(113,'2025-05-26','Scheduled',8),(114,'2025-06-02','Scheduled',8),(115,'2025-06-09','Scheduled',8),(116,'2025-06-16','Scheduled',8),(117,'2025-06-23','Scheduled',8),(118,'2025-06-30','Scheduled',8),(119,'2025-07-07','Scheduled',8),(120,'2025-07-14','Scheduled',8),(121,'2025-07-21','Scheduled',8),(122,'2025-07-28','Scheduled',8),(123,'2025-08-04','Scheduled',8),(124,'2025-08-11','Scheduled',8),(125,'2025-08-18','Scheduled',8),(126,'2025-08-25','Scheduled',8),(127,'2025-03-07','Scheduled',9),(128,'2025-03-14','Scheduled',9),(129,'2025-03-21','Scheduled',9),(130,'2025-03-28','Scheduled',9),(131,'2025-04-04','Scheduled',9),(132,'2025-04-11','Scheduled',9),(133,'2025-04-18','Scheduled',9),(134,'2025-04-25','Scheduled',9),(135,'2025-05-02','Scheduled',9),(136,'2025-05-09','Scheduled',9),(137,'2025-05-16','Scheduled',9),(138,'2025-05-23','Scheduled',9),(139,'2025-05-30','Scheduled',9),(140,'2025-06-06','Scheduled',9),(141,'2025-06-13','Scheduled',9),(142,'2025-06-20','Scheduled',9),(143,'2025-06-27','Scheduled',9),(144,'2025-07-04','Scheduled',9),(145,'2025-07-11','Scheduled',9),(146,'2025-07-18','Scheduled',9),(147,'2025-07-25','Scheduled',9),(148,'2025-08-01','Scheduled',9),(149,'2025-08-08','Scheduled',9),(150,'2025-08-15','Scheduled',9),(151,'2025-08-22','Scheduled',9),(152,'2025-08-29','Scheduled',9),(153,'2025-03-01','Scheduled',10),(154,'2025-03-08','Scheduled',10),(155,'2025-03-15','Scheduled',10),(156,'2025-03-22','Scheduled',10),(157,'2025-03-29','Scheduled',10),(158,'2025-04-05','Scheduled',10),(159,'2025-04-12','Scheduled',10),(160,'2025-04-19','Scheduled',10),(161,'2025-04-26','Scheduled',10),(162,'2025-05-03','Scheduled',10),(163,'2025-05-10','Scheduled',10),(164,'2025-05-17','Scheduled',10),(165,'2025-05-24','Scheduled',10),(166,'2025-05-31','Scheduled',10),(167,'2025-06-07','Scheduled',10),(168,'2025-06-14','Scheduled',10),(169,'2025-06-21','Scheduled',10),(170,'2025-06-28','Scheduled',10),(171,'2025-07-05','Scheduled',10),(172,'2025-07-12','Scheduled',10),(173,'2025-07-19','Scheduled',10),(174,'2025-07-26','Scheduled',10),(175,'2025-08-02','Scheduled',10),(176,'2025-08-09','Scheduled',10),(177,'2025-08-16','Scheduled',10),(178,'2025-08-23','Scheduled',10),(179,'2025-08-30','Scheduled',10),(180,'2025-03-03','Completed',11),(181,'2025-03-10','Scheduled',11),(182,'2025-03-17','Scheduled',11),(183,'2025-03-24','Scheduled',11),(184,'2025-03-31','Scheduled',11),(185,'2025-04-07','Scheduled',11),(186,'2025-04-14','Scheduled',11),(187,'2025-04-21','Scheduled',11),(188,'2025-04-28','Scheduled',11),(189,'2025-05-05','Scheduled',11),(190,'2025-05-12','Scheduled',11),(191,'2025-05-19','Scheduled',11),(192,'2025-05-26','Scheduled',11),(193,'2025-06-02','Scheduled',11),(194,'2025-06-09','Scheduled',11),(195,'2025-06-16','Scheduled',11),(196,'2025-06-23','Scheduled',11),(197,'2025-06-30','Scheduled',11),(198,'2025-07-07','Scheduled',11),(199,'2025-07-14','Scheduled',11),(200,'2025-07-21','Scheduled',11),(201,'2025-07-28','Scheduled',11),(202,'2025-08-04','Scheduled',11),(203,'2025-08-11','Scheduled',11),(204,'2025-08-18','Scheduled',11),(205,'2025-08-25','Scheduled',11),(206,'2025-03-05','Scheduled',12),(207,'2025-03-12','Scheduled',12),(208,'2025-03-19','Scheduled',12),(209,'2025-03-26','Scheduled',12),(210,'2025-04-02','Completed',12),(211,'2025-04-09','Scheduled',12),(212,'2025-04-16','Scheduled',12),(213,'2025-04-23','Scheduled',12),(214,'2025-04-30','Scheduled',12),(215,'2025-05-07','Scheduled',12),(216,'2025-05-14','Scheduled',12),(217,'2025-05-21','Scheduled',12),(218,'2025-05-28','Scheduled',12),(219,'2025-06-04','Scheduled',12),(220,'2025-06-11','Scheduled',12),(221,'2025-06-18','Scheduled',12),(222,'2025-06-25','Scheduled',12),(223,'2025-07-02','Scheduled',12),(224,'2025-07-09','Scheduled',12),(225,'2025-07-16','Scheduled',12),(226,'2025-07-23','Scheduled',12),(227,'2025-07-30','Scheduled',12),(228,'2025-08-06','Scheduled',12),(229,'2025-08-13','Scheduled',12),(230,'2025-08-20','Scheduled',12),(231,'2025-08-27','Scheduled',12),(232,'2025-03-01','Completed',13),(233,'2025-03-08','Scheduled',13),(234,'2025-03-15','Scheduled',13),(235,'2025-03-22','Scheduled',13),(236,'2025-03-29','Scheduled',13),(237,'2025-04-05','Scheduled',13),(238,'2025-04-12','Scheduled',13),(239,'2025-04-19','Scheduled',13),(240,'2025-04-26','Scheduled',13),(241,'2025-05-03','Scheduled',13),(242,'2025-05-10','Scheduled',13),(243,'2025-05-17','Scheduled',13),(244,'2025-05-24','Scheduled',13),(245,'2025-05-31','Scheduled',13),(246,'2025-06-07','Scheduled',13),(247,'2025-06-14','Scheduled',13),(248,'2025-06-21','Scheduled',13),(249,'2025-06-28','Scheduled',13),(250,'2025-07-05','Scheduled',13),(251,'2025-07-12','Scheduled',13),(252,'2025-07-19','Scheduled',13),(253,'2025-07-26','Scheduled',13),(254,'2025-08-02','Scheduled',13),(255,'2025-08-09','Scheduled',13),(256,'2025-08-16','Scheduled',13),(257,'2025-08-23','Scheduled',13),(258,'2025-08-30','Scheduled',13);
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
  `roll_number` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  `section_id` bigint NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roll_number` (`roll_number`),
  UNIQUE KEY `email` (`email`),
  KEY `app_student_section_id_99aa63b7_fk_app_section_id` (`section_id`),
  CONSTRAINT `app_student_section_id_99aa63b7_fk_app_section_id` FOREIGN KEY (`section_id`) REFERENCES `app_section` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_student`
--

LOCK TABLES `app_student` WRITE;
/*!40000 ALTER TABLE `app_student` DISABLE KEYS */;
INSERT INTO `app_student` VALUES (1,'G240001','Alice','Smith','alice@example.com',1,''),(4,'G240002','Ishita','Verma','ishita.verma@example.com',2,'9876543211'),(5,'G240003','Rohan','Iyer','rohan.iyer@example.com',1,'9876543212'),(6,'G240004','Priya','Chopra','priya.chopra@example.com',2,'9876543213'),(7,'G240005','Vivaan','Malhotra','vivaan.malhotra@example.com',1,'9876543214'),(8,'G240006','Aditya','Kapoor','aditya.kapoor@example.com',2,'9876543215'),(9,'G240007','Kabir','Menon','kabir.menon@example.com',1,'9876543216'),(10,'G240008','Swati','Bose','swati.bose@example.com',2,'9876543217'),(11,'G240009','Ananya','Chopra','ananya.chopra@example.com',1,'9876543218'),(12,'G240010','Dev','Iyer','dev.iyer@example.com',2,'9876543219'),(13,'G240011','Harsh','Verma','harsh.verma@example.com',1,'9876543220'),(14,'G240012','Ritika','Patel','ritika.patel@example.com',2,'9876543221'),(15,'G240013','Pooja','Singh','pooja.singh@example.com',1,'9876543222'),(16,'G240014','Tanya','Kapoor','tanya.kapoor@example.com',2,'9876543223'),(17,'G240015','Simran','Sharma','simran.sharma@example.com',1,'9876543224'),(18,'G240016','Vikram','Malhotra','vikram.malhotra@example.com',2,'9876543225'),(19,'G240017','Neha','Bose','neha.bose@example.com',1,'9876543226'),(20,'G240018','Ishaan','Menon','ishaan.menon@example.com',2,'9876543227'),(21,'G240019','Arjun','Chopra','arjun.chopra@example.com',1,'9876543228'),(22,'G240020','Devika','Patel','devika.patel@example.com',2,'9876543229'),(23,'NG240001','Aarav','Kapoor','aarav.kapoor@example.com',4,'9876543230'),(24,'NG240002','Rohan','Bose','rohan.bose@example.com',6,'9876543231'),(25,'NG240003','Vivaan','Singh','vivaan.singh@example.com',4,'9876543232'),(26,'NG240004','Kabir','Malhotra','kabir.malhotra@example.com',6,'9876543233'),(27,'NG240005','Neha','Sharma','neha.sharma@example.com',4,'9876543234'),(28,'NG240006','Ananya','Patel','ananya.patel@example.com',6,'9876543235'),(29,'NG240007','Dev','Chopra','dev.chopra@example.com',4,'9876543236'),(30,'NG240008','Swati','Iyer','swati.iyer@example.com',6,'9876543237'),(34,'NG240009','Harsh','Verma','harshs.verma@example.com',4,'9876543238'),(35,'NG240010','Pooja','Menon','pooja.menon@example.com',6,'9876543239'),(36,'NG240011','Ishita','Sharma','ishita.sharma@example.com',4,'9876543240'),(37,'NG240012','Simran','Kapoor','simran.kapoor@example.com',6,'9876543241'),(38,'NG240013','Tanya','Bose','tanya.bose@example.com',4,'9876543242'),(39,'NG240014','Ritika','Chopra','ritika.chopra@example.com',6,'9876543243'),(40,'NG240015','Vikram','Patel','vikram.patel@example.com',4,'9876543244'),(44,'NG240016','Ishaan','Menon','ishaanw.menon@example.com',6,'9876543245'),(45,'NG240017','Priya','Malhotra','priya.malhotra@example.com',4,'9876543246'),(46,'NG240018','Aditya','Singh','aditya.singh@example.com',6,'9876543247'),(47,'NG240019','Devika','Verma','devika.verma@example.com',4,'9876543248'),(48,'NG240020','Arjun','Iyer','arjun.iyer@example.com',6,'9876543249');
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
) ENGINE=InnoDB AUTO_INCREMENT=469 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_student_subjects`
--

LOCK TABLES `app_student_subjects` WRITE;
/*!40000 ALTER TABLE `app_student_subjects` DISABLE KEYS */;
INSERT INTO `app_student_subjects` VALUES (11,4,30),(12,4,31),(1,4,32),(2,4,33),(3,4,34),(4,4,35),(5,4,80),(6,4,81),(7,4,82),(8,4,83),(9,4,84),(10,4,85),(23,5,30),(24,5,31),(13,5,32),(14,5,33),(15,5,34),(16,5,35),(17,5,80),(18,5,81),(19,5,82),(20,5,83),(21,5,84),(22,5,85),(35,6,30),(36,6,31),(25,6,32),(26,6,33),(27,6,34),(28,6,35),(29,6,80),(30,6,81),(31,6,82),(32,6,83),(33,6,84),(34,6,85),(47,7,30),(48,7,31),(37,7,32),(38,7,33),(39,7,34),(40,7,35),(41,7,80),(42,7,81),(43,7,82),(44,7,83),(45,7,84),(46,7,85),(59,8,30),(60,8,31),(49,8,32),(50,8,33),(51,8,34),(52,8,35),(53,8,80),(54,8,81),(55,8,82),(56,8,83),(57,8,84),(58,8,85),(71,9,30),(72,9,31),(61,9,32),(62,9,33),(63,9,34),(64,9,35),(65,9,80),(66,9,81),(67,9,82),(68,9,83),(69,9,84),(70,9,85),(83,10,30),(84,10,31),(73,10,32),(74,10,33),(75,10,34),(76,10,35),(77,10,80),(78,10,81),(79,10,82),(80,10,83),(81,10,84),(82,10,85),(95,11,30),(96,11,31),(85,11,32),(86,11,33),(87,11,34),(88,11,35),(89,11,80),(90,11,81),(91,11,82),(92,11,83),(93,11,84),(94,11,85),(107,12,30),(108,12,31),(97,12,32),(98,12,33),(99,12,34),(100,12,35),(101,12,80),(102,12,81),(103,12,82),(104,12,83),(105,12,84),(106,12,85),(119,13,30),(120,13,31),(109,13,32),(110,13,33),(111,13,34),(112,13,35),(113,13,80),(114,13,81),(115,13,82),(116,13,83),(117,13,84),(118,13,85),(131,14,30),(132,14,31),(121,14,32),(122,14,33),(123,14,34),(124,14,35),(125,14,80),(126,14,81),(127,14,82),(128,14,83),(129,14,84),(130,14,85),(143,15,30),(144,15,31),(133,15,32),(134,15,33),(135,15,34),(136,15,35),(137,15,80),(138,15,81),(139,15,82),(140,15,83),(141,15,84),(142,15,85),(155,16,30),(156,16,31),(145,16,32),(146,16,33),(147,16,34),(148,16,35),(149,16,80),(150,16,81),(151,16,82),(152,16,83),(153,16,84),(154,16,85),(167,17,30),(168,17,31),(157,17,32),(158,17,33),(159,17,34),(160,17,35),(161,17,80),(162,17,81),(163,17,82),(164,17,83),(165,17,84),(166,17,85),(179,18,30),(180,18,31),(169,18,32),(170,18,33),(171,18,34),(172,18,35),(173,18,80),(174,18,81),(175,18,82),(176,18,83),(177,18,84),(178,18,85),(191,19,30),(192,19,31),(181,19,32),(182,19,33),(183,19,34),(184,19,35),(185,19,80),(186,19,81),(187,19,82),(188,19,83),(189,19,84),(190,19,85),(203,20,30),(204,20,31),(193,20,32),(194,20,33),(195,20,34),(196,20,35),(197,20,80),(198,20,81),(199,20,82),(200,20,83),(201,20,84),(202,20,85),(215,21,30),(216,21,31),(205,21,32),(206,21,33),(207,21,34),(208,21,35),(209,21,80),(210,21,81),(211,21,82),(212,21,83),(213,21,84),(214,21,85),(227,22,30),(228,22,31),(217,22,32),(218,22,33),(219,22,34),(220,22,35),(221,22,80),(222,22,81),(223,22,82),(224,22,83),(225,22,84),(226,22,85),(239,23,30),(240,23,31),(229,23,32),(230,23,33),(231,23,34),(232,23,35),(233,23,80),(234,23,81),(235,23,82),(236,23,83),(237,23,84),(238,23,85),(251,24,30),(252,24,31),(241,24,32),(242,24,33),(243,24,34),(244,24,35),(245,24,80),(246,24,81),(247,24,82),(248,24,83),(249,24,84),(250,24,85),(263,25,30),(264,25,31),(253,25,32),(254,25,33),(255,25,34),(256,25,35),(257,25,80),(258,25,81),(259,25,82),(260,25,83),(261,25,84),(262,25,85),(275,26,30),(276,26,31),(265,26,32),(266,26,33),(267,26,34),(268,26,35),(269,26,80),(270,26,81),(271,26,82),(272,26,83),(273,26,84),(274,26,85),(287,27,30),(288,27,31),(277,27,32),(278,27,33),(279,27,34),(280,27,35),(281,27,80),(282,27,81),(283,27,82),(284,27,83),(285,27,84),(286,27,85),(299,28,30),(300,28,31),(289,28,32),(290,28,33),(291,28,34),(292,28,35),(293,28,80),(294,28,81),(295,28,82),(296,28,83),(297,28,84),(298,28,85),(311,29,30),(312,29,31),(301,29,32),(302,29,33),(303,29,34),(304,29,35),(305,29,80),(306,29,81),(307,29,82),(308,29,83),(309,29,84),(310,29,85),(323,30,30),(324,30,31),(313,30,32),(314,30,33),(315,30,34),(316,30,35),(317,30,80),(318,30,81),(319,30,82),(320,30,83),(321,30,84),(322,30,85),(335,34,30),(336,34,31),(325,34,32),(326,34,33),(327,34,34),(328,34,35),(329,34,80),(330,34,81),(331,34,82),(332,34,83),(333,34,84),(334,34,85),(347,35,30),(348,35,31),(337,35,32),(338,35,33),(339,35,34),(340,35,35),(341,35,80),(342,35,81),(343,35,82),(344,35,83),(345,35,84),(346,35,85),(359,36,30),(360,36,31),(349,36,32),(350,36,33),(351,36,34),(352,36,35),(353,36,80),(354,36,81),(355,36,82),(356,36,83),(357,36,84),(358,36,85),(371,37,30),(372,37,31),(361,37,32),(362,37,33),(363,37,34),(364,37,35),(365,37,80),(366,37,81),(367,37,82),(368,37,83),(369,37,84),(370,37,85),(383,38,30),(384,38,31),(373,38,32),(374,38,33),(375,38,34),(376,38,35),(377,38,80),(378,38,81),(379,38,82),(380,38,83),(381,38,84),(382,38,85),(395,39,30),(396,39,31),(385,39,32),(386,39,33),(387,39,34),(388,39,35),(389,39,80),(390,39,81),(391,39,82),(392,39,83),(393,39,84),(394,39,85),(407,40,30),(408,40,31),(397,40,32),(398,40,33),(399,40,34),(400,40,35),(401,40,80),(402,40,81),(403,40,82),(404,40,83),(405,40,84),(406,40,85),(419,44,30),(420,44,31),(409,44,32),(410,44,33),(411,44,34),(412,44,35),(413,44,80),(414,44,81),(415,44,82),(416,44,83),(417,44,84),(418,44,85),(431,45,30),(432,45,31),(421,45,32),(422,45,33),(423,45,34),(424,45,35),(425,45,80),(426,45,81),(427,45,82),(428,45,83),(429,45,84),(430,45,85),(443,46,30),(444,46,31),(433,46,32),(434,46,33),(435,46,34),(436,46,35),(437,46,80),(438,46,81),(439,46,82),(440,46,83),(441,46,84),(442,46,85),(455,47,30),(456,47,31),(445,47,32),(446,47,33),(447,47,34),(448,47,35),(449,47,80),(450,47,81),(451,47,82),(452,47,83),(453,47,84),(454,47,85),(467,48,30),(468,48,31),(457,48,32),(458,48,33),(459,48,34),(460,48,35),(461,48,80),(462,48,81),(463,48,82),(464,48,83),(465,48,84),(466,48,85);
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
  CONSTRAINT `app_subject_chk_1` CHECK ((`semester` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_subject`
--

LOCK TABLES `app_subject` WRITE;
/*!40000 ALTER TABLE `app_subject` DISABLE KEYS */;
INSERT INTO `app_subject` VALUES (30,'Political Science I',0,1),(31,'Microeconomics I',0,1),(32,'Sociology I',0,1),(33,'General English',0,1),(34,'Local Language/Foreign Language',0,1),(35,'Legal Development',0,1),(36,'Political Theory II',0,2),(37,'Macroeconomics II',0,2),(38,'Sociology II',0,2),(39,'Constitutional Development',0,2),(40,'Law and Literature',0,3),(41,'Foundations of Political Obligations',0,3),(42,'Indian Economy',0,3),(43,'Urban, Rural & Tribal Sociology of India',0,3),(44,'Constitutional Law I',1,3),(45,'Legal Language and Legal Writing',0,4),(46,'International Relations and Obligations',0,4),(47,'Economic Policies',0,4),(48,'Contemporary Issues of Sociology',0,4),(49,'Constitutional Law II',1,4),(50,'Local Self Government',0,5),(51,'Jurisprudence',1,5),(52,'Torts & Consumer Protection Act',1,5),(53,'Family Law I',1,5),(54,'Law of Contract I',1,5),(55,'Banking Law & Negotiable Instruments Act',1,5),(56,'Principles of Public Administration',0,6),(57,'Family Law II',1,6),(58,'Law of Contract II',1,6),(59,'Social Research Methods',0,6),(60,'Bhartiya Nyaya Sanhita',1,7),(61,'Property Law and Easement Act',1,7),(62,'Labour Law I',1,7),(63,'Administrative Law',1,7),(64,'Professional Ethics',1,7),(65,'Bharatiya Nagarik Suraksha Sanhita',1,8),(66,'Company Law',1,8),(67,'Labour Law II',1,8),(68,'Interpretation of Statutes',1,8),(69,'Alternative Dispute Resolution (ADR)',1,8),(70,'Bharatiya Sakshya Adhiniyam',1,9),(71,'Civil Procedure Code & Limitation Act',1,9),(72,'Principles of Taxation',1,9),(73,'Environmental Law',1,9),(74,'Land Laws',1,9),(75,'Drafting, Pleading & Conveyance',1,9),(76,'Intellectual Property Law',1,10),(77,'Public International Law',1,10),(78,'Insurance Law',1,10),(79,'Moot Court & Clinical Legal Education',1,10),(80,'Law of Contract I',1,1),(81,'Constitutional Law I',1,1),(82,'Torts & Consumer Protection Act',1,1),(83,'Jurisprudence',1,1),(84,'Family Law I',1,1),(85,'Banking Law & Negotiable Instruments Act',1,1),(86,'Law of Contract II',1,2),(87,'Constitutional Law II',1,2),(88,'Family Law II',1,2),(89,'Motor Vehicle Act',1,2),(90,'Social Research Methods',0,2),(91,'Bhartiya Nyaya Sanhita',1,3),(92,'Property Law and Easement Act',1,3),(93,'Labour Law I',1,3),(94,'Administrative Law',1,3),(95,'Professional Ethics',1,3),(96,'Bharatiya Nagarik Suraksha Sanhita',1,4),(97,'Company Law',1,4),(98,'Labour Law II',1,4),(99,'Interpretation of Statutes',1,4),(100,'ADR (Clinical Legal Education)',1,4),(101,'Bharatiya Sakshya Adhiniyam',1,5),(102,'Civil Procedure Code & Limitation Act',1,5),(103,'Principles of Taxation',1,5),(104,'Environmental Law',1,5),(105,'Land Laws',1,5),(106,'Drafting, Pleading & Conveyance',1,5),(107,'Intellectual Property Law',1,6),(108,'Public International Law',1,6),(109,'Insurance Law',1,6),(110,'Moot Court & Clinical Legal Education',1,6);
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
  CONSTRAINT `app_teacher_user_id_d565d5e5_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_teacher`
--

LOCK TABLES `app_teacher` WRITE;
/*!40000 ALTER TABLE `app_teacher` DISABLE KEYS */;
INSERT INTO `app_teacher` VALUES (1,'John','Doe','john.doe@example.com',NULL,2,0),(2,'Pranav','Sirsufale','pranav@gmail.com','8482852301',3,0),(3,'teacher','one','one@gmail.com',NULL,4,0),(4,'teacher','two','two@gmail.com',NULL,5,0),(5,'teacher','three','three@gmail.com',NULL,6,0),(6,'teacher','four','four@gmail.com',NULL,7,0),(7,'teacher','five','five@gmail.com',NULL,8,0),(8,'teacher','six','six@gmail.com',NULL,9,0),(9,'teacher','seven','seven@gmail.com',NULL,10,0),(10,'teacher','eight','eight@gmail.com',NULL,11,0),(11,'teacher','nine','nine@gmail.com',NULL,12,0),(12,'teacher','ten','ten@gmail.com',NULL,13,0),(13,'admin','admin_last_name','admin@gmail.com',NULL,14,1);
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
  CONSTRAINT `app_timetable_section_id_8df1f292_fk_app_section_id` FOREIGN KEY (`section_id`) REFERENCES `app_section` (`id`),
  CONSTRAINT `app_timetable_subject_id_9212521a_fk_app_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `app_subject` (`id`),
  CONSTRAINT `app_timetable_teacher_id_a975a114_fk_app_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `app_teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_timetable`
--

LOCK TABLES `app_timetable` WRITE;
/*!40000 ALTER TABLE `app_timetable` DISABLE KEYS */;
INSERT INTO `app_timetable` VALUES (4,'Monday','08:30:00.000000','2025-03-01','2025-08-31',1,30,1),(5,'Thursday','08:30:00.000000','2025-03-01','2025-08-31',1,30,1),(6,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',1,30,1),(8,'Monday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(9,'Friday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(10,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',2,31,12),(11,'Monday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2),(12,'Wednesday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2),(13,'Saturday','08:30:00.000000','2025-03-01','2025-08-31',2,85,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Calendar Exception',7,'add_calendarexception'),(26,'Can change Calendar Exception',7,'change_calendarexception'),(27,'Can delete Calendar Exception',7,'delete_calendarexception'),(28,'Can view Calendar Exception',7,'view_calendarexception'),(29,'Can add Program',8,'add_program'),(30,'Can change Program',8,'change_program'),(31,'Can delete Program',8,'delete_program'),(32,'Can view Program',8,'view_program'),(33,'Can add Subject',9,'add_subject'),(34,'Can change Subject',9,'change_subject'),(35,'Can delete Subject',9,'delete_subject'),(36,'Can view Subject',9,'view_subject'),(37,'Can add Section',10,'add_section'),(38,'Can change Section',10,'change_section'),(39,'Can delete Section',10,'delete_section'),(40,'Can view Section',10,'view_section'),(41,'Can add Student',11,'add_student'),(42,'Can change Student',11,'change_student'),(43,'Can delete Student',11,'delete_student'),(44,'Can view Student',11,'view_student'),(45,'Can add Teacher',12,'add_teacher'),(46,'Can change Teacher',12,'change_teacher'),(47,'Can delete Teacher',12,'delete_teacher'),(48,'Can view Teacher',12,'view_teacher'),(49,'Can add Timetable',13,'add_timetable'),(50,'Can change Timetable',13,'change_timetable'),(51,'Can delete Timetable',13,'delete_timetable'),(52,'Can view Timetable',13,'view_timetable'),(53,'Can add Session',14,'add_session'),(54,'Can change Session',14,'change_session'),(55,'Can delete Session',14,'delete_session'),(56,'Can view Session',14,'view_session'),(57,'Can add Attendance',15,'add_attendance'),(58,'Can change Attendance',15,'change_attendance'),(59,'Can delete Attendance',15,'delete_attendance'),(60,'Can view Attendance',15,'view_attendance');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$Me9YZI6YfmhjX5LJI0WBHt$W3xNBZ+tlmjsWwiziX7f07jSwR0bRoMOR57Hkls+fCA=',NULL,0,'pranav','','','',0,1,'2025-03-25 03:20:11.593406'),(2,'pbkdf2_sha256$870000$50fSDLFD0fE5lURLDq9qVc$BNEr7PBQ8zvmLjjDUETH2F3B40uEw7B4GuvK6NjULQo=',NULL,0,'john.doe','','','',0,1,'2025-03-25 03:21:57.704575'),(3,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=','2025-03-31 08:08:32.439553',0,'pranav.sirsufale','','','',0,1,'2025-03-25 10:20:28.637956'),(4,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher1','','','one@gmail.com',0,1,'2025-03-27 17:05:18.948975'),(5,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher2','','','two@gmail.com',0,1,'2025-03-27 17:05:19.379372'),(6,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher3','','','three@gmail.com',0,1,'2025-03-27 17:05:19.425674'),(7,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher4','','','four@gmail.com',0,1,'2025-03-27 17:05:19.444986'),(8,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher5','','','five@gmail.com',0,1,'2025-03-27 17:05:19.500480'),(9,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher6','','','six@gmail.com',0,1,'2025-03-27 17:05:19.528860'),(10,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher7','','','seven@gmail.com',0,1,'2025-03-27 17:05:19.545909'),(11,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher8','','','eight@gmail.com',0,1,'2025-03-27 17:05:19.564738'),(12,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher9','','','nine@gmail.com',0,1,'2025-03-27 17:05:19.595600'),(13,'pbkdf2_sha256$870000$XYnI0TJYmgkOeCXoW4HUTD$/LyDuIJ77OD8cfEvd65VBayMQDfBZyqK0u8YfLQR5M4=',NULL,0,'teacher10','','','ten@gmail.com',0,1,'2025-03-27 17:05:19.613329'),(14,'pbkdf2_sha256$870000$X7EOnRDXkTdYSQUgd627z2$wG8Mh0ph0O6YOnWzCNuP/a/nyaofD22DHmLnjTTAAOI=','2025-03-31 06:49:06.310620',0,'admin','','','admin@gmail.com',0,1,'2025-03-30 18:07:31.745190');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(15,'app','attendance'),(7,'app','calendarexception'),(8,'app','program'),(10,'app','section'),(14,'app','session'),(11,'app','student'),(9,'app','subject'),(12,'app','teacher'),(13,'app','timetable'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-25 03:06:34.988284'),(2,'auth','0001_initial','2025-03-25 03:06:36.003056'),(3,'admin','0001_initial','2025-03-25 03:06:36.309402'),(4,'admin','0002_logentry_remove_auto_add','2025-03-25 03:06:36.334389'),(5,'admin','0003_logentry_add_action_flag_choices','2025-03-25 03:06:36.360373'),(6,'app','0001_initial','2025-03-25 03:06:38.244642'),(7,'contenttypes','0002_remove_content_type_name','2025-03-25 03:06:38.446699'),(8,'auth','0002_alter_permission_name_max_length','2025-03-25 03:06:38.578755'),(9,'auth','0003_alter_user_email_max_length','2025-03-25 03:06:38.643459'),(10,'auth','0004_alter_user_username_opts','2025-03-25 03:06:38.663449'),(11,'auth','0005_alter_user_last_login_null','2025-03-25 03:06:38.788991'),(12,'auth','0006_require_contenttypes_0002','2025-03-25 03:06:38.793584'),(13,'auth','0007_alter_validators_add_error_messages','2025-03-25 03:06:38.812366'),(14,'auth','0008_alter_user_username_max_length','2025-03-25 03:06:38.931673'),(15,'auth','0009_alter_user_last_name_max_length','2025-03-25 03:06:39.067123'),(16,'auth','0010_alter_group_name_max_length','2025-03-25 03:06:39.128580'),(17,'auth','0011_update_proxy_permissions','2025-03-25 03:06:39.162562'),(18,'auth','0012_alter_user_first_name_max_length','2025-03-25 03:06:39.295542'),(19,'sessions','0001_initial','2025-03-25 03:06:39.384131'),(20,'app','0002_student_phone','2025-03-25 04:03:27.779276'),(21,'app','0003_alter_subject_name_alter_subject_unique_together','2025-03-27 04:27:46.029908'),(22,'app','0004_alter_timetable_teacher','2025-03-28 15:05:47.581771'),(23,'app','0003_teacher_is_admin_alter_teacher_first_name_and_more','2025-03-30 18:03:06.030454');
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

-- Dump completed on 2025-03-31 15:29:49
