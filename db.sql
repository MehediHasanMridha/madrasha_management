-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: madrasha_management
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `academics`
--

DROP TABLE IF EXISTS `academics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academics` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `nid` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `boarding_fee` decimal(10,2) DEFAULT NULL,
  `academic_fee` decimal(10,2) DEFAULT NULL,
  `designation` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blood` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_number` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `class_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `academics_user_id_foreign` (`user_id`),
  KEY `academics_department_id_foreign` (`department_id`),
  KEY `academics_class_id_foreign` (`class_id`),
  CONSTRAINT `academics_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `academics_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `academics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academics`
--

/*!40000 ALTER TABLE `academics` DISABLE KEYS */;
INSERT INTO `academics` VALUES (20,21,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:52','2025-04-07 19:59:52'),(21,22,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:53','2025-04-07 19:59:53'),(22,23,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:53','2025-04-07 19:59:53'),(23,24,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:53','2025-04-07 19:59:53'),(24,25,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:53','2025-04-07 19:59:53'),(25,26,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:53','2025-04-07 19:59:53'),(26,27,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:54','2025-04-07 19:59:54'),(27,28,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:54','2025-04-07 19:59:54'),(28,29,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:54','2025-04-07 19:59:54'),(29,30,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:54','2025-04-07 19:59:54'),(30,31,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:54','2025-04-07 19:59:54'),(31,32,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:55','2025-04-07 19:59:55'),(32,33,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:55','2025-04-07 19:59:55'),(33,34,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:55','2025-04-07 19:59:55'),(34,35,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:55','2025-04-07 19:59:55'),(35,36,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:55','2025-04-07 19:59:55'),(36,37,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:56','2025-04-07 19:59:56'),(37,38,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:56','2025-04-07 19:59:56'),(38,39,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:56','2025-04-07 19:59:56'),(39,40,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:56','2025-04-07 19:59:56'),(40,41,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:57','2025-04-07 19:59:57'),(41,42,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:57','2025-04-07 19:59:57'),(42,43,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:57','2025-04-07 19:59:57'),(43,44,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:57','2025-04-07 19:59:57'),(44,45,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:57','2025-04-07 19:59:57'),(45,46,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:58','2025-04-07 19:59:58'),(46,47,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:58','2025-04-07 19:59:58'),(47,48,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:58','2025-04-07 19:59:58'),(48,49,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:58','2025-04-07 19:59:58'),(49,50,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:58','2025-04-07 19:59:58'),(50,51,NULL,8540.00,NULL,NULL,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:59','2025-04-07 19:59:59'),(51,52,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:59','2025-04-07 19:59:59'),(52,53,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 19:59:59','2025-04-07 19:59:59'),(55,56,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:00','2025-04-07 20:00:00'),(56,57,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:00','2025-04-07 20:00:00'),(58,59,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:00','2025-04-07 20:00:00'),(59,60,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:00','2025-04-07 20:00:00'),(60,61,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:01','2025-04-07 20:00:01'),(61,62,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:01','2025-04-07 20:00:01'),(62,63,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:01','2025-04-07 20:00:01'),(63,64,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:01','2025-04-07 20:00:01'),(64,65,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:01','2025-04-07 20:00:01'),(65,66,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:02','2025-04-07 20:00:02'),(66,67,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:02','2025-04-07 20:00:02'),(67,68,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:02','2025-04-07 20:00:02'),(68,69,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:02','2025-04-07 20:00:02'),(69,70,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:02','2025-04-07 20:00:02'),(70,71,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:03','2025-04-07 20:00:03'),(71,72,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:03','2025-04-07 20:00:03'),(72,73,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:03','2025-04-07 20:00:03'),(73,74,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:03','2025-04-07 20:00:03'),(74,75,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:04','2025-04-07 20:00:04'),(75,76,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:04','2025-04-07 20:00:04'),(76,77,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:04','2025-04-07 20:00:04'),(77,78,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:04','2025-04-07 20:00:04'),(78,79,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:04','2025-04-07 20:00:04'),(79,80,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:05','2025-04-07 20:00:05'),(80,81,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:05','2025-04-07 20:00:05'),(81,82,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:05','2025-04-07 20:00:05'),(82,83,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:05','2025-04-07 20:00:05'),(83,84,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:05','2025-04-07 20:00:05'),(84,85,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:06','2025-04-07 20:00:06'),(85,86,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:06','2025-04-07 20:00:06'),(86,87,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:06','2025-04-07 20:00:06'),(87,88,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:06','2025-04-07 20:00:06'),(88,89,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:06','2025-04-07 20:00:06'),(89,90,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:07','2025-04-07 20:00:07'),(90,91,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:07','2025-04-07 20:00:07'),(91,92,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:07','2025-04-07 20:00:07'),(92,93,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:07','2025-04-07 20:00:07'),(93,94,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:07','2025-04-07 20:00:07'),(94,95,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:08','2025-04-07 20:00:08'),(95,96,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:08','2025-04-07 20:00:08'),(96,97,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:08','2025-04-07 20:00:08'),(97,98,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:08','2025-04-07 20:00:08'),(98,99,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:08','2025-04-07 20:00:08'),(99,100,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:09','2025-04-07 20:00:09'),(100,101,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:09','2025-04-07 20:00:09'),(101,102,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:09','2025-04-07 20:00:09'),(102,103,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:09','2025-04-07 20:00:09'),(103,104,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:09','2025-04-07 20:00:09'),(104,105,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:10','2025-04-07 20:00:10'),(105,106,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:10','2025-04-07 20:00:10'),(106,107,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:10','2025-04-07 20:00:10'),(107,108,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:10','2025-04-07 20:00:10'),(108,109,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:11','2025-04-07 20:00:11'),(109,110,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:11','2025-04-07 20:00:11'),(110,111,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:11','2025-04-07 20:00:11'),(111,112,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:11','2025-04-07 20:00:11'),(112,113,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:11','2025-04-07 20:00:11'),(113,114,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:12','2025-04-07 20:00:12'),(114,115,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:12','2025-04-07 20:00:12'),(115,116,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:12','2025-04-07 20:00:12'),(116,117,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:12','2025-04-07 20:00:12'),(117,118,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:12','2025-04-07 20:00:12'),(118,119,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:13','2025-04-07 20:00:13'),(119,120,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:13','2025-04-07 20:00:13'),(120,121,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:13','2025-04-07 20:00:13'),(121,122,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:13','2025-04-07 20:00:13'),(122,123,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:13','2025-04-07 20:00:13'),(123,124,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:14','2025-04-07 20:00:14'),(124,125,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:14','2025-04-07 20:00:14'),(125,126,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:14','2025-04-07 20:00:14'),(126,127,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:14','2025-04-07 20:00:14'),(127,128,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:14','2025-04-07 20:00:14'),(128,129,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:15','2025-04-07 20:00:15'),(129,130,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:15','2025-04-07 20:00:15'),(130,131,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:15','2025-04-07 20:00:15'),(131,132,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:15','2025-04-07 20:00:15'),(132,133,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:15','2025-04-07 20:00:15'),(133,134,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:16','2025-04-07 20:00:16'),(134,135,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:16','2025-04-07 20:00:16'),(135,136,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:16','2025-04-07 20:00:16'),(136,137,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:16','2025-04-07 20:00:16'),(137,138,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:16','2025-04-07 20:00:16'),(138,139,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:17','2025-04-07 20:00:17'),(139,140,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:17','2025-04-07 20:00:17'),(140,141,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:17','2025-04-07 20:00:17'),(141,142,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:17','2025-04-07 20:00:17'),(143,144,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,3,'2025-04-07 20:00:18','2025-04-10 11:56:01'),(144,145,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:18','2025-04-07 20:00:18'),(145,146,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:18','2025-04-07 20:00:18'),(146,147,NULL,NULL,854.00,854.00,NULL,'A+',NULL,NULL,2,1,'2025-04-07 20:00:18','2025-04-07 20:00:18'),(152,153,NULL,NULL,3000.00,3500.00,NULL,'B+','Voluptatum commodi v',NULL,6,11,'2025-04-10 04:04:57','2025-04-10 04:04:57'),(153,154,NULL,34563.00,NULL,NULL,'Assistant Teacher','A-','Dolorem minus velit',NULL,NULL,NULL,'2025-04-10 04:07:17','2025-04-10 06:21:45');
/*!40000 ALTER TABLE `academics` ENABLE KEYS */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `district` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upazilla` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (20,21,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:52','2025-04-07 19:59:52'),(21,22,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:53','2025-04-07 19:59:53'),(22,23,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:53','2025-04-07 19:59:53'),(23,24,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:53','2025-04-07 19:59:53'),(24,25,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:53','2025-04-07 19:59:53'),(25,26,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:53','2025-04-07 19:59:53'),(26,27,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:54','2025-04-07 19:59:54'),(27,28,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:54','2025-04-07 19:59:54'),(28,29,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:54','2025-04-07 19:59:54'),(29,30,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:54','2025-04-07 19:59:54'),(30,31,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:54','2025-04-07 19:59:54'),(31,32,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:55','2025-04-07 19:59:55'),(32,33,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:55','2025-04-07 19:59:55'),(33,34,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:55','2025-04-07 19:59:55'),(34,35,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:55','2025-04-07 19:59:55'),(35,36,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:55','2025-04-07 19:59:55'),(36,37,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:56','2025-04-07 19:59:56'),(37,38,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:56','2025-04-07 19:59:56'),(38,39,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:56','2025-04-07 19:59:56'),(39,40,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:56','2025-04-07 19:59:56'),(40,41,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:57','2025-04-07 19:59:57'),(41,42,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:57','2025-04-07 19:59:57'),(42,43,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:57','2025-04-07 19:59:57'),(43,44,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:57','2025-04-07 19:59:57'),(44,45,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:57','2025-04-07 19:59:57'),(45,46,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:58','2025-04-07 19:59:58'),(46,47,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:58','2025-04-07 19:59:58'),(47,48,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:58','2025-04-07 19:59:58'),(48,49,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:58','2025-04-07 19:59:58'),(49,50,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:58','2025-04-07 19:59:58'),(50,51,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:59','2025-04-07 19:59:59'),(51,52,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:59','2025-04-07 19:59:59'),(52,53,'Dhaka','Gazipur','Dhaka','2025-04-07 19:59:59','2025-04-07 19:59:59'),(55,56,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:00','2025-04-07 20:00:00'),(56,57,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:00','2025-04-07 20:00:00'),(58,59,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:00','2025-04-07 20:00:00'),(59,60,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:00','2025-04-07 20:00:00'),(60,61,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:01','2025-04-07 20:00:01'),(61,62,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:01','2025-04-07 20:00:01'),(62,63,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:01','2025-04-07 20:00:01'),(63,64,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:01','2025-04-07 20:00:01'),(64,65,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:01','2025-04-07 20:00:01'),(65,66,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:02','2025-04-07 20:00:02'),(66,67,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:02','2025-04-07 20:00:02'),(67,68,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:02','2025-04-07 20:00:02'),(68,69,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:02','2025-04-07 20:00:02'),(69,70,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:02','2025-04-07 20:00:02'),(70,71,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:03','2025-04-07 20:00:03'),(71,72,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:03','2025-04-07 20:00:03'),(72,73,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:03','2025-04-07 20:00:03'),(73,74,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:03','2025-04-07 20:00:03'),(74,75,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:04','2025-04-07 20:00:04'),(75,76,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:04','2025-04-07 20:00:04'),(76,77,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:04','2025-04-07 20:00:04'),(77,78,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:04','2025-04-07 20:00:04'),(78,79,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:04','2025-04-07 20:00:04'),(79,80,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:05','2025-04-07 20:00:05'),(80,81,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:05','2025-04-07 20:00:05'),(81,82,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:05','2025-04-07 20:00:05'),(82,83,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:05','2025-04-07 20:00:05'),(83,84,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:05','2025-04-07 20:00:05'),(84,85,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:06','2025-04-07 20:00:06'),(85,86,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:06','2025-04-07 20:00:06'),(86,87,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:06','2025-04-07 20:00:06'),(87,88,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:06','2025-04-07 20:00:06'),(88,89,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:06','2025-04-07 20:00:06'),(89,90,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:07','2025-04-07 20:00:07'),(90,91,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:07','2025-04-07 20:00:07'),(91,92,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:07','2025-04-07 20:00:07'),(92,93,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:07','2025-04-07 20:00:07'),(93,94,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:07','2025-04-07 20:00:07'),(94,95,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:08','2025-04-07 20:00:08'),(95,96,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:08','2025-04-07 20:00:08'),(96,97,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:08','2025-04-07 20:00:08'),(97,98,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:08','2025-04-07 20:00:08'),(98,99,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:08','2025-04-07 20:00:08'),(99,100,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:09','2025-04-07 20:00:09'),(100,101,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:09','2025-04-07 20:00:09'),(101,102,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:09','2025-04-07 20:00:09'),(102,103,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:09','2025-04-07 20:00:09'),(103,104,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:09','2025-04-07 20:00:09'),(104,105,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:10','2025-04-07 20:00:10'),(105,106,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:10','2025-04-07 20:00:10'),(106,107,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:10','2025-04-07 20:00:10'),(107,108,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:10','2025-04-07 20:00:10'),(108,109,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:11','2025-04-07 20:00:11'),(109,110,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:11','2025-04-07 20:00:11'),(110,111,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:11','2025-04-07 20:00:11'),(111,112,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:11','2025-04-07 20:00:11'),(112,113,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:11','2025-04-07 20:00:11'),(113,114,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:12','2025-04-07 20:00:12'),(114,115,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:12','2025-04-07 20:00:12'),(115,116,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:12','2025-04-07 20:00:12'),(116,117,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:12','2025-04-07 20:00:12'),(117,118,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:12','2025-04-07 20:00:12'),(118,119,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:13','2025-04-07 20:00:13'),(119,120,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:13','2025-04-07 20:00:13'),(120,121,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:13','2025-04-07 20:00:13'),(121,122,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:13','2025-04-07 20:00:13'),(122,123,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:13','2025-04-07 20:00:13'),(123,124,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:14','2025-04-07 20:00:14'),(124,125,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:14','2025-04-07 20:00:14'),(125,126,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:14','2025-04-07 20:00:14'),(126,127,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:14','2025-04-07 20:00:14'),(127,128,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:14','2025-04-07 20:00:14'),(128,129,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:15','2025-04-07 20:00:15'),(129,130,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:15','2025-04-07 20:00:15'),(130,131,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:15','2025-04-07 20:00:15'),(131,132,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:15','2025-04-07 20:00:15'),(132,133,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:15','2025-04-07 20:00:15'),(133,134,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:16','2025-04-07 20:00:16'),(134,135,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:16','2025-04-07 20:00:16'),(135,136,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:16','2025-04-07 20:00:16'),(136,137,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:16','2025-04-07 20:00:16'),(137,138,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:16','2025-04-07 20:00:16'),(138,139,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:17','2025-04-07 20:00:17'),(139,140,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:17','2025-04-07 20:00:17'),(140,141,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:17','2025-04-07 20:00:17'),(141,142,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:17','2025-04-07 20:00:17'),(143,144,'Dhaka','Dhamrai','Dhaka','2025-04-07 20:00:18','2025-04-10 11:56:01'),(144,145,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:18','2025-04-07 20:00:18'),(145,146,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:18','2025-04-07 20:00:18'),(146,147,'Dhaka','Gazipur','Dhaka','2025-04-07 20:00:18','2025-04-07 20:00:18'),(152,153,'Manikganj','Gior','Minim doloremque aut','2025-04-10 04:04:57','2025-04-10 04:04:57'),(153,154,'Madaripur','Madaripur Sadar','Aut et architecto ex','2025-04-10 04:07:17','2025-04-10 06:21:35');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;

--
-- Table structure for table `class_assigns`
--

DROP TABLE IF EXISTS `class_assigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_assigns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `class_id` bigint unsigned DEFAULT NULL,
  `dept_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `class_assigns_user_id_foreign` (`user_id`),
  KEY `class_assigns_class_id_foreign` (`class_id`),
  KEY `class_assigns_dept_id_foreign` (`dept_id`),
  CONSTRAINT `class_assigns_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `class_assigns_dept_id_foreign` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `class_assigns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_assigns`
--

/*!40000 ALTER TABLE `class_assigns` DISABLE KEYS */;
INSERT INTO `class_assigns` VALUES (16,46,NULL,2,'2025-04-08 14:11:59','2025-04-08 14:11:59'),(19,43,NULL,2,'2025-04-08 14:11:59','2025-04-08 14:11:59'),(21,48,NULL,2,'2025-04-08 14:11:59','2025-04-08 14:11:59'),(22,47,NULL,2,'2025-04-08 14:11:59','2025-04-08 14:11:59'),(23,50,NULL,2,'2025-04-08 14:11:59','2025-04-08 14:11:59'),(34,154,NULL,6,'2025-04-10 04:07:40','2025-04-10 04:07:40');
/*!40000 ALTER TABLE `class_assigns` ENABLE KEYS */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `des` text COLLATE utf8mb4_unicode_ci,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `classes_slug_unique` (`slug`),
  KEY `classes_department_id_foreign` (`department_id`),
  CONSTRAINT `classes_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Class 1 Science','class-1-science','First year science class',NULL,1,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(2,'Class 2 Science','class-2-science','Second year science class',NULL,1,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(3,'Class 1 Arts','class-1-arts','First year arts class',NULL,2,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(4,'Class 2 Arts','class-2-arts','Second year arts class',NULL,2,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(5,'Class 1 Commerce','class-1-commerce','First year commerce class',NULL,3,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(6,'Class 2 Commerce','class-2-commerce','Second year commerce class',NULL,3,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(7,'Class 1 Computer Science','class-1-computer-science','First year computer science class',NULL,4,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(8,'Class 2 Computer Science','class-2-computer-science','Second year computer science class',NULL,4,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(9,'Class 1 Islamic Studies','class-1-islamic-studies','First year Islamic studies class',NULL,5,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(10,'Class 2 Islamic Studies','class-2-islamic-studies','Second year Islamic studies class',NULL,5,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(11,'HIfjul Quran','hifjul-quran-67f826af84cb2','dfhdfh','https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000',6,'2025-04-10 04:03:14','2025-04-10 20:14:39'),(12,'Mehedi Hasan','mehedi-hasan-67f826c2aa41f','edsgraedrger','https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000',6,'2025-04-10 20:14:58','2025-04-10 20:14:58');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `des` text COLLATE utf8mb4_unicode_ci,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Science','science','Science department includes Physics, Chemistry, Biology, etc.',NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(2,'Arts','arts','Arts department includes Literature, History, Geography, etc.',NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(3,'Commerce','commerce','Commerce department includes Accounting, Business Studies, Economics, etc.',NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(4,'Computer Science','computer-science','Computer Science department includes Programming, Database, Networking, etc.',NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(5,'Islamic Studies','islamic-studies','Islamic Studies department includes Quran, Hadith, Fiqh, etc.',NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(6,'Hifjo Bivag','hifjo-bivag-67f742d929491','Reading Quran','https://www.flaticon.com/free-icon/teamwork_3281897?term=staff&page=1&position=96&origin=search&related_id=3281897','2025-04-10 04:02:33','2025-04-10 04:02:33'),(8,'Noorani','noorani-67f929740e139',NULL,'https://www.flaticon.com/free-icon/teamwork_3281897?term=staff&page=1&position=96&origin=search&related_id=3281897','2025-04-11 14:38:44','2025-04-11 14:38:44');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

--
-- Table structure for table `fee_types`
--

DROP TABLE IF EXISTS `fee_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_amount` decimal(10,2) DEFAULT NULL,
  `is_variable` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fee_types_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_types`
--

/*!40000 ALTER TABLE `fee_types` DISABLE KEYS */;
INSERT INTO `fee_types` VALUES (1,'Academic Fee','academic-fee',1000.00,0,'2025-04-20 04:20:59','2025-04-20 04:20:59'),(2,'Boarding Fee','boarding-fee',1500.00,0,'2025-04-20 04:20:59','2025-04-20 04:20:59');
/*!40000 ALTER TABLE `fee_types` ENABLE KEYS */;

--
-- Table structure for table `guardians`
--

DROP TABLE IF EXISTS `guardians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guardians` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `father_name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mother_name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numbers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guardians_user_id_foreign` (`user_id`),
  CONSTRAINT `guardians_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `guardians_chk_1` CHECK (json_valid(`numbers`))
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardians`
--

/*!40000 ALTER TABLE `guardians` DISABLE KEYS */;
INSERT INTO `guardians` VALUES (20,21,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:52','2025-04-07 19:59:52'),(21,22,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:53','2025-04-07 19:59:53'),(22,23,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:53','2025-04-07 19:59:53'),(23,24,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:53','2025-04-07 19:59:53'),(24,25,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:53','2025-04-07 19:59:53'),(25,26,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:53','2025-04-07 19:59:53'),(26,27,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:54','2025-04-07 19:59:54'),(27,28,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:54','2025-04-07 19:59:54'),(28,29,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:54','2025-04-07 19:59:54'),(29,30,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:54','2025-04-07 19:59:54'),(30,31,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:54','2025-04-07 19:59:54'),(31,32,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:55','2025-04-07 19:59:55'),(32,33,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:55','2025-04-07 19:59:55'),(33,34,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:55','2025-04-07 19:59:55'),(34,35,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:55','2025-04-07 19:59:55'),(35,36,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:55','2025-04-07 19:59:55'),(36,37,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:56','2025-04-07 19:59:56'),(37,38,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:56','2025-04-07 19:59:56'),(38,39,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:56','2025-04-07 19:59:56'),(39,40,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:56','2025-04-07 19:59:56'),(40,41,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:57','2025-04-07 19:59:57'),(41,42,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:57','2025-04-07 19:59:57'),(42,43,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:57','2025-04-07 19:59:57'),(43,44,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:57','2025-04-07 19:59:57'),(44,45,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:57','2025-04-07 19:59:57'),(45,46,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:58','2025-04-07 19:59:58'),(46,47,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:58','2025-04-07 19:59:58'),(47,48,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:58','2025-04-07 19:59:58'),(48,49,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:58','2025-04-07 19:59:58'),(49,50,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:58','2025-04-07 19:59:58'),(50,51,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:59','2025-04-07 19:59:59'),(51,52,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:59','2025-04-07 19:59:59'),(52,53,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 19:59:59','2025-04-07 19:59:59'),(55,56,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:00','2025-04-07 20:00:00'),(56,57,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:00','2025-04-07 20:00:00'),(58,59,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:00','2025-04-07 20:00:00'),(59,60,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:00','2025-04-07 20:00:00'),(60,61,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:01','2025-04-07 20:00:01'),(61,62,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:01','2025-04-07 20:00:01'),(62,63,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:01','2025-04-07 20:00:01'),(63,64,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:01','2025-04-07 20:00:01'),(64,65,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:01','2025-04-07 20:00:01'),(65,66,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:02','2025-04-07 20:00:02'),(66,67,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:02','2025-04-07 20:00:02'),(67,68,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:02','2025-04-07 20:00:02'),(68,69,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:02','2025-04-07 20:00:02'),(69,70,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:02','2025-04-07 20:00:02'),(70,71,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:03','2025-04-07 20:00:03'),(71,72,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:03','2025-04-07 20:00:03'),(72,73,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:03','2025-04-07 20:00:03'),(73,74,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:03','2025-04-07 20:00:03'),(74,75,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:04','2025-04-07 20:00:04'),(75,76,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:04','2025-04-07 20:00:04'),(76,77,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:04','2025-04-07 20:00:04'),(77,78,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:04','2025-04-07 20:00:04'),(78,79,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:04','2025-04-07 20:00:04'),(79,80,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:05','2025-04-07 20:00:05'),(80,81,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:05','2025-04-07 20:00:05'),(81,82,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:05','2025-04-07 20:00:05'),(82,83,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:05','2025-04-07 20:00:05'),(83,84,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:05','2025-04-07 20:00:05'),(84,85,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:06','2025-04-07 20:00:06'),(85,86,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:06','2025-04-07 20:00:06'),(86,87,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:06','2025-04-07 20:00:06'),(87,88,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:06','2025-04-07 20:00:06'),(88,89,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:06','2025-04-07 20:00:06'),(89,90,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:07','2025-04-07 20:00:07'),(90,91,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:07','2025-04-07 20:00:07'),(91,92,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:07','2025-04-07 20:00:07'),(92,93,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:07','2025-04-07 20:00:07'),(93,94,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:07','2025-04-07 20:00:07'),(94,95,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:08','2025-04-07 20:00:08'),(95,96,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:08','2025-04-07 20:00:08'),(96,97,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:08','2025-04-07 20:00:08'),(97,98,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:08','2025-04-07 20:00:08'),(98,99,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:08','2025-04-07 20:00:08'),(99,100,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:09','2025-04-07 20:00:09'),(100,101,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:09','2025-04-07 20:00:09'),(101,102,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:09','2025-04-07 20:00:09'),(102,103,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:09','2025-04-07 20:00:09'),(103,104,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:09','2025-04-07 20:00:09'),(104,105,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:10','2025-04-07 20:00:10'),(105,106,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:10','2025-04-07 20:00:10'),(106,107,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:10','2025-04-07 20:00:10'),(107,108,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:10','2025-04-07 20:00:10'),(108,109,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:11','2025-04-07 20:00:11'),(109,110,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:11','2025-04-07 20:00:11'),(110,111,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:11','2025-04-07 20:00:11'),(111,112,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:11','2025-04-07 20:00:11'),(112,113,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:11','2025-04-07 20:00:11'),(113,114,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:12','2025-04-07 20:00:12'),(114,115,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:12','2025-04-07 20:00:12'),(115,116,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:12','2025-04-07 20:00:12'),(116,117,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:12','2025-04-07 20:00:12'),(117,118,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:12','2025-04-07 20:00:12'),(118,119,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:13','2025-04-07 20:00:13'),(119,120,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:13','2025-04-07 20:00:13'),(120,121,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:13','2025-04-07 20:00:13'),(121,122,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:13','2025-04-07 20:00:13'),(122,123,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:13','2025-04-07 20:00:13'),(123,124,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:14','2025-04-07 20:00:14'),(124,125,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:14','2025-04-07 20:00:14'),(125,126,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:14','2025-04-07 20:00:14'),(126,127,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:14','2025-04-07 20:00:14'),(127,128,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:14','2025-04-07 20:00:14'),(128,129,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:15','2025-04-07 20:00:15'),(129,130,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:15','2025-04-07 20:00:15'),(130,131,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:15','2025-04-07 20:00:15'),(131,132,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:15','2025-04-07 20:00:15'),(132,133,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:15','2025-04-07 20:00:15'),(133,134,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:16','2025-04-07 20:00:16'),(134,135,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:16','2025-04-07 20:00:16'),(135,136,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:16','2025-04-07 20:00:16'),(136,137,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:16','2025-04-07 20:00:16'),(137,138,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:16','2025-04-07 20:00:16'),(138,139,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:17','2025-04-07 20:00:17'),(139,140,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:17','2025-04-07 20:00:17'),(140,141,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:17','2025-04-07 20:00:17'),(141,142,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:17','2025-04-07 20:00:17'),(143,144,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:18','2025-04-07 20:00:18'),(144,145,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:18','2025-04-07 20:00:18'),(145,146,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:18','2025-04-07 20:00:18'),(146,147,'John Doe','Jane Doe','[\"01712345678\"]','2025-04-07 20:00:18','2025-04-07 20:00:18'),(152,153,'Stephen George','Serina Little','[\"856\"]','2025-04-10 04:04:57','2025-04-10 04:04:57'),(153,154,'Maxine Buck','Gwendolyn Kelly','[\"01770755720\"]','2025-04-10 04:07:17','2025-04-10 04:07:17');
/*!40000 ALTER TABLE `guardians` ENABLE KEYS */;

--
-- Table structure for table `income_logs`
--

DROP TABLE IF EXISTS `income_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `source_type` enum('student','donation','sponsor','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `source_details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `fee_type_id` bigint unsigned NOT NULL,
  `payment_method_id` bigint unsigned NOT NULL,
  `payment_period` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('paid','pending','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'paid',
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `income_logs_user_id_foreign` (`user_id`),
  KEY `income_logs_fee_type_id_foreign` (`fee_type_id`),
  KEY `income_logs_payment_method_id_foreign` (`payment_method_id`),
  CONSTRAINT `income_logs_fee_type_id_foreign` FOREIGN KEY (`fee_type_id`) REFERENCES `fee_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `income_logs_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `income_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income_logs`
--

/*!40000 ALTER TABLE `income_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `income_logs` ENABLE KEYS */;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_03_02_010340_create_departments_table',1),(5,'2025_03_08_103646_create_guardians_table',1),(6,'2025_03_08_103714_create_addresses_table',1),(7,'2025_03_08_103851_create_classes_table',1),(8,'2025_03_08_172328_create_academics_table',1),(9,'2025_03_10_091147_create_permission_tables',1),(10,'2025_03_18_100939_create_class_assigns_table',1),(11,'2025_04_17_133425_create_payment_methods_table',2),(12,'2025_04_17_180244_create_fee_types_table',2),(13,'2025_04_17_183226_create_income_logs_table',2),(14,'2025_04_17_183400_create_student_dues_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',21),(2,'App\\Models\\User',22),(2,'App\\Models\\User',23),(2,'App\\Models\\User',24),(2,'App\\Models\\User',25),(2,'App\\Models\\User',26),(2,'App\\Models\\User',27),(2,'App\\Models\\User',28),(2,'App\\Models\\User',29),(2,'App\\Models\\User',30),(2,'App\\Models\\User',31),(2,'App\\Models\\User',32),(2,'App\\Models\\User',33),(2,'App\\Models\\User',34),(2,'App\\Models\\User',35),(2,'App\\Models\\User',36),(2,'App\\Models\\User',37),(2,'App\\Models\\User',38),(2,'App\\Models\\User',39),(2,'App\\Models\\User',40),(2,'App\\Models\\User',41),(2,'App\\Models\\User',42),(2,'App\\Models\\User',43),(2,'App\\Models\\User',44),(2,'App\\Models\\User',45),(2,'App\\Models\\User',46),(2,'App\\Models\\User',47),(2,'App\\Models\\User',48),(2,'App\\Models\\User',49),(2,'App\\Models\\User',50),(2,'App\\Models\\User',51),(3,'App\\Models\\User',52),(3,'App\\Models\\User',53),(3,'App\\Models\\User',56),(3,'App\\Models\\User',57),(3,'App\\Models\\User',59),(3,'App\\Models\\User',60),(3,'App\\Models\\User',61),(3,'App\\Models\\User',62),(3,'App\\Models\\User',63),(3,'App\\Models\\User',64),(3,'App\\Models\\User',65),(3,'App\\Models\\User',66),(3,'App\\Models\\User',67),(3,'App\\Models\\User',68),(3,'App\\Models\\User',69),(3,'App\\Models\\User',70),(3,'App\\Models\\User',71),(3,'App\\Models\\User',72),(3,'App\\Models\\User',73),(3,'App\\Models\\User',74),(3,'App\\Models\\User',75),(3,'App\\Models\\User',76),(3,'App\\Models\\User',77),(3,'App\\Models\\User',78),(3,'App\\Models\\User',79),(3,'App\\Models\\User',80),(3,'App\\Models\\User',81),(3,'App\\Models\\User',82),(3,'App\\Models\\User',83),(3,'App\\Models\\User',84),(3,'App\\Models\\User',85),(3,'App\\Models\\User',86),(3,'App\\Models\\User',87),(3,'App\\Models\\User',88),(3,'App\\Models\\User',89),(3,'App\\Models\\User',90),(3,'App\\Models\\User',91),(3,'App\\Models\\User',92),(3,'App\\Models\\User',93),(3,'App\\Models\\User',94),(3,'App\\Models\\User',95),(3,'App\\Models\\User',96),(3,'App\\Models\\User',97),(3,'App\\Models\\User',98),(3,'App\\Models\\User',99),(3,'App\\Models\\User',100),(3,'App\\Models\\User',101),(3,'App\\Models\\User',102),(3,'App\\Models\\User',103),(3,'App\\Models\\User',104),(3,'App\\Models\\User',105),(3,'App\\Models\\User',106),(3,'App\\Models\\User',107),(3,'App\\Models\\User',108),(3,'App\\Models\\User',109),(3,'App\\Models\\User',110),(3,'App\\Models\\User',111),(3,'App\\Models\\User',112),(3,'App\\Models\\User',113),(3,'App\\Models\\User',114),(3,'App\\Models\\User',115),(3,'App\\Models\\User',116),(3,'App\\Models\\User',117),(3,'App\\Models\\User',118),(3,'App\\Models\\User',119),(3,'App\\Models\\User',120),(3,'App\\Models\\User',121),(3,'App\\Models\\User',122),(3,'App\\Models\\User',123),(3,'App\\Models\\User',124),(3,'App\\Models\\User',125),(3,'App\\Models\\User',126),(3,'App\\Models\\User',127),(3,'App\\Models\\User',128),(3,'App\\Models\\User',129),(3,'App\\Models\\User',130),(3,'App\\Models\\User',131),(3,'App\\Models\\User',132),(3,'App\\Models\\User',133),(3,'App\\Models\\User',134),(3,'App\\Models\\User',135),(3,'App\\Models\\User',136),(3,'App\\Models\\User',137),(3,'App\\Models\\User',138),(3,'App\\Models\\User',139),(3,'App\\Models\\User',140),(3,'App\\Models\\User',141),(3,'App\\Models\\User',142),(3,'App\\Models\\User',144),(3,'App\\Models\\User',145),(3,'App\\Models\\User',146),(3,'App\\Models\\User',147),(3,'App\\Models\\User',153),(2,'App\\Models\\User',154);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_methods_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'cash','cash',1,'2025-04-20 04:23:39','2025-04-20 04:23:39');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super-admin','web','2025-04-07 19:59:48','2025-04-07 19:59:48'),(2,'staff','web','2025-04-07 19:59:49','2025-04-07 19:59:49'),(3,'student','web','2025-04-07 19:59:59','2025-04-07 19:59:59');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('YBKvAYoiCJF9KVL7dqRUQ0M6KK4mPczySp7n8d1H',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiaUgwQWI4R0tJM09SVkZrWW4xY01nbHBvc05DYmZDMDVpMWtKQVNPQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vbWFkcmFzYS50ZXN0L3N0YWZmIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjIyOiJQSFBERUJVR0JBUl9TVEFDS19EQVRBIjthOjA6e319',1745145396);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

--
-- Table structure for table `student_dues`
--

DROP TABLE IF EXISTS `student_dues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_dues` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `fee_type_id` bigint unsigned NOT NULL,
  `due_period` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expected_amount` decimal(10,2) NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `due_amount` decimal(10,2) GENERATED ALWAYS AS ((`expected_amount` - `paid_amount`)) VIRTUAL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_dues_user_id_fee_type_id_due_period_unique` (`user_id`,`fee_type_id`,`due_period`),
  KEY `student_dues_fee_type_id_foreign` (`fee_type_id`),
  CONSTRAINT `student_dues_fee_type_id_foreign` FOREIGN KEY (`fee_type_id`) REFERENCES `fee_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `student_dues_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_dues`
--

/*!40000 ALTER TABLE `student_dues` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_dues` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unique_id` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_unique_id_unique` (`unique_id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin',NULL,'admin@gmail.com',NULL,NULL,NULL,NULL,'$2y$12$85KRbHaKbwHDujvgNXhNe.dDAuKKbljhRcflSUIQWrYXNvwlnU2Nu',1,NULL,'2025-04-07 19:59:48','2025-04-07 19:59:48'),(21,'Layne Cronin','2025-S0020','stephon.okuneva@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$HA7NFjuXx3.tWsno8l1AlubMugGt09ceWBo1urlK.6WOWujD3cLPK',1,'lzOM2vTTgV','2025-04-07 19:59:48','2025-04-07 19:59:52'),(22,'Juvenal Batz','2025-S0021','umaggio@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$Xwet4MDTbiWC1BS5deNhqODg0fCIrGDYg9TT6DnB36XcE3rR3Hhyy',1,'ZHJrs3qBxm','2025-04-07 19:59:48','2025-04-07 19:59:53'),(23,'Rasheed Hegmann','2025-S0022','tdurgan@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$X0K9vts.1OvezxqLG1utEuXqwJmfIvDsRJGpZNR6o4MJ6IhNg7SQq',1,'rq1YJbGLx0','2025-04-07 19:59:48','2025-04-07 19:59:53'),(24,'Esteban Kunde Jr.','2025-S0023','uhartmann@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$vUZFUtd7zjwqu21BGXCfTO6/PRpnbDMfzjbCNFk7ezDVN/CBU2JKu',1,'KYRmtLJVMR','2025-04-07 19:59:48','2025-04-07 19:59:53'),(25,'Jayda Grant','2025-S0024','wschuppe@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$wQam5JVD9HI3Y./E0iewDOTqM8pztNBcxfrZDn2ySAShLxqpAZ/3S',1,'JXl6VsZWwr','2025-04-07 19:59:48','2025-04-07 19:59:53'),(26,'Prof. Trey Bailey','2025-S0025','ohills@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$hlAClmV7oNTdDqiXY2siu.LuIyeU.2gY1qnPpiosis2Qqll6B4JXC',1,'IceQwtRAvg','2025-04-07 19:59:48','2025-04-07 19:59:53'),(27,'Deshawn Borer','2025-S0026','bergnaum.eleazar@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$ofP1h5cVKAaO92rNwIIb0u/KYZkO1mVXCIY9ayIzi8ohQlMqPLHLi',1,'DDUFTid7le','2025-04-07 19:59:48','2025-04-07 19:59:54'),(28,'Gaston Windler','2025-S0027','tmacejkovic@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$vOeQvkkO9d3xnu6aWimHROYImNpbLcVRH.OJMLX7KSFFgjhLSROT6',1,'Mm3GNqgTWC','2025-04-07 19:59:48','2025-04-07 19:59:54'),(29,'Cassidy Schimmel','2025-S0028','krystal.effertz@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$Njc6sek.ts.ri2/OK9vnse4vB3AjZNAAm7cKgyYuw6k.qMs3FV5M.',1,'nAMuPjtoJB','2025-04-07 19:59:48','2025-04-07 19:59:54'),(30,'Helmer Fahey','2025-S0029','madilyn.herzog@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$eYiBA23uizP4FjDMhJmMxuasgbQWcSX.Rgv7Hs3kq3teKQRBdO0b6',1,'uipIFqukEf','2025-04-07 19:59:48','2025-04-07 19:59:54'),(31,'Cameron Corwin','2025-S0030','nrodriguez@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$EHuOb7eRXn/mI.FbF3t8d.qi4zv1B/eZtDFaDeYgabh56UuenGPbq',1,'Hy84y0rIA0','2025-04-07 19:59:48','2025-04-07 19:59:54'),(32,'Prof. Scot Boehm Jr.','2025-S0031','micheal.paucek@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$swN26biySN65mFyzFT9G6eFraKPa/cPv/H.CnFK5WH1ds.svYtBay',1,'BhBFobhZK2','2025-04-07 19:59:48','2025-04-07 19:59:55'),(33,'Mohamed DuBuque','2025-S0032','rbruen@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$P02jcU2O/VJiJ3F54Yta/erui01kOOkhVlFuhNEKxks5EQMClXSVW',1,'QrokBgpqEr','2025-04-07 19:59:48','2025-04-07 19:59:55'),(34,'Royal Hansen','2025-S0033','etha72@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$sGmlOvF8QeOU/ePnRx3BAu6ACgZZ7JUt7TaI3uXlDfWHcCN.4rSzO',1,'VcTa9gojSQ','2025-04-07 19:59:48','2025-04-07 19:59:55'),(35,'Elmo Hessel III','2025-S0034','else00@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$GQPeBH0K0MbmbtSdqnG.B.buIWnVIQzH6kjqCPD.S4n9lt9DzkvJW',1,'SdIrqPziNG','2025-04-07 19:59:48','2025-04-07 19:59:55'),(36,'Prof. Adam Hagenes','2025-S0035','morton76@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$irnU32TK5I816o0.WNjaNeqnTJ9FJrHFVD7DnMxoczjHp9ZvXsg0q',1,'MygpO7I6vT','2025-04-07 19:59:48','2025-04-07 19:59:55'),(37,'Melba Waters','2025-S0036','leonardo71@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$RQzcY1.UWd76EXecYpkU/.7MLUiaVSWO3l0Zs.yj58Ftu30ak5Pwy',1,'PNCMxWoHlX','2025-04-07 19:59:48','2025-04-07 19:59:56'),(38,'Abbie Weber','2025-S0037','eoberbrunner@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$8U94rkeRA0XSWPi63Nq4bemn5cL/Y2TbomAAK0fOJ5IMY9DVc2YiO',1,'hAg08sILJR','2025-04-07 19:59:48','2025-04-07 19:59:56'),(39,'Dr. Emerson Parker DVM','2025-S0038','freeda.davis@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$LK5stfAw1qBPDEqDg/ZPROWBlWhFrat5VREsof6Yp8DTE.9z9YA1.',1,'GQxz1yVMzn','2025-04-07 19:59:48','2025-04-07 19:59:56'),(40,'Ezra Kulas DVM','2025-S0039','jamil.aufderhar@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$6uJUFfvYRUMLIag00t32DuTTCfbUAYMVDOaFMNyZPh6n64piak3i.',1,'ZNCKtXLHs5','2025-04-07 19:59:48','2025-04-07 19:59:56'),(41,'Osborne Kshlerin','2025-S0040','fisher.trey@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$wm1mf6ZLoaRZ4UGEPzO33.QdY2.KBLbCg0iVsnMfnQB9AjgvmSiMC',1,'5zRUEWmNTH','2025-04-07 19:59:48','2025-04-07 19:59:57'),(42,'Mr. Kaley Reichel PhD','2025-S0041','keeling.lilian@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$dcOsFjT3ux9X0YkeLKDqvegzdZ6jMp4GemMO43OMFWImEi/vokWT6',1,'Mrux6P92Qh','2025-04-07 19:59:48','2025-04-07 19:59:57'),(43,'Owen Johnston','2025-S0042','nikolaus.kara@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$X57aWnNbLX.YzYf3st2V7O0iugmCWBL0eg7O7mzwXOpCiGbKPEY4i',1,'ndLxJK5daW','2025-04-07 19:59:48','2025-04-07 19:59:57'),(44,'Addison Mitchell','2025-S0043','kvon@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$9fU7L9zKbh4gv4.Rv8RKueD/OIP41O97AXnuiWnnBq59DWan4wX06',1,'o8U2cOrIQM','2025-04-07 19:59:48','2025-04-07 19:59:57'),(45,'Odie Hermann','2025-S0044','marilyne.little@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$vI2F02XE0WEtkvWa6HzbUuE.b.G4ShKHcsngjYYxMkZMupJ4/rBCG',1,'vWPouYpg3z','2025-04-07 19:59:48','2025-04-07 19:59:57'),(46,'Johnny Kohler','2025-S0045','reanna12@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$or2z0qLTRbmCWyrQ6EJcCu8f8.QxCiOWwO3GNpH3a8o/laMN3xtC6',1,'AnHmsYbaQ5','2025-04-07 19:59:48','2025-04-07 19:59:58'),(47,'Ms. Nelle Schroeder','2025-S0046','dooley.abby@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$e5pSFPiXixPyrkhHhxVSrOXgAsZaEhCdzCuseI1Tx6nX/.yY2yGG.',1,'BzDyOf6alE','2025-04-07 19:59:48','2025-04-07 19:59:58'),(48,'Prof. Mia Jacobs I','2025-S0047','wterry@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$eBSw6SZmeDLp8hipRXxfpuuKzBrTynwa.XbIh4pioO6C112ROHyH.',1,'wk7YugoHLJ','2025-04-07 19:59:48','2025-04-07 19:59:58'),(49,'Marie Considine','2025-S0048','mollie55@example.org','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$zR315/jPLV0bN0aJhABq8.KB9quDyJPoNd2yAsJZM1k9qEhO1XVka',1,'LFSDt5Zp0I','2025-04-07 19:59:48','2025-04-07 19:59:58'),(50,'Mrs. Janae Brown','2025-S0049','xkovacek@example.com','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$FO5Cfn/g3//SmIs/0l0dten.pQ0xOnndlewcQznL2r7cvYqVz0Sl6',1,'fITS0BLPC0','2025-04-07 19:59:48','2025-04-07 19:59:58'),(51,'Ari Berge','2025-S0050','fconn@example.net','1234567890',NULL,'2025-04-07 19:59:48',NULL,'$2y$12$/CyU78L6pqZvOOewjkEWkOba6CsR5XDlv7Wj927M99SYWA0SN/5oq',1,'JlVpE1OwRN','2025-04-07 19:59:48','2025-04-07 19:59:59'),(52,'Dr. Kaden Rippin DDS','2025-S0051','deshawn.walter@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$eiISLOZ7mxEPQ2YKM/2e1e4DQjRQebZiIpWmVeRngJcoLAehodzIO',1,'TobN7D126i','2025-04-07 19:59:59','2025-04-07 19:59:59'),(53,'Winifred Conn','2025-S0052','umurazik@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$JNPY5KeFJq31aHY3hckVWesezCTKGajyro2eRBi6awfCd2B7ziFLm',1,'5ib9xG3I4k','2025-04-07 19:59:59','2025-04-07 19:59:59'),(56,'Prof. Torrey Oberbrunner DDS','2025-S0055','joanne.schinner@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$8lD64vbQeu7Rj4Q/QjwBzeyVQAbFPUzFQO.UhZVxPV.iKn9bAxIG6',1,'1iCKxcgudk','2025-04-07 20:00:00','2025-04-07 20:00:00'),(57,'Prof. Era Berge','2025-S0056','lockman.colt@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$jPD0qVYvZLcHC7luEsZI4eRy17CilYUGtxVZz4YsWNBOcAovvp1N.',1,'Sw6Y2dG7G6','2025-04-07 20:00:00','2025-04-07 20:00:00'),(59,'Dr. Doyle Trantow','2025-S0058','imccullough@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$cXT3.fTv9t1QFtMfMHZvdeOlMouNtF3SYSqDWqmKextc.pTvWAe22',1,'JTPXJlfwWR','2025-04-07 20:00:00','2025-04-07 20:00:00'),(60,'Viva Roberts','2025-S0059','rickie58@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$/Wvto2gXp/KXhz6mlETAEeEOhH7oiiQ3EpVeEoFGNBG/tEwlSkUhO',1,'QTWjSmm7fo','2025-04-07 20:00:00','2025-04-07 20:00:00'),(61,'Nash Greenfelder','2025-S0060','oconnell.august@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$E4gCjuOLNkj9X.TwY.X9luPNjRRPKE.ZCdCaR0yI49hz6hJI268sq',1,'LPjAf9PTiD','2025-04-07 20:00:01','2025-04-07 20:00:01'),(62,'Dr. Trevion Emmerich','2025-S0061','rhaley@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ssZEVCzEhdRMjj26wc3FQeyFmkl16js2dysTmwgUe9z9kfiKVfEsW',1,'FpCskSP8k8','2025-04-07 20:00:01','2025-04-07 20:00:01'),(63,'Ms. Madie Ortiz','2025-S0062','misael.shields@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$HtpfldRYQIJ1OWJx/IcUtOJcFutSf9rE.JP.6xM8B0MVKOKfJ1gga',1,'1NvzlHM06q','2025-04-07 20:00:01','2025-04-07 20:00:01'),(64,'Mrs. Breanne Rice Jr.','2025-S0063','xgibson@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$dMZy6.Q5rVUX9N.sRNsrmeJZ9MxFO6bCtxGyDAkJuBuD9HmA/JCU.',1,'0V3u0DNH93','2025-04-07 20:00:01','2025-04-07 20:00:01'),(65,'Miss Katrine Anderson','2025-S0064','urowe@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$7yXmAa1pvpR14TwQsroDnu4GRu1slllFD.EzN/3GyhcmVDvXC7BOq',1,'w8wHIjrwRe','2025-04-07 20:00:01','2025-04-07 20:00:01'),(66,'Mose Denesik','2025-S0065','mwilderman@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$cSEoFOTUee.ZXiiXepIjN.jlMU2R8wVqBK46C28KRtUpj9LSAkcry',1,'1t52dOW1YQ','2025-04-07 20:00:02','2025-04-07 20:00:02'),(67,'Melyssa McClure','2025-S0066','fahey.thea@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$pw6VgExmQa9hhZwWB.BZ8uu2iwJjZeQ1sqQqhG8Q7fBqE9UIr7aye',1,'h0HAv0ZwW3','2025-04-07 20:00:02','2025-04-07 20:00:02'),(68,'Dr. Alvena Rosenbaum Jr.','2025-S0067','bergstrom.mckenna@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$xxvnEef52PydpirZ.HRax.C.iG26E7wyj2MIrgFV8vzrdzcKndE9W',1,'ynTiIHNG6C','2025-04-07 20:00:02','2025-04-07 20:00:02'),(69,'Ezra Connelly MD','2025-S0068','ukreiger@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$jfPOLsxrIaYpZG4Z6qaxJeGBImOZsO6NVgDlVjqQIFsdXCpX1Rbl2',1,'S2cAcUAuEO','2025-04-07 20:00:02','2025-04-07 20:00:02'),(70,'Anastasia Cruickshank','2025-S0069','earnestine83@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$MEVmr3t2oGRlgzSNBLtbEewRfoyoHVkhPDC..UH8vRJ09C.xMo4uy',1,'dkCO7j4phf','2025-04-07 20:00:02','2025-04-07 20:00:02'),(71,'Dr. Destiny Kuvalis','2025-S0070','orie35@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$5cNyCiSN3zZplgPZfse0D.0.BlkoNp1hFT7aTuRnIPOClShzAEDUy',1,'hL1clWpLAg','2025-04-07 20:00:03','2025-04-07 20:00:03'),(72,'Jaunita Wolf II','2025-S0071','odie40@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$97RLqyHcSPJpEzI8v88/XuDGkSEw5U6Pghu3iTaNXZHoFjrGJWNae',1,'tLY2XWBBwL','2025-04-07 20:00:03','2025-04-07 20:00:03'),(73,'Prof. Joshuah Rohan IV','2025-S0072','darby.wyman@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$gLkXC4/fl9ESvSCoSUJyZO8T.wDrTc09gNh80JNNPcRU/.rscSm76',1,'VpauxYJuQb','2025-04-07 20:00:03','2025-04-07 20:00:03'),(74,'Jazmin Emard','2025-S0073','brant58@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$pHl5j1VnOJKIUy/aOWZIPeWlvQgDKixqEChVT1Y42pQQkVx3b8eZK',1,'aC6vQSOZJ8','2025-04-07 20:00:03','2025-04-07 20:00:03'),(75,'Stephania Mayer','2025-S0074','annie52@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ynKBneqRh0CtBu3vB7DTBeB.fiAZc5wX5OQvApByBhj1yQ1otxG5q',1,'iEuMOOKMPV','2025-04-07 20:00:04','2025-04-07 20:00:04'),(76,'Margaret Gutmann','2025-S0075','hkunze@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$KZHdCPRvzxcbIXlGJuPs4OfhTVVizpHJjWpsI3H9hBtiKMhgdrGrq',1,'tdNmYN1iLx','2025-04-07 20:00:04','2025-04-07 20:00:04'),(77,'Noemi Lebsack','2025-S0076','fabian14@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ftfGYldCdMeOKZWq4hTb1OXwuUiSdXMmylhh1PckVLi1q4cSnQPXa',1,'wvdnHvFcVn','2025-04-07 20:00:04','2025-04-07 20:00:04'),(78,'Marge Swaniawski','2025-S0077','june17@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$7l8AFApM2VRloygEhglkQuUR05ZlCGC24dVXf7W6rx8l16CfaFqPS',1,'GaZIsSC07m','2025-04-07 20:00:04','2025-04-07 20:00:04'),(79,'Dr. Jasen Fadel','2025-S0078','sabrina.murazik@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$3My/AXu0pLcankHWwcbUWeK6HLaxZkXFXDvxqjD58aB.0lXSESwHC',1,'8io0gNqLqC','2025-04-07 20:00:04','2025-04-07 20:00:04'),(80,'Mrs. Evelyn Schultz DDS','2025-S0079','katlynn98@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$N68.T18pLTRuUgl55F5oO.MZnwNqBPFqE6bVVTmASKedWoU8R5t9O',1,'84AhyDPXhF','2025-04-07 20:00:05','2025-04-07 20:00:05'),(81,'Dr. Darius Wiegand MD','2025-S0080','kyla.dickens@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$9vJOIP5pPzOVyzA0zhYCCef5/2piiNRlFdW98BC1/yRJQ0AJespAG',1,'CsUDxizAhp','2025-04-07 20:00:05','2025-04-07 20:00:05'),(82,'Ova Smith Jr.','2025-S0081','montana.kuhic@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$tSzZAKVxDh.QENxGrmAGgu6uX9iAY3NMkBp8s/a/0CHhQ1UjcS.sG',1,'Ao2umuvvfz','2025-04-07 20:00:05','2025-04-07 20:00:05'),(83,'Dr. Camden Beier I','2025-S0082','ebosco@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$RZ9REfyCfmlBGD4BaMsA4uUj/x83im.8fOlvaR9pBdZranJ10IP3W',1,'KK97GV1obK','2025-04-07 20:00:05','2025-04-07 20:00:05'),(84,'Bulah Kub','2025-S0083','lratke@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$.hO4SEhDukp8jlxvpmFZUOnumMrFOmM2daVSA3JDpHFbsRrJQcKwq',1,'6dEB7bEsID','2025-04-07 20:00:05','2025-04-07 20:00:05'),(85,'Keshawn Wunsch','2025-S0084','jerde.mossie@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$OMGWEG9i1ls72oQnrZ2ILu.S4mRZuQ1pcF2Gex.1TFAFR7bvhcwjS',1,'bx7cVztHwR','2025-04-07 20:00:06','2025-04-07 20:00:06'),(86,'Jeffrey Tremblay','2025-S0085','katlynn63@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$l1Nmz3dvINiH7y2T8iiuBOSpgg6Shlp8k0b3wd.tSgqGslTI38Qga',1,'urj0MzOsx0','2025-04-07 20:00:06','2025-04-07 20:00:06'),(87,'Rigoberto Skiles','2025-S0086','jerel58@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$rVYf5C0.bzdVHGu4kXsm3O136OS.yrtt9gVbMZPxP859tU.ONk612',1,'EexO2dd0ko','2025-04-07 20:00:06','2025-04-07 20:00:06'),(88,'Laurie Towne','2025-S0087','hettie38@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$8G2.AfkaUvHNVl1GACNjNOSJ4jwESN.KXlFj5vXxtVvvcEj2iTfte',1,'3V8eLvZVMv','2025-04-07 20:00:06','2025-04-07 20:00:06'),(89,'Lewis Oberbrunner','2025-S0088','kub.sedrick@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$Rc.ESLJosIGv1iFjA2SlNuLpec98n0M/SdmPjOrtVNHJFTN7gfpUG',1,'KXzM55CqEX','2025-04-07 20:00:06','2025-04-07 20:00:06'),(90,'Okey Hill','2025-S0089','blangosh@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$8yC76Px/po24d/f/jkurUOulyVmtvWLXvd4UxiTdeFbu3FfrP6.H2',1,'mOpmvNjYCK','2025-04-07 20:00:07','2025-04-07 20:00:07'),(91,'Estefania Gleason','2025-S0090','vnicolas@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$hiJwdeEnx9ggtCEyWJiUc./zr2bhBFOwVcbZdSVC4Gg4cmSw5aJei',1,'XOgFDIo0Ws','2025-04-07 20:00:07','2025-04-07 20:00:07'),(92,'Katarina Gleichner','2025-S0091','margie.kuhic@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$Knbaw/ZLzvebQsRN8M2/PO6sXGS/wirdmUWesceIRPujgLORrOqSu',1,'GO2WeeMdR3','2025-04-07 20:00:07','2025-04-07 20:00:07'),(93,'Courtney Tillman','2025-S0092','ariel.pouros@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$4ErFIVSJXh2X7cHZ5liPl.KKM.qPP1ddmcv9H9PwAhIGgv0WYexWu',1,'wT20kyy3gM','2025-04-07 20:00:07','2025-04-07 20:00:07'),(94,'Prof. Isidro Smitham IV','2025-S0093','gmckenzie@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$yTll5Qh7uuQdSjeJWVxhgOQ3ZHfFiPXiDAZzYfZND/9GD4uan9bau',1,'IrJ5SARjuC','2025-04-07 20:00:07','2025-04-07 20:00:07'),(95,'Carlie Huel MD','2025-S0094','medhurst.timmy@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$SZYOZfkDjND2yxVU8XB6PO3/knYWqa3v4AFgolSuTs9CnX2oJIhhu',1,'zPbGuhFQZo','2025-04-07 20:00:08','2025-04-07 20:00:08'),(96,'Rosa Rosenbaum','2025-S0095','bratke@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$CKaWVGRVxsn7SbcUQlMCnuW1JE8RXx4yQ3cfu7zKPArP1UJeb6K1G',1,'ImOwWB4MRG','2025-04-07 20:00:08','2025-04-07 20:00:08'),(97,'Fiona Pacocha','2025-S0096','verla76@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$DK1vPwJ3epKNMjDxULZteu.f.Gan16X.yC3l0w5sadCeb20lzhesC',1,'CuxW1tbZwz','2025-04-07 20:00:08','2025-04-07 20:00:08'),(98,'Titus Daniel MD','2025-S0097','barrows.zackery@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$rFAIcnD42aWuJb8e2hNlEeftEIfbo/RFLssR6QXW99TCiVU2Z1H6e',1,'ZITqOgb2Ya','2025-04-07 20:00:08','2025-04-07 20:00:08'),(99,'Fanny Kuhn','2025-S0098','alena.wuckert@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$xLtvxR04XTWRUZ457US/vea.wqXV0OaJDCG1rA8.2y.qjwUpuoumO',1,'DOuAThUUVt','2025-04-07 20:00:08','2025-04-07 20:00:08'),(100,'Abbie Strosin','2025-S0099','donato.hills@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$8oOdRyXJh97Tx6uMoPlxEe3hIHRzvs8lv0DswNcRKk5KyqgIkMB4m',1,'k6KJtnufHV','2025-04-07 20:00:09','2025-04-07 20:00:09'),(101,'Mose Miller','2025-S0100','sdare@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ruUbfdS7.siRjRUST8kZjuzVHrB01ibiCY5Tw.b70TGPpVMZFZUeO',1,'DZBS4MLprD','2025-04-07 20:00:09','2025-04-07 20:00:09'),(102,'Berta O\'Kon Jr.','2025-S0101','elias.ruecker@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$JP2NwRGDPFhKzKz1YaeVPu9EDFtPYmPHmel0K5hqKLyQq583v8sMq',1,'O5ADjHstZH','2025-04-07 20:00:09','2025-04-07 20:00:09'),(103,'Shawna Wiza','2025-S0102','koch.daisha@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$1WDNlKOWtTHU20irtv7w2uvvUsDHeCbizz7kXYsD18ZK2zeVBBNj.',1,'NGikWZPBrC','2025-04-07 20:00:09','2025-04-07 20:00:09'),(104,'Mr. Adalberto Schimmel PhD','2025-S0103','ustoltenberg@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$jVL4vEz1EkMcCQTZeNqqN.woz.O0okIxbAP4IWFpLXD2O66ewLbBS',1,'7IE9pXNHtt','2025-04-07 20:00:09','2025-04-07 20:00:09'),(105,'Neoma Doyle','2025-S0104','prohaska.cameron@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$lZeoZjIo9jJ9rWZvD0EFheHz1OjAQdVwxUyXvLl34JzQK4f.mSiW.',1,'1uajYXyWCJ','2025-04-07 20:00:10','2025-04-07 20:00:10'),(106,'Sydney Olson','2025-S0105','rschmitt@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$XxlE7psSMx/OE76fWweqW.530KuuOtiWU.SS67atS2l9lGpBy.bui',1,'kakeHkPVqI','2025-04-07 20:00:10','2025-04-07 20:00:10'),(107,'Mr. Rhiannon Kovacek','2025-S0106','loraine94@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$z4GQIlkNvDXXYbQz1z8yBOoqG74ZBhstV/jNSs6Vbn8E687QVDtxi',1,'49q62lA6kS','2025-04-07 20:00:10','2025-04-07 20:00:10'),(108,'Dr. Marcus Rohan DDS','2025-S0107','rey54@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$TdL8N99r4Sk0jWbuBMnEW.Ps1Otx9/lYQM3B1gvHA6EgmshfTqLyu',1,'1FG85ihk02','2025-04-07 20:00:10','2025-04-07 20:00:10'),(109,'Dr. Haley Schowalter Sr.','2025-S0108','brian34@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$h10yFsl6iRO5pUIY5Zu1x.piRkPAUrB6/l1zIrp0T0ZEzYvKDbPc.',1,'kDCkBp0YBG','2025-04-07 20:00:11','2025-04-07 20:00:11'),(110,'Icie Hamill','2025-S0109','rath.westley@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$6Piw91vTMOZec5FUwWaxiuMzL28lamK5xDM6f3DFamQKEiDrJR9m.',1,'edBcR0SD0u','2025-04-07 20:00:11','2025-04-07 20:00:11'),(111,'Luis Wehner','2025-S0110','xeffertz@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$acVgtpXEBj6ALOYTKJoS.u6ALcKsj3IuBpLZALzlPKPjKajRwQ44a',1,'atk95zJWZJ','2025-04-07 20:00:11','2025-04-07 20:00:11'),(112,'Ms. Marie Torp DVM','2025-S0111','gregg78@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$wJjetVu2GtdPc1i6WE1ZGOCcbWiKrWSbGqIFPxjo1vz5Ov/yn.Paq',1,'9JrJsHBD3k','2025-04-07 20:00:11','2025-04-07 20:00:11'),(113,'Deshawn Turner','2025-S0112','jfritsch@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$0NOxIrqoVqMOeRYglPUwhOd88gEdJGS0cwowWfo1yOQmATc1KDCQq',1,'O3yxQJJ5Br','2025-04-07 20:00:11','2025-04-07 20:00:11'),(114,'Alanna Hirthe','2025-S0113','maymie.leuschke@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$S4y4MnfoZWISSKfAIGicyuT7JZSYe18sJu3fW5PzIhc900AsUKffK',1,'CiMKf29KDi','2025-04-07 20:00:12','2025-04-07 20:00:12'),(115,'Liana Cronin','2025-S0114','kathryn66@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ye2fyF4inolgIwczsZQkSuAWRu7y.lBxKR5MEB3T8lEoje0fUyiAm',1,'AAlRwoyGjU','2025-04-07 20:00:12','2025-04-07 20:00:12'),(116,'Elton Stiedemann','2025-S0115','efunk@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$YA/LIlLBTM.W0na8h1tRjOPV2CKgPFXAvWtm07iz/34uTuWJis1AG',1,'zCE3a8v0xJ','2025-04-07 20:00:12','2025-04-07 20:00:12'),(117,'Dr. Columbus Considine','2025-S0116','eliezer24@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$OFqZlsbMdVU.lC3BqgvLxewiiteV2uXYb1SSxY7vsyAi524Y53XT2',1,'krtGWITZBw','2025-04-07 20:00:12','2025-04-07 20:00:12'),(118,'Mrs. Sydnee Robel','2025-S0117','deron00@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$bigkhoJIXqHNOKjnuqdvTu0h9mwq2biSNXpT014f4tkwCu2SCvw3G',1,'5jX3zbFF1g','2025-04-07 20:00:12','2025-04-07 20:00:12'),(119,'Dillon Robel Sr.','2025-S0118','goyette.jaqueline@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$3t4EZgqvimPx0isZtI8XzulXFyfs9/FZtwN4x4Es4fUrp8CrTTvOS',1,'Nr7d64qnKf','2025-04-07 20:00:13','2025-04-07 20:00:13'),(120,'Edmund Hermiston','2025-S0119','conroy.rolando@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$TCcuXwS1xJlXMi2WDg72MeYO8ktLC656Lsh1Gtz9m4kEWUUgDC/Bi',1,'dy2vJq0w0V','2025-04-07 20:00:13','2025-04-07 20:00:13'),(121,'Alva Schmidt','2025-S0120','kkirlin@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$06hzIi7EGEvRx7awHmhEwuOKNn7in04MmiA8GXs4UKCBexKm1rgZW',1,'6lJBULKqgv','2025-04-07 20:00:13','2025-04-07 20:00:13'),(122,'Ted Conn','2025-S0121','moore.paris@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$Aowa1FtWlhkiUEfLksBKMODy2XZHaHdpsExh.Rjm3VgkeCpj6r2nu',1,'D1gvIm3mX0','2025-04-07 20:00:13','2025-04-07 20:00:13'),(123,'Serenity Hyatt','2025-S0122','hglover@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$C/EGqpqJGqC4RLMFPTmKzONayYWq93BPuCabPuqEN1ZGmWbp.gPDe',1,'GRHpJ162nH','2025-04-07 20:00:13','2025-04-07 20:00:13'),(124,'Soledad Macejkovic IV','2025-S0123','toni32@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$uzRA0pvww42Vw/K4JWfLJun2898M43nbUR/YxsR3jjBVmHXFv4C26',1,'zHW5AsR0GS','2025-04-07 20:00:14','2025-04-07 20:00:14'),(125,'Cheyenne Harvey V','2025-S0124','hchamplin@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$7Mw072hX0kNVmPuS2yS5yOFGoRpZfJcIHX/4u969TCZKL8A5Mxx3e',1,'rn6Ldhlulq','2025-04-07 20:00:14','2025-04-07 20:00:14'),(126,'Donald Heathcote','2025-S0125','dickens.jessyca@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$OJskT0tBOd3AXO0Iah6z7u9L3x0NIkPT5wid76NFQLr11wjNSJZji',1,'oEgTK5gON8','2025-04-07 20:00:14','2025-04-07 20:00:14'),(127,'Ms. Tracy Hegmann','2025-S0126','rupert.cronin@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$3lsfaJQvPxDvljib144ZPeBnjNGkM0jJOT7HQLOQMy8iNNn0ps4RS',1,'56zaOUAIFy','2025-04-07 20:00:14','2025-04-07 20:00:14'),(128,'Webster Armstrong Jr.','2025-S0127','neoma84@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$E51s3YHbJfTQbrvD293sVeHNE8Yrha.itnp4IgTdfh7HkgIMWtLqO',1,'BhfA8FzvuD','2025-04-07 20:00:14','2025-04-07 20:00:14'),(129,'Glenna Weber','2025-S0128','kirstin.buckridge@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$BJurTp9PLpZL2wnTVnMUOuOqkL3mElIJvQ4Kmtfdb8wBzB3KzRUOy',1,'k2dmn5dija','2025-04-07 20:00:15','2025-04-07 20:00:15'),(130,'Salma Kilback','2025-S0129','pablo.little@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$9baYburRxArzyOiCBBUxFeJXgyHchzNYrtsYKKCNq2VoVq/jYgPHW',1,'Z8sCVXGU2u','2025-04-07 20:00:15','2025-04-07 20:00:15'),(131,'Danny Roberts','2025-S0130','fmcclure@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$o.0GpKG3OncU3l4tGaU3iePGH97IRJ6j9/wtUr6rWxBRBnfkYdYmy',1,'9ToCMA2NhH','2025-04-07 20:00:15','2025-04-07 20:00:15'),(132,'Alan Altenwerth','2025-S0131','karine.bartoletti@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ZPrsUSa8aCJ9mjns3H.1JeM3K9uvkwPLYo.jVrhTHQJGnqYFikEkK',1,'VPYCIVVxyx','2025-04-07 20:00:15','2025-04-07 20:00:15'),(133,'Carter Russel','2025-S0132','fpurdy@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$iGRIB4jgZmVJcj17PjI2BOVQDgdVtT8UqFrEW.DwWn4WPJobPPfZa',1,'h977k4FsFs','2025-04-07 20:00:15','2025-04-07 20:00:15'),(134,'Major Barton DVM','2025-S0133','maxwell62@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$7t/Ul920hRjGhopJEF0yq.1Au7xKJ4xt6LdkXSkEQxOKtaBV8CC3K',1,'uNNXIRC9CL','2025-04-07 20:00:16','2025-04-07 20:00:16'),(135,'Maximo Brekke','2025-S0134','carlo.monahan@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$LKEXHzzI18y7MmcV4iDhdO8tFkfyn0PBGyaJ6OQ/vYIoql4nMvzLy',1,'5YqQcA3hlg','2025-04-07 20:00:16','2025-04-07 20:00:16'),(136,'Bernard Kling','2025-S0135','treutel.brycen@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$ZuFz9F5Wcu1HwFCWSKroW.Skumj4SO7pYM/FW9hfNpOr.oCBnrt2G',1,'kcoR0RAtBs','2025-04-07 20:00:16','2025-04-07 20:00:16'),(137,'Zachery Lowe','2025-S0136','bergstrom.grant@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$SNRjLoSDgf.UqjDQ4EPR9ekesnah.UQtJVyhQR.jHQDkXCCwVeYG6',1,'gVZ0A9zahj','2025-04-07 20:00:16','2025-04-07 20:00:16'),(138,'Miss Juana Stanton','2025-S0137','kbrakus@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$D8JzIaWDzjohWhlA5Dz86OjrrmSxNBp4FPLK.e78GUhhNQ1DqBz7m',1,'aU3hQJfOfM','2025-04-07 20:00:16','2025-04-07 20:00:16'),(139,'Jose Fay','2025-S0138','dennis90@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$9WEjxE5.0rSxTaFMrJi27uEXxCHz49YE8wTObYkpXsS7VStUxu3rK',1,'zGPbtbl2eg','2025-04-07 20:00:17','2025-04-07 20:00:17'),(140,'Prof. Oleta Gutkowski PhD','2025-S0139','prohaska.oliver@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$prQigBdsDThaPtkuZqW2COMDvGAOO82ZlO5NROyAF07wQcN9fvVpW',1,'EHR1EUS2JY','2025-04-07 20:00:17','2025-04-07 20:00:17'),(141,'Mr. Ronny Lang','2025-S0140','ellen.miller@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$An9UcHqe31W9S/HZG8xbd.1IWNkK1ciNj7HArebwGwxe4xYXgUQNq',1,'OcFp27c6GO','2025-04-07 20:00:17','2025-04-07 20:00:17'),(142,'Wilmer Hayes','2025-S0141','kendall67@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$zY5rSegoLwwEvoPTGlXpdeXHbrVEFhgCvcI8FCxxVEcMKB3ItZYJi',1,'hOb5k6fUC7','2025-04-07 20:00:17','2025-04-07 20:00:17'),(144,'Mrs. Claudie Kub Sr.','2025-S0143','lelah97@example.org','234235',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$1i1dazm83i9RHE2n20RBJOEIXNGmhkm7Erog2G0J/iYhd9rzSBymK',1,'Ed8LN2ulqo','2025-04-07 20:00:18','2025-04-10 11:56:01'),(145,'Rhoda Marquardt','2025-S0144','mafalda69@example.org','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$cPXB6YSuGX9.LMYOesiV3OwPtkKmZ732Uoi8nWl0WPCpXa5SiA9Ou',1,'KdVQP7BU13','2025-04-07 20:00:18','2025-04-07 20:00:18'),(146,'Dr. Abdiel Kuhic V','2025-S0145','wcorwin@example.net','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$Soky5r2TTa2JHF51uf7dou5f5m7nOVFKRpAajL33kPXR6.3GwyFSu',1,'cL9rwmsxRE','2025-04-07 20:00:18','2025-04-07 20:00:18'),(147,'Clementine Haley','2025-S0146','ayana85@example.com','1234567890',NULL,'2025-04-07 19:59:59',NULL,'$2y$12$4XJ4ia9gCHsQ57AOKmHhQOmQNhCuUE8CKoCwGd9WXt8j/xMSOWtYi',1,'exsk3UkSqY','2025-04-07 20:00:18','2025-04-07 20:00:18'),(153,'Rifat Hasna','2025-S0147',NULL,'599',NULL,NULL,'1744257897.webp','$2y$12$OBel2VkgaMStJK6m97wVBOzBlA595tysknHQ/2uCQyz28c0HpqwDC',1,NULL,'2025-04-10 04:04:57','2025-04-10 04:05:13'),(154,'Cruz Guy','2025-T0001',NULL,'791',NULL,NULL,'1744258037.webp','$2y$12$NVykUvbkwttFMVlzEI2g2.R9wo8Lr6VuQtSHqrGkVBXlvyfWoRHea',1,NULL,'2025-04-10 04:07:17','2025-04-10 04:07:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Dumping routines for database 'madrasha_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 16:36:59
