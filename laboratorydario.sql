-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2023 a las 21:20:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorydario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `determinants`
--

CREATE TABLE `determinants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `measurement` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `determinants`
--

INSERT INTO `determinants` (`id`, `name`, `abbreviation`, `detail`, `measurement`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Hematocrito', 'MTC', '', 'g/dL', 1, '2023-11-06 20:48:35', '2023-11-06 20:51:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examdeterminants`
--

CREATE TABLE `examdeterminants` (
  `id` int(11) NOT NULL,
  `determinantId` int(11) DEFAULT NULL,
  `ExamId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exams`
--

INSERT INTO `exams` (`id`, `name`, `detail`, `abbreviation`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Hemograma', 'Analisis de sangre', 'HMG', 1, '2023-10-31 00:54:59', '2023-10-31 00:54:59'),
(2, 'Hepatograma', 'Analisis de higado', 'HPT', 1, '2023-10-31 00:55:18', '2023-10-31 00:55:18'),
(3, 'Proteína urinaria', 'cantidad de proteína secretada en la orina en un período de 24 horas.', 'PU', 1, '2023-10-31 03:38:30', '2023-10-31 03:38:30'),
(4, 'Bilirrubina conjugada - orina', 'cantidad de bilirrubina en la orina.', 'BO', 1, '2023-10-31 03:39:31', '2023-10-31 03:39:31'),
(5, 'Cultivo bacteriano', 'cultivo de heces para detectar enfermedades causadas por bacterias', 'CB', 1, '2023-10-31 03:40:57', '2023-10-31 03:40:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examsamples`
--

CREATE TABLE `examsamples` (
  `id` int(11) NOT NULL,
  `examId` int(11) DEFAULT NULL,
  `sampleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examsamples`
--

INSERT INTO `examsamples` (`id`, `examId`, `sampleId`, `createdAt`, `updatedAt`) VALUES
(6, 4, 1, '2023-11-01 01:51:54', '2023-11-01 01:51:54'),
(7, 5, 3, '2023-11-01 01:52:06', '2023-11-01 01:52:06'),
(8, 1, 2, '2023-11-01 01:52:16', '2023-11-01 01:52:16'),
(9, 2, 2, '2023-11-01 01:52:23', '2023-11-01 01:52:23'),
(10, 3, 1, '2023-11-01 01:52:30', '2023-11-01 01:52:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderexams`
--

CREATE TABLE `orderexams` (
  `id` int(11) NOT NULL,
  `examId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordersamples`
--

CREATE TABLE `ordersamples` (
  `id` int(11) NOT NULL,
  `sampleId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `samples`
--

CREATE TABLE `samples` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `samples`
--

INSERT INTO `samples` (`id`, `type`, `detail`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Orina', 'matutina', 1, '2023-10-31 03:36:52', '2023-10-31 03:36:52'),
(2, 'Sangre', 'En ayuno', 1, '2023-10-31 03:37:19', '2023-10-31 03:37:19'),
(3, 'Heces', 'matutina', 1, '2023-10-31 03:37:37', '2023-10-31 03:37:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231013181009-create-user.js'),
('20231019001546-create-exam.js'),
('20231019002901-create-determinant.js'),
('20231019003203-create-sample.js'),
('20231019005847-create-exam-sample.js'),
('20231025200510-create-value-reference.js'),
('20231025203035-create-exam-determinant.js'),
('20231029211706-create-order.js'),
('20231030202346-create-order-exam.js'),
('20231031042051-create-order-sample.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `diagnostic` varchar(255) DEFAULT NULL,
  `pregnant` tinyint(1) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `active`, `dni`, `phone`, `email`, `adress`, `key`, `location`, `direction`, `diagnostic`, `pregnant`, `birthdate`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'Mario', 'Guzman', 'male', 1, 40485036, NULL, 'mario@gmail.com', NULL, '1234', 'Argentina', 'Barrio tibileti', 'Diabetes tipo 2', 0, '2023-10-03 20:53:49', 'patient', '2023-10-31 00:53:49', '2023-10-31 00:53:49'),
(2, 'Jorge', 'Gomez', 'male', 1, 35678980, NULL, 'jorge@gmail.com', NULL, '1234', 'Argentina', 'Barrio Jose Hernandez', 'Colitis Aguda', 0, '2023-10-12 23:44:15', 'patient', '2023-10-31 03:44:15', '2023-10-31 03:44:15'),
(3, 'Maria', 'Perez', 'female', 1, 34567878, NULL, 'maria@gmail.com', NULL, '1234', 'Argentina', 'Barrio San Martin', 'Hipotiroidismo', 1, '2023-10-12 15:24:24', 'patient', '2023-10-31 19:24:24', '2023-10-31 19:24:24'),
(4, 'Marianela', 'Albornoz', 'Male', 1, 24567845, 2147483647, 'dario12bifa@gmail.com', NULL, NULL, 'Argentina', NULL, NULL, NULL, '2023-11-08 00:00:00', 'patient', '2023-11-04 14:01:42', '2023-11-04 14:01:42'),
(5, 'Juana', 'Perez', 'Male', 1, 12345678, 2147483647, 'juana@gmail.com', NULL, '$2b$10$b6zCmI59lDF0DWoCED/P3e9kauEapimTutiii3uYGLhGi9xPjxoH2', '', NULL, NULL, NULL, '0000-00-00 00:00:00', 'Administrative', '2023-11-04 14:05:41', '2023-11-04 14:05:42'),
(6, 'Luis', 'Abdala', 'Male', 1, 34567876, 2147483647, 'luis@gmail.com', NULL, '$2b$10$tWM12W57S4jSFHRfQg4qkOUZ.dzcZC7weer6FFTN/a/.ZjpjE.urC', 'Argentina', NULL, NULL, NULL, '0000-00-00 00:00:00', 'patient', '2023-11-04 18:36:39', '2023-11-04 18:36:39'),
(8, 'Pablo', 'Alcantara', 'Male', 1, 32564735, 2147483647, 'pablo@gmail.com', NULL, '$2b$10$4SOG7tawoX/cV1U795Orh.aS80lAlPKbyTE6FLG3SDCXmcrII9HNW', 'Argentina', NULL, NULL, NULL, '2023-11-01 00:00:00', 'Bioquimic', '2023-11-05 00:39:31', '2023-11-05 00:39:31'),
(9, 'Dario', 'Pascuali', NULL, 1, 40485036, NULL, 'dario@gmail.com', NULL, '$2b$10$9KDC3VZfqxnDJxytsPXUCeTKLQMW396szqCwEhNmxvtP6bPZoJ2D6', NULL, NULL, NULL, NULL, NULL, 'Administrative', '2023-11-05 20:30:35', '2023-11-06 21:13:36'),
(10, 'Rodrigo', 'Ponce', NULL, 1, 23456789, NULL, 'rodrigo@gmail.com', NULL, '$2b$10$iuffOE71hWnTE2/TlwNcp.dUfzjuJxoKMITWce2xTJkQp4YA/UwRi', NULL, NULL, NULL, NULL, NULL, 'Tecnic', '2023-11-07 03:16:51', '2023-11-07 03:17:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `value_references`
--

CREATE TABLE `value_references` (
  `id` int(11) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `pregnant` tinyint(1) DEFAULT NULL,
  `max_value` double DEFAULT NULL,
  `min_value` double DEFAULT NULL,
  `max_limit` double DEFAULT NULL,
  `min_limit` double DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `determinantId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `determinants`
--
ALTER TABLE `determinants`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examdeterminants`
--
ALTER TABLE `examdeterminants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `determinantId` (`determinantId`),
  ADD KEY `ExamId` (`ExamId`);

--
-- Indices de la tabla `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examsamples`
--
ALTER TABLE `examsamples`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examId` (`examId`),
  ADD KEY `sampleId` (`sampleId`);

--
-- Indices de la tabla `orderexams`
--
ALTER TABLE `orderexams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examId` (`examId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `ordersamples`
--
ALTER TABLE `ordersamples`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sampleId` (`sampleId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indices de la tabla `samples`
--
ALTER TABLE `samples`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `value_references`
--
ALTER TABLE `value_references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `determinantId` (`determinantId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `determinants`
--
ALTER TABLE `determinants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `examdeterminants`
--
ALTER TABLE `examdeterminants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `examsamples`
--
ALTER TABLE `examsamples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `orderexams`
--
ALTER TABLE `orderexams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ordersamples`
--
ALTER TABLE `ordersamples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT de la tabla `samples`
--
ALTER TABLE `samples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `value_references`
--
ALTER TABLE `value_references`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `examdeterminants`
--
ALTER TABLE `examdeterminants`
  ADD CONSTRAINT `examdeterminants_ibfk_1` FOREIGN KEY (`determinantId`) REFERENCES `determinants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `examdeterminants_ibfk_2` FOREIGN KEY (`ExamId`) REFERENCES `exams` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `examsamples`
--
ALTER TABLE `examsamples`
  ADD CONSTRAINT `examsamples_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `examsamples_ibfk_2` FOREIGN KEY (`sampleId`) REFERENCES `samples` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orderexams`
--
ALTER TABLE `orderexams`
  ADD CONSTRAINT `orderexams_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderexams_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `ordersamples`
--
ALTER TABLE `ordersamples`
  ADD CONSTRAINT `ordersamples_ibfk_1` FOREIGN KEY (`sampleId`) REFERENCES `samples` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ordersamples_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `value_references`
--
ALTER TABLE `value_references`
  ADD CONSTRAINT `value_references_ibfk_1` FOREIGN KEY (`determinantId`) REFERENCES `determinants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
