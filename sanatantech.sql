-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2022 at 05:05 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sanatantech`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `staffid` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `checkin` time NOT NULL,
  `checkout` time NOT NULL,
  `hours` varchar(255) NOT NULL,
  `isCheckout` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `staffid`, `date`, `checkin`, `checkout`, `hours`, `isCheckout`, `createdDate`, `modifiedDate`, `admin_id`) VALUES
(6, '9', '2022-01-27', '14:15:00', '17:15:00', '03:00:00', 'yes', '2022-01-27 08:45:47', NULL, 7),
(7, '10', '2022-01-30', '14:23:00', '19:28:00', '05:05:00', 'yes', '2022-01-27 08:53:20', NULL, 7),
(8, '9', '2022-01-29', '17:59:00', '21:59:00', '04:00:00', 'yes', '2022-01-27 10:29:13', NULL, 7),
(9, '10', '2022-01-29', '18:01:00', '20:01:00', '02:00:00', 'yes', '2022-01-27 10:31:57', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) NOT NULL,
  `admin_id` varchar(255) NOT NULL,
  `client_type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `taxno` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `is_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `admin_id`, `client_type`, `name`, `organization`, `email`, `website`, `phone`, `fax`, `address`, `pincode`, `city`, `state`, `country`, `currency`, `taxno`, `notes`, `is_status`) VALUES
(1, '7', 'Individual', 'bhadani', NULL, 'bhadani@gmail.com', 'https://sanatantechnovation.com/', '7046532916', '', 'Baroda, Gujarat', '398006', 'Baroda', 'Gujarat', 'United Kingdom', 'GBP', '789456230', 'nothing', 0),
(2, '7', 'Individual', 'bhadani', NULL, 'sanatan@gmail.com', 'https://sanatantechnovation.com/', '7046355906', '7895613246', 'testing good', '395006', 'surat', 'gujarat', 'India', 'USD', '', 'good', 0),
(3, '7', 'Individual', 'ashish', NULL, 'sanatantech@gmail.com', 'https://sanatantechnovation.com/', '7046355906', '7895613246', 'testing good', '395006', 'surat', 'gujarat', 'India', 'USD', '123156', NULL, 0),
(4, '7', 'Organization', 'bhadani', 'sanatan', 'kanaiya@gmail.com', 'https://sanatantechnovation.com/', '7856491523', '', 'testing good', '789456', 'surat', 'gujarat', 'United States', 'USD', '78946532', 'web develping working', 1),
(5, '7', 'Organization', 'sanjay', 'smartinfosys', 'sanjaydange@gmail.com', 'https://sanatantechnovation.com/', '7894561230', '789536120', 'surat , gujarart', '395006', 'surat', 'gujarat', 'India', 'INR', '78965302', 'web developing', 1),
(6, '7', 'Individual', 'kanaiyalal', NULL, 'bhadanikano@gmail.com', 'https://sanatantechnovation.com/', '5613264950', '7895613206', 'varachha road surat', '395002', 'surat', 'gujarat', 'India', 'INR', '7895632014', 'good ', 1),
(7, '7', 'Organization', 'raj', 'ec2', 'raj@gmail.com', 'ec2.com', '1238069485', '3857361570', 'surat', '395080', 'baroda', 'gujarat', 'India', 'INR', '798562310', 'good', 0),
(8, '7', 'Organization', 'kanani', 'sanatan', 'kanani@gmail.com', 'https://sanatantechnovation.com/', '1234567890', '', 'science city', '789456', 'surat', 'gujarat', 'United States', 'USD', '78956230104', 'programming', 1),
(9, '11', 'Individual', 'Ashish', NULL, 'ashish@gmail.com', 'https://sanatantechnovation.com/', '8956431207', '8946532017', 'varachha road, ', '395006', 'surat', 'gujarat', 'India', 'INR', '7986532001', 'good', 1),
(10, '11', 'Individual', 'joyel', NULL, 'joyel@gmail.com', '', '7895641301', '', 'Surat', '395006', 'surat', 'gujarat', 'India', 'INR', '', 'good', 1),
(11, '11', 'Organization', 'mahesh', 'swatchal', 'mahesh@gmail.com', '', '7986520314', '', 'surat', '', '', '', 'United Kingdom', 'GBP', '', '', 1),
(12, '27', 'Individual', 'Joyal', NULL, 'joyal@gmail.com', 'joyal-portfolio.netlify.app', '9913414802', '1', 'satellite', '1', 'ahmedabad', 'gujarat', 'India', 'INR', '2', 'good man', 1),
(13, '27', 'Organization', 'joby', 'loxim', 'joby@gmail.com', 'joyal-portfolio.netlify.app', '9989878787', '11', 'good invoice', '4', 'ahmedabad', 'gujarat', 'India', 'INR', '212', 'tax', 1);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `countrycode` char(3) NOT NULL,
  `countryname` varchar(200) NOT NULL,
  `code` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `countrycode`, `countryname`, `code`) VALUES
(1, 'AFG', 'Afghanistan', 'AF'),
(2, 'ALA', 'Åland', 'AX'),
(3, 'ALB', 'Albania', 'AL'),
(4, 'DZA', 'Algeria', 'DZ'),
(5, 'ASM', 'American Samoa', 'AS'),
(6, 'AND', 'Andorra', 'AD'),
(7, 'AGO', 'Angola', 'AO'),
(8, 'AIA', 'Anguilla', 'AI'),
(9, 'ATA', 'Antarctica', 'AQ'),
(10, 'ATG', 'Antigua and Barbuda', 'AG'),
(11, 'ARG', 'Argentina', 'AR'),
(12, 'ARM', 'Armenia', 'AM'),
(13, 'ABW', 'Aruba', 'AW'),
(14, 'AUS', 'Australia', 'AU'),
(15, 'AUT', 'Austria', 'AT'),
(16, 'AZE', 'Azerbaijan', 'AZ'),
(17, 'BHS', 'Bahamas', 'BS'),
(18, 'BHR', 'Bahrain', 'BH'),
(19, 'BGD', 'Bangladesh', 'BD'),
(20, 'BRB', 'Barbados', 'BB'),
(21, 'BLR', 'Belarus', 'BY'),
(22, 'BEL', 'Belgium', 'BE'),
(23, 'BLZ', 'Belize', 'BZ'),
(24, 'BEN', 'Benin', 'BJ'),
(25, 'BMU', 'Bermuda', 'BM'),
(26, 'BTN', 'Bhutan', 'BT'),
(27, 'BOL', 'Bolivia', 'BO'),
(28, 'BES', 'Bonaire', 'BQ'),
(29, 'BIH', 'Bosnia and Herzegovina', 'BA'),
(30, 'BWA', 'Botswana', 'BW'),
(31, 'BVT', 'Bouvet Island', 'BV'),
(32, 'BRA', 'Brazil', 'BR'),
(33, 'IOT', 'British Indian Ocean Territory', 'IO'),
(34, 'VGB', 'British Virgin Islands', 'VG'),
(35, 'BRN', 'Brunei', 'BN'),
(36, 'BGR', 'Bulgaria', 'BG'),
(37, 'BFA', 'Burkina Faso', 'BF'),
(38, 'BDI', 'Burundi', 'BI'),
(39, 'KHM', 'Cambodia', 'KH'),
(40, 'CMR', 'Cameroon', 'CM'),
(41, 'CAN', 'Canada', 'CA'),
(42, 'CPV', 'Cape Verde', 'CV'),
(43, 'CYM', 'Cayman Islands', 'KY'),
(44, 'CAF', 'Central African Republic', 'CF'),
(45, 'TCD', 'Chad', 'TD'),
(46, 'CHL', 'Chile', 'CL'),
(47, 'CHN', 'China', 'CN'),
(48, 'CXR', 'Christmas Island', 'CX'),
(49, 'CCK', 'Cocos [Keeling] Islands', 'CC'),
(50, 'COL', 'Colombia', 'CO'),
(51, 'COM', 'Comoros', 'KM'),
(52, 'COK', 'Cook Islands', 'CK'),
(53, 'CRI', 'Costa Rica', 'CR'),
(54, 'HRV', 'Croatia', 'HR'),
(55, 'CUB', 'Cuba', 'CU'),
(56, 'CUW', 'Curacao', 'CW'),
(57, 'CYP', 'Cyprus', 'CY'),
(58, 'CZE', 'Czech Republic', 'CZ'),
(59, 'COD', 'Democratic Republic of the Congo', 'CD'),
(60, 'DNK', 'Denmark', 'DK'),
(61, 'DJI', 'Djibouti', 'DJ'),
(62, 'DMA', 'Dominica', 'DM'),
(63, 'DOM', 'Dominican Republic', 'DO'),
(64, 'TLS', 'East Timor', 'TL'),
(65, 'ECU', 'Ecuador', 'EC'),
(66, 'EGY', 'Egypt', 'EG'),
(67, 'SLV', 'El Salvador', 'SV'),
(68, 'GNQ', 'Equatorial Guinea', 'GQ'),
(69, 'ERI', 'Eritrea', 'ER'),
(70, 'EST', 'Estonia', 'EE'),
(71, 'ETH', 'Ethiopia', 'ET'),
(72, 'FLK', 'Falkland Islands', 'FK'),
(73, 'FRO', 'Faroe Islands', 'FO'),
(74, 'FJI', 'Fiji', 'FJ'),
(75, 'FIN', 'Finland', 'FI'),
(76, 'FRA', 'France', 'FR'),
(77, 'GUF', 'French Guiana', 'GF'),
(78, 'PYF', 'French Polynesia', 'PF'),
(79, 'ATF', 'French Southern Territories', 'TF'),
(80, 'GAB', 'Gabon', 'GA'),
(81, 'GMB', 'Gambia', 'GM'),
(82, 'GEO', 'Georgia', 'GE'),
(83, 'DEU', 'Germany', 'DE'),
(84, 'GHA', 'Ghana', 'GH'),
(85, 'GIB', 'Gibraltar', 'GI'),
(86, 'GRC', 'Greece', 'GR'),
(87, 'GRL', 'Greenland', 'GL'),
(88, 'GRD', 'Grenada', 'GD'),
(89, 'GLP', 'Guadeloupe', 'GP'),
(90, 'GUM', 'Guam', 'GU'),
(91, 'GTM', 'Guatemala', 'GT'),
(92, 'GGY', 'Guernsey', 'GG'),
(93, 'GIN', 'Guinea', 'GN'),
(94, 'GNB', 'Guinea-Bissau', 'GW'),
(95, 'GUY', 'Guyana', 'GY'),
(96, 'HTI', 'Haiti', 'HT'),
(97, 'HMD', 'Heard Island and McDonald Islands', 'HM'),
(98, 'HND', 'Honduras', 'HN'),
(99, 'HKG', 'Hong Kong', 'HK'),
(100, 'HUN', 'Hungary', 'HU'),
(101, 'ISL', 'Iceland', 'IS'),
(102, 'IND', 'India', 'IN'),
(103, 'IDN', 'Indonesia', 'ID'),
(104, 'IRN', 'Iran', 'IR'),
(105, 'IRQ', 'Iraq', 'IQ'),
(106, 'IRL', 'Ireland', 'IE'),
(107, 'IMN', 'Isle of Man', 'IM'),
(108, 'ISR', 'Israel', 'IL'),
(109, 'ITA', 'Italy', 'IT'),
(110, 'CIV', 'Ivory Coast', 'CI'),
(111, 'JAM', 'Jamaica', 'JM'),
(112, 'JPN', 'Japan', 'JP'),
(113, 'JEY', 'Jersey', 'JE'),
(114, 'JOR', 'Jordan', 'JO'),
(115, 'KAZ', 'Kazakhstan', 'KZ'),
(116, 'KEN', 'Kenya', 'KE'),
(117, 'KIR', 'Kiribati', 'KI'),
(118, 'XKX', 'Kosovo', 'XK'),
(119, 'KWT', 'Kuwait', 'KW'),
(120, 'KGZ', 'Kyrgyzstan', 'KG'),
(121, 'LAO', 'Laos', 'LA'),
(122, 'LVA', 'Latvia', 'LV'),
(123, 'LBN', 'Lebanon', 'LB'),
(124, 'LSO', 'Lesotho', 'LS'),
(125, 'LBR', 'Liberia', 'LR'),
(126, 'LBY', 'Libya', 'LY'),
(127, 'LIE', 'Liechtenstein', 'LI'),
(128, 'LTU', 'Lithuania', 'LT'),
(129, 'LUX', 'Luxembourg', 'LU'),
(130, 'MAC', 'Macao', 'MO'),
(131, 'MKD', 'Macedonia', 'MK'),
(132, 'MDG', 'Madagascar', 'MG'),
(133, 'MWI', 'Malawi', 'MW'),
(134, 'MYS', 'Malaysia', 'MY'),
(135, 'MDV', 'Maldives', 'MV'),
(136, 'MLI', 'Mali', 'ML'),
(137, 'MLT', 'Malta', 'MT'),
(138, 'MHL', 'Marshall Islands', 'MH'),
(139, 'MTQ', 'Martinique', 'MQ'),
(140, 'MRT', 'Mauritania', 'MR'),
(141, 'MUS', 'Mauritius', 'MU'),
(142, 'MYT', 'Mayotte', 'YT'),
(143, 'MEX', 'Mexico', 'MX'),
(144, 'FSM', 'Micronesia', 'FM'),
(145, 'MDA', 'Moldova', 'MD'),
(146, 'MCO', 'Monaco', 'MC'),
(147, 'MNG', 'Mongolia', 'MN'),
(148, 'MNE', 'Montenegro', 'ME'),
(149, 'MSR', 'Montserrat', 'MS'),
(150, 'MAR', 'Morocco', 'MA'),
(151, 'MOZ', 'Mozambique', 'MZ'),
(152, 'MMR', 'Myanmar [Burma]', 'MM'),
(153, 'NAM', 'Namibia', 'NA'),
(154, 'NRU', 'Nauru', 'NR'),
(155, 'NPL', 'Nepal', 'NP'),
(156, 'NLD', 'Netherlands', 'NL'),
(157, 'NCL', 'New Caledonia', 'NC'),
(158, 'NZL', 'New Zealand', 'NZ'),
(159, 'NIC', 'Nicaragua', 'NI'),
(160, 'NER', 'Niger', 'NE'),
(161, 'NGA', 'Nigeria', 'NG'),
(162, 'NIU', 'Niue', 'NU'),
(163, 'NFK', 'Norfolk Island', 'NF'),
(164, 'PRK', 'North Korea', 'KP'),
(165, 'MNP', 'Northern Mariana Islands', 'MP'),
(166, 'NOR', 'Norway', 'NO'),
(167, 'OMN', 'Oman', 'OM'),
(168, 'PAK', 'Pakistan', 'PK'),
(169, 'PLW', 'Palau', 'PW'),
(170, 'PSE', 'Palestine', 'PS'),
(171, 'PAN', 'Panama', 'PA'),
(172, 'PNG', 'Papua New Guinea', 'PG'),
(173, 'PRY', 'Paraguay', 'PY'),
(174, 'PER', 'Peru', 'PE'),
(175, 'PHL', 'Philippines', 'PH'),
(176, 'PCN', 'Pitcairn Islands', 'PN'),
(177, 'POL', 'Poland', 'PL'),
(178, 'PRT', 'Portugal', 'PT'),
(179, 'PRI', 'Puerto Rico', 'PR'),
(180, 'QAT', 'Qatar', 'QA'),
(181, 'COG', 'Republic of the Congo', 'CG'),
(182, 'REU', 'Réunion', 'RE'),
(183, 'ROU', 'Romania', 'RO'),
(184, 'RUS', 'Russia', 'RU'),
(185, 'RWA', 'Rwanda', 'RW'),
(186, 'BLM', 'Saint Barthélemy', 'BL'),
(187, 'SHN', 'Saint Helena', 'SH'),
(188, 'KNA', 'Saint Kitts and Nevis', 'KN'),
(189, 'LCA', 'Saint Lucia', 'LC'),
(190, 'MAF', 'Saint Martin', 'MF'),
(191, 'SPM', 'Saint Pierre and Miquelon', 'PM'),
(192, 'VCT', 'Saint Vincent and the Grenadines', 'VC'),
(193, 'WSM', 'Samoa', 'WS'),
(194, 'SMR', 'San Marino', 'SM'),
(195, 'STP', 'São Tomé and Príncipe', 'ST'),
(196, 'SAU', 'Saudi Arabia', 'SA'),
(197, 'SEN', 'Senegal', 'SN'),
(198, 'SRB', 'Serbia', 'RS'),
(199, 'SYC', 'Seychelles', 'SC'),
(200, 'SLE', 'Sierra Leone', 'SL'),
(201, 'SGP', 'Singapore', 'SG'),
(202, 'SXM', 'Sint Maarten', 'SX'),
(203, 'SVK', 'Slovakia', 'SK'),
(204, 'SVN', 'Slovenia', 'SI'),
(205, 'SLB', 'Solomon Islands', 'SB'),
(206, 'SOM', 'Somalia', 'SO'),
(207, 'ZAF', 'South Africa', 'ZA'),
(208, 'SGS', 'South Georgia and the South Sandwich Islands', 'GS'),
(209, 'KOR', 'South Korea', 'KR'),
(210, 'SSD', 'South Sudan', 'SS'),
(211, 'ESP', 'Spain', 'ES'),
(212, 'LKA', 'Sri Lanka', 'LK'),
(213, 'SDN', 'Sudan', 'SD'),
(214, 'SUR', 'Suriname', 'SR'),
(215, 'SJM', 'Svalbard and Jan Mayen', 'SJ'),
(216, 'SWZ', 'Swaziland', 'SZ'),
(217, 'SWE', 'Sweden', 'SE'),
(218, 'CHE', 'Switzerland', 'CH'),
(219, 'SYR', 'Syria', 'SY'),
(220, 'TWN', 'Taiwan', 'TW'),
(221, 'TJK', 'Tajikistan', 'TJ'),
(222, 'TZA', 'Tanzania', 'TZ'),
(223, 'THA', 'Thailand', 'TH'),
(224, 'TGO', 'Togo', 'TG'),
(225, 'TKL', 'Tokelau', 'TK'),
(226, 'TON', 'Tonga', 'TO'),
(227, 'TTO', 'Trinidad and Tobago', 'TT'),
(228, 'TUN', 'Tunisia', 'TN'),
(229, 'TUR', 'Turkey', 'TR'),
(230, 'TKM', 'Turkmenistan', 'TM'),
(231, 'TCA', 'Turks and Caicos Islands', 'TC'),
(232, 'TUV', 'Tuvalu', 'TV'),
(233, 'UMI', 'U.S. Minor Outlying Islands', 'UM'),
(234, 'VIR', 'U.S. Virgin Islands', 'VI'),
(235, 'UGA', 'Uganda', 'UG'),
(236, 'UKR', 'Ukraine', 'UA'),
(237, 'ARE', 'United Arab Emirates', 'AE'),
(238, 'GBR', 'United Kingdom', 'GB'),
(239, 'USA', 'United States', 'US'),
(240, 'URY', 'Uruguay', 'UY'),
(241, 'UZB', 'Uzbekistan', 'UZ'),
(242, 'VUT', 'Vanuatu', 'VU'),
(243, 'VAT', 'Vatican City', 'VA'),
(244, 'VEN', 'Venezuela', 'VE'),
(245, 'VNM', 'Vietnam', 'VN'),
(246, 'WLF', 'Wallis and Futuna', 'WF'),
(247, 'ESH', 'Western Sahara', 'EH'),
(248, 'YEM', 'Yemen', 'YE'),
(249, 'ZMB', 'Zambia', 'ZM'),
(250, 'ZWE', 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `symbol` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `country`, `currency`, `code`, `symbol`) VALUES
(1, 'America', 'Dollars', 'USD', '$'),
(2, 'India', 'Rupees', 'INR', '₹'),
(3, 'United Kingdom', 'Pounds', 'GBP', '£'),
(4, 'Belgium', 'Euro', 'EUR', '€'),
(5, 'United Arab Emirates', 'UAE Dirham', 'AED', 'د.إ');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(10) NOT NULL,
  `admin_id` int(10) NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `currency` varchar(100) NOT NULL,
  `from_address` varchar(255) NOT NULL,
  `client_id` int(10) NOT NULL,
  `date` date NOT NULL,
  `due_date` date NOT NULL,
  `notes` varchar(255) NOT NULL,
  `tax` int(255) NOT NULL,
  `subtotal` int(255) NOT NULL,
  `total` int(255) NOT NULL,
  `is_paid` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `admin_id`, `invoice_no`, `currency`, `from_address`, `client_id`, `date`, `due_date`, `notes`, `tax`, `subtotal`, `total`, `is_paid`, `updated_at`) VALUES
(1, 7, '202201-01', 'INR', 'Admin, varachha road, surat, gujarat, 789456, India', 6, '2022-01-17', '2022-01-11', 'noting good', 5, 50, 55, 1, '2022-01-27 06:22:40'),
(2, 7, '202201-02', 'GBP', 'Admin, varachha road, surat, gujarat, 789456, India', 8, '2022-01-18', '2022-01-21', 'noting good', 15, 100, 115, 1, '2022-01-27 06:22:40'),
(3, 7, '202201-03', 'GBP', 'Admin, varachha road, surat, gujarat, 789456, India', 8, '2022-01-18', '2022-01-28', 'noting good', 15, 100, 115, 1, '2022-01-27 06:22:40'),
(4, 7, '202201-04', 'AED', 'Admin, varachha road, surat, gujarat, 789456, India', 8, '2022-01-18', '2022-01-22', 'noting good', 5, 100, 105, 1, '2022-01-27 06:22:40'),
(5, 7, '202201-05', 'GBP', 'Admin, varachha road, surat, gujarat, 789456, India', 6, '2022-01-20', '2022-01-17', 'noting good', 5, 50, 55, 1, '2022-01-27 06:22:40'),
(6, 7, '202201-06', 'EUR', 'Admin, varachha road, surat, gujarat, 789456, India', 8, '2022-01-21', '2022-01-21', 'noting good', 15, 100, 115, 1, '2022-01-27 06:22:40'),
(7, 7, '202201-07', 'INR', 'Admin, varachha road, surat, gujarat, 789456, India', 9, '2022-01-21', '2022-01-20', 'noting good', 15, 100, 115, 1, '2022-01-27 06:22:40'),
(8, 11, '202201-01', 'INR', 'hemish, surat, surat, gujarat, 395006, India', 5, '2022-01-21', '2022-01-21', 'noting good', 18, 50, 59, 1, '2022-01-24 05:46:48');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `id` int(10) NOT NULL,
  `admin_id` int(10) NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`id`, `admin_id`, `invoice_no`, `description`, `qty`, `price`, `amount`) VALUES
(65, 7, '202201-01', 'qwe', '2', '25', '50.00'),
(66, 7, '202201-01', 'tes', '10', '10', '100.00'),
(67, 7, '202201-01', 'qwe', '2', '25', '50.00'),
(70, 7, '202201-03', 'manage', '5', '10', '50.00'),
(72, 7, '202201-03', 'manage', '5', '10', '50.00'),
(74, 7, '202201-04', '12', '12', '3', '36.00'),
(75, 7, '202201-05', 'swatchal', '1', '100', '100.00'),
(76, 7, '202201-05', 'invoice', '2', '50', '100.00'),
(77, 7, '202201-06', 'testing', '5', '10', '50.00'),
(79, 7, '202201-07', 'swatchal', '2', '50', '100.00'),
(80, 11, '202201-01', 'test', '5', '10', '50.00');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`) VALUES
(2, 'smart', 30);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) NOT NULL,
  `admin_id` varchar(255) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_status` int(11) NOT NULL DEFAULT 1,
  `sign_date` date NOT NULL,
  `deadline_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `admin_id`, `project_name`, `client_name`, `email`, `phone`, `description`, `is_status`, `sign_date`, `deadline_date`) VALUES
(1, '7', 'testing', 'tester', 'hemish123@gmail.com', '7895623014', 'testing', 1, '2022-01-22', '2022-01-27'),
(2, '7', 'invoice', 'sanatan', 'bhadnai@gmail.com', '7986451320', 'testing projects', 1, '2022-01-29', '2022-01-30'),
(3, '7', 'invoice', 'sanatan-inhouse', 'bhadnai@gmail.com', '7902759381', 'testing projects', 0, '2022-01-23', '2022-01-25'),
(5, '7', 'smartcapture', 'google', 'google@gmaqil.comq', '1234567890', 'testing', 0, '2022-01-20', '2022-01-22'),
(6, '7', 'inventory', 'inhouse', 'kanaiya@gmail.com', '9845631278', 'stock manageing', 0, '2022-01-21', '2022-02-06'),
(8, '7', 'inventory', 'smartmentors', 'info@sanatantechnovation.com', '7894561230', 'good', 1, '2022-01-22', '2022-01-22'),
(9, '7', 'retail', 'khodiyar plastics', 'retail@gmail.com', '7895613204', 'very good service', 1, '2022-01-20', '2022-01-30'),
(10, '11', 'swatchal', 'margon', 'margon@gmail.com', '7894562301', 'surat', 1, '2022-01-21', '2022-01-14'),
(11, '27', 'invoice', 'sanatan', 'sanatan@gmail.com', '9989898987', 'good company', 1, '2022-01-26', '2022-02-26'),
(12, '27', 'qqq', 'abc', 'user@email.com', '9913414802', 'aa', 1, '2022-01-26', '2022-01-26'),
(13, '27', 'qqq', 'abc', 'joyalshah@gmail.com', '9999999999', 'aa', 1, '2022-01-26', '2022-01-26'),
(14, '27', 'inventory1', 'as', 'user@email.com', '9913414802', 'sasa', 1, '2022-01-26', '2022-01-26');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `photo` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `doc1` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `doc2` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `is_status` int(11) NOT NULL DEFAULT 1,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` timestamp NULL DEFAULT NULL,
  `deletedDate` timestamp NULL DEFAULT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `email`, `phone`, `address`, `photo`, `doc1`, `doc2`, `password`, `note`, `is_status`, `createdDate`, `modifiedDate`, `deletedDate`, `admin_id`) VALUES
(9, 'ronak', 'ronak@gmail.com', '9989898988', 'ddfd', 'photo_1643272506311.png', 'doc1_1643272506323.png', 'doc2_1643272506331.png', '$2a$10$taO7yPBSdNhi8reP4MF8nu53OGIF591CAqRtDSutPkqdXF.V6ldiy', 'dffd', 1, '2022-01-27 08:35:06', NULL, NULL, 7),
(10, 'manan', 'manan@gmail.com', '9989898787', 'assaas', 'photo_1643273590441.png', 'doc1_1643273590457.png', 'doc2_1643273590468.png', '$2a$10$5mqV3aUNieGpR0U/1mJMFumPdoE5OVG6GVhAGX2FlA5pYvvhdBDwu', 'asas', 1, '2022-01-27 08:53:10', NULL, NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `tax_details`
--

CREATE TABLE `tax_details` (
  `id` int(10) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `tax_name` varchar(255) NOT NULL,
  `tax_rate` varchar(2) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tax_details`
--

INSERT INTO `tax_details` (`id`, `admin_id`, `tax_name`, `tax_rate`, `is_active`) VALUES
(1, 7, 'cgst', '10', 1),
(2, 7, 'gst', '5', 1),
(3, 7, 'sgst', '15', 1),
(4, 7, 'vat', '18', 0),
(6, 7, 'sgst', '20', 0),
(7, 11, 'vat', '18', 1),
(8, 11, 'gst', '15', 1),
(9, 11, 'igst', '8', 0),
(11, 24, '50', '11', 1),
(12, 24, '44', '55', 1),
(13, 24, '55', '56', 0),
(14, 24, '11', '12', 0),
(15, 27, 'abc', '1.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `id` int(11) NOT NULL,
  `staffid` varchar(255) NOT NULL,
  `projectid` int(11) NOT NULL,
  `date` date NOT NULL,
  `checkin` time NOT NULL,
  `checkout` time NOT NULL,
  `time` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` timestamp NULL DEFAULT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`id`, `staffid`, `projectid`, `date`, `checkin`, `checkout`, `time`, `task`, `createdDate`, `modifiedDate`, `admin_id`) VALUES
(3, '9', 2, '2022-01-27', '18:08:00', '23:08:00', '05:00:00', 'assaassa', '2022-01-27 12:38:59', NULL, 7),
(4, '10', 1, '2022-01-27', '04:09:00', '19:09:00', '15:00:00', 'sasa', '2022-01-27 12:39:59', NULL, 7),
(5, '9', 1, '2022-01-30', '19:10:00', '23:10:00', '04:00:00', 'asassa', '2022-01-27 12:40:21', NULL, 7),
(6, '10', 2, '2022-01-29', '18:10:00', '22:10:00', '04:00:00', 'sasasa', '2022-01-27 12:40:37', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `client_type` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `taxname_one` varchar(255) DEFAULT NULL,
  `taxno_one` varchar(255) DEFAULT NULL,
  `taxname_two` varchar(255) DEFAULT NULL,
  `taxno_two` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `is_business` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `cname`, `phone`, `email`, `password`, `image`, `client_type`, `website`, `fax`, `address`, `pincode`, `city`, `state`, `country`, `currency`, `taxname_one`, `taxno_one`, `taxname_two`, `taxno_two`, `notes`, `is_business`) VALUES
(1, 'test', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, 'test', 'test', '23123', 'info@sanatantechnovation.com', 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, 'test', 'test', '7046355916', 'info@sanatantechnovation.com', 'terewrerw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, 'test', 'test', '1234567', 'info@sanatantechnovation.com', '$2a$10$QHlSB5.0k1HnPcD/YjHKZORxDF/UE/GvqXJZ/Ky9cCdXIRb.inksK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(5, '', '', '', '', '$2a$10$14Qf.2IEZ5xf.u73WkpgN.Q.NK73SZsDHNCvfZIm8WcyB6.BIeJY.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(6, 'test', '4343', '312323', '434234', '$2a$10$7iTj22MFe.QWZSagGVesGOgAUn0NatfZRYdh3NxAiczfoc2fpKuJu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(7, 'Joyal', 'sanatan', '9913414802', 'joyal@gmail.com', '$2a$10$b4ct48He2nfTRQYTVbjl0OORjjnVByrXQnHd40v.45CwsfKP1xHxm', 'file_1643179549310.png', NULL, 'joyal-portfolio.netlify.app', '1', 'satellite', '1', 'ahmedabad', 'gujarat', 'India', 'INR', 'a', '1', 'b', '2', 'aaa', 1),
(8, 'amit', 'sanatan', '6039582716', 'sanatan@gmail.com', '$2a$10$t.j0Bzf58Vo6ZIvS2575wOjNsNbewtIw1HmIg33LaEmmTPAnO3/lm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(11, 'hemish', 'sanatan', '4069284756', 'hemish@gmail.com', '$2a$10$cXWt.BERJIa0p563XnpHoOauIjlTASwO9IPtdYU.rJ/PizKpuZK52', 'file_1642397780839.png', NULL, 'https://sanatantechnovation.com/', '7895613204', 'surat', '395006', 'surat', 'gujarat', 'India', 'INR', 'gst', '7895623041', 'cgst', '7986532104', 'noting good', 1),
(13, 'bhadani', 'kanaiyalal', '7047457890', 'sanatan@gmail.com', '$2a$10$fNSik09V7REjbuWD8QXreejzoYziyN.kxJtZQcmm7DuQgGn.82WrW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(22, 'hemish', 'sanatan', '5678901234', 'test@gmail.com', '$2a$10$blkcvO7duizpl78CT3VfnOPnAPLUDGmCcC1BoEgdtSJmBhOVbPuMC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(23, 'bhadani', 'test', '1234567890', 'google@gmaqil.com', '$2a$10$4TqAwk2Vy.ik11gObRnDUe2dn3xzqTbZiGTmFmEoUFjJGI.jIXatO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(24, 'kanaiyalal', 'sanatan', '7895656102', 'bhadani@gmail.com', '$2a$10$TPPFPb6imMI8F0O3gTA4E.vIkc2yUsDOIoW4Dm/gAYl.S6nfM5Lb.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(25, 'sanatan', 'sanatantech', '7986431025', 'sanataninfo@gmail.com', '$2a$10$WNVTq3K.RNSTDcUMVZg6nuxFEg6huVhrBG0Vx9Oq1z2jFOVcfBxYy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(26, 'admin', 'sanatantech', '7986534210', 'admin@admin.com', '$2a$10$lmSxAuXmf/UGPIcgwAdSIemyzj9h04ZBR7bmbRO8Z6sRcCItcy89a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(27, 'Admin', 'sanatan', '8976534210', 'bhadanikaniaya@gmail.com', '$2a$10$lubUh7P3vlle76ZqwQwkZelVuoPpaQqdlHm/ElrXYhNY6/tM6w9ly', 'file_1642411612902.png', NULL, 'https://sanatantechnovation.com/', '7895626031', 'varachha road', '789456', 'surat', 'gujarat', 'India', 'INR', 'gst', '7894653201', 'cgst', '8965312407', 'noting good', 1),
(334, 'joby', 'gfgfwwew', '9913414802', 'joby@gmail.com', '$2a$10$ER4.7am0Ap8eQkuEI8KjuO7nF49CJIy7k6NFYSrZgOu0vZ2Q7aGw2', 'file_1643289586124.png', NULL, 'sds', '1', 'saas', '1', 'asa', 'saas', 'Saint Barthélemy', 'USD', 'sa', '1', 'saa', '1', 'sasas', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tax_details`
--
ALTER TABLE `tax_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tax_details`
--
ALTER TABLE `tax_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `track`
--
ALTER TABLE `track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
