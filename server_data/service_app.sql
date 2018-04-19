/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.1.24-MariaDB : Database - self_service
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`self_service` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `self_service`;

/*Table structure for table `bill_db` */

DROP TABLE IF EXISTS `bill_db`;

CREATE TABLE `bill_db` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bill_num` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `due_date` date NOT NULL,
  `bill_amount` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `bill_db` */

insert  into `bill_db`(`ID`,`user_id`,`bill_num`,`due_date`,`bill_amount`) values (1,1,'12345','2018-03-30',250.8),(2,1,'45615','2018-03-19',365.65),(3,1,'25482','2018-03-29',253.64),(4,1,'38651','2018-03-01',254.36),(5,1,'21846','2018-03-31',365.6),(6,1,'21987','2018-03-22',965.36),(7,1,'29879','2018-04-07',864.24),(8,1,'24987','2018-04-05',349.63),(9,1,'35468','2018-04-25',325.5),(10,2,'32465','2018-03-30',453.45),(11,3,'46547','2018-03-30',453.45),(12,3,'46874','2018-03-30',349.63),(13,4,'54562','2018-03-30',864.24),(14,3,'48484','2018-03-28',253.64),(15,23,'16161','2018-03-30',453.45),(16,2,'46464','2018-03-30',349.63),(17,3,'28644','2018-03-30',864.24),(18,2,'56248','2018-03-30',253.64),(19,2,'56284','2018-03-30',453.45),(20,2,'64848','2018-03-19',349.63),(21,3,'64896','2018-04-25',864.24),(22,22,'54896','2018-03-19',253.64),(23,3,'18161','2018-04-25',453.45),(24,2,'64789','2018-04-25',349.63),(25,2,'51684','2018-04-25',864.24),(26,2,'16841','2018-03-19',253.64),(27,3,'16681','2018-04-25',453.45),(28,3,'18916','2018-03-01',349.63),(29,3,'61861','2018-03-19',864.24),(30,2,'16181','2018-03-01',864.24),(31,2,'16816','2018-03-01',253.64),(32,3,'','2018-03-19',453.45);

/*Table structure for table `user_db` */

DROP TABLE IF EXISTS `user_db`;

CREATE TABLE `user_db` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `accountnum` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user_db` */

insert  into `user_db`(`ID`,`username`,`email`,`phone`,`password`,`address`,`accountnum`) values (1,'VeeR','veerhunter127@gmail.com','123456789','123','asdfaefefase','40000560');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
