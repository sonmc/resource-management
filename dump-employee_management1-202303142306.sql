-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: employee_management1
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `kanban_columns`
--

DROP TABLE IF EXISTS `kanban_columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanban_columns` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `index` int NOT NULL,
  `kanbanId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8fa7b15221b84dc6445ec228f8f` (`kanbanId`),
  CONSTRAINT `FK_8fa7b15221b84dc6445ec228f8f` FOREIGN KEY (`kanbanId`) REFERENCES `kanbans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanban_columns`
--

LOCK TABLES `kanban_columns` WRITE;
/*!40000 ALTER TABLE `kanban_columns` DISABLE KEYS */;
/*!40000 ALTER TABLE `kanban_columns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanbans`
--

DROP TABLE IF EXISTS `kanbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanbans` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4836a9bad654ac9fffd7d692a8b` (`projectId`),
  CONSTRAINT `FK_4836a9bad654ac9fffd7d692a8b` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanbans`
--

LOCK TABLES `kanbans` WRITE;
/*!40000 ALTER TABLE `kanbans` DISABLE KEYS */;
/*!40000 ALTER TABLE `kanbans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1675766806882,'Init1675766806882');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('1','2023-02-09 11:06:57.745337','2023-02-09 11:06:57.745337','login','Đăng nhập'),('2','2023-02-10 18:03:19.081406','2023-02-10 18:03:19.081406','project_get','Danh sách dự án'),('3','2023-02-10 18:58:39.324980','2023-02-10 18:58:39.324980','employee_get','Danh sách nhân viên'),('4','2023-02-10 18:59:16.501674','2023-02-10 18:59:16.501674','role_get','Danh sách quyền');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('1','2020-02-02 00:00:00.000000','2020-02-02 00:00:00.000000','Abc','note','2020-02-02 00:00:00'),('2','2023-02-08 16:59:48.738391','2023-03-08 15:14:43.716603','Social network','','2023-02-09 00:00:00');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('0','2023-02-11 14:18:44.930596','2023-02-11 14:18:44.930596','Dev','Developer'),('1','2023-02-09 11:05:39.609074','2023-02-09 11:05:39.609074','admin','super admin'),('2','2023-02-10 18:01:49.994883','2023-02-10 18:01:49.994883','CEO','Giám đốc điều hành'),('ef026775-c123-404b-897f-7ddcc9dd8436','2023-03-10 12:16:31.442378','2023-03-10 12:16:31.442378','Designer','some note'),('f64a8099-da88-4318-8d41-91bf6bdb8818','2023-02-11 14:22:50.774123','2023-02-11 14:22:50.774123','Tester','');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_pems`
--

DROP TABLE IF EXISTS `roles_pems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_pems` (
  `role_id` varchar(36) NOT NULL,
  `permission_id` varchar(36) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `IDX_4df75616161dd63fae14f4f71b` (`role_id`),
  KEY `IDX_ca161395d6a7e2f10590d9eea4` (`permission_id`),
  CONSTRAINT `FK_4df75616161dd63fae14f4f71b9` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ca161395d6a7e2f10590d9eea48` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_pems`
--

LOCK TABLES `roles_pems` WRITE;
/*!40000 ALTER TABLE `roles_pems` DISABLE KEYS */;
INSERT INTO `roles_pems` VALUES ('1','1'),('1','2'),('1','3'),('1','4'),('2','2');
/*!40000 ALTER TABLE `roles_pems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `estimated_start` int NOT NULL,
  `estimated_end` int NOT NULL,
  `index` int NOT NULL,
  `kanbanColumnId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1bc14b887771ee4d9545d6756c2` (`kanbanColumnId`),
  CONSTRAINT `FK_1bc14b887771ee4d9545d6756c2` FOREIGN KEY (`kanbanColumnId`) REFERENCES `kanban_columns` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `gender` tinyint NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `dob` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `hash_refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','2022-02-02 00:00:00.000000','2023-03-14 23:02:37.000000','admin','admin@gmail.com','0900000009','$2b$12$3.7JhJKdBP8Lnoore/aMuOjBt8oiIPwyc1X5JLL6AB9oP2Mh1ato2',1,1,'','1990-02-02 00:00:00','2023-03-14 23:02:16','$2b$10$2MGA6Eua4NfIdBUb7RNONuCcsaYURGQW89cO1jiqyyZF14/Ncai.2'),('2faec002-f2db-4d4f-83cc-88fff6c4eff7','2023-02-11 15:26:00.367826','2023-03-07 15:33:34.000000','Hằng','hang@gmail.com','0989123123','$2b$10$Y8vQiE17aPUW6cQnHBvYj.ICuc38TzarZ2Tjn3Qf3Wkoy9LjMx/4u',1,1,'','2000-01-01 07:00:00',NULL,NULL),('4f6a8e90-1915-4ff0-98ff-982eb42ad46e','2023-02-10 19:24:17.137310','2023-02-10 19:24:17.137310','sonmc','sonmc@gmail.com','0900000009','$2b$10$Gg9R2Bcku8aTO5JEY.Rd/O4JwBlrtu72D.10mny1zNTT7D96oaPyS',1,1,'','2000-01-01 07:00:00',NULL,NULL),('706abcd4-91b7-4039-8fae-196e44bd7903','2023-02-11 13:57:49.850527','2023-03-08 15:28:37.000000','abc','sonmc90123@gmail.com','0989123123','$2b$10$7RzooQo4j.53wlERJrYt5.fkdKcOx7t3D4NDYnEcP0DBEbpqlC5j.',1,1,'','2000-01-01 07:00:00',NULL,NULL),('8fa53140-a5e4-4f58-accc-2a012c8bb213','2023-02-11 13:37:41.217327','2023-03-08 12:15:16.000000','Tungkerry','tung@gmail.com','0989123123','$2b$10$COANlSV7xiwaQmGYtQxdyO1XkocjBelzXxnfZiwTqnmYIFR.pFNb2',1,1,'','2000-01-01 07:00:00',NULL,NULL),('b901803f-771e-4560-b7af-84a45a30f46e','2023-02-11 13:06:48.874466','2023-03-08 12:06:27.000000','Datlq','datlq@gmail.com','0989123123','$2b$10$W1FE1nvk1gTY1AnoSdhXDOmeXQFkFWfBI.3A10z7MI4.0FJl/JZYi',2,1,'','2000-01-01 07:00:00',NULL,NULL),('c8e4793d-44c7-400e-98e4-cc21d217107d','2023-02-11 13:52:18.292920','2023-03-08 10:59:29.000000','demo 123 123','demo123@gmail.com','0989123333','$2b$10$fJZOLu2PJiu8XD/N42W7auK9jfbt0jPHoNazZCfQ3i8SqgekPcyIK',2,1,'','2000-01-07 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_kanbans`
--

DROP TABLE IF EXISTS `users_kanbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_kanbans` (
  `joined_date` datetime NOT NULL,
  `user_shared` int NOT NULL,
  `kanban_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`kanban_id`,`user_id`),
  KEY `IDX_c52087f52f5c4bf5401fa466ff` (`kanban_id`),
  KEY `IDX_add019dc84b4fa2c84569964d9` (`user_id`),
  CONSTRAINT `FK_add019dc84b4fa2c84569964d96` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_c52087f52f5c4bf5401fa466ffa` FOREIGN KEY (`kanban_id`) REFERENCES `kanbans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_kanbans`
--

LOCK TABLES `users_kanbans` WRITE;
/*!40000 ALTER TABLE `users_kanbans` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_kanbans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_projects`
--

DROP TABLE IF EXISTS `users_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_projects` (
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `project_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`project_id`,`user_id`),
  KEY `IDX_741210c246defe00ed877a98f2` (`project_id`),
  KEY `IDX_0f280c70a3a6ab7f4cf3c658c4` (`user_id`),
  CONSTRAINT `FK_0f280c70a3a6ab7f4cf3c658c4c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_741210c246defe00ed877a98f2a` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_projects`
--

LOCK TABLES `users_projects` WRITE;
/*!40000 ALTER TABLE `users_projects` DISABLE KEYS */;
INSERT INTO `users_projects` VALUES ('2023-03-08 15:18:23','2023-03-15 15:18:23','1','706abcd4-91b7-4039-8fae-196e44bd7903'),('2023-03-08 15:22:22','2023-03-15 15:22:22','1','8fa53140-a5e4-4f58-accc-2a012c8bb213'),('2023-03-08 15:16:33','2023-03-15 15:16:33','2','4f6a8e90-1915-4ff0-98ff-982eb42ad46e');
/*!40000 ALTER TABLE `users_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` varchar(36) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_e4435209df12bc1f001e536017` (`user_id`),
  KEY `IDX_1cf664021f00b9cc1ff95e17de` (`role_id`),
  CONSTRAINT `FK_1cf664021f00b9cc1ff95e17de4` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FK_e4435209df12bc1f001e5360174` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES ('1','1'),('1','2'),('2faec002-f2db-4d4f-83cc-88fff6c4eff7','0'),('4f6a8e90-1915-4ff0-98ff-982eb42ad46e','2'),('706abcd4-91b7-4039-8fae-196e44bd7903','0'),('8fa53140-a5e4-4f58-accc-2a012c8bb213','0'),('b901803f-771e-4560-b7af-84a45a30f46e','0'),('c8e4793d-44c7-400e-98e4-cc21d217107d','0');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_tasks`
--

DROP TABLE IF EXISTS `users_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_tasks` (
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `task_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`task_id`,`user_id`),
  KEY `IDX_afb3dd8247c27198df5b9a8123` (`task_id`),
  KEY `IDX_aff222521447e7e0e4c51ff100` (`user_id`),
  CONSTRAINT `FK_afb3dd8247c27198df5b9a81235` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_aff222521447e7e0e4c51ff1007` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_tasks`
--

LOCK TABLES `users_tasks` WRITE;
/*!40000 ALTER TABLE `users_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_vacations`
--

DROP TABLE IF EXISTS `users_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_vacations` (
  `vacation_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`vacation_id`,`user_id`),
  KEY `IDX_e3d41ac4def7bdaa9ef8d986d1` (`vacation_id`),
  KEY `IDX_4b06962fad72e30249fa98f689` (`user_id`),
  CONSTRAINT `FK_4b06962fad72e30249fa98f689b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_e3d41ac4def7bdaa9ef8d986d15` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_vacations`
--

LOCK TABLES `users_vacations` WRITE;
/*!40000 ALTER TABLE `users_vacations` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `reason` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workloads`
--

DROP TABLE IF EXISTS `workloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workloads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `project_id` int NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c2a5143516772a26df1cb778883` (`userId`),
  CONSTRAINT `FK_c2a5143516772a26df1cb778883` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workloads`
--

LOCK TABLES `workloads` WRITE;
/*!40000 ALTER TABLE `workloads` DISABLE KEYS */;
/*!40000 ALTER TABLE `workloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'employee_management1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14 23:06:31
