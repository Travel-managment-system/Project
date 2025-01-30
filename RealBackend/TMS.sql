-- MySQL dump 10.13  Distrib 8.4.2, for Win64 (x86_64)
--
-- Host: localhost    Database: TMS
-- ------------------------------------------------------
-- Server version	8.4.2

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
-- Table structure for table `booking_details`
--

DROP TABLE IF EXISTS `booking_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_details` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pkg_id` int DEFAULT NULL,
  `count_people` int DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `return_Date` date DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `confirmed` char(3) DEFAULT 'yes',
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `pkg_id` (`pkg_id`),
  CONSTRAINT `booking_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `booking_details_ibfk_2` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`pkg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_details`
--

LOCK TABLES `booking_details` WRITE;
/*!40000 ALTER TABLE `booking_details` DISABLE KEYS */;
INSERT INTO `booking_details` VALUES (1,4,5,3,'2025-02-02','2025-03-01',18179,'yes'),(2,5,9,4,'2025-03-12','2025-04-12',14400,'yes'),(4,1,6,1,'2024-08-20','2024-08-30',16728,'yes');
/*!40000 ALTER TABLE `booking_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `pkg_id` int DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` char(10) DEFAULT 'active',
  `reviews` text,
  PRIMARY KEY (`hotel_id`),
  KEY `pkg_id` (`pkg_id`),
  CONSTRAINT `hotels_ibfk_1` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`pkg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (5,4,8500.5,'mumbai_hotel.png','active','luxurious hotel with sea view'),(6,5,9200.75,'delhi_hotel.png','active','comfortable stay with excellent service'),(7,6,7800,'bangalore_hotel.png','active','modern amenities and great location'),(8,7,8300.25,'chennai_hotel.png','active','spacious rooms with friendly staff'),(10,8,7800,'kolkata_hotel2.png','active','heritage hotel with beautiful view'),(11,9,5000,'kolkata_hotel3.png','active','heritage hotel with beautiful view'),(12,1,7569,'hotel1.png','active','heritage hotel with beautiful view'),(13,3,7569,'hotel2.png','active','heritage hotel with beautiful view');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `pkg_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `description` text,
  `total_cost` decimal(10,0) DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Created_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(50) DEFAULT NULL,
  `status` char(10) DEFAULT 'active',
  PRIMARY KEY (`pkg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,'Manali','Manali is a resort town, near Kullu town in Kullu district in the Indian state of Himachal Pradesh. It is situated in the northern end of the Kullu Valley, formed by the Beas River.',16369,'manali.png','2024-12-12 10:25:51',NULL,'2024-12-23 13:47:27','W2_87386_Asad','active'),(3,'Kashmir','a lot of people wear traditional clothes with some stones, stones are mandatory here',16827,'bachao.png','2024-12-12 10:30:11','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(4,'Jaipur','Jaipur is the capital and the largest city of the north-western Indian state of Rajasthan. As of 2011 , the city has a population of 3.1 million, making it the tenth most populous city in the country.',16889,'Jaipur.png','2024-12-14 09:24:02','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(5,'Mumbai','Mumbai, formerly known as Bombay, is the capital city of the Indian state of Maharashtra. It is the most populous city in India with an estimated city proper population of 12.4 million as of 2011.',18179,'Mumbai.png','2024-12-14 09:49:07','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(6,'Delhi','Delhi, India?s capital territory, is a massive metropolitan area in the country?s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India.',16728,'Delhi.png','2024-12-14 09:49:25','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(7,'Bangalore','Bangalore, officially known as Bengaluru, is the capital of the Indian state of Karnataka. It has a population of over ten million, making it a megacity and the third most populous city in India.',16828,'Bangalore.png','2024-12-14 09:49:34','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(8,'Chennai','Chennai, on the Bay of Bengal in eastern India, is the capital of the state of Tamil Nadu. The city is home to Fort St. George, built in 1644 and now a museum showcasing the city?s roots as a British military garrison and East India Company trading outpost.',17350,'Chennai.png','2024-12-14 09:49:39','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active'),(9,'Kolkata','Kolkata (formerly Calcutta) is the capital of India?s West Bengal state. Founded as an East India Company trading post, it was India?s capital under the British Raj from 1773?1911. Today it?s known for its grand colonial architecture, art galleries, and cultural festivals.',14400,'Kolkata.png','2024-12-14 09:49:43','W2_87386_Asad','2024-12-23 13:47:27','W2_87386_Asad','active');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`W2_87386_Asad`@`localhost`*/ /*!50003 TRIGGER `before_insert_into_packages` BEFORE INSERT ON `packages` FOR EACH ROW BEGIN
    SET NEW.created_by = SUBSTRING_INDEX(user(), '@', 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`W2_87386_Asad`@`localhost`*/ /*!50003 TRIGGER `after_insert_into_packages` BEFORE UPDATE ON `packages` FOR EACH ROW BEGIN
    SET NEW.modified_by =SUBSTRING_INDEX(user(), '@', 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `personal_details`
--

DROP TABLE IF EXISTS `personal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_details` (
  `user_pid` int NOT NULL DEFAULT '0',
  `mobile_no` varchar(20) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` char(10) DEFAULT NULL,
  `marital_status` char(10) DEFAULT NULL,
  `aadhar_no` varchar(20) NOT NULL,
  `user_id` int DEFAULT NULL,
  `passport_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_details`
--

LOCK TABLES `personal_details` WRITE;
/*!40000 ALTER TABLE `personal_details` DISABLE KEYS */;
INSERT INTO `personal_details` VALUES (1,'8652336784','asad.png','2002-08-20','male','married','1234 5432 7654',1,NULL),(4,'8652336777','sohel.png','2002-08-01','male','unmarried','0987 7890 7654',4,NULL),(5,'8652336888','yash.png','2002-04-10','other','divorced','0007 7990 7094',5,NULL);
/*!40000 ALTER TABLE `personal_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_history`
--

DROP TABLE IF EXISTS `travel_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_history` (
  `travel_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `booking_id` int DEFAULT NULL,
  `payment` double DEFAULT NULL,
  `Travel_from` varchar(255) DEFAULT NULL,
  `Travel_to` varchar(255) DEFAULT NULL,
  `Feedback` text,
  PRIMARY KEY (`travel_id`),
  KEY `user_id` (`user_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `travel_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `travel_history_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `booking_details` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_history`
--

LOCK TABLES `travel_history` WRITE;
/*!40000 ALTER TABLE `travel_history` DISABLE KEYS */;
INSERT INTO `travel_history` VALUES (2,1,4,20728,'mumbai','delhi','mast');
/*!40000 ALTER TABLE `travel_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `gmail` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` char(10) DEFAULT 'User',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(50) DEFAULT NULL,
  `status` char(10) DEFAULT 'active',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `gmail` (`gmail`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asad@g.c','asad','sayyad','asad123','User','2024-12-12 10:11:13',NULL,'2024-12-12 10:11:13',NULL,'active'),(4,'sohel@g.c','sohel','momin','sohel786','User','2024-12-12 10:13:48','W2_87386_Asad','2024-12-12 10:14:55','W2_87386_Asad','active'),(5,'yash@g.c','yash','nagtode','yash111','User','2024-12-12 10:19:31','W2_87386_Asad','2024-12-12 10:19:31',NULL,'active');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`W2_87386_Asad`@`localhost`*/ /*!50003 TRIGGER `before_insert_into_user` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    SET NEW.created_by = SUBSTRING_INDEX(user(), '@', 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`W2_87386_Asad`@`localhost`*/ /*!50003 TRIGGER `after_insert_into_user` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    SET NEW.modified_by =SUBSTRING_INDEX(user(), '@', 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `unique_no` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `pkg_id` int DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `unique_no` (`unique_no`),
  KEY `pkg_id` (`pkg_id`),
  CONSTRAINT `pkg_id` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`pkg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'F13579','Boeing 747','airplane',7700.00,1),(2,'G24680','Airbus A380','airplane',7900.00,3),(3,'H11223','Embraer E190','airplane',7200.00,4),(5,'J55667','Boeing 787','airplane',7600.00,5),(6,'K77889','Airbus A350','airplane',8000.00,6),(7,'L99001','Bombardier Q400','airplane',7100.00,7),(8,'Mh43gt6768','swift','car',400.00,1),(9,'Mh02gt8523','neeta travels','bus',300.00,7),(10,'Mh22gt6768','shivneri','bus',350.00,8),(11,'Mh22gt1234','swift','car',358.00,3),(12,'Mh22gt9101','eeco','car',288.00,4),(13,'Mh22gt1121','eeco','car',178.00,5),(14,'Mh22gt3141','wagonr','car',128.00,6),(15,'T12345','Rajdhani Express','Train',1000.00,7),(16,'T67890','Shatabdi Express','Train',1200.00,8),(17,'T54321','Duronto Express','Train',1100.00,9),(18,'T98765','Garib Rath Express','Train',800.00,6),(19,'T24680','Tejas Express','Train',900.00,4),(20,'T13579','Maharaja Express','Train',1200.00,5),(21,'T24681','Vande Bharat Express','Train',700.00,1),(22,'M11223','Intercity Express','Train',1000.00,3),(26,'Mh22gt3142','wagonr','car',128.00,7),(34,'K77890','Airbus A350','Airplane',8000.00,8),(35,'L99003','Boeing 777','Airplane',7800.00,9),(41,'Mh22gt3149','Mini Bus','Bus',500.00,9);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `Wishlist_Id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pkg_id` int DEFAULT NULL,
  PRIMARY KEY (`Wishlist_Id`),
  KEY `user_id` (`user_id`),
  KEY `pkg_id` (`pkg_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`pkg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,4,1),(2,1,3),(3,5,4),(4,1,1);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-27 14:47:28
