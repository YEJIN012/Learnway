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
-- Table structure for table `tb_study`
--

DROP TABLE IF EXISTS `tb_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_study` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `script` text,
  `friend_id` bigint DEFAULT NULL,
  `friend_language_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `user_language_id` int DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `FKqwomg33fm3afegw3uqa2oocmx` (`friend_id`),
  KEY `FKn81gnlor97413qibg42gdiy2p` (`friend_language_id`),
  KEY `FKdurb4wp5rjut9q5dndrshs89j` (`user_id`),
  KEY `FKe1s8pdaxc0rky65fyof9mqqv4` (`user_language_id`),
  CONSTRAINT `FKdurb4wp5rjut9q5dndrshs89j` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `FKe1s8pdaxc0rky65fyof9mqqv4` FOREIGN KEY (`user_language_id`) REFERENCES `tb_language` (`language_id`),
  CONSTRAINT `FKn81gnlor97413qibg42gdiy2p` FOREIGN KEY (`friend_language_id`) REFERENCES `tb_language` (`language_id`),
  CONSTRAINT `FKqwomg33fm3afegw3uqa2oocmx` FOREIGN KEY (`friend_id`) REFERENCES `tb_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_study`
--

LOCK TABLES `tb_study` WRITE;
/*!40000 ALTER TABLE `tb_study` DISABLE KEYS */;
INSERT INTO `tb_study` VALUES (1,'2023-02-17 09:30:14.067864','2023-02-17 09:30:14.067864','Hello! How are you./ I\'m good./ I don\'t know how to say./ I\'m Jenna./ It\'s nice to meet you./ I love you too./ I will see you./ I hope you can see./ My profile./ Yes./ Yeah, you can./ Do you like reading./ How long did you learn in Korea./ The long./ I studied Korean./ Study./ Study./ How long./ How long have I studied Korean./ I\'ve only taken once in a club in high school./ I only had one year./ I just studied Korean./ But before that, I already watched various Korean dramas./ I know how to say it, but the writings, the written ones, I only learned in high school in the Korean club./ Oh, really./ Yes./ Are there many people in Korean club./ Are there many people in Korean club./ I think there was at least 30 people in that club./ Really./ Yes, we do make kimbaps and then we learn the culture./ The tea culture./ We try./ Oh, is it good./ Yes, I really like it./ Very, very traditional./ How do you speak Korean./ Just a little bit./ I can understand what you say, but sometimes I don\'t know how to reply it./ I understand more than I actually say because I don\'t know how to respond well./ Because I\'m scared./ If you say mull, bull, it means different things, right./ So sometimes I say I want water, but I say I want fire./ Bull! So it gets confusing./ I don\'t know./ But I think you can understand well./ Yes, I can understand what they say./ But for me to say is a bit./././ Down./ You can use it to translate./ Translate./ Yeah./ Translate./ There\'s menu./ There\'s menu button./ Can you rub Korean./ Oh./ But the meaning sometimes because I read them slow./ Like bit by bit./ There is YouTube too.',3,5,1,1);
/*!40000 ALTER TABLE `tb_study` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 10:04:52
