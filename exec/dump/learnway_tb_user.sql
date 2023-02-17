-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: learnway
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `bad_user` tinyint DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `birthday` date NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_pwd` varchar(255) DEFAULT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKssnk3wadman7pn2qqbph1eht6` (`language_id`),
  CONSTRAINT `FKssnk3wadman7pn2qqbph1eht6` FOREIGN KEY (`language_id`) REFERENCES `tb_language` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'2023-02-17 09:24:01.973182','2023-02-17 09:24:01.973182',0,'HI','1999-03-05','85fae676e4d743b78bf70a8fc0001db8.png','jisoo','string','string','dlwltn0350@naver.com','{bcrypt}$2a$10$Cx0XLLeW4vm276Y4FdPJdOp06lHbKqdHrzKYjo8YVdgnI7NVjGWli',1),(2,'2023-02-17 09:25:55.925098','2023-02-17 09:25:55.925098',0,'HI','1999-03-05','85fae676e4d743b78bf70a8fc0001db8.png','learnway','string','string','learnway35@naver.com','{bcrypt}$2a$10$goJPBiWzx0WsqEkO6LRHE.b0mHc3kxOgo.WfzFw779mKXP1Vyl/Sy',3),(3,'2023-02-17 09:27:38.947929','2023-02-17 09:27:38.947929',0,'HI','1996-10-28','85fae676e4d743b78bf70a8fc0001db8.png','ssafy','string','string','ssafy@ssafy.com','{bcrypt}$2a$10$ktWKdz2vEVBTemWKZhQiIOGygmuOm9iWZZ52Oh4or3SjDxyFxVm/u',5),(4,'2023-02-17 09:30:14.067864','2023-02-17 09:30:14.067864',0,'HI','1995-10-17','85fae676e4d743b78bf70a8fc0001db8.png','rkd','string','string','rkddmscks46@naver.com','{bcrypt}$2a$10$C8Jl3KXVklTJnhhPWPYz0O.fHd6lQqqnwXQ5JK56Ng9jEgnLYTH0K',2);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 10:04:51
