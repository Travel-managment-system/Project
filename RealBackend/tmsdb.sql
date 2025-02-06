-- MySQL dump 10.13  Distrib 8.4.2, for Win64 (x86_64)
--
-- Host: localhost    Database: travent
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
  `booking_date` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_details`
--

LOCK TABLES `booking_details` WRITE;
/*!40000 ALTER TABLE `booking_details` DISABLE KEYS */;
INSERT INTO `booking_details` VALUES (1,4,5,3,'2025-02-02','2025-03-01',18179,'yes','2025-01-15'),(2,5,9,4,'2025-03-12','2025-04-12',14400,'yes','2025-03-01'),(4,1,6,1,'2024-08-20','2024-08-30',16728,'yes','2024-08-15');
/*!40000 ALTER TABLE `booking_details` ENABLE KEYS */;
UNLOCK TABLES;

--wishlist
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) DEFAULT NULL,
  `city_desc` text,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Mumbai','Mumbai, the capital city of the Indian state of Maharashtra, is one of the most populous and metropolitan cities in India.'),(2,'Delhi','Delhi, the capital territory of India, is a massive metropolitan area in the country\'s north.'),(3,'Bangalore','Bangalore (Bengaluru), the capital of India\'s southern Karnataka state, is the center of India\'s high-tech industry.'),(4,'Hyderabad','Hyderabad is the capital of southern India\'s Telangana state and known for its technology industry.'),(5,'Ahmedabad','Ahmedabad, in western India, is the largest city in the state of Gujarat and is known for its cotton textiles.'),(6,'Chennai','Chennai (Madras), on the Bay of Bengal in eastern India, is the capital of the state of Tamil Nadu.'),(7,'Kolkata','Kolkata (Calcutta), the capital of India\'s West Bengal state, was founded as an East India Company trading post.'),(8,'Pune','Pune, a city in the western Indian state of Maharashtra, is known for its educational institutions and vibrant culture.'),(9,'Jaipur','Jaipur, the capital of India\'s Rajasthan state, is known as the Pink City due to the distinct color of its buildings.'),(10,'Lucknow','Lucknow, the capital of Uttar Pradesh, is known for its beautiful gardens, historical monuments, and rich culture.'),(11,'Kanpur','Kanpur, a city in Uttar Pradesh, is one of the largest industrial cities in India.'),(12,'Nagpur','Nagpur, in the central part of India, is known for its oranges and as the winter capital of Maharashtra.'),(13,'Indore','Indore, in western India, is the largest city in the state of Madhya Pradesh and is known for its food and cultural heritage.'),(14,'Thane','Thane, a city in Maharashtra, is located near Mumbai and is known for its lakes and vibrant lifestyle.'),(15,'Bhopal','Bhopal, the capital of Madhya Pradesh, is known for its natural beauty and historical monuments.'),(16,'Visakhapatnam','Visakhapatnam, in Andhra Pradesh, is a port city known for its beaches, shipbuilding industry, and natural harbor.'),(17,'Pimpri-Chinchwad','Pimpri-Chinchwad is an extended city near Pune and is known for its industrial development.'),(18,'Patna','Patna, the capital of Bihar, is one of the oldest continuously inhabited places in the world and has a rich historical and cultural heritage.'),(19,'Vadodara','Vadodara (Baroda), in Gujarat, is known for its architectural wonders and vibrant cultural scene.'),(20,'Ghaziabad','Ghaziabad, a city in Uttar Pradesh, is part of the Delhi NCR and is a major industrial and commercial center.'),(21,'Ludhiana','Ludhiana, in Punjab, is known for its textile industry and vibrant cultural life.'),(22,'Agra','Agra, in Uttar Pradesh, is home to the iconic Taj Mahal and is a major tourist destination.'),(23,'Nashik','Nashik, in Maharashtra, is known for its vineyards, temples, and as a major pilgrimage site.'),(24,'Faridabad','Faridabad, a city in Haryana, is a major industrial hub and part of the Delhi NCR.'),(25,'Meerut','Meerut, in Uttar Pradesh, is known for its historical significance and thriving sports goods industry.'),(26,'Rajkot','Rajkot, in Gujarat, is known for its jewelry market, handicrafts, and as a major industrial center.'),(27,'Kalyan-Dombivli','Kalyan-Dombivli, in Maharashtra, is a twin city near Mumbai known for its residential and commercial development.'),(28,'Vasai-Virar','Vasai-Virar, in Maharashtra, is a rapidly growing city known for its residential and industrial development.'),(29,'Varanasi','Varanasi (Benares), in Uttar Pradesh, is one of the oldest living cities in the world and a major cultural and religious center.'),(30,'Srinagar','Srinagar, in Jammu and Kashmir, is known for its beautiful gardens, lakes, and houseboats.');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `cost` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` char(10) DEFAULT 'active',
  `reviews` text,
  `city_id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `hotels_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,5000,'hotel_mumbai_deluxe.jpg','active','Great stay with wonderful facilities.',1,'Hotel Mumbai Deluxe'),(2,4500,'sea_view_residency.jpg','active','Amazing sea view and excellent service.',1,'Sea View Residency'),(3,6000,'luxury_stay.jpg','active','Luxurious experience, highly recommended.',1,'Luxury Stay'),(4,3000,'comfort_inn.jpg','active','Affordable and comfortable stay.',1,'Comfort Inn'),(5,4000,'city_center_hotel.jpg','active','Convenient location, good amenities.',1,'City Center Hotel'),(6,5000,'delhi_grand_hotel.jpg','active','Excellent hotel with great service.',2,'Delhi Grand Hotel'),(7,4500,'capital_residency.jpg','active','Clean and comfortable rooms.',2,'Capital Residency'),(8,6000,'royal_inn.jpg','active','Royal experience with top-notch facilities.',2,'Royal Inn'),(9,3000,'comfort_stay.jpg','active','Budget-friendly and cozy.',2,'Comfort Stay'),(10,4000,'metro_hotel.jpg','active','Good location and friendly staff.',2,'Metro Hotel'),(11,5000,'bangalore_palace_hotel.jpg','active','Beautiful hotel with palace-like ambiance.',3,'Bangalore Palace Hotel'),(12,4500,'tech_city_residency.jpg','active','Modern amenities and great service.',3,'Tech City Residency'),(13,6000,'silicon_valley_inn.jpg','active','Excellent business hotel.',3,'Silicon Valley Inn'),(14,3000,'garden_city_hotel.jpg','active','Peaceful and affordable stay.',3,'Garden City Hotel'),(15,4000,'green_park_residency.jpg','active','Lovely surroundings and good service.',3,'Green Park Residency'),(16,5000,'hyderabad_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',4,'Hyderabad Heritage Hotel'),(17,4500,'charminar_residency.jpg','active','Convenient location near Charminar.',4,'Charminar Residency'),(18,6000,'pearl_city_inn.jpg','active','Luxurious stay in the heart of the city.',4,'Pearl City Inn'),(19,3000,'nizam_palace_hotel.jpg','active','Affordable and clean.',4,'Nizam Palace Hotel'),(20,4000,'golconda_hotel.jpg','active','Great service and amenities.',4,'Golconda Hotel'),(21,5000,'ahmedabad_royal_hotel.jpg','active','Royal experience in the city.',5,'Ahmedabad Royal Hotel'),(22,4500,'gandhi_ashram_residency.jpg','active','Peaceful stay near Gandhi Ashram.',5,'Gandhi Ashram Residency'),(23,6000,'textile_city_inn.jpg','active','Luxurious hotel with great facilities.',5,'Textile City Inn'),(24,3000,'sabarmati_view_hotel.jpg','active','Affordable and comfortable.',5,'Sabarmati View Hotel'),(25,4000,'heritage_residency.jpg','active','Great service and heritage feel.',5,'Heritage Residency'),(26,5000,'chennai_beachside_hotel.jpg','active','Beachside hotel with stunning views.',6,'Chennai Beachside Hotel'),(27,4500,'marina_residency.jpg','active','Comfortable stay near Marina Beach.',6,'Marina Residency'),(28,6000,'temple_city_inn.jpg','active','Luxurious stay in the city.',6,'Temple City Inn'),(29,3000,'southern_comfort_hotel.jpg','active','Affordable and clean rooms.',6,'Southern Comfort Hotel'),(30,4000,'fort_city_residency.jpg','active','Good service and convenient location.',6,'Fort City Residency'),(31,5000,'kolkata_heritage_hotel.jpg','active','Heritage hotel with modern amenities.',7,'Kolkata Heritage Hotel'),(32,4500,'howrah_residency.jpg','active','Convenient location near Howrah Bridge.',7,'Howrah Residency'),(33,6000,'victoria_memorial_inn.jpg','active','Luxurious stay near Victoria Memorial.',7,'Victoria Memorial Inn'),(34,3000,'ganges_view_hotel.jpg','active','Affordable and comfortable.',7,'Ganges View Hotel'),(35,4000,'bengal_palace_hotel.jpg','active','Great service and beautiful surroundings.',7,'Bengal Palace Hotel'),(36,5000,'pune_city_hotel.jpg','active','Excellent hotel in the city center.',8,'Pune City Hotel'),(37,4500,'shaniwar_residency.jpg','active','Comfortable stay near Shaniwar Wada.',8,'Shaniwar Residency'),(38,6000,'deccan_inn.jpg','active','Luxurious experience with great facilities.',8,'Deccan Inn'),(39,3000,'aga_khan_palace_hotel.jpg','active','Affordable and clean rooms.',8,'Aga Khan Palace Hotel'),(40,4000,'sinhagad_view_hotel.jpg','active','Beautiful views and good service.',8,'Sinhagad View Hotel'),(41,5000,'jaipur_palace_hotel.jpg','active','Palace hotel with luxurious amenities.',9,'Jaipur Palace Hotel'),(42,4500,'pink_city_residency.jpg','active','Comfortable stay in the Pink City.',9,'Pink City Residency'),(43,6000,'amber_fort_inn.jpg','active','Luxurious stay near Amber Fort.',9,'Amber Fort Inn'),(44,3000,'hawa_mahal_hotel.jpg','active','Affordable and clean rooms.',9,'Hawa Mahal Hotel'),(45,4000,'rajputana_residency.jpg','active','Great service and beautiful surroundings.',9,'Rajputana Residency'),(46,5000,'lucknow_royal_hotel.jpg','active','Royal hotel with excellent service.',10,'Lucknow Royal Hotel'),(47,4500,'bara_imambara_residency.jpg','active','Comfortable stay near Bara Imambara.',10,'Bara Imambara Residency'),(48,6000,'rumi_darwaza_inn.jpg','active','Luxurious stay near Rumi Darwaza.',10,'Rumi Darwaza Inn'),(49,3000,'nawabi_comfort_hotel.jpg','active','Affordable and clean rooms.',10,'Nawabi Comfort Hotel'),(50,4000,'gomti_view_hotel.jpg','active','Great service and beautiful views.',10,'Gomti View Hotel'),(51,4500,'kanpur_grand_hotel.jpg','active','Great stay with excellent service.',11,'Kanpur Grand Hotel'),(52,4000,'green_park_residency.jpg','active','Lovely hotel with great amenities.',11,'Green Park Residency'),(53,3500,'river_view_inn.jpg','active','Peaceful stay with beautiful views.',11,'River View Inn'),(54,3000,'kanpur_comfort_hotel.jpg','active','Affordable and comfortable.',11,'Kanpur Comfort Hotel'),(55,5000,'city_palace_hotel.jpg','active','Luxurious experience in the heart of Kanpur.',11,'City Palace Hotel'),(56,4500,'nagpur_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',12,'Nagpur Heritage Hotel'),(57,4000,'orange_city_residency.jpg','active','Comfortable stay with great amenities.',12,'Orange City Residency'),(58,3500,'futala_lake_inn.jpg','active','Beautiful views and peaceful surroundings.',12,'Futala Lake Inn'),(59,3000,'nagpur_comfort_hotel.jpg','active','Affordable and clean rooms.',12,'Nagpur Comfort Hotel'),(60,5000,'deekshabhoomi_palace_hotel.jpg','active','Luxurious stay near Deekshabhoomi.',12,'Deekshabhoomi Palace Hotel'),(61,4500,'indore_palace_hotel.jpg','active','Palace-like ambiance with excellent service.',13,'Indore Palace Hotel'),(62,4000,'rajwada_residency.jpg','active','Comfortable stay near Rajwada Palace.',13,'Rajwada Residency'),(63,3500,'patalpani_view_hotel.jpg','active','Beautiful views and peaceful surroundings.',13,'Patalpani View Hotel'),(64,3000,'indore_comfort_hotel.jpg','active','Affordable and cozy.',13,'Indore Comfort Hotel'),(65,5000,'lal_bagh_palace_inn.jpg','active','Luxurious stay near Lal Bagh Palace.',13,'Lal Bagh Palace Inn'),(66,4500,'thane_grand_hotel.jpg','active','Great stay with excellent service.',14,'Thane Grand Hotel'),(67,4000,'upvan_residency.jpg','active','Lovely hotel with great amenities.',14,'Upvan Residency'),(68,3500,'yeoor_hills_inn.jpg','active','Peaceful stay with beautiful views.',14,'Yeoor Hills Inn'),(69,3000,'thane_comfort_hotel.jpg','active','Affordable and comfortable.',14,'Thane Comfort Hotel'),(70,5000,'city_center_hotel.jpg','active','Luxurious experience in the heart of Thane.',14,'City Center Hotel'),(71,4500,'bhopal_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',15,'Bhopal Heritage Hotel'),(72,4000,'upper_lake_residency.jpg','active','Comfortable stay with great amenities.',15,'Upper Lake Residency'),(73,3500,'van_vihar_inn.jpg','active','Beautiful views and peaceful surroundings.',15,'Van Vihar Inn'),(74,3000,'bhopal_comfort_hotel.jpg','active','Affordable and clean rooms.',15,'Bhopal Comfort Hotel'),(75,5000,'taj_ul_masajid_palace_hotel.jpg','active','Luxurious stay near Taj-ul-Masajid.',15,'Taj-ul-Masajid Palace Hotel'),(76,4500,'vizag_beachside_hotel.jpg','active','Great stay with stunning views.',16,'Vizag Beachside Hotel'),(77,4000,'ramakrishna_residency.jpg','active','Comfortable stay with great amenities.',16,'Ramakrishna Residency'),(78,3500,'kailasagiri_inn.jpg','active','Beautiful views and peaceful surroundings.',16,'Kailasagiri Inn'),(79,3000,'vizag_comfort_hotel.jpg','active','Affordable and clean rooms.',16,'Vizag Comfort Hotel'),(80,5000,'araku_valley_palace_hotel.jpg','active','Luxurious stay near Araku Valley.',16,'Araku Valley Palace Hotel'),(81,4500,'pimpri_palace_hotel.jpg','active','Great stay with excellent service.',17,'Pimpri Palace Hotel'),(82,4000,'chinchwad_residency.jpg','active','Comfortable stay with great amenities.',17,'Chinchwad Residency'),(83,3500,'aga_khan_palace_inn.jpg','active','Beautiful views and peaceful surroundings.',17,'Aga Khan Palace Inn'),(84,3000,'pimpri_comfort_hotel.jpg','active','Affordable and comfortable.',17,'Pimpri Comfort Hotel'),(85,5000,'osho_ashram_palace_hotel.jpg','active','Luxurious stay near Osho Ashram.',17,'Osho Ashram Palace Hotel'),(86,4500,'patna_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',18,'Patna Heritage Hotel'),(87,4000,'patna_sahib_residency.jpg','active','Comfortable stay near Patna Sahib.',18,'Patna Sahib Residency'),(88,3500,'golghar_inn.jpg','active','Beautiful views and peaceful surroundings.',18,'Golghar Inn'),(89,3000,'patna_comfort_hotel.jpg','active','Affordable and clean rooms.',18,'Patna Comfort Hotel'),(90,5000,'buddha_smriti_palace_hotel.jpg','active','Luxurious stay near Buddha Smriti Park.',18,'Buddha Smriti Palace Hotel'),(91,4500,'vadodara_grand_hotel.jpg','active','Great stay with excellent service.',19,'Vadodara Grand Hotel'),(92,4000,'laxmi_vilas_residency.jpg','active','Lovely hotel with great amenities.',19,'Laxmi Vilas Residency'),(93,3500,'sayaji_baug_inn.jpg','active','Peaceful stay with beautiful views.',19,'Sayaji Baug Inn'),(94,3000,'vadodara_comfort_hotel.jpg','active','Affordable and comfortable.',19,'Vadodara Comfort Hotel'),(95,5000,'kirti_mandir_palace_hotel.jpg','active','Luxurious stay near Kirti Mandir.',19,'Kirti Mandir Palace Hotel'),(96,4500,'ghaziabad_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',20,'Ghaziabad Heritage Hotel'),(97,4000,'swaminarayan_residency.jpg','active','Comfortable stay near Swaminarayan Akshardham.',20,'Swaminarayan Residency'),(98,3500,'iskcon_inn.jpg','active','Beautiful views and peaceful surroundings.',20,'ISKCON Inn'),(99,3000,'ghaziabad_comfort_hotel.jpg','active','Affordable and clean rooms.',20,'Ghaziabad Comfort Hotel'),(100,5000,'city_forest_palace_hotel.jpg','active','Luxurious stay near City Forest.',20,'City Forest Palace Hotel'),(101,4500,'ludhiana_grand_hotel.jpg','active','Great stay with excellent service.',21,'Ludhiana Grand Hotel'),(102,4000,'rose_garden_residency.jpg','active','Beautiful surroundings and comfortable stay.',21,'Rose Garden Residency'),(103,3500,'pau_heritage_inn.jpg','active','Heritage hotel with modern comforts.',21,'PAU Heritage Inn'),(104,3000,'ludhiana_comfort_hotel.jpg','active','Affordable and cozy.',21,'Ludhiana Comfort Hotel'),(105,5000,'lodhi_fort_palace_hotel.jpg','active','Luxurious stay near Lodhi Fort.',21,'Lodhi Fort Palace Hotel'),(106,4500,'agra_royal_hotel.jpg','active','Royal experience with top-notch facilities.',22,'Agra Royal Hotel'),(107,4000,'taj_view_residency.jpg','active','Stunning views of the Taj Mahal.',22,'Taj View Residency'),(108,3500,'agra_fort_inn.jpg','active','Convenient location and great service.',22,'Agra Fort Inn'),(109,3000,'agra_comfort_hotel.jpg','active','Affordable and clean rooms.',22,'Agra Comfort Hotel'),(110,5000,'fatehpur_sikri_palace_hotel.jpg','active','Luxurious stay near Fatehpur Sikri.',22,'Fatehpur Sikri Palace Hotel'),(111,4500,'nashik_vineyard_hotel.jpg','active','Great stay with beautiful vineyard views.',23,'Nashik Vineyard Hotel'),(112,4000,'trimbakeshwar_residency.jpg','active','Peaceful stay near Trimbakeshwar Temple.',23,'Trimbakeshwar Residency'),(113,3500,'pandavleni_caves_inn.jpg','active','Heritage hotel with modern amenities.',23,'Pandavleni Caves Inn'),(114,3000,'nashik_comfort_hotel.jpg','active','Affordable and clean rooms.',23,'Nashik Comfort Hotel'),(115,5000,'muktidham_palace_hotel.jpg','active','Luxurious stay near Muktidham.',23,'Muktidham Palace Hotel'),(116,4500,'faridabad_grand_hotel.jpg','active','Great stay with excellent service.',24,'Faridabad Grand Hotel'),(117,4000,'surajkund_residency.jpg','active','Comfortable stay near Surajkund.',24,'Surajkund Residency'),(118,3500,'badkhal_lake_inn.jpg','active','Beautiful views and peaceful surroundings.',24,'Badkhal Lake Inn'),(119,3000,'faridabad_comfort_hotel.jpg','active','Affordable and clean rooms.',24,'Faridabad Comfort Hotel'),(120,5000,'raja_nahar_singh_palace_hotel.jpg','active','Luxurious stay near Raja Nahar Singh Palace.',24,'Raja Nahar Singh Palace Hotel'),(121,4500,'meerut_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',25,'Meerut Heritage Hotel'),(122,4000,'gandhi_bagh_residency.jpg','active','Comfortable stay with beautiful surroundings.',25,'Gandhi Bagh Residency'),(123,3500,'augarnath_temple_inn.jpg','active','Peaceful stay near Augarnath Temple.',25,'Augarnath Temple Inn'),(124,3000,'meerut_comfort_hotel.jpg','active','Affordable and cozy.',25,'Meerut Comfort Hotel'),(125,5000,'shahid_smarak_palace_hotel.jpg','active','Luxurious stay near Shahid Smarak.',25,'Shahid Smarak Palace Hotel'),(126,4500,'rajkot_grand_hotel.jpg','active','Great stay with excellent service.',26,'Rajkot Grand Hotel'),(127,4000,'rotary_dolls_residency.jpg','active','Comfortable stay with unique decor.',26,'Rotary Dolls Residency'),(128,3500,'watson_museum_inn.jpg','active','Heritage hotel with modern amenities.',26,'Watson Museum Inn'),(129,3000,'rajkot_comfort_hotel.jpg','active','Affordable and clean rooms.',26,'Rajkot Comfort Hotel'),(130,5000,'kaba_gandhi_no_delo_palace_hotel.jpg','active','Luxurious stay near Kaba Gandhi No Delo.',26,'Kaba Gandhi No Delo Palace Hotel'),(131,4500,'kalyan_grand_hotel.jpg','active','Great stay with excellent service.',27,'Kalyan Grand Hotel'),(132,4000,'kala_talao_residency.jpg','active','Comfortable stay with beautiful views.',27,'Kala Talao Residency'),(133,3500,'durgadi_fort_inn.jpg','active','Peaceful surroundings and great service.',27,'Durgadi Fort Inn'),(134,3000,'kalyan_comfort_hotel.jpg','active','Affordable and cozy.',27,'Kalyan Comfort Hotel'),(135,5000,'ganesh_ghat_palace_hotel.jpg','active','Luxurious stay near Ganesh Ghat.',27,'Ganesh Ghat Palace Hotel'),(136,4500,'vasai_grand_hotel.jpg','active','Great stay with excellent service.',28,'Vasai Grand Hotel'),(137,4000,'jivdani_residency.jpg','active','Comfortable stay near Jivdani Temple.',28,'Jivdani Residency'),(138,3500,'arnala_fort_inn.jpg','active','Beautiful views and peaceful surroundings.',28,'Arnala Fort Inn'),(139,3000,'vasai_comfort_hotel.jpg','active','Affordable and clean rooms.',28,'Vasai Comfort Hotel'),(140,5000,'vasai_fort_palace_hotel.jpg','active','Luxurious stay near Vasai Fort.',28,'Vasai Fort Palace Hotel'),(141,4500,'varanasi_heritage_hotel.jpg','active','Heritage hotel with modern comforts.',29,'Varanasi Heritage Hotel'),(142,4000,'kashi_vishwanath_residency.jpg','active','Comfortable stay near Kashi Vishwanath Temple.',29,'Kashi Vishwanath Residency'),(143,3500,'dashashwamedh_ghat_inn.jpg','active','Beautiful views and peaceful surroundings.',29,'Dashashwamedh Ghat Inn'),(144,3000,'varanasi_comfort_hotel.jpg','active','Affordable and cozy.',29,'Varanasi Comfort Hotel'),(145,5000,'sarnath_palace_hotel.jpg','active','Luxurious stay near Sarnath.',29,'Sarnath Palace Hotel'),(146,4500,'srinagar_grand_hotel.jpg','active','Great stay with excellent service.',30,'Srinagar Grand Hotel'),(147,4000,'dal_lake_residency.jpg','active','Comfortable stay with stunning lake views.',30,'Dal Lake Residency'),(148,3500,'shalimar_bagh_inn.jpg','active','Beautiful surroundings and great service.',30,'Shalimar Bagh Inn'),(149,3000,'srinagar_comfort_hotel.jpg','active','Affordable and cozy.',30,'Srinagar Comfort Hotel'),(150,5000,'shankaracharya_palace_hotel.jpg','active','Luxurious stay near Shankaracharya Temple.',30,'Shankaracharya Palace Hotel');
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
  `description` text,
  `total_cost` decimal(10,0) DEFAULT '0',
  `status` char(10) DEFAULT 'active',
  `city_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL,
  `place_id` int DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`pkg_id`),
  KEY `fk_vehicle_id` (`vehicle_id`),
  KEY `fk_place_id` (`place_id`),
  KEY `fk_city_id` (`city_id`),
  KEY `fk_hotel_id` (`hotel_id`),
  CONSTRAINT `fk_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `fk_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`),
  CONSTRAINT `fk_place_id` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`),
  CONSTRAINT `fk_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_details`
--

DROP TABLE IF EXISTS `personal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_details` (
  `user_pid` int NOT NULL AUTO_INCREMENT,
  `mobile_no` varchar(20) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` char(10) DEFAULT NULL,
  `marital_status` char(10) DEFAULT NULL,
  `aadhar_no` varchar(20) NOT NULL,
  `user_id` int DEFAULT NULL,
  `passport_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_pid`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_details`
--

LOCK TABLES `personal_details` WRITE;
/*!40000 ALTER TABLE `personal_details` DISABLE KEYS */;
INSERT INTO `personal_details` VALUES (1,'8652336784','asad.png','2002-08-20','male','married','1234 5432 7654',1,NULL),(4,'8652336777','sohel.png','2002-08-01','male','unmarried','0987 7890 7654',4,NULL),(5,'8652336888','yash.png','2002-04-10','other','divorced','0007 7990 7094',5,NULL),(6,'9876543210','profile_pic_9.jpg','2025-02-17','M','Divorced','123456789012',9,'A1234567'),(7,'9876543211','profile_pic_10.jpg','1991-02-01','F','Married','123456789013',10,'A1234568'),(8,'123','profile_pic_11.jpg','2024-10-10','M','other','123456789014',11,'A1234569'),(9,'9876543213','profile_pic_12.jpg','1993-04-01','F','Married','123456789015',12,'A1234570'),(10,'9876543214','profile_pic_13.jpg','1994-05-01','M','Single','123456789016',13,'A1234571'),(11,'9876543215','profile_pic_14.jpg','1995-06-01','F','Married','123456789017',14,'A1234572'),(12,'9876543216','profile_pic_15.jpg','1996-07-01','M','Single','123456789018',15,'A1234573'),(13,'9876543217','profile_pic_16.jpg','1997-08-01','F','Married','123456789019',16,'A1234574'),(14,'9876543218','profile_pic_21.jpg','1998-09-01','M','Single','123456789020',21,'A1234575'),(15,'9876543219','profile_pic_22.jpg','1999-10-01','F','Married','123456789021',22,'A1234576'),(16,'123123','profile_pic_23.jpg','2024-10-10','M','single','123456789022',23,'A1234577'),(17,'9876543221','profile_pic_24.jpg','2001-12-01','F','Married','123456789023',24,'A1234578'),(18,'9876543222','profile_pic_25.jpg','2002-01-01','M','Single','123456789024',25,'A1234579'),(19,'9876543223','profile_pic_26.jpg','2003-02-01','F','Married','123456789025',26,'A1234580'),(20,'9876543224','profile_pic_27.jpg','2004-03-01','M','Single','123456789026',27,'A1234581'),(21,'9876543225','profile_pic_28.jpg','2005-04-01','F','Married','123456789027',28,'A1234582'),(22,'9876543226','profile_pic_29.jpg','2006-05-01','M','Single','123456789028',29,'A1234583');
/*!40000 ALTER TABLE `personal_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `place_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `place_desc` text,
  `image` varchar(50) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  PRIMARY KEY (`place_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `place_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'Gateway of India','A grand monument built during the 20th century in Mumbai.','gateway_of_india.jpg',1),(2,'Marine Drive','A 3.6 km long boulevard in South Mumbai.','marine_drive.jpg',1),(3,'Chhatrapati Shivaji Terminus','A historic railway station and UNESCO World Heritage Site.','cst.jpg',1),(4,'Haji Ali Dargah','A mosque and tomb located on an islet in Mumbai.','haji_ali.jpg',1),(5,'Elephanta Caves','A network of sculpted caves located on Elephanta Island.','elephanta_caves.jpg',1),(6,'Red Fort','A historic fort in the city of Delhi.','red_fort.jpg',2),(7,'Qutub Minar','A UNESCO World Heritage Site in Delhi.','qutub_minar.jpg',2),(8,'India Gate','A war memorial located astride the Rajpath.','india_gate.jpg',2),(9,'Humayun\'s Tomb','The tomb of the Mughal Emperor Humayun.','humayuns_tomb.jpg',2),(10,'Lotus Temple','A Bahá\'í House of Worship notable for its flowerlike shape.','lotus_temple.jpg',2),(11,'Bangalore Palace','A royal palace in Bengaluru.','bangalore_palace.jpg',3),(12,'Lalbagh Botanical Garden','A botanical garden in Bengaluru.','lalbagh.jpg',3),(13,'Cubbon Park','A major park in Bengaluru.','cubbon_park.jpg',3),(14,'Bannerghatta National Park','A national park with a zoo, pet corner, and butterfly park.','bannerghatta.jpg',3),(15,'ISKCON Temple Bangalore','A prominent temple dedicated to Krishna.','iskcon_bangalore.jpg',3),(16,'Charminar','A monument and mosque in Hyderabad.','charminar.jpg',4),(17,'Golconda Fort','A citadel and fort in Hyderabad.','golconda_fort.jpg',4),(18,'Ramoji Film City','A film studio complex in Hyderabad.','ramoji_film_city.jpg',4),(19,'Hussain Sagar','A heart-shaped lake in Hyderabad.','hussain_sagar.jpg',4),(20,'Birla Mandir','A Hindu temple built on a 280 feet high hillock.','birla_mandir.jpg',4),(21,'Sabarmati Ashram','A peaceful ashram in Ahmedabad.','sabarmati_ashram.jpg',5),(22,'Kankaria Lake','The second largest lake in Ahmedabad.','kankaria_lake.jpg',5),(23,'Adalaj Stepwell','A stepwell located in the village of Adalaj.','adalaj_stepwell.jpg',5),(24,'Akshardham Temple','A large Hindu temple complex.','akshardham_ahmedabad.jpg',5),(25,'Sardar Vallabhbhai Patel National Memorial','A museum dedicated to Sardar Vallabhbhai Patel.','patel_memorial.jpg',5),(26,'Marina Beach','A natural urban beach in Chennai.','marina_beach.jpg',6),(27,'Kapaleeshwarar Temple','A Hindu temple in Chennai.','kapaleeshwarar_temple.jpg',6),(28,'Fort St. George','A fortress and the first English fortress in India.','fort_st_george.jpg',6),(29,'Valluvar Kottam','A monument in Chennai.','valluvar_kottam.jpg',6),(30,'Santhome Basilica','A Roman Catholic minor basilica in Chennai.','santhome_basilica.jpg',6),(31,'Victoria Memorial','A large marble building in Kolkata.','victoria_memorial.jpg',7),(32,'Howrah Bridge','A cantilever bridge over the Hooghly River in Kolkata.','howrah_bridge.jpg',7),(33,'Indian Museum','The largest and oldest museum in India.','indian_museum.jpg',7),(34,'Belur Math','The headquarters of the Ramakrishna Math and Mission.','belur_math.jpg',7),(35,'Dakshineswar Kali Temple','A Hindu temple located in Dakshineswar.','dakshineswar_temple.jpg',7),(36,'Shaniwar Wada','A historic fortification in Pune.','shaniwar_wada.jpg',8),(37,'Aga Khan Palace','A palace in Pune.','aga_khan_palace.jpg',8),(38,'Sinhagad Fort','A hill fortress located near Pune.','sinhagad_fort.jpg',8),(39,'Pataleshwar Cave Temple','A rock-cut cave temple dedicated to Shiva.','pataleshwar_temple.jpg',8),(40,'Rajiv Gandhi Zoological Park','A zoo located in Pune.','rajiv_gandhi_zoo.jpg',8),(41,'Hawa Mahal','A palace in Jaipur.','hawa_mahal.jpg',9),(42,'Amber Fort','A fort located in Amer, Jaipur.','amber_fort.jpg',9),(43,'City Palace','A complex of palaces in Jaipur.','city_palace_jaipur.jpg',9),(44,'Jantar Mantar','A collection of architectural astronomical instruments.','jantar_mantar_jaipur.jpg',9),(45,'Nahargarh Fort','A fort overlooking Jaipur.','nahargarh_fort.jpg',9),(46,'Bara Imambara','An imambara complex in Lucknow.','bara_imambara.jpg',10),(47,'Rumi Darwaza','An imposing gateway in Lucknow.','rumi_darwaza.jpg',10),(48,'Chota Imambara','An imambara built by Nawab of Awadh.','chota_imambara.jpg',10),(49,'Lucknow Zoo','A zoological garden in Lucknow.','lucknow_zoo.jpg',10),(50,'Dr. Ambedkar Memorial Park','A memorial park dedicated to B. R. Ambedkar.','ambedkar_park.jpg',10),(51,'JK Temple','A Hindu temple in Kanpur.','jk_temple.jpg',11),(52,'Allen Forest Zoo','A zoological garden in Kanpur.','allen_forest_zoo.jpg',11),(53,'Moti Jheel','A lake and reservoir in Kanpur.','moti_jheel.jpg',11),(54,'Nana Rao Park','A public city park in Kanpur.','nana_rao_park.jpg',11),(55,'Green Park Stadium','A cricket ground in Kanpur.','green_park_stadium.jpg',11),(56,'Deekshabhoomi','A sacred monument in Nagpur.','deekshabhoomi.jpg',12),(57,'Futala Lake','A lake in Nagpur.','futala_lake.jpg',12),(58,'Sitabuldi Fort','A fort in Nagpur.','sitabuldi_fort.jpg',12),(59,'Ambazari Lake','A lake and garden in Nagpur.','ambazari_lake.jpg',12),(60,'Raman Science Centre','A science centre and planetarium.','raman_science_centre.jpg',12),(61,'Rajwada Palace','A historical palace in Indore.','rajwada_palace.jpg',13),(62,'Lal Bagh Palace','A palace in Indore.','lal_bagh_palace.jpg',13),(63,'Patalpani Waterfall','A waterfall near Indore.','patalpani_waterfall.jpg',13),(64,'Annapurna Temple','A temple in Indore.','annapurna_temple.jpg',13),(65,'Khajrana Ganesh Temple','A temple dedicated to Lord Ganesha.','khajrana_temple.jpg',13),(66,'Upvan Lake','A lake in Thane.','upvan_lake.jpg',14),(67,'Kopineshwar Mandir','A temple in Thane.','kopineshwar_mandir.jpg',14),(68,'Yeoor Hills','A hill located in Thane.','yeoor_hills.jpg',14),(69,'Talao Pali Lake','A lake in Thane.','talao_pali.jpg',14),(70,'Ghodbunder Fort','A fort in Thane.','ghodbunder_fort.jpg',14),(71,'Upper Lake','A large lake in Bhopal.','upper_lake.jpg',15),(72,'Taj-ul-Masajid','One of the largest mosques in India, located in Bhopal.','taj_ul_masajid.jpg',15),(73,'Van Vihar National Park','A national park in Bhopal.','van_vihar.jpg',15),(74,'Bhojpur Temple','A temple in Bhojpur near Bhopal.','bhojpur_temple.jpg',15),(75,'Bhimbetka','A UNESCO World Heritage Site known for its rock shelters.','bhimbetka.jpg',15),(76,'Ramakrishna Beach','A popular beach in Visakhapatnam.','ramakrishna_beach.jpg',16),(77,'Kailasagiri','A hilltop park in Visakhapatnam.','kailasagiri.jpg',16),(78,'Araku Valley','A beautiful valley near Visakhapatnam.','araku_valley.jpg',16),(79,'Simhachalam Temple','A Hindu temple in Visakhapatnam.','simhachalam_temple.jpg',16),(80,'Indira Gandhi Zoological Park','A zoo in Visakhapatnam.','indira_gandhi_zoo.jpg',16),(81,'Aga Khan Palace','A palace near Pune, known for its historical significance.','aga_khan_palace.jpg',17),(82,'Osho Ashram','A spiritual retreat in Pune.','osho_ashram.jpg',17),(83,'Shaniwar Wada','A historic fortification in Pune.','shaniwar_wada.jpg',17),(84,'Sinhagad Fort','A hill fortress located near Pune.','sinhagad_fort.jpg',17),(85,'Pataleshwar Cave Temple','A rock-cut cave temple dedicated to Shiva.','pataleshwar_temple.jpg',17),(86,'Patna Sahib Gurudwara','A Sikh temple in Patna.','patna_sahib_gurudwara.jpg',18),(87,'Golghar','A granary in Patna.','golghar.jpg',18),(88,'Patna Museum','A state museum in Patna.','patna_museum.jpg',18),(89,'Sanjay Gandhi Biological Park','A zoological park in Patna.','sanjay_gandhi_bio_park.jpg',18),(90,'Buddha Smriti Park','A park in Patna dedicated to Lord Buddha.','buddha_smriti_park.jpg',18),(91,'Laxmi Vilas Palace','A royal palace in Vadodara.','laxmi_vilas_palace.jpg',19),(92,'Sayaji Baug','A large garden in Vadodara.','sayaji_baug.jpg',19),(93,'EME Temple','A unique temple in Vadodara.','eme_temple.jpg',19),(94,'Baroda Museum and Picture Gallery','A museum in Vadodara.','baroda_museum.jpg',19),(95,'Kirti Mandir','A temple in Vadodara.','kirti_mandir.jpg',19),(96,'Swaminarayan Akshardham','A large Hindu temple complex in Ghaziabad.','swaminarayan_akshardham.jpg',20),(97,'ISKCON Ghaziabad','A temple dedicated to Krishna.','iskcon_ghaziabad.jpg',20),(98,'Drizzling Land Water and Amusement Park','A water park in Ghaziabad.','drizzling_land.jpg',20),(99,'City Forest','A forest and recreational area in Ghaziabad.','city_forest.jpg',20),(100,'Hindon Eco Park','An eco park in Ghaziabad.','hindon_eco_park.jpg',20),(101,'Nehru Rose Garden','A garden in Ludhiana.','nehru_rose_garden.jpg',21),(102,'Punjab Agricultural University Museum','A museum in Ludhiana.','pau_museum.jpg',21),(103,'Lodhi Fort','A fort in Ludhiana.','lodhi_fort.jpg',21),(104,'Phillaur Fort','A fort in Phillaur, Ludhiana.','phillaur_fort.jpg',21),(105,'Tiger Safari','A zoo and safari in Ludhiana.','tiger_safari.jpg',21),(106,'Taj Mahal','An ivory-white marble mausoleum in Agra.','taj_mahal.jpg',22),(107,'Agra Fort','A historical fort in Agra.','agra_fort.jpg',22),(108,'Fatehpur Sikri','A small city in Agra known for its historic buildings.','fatehpur_sikri.jpg',22),(109,'Mehtab Bagh','A garden complex in Agra.','mehtab_bagh.jpg',22),(110,'Itimad-ud-Daulah\'s Tomb','A Mughal mausoleum in Agra.','itimad_ud_daulah.jpg',22),(111,'Sula Vineyards','A vineyard and winery in Nashik.','sula_vineyards.jpg',23),(112,'Trimbakeshwar Temple','An ancient Hindu temple in Nashik.','trimbakeshwar_temple.jpg',23),(113,'Panchavati','A pilgrimage site in Nashik.','panchavati.jpg',23),(114,'Pandavleni Caves','Ancient rock-cut caves in Nashik.','pandavleni_caves.jpg',23),(115,'Muktidham','A marble temple complex in Nashik.','muktidham.jpg',23),(116,'Raja Nahar Singh Palace','A historical palace in Faridabad.','raja_nahar_singh_palace.jpg',24),(117,'Surajkund','A reservoir of the 10th century in Faridabad.','surajkund.jpg',24),(118,'Badkhal Lake','A lake in Faridabad.','badkhal_lake.jpg',24),(119,'Town Park','A park in Faridabad.','town_park.jpg',24),(120,'ISKCON Faridabad','A temple dedicated to Krishna.','iskcon_faridabad.jpg',24),(121,'Hastinapur Wildlife Sanctuary','A wildlife sanctuary in Meerut.','hastinapur_wildlife_sanctuary.jpg',25),(122,'Gandhi Bagh','A park in Meerut.','gandhi_bagh.jpg',25),(123,'Augarnath Temple','A temple in Meerut.','augarnath_temple.jpg',25),(124,'Shahid Smarak','A war memorial in Meerut.','shahid_smarak.jpg',25),(125,'Suraj Kund','A historic reservoir in Meerut.','suraj_kund.jpg',25),(126,'Rotary Dolls Museum','A museum in Rajkot.','rotary_dolls_museum.jpg',26),(127,'Watson Museum','A museum in Rajkot.','watson_museum.jpg',26),(128,'Kaba Gandhi No Delo','The childhood home of Mahatma Gandhi.','kaba_gandhi_no_delo.jpg',26),(129,'Pradyuman Park','A zoo in Rajkot.','pradyuman_park.jpg',26),(130,'Jagat Mandir','A temple in Rajkot.','jagat_mandir.jpg',26),(131,'Kala Talao Lake','A lake in Kalyan-Dombivli.','kala_talao_lake.jpg',27),(132,'Durgadi Fort','A fort in Kalyan-Dombivli.','durgadi_fort.jpg',27),(133,'Ganesh Ghat','A popular ghat in Kalyan-Dombivli.','ganesh_ghat.jpg',27),(134,'Malanggad','A hill fort in Kalyan-Dombivli.','malanggad.jpg',27),(135,'Birla Mandir','A Hindu temple in Kalyan-Dombivli.','birla_mandir.jpg',27),(136,'Jivdani Temple','A temple in Vasai-Virar.','jivdani_temple.jpg',28),(137,'Arnala Fort','A fort on Arnala Island.','arnala_fort.jpg',28),(138,'Tungareshwar Temple','A temple in Tungareshwar.','tungareshwar_temple.jpg',28),(139,'Vasai Fort','A fort in Vasai.','vasai_fort.jpg',28),(140,'Chinchoti Waterfall','A waterfall in Vasai-Virar.','chinchoti_waterfall.jpg',28),(141,'Kashi Vishwanath Temple','A famous Hindu temple in Varanasi.','kashi_vishwanath_temple.jpg',29),(142,'Dashashwamedh Ghat','A ghat on the Ganga River in Varanasi.','dashashwamedh_ghat.jpg',29),(143,'Sarnath','A pilgrimage site in Varanasi.','sarnath.jpg',29),(144,'Manikarnika Ghat','A ghat in Varanasi.','manikarnika_ghat.jpg',29),(145,'Tulsi Manas Temple','A temple in Varanasi.','tulsi_manas_temple.jpg',29),(146,'Dal Lake','A lake in Srinagar.','dal_lake.jpg',30),(147,'Shalimar Bagh','A Mughal garden in Srinagar.','shalimar_bagh.jpg',30),(148,'Nishat Bagh','A Mughal garden in Srinagar.','nishat_bagh.jpg',30),(149,'Chashme Shahi','A Mughal garden in Srinagar.','chashme_shahi.jpg',30),(150,'Shankaracharya Temple','A temple in Srinagar.','shankaracharya_temple.jpg',30);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
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
  KEY `fk_booking_id` (`booking_id`),
  CONSTRAINT `fk_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `booking_details` (`booking_id`),
  CONSTRAINT `travel_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_history`
--

LOCK TABLES `travel_history` WRITE;
/*!40000 ALTER TABLE `travel_history` DISABLE KEYS */;
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
  `email` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` char(10) DEFAULT 'User',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` char(15) DEFAULT 'active',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asad@g.c','asad','sayyad','asad123','User','2024-12-12 10:11:13','2024-12-12 10:11:13','active'),(4,'sohel@g.c','sohel','momin','sohel786','User','2024-12-12 10:13:48','2024-12-12 10:14:55','active'),(5,'yash@g.c','yash','nagtode','yash111','User','2024-12-12 10:19:31','2024-12-12 10:19:31','active'),(9,'test@222','changetest2','test2','cb13700a39f0e5fcfeb10e328814b9a5e0b25c249642fb6e25afd5c53c45cf6d','User','2024-12-27 17:32:26','2025-02-06 10:20:25','active'),(10,'johnytest@gmail.com','johny','test','43df1b4f71d0d4e214b62eb8f871249ca4fb866f27550cce1d5967899969a214','User','2024-12-27 18:29:43','2024-12-28 05:13:17','deactive'),(11,'manager@gmail.com','asad','sayed','48b676e2b107da679512b793d5fd4cc4329f0c7c17a97cf6e0e3d1005b600b03','manager','2024-12-28 03:19:04','2025-02-06 06:53:55','active'),(12,'admin@gmail.com','admin','shaikh','5474996ab446f9c2579656192e111dfe18775cc57ccd516d52b9722d9e1af24b','admin','2024-12-28 03:37:22','2024-12-28 03:37:22','active'),(13,'testman@gmail.com','a','s','a52d744c4e56b4de0b897ef7e3c2d19be2bc8ceff8b1fbdacf8cbfb8770f1e74','manager','2024-12-30 17:20:38','2024-12-30 17:20:38','active'),(14,'manag@gmail.com','manag','ger','48b676e2b107da679512b793d5fd4cc4329f0c7c17a97cf6e0e3d1005b600b03','manager','2024-12-30 17:21:40','2024-12-30 17:21:40','active'),(15,'a','a','a','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','manager','2024-12-30 17:25:08','2025-02-06 09:13:38','active'),(16,'s','a','a','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','manager','2024-12-30 17:30:25','2024-12-30 17:30:25','active'),(21,'b','a','a','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','manager','2024-12-31 08:40:53','2024-12-31 08:40:53','active'),(22,'th','testman3','three','6bde0b830d8bd56dea61c5c1cb648c7ffca6ffce2923ad1db9f29079cac947e0','manager','2025-01-04 03:45:14','2025-01-04 03:45:14','active'),(23,'managertwo@g.c','akhiii','flix','3fc4ccfe745870e2c0d99f71f30ff0656c8dedd41cc1d7d3d376b0dbe685e2f3','manager','2025-01-29 16:27:49','2025-02-06 06:55:39','active'),(24,'userasad@g.c','asaduser','user','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24','manager','2025-01-29 16:28:42','2025-01-29 16:28:42','active'),(25,'asad@g.c2','userasad2','asad2','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24','manager','2025-01-29 16:29:53','2025-01-29 16:29:53','active'),(26,'asad@g.c33','userasad3','asad2','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','User','2025-01-29 16:43:24','2025-01-29 16:43:24','active'),(27,'z@g.c','zz','ss','aaa','User','2025-02-03 02:46:28','2025-02-03 02:46:28','active'),(28,'ABC@gmail.com','abc','ABC','b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78','User','2025-02-03 02:50:32','2025-02-03 02:50:32','active'),(29,'zzzzzzzzzz@g.c','asas','asas','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','User','2025-02-03 02:56:09','2025-02-03 02:56:09','active'),(30,'n1@g.c','n1','n1','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','User','2025-02-05 18:17:07','2025-02-05 18:17:07','active'),(31,'ABC@okokokoail.com','abc','ABC','b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78','User','2025-02-05 18:19:28','2025-02-05 18:19:28','active'),(32,'Akhtar@salim.gc','Aktar','Salim','9b4d3808c817e40aa8c94a5762ebe7227fa4ac136920079e3f9ebe8844654d9f','User','2025-02-05 20:22:12','2025-02-05 20:22:12','active');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `unique_no` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'F13579','Boeing 747','airplane',7700.00),(2,'G24680','Airbus A380','airplane',7900.00),(3,'H11223','Embraer E190','airplane',7200.00),(5,'J55667','Boeing 787','airplane',7600.00),(6,'K77889','Airbus A350','airplane',8000.00),(7,'L99001','Bombardier Q400','airplane',7100.00),(8,'Mh43gt6768','swift','car',400.00),(9,'Mh02gt8523','neeta travels','bus',300.00),(10,'Mh22gt6768','shivneri','bus',350.00),(11,'Mh22gt1234','swift','car',358.00),(12,'Mh22gt9101','eeco','car',288.00),(13,'Mh22gt1121','eeco','car',178.00),(14,'Mh22gt3141','wagonr','car',128.00),(15,'T12345','Rajdhani Express','Train',1000.00),(16,'T67890','Shatabdi Express','Train',1200.00),(17,'T54321','Duronto Express','Train',1100.00),(18,'T98765','Garib Rath Express','Train',800.00),(19,'T24680','Tejas Express','Train',900.00),(20,'T13579','Maharaja Express','Train',1200.00),(21,'T24681','Vande Bharat Express','Train',700.00),(22,'M11223','Intercity Express','Train',1000.00),(26,'Mh22gt3142','wagonr','car',128.00),(34,'K77890','Airbus A350','Airplane',8000.00),(35,'L99003','Boeing 777','Airplane',7800.00),(41,'Mh22gt3149','Mini Bus','Bus',500.00);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pkg_id` int DEFAULT NULL,
  `place_id` int DEFAULT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `user_id` (`user_id`),
  KEY `wishlist_ibfk_1` (`pkg_id`),
  KEY `place_id` (`place_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`pkg_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `wishlist_ibfk_3` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (13,11,NULL,4),(18,11,NULL,5);
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

-- Dump completed on 2025-02-06 21:31:12
