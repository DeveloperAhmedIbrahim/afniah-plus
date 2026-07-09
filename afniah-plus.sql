-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: afniah_plus
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.3

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
-- Table structure for table `about_heroes`
--

DROP TABLE IF EXISTS `about_heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_heroes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_heroes`
--

LOCK TABLES `about_heroes` WRITE;
/*!40000 ALTER TABLE `about_heroes` DISABLE KEYS */;
INSERT INTO `about_heroes` VALUES (1,'{\"en\":\"About Us\",\"ar\":\"\\u0645\\u0646 \\u0646\\u062d\\u0646\"}','{\"en\":\"Rooted in heritage, guided by passion.\",\"ar\":\"\\u0645\\u062a\\u062c\\u0630\\u0631\\u0648\\u0646 \\u0641\\u064a \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b\\u060c \\u0648\\u0646\\u0633\\u064a\\u0631 \\u0628\\u0634\\u063a\\u0641.\"}','{\"en\":\"uploads\\/abouts\\/hero\\/1766324383.jpg\",\"ar\":\"uploads\\/abouts\\/hero\\/1766324421.jpg\"}','2025-12-21 08:33:52','2025-12-21 08:40:21');
/*!40000 ALTER TABLE `about_heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_team_galleries`
--

DROP TABLE IF EXISTS `about_team_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_team_galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_team_galleries`
--

LOCK TABLES `about_team_galleries` WRITE;
/*!40000 ALTER TABLE `about_team_galleries` DISABLE KEYS */;
INSERT INTO `about_team_galleries` VALUES (3,'{\"en\":\"Abdullah Al-Naim\",\"ar\":\"\\u0639\\u0628\\u062f\\u0627\\u0644\\u0644\\u0647 \\u0627\\u0644\\u0646\\u0639\\u064a\\u0645\"}','{\"en\":\"General Manager\",\"ar\":\"\\u0627\\u0644\\u0645\\u062f\\u064a\\u0631 \\u0627\\u0644\\u0639\\u0627\\u0645\"}','{\"en\":\"uploads\\/abouts\\/team\\/1766340951.jpg\",\"ar\":\"uploads\\/abouts\\/team\\/1766341276.jpg\"}','2025-12-21 13:15:51','2025-12-21 13:21:16'),(4,'{\"en\":\"Abdullah Boshlibi\",\"ar\":\"\\u0639\\u0628\\u062f\\u0627\\u0644\\u0644\\u0647 \\u0628\\u0648\\u0634\\u0644\\u064a\\u0628\\u064a\"}','{\"en\":\"Cheif Executive Officer\",\"ar\":\"\\u0627\\u0644\\u0631\\u0626\\u064a\\u0633 \\u0627\\u0644\\u062a\\u0646\\u0641\\u064a\\u0630\\u064a\"}','{\"en\":\"uploads\\/abouts\\/team\\/1766341726.jpg\",\"ar\":\"uploads\\/abouts\\/team\\/1766341820.jpg\"}','2025-12-21 13:28:46','2025-12-21 13:30:20'),(5,'{\"en\":\"Mohammad barada\",\"ar\":\"\\u0645\\u062d\\u0645\\u062f \\u0628\\u0631\\u0627\\u062f\\u0629\"}','{\"en\":\"Technical Manager\",\"ar\":\"\\u0627\\u0644\\u0645\\u062f\\u064a\\u0631 \\u0627\\u0644\\u0641\\u0646\\u064a\"}','{\"en\":\"uploads\\/abouts\\/team\\/1766341764.jpg\",\"ar\":\"uploads\\/abouts\\/team\\/1766341858.jpg\"}','2025-12-21 13:29:24','2025-12-21 13:30:58');
/*!40000 ALTER TABLE `about_team_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_teams`
--

DROP TABLE IF EXISTS `about_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_teams` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_teams`
--

LOCK TABLES `about_teams` WRITE;
/*!40000 ALTER TABLE `about_teams` DISABLE KEYS */;
INSERT INTO `about_teams` VALUES (1,'{\"en\":\"Meet the Visionaries Behind Afniah\",\"ar\":\"\\u062a\\u0639\\u0631\\u0641 \\u0639\\u0644\\u0649 \\u0631\\u0648\\u0627\\u062f \\u0623\\u0641\\u0646\\u064a\\u0629\"}','{\"en\":\"A passionate team of cultural experts, researchers, and creatives dedicated to preserving Saudi heritage through innovative storytelling and world-class documentation.\",\"ar\":\"\\u0641\\u0631\\u064a\\u0642 \\u0634\\u063a\\u0648\\u0641 \\u0645\\u0646 \\u0627\\u0644\\u062e\\u0628\\u0631\\u0627\\u0621 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u064a\\u0646 \\u0648\\u0627\\u0644\\u0628\\u0627\\u062d\\u062b\\u064a\\u0646 \\u0648\\u0627\\u0644\\u0645\\u0628\\u062f\\u0639\\u064a\\u0646\\u060c \\u064a\\u0639\\u0645\\u0644\\u0648\\u0646 \\u0639\\u0644\\u0649 \\u062d\\u0641\\u0638 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b \\u0627\\u0644\\u0633\\u0639\\u0648\\u062f\\u064a \\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u0627\\u0644\\u0633\\u0631\\u062f \\u0627\\u0644\\u0625\\u0628\\u062f\\u0627\\u0639\\u064a \\u0648\\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0628\\u0645\\u0639\\u0627\\u064a\\u064a\\u0631 \\u0639\\u0627\\u0644\\u0645\\u064a\\u0629.\"}','2025-12-21 12:03:39','2025-12-23 05:54:22');
/*!40000 ALTER TABLE `about_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_visions`
--

DROP TABLE IF EXISTS `about_visions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_visions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_visions`
--

LOCK TABLES `about_visions` WRITE;
/*!40000 ALTER TABLE `about_visions` DISABLE KEYS */;
INSERT INTO `about_visions` VALUES (1,'{\"en\":\"Our Vision\",\"ar\":\"\\u202b\\u0631\\u0624\\u064a\\u062a\\u0646\\u0640\\u0640\\u0640\\u0640\\u0627\\u202c\"}','{\"en\":\"<p>To become the premier national reference in the development of specialized creative and documentary content, by offering cognitive and visual solutions that elevate the standards of cultural and institutional communication in the Kingdom.\\r\\n<\\/p><p><br><\\/p><p>\\r\\nWe aspire to craft content that contributes to preserving national memory and enhancing the value of local identity using methods consistent with global best practices in design, publishing, and documentation, without losing touch with its cultural roots.<\\/p>\",\"ar\":\"<p>\\u0623\\u0646 \\u0646\\u0635\\u0628\\u062d \\u0627\\u0644\\u0645\\u0631\\u062c\\u0639 \\u0627\\u0644\\u0648\\u0637\\u0646\\u064a \\u0627\\u0644\\u0623\\u0648\\u0644 \\u0641\\u064a \\u0645\\u062c\\u0627\\u0644 \\u062a\\u0637\\u0648\\u064a\\u0631 \\u0627\\u0644\\u0645\\u062d\\u062a\\u0648\\u0649 \\u0627\\u0644\\u0625\\u0628\\u062f\\u0627\\u0639\\u064a \\u0648 \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642\\u064a \\u0627\\u0644\\u0645\\u062a\\u062e\\u0635\\u0635\\u060c \\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u062a\\u0642\\u062f\\u064a\\u0645 \\u062d\\u0644\\u0648\\u0644 \\u0645\\u0639\\u0631\\u0641\\u064a\\u0629 \\u0648\\u0628\\u0635\\u0631\\u064a\\u0629 \\u062a\\u0631\\u062a\\u0642\\u064a \\u0628\\u0645\\u0639\\u0627\\u064a\\u064a\\u0631 \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a \\u0648 \\u0627\\u0644\\u0645\\u0624\\u0633\\u0633\\u064a \\u0641\\u064a \\u0627\\u0644\\u0645\\u0645\\u0644\\u0643\\u0629.\\r\\n<\\/p><p><br><\\/p><p>\\r\\n\\u202b\\u0646\\u0637\\u0645\\u062d \\u0625\\u0644\\u0649 \\u0635\\u064a\\u0627\\u063a\\u0629 \\u0645\\u062d\\u062a\\u0648\\u0649 \\u064a\\u0633\\u0647\\u0645 \\u0641\\u064a \\u062d\\u0641\\u0638 \\u0627\\u0644\\u0630\\u0627\\u0643\\u0631\\u0629 \\u0627\\u0644\\u0648\\u0637\\u0646\\u064a\\u0629\\u060c \\u0648\\u064a\\u0639\\u0632\\u0632 \\u0645\\u0646 \\u0642\\u064a\\u0645\\u0629 \\u0627\\u0644\\u0647\\u0648\\u064a\\u0629 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a\\u0629 \\u0628\\u0623\\u0633\\u0627\\u0644\\u064a\\u0628 \\u062a\\u0646\\u0633\\u062c\\u0645 \\u0645\\u0639 \\u0623\\u0641\\u0636\\u0644 \\u0627\\u0644\\u0645\\u0645\\u0627\\u0631\\u0633\\u0627\\u062a \\u0627\\u0644\\u0639\\u0627\\u0644\\u0645\\u064a\\u0629 \\u0641\\u064a \\u0627\\u0644\\u062a\\u0635\\u0645\\u064a\\u0645\\u060c \\u0627\\u0644\\u0646\\u0634\\u0631\\u060c \\u0648\\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642\\u060c \\u062f\\u0648\\u0646 \\u0623\\u0646 \\u062a\\u0641\\u0642\\u062f \\u0627\\u0631\\u062a\\u0628\\u0627\\u0637\\u0647\\u0627 \\u0628\\u062c\\u0630\\u0648\\u0631\\u0647\\u0627 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629.\\u202c<\\/p>\"}','{\"en\":\"uploads\\/abouts\\/vision\\/1766333569.jpg\",\"ar\":\"uploads\\/abouts\\/vision\\/1766333765.jpg\"}','2025-12-21 11:05:36','2025-12-23 12:05:06');
/*!40000 ALTER TABLE `about_visions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_voice_bullets`
--

DROP TABLE IF EXISTS `about_voice_bullets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_voice_bullets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_voice_bullets`
--

LOCK TABLES `about_voice_bullets` WRITE;
/*!40000 ALTER TABLE `about_voice_bullets` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_voice_bullets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_voices`
--

DROP TABLE IF EXISTS `about_voices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_voices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `toptitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_voices`
--

LOCK TABLES `about_voices` WRITE;
/*!40000 ALTER TABLE `about_voices` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_voices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_we_ares`
--

DROP TABLE IF EXISTS `about_we_ares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_we_ares` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_we_ares`
--

LOCK TABLES `about_we_ares` WRITE;
/*!40000 ALTER TABLE `about_we_ares` DISABLE KEYS */;
INSERT INTO `about_we_ares` VALUES (1,'{\"en\":\"Who We Are?\",\"ar\":\"\\u0645\\u0646 \\u0646\\u062d\\u0646\"}','{\"en\":\"<p>Afniah+ is a Saudi company specializing in content development, documentation, and creative design. It combines research thinking and visual innovation to produce works with a profound intellectual dimension and high cultural value. We don\\u203at just provide implementation services; we also act as a strategic partner, helping shape corporate messages and enhance the presence of our clients\\u203a visual and linguistic identities in a rapidly competitive landscape.<\\/p><p><br><\\/p><p>\\r\\nWe offer integrated solutions that include writing and editing, graphic design, visual and audio production, art di- rection, and printing, using flexible work methods based on international best practices in the fields of corporate publishing and cultural and media documentation.\\r\\nOur work targets cultural and official entities, educational institutions, national initiatives, and private sector projects that require rich and accurate content that takes into account the local context and meets international standards.<\\/p>\",\"ar\":\"<p>\\u0623\\u0641\\u0646\\u064a\\u0629+ \\u0647\\u064a \\u0634\\u0631\\u0643\\u0629 \\u0633\\u0639\\u0648\\u062f\\u064a\\u0629 \\u0645\\u062a\\u062e\\u0635\\u0635\\u0629 \\u0641\\u064a \\u062a\\u0637\\u0648\\u064a\\u0631 \\u0627\\u0644\\u0645\\u062d\\u062a\\u0648\\u0649 \\u0648\\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0648\\u0627\\u0644\\u062a\\u0635\\u0645\\u064a\\u0645 \\u0627\\u0644\\u0625\\u0628\\u062f\\u0627\\u0639\\u064a. \\u062a\\u062c\\u0645\\u0639 \\u0628\\u064a\\u0646 \\u0627\\u0644\\u062a\\u0641\\u0643\\u064a\\u0631 \\u0627\\u0644\\u0628\\u062d\\u062b\\u064a \\u0648\\u0627\\u0644\\u0627\\u0628\\u062a\\u0643\\u0627\\u0631 \\u0627\\u0644\\u0628\\u0635\\u0631\\u064a \\u0644\\u0625\\u0646\\u062a\\u0627\\u062c \\u0623\\u0639\\u0645\\u0627\\u0644 \\u0630\\u0627\\u062a \\u0628\\u064f\\u0639\\u062f \\u0641\\u0643\\u0631\\u064a \\u0639\\u0645\\u064a\\u0642 \\u0648\\u0642\\u064a\\u0645\\u0629 \\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u0639\\u0627\\u0644\\u064a\\u0629. \\u0646\\u062d\\u0646 \\u0644\\u0627 \\u0646\\u0642\\u062f\\u0645 \\u062e\\u062f\\u0645\\u0627\\u062a \\u0627\\u0644\\u062a\\u0646\\u0641\\u064a\\u0630 \\u0641\\u0642\\u0637\\u060c \\u0628\\u0644 \\u0646\\u0639\\u0645\\u0644 \\u0643\\u0634\\u0631\\u064a\\u0643 \\u0627\\u0633\\u062a\\u0631\\u0627\\u062a\\u064a\\u062c\\u064a \\u064a\\u0633\\u0627\\u0647\\u0645 \\u0641\\u064a \\u062a\\u0634\\u0643\\u064a\\u0644 \\u0631\\u0633\\u0627\\u0626\\u0644 \\u0627\\u0644\\u0634\\u0631\\u0643\\u0627\\u062a \\u0648\\u062a\\u0639\\u0632\\u064a\\u0632 \\u062d\\u0636\\u0648\\u0631 \\u0627\\u0644\\u0647\\u0648\\u064a\\u0629 \\u0627\\u0644\\u0628\\u0635\\u0631\\u064a\\u0629 \\u0648\\u0627\\u0644\\u0644\\u063a\\u0648\\u064a\\u0629 \\u0644\\u0639\\u0645\\u0644\\u0627\\u0626\\u0646\\u0627 \\u0641\\u064a \\u0645\\u0634\\u0647\\u062f \\u062a\\u0646\\u0627\\u0641\\u0633\\u064a \\u0633\\u0631\\u064a\\u0639 \\u0627\\u0644\\u062a\\u0637\\u0648\\u0631.\\r\\n<\\/p><p><br><\\/p><p>\\r\\n\\u0646\\u0642\\u062f\\u0645 \\u062d\\u0644\\u0648\\u0644\\u0627\\u064b \\u0645\\u062a\\u0643\\u0627\\u0645\\u0644\\u0629 \\u062a\\u0634\\u0645\\u0644 \\u0627\\u0644\\u0643\\u062a\\u0627\\u0628\\u0629 \\u0648\\u0627\\u0644\\u062a\\u062d\\u0631\\u064a\\u0631\\u060c \\u0648\\u0627\\u0644\\u062a\\u0635\\u0645\\u064a\\u0645 \\u0627\\u0644\\u062c\\u0631\\u0627\\u0641\\u064a\\u0643\\u064a\\u060c \\u0648\\u0627\\u0644\\u0625\\u0646\\u062a\\u0627\\u062c \\u0627\\u0644\\u0645\\u0631\\u0626\\u064a \\u0648\\u0627\\u0644\\u0635\\u0648\\u062a\\u064a\\u060c \\u0648\\u0627\\u0644\\u0625\\u062e\\u0631\\u0627\\u062c \\u0627\\u0644\\u0641\\u0646\\u064a \\u0648\\u0627\\u0644\\u0637\\u0628\\u0627\\u0639\\u0629\\u060c \\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u0623\\u0633\\u0627\\u0644\\u064a\\u0628 \\u0639\\u0645\\u0644 \\u0645\\u0631\\u0646\\u0629 \\u062a\\u0633\\u062a\\u0646\\u062f \\u0625\\u0644\\u0649 \\u0623\\u0641\\u0636\\u0644 \\u0627\\u0644\\u0645\\u0645\\u0627\\u0631\\u0633\\u0627\\u062a \\u0627\\u0644\\u062f\\u0648\\u0644\\u064a\\u0629 \\u0641\\u064a \\u0645\\u062c\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0634\\u0631 \\u0627\\u0644\\u0645\\u0624\\u0633\\u0633\\u064a \\u0648\\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a \\u0648\\u0627\\u0644\\u0625\\u0639\\u0644\\u0627\\u0645\\u064a.\\r\\n\\r\\n\\u064a\\u0633\\u062a\\u0647\\u062f\\u0641 \\u0639\\u0645\\u0644\\u0646\\u0627 \\u0627\\u0644\\u062c\\u0647\\u0627\\u062a \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u0648\\u0627\\u0644\\u0631\\u0633\\u0645\\u064a\\u0629\\u060c \\u0648\\u0627\\u0644\\u0645\\u0624\\u0633\\u0633\\u0627\\u062a \\u0627\\u0644\\u062a\\u0639\\u0644\\u064a\\u0645\\u064a\\u0629\\u060c \\u0648\\u0627\\u0644\\u0645\\u0628\\u0627\\u062f\\u0631\\u0627\\u062a \\u0627\\u0644\\u0648\\u0637\\u0646\\u064a\\u0629\\u060c \\u0648\\u0645\\u0634\\u0631\\u0648\\u0639\\u0627\\u062a \\u0627\\u0644\\u0642\\u0637\\u0627\\u0639 \\u0627\\u0644\\u062e\\u0627\\u0635 \\u0627\\u0644\\u062a\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u062d\\u062a\\u0648\\u0649 \\u062b\\u0631\\u064a\\u0627\\u064b \\u0648\\u062f\\u0642\\u064a\\u0642\\u0627\\u064b \\u064a\\u0631\\u0627\\u0639\\u064a \\u0627\\u0644\\u0633\\u064a\\u0627\\u0642 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a \\u0648\\u064a\\u0644\\u0628\\u064a \\u0627\\u0644\\u0645\\u0639\\u0627\\u064a\\u064a\\u0631 \\u0627\\u0644\\u062f\\u0648\\u0644\\u064a\\u0629.<\\/p>\"}','{\"en\":\"uploads\\/abouts\\/who-we-are\\/1766327606.jpg\",\"ar\":\"uploads\\/abouts\\/who-we-are\\/1766328747.jpg\"}','2025-12-21 09:15:06','2025-12-23 11:45:34');
/*!40000 ALTER TABLE `about_we_ares` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_forms`
--

DROP TABLE IF EXISTS `contact_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_forms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci,
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `smtp_mailer` text COLLATE utf8mb4_unicode_ci,
  `smtp_host` text COLLATE utf8mb4_unicode_ci,
  `smtp_port` text COLLATE utf8mb4_unicode_ci,
  `smtp_username` text COLLATE utf8mb4_unicode_ci,
  `smtp_password` text COLLATE utf8mb4_unicode_ci,
  `smtp_from_name` text COLLATE utf8mb4_unicode_ci,
  `smtp_from_address` text COLLATE utf8mb4_unicode_ci,
  `smtp_encryption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_forms`
--

LOCK TABLES `contact_forms` WRITE;
/*!40000 ALTER TABLE `contact_forms` DISABLE KEYS */;
INSERT INTO `contact_forms` VALUES (1,'{\"en\":\"Let\'s Plan Your Journey Together\",\"ar\":\"\\u0644\\u0646\\u062e\\u0637\\u0637 \\u0631\\u062d\\u0644\\u062a\\u0643 \\u0645\\u0639\\u0627\\u064b\"}','{\"en\":\"We\'re here to turn your vision into reality \\u2014 let\'s start the conversation.\",\"ar\":\"\\u0646\\u062d\\u0646 \\u0647\\u0646\\u0627 \\u0644\\u062a\\u062d\\u0648\\u064a\\u0644 \\u0631\\u0624\\u064a\\u062a\\u0643 \\u0625\\u0644\\u0649 \\u062d\\u0642\\u064a\\u0642\\u0629 \\u2014 \\u062f\\u0639\\u0646\\u0627 \\u0646\\u0628\\u062f\\u0623 \\u0627\\u0644\\u062d\\u0648\\u0627\\u0631.\"}','smtp','smtp.gmail.com','587','siddiqui.ahmedibrahim@gmail.com','oyyvxbbjcboulvgr','Afniah+','siddiqui.ahmedibrahim@gmail.com','tls','2025-12-22 04:08:51','2025-12-22 04:56:12');
/*!40000 ALTER TABLE `contact_forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_heroes`
--

DROP TABLE IF EXISTS `contact_heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_heroes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci,
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `image` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_heroes`
--

LOCK TABLES `contact_heroes` WRITE;
/*!40000 ALTER TABLE `contact_heroes` DISABLE KEYS */;
INSERT INTO `contact_heroes` VALUES (1,'{\"en\":\"Contact Us\",\"ar\":\"\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0645\\u0639\\u0646\\u0627\"}','{\"en\":\"We\'re here to answer your questions and start your journey to Egypt.\",\"ar\":\"\\u0646\\u062d\\u0646 \\u0647\\u0646\\u0627 \\u0644\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u0649 \\u0627\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631\\u0627\\u062a\\u0643 \\u0648\\u0628\\u062f\\u0621 \\u0631\\u062d\\u0644\\u062a\\u0643 \\u0625\\u0644\\u0649 \\u0645\\u0635\\u0631.\"}','{\"en\":\"uploads\\/contact\\/hero\\/1766394706.jpg\",\"ar\":\"uploads\\/contact\\/hero\\/1766395800.jpg\"}','2025-12-22 04:08:49','2025-12-22 04:30:00');
/*!40000 ALTER TABLE `contact_heroes` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_about_bullets`
--

DROP TABLE IF EXISTS `home_about_bullets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_about_bullets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_about_bullets`
--

LOCK TABLES `home_about_bullets` WRITE;
/*!40000 ALTER TABLE `home_about_bullets` DISABLE KEYS */;
INSERT INTO `home_about_bullets` VALUES (5,'{\"en\":\"Integrating Research and Creative Approaches\",\"ar\":\"\\u202b\\u062a\\u0643\\u0627\\u0645\\u0644 \\u202c\\u202b\\u0627\\u0644\\u0645\\u0646\\u0647\\u062c\\u202c \\u202b\\u0627\\u0644\\u0628\\u062d\\u062b\\u064a\\u202c \\u202b\\u0648\\u0627\\u0644\\u0625\\u0628\\u062f\\u0627\\u0639\\u064a\\u202c\"}','{\"en\":\"uploads\\/home\\/about\\/1765550462.svg\",\"ar\":\"uploads\\/home\\/about\\/1765553308.svg\"}','{\"en\":\"Our team combines specialized research expertise in culture, language, and identity with creative design and production skills to deliver solutions rooted in knowledge and visually unique.\",\"ar\":\"\\u202c\\u202c\\u064a\\u062c\\u0645\\u0639 \\u0641\\u0631\\u064a\\u0642\\u0646\\u0627 \\u0628\\u064a\\u0646 \\u0627\\u0644\\u062e\\u0628\\u0631\\u0627\\u062a \\u0627\\u0644\\u0628\\u062d\\u062b\\u064a\\u0629 \\u0627\\u0644\\u0645\\u062a\\u062e\\u0635\\u0635\\u0629 \\u0641\\u064a \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u0629 \\u0648\\u0627\\u0644\\u0644\\u063a\\u0629 \\u0648\\u0627\\u0644\\u0647\\u0648\\u064a\\u0629\\u060c \\u0648 \\u0627\\u0644\\u0645\\u0647\\u0627\\u0631\\u0627\\u062a \\u0627\\u0644\\u0625\\u0628\\u062f\\u0627\\u0639\\u064a\\u0629 \\u0641\\u064a \\u0627\\u0644\\u062a\\u0635\\u0645\\u064a\\u0645 \\u0648 \\u0627\\u0644\\u0625\\u0646\\u062a\\u0627\\u062c\\u060c \\u0644\\u0646\\u0642\\u062f\\u0645 \\u062d\\u0644\\u0648\\u0644\\u0627 \\u0645\\u062a\\u062c\\u0630\\u0631\\u0629 \\u0645\\u0639\\u0631\\u0641\\u064a\\u0627 \\u0648\\u0645\\u062a\\u0641\\u0631\\u062f\\u0629 \\u0628\\u0635\\u0631\\u064a\\u0627.\\u202c\\u202c\"}','2025-12-12 09:41:02','2025-12-12 10:28:28'),(6,'{\"en\":\"High Flexibility and Immediate Responsiveness\",\"ar\":\"\\u0645\\u0631\\u0648\\u0646\\u0629 \\u0639\\u0627\\u0644\\u064a\\u0629 \\u0648\\u0627\\u0633\\u062a\\u062c\\u0627\\u0628\\u0629 \\u0641\\u0648\\u0631\\u064a\\u0629\"}','{\"en\":\"uploads\\/home\\/about\\/1765551246.svg\",\"ar\":\"uploads\\/home\\/about\\/1765553353.svg\"}','{\"en\":\"We work seamlessly with various types of projects (cultural, educational, governmental, commercial), designing a customized implementation path for each client based on their precise needs.\",\"ar\":\"\\u0646\\u0639\\u0645\\u0644 \\u0628\\u0633\\u0644\\u0627\\u0633\\u0629 \\u0645\\u0639 \\u0645\\u062e\\u062a\\u0644\\u0641 \\u0623\\u0646\\u0648\\u0627\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u064a\\u0639 (\\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629\\u060c \\u0627\\u0644\\u062a\\u0639\\u0644\\u064a\\u0645\\u064a\\u0629\\u060c \\u0627\\u0644\\u062d\\u0643\\u0648\\u0645\\u064a\\u0629\\u060c \\u0627\\u0644\\u062a\\u062c\\u0627\\u0631\\u064a\\u0629)\\u060c \\u0648\\u0646\\u0635\\u0645\\u0645 \\u0645\\u0633\\u0627\\u0631 \\u062a\\u0646\\u0641\\u064a\\u0630\\u064d \\u0645\\u062e\\u0635\\u0635 \\u0644\\u0643\\u0644 \\u0639\\u0645\\u064a\\u0644 \\u0628\\u0646\\u0627\\u0621\\u064b \\u0639\\u0644\\u0649 \\u0627\\u062d\\u062a\\u064a\\u0627\\u062c\\u0627\\u062a\\u0647 \\u0627\\u0644\\u062f\\u0642\\u064a\\u0642\\u0629.\"}','2025-12-12 09:54:06','2025-12-12 10:29:13'),(7,'{\"en\":\"A comprehensive business model\",\"ar\":\"\\u0646\\u0645\\u0648\\u0630\\u062c \\u0639\\u0645\\u0644 \\u0634\\u0627\\u0645\\u0644\"}','{\"en\":\"uploads\\/home\\/about\\/1765551424.svg\",\"ar\":\"uploads\\/home\\/about\\/1765553387.svg\"}','{\"en\":\"We offer all content services from concept to final product under one roof, reducing time wastage and improving communication efficiency.\",\"ar\":\"\\u0646\\u0642\\u062f\\u0645 \\u062c\\u0645\\u064a\\u0639 \\u062e\\u062f\\u0645\\u0627\\u062a \\u0627\\u0644\\u0645\\u062d\\u062a\\u0648\\u0649 \\u0645\\u0646 \\u0627\\u0644\\u0641\\u0643\\u0631\\u0629 \\u0625\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0646\\u062a\\u062c \\u0627\\u0644\\u0646\\u0647\\u0627\\u0626\\u064a \\u062a\\u062d\\u062a \\u0633\\u0642\\u0641\\u064d \\u0648\\u0627\\u062d\\u062f\\u060c \\u0645\\u0645\\u0627 \\u064a\\u0642\\u0644\\u0644 \\u0645\\u0646 \\u0625\\u0647\\u062f\\u0627\\u0631 \\u0627\\u0644\\u0648\\u0642\\u062a \\u0648\\u064a\\u0639\\u0632\\u0632 \\u0643\\u0641\\u0627\\u0621\\u0629 \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644.\"}','2025-12-12 09:57:04','2025-12-12 10:29:47'),(8,'{\"en\":\"Identity-driven innovation\",\"ar\":\"\\u0627\\u0628\\u062a\\u0643\\u0627\\u0631 \\u0645\\u0633\\u062a\\u0645\\u062f \\u0645\\u0646 \\u0627\\u0644\\u0647\\u0648\\u064a\\u0629\"}','{\"en\":\"uploads\\/home\\/about\\/1765552467.svg\",\"ar\":\"uploads\\/home\\/about\\/1765553461.svg\"}','{\"en\":\"We reproduce ideas and content in a modern and effective way that maintains authenticity and keeps pace with the demands of the digital age.\",\"ar\":\"\\u0646\\u0639\\u064a\\u062f \\u0625\\u0646\\u062a\\u0627\\u062c \\u0627\\u0644\\u0623\\u0641\\u0643\\u0627\\u0631 \\u0648\\u0627\\u0644\\u0645\\u062d\\u062a\\u0648\\u0649 \\u0628\\u0637\\u0631\\u064a\\u0642\\u0629\\u064d \\u0639\\u0635\\u0631\\u064a\\u0629 \\u0648\\u0641\\u0639\\u0651\\u0627\\u0644\\u0629 \\u062a\\u062d\\u0627\\u0641\\u0638 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0623\\u0635\\u0627\\u0644\\u0629 \\u0648\\u062a\\u0648\\u0627\\u0643\\u0628 \\u0645\\u062a\\u0637\\u0644\\u0628\\u0627\\u062a \\u0627\\u0644\\u0639\\u0635\\u0631 \\u0627\\u0644\\u0631\\u0642\\u0645\\u064a.\"}','2025-12-12 10:14:27','2025-12-12 10:31:01');
/*!40000 ALTER TABLE `home_about_bullets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_abouts`
--

DROP TABLE IF EXISTS `home_abouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_abouts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_abouts`
--

LOCK TABLES `home_abouts` WRITE;
/*!40000 ALTER TABLE `home_abouts` DISABLE KEYS */;
INSERT INTO `home_abouts` VALUES (1,'{\"en\":\"Why Afniah+?\",\"ar\":\"\\u0644\\u0645\\u0627\\u0630\\u0627 \\u0623\\u0641\\u0646\\u064a\\u0629+\\u061f\"}','{\"en\":\"<p>We don\\u2019t offer traditional services, but rather offer strategic partnerships based on a deep understanding of the local context and strict application of international standards. Afania+ stands out for the following reasons.<\\/p><p><strong><em><br><\\/em><\\/strong><\\/p>\",\"ar\":\"\\u0646\\u062d\\u0646 \\u0644\\u0627 \\u0646\\u0642\\u062f\\u0645 \\u062e\\u062f\\u0645\\u0627\\u062a \\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629\\u060c \\u0628\\u0644 \\u0646\\u0628\\u0646\\u064a \\u0634\\u0631\\u0627\\u0643\\u0627\\u062a \\u0627\\u0633\\u062a\\u0631\\u0627\\u062a\\u064a\\u062c\\u064a\\u0629 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0639\\u0644\\u0649 \\u0641\\u0647\\u0645\\u064d \\u0639\\u0645\\u064a\\u0642\\u064d \\u0644\\u0644\\u0633\\u064a\\u0627\\u0642 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a \\u0648\\u062a\\u0637\\u0628\\u064a\\u0642\\u064d \\u0635\\u0627\\u0631\\u0645\\u064d \\u0644\\u0644\\u0645\\u0639\\u0627\\u064a\\u064a\\u0631 \\u0627\\u0644\\u062f\\u0648\\u0644\\u064a\\u0629. \\u062a\\u062a\\u0645\\u064a\\u0632 \\u0623\\u0641\\u0646\\u064a\\u0629+ \\u0628\\u0627\\u0644\\u0623\\u0633\\u0628\\u0627\\u0628 \\u0627\\u0644\\u062a\\u0627\\u0644\\u064a\\u0629:\"}','{\"en\":\"Meet Out Philosophy\",\"ar\":\"\\u062a\\u0639\\u0631\\u0651\\u0641 \\u0639\\u0644\\u0649 \\u0641\\u0644\\u0633\\u0641\\u062a\\u0646\\u0627\"}','{\"en\":\"\\/about\",\"ar\":\"\\/about\"}','2025-12-10 11:12:11','2025-12-23 11:32:48');
/*!40000 ALTER TABLE `home_abouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_hero_galleries`
--

DROP TABLE IF EXISTS `home_hero_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_hero_galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_hero_galleries`
--

LOCK TABLES `home_hero_galleries` WRITE;
/*!40000 ALTER TABLE `home_hero_galleries` DISABLE KEYS */;
INSERT INTO `home_hero_galleries` VALUES (1,'uploads/home/hero/1765373097.jpg','2025-12-10 07:44:39','2025-12-10 08:24:57'),(2,'uploads/home/hero/1765373119.jpg','2025-12-10 08:25:19','2025-12-10 08:25:19'),(5,'uploads/home/hero/1765373814.jpg','2025-12-10 08:36:54','2025-12-10 08:36:54'),(6,'uploads/home/hero/1765373829.jpg','2025-12-10 08:37:09','2025-12-10 08:37:09');
/*!40000 ALTER TABLE `home_hero_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_heroes`
--

DROP TABLE IF EXISTS `home_heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_heroes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_heroes`
--

LOCK TABLES `home_heroes` WRITE;
/*!40000 ALTER TABLE `home_heroes` DISABLE KEYS */;
INSERT INTO `home_heroes` VALUES (1,'{\"en\":\"From The Depth Of Civilization, We Envision The Future.\",\"ar\":\"\\u0645\\u0646 \\u0639\\u0645\\u0642 \\u0627\\u0644\\u062d\\u0636\\u0627\\u0631\\u0629.. \\u0646\\u0633\\u062a\\u0634\\u0631\\u0641 \\u202b\\u0627\\u0644\\u0645\\u0633\\u062a\\u0642\\u0628\\u0644\\u202c\"}','{\"en\":\"From heritage, we craft the stories of the future.\",\"ar\":\"\\u0645\\u0646 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b.. \\u0646\\u0635\\u0646\\u0639 \\u0642\\u0635\\u0635 \\u0627\\u0644\\u0645\\u0633\\u062a\\u0642\\u0628\\u0644\"}','{\"en\":\"Explore Now\",\"ar\":\"\\u0627\\u0643\\u062a\\u0634\\u0641 \\u0627\\u0644\\u0622\\u0646\"}','2025-12-10 05:23:45','2025-12-10 06:19:15');
/*!40000 ALTER TABLE `home_heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_locations`
--

DROP TABLE IF EXISTS `home_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_locations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_locations`
--

LOCK TABLES `home_locations` WRITE;
/*!40000 ALTER TABLE `home_locations` DISABLE KEYS */;
INSERT INTO `home_locations` VALUES (1,'{\"en\":\"Where We\'re Based\",\"ar\":\"\\u0645\\u0648\\u0642\\u0639\\u0646\\u0627 \\u0627\\u0644\\u062c\\u063a\\u0631\\u0627\\u0641\\u064a\"}','{\"en\":\"Contact Us\",\"ar\":\"\\u0627\\u062a\\u0635\\u0644 \\u0628\\u0646\\u0627\"}','{\"en\":\"\\/contact\",\"ar\":\"\\/contact\"}','26.367352070998177','50.186201829520016','{\"en\":\"Click on any pin to zoom to that location. Explore our multiple locations on the map.\",\"ar\":\"\\u0627\\u0646\\u0642\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0639\\u0644\\u0627\\u0645\\u0629 \\u0644\\u062a\\u0643\\u0628\\u064a\\u0631 \\u0627\\u0644\\u0645\\u0648\\u0642\\u0639. \\u0627\\u0633\\u062a\\u0643\\u0634\\u0641 \\u0645\\u0648\\u0627\\u0642\\u0639\\u0646\\u0627 \\u0627\\u0644\\u0645\\u062a\\u0639\\u062f\\u062f\\u0629 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u062e\\u0631\\u064a\\u0637\\u0629.\"}','2025-12-12 13:58:03','2025-12-23 02:39:58');
/*!40000 ALTER TABLE `home_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_projects`
--

DROP TABLE IF EXISTS `home_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_projects`
--

LOCK TABLES `home_projects` WRITE;
/*!40000 ALTER TABLE `home_projects` DISABLE KEYS */;
INSERT INTO `home_projects` VALUES (1,'{\"en\":\"Explore & Go Through The Afniah+ Projects\",\"ar\":\"\\u0627\\u0633\\u062a\\u0643\\u0634\\u0641 \\u0648\\u062a\\u0639\\u0631\\u0651\\u0641 \\u0639\\u0644\\u0649 \\u0645\\u0634\\u0631\\u0648\\u0639\\u0627\\u062a \\u0623\\u0641\\u0646\\u064a\\u0629+\"}','{\"en\":\"View All Projects\",\"ar\":\"\\u0639\\u0631\\u0636 \\u062c\\u0645\\u064a\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0631\\u0648\\u0639\\u0627\\u062a\"}','{\"en\":\"\\/projects\",\"ar\":\"\\/projects\"}','2025-12-12 10:57:28','2025-12-12 11:01:03');
/*!40000 ALTER TABLE `home_projects` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_11_03_080156_create_personal_access_tokens_table',1),(6,'2025_12_02_075211_create_projects_table',2),(7,'2025_12_04_073659_create_project_galleries_table',3),(8,'2025_12_08_112142_create_project_heroes_table',4),(9,'2025_12_08_155322_create_project_portfolios_table',5),(10,'2025_12_10_062554_create_home_heroes_table',6),(11,'2025_12_10_062636_create_home_hero_galleries_table',6),(12,'2025_12_10_062749_create_home_abouts_table',7),(13,'2025_12_10_062802_create_home_locations_table',7),(14,'2025_12_10_063110_create_home_projects_table',7),(15,'2025_12_10_063357_create_home_about_bullets_table',7),(16,'2025_12_17_194500_create_about_heroes_table',8),(17,'2025_12_17_194512_create_about_we_ares_table',8),(18,'2025_12_17_194519_create_about_visions_table',8),(19,'2025_12_17_194535_create_about_teams_table',8),(20,'2025_12_17_194611_create_about_voices_table',8),(21,'2025_12_17_194623_create_about_team_galleries_table',8),(22,'2025_12_17_195353_create_about_voice_bullets_table',8),(23,'2025_12_22_075905_create_contact_heroes_table',9),(24,'2025_12_22_080000_create_contact_forms_table',9),(25,'2025_12_22_080116_create_social_details_table',9),(26,'2025_12_24_065338_create_service_heroes_table',10),(27,'2025_12_24_065347_create_service_what_we_offers_table',10),(28,'2025_12_24_073421_create_services_table',11),(29,'2025_12_24_155744_create_service_section01s_table',12),(30,'2025_12_25_033643_create_service_section02s_table',13),(31,'2025_12_25_033649_create_service_section03s_table',13),(32,'2025_12_25_054901_create_service_section01_bullets_table',14),(33,'2025_12_25_063557_create_service_section02_bullets_table',15),(34,'2025_12_25_063601_create_service_section03_bullets_table',15),(35,'2025_12_25_124620_create_social_details_table',16),(36,'2026_02_24_183120_create_sections_table',17);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'afniah-token','cdd255185be3c710f1bb26b27989149375ee63854112d59a45db5c2f4cdafb46','[\"*\"]',NULL,NULL,'2025-11-23 02:31:38','2025-11-23 02:31:38'),(2,'App\\Models\\User',1,'afniah-token','e914bb0b77b65c0de96a7329e5093a8eabb8599fe1542db9a471f9fbc07294cb','[\"*\"]',NULL,NULL,'2025-11-23 02:32:16','2025-11-23 02:32:16'),(3,'App\\Models\\User',1,'afniah-token','ef6646e4fa70b50e9710f7bfb3fc3f97896af3c15849c6b52053edccb3cdbef6','[\"*\"]',NULL,NULL,'2025-11-23 02:32:56','2025-11-23 02:32:56'),(4,'App\\Models\\User',1,'afniah-token','6a8441929af219c89acde79851ee49c6a3e105efff5d519faf20f566002263c4','[\"*\"]',NULL,NULL,'2025-11-23 02:33:22','2025-11-23 02:33:22'),(5,'App\\Models\\User',1,'afniah-token','1e0c9201f156bc5bf1721c978dea4be9be7feda65f245dfb88fc9295d1c2880c','[\"*\"]',NULL,NULL,'2025-11-23 02:37:15','2025-11-23 02:37:15'),(6,'App\\Models\\User',1,'afniah-token','36277b31f7c2cc0ee6acd4fd995d1ae7f29cc91f184e4913309cd5240e97fa0b','[\"*\"]',NULL,NULL,'2025-11-23 02:41:55','2025-11-23 02:41:55'),(7,'App\\Models\\User',1,'afniah-token','1c38865165e96473c29909c03d61b874603e968b8dc4541678b9dc3be0df30c2','[\"*\"]',NULL,NULL,'2025-11-23 02:44:23','2025-11-23 02:44:23'),(8,'App\\Models\\User',1,'afniah-token','e6bcf12d7ff600ff73ded894dc88b5127073e12455ae4d90dd3878dc01918b66','[\"*\"]',NULL,NULL,'2025-11-24 03:15:05','2025-11-24 03:15:05'),(9,'App\\Models\\User',1,'afniah-token','e46155906d8ac0fd454a6c9417ac1227b3cf024495a96d3b7bad646c3843058a','[\"*\"]',NULL,NULL,'2025-11-24 03:40:27','2025-11-24 03:40:27'),(10,'App\\Models\\User',1,'afniah-token','1e6d7f562d4b85083019076711290d17c6009f7e009df7d1fd1816b9d9ebb3a0','[\"*\"]',NULL,NULL,'2025-12-02 02:42:58','2025-12-02 02:42:58'),(11,'App\\Models\\User',1,'afniah-token','9f98fe4b2bf734b848857ee84d00816d159d14bb75eff593054f10fcb4b7c6a3','[\"*\"]',NULL,NULL,'2025-12-04 12:41:21','2025-12-04 12:41:21'),(12,'App\\Models\\User',1,'afniah-token','f44db1b5ce485b37b3306d8b840baad554745e94e59f82740596eab0147fa266','[\"*\"]',NULL,NULL,'2025-12-04 12:58:00','2025-12-04 12:58:00'),(13,'App\\Models\\User',1,'afniah-token','cab36cc461ce14a8cecd21d75a6cbd51cfa77fa2061b50c7efe736bc33206fb5','[\"*\"]',NULL,NULL,'2025-12-04 13:13:54','2025-12-04 13:13:54'),(14,'App\\Models\\User',1,'afniah-token','a81007e73a1ae163ba1b6782da6e2c8ebfe91cbec022e700821911eaa8c03ff9','[\"*\"]',NULL,NULL,'2025-12-22 23:50:35','2025-12-22 23:50:35'),(15,'App\\Models\\User',1,'afniah-token','3a776be74e5f8a6062ef66320c9f1d143a641130bcc4df3de98902d47a8d830c','[\"*\"]','2025-12-24 06:31:09',NULL,'2025-12-22 23:54:39','2025-12-24 06:31:09'),(16,'App\\Models\\User',1,'afniah-token','f18f3e77e1e8887f0e28a43a8a9f7cdda799116d450d5c3ed9757e7472268d33','[\"*\"]',NULL,NULL,'2025-12-25 10:50:11','2025-12-25 10:50:11'),(17,'App\\Models\\User',1,'afniah-token','e9159628b4cfa3168e856cdad198600ddad01bb7227113eb753749f9a7d9b819','[\"*\"]',NULL,NULL,'2025-12-25 10:51:39','2025-12-25 10:51:39'),(18,'App\\Models\\User',1,'afniah-token','ed7f969c16b0a9e38ad84ec61819136153bc33e8df6e89205659d6a3b4336e7a','[\"*\"]',NULL,NULL,'2026-01-05 03:27:49','2026-01-05 03:27:49');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_galleries`
--

DROP TABLE IF EXISTS `project_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_galleries_project_id_foreign` (`project_id`),
  CONSTRAINT `project_galleries_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_galleries`
--

LOCK TABLES `project_galleries` WRITE;
/*!40000 ALTER TABLE `project_galleries` DISABLE KEYS */;
INSERT INTO `project_galleries` VALUES (19,11,'{\"en\":\"dkas;daskk;lk;\",\"ar\":\"\\u0635\\u0648\\u0631\\u0629\"}','{\"en\":\"uploads\\/projects\\/11\\/gallery\\/1767618202.jpg\",\"ar\":\"uploads\\/projects\\/11\\/gallery\\/1767618149.jpg\"}','2026-01-05 08:00:03','2026-01-05 08:48:15'),(20,11,'{\"en\":\"k;lk;k;l\",\"ar\":\"\\u0635\\u0648\\u0631\\u0629\"}','{\"en\":\"uploads\\/projects\\/11\\/gallery\\/1767618190.jpg\",\"ar\":\"uploads\\/projects\\/11\\/gallery\\/1767620946.jpg\"}','2026-01-05 08:03:10','2026-01-05 08:49:06');
/*!40000 ALTER TABLE `project_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_heroes`
--

DROP TABLE IF EXISTS `project_heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_heroes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_heroes`
--

LOCK TABLES `project_heroes` WRITE;
/*!40000 ALTER TABLE `project_heroes` DISABLE KEYS */;
INSERT INTO `project_heroes` VALUES (1,'{\"en\":\"Our Projects\",\"ar\":\"\\u0645\\u0634\\u0627\\u0631\\u064a\\u0639\\u0646\\u0627\"}','{\"en\":\"Here You Can Explore All Our Projects We Have Done.\",\"ar\":\"\\u0627\\u0643\\u062a\\u0634\\u0641 \\u0647\\u0646\\u0627 \\u062c\\u0645\\u064a\\u0639 \\u0645\\u0634\\u0627\\u0631\\u064a\\u0639\\u0646\\u0627 \\u0627\\u0644\\u0645\\u0646\\u062c\\u0632\\u0629.\"}','{\"en\":\"uploads\\/projects\\/hero\\/1765208895.jpg\",\"ar\":\"uploads\\/projects\\/hero\\/1765209051.jpg\"}','2025-12-08 08:48:45','2025-12-23 00:53:20');
/*!40000 ALTER TABLE `project_heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_portfolios`
--

DROP TABLE IF EXISTS `project_portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_portfolios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toptitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_portfolios`
--

LOCK TABLES `project_portfolios` WRITE;
/*!40000 ALTER TABLE `project_portfolios` DISABLE KEYS */;
INSERT INTO `project_portfolios` VALUES (1,'{\"en\":\"Our Robust Portoflio\",\"ar\":\"\\u0645\\u062d\\u0641\\u0638\\u062a\\u0646\\u0627 \\u0627\\u0644\\u0642\\u0648\\u064a\\u0629\"}','{\"en\":\"Insights from the ground\",\"ar\":\"\\u0631\\u0624\\u0649 \\u0645\\u0646 \\u0627\\u0644\\u0648\\u0627\\u0642\\u0639\"}','{\"en\":\"Explore Our Contribution In Heritage Stories.\",\"ar\":\"\\u0627\\u0633\\u062a\\u0643\\u0634\\u0641 \\u0645\\u0633\\u0627\\u0647\\u0645\\u062a\\u0646\\u0627 \\u0641\\u064a \\u0642\\u0635\\u0635 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b.\"}','2025-12-08 11:09:41','2026-03-11 16:11:33');
/*!40000 ALTER TABLE `project_portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci,
  `featured_image` text COLLATE utf8mb4_unicode_ci,
  `banner_image` text COLLATE utf8mb4_unicode_ci,
  `case_study_image` text COLLATE utf8mb4_unicode_ci,
  `category` text COLLATE utf8mb4_unicode_ci,
  `location` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `case_study` text COLLATE utf8mb4_unicode_ci,
  `scope` text COLLATE utf8mb4_unicode_ci,
  `scope_image` text COLLATE utf8mb4_unicode_ci,
  `impact` text COLLATE utf8mb4_unicode_ci,
  `impact_image` text COLLATE utf8mb4_unicode_ci,
  `show_on_home` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (10,'{\"en\":\"Asir \\u2013 Aljanadriyah Heritage Project\",\"ar\":\"\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0639\\u0633\\u064a\\u0631 \\u2013 \\u0645\\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u062c\\u0646\\u0627\\u062f\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b\\u064a\"}','{\"en\":\"uploads\\/projects\\/10\\/1764770038.png\",\"ar\":\"uploads\\/projects\\/10\\/1764770143.png\"}','{\"en\":\"\",\"ar\":\"\"}','{\"en\":\"\",\"ar\":\"\"}','{\"en\":\"Residential Complexes\",\"ar\":\"Residential Complexes\"}','{\"en\":\"Asir Region, Saudi Arabia\",\"ar\":\"\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0639\\u0633\\u064a\\u0631\"}','{\"en\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap; text-align: center;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\">\\u064a\\u062d\\u062a\\u0641\\u0644 \\u0645\\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u062c\\u0646\\u0627\\u062f\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b\\u064a \\u0641\\u064a \\u0645\\u0646\\u0637\\u0642\\u0629 \\u0639\\u0633\\u064a\\u0631 \\u0628\\u0627\\u0644\\u0645\\u0646\\u0627\\u0638\\u0631 \\u0627\\u0644\\u062c\\u0628\\u0644\\u064a\\u0629 \\u0627\\u0644\\u062e\\u0644\\u0627\\u0628\\u0629 \\u0648\\u0627\\u0644\\u062a\\u0642\\u0627\\u0644\\u064a\\u062f \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u0627\\u0644\\u0646\\u0627\\u0628\\u0636\\u0629 \\u0628\\u0627\\u0644\\u062d\\u064a\\u0627\\u0629 \\u0641\\u064a \\u062c\\u0646\\u0648\\u0628 \\u0627\\u0644\\u0645\\u0645\\u0644\\u0643\\u0629. \\u062a\\u062a\\u0628\\u0627\\u0647\\u0649 \\u0627\\u0644\\u0628\\u064a\\u0648\\u062a \\u0627\\u0644\\u062d\\u062c\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629 \\u0627\\u0644\\u0645\\u0632\\u064a\\u0646\\u0629 \\u0628\\u0627\\u0644\\u0643\\u0648\\u0627\\u0631\\u062a\\u0632 \\u0627\\u0644\\u0645\\u0644\\u0648\\u0646 \\u0623\\u0645\\u0627\\u0645 \\u0627\\u0644\\u0642\\u0645\\u0645 \\u0627\\u0644\\u0645\\u063a\\u0637\\u0627\\u0629 \\u0628\\u0627\\u0644\\u0636\\u0628\\u0627\\u0628\\u060c \\u0645\\u062d\\u0627\\u0641\\u0638\\u0629 \\u0639\\u0644\\u0649 \\u062a\\u0642\\u0646\\u064a\\u0627\\u062a \\u0627\\u0644\\u0628\\u0646\\u0627\\u0621 \\u0627\\u0644\\u0642\\u062f\\u064a\\u0645\\u0629 \\u0648\\u0627\\u0644\\u0647\\u0648\\u064a\\u0629 \\u0627\\u0644\\u0641\\u0631\\u064a\\u062f\\u0629 \\u0644\\u0642\\u0628\\u0627\\u0626\\u0644 \\u0639\\u0633\\u064a\\u0631.<\\/p>\\r\\n<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\"><br><\\/p>\"}','{\"en\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\">Through meticulous restoration of over 120 traditional Asiri houses and the creation of interactive cultural spaces, this project has transformed remote mountain villages into living museums. Visitors now experience authentic Asiri hospitality, traditional dances, and artisanal crafts while contributing directly to local community development.<\\/p>\\r\\n<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\"><\\/p>\",\"ar\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\">\\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u062a\\u0631\\u0645\\u064a\\u0645 \\u062f\\u0642\\u064a\\u0642 \\u0644\\u0623\\u0643\\u062b\\u0631 \\u0645\\u0646 120 \\u0645\\u0646\\u0632\\u0644\\u064b\\u0627 \\u0639\\u0633\\u064a\\u0631\\u064a\\u064b\\u0627 \\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u064b\\u0627 \\u0648\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0645\\u0633\\u0627\\u062d\\u0627\\u062a \\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u062a\\u0641\\u0627\\u0639\\u0644\\u064a\\u0629\\u060c \\u062d\\u0648\\u0651\\u0644 \\u0627\\u0644\\u0645\\u0634\\u0631\\u0648\\u0639 \\u0642\\u0631\\u0649 \\u062c\\u0628\\u0644\\u064a\\u0629 \\u0646\\u0627\\u0626\\u064a\\u0629 \\u0625\\u0644\\u0649 \\u0645\\u062a\\u0627\\u062d\\u0641 \\u062d\\u064a\\u0629. \\u064a\\u0633\\u062a\\u0645\\u062a\\u0639 \\u0627\\u0644\\u0632\\u0648\\u0627\\u0631 \\u0627\\u0644\\u0622\\u0646 \\u0628\\u0643\\u0631\\u0645 \\u0627\\u0644\\u0636\\u064a\\u0627\\u0641\\u0629 \\u0627\\u0644\\u0639\\u0633\\u064a\\u0631\\u064a\\u0629 \\u0627\\u0644\\u0623\\u0635\\u064a\\u0644\\u0629 \\u0648\\u0627\\u0644\\u0631\\u0642\\u0635\\u0627\\u062a \\u0627\\u0644\\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629 \\u0648\\u0627\\u0644\\u062d\\u0631\\u0641 \\u0627\\u0644\\u064a\\u062f\\u0648\\u064a\\u0629 \\u0645\\u0639 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0647\\u0645\\u0629 \\u0645\\u0628\\u0627\\u0634\\u0631\\u0629 \\u0641\\u064a \\u062a\\u0646\\u0645\\u064a\\u0629 \\u0627\\u0644\\u0645\\u062c\\u062a\\u0645\\u0639 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a.<\\/p>\"}',NULL,NULL,NULL,NULL,1,'2025-12-03 08:52:43','2025-12-31 05:15:30'),(11,'{\"en\":\"Najran \\u2013 Aljanadriyah Heritage Project\",\"ar\":\"\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0646\\u062c\\u0631\\u0627\\u0646 \\u2013 \\u0645\\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u062c\\u0646\\u0627\\u062f\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b\\u064a\"}','{\"en\":\"uploads\\/projects\\/11\\/1764770281.png\",\"ar\":\"uploads\\/projects\\/11\\/1764770356.png\"}','{\"en\":\"uploads\\/projects\\/11\\/59871766908387.jpg\",\"ar\":\"\"}','{\"en\":\"uploads\\/projects\\/11\\/44871766908387.jpg\",\"ar\":\"\"}','{\"en\":\"Residential Complexes\",\"ar\":\"\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0646\\u062c\\u0631\\u0627\\u0646\"}','{\"en\":\"Najran Region, Saudi Arabia\",\"ar\":\"\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0646\\u062c\\u0631\\u0627\\u0646\"}','{\"en\":\"<p style=\\\"text-align: center;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\">\\u064a\\u062d\\u062a\\u0641\\u0644 \\u0645\\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u062c\\u0646\\u0627\\u062f\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b\\u064a \\u0641\\u064a \\u0645\\u0646\\u0637\\u0642\\u0629 \\u0639\\u0633\\u064a\\u0631 \\u0628\\u0627\\u0644\\u0645\\u0646\\u0627\\u0638\\u0631 \\u0627\\u0644\\u062c\\u0628\\u0644\\u064a\\u0629 \\u0627\\u0644\\u062e\\u0644\\u0627\\u0628\\u0629 \\u0648\\u0627\\u0644\\u062a\\u0642\\u0627\\u0644\\u064a\\u062f \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u0627\\u0644\\u0646\\u0627\\u0628\\u0636\\u0629 \\u0628\\u0627\\u0644\\u062d\\u064a\\u0627\\u0629 \\u0641\\u064a \\u062c\\u0646\\u0648\\u0628 \\u0627\\u0644\\u0645\\u0645\\u0644\\u0643\\u0629. \\u062a\\u062a\\u0628\\u0627\\u0647\\u0649 \\u0627\\u0644\\u0628\\u064a\\u0648\\u062a \\u0627\\u0644\\u062d\\u062c\\u0631\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629 \\u0627\\u0644\\u0645\\u0632\\u064a\\u0646\\u0629 \\u0628\\u0627\\u0644\\u0643\\u0648\\u0627\\u0631\\u062a\\u0632 \\u0627\\u0644\\u0645\\u0644\\u0648\\u0646 \\u0623\\u0645\\u0627\\u0645 \\u0627\\u0644\\u0642\\u0645\\u0645 \\u0627\\u0644\\u0645\\u063a\\u0637\\u0627\\u0629 \\u0628\\u0627\\u0644\\u0636\\u0628\\u0627\\u0628\\u060c \\u0645\\u062d\\u0627\\u0641\\u0638\\u0629 \\u0639\\u0644\\u0649 \\u062a\\u0642\\u0646\\u064a\\u0627\\u062a \\u0627\\u0644\\u0628\\u0646\\u0627\\u0621 \\u0627\\u0644\\u0642\\u062f\\u064a\\u0645\\u0629 \\u0648\\u0627\\u0644\\u0647\\u0648\\u064a\\u0629 \\u0627\\u0644\\u0641\\u0631\\u064a\\u062f\\u0629 \\u0644\\u0642\\u0628\\u0627\\u0626\\u0644 \\u0639\\u0633\\u064a\\u0631.<\\/p>\\r\\n<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\"><br><\\/p>\"}','{\"en\":\"<p style=\\\"text-align: left;\\\">The Asir chapter of the Aljanadriyah Heritage Project&nbsp;celebrates the majestic mountainous landscapes&nbsp;and vibrant cultural traditions of southern&nbsp; Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"<p dir=\\\"auto\\\" style=\\\"white-space: pre-wrap;\\\">\\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u062a\\u0631\\u0645\\u064a\\u0645 \\u062f\\u0642\\u064a\\u0642 \\u0644\\u0623\\u0643\\u062b\\u0631 \\u0645\\u0646 120 \\u0645\\u0646\\u0632\\u0644\\u064b\\u0627 \\u0639\\u0633\\u064a\\u0631\\u064a\\u064b\\u0627 \\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u064b\\u0627 \\u0648\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0645\\u0633\\u0627\\u062d\\u0627\\u062a \\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u062a\\u0641\\u0627\\u0639\\u0644\\u064a\\u0629\\u060c \\u062d\\u0648\\u0651\\u0644 \\u0627\\u0644\\u0645\\u0634\\u0631\\u0648\\u0639 \\u0642\\u0631\\u0649 \\u062c\\u0628\\u0644\\u064a\\u0629 \\u0646\\u0627\\u0626\\u064a\\u0629 \\u0625\\u0644\\u0649 \\u0645\\u062a\\u0627\\u062d\\u0641 \\u062d\\u064a\\u0629. \\u064a\\u0633\\u062a\\u0645\\u062a\\u0639 \\u0627\\u0644\\u0632\\u0648\\u0627\\u0631 \\u0627\\u0644\\u0622\\u0646 \\u0628\\u0643\\u0631\\u0645 \\u0627\\u0644\\u0636\\u064a\\u0627\\u0641\\u0629 \\u0627\\u0644\\u0639\\u0633\\u064a\\u0631\\u064a\\u0629 \\u0627\\u0644\\u0623\\u0635\\u064a\\u0644\\u0629 \\u0648\\u0627\\u0644\\u0631\\u0642\\u0635\\u0627\\u062a \\u0627\\u0644\\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629 \\u0648\\u0627\\u0644\\u062d\\u0631\\u0641 \\u0627\\u0644\\u064a\\u062f\\u0648\\u064a\\u0629 \\u0645\\u0639 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0647\\u0645\\u0629 \\u0645\\u0628\\u0627\\u0634\\u0631\\u0629 \\u0641\\u064a \\u062a\\u0646\\u0645\\u064a\\u0629 \\u0627\\u0644\\u0645\\u062c\\u062a\\u0645\\u0639 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a.<\\/p>\"}',NULL,NULL,NULL,NULL,1,'2025-12-03 08:58:01','2025-12-31 05:14:32'),(13,'{\"en\":\"Najran \\u2013 Aljanadriyah Heritage Project\",\"ar\":\"\"}','{\"en\":\"uploads\\/projects\\/13\\/1773259840.png\",\"ar\":\"\"}','{\"en\":\"uploads\\/projects\\/13\\/72621773259840.jpg\",\"ar\":\"\"}','{\"en\":\"uploads\\/projects\\/13\\/80501773259840.jpg\",\"ar\":\"\"}','{\"en\":\"Residential Complexes\",\"ar\":\"\"}','{\"en\":\"Najran Region, Saudi Arabia\",\"ar\":\"\"}','{\"en\":\"<p style=\\\"text-align: center;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"\"}','{\"en\":\"<p style=\\\"text-align: left;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"\"}','{\"en\":\"<p style=\\\"text-align: left;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"\"}','{\"en\":\"\",\"ar\":\"\"}','{\"en\":\"<p style=\\\"text-align: left;\\\">The Asir chapter of the Aljanadriyah Heritage Project celebrates the majestic mountainous landscapes and vibrant cultural traditions of southern Saudi Arabia. Traditional stone houses with colorful quartz decorations stand proudly against misty peaks, preserving centuries-old architectural techniques and the unique identity of Asir\\u2019s tribes.<\\/p>\",\"ar\":\"\"}','{\"en\":\"\",\"ar\":\"\"}',1,'2026-03-11 15:10:40','2026-03-11 16:10:58');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (2,'home_about',1,'2026-02-24 13:43:32','2026-02-25 14:57:44'),(3,'home_projects',1,'2026-02-24 13:43:32','2026-02-25 14:57:53'),(4,'home_location',1,'2026-02-24 13:43:32','2026-02-25 14:58:02'),(6,'about_whoWeAre',1,'2026-02-24 13:43:32','2026-02-26 06:36:06'),(7,'about_vision',1,'2026-02-24 13:43:32','2026-02-26 06:36:03'),(8,'about_team',1,'2026-02-24 13:43:32','2026-02-26 06:35:59'),(10,'projects_overview',1,'2026-02-24 13:43:32','2026-02-26 06:40:53'),(11,'projects_caseStudy',1,'2026-02-24 13:43:32','2026-02-26 06:41:03'),(12,'projects_gallery',1,'2026-02-24 13:43:32','2026-02-26 06:41:04'),(14,'service_section01',1,'2026-02-24 13:43:32','2026-02-26 06:43:35'),(15,'service_section02',1,'2026-02-24 13:43:32','2026-02-26 06:43:37'),(16,'service_section03',1,'2026-02-24 13:43:32','2026-02-26 06:43:38'),(17,'projects_scope',0,NULL,'2026-03-11 16:11:20'),(18,'projects_impact',0,NULL,'2026-03-11 16:11:32');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_heroes`
--

DROP TABLE IF EXISTS `service_heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_heroes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_heroes`
--

LOCK TABLES `service_heroes` WRITE;
/*!40000 ALTER TABLE `service_heroes` DISABLE KEYS */;
INSERT INTO `service_heroes` VALUES (1,'{\"en\":\"Our Services\",\"ar\":\"\\u062e\\u062f\\u0645\\u0627\\u062a\\u0646\\u0627\"}','{\"en\":\"Here You Can Explore All The Services We Offer.\",\"ar\":\"\\u0647\\u0646\\u0627 \\u064a\\u0645\\u0643\\u0646\\u0643 \\u0627\\u0633\\u062a\\u0643\\u0634\\u0627\\u0641 \\u062c\\u0645\\u064a\\u0639 \\u0627\\u0644\\u062e\\u062f\\u0645\\u0627\\u062a \\u0627\\u0644\\u062a\\u064a \\u0646\\u0642\\u062f\\u0645\\u0647\\u0627.\"}','{\"en\":\"uploads\\/services\\/hero\\/1766559938.jpg\",\"ar\":\"uploads\\/services\\/hero\\/1766560075.jpg\"}','2025-12-24 02:00:47','2025-12-24 02:07:55');
/*!40000 ALTER TABLE `service_heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section01_bullets`
--

DROP TABLE IF EXISTS `service_section01_bullets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section01_bullets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bullet_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section01_bullets`
--

LOCK TABLES `service_section01_bullets` WRITE;
/*!40000 ALTER TABLE `service_section01_bullets` DISABLE KEYS */;
INSERT INTO `service_section01_bullets` VALUES (2,'{\"en\":\"Lorem Ipsum is simply dummy text.\",\"ar\":\"\\u0644\\u0648\\u0631\\u064a\\u0645 \\u0625\\u064a\\u0628\\u0633\\u0648\\u0645 \\u0647\\u0648 \\u0645\\u062c\\u0631\\u062f \\u0646\\u0635 \\u0648\\u0647\\u0645\\u064a (\\u0646\\u0635 \\u0634\\u0643\\u0644\\u064a)\"}',4,'2025-12-25 01:21:09','2025-12-25 11:02:58'),(3,'{\"en\":\"Lorem Ipsum is simply dummy text.\",\"ar\":\"\\u0644\\u0648\\u0631\\u064a\\u0645 \\u0625\\u064a\\u0628\\u0633\\u0648\\u0645 \\u0647\\u0648 \\u0645\\u062c\\u0631\\u062f \\u0646\\u0635 \\u0648\\u0647\\u0645\\u064a (\\u0646\\u0635 \\u0634\\u0643\\u0644\\u064a)\"}',4,'2025-12-25 11:01:42','2025-12-25 11:03:04');
/*!40000 ALTER TABLE `service_section01_bullets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section01s`
--

DROP TABLE IF EXISTS `service_section01s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section01s` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stats_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stats_count` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stats_icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section01s`
--

LOCK TABLES `service_section01s` WRITE;
/*!40000 ALTER TABLE `service_section01s` DISABLE KEYS */;
INSERT INTO `service_section01s` VALUES (1,'{\"en\":\"What is Lorem Ipsum?\",\"ar\":\"\\u0645\\u0627 \\u0647\\u0648 \\\"\\u0644\\u0648\\u0631\\u064a\\u0645 \\u0625\\u064a\\u0628\\u0633\\u0648\\u0645\\\" \\u061f\"}','{\"en\":\"<p class=\\\"text-gray-600 font-primary text-lg leading-relaxed\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); --tw-space-y-reverse: 0; margin-block: 0px 24px; font-family: Changa, sans-serif; font-size: 18px; line-height: 1.625; --tw-leading: 1.625; color: oklch(0.446 0.03 256.802); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(250, 250, 249); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\\\">Our  services bridge the past and future, transforming cultural knowledge, institutional records, and research findings into accessible, well-organized archives. We combine traditional archival methods with modern digital solutions.<\\/p><p class=\\\"text-gray-600 font-primary text-lg leading-relaxed\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); --tw-space-y-reverse: 0; margin-block: 0px 24px; font-family: Changa, sans-serif; font-size: 18px; line-height: 1.625; --tw-leading: 1.625; color: oklch(0.446 0.03 256.802); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(250, 250, 249); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\\\">From ancient manuscripts to contemporary institutional records, we ensure every document is preserved with accuracy, cultural sensitivity, and compliance with international archival standards.<\\/p>\",\"ar\":\"<p class=\\\"text-gray-600 font-primary text-lg leading-relaxed\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); --tw-space-y-reverse: 0; margin-block: 0px 24px; font-family: Changa, sans-serif; font-size: 18px; line-height: 1.625; --tw-leading: 1.625; color: oklch(0.446 0.03 256.802);\\\">\\u062a\\u062c\\u0633\\u0631 \\u062e\\u062f\\u0645\\u0627\\u062a\\u0646\\u0627 \\u0641\\u064a \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0627\\u0644\\u0645\\u0627\\u0636\\u064a \\u0628\\u0627\\u0644\\u0645\\u0633\\u062a\\u0642\\u0628\\u0644\\u060c \\u062d\\u064a\\u062b \\u0646\\u062d\\u0648\\u0644 \\u0627\\u0644\\u0645\\u0639\\u0631\\u0641\\u0629 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a\\u0629 \\u0648\\u0627\\u0644\\u0633\\u062c\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0624\\u0633\\u0633\\u064a\\u0629 \\u0648\\u0627\\u0644\\u0628\\u062d\\u0648\\u062b \\u0627\\u0644\\u0639\\u0644\\u0645\\u064a\\u0629 \\u0625\\u0644\\u0649 \\u0623\\u0631\\u0634\\u064a\\u0641\\u0627\\u062a \\u0645\\u0646\\u0638\\u0645\\u0629 \\u0648\\u0633\\u0647\\u0644\\u0629 \\u0627\\u0644\\u0648\\u0635\\u0648\\u0644. \\u0646\\u062d\\u0646 \\u0646\\u062f\\u0645\\u062c \\u0628\\u064a\\u0646 \\u0627\\u0644\\u0623\\u0633\\u0627\\u0644\\u064a\\u0628 \\u0627\\u0644\\u0623\\u0631\\u0634\\u064a\\u0641\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0642\\u0644\\u064a\\u062f\\u064a\\u0629 \\u0648\\u0627\\u0644\\u062d\\u0644\\u0648\\u0644 \\u0627\\u0644\\u0631\\u0642\\u0645\\u064a\\u0629 \\u0627\\u0644\\u062d\\u062f\\u064a\\u062b\\u0629.<\\/p><p class=\\\"text-gray-600 font-primary text-lg leading-relaxed\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); --tw-space-y-reverse: 0; margin-block: 0px 24px; font-family: Changa, sans-serif; font-size: 18px; line-height: 1.625; --tw-leading: 1.625; color: oklch(0.446 0.03 256.802);\\\">\\u0628\\u062f\\u0621\\u064b\\u0627 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u062e\\u0637\\u0648\\u0637\\u0627\\u062a \\u0627\\u0644\\u0642\\u062f\\u064a\\u0645\\u0629 \\u0648\\u0635\\u0648\\u0644\\u064b\\u0627 \\u0625\\u0644\\u0649 \\u0627\\u0644\\u0633\\u062c\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0624\\u0633\\u0633\\u064a\\u0629 \\u0627\\u0644\\u0645\\u0639\\u0627\\u0635\\u0631\\u0629\\u060c \\u0646\\u0636\\u0645\\u0646 \\u062d\\u0641\\u0638 \\u0643\\u0644 \\u0648\\u062b\\u064a\\u0642\\u0629 \\u0628\\u062f\\u0642\\u0629 \\u0648\\u062d\\u0633 \\u062b\\u0642\\u0627\\u0641\\u064a \\u0639\\u0627\\u0644\\u064d\\u060c \\u0645\\u0639 \\u0627\\u0644\\u0627\\u0644\\u062a\\u0632\\u0627\\u0645 \\u0628\\u0627\\u0644\\u0645\\u0639\\u0627\\u064a\\u064a\\u0631 \\u0627\\u0644\\u062f\\u0648\\u0644\\u064a\\u0629 \\u0644\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0648\\u0627\\u0644\\u0623\\u0631\\u0634\\u0641\\u0629.<\\/p><div class=\\\"grid grid-cols-2 gap-4 pt-4\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 16px 0px 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); display: grid; grid-template-columns: repeat(2, minmax(0px, 1fr)); gap: 16px;\\\"><div class=\\\"flex items-start gap-2\\\" style=\\\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px solid oklch(0.92 0.004 286.32); outline-color: oklab(0.705 0.00415142 -0.0144141 \\/ 0.5); display: flex; align-items: flex-start; gap: 8px; opacity: 1; transform: none;\\\"><svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-circle-check-big w-5 h-5 text-green-500 mt-1 flex-shrink-0\\\" aria-hidden=\\\"true\\\" style=\\\"font-family: Changa, sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: right; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(250, 250, 249); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\\\"><path d=\\\"M21.801 10A10 10 0 1 1 17 3.335\\\"><\\/path><path d=\\\"m9 11 3 3L22 4\\\"><\\/path><\\/svg><br class=\\\"Apple-interchange-newline\\\"><\\/div><\\/div>\"}','{\"en\":\"uploads\\/services\\/4\\/1766632011.jpg\",\"ar\":\"uploads\\/services\\/4\\/1766632467.jpg\"}','{\"en\":\"Phptography\",\"ar\":\"\\u0627\\u0644\\u062a\\u0635\\u0648\\u064a\\u0631\"}','{\"en\":\"500\",\"ar\":\"500\"}','{\"en\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-aperture-icon lucide-aperture\\\"><circle cx=\\\"12\\\" cy=\\\"12\\\" r=\\\"10\\\"\\/><path d=\\\"m14.31 8 5.74 9.94\\\"\\/><path d=\\\"M9.69 8h11.48\\\"\\/><path d=\\\"m7.38 12 5.74-9.94\\\"\\/><path d=\\\"M9.69 16 3.95 6.06\\\"\\/><path d=\\\"M14.31 16H2.83\\\"\\/><path d=\\\"m16.62 12-5.74 9.94\\\"\\/><\\/svg>\",\"ar\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-aperture-icon lucide-aperture\\\"><circle cx=\\\"12\\\" cy=\\\"12\\\" r=\\\"10\\\"\\/><path d=\\\"m14.31 8 5.74 9.94\\\"\\/><path d=\\\"M9.69 8h11.48\\\"\\/><path d=\\\"m7.38 12 5.74-9.94\\\"\\/><path d=\\\"M9.69 16 3.95 6.06\\\"\\/><path d=\\\"M14.31 16H2.83\\\"\\/><path d=\\\"m16.62 12-5.74 9.94\\\"\\/><\\/svg>\"}',4,'2025-12-24 21:12:00','2025-12-24 22:14:27');
/*!40000 ALTER TABLE `service_section01s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section02_bullets`
--

DROP TABLE IF EXISTS `service_section02_bullets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section02_bullets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci,
  `icon` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `service_id` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section02_bullets`
--

LOCK TABLES `service_section02_bullets` WRITE;
/*!40000 ALTER TABLE `service_section02_bullets` DISABLE KEYS */;
INSERT INTO `service_section02_bullets` VALUES (2,'{\"en\":\"Quality Assurance\",\"ar\":\"Quality Assurance\"}','{\"en\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-shield-icon lucide-shield\\\"><path d=\\\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\\\"\\/><\\/svg>\",\"ar\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-aarrow-down-icon lucide-a-arrow-down\\\"><path d=\\\"m14 12 4 4 4-4\\\"\\/><path d=\\\"M18 16V7\\\"\\/><path d=\\\"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16\\\"\\/><path d=\\\"M3.304 13h6.392\\\"\\/><\\/svg>\"}','{\"en\":\"Every document undergoes rigorous quality checks ensuring accuracy, completeness, and compliance with archival standards.\",\"ar\":\"Every document undergoes rigorous quality checks ensuring accuracy, completeness, and compliance with archival standards.\"}','4','2025-12-25 11:05:04','2025-12-30 03:37:40'),(3,'{\"en\":\"Timely Delivery\",\"ar\":\"\\u0627\\u0644\\u062a\\u0633\\u0644\\u064a\\u0645 \\u0641\\u064a \\u0627\\u0644\\u0648\\u0642\\u062a \\u0627\\u0644\\u0645\\u062d\\u062f\\u062f\"}','{\"en\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-timer-icon lucide-timer\\\"><line x1=\\\"10\\\" x2=\\\"14\\\" y1=\\\"2\\\" y2=\\\"2\\\"\\/><line x1=\\\"12\\\" x2=\\\"15\\\" y1=\\\"14\\\" y2=\\\"11\\\"\\/><circle cx=\\\"12\\\" cy=\\\"14\\\" r=\\\"8\\\"\\/><\\/svg>\",\"ar\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-timer-icon lucide-timer\\\"><line x1=\\\"10\\\" x2=\\\"14\\\" y1=\\\"2\\\" y2=\\\"2\\\"\\/><line x1=\\\"12\\\" x2=\\\"15\\\" y1=\\\"14\\\" y2=\\\"11\\\"\\/><circle cx=\\\"12\\\" cy=\\\"14\\\" r=\\\"8\\\"\\/><\\/svg>\"}','{\"en\":\"Efficient workflows and project management ensure documentation projects are completed on schedule without compromising quality.\",\"ar\":\"\\u062a\\u0636\\u0645\\u0646 \\u0622\\u0644\\u064a\\u0627\\u062a \\u0627\\u0644\\u0639\\u0645\\u0644 \\u0627\\u0644\\u0641\\u0639\\u0651\\u0627\\u0644\\u0629 \\u0648\\u0625\\u062f\\u0627\\u0631\\u0629 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u064a\\u0639 \\u0625\\u0646\\u062c\\u0627\\u0632 \\u0623\\u0639\\u0645\\u0627\\u0644 \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0636\\u0645\\u0646 \\u0627\\u0644\\u062c\\u062f\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0645\\u0646\\u064a \\u062f\\u0648\\u0646 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0633 \\u0628\\u0627\\u0644\\u062c\\u0648\\u062f\\u0629.\"}','4','2025-12-25 11:06:34','2025-12-25 11:07:11'),(4,'{\"en\":\"Accessibility\",\"ar\":\"\"}','{\"en\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-scan-eye-icon lucide-scan-eye\\\"><path d=\\\"M3 7V5a2 2 0 0 1 2-2h2\\\"\\/><path d=\\\"M17 3h2a2 2 0 0 1 2 2v2\\\"\\/><path d=\\\"M21 17v2a2 2 0 0 1-2 2h-2\\\"\\/><path d=\\\"M7 21H5a2 2 0 0 1-2-2v-2\\\"\\/><circle cx=\\\"12\\\" cy=\\\"12\\\" r=\\\"1\\\"\\/><path d=\\\"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0\\\"\\/><\\/svg>\",\"ar\":\"\"}','{\"en\":\"We create documentation systems that are easily navigable, searchable, and accessible for future generations.\",\"ar\":\"\"}','4','2025-12-25 11:08:23','2025-12-25 11:08:23');
/*!40000 ALTER TABLE `service_section02_bullets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section02s`
--

DROP TABLE IF EXISTS `service_section02s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section02s` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section02s`
--

LOCK TABLES `service_section02s` WRITE;
/*!40000 ALTER TABLE `service_section02s` DISABLE KEYS */;
INSERT INTO `service_section02s` VALUES (1,'{\"en\":\"Our Approach\",\"ar\":\"\\u0645\\u0646\\u0647\\u062c\\u064a\\u0629 \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0644\\u062f\\u064a\\u0646\\u0627\"}','{\"en\":\"International best practices meet local expertise.\",\"ar\":\"\\u0623\\u0641\\u0636\\u0644 \\u0627\\u0644\\u0645\\u0645\\u0627\\u0631\\u0633\\u0627\\u062a \\u0627\\u0644\\u0639\\u0627\\u0644\\u0645\\u064a\\u0629 \\u062a\\u0644\\u062a\\u0642\\u064a \\u0628\\u0627\\u0644\\u062e\\u0628\\u0631\\u0629 \\u0627\\u0644\\u0645\\u062d\\u0644\\u064a\\u0629\"}',4,'2025-12-24 22:55:57','2025-12-24 23:04:21');
/*!40000 ALTER TABLE `service_section02s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section03_bullets`
--

DROP TABLE IF EXISTS `service_section03_bullets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section03_bullets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `service_id` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section03_bullets`
--

LOCK TABLES `service_section03_bullets` WRITE;
/*!40000 ALTER TABLE `service_section03_bullets` DISABLE KEYS */;
INSERT INTO `service_section03_bullets` VALUES (2,'{\"en\":\"Assessment & Planning\",\"ar\":\"\\u0627\\u0644\\u062a\\u0642\\u064a\\u064a\\u0645 \\u0648\\u0627\\u0644\\u062a\\u062e\\u0637\\u064a\\u0637\"}','{\"en\":\"Comprehensive evaluation of documentation needs, scope, and preservation requirements.\",\"ar\":\"\\u062a\\u0642\\u064a\\u064a\\u0645 \\u0634\\u0627\\u0645\\u0644 \\u0644\\u0627\\u062d\\u062a\\u064a\\u0627\\u062c\\u0627\\u062a \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0648\\u0646\\u0637\\u0627\\u0642 \\u0627\\u0644\\u0639\\u0645\\u0644 \\u0648\\u0645\\u062a\\u0637\\u0644\\u0628\\u0627\\u062a \\u0627\\u0644\\u062d\\u0641\\u0638 \\u0648\\u0627\\u0644\\u0623\\u0631\\u0634\\u0641\\u0629.\"}','4','2025-12-25 11:08:57','2025-12-25 11:14:21'),(3,'{\"en\":\"Data Collection\",\"ar\":\"\\u062c\\u0645\\u0639 \\u0627\\u0644\\u0628\\u064a\\u0627\\u0646\\u0627\\u062a\"}','{\"en\":\"Systematic gathering and organization of source materials with attention to detail and cultural context.\",\"ar\":\"\\u062c\\u0645\\u0639 \\u0648\\u062a\\u0646\\u0638\\u064a\\u0645 \\u0627\\u0644\\u0645\\u0648\\u0627\\u062f \\u0627\\u0644\\u0645\\u0635\\u062f\\u0631\\u064a\\u0629 \\u0628\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0645\\u0646\\u0647\\u062c\\u064a\\u0629 \\u0645\\u0639 \\u0645\\u0631\\u0627\\u0639\\u0627\\u0629 \\u0627\\u0644\\u062a\\u0641\\u0627\\u0635\\u064a\\u0644 \\u0648\\u0627\\u0644\\u0633\\u064a\\u0627\\u0642 \\u0627\\u0644\\u062b\\u0642\\u0627\\u0641\\u064a.\"}','4','2025-12-25 11:11:11','2025-12-25 11:14:42'),(4,'{\"en\":\"Processing & Digitization\",\"ar\":\"\\u0627\\u0644\\u0645\\u0639\\u0627\\u0644\\u062c\\u0629 \\u0648\\u0627\\u0644\\u0631\\u0642\\u0645\\u0646\\u0629\"}','{\"en\":\"Professional documentation, editing, and digital archiving using industry-standard tools and protocols.\",\"ar\":\"\\u062a\\u0648\\u062b\\u064a\\u0642 \\u0627\\u062d\\u062a\\u0631\\u0627\\u0641\\u064a \\u0648\\u062a\\u062d\\u0631\\u064a\\u0631 \\u0648\\u0623\\u0631\\u0634\\u0641\\u0629 \\u0631\\u0642\\u0645\\u064a\\u0629 \\u0628\\u0627\\u0633\\u062a\\u062e\\u062f\\u0627\\u0645 \\u0623\\u062f\\u0648\\u0627\\u062a \\u0648\\u0628\\u0631\\u0648\\u062a\\u0648\\u0643\\u0648\\u0644\\u0627\\u062a \\u0645\\u0639\\u062a\\u0645\\u062f\\u0629 \\u062f\\u0648\\u0644\\u064a\\u0627\\u064b.\"}','4','2025-12-25 11:12:18','2025-12-25 11:15:12'),(5,'{\"en\":\"Delivery & Maintenance\",\"ar\":\"\\u0627\\u0644\\u062a\\u0633\\u0644\\u064a\\u0645 \\u0648\\u0627\\u0644\\u0635\\u064a\\u0627\\u0646\\u0629\"}','{\"en\":\"Final documentation delivery with ongoing support and archive maintenance solutions.\",\"ar\":\"\\u062a\\u0633\\u0644\\u064a\\u0645 \\u0627\\u0644\\u0648\\u062b\\u0627\\u0626\\u0642 \\u0627\\u0644\\u0646\\u0647\\u0627\\u0626\\u064a\\u0629 \\u0645\\u0639 \\u062a\\u0642\\u062f\\u064a\\u0645 \\u0627\\u0644\\u062f\\u0639\\u0645 \\u0627\\u0644\\u0645\\u0633\\u062a\\u0645\\u0631 \\u0648\\u062d\\u0644\\u0648\\u0644 \\u0635\\u064a\\u0627\\u0646\\u0629 \\u0627\\u0644\\u0623\\u0631\\u0634\\u064a\\u0641.\"}','4','2025-12-25 11:13:39','2025-12-25 11:15:24');
/*!40000 ALTER TABLE `service_section03_bullets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_section03s`
--

DROP TABLE IF EXISTS `service_section03s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_section03s` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_section03s`
--

LOCK TABLES `service_section03s` WRITE;
/*!40000 ALTER TABLE `service_section03s` DISABLE KEYS */;
INSERT INTO `service_section03s` VALUES (1,'{\"en\":\"Documentation Workflow\",\"ar\":\"\\u0622\\u0644\\u064a\\u0629 \\u0639\\u0645\\u0644 \\u0627\\u0644\\u062a\\u0648\\u062b\\u064a\\u0642\"}','{\"en\":\"uploads\\/services\\/4\\/1766635596.jpg\",\"ar\":\"uploads\\/services\\/4\\/1766635570.jpg\"}',4,'2025-12-24 22:58:03','2025-12-24 23:06:36');
/*!40000 ALTER TABLE `service_section03s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_what_we_offers`
--

DROP TABLE IF EXISTS `service_what_we_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_what_we_offers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `toptitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_what_we_offers`
--

LOCK TABLES `service_what_we_offers` WRITE;
/*!40000 ALTER TABLE `service_what_we_offers` DISABLE KEYS */;
INSERT INTO `service_what_we_offers` VALUES (1,'{\"en\":\"What We Offer\",\"ar\":\"\\u0645\\u0627 \\u0627\\u0644\\u0630\\u064a \\u0646\\u0642\\u062f\\u0645\\u0647\"}','{\"en\":\"Insights from the ground\",\"ar\":\"\\u0631\\u0624\\u0649 \\u0645\\u0646 \\u0627\\u0644\\u0623\\u0631\\u0636\"}','{\"en\":\"Specialized services that bridge tradition and modernity.\",\"ar\":\"\\u062e\\u062f\\u0645\\u0627\\u062a \\u0645\\u062a\\u062e\\u0635\\u0635\\u0629 \\u062a\\u062c\\u0645\\u0639 \\u0628\\u064a\\u0646 \\u0627\\u0644\\u0623\\u0635\\u0627\\u0644\\u0629 \\u0648\\u0627\\u0644\\u062d\\u062f\\u0627\\u062b\\u0629.\"}','2025-12-24 02:03:17','2026-02-26 06:43:39');
/*!40000 ALTER TABLE `service_what_we_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` text COLLATE utf8mb4_unicode_ci,
  `banner_image` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (4,'{\"en\":\"Graphic Designing\",\"ar\":\"\\u0627\\u0644\\u062a\\u0635\\u0645\\u064a\\u0645 \\u0627\\u0644\\u062c\\u0631\\u0627\\u0641\\u064a\\u0643\\u064a\"}','{\"en\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-pen-tool-icon lucide-pen-tool\\\"><path d=\\\"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z\\\"\\/><path d=\\\"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18\\\"\\/><path d=\\\"m2.3 2.3 7.286 7.286\\\"\\/><circle cx=\\\"11\\\" cy=\\\"11\\\" r=\\\"2\\\"\\/><\\/svg>\",\"ar\":\"<svg xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" class=\\\"lucide lucide-pen-tool-icon lucide-pen-tool\\\"><path d=\\\"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z\\\"\\/><path d=\\\"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18\\\"\\/><path d=\\\"m2.3 2.3 7.286 7.286\\\"\\/><circle cx=\\\"11\\\" cy=\\\"11\\\" r=\\\"2\\\"\\/><\\/svg>\"}','{\"en\":\"Preserving knowledge and heritage through meticulous documentation and archival excellence\",\"ar\":\"\\u062d\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0639\\u0631\\u0641\\u0629 \\u0648\\u0627\\u0644\\u062a\\u0631\\u0627\\u062b \\u0645\\u0646 \\u062e\\u0644\\u0627\\u0644 \\u062a\\u0648\\u062b\\u064a\\u0642 \\u062f\\u0642\\u064a\\u0642 \\u0648\\u062a\\u0645\\u064a\\u0651\\u0632 \\u0623\\u0631\\u0634\\u064a\\u0641\\u064a \\u0631\\u0641\\u064a\\u0639 \\u0627\\u0644\\u0645\\u0633\\u062a\\u0648\\u0649\"}','{\"en\":\"uploads\\/services\\/4\\/featured_1766579446.jpg\",\"ar\":\"uploads\\/services\\/4\\/featured_1766579533.jpg\"}','{\"en\":\"uploads\\/services\\/4\\/banner_1766579446.jpg\",\"ar\":\"uploads\\/services\\/4\\/banner_1766579533.jpg\"}','2025-12-24 07:30:46','2025-12-24 07:32:13');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('KwTdaECLY2BEaWBQix4Ja1TYHjTvPbEPrDCGUByH',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidXJOeGowdG12UWswZ3BCT2hQUm1pa3djR2xjU2NMd0RrMGtGNmdOYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1779126053),('OwJRwzRtjPHzyLHJmXgaDb1X5H3OrgHdPU2PSucI',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSFN6OXFTNVZ0aTNVUzNJTjN5V2t3TW8wNXV0ckRPd0hicFA2aGxONSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1779129617),('V4u4Bv07ZloR01g1bZQA99Lk2Js4OWIeuowzbmRh',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjdndUFpS2E4OTNJVDQyNnpRQ1lrUktnY21WTVBFRDUwbVptakxtTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1779040708);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_details`
--

DROP TABLE IF EXISTS `social_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebook` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `twitter` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkedin` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagline` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `copyright_credits` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_details`
--

LOCK TABLES `social_details` WRITE;
/*!40000 ALTER TABLE `social_details` DISABLE KEYS */;
INSERT INTO `social_details` VALUES (1,'Al Qasim Al Khawarizmi Street, Rakah District, Dammam 34225, KSA','info@afnps.com','013 889 3060','https://www.facebook.com/profile.php?id=61577329362259','https://x.com/AFNIAH_PLUS','https://www.instagram.com/afniah_plus/#','https://www.linkedin.com/company/afniahplus/','{\"en\":\"From heritage, we craft the stories of the future.\",\"ar\":\"\\u0645\\u0646 \\u0627\\u0644\\u062a\\u0631\\u0627\\u062b.. \\u0646\\u0635\\u0646\\u0639 \\u0642\\u0635\\u0635 \\u0627\\u0644\\u0645\\u0633\\u062a\\u0642\\u0628\\u0644\"}','{\"en\":\"Afniah Publishing & Distribution Company\",\"ar\":\"Afniah Publishing & Distribution Company\"}','2025-12-25 09:15:54','2025-12-25 09:25:22');
/*!40000 ALTER TABLE `social_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `fcm_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_platform` enum('android','ios') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ahmed Ibrahim','ahmed@domain.com','2025-11-23 01:24:43','$2y$12$xP9ZxMfkaHgHH0vkjmFanOugnI/KoxsUkZZFTu0nGpqYCaJoKgi4u',NULL,'2025-11-23 01:24:43','2025-12-25 10:56:20',1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-09 13:31:45
