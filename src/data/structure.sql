-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: grupo3_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `fkUsuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrito_FK` (`fkUsuario`),
  CONSTRAINT `carrito_FK` FOREIGN KEY (`fkUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,0,1000000,1),(2,0,1000000,1),(3,0,1000000,1),(4,0,1000000,1),(5,0,1000000,1),(6,0,1000000,1),(7,0,1000000,1),(8,0,1000000,1),(9,0,1000000,1),(10,10,282000,1),(11,0,1000000,1);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritoproductos`
--

DROP TABLE IF EXISTS `carritoproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritoproductos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fkCarrito` int(11) NOT NULL,
  `fkProducto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrito_productos_FK` (`fkCarrito`),
  KEY `carrito_productos_FK_1` (`fkProducto`),
  CONSTRAINT `carrito_productos_FK` FOREIGN KEY (`fkCarrito`) REFERENCES `carrito` (`id`),
  CONSTRAINT `carrito_productos_FK_1` FOREIGN KEY (`fkProducto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoproductos`
--

LOCK TABLES `carritoproductos` WRITE;
/*!40000 ALTER TABLE `carritoproductos` DISABLE KEYS */;
INSERT INTO `carritoproductos` VALUES (1,1,1),(2,1,12),(3,1,13),(4,1,14),(5,1,15),(6,1,16);
/*!40000 ALTER TABLE `carritoproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Guitarras, bajos y ukeleles','guitarras.jpeg'),(2,'Pedales','pedales.jpg'),(3,'Teclados y pianos','teclados.jpeg'),(4,'Sonido y audio','sonido.jpeg'),(5,'Accesorios y extras','accesorios.jpeg'),(6,'Baterías y percusión','baterias.jpg');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Martin&Co'),(2,'Fender'),(3,'Yamaha'),(4,'Taylor'),(5,'Boss'),(6,'Ditto'),(7,'Marshall'),(8,'Gibson'),(9,'Stagg'),(10,'Ernie Ball'),(11,'AKG');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `stock` tinyint(1) NOT NULL,
  `fkCategoria` int(11) NOT NULL,
  `fkSubCategoria` int(11) NOT NULL,
  `fkMarca` int(11) NOT NULL,
  `enOferta` tinyint(4) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productos_FK` (`fkCategoria`),
  KEY `productos_FK_1` (`fkSubCategoria`),
  KEY `productos_FK_2` (`fkMarca`),
  CONSTRAINT `productos_FK` FOREIGN KEY (`fkCategoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_FK_1` FOREIGN KEY (`fkSubCategoria`) REFERENCES `subcategorias` (`id`),
  CONSTRAINT `productos_FK_2` FOREIGN KEY (`fkMarca`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'RC-30 Loop Station',72000,'BOSS celebrates the 10th anniversary of the LoopStation with an exciting new lineup of RC-series loopers! First out of the gate is the RC-30, a Twin Pedal multitrack looper with two synchronized stereo tracks and built-in loop effects. Plug in your instrument of choice, or even a microphone; an XLR input is provided, complete with phantom power. Record for up to three hours direct to internal memory, adding effects as you go. The USB 2.0 port lets you save your loops externally, and import/export WAV files.','boss_RC-30.png',1,2,4,5,0,0),(12,'Little Martin LX1',82000,'Handmade with heavy-duty materials, time-tested styles, and innovative designs, the Little Martin Series delivers classic acoustic guitars that any musician will love to play. These models are made from sustainable wood certified parts and are available in a variety of different wood types, so you can find the solid wood guitar that works best for your playing style and music type—rock, country, folk, bluegrass, jazz, pop, and much more.','martin_littlemartin_lx1.jpg',1,1,1,1,0,0),(13,'DITTO-X2 Looper',26000,'The original DITTO LOOPER rocked guitarists with a lust for looping like nothing else. Finally something that was simple, made for guitarists and sounded great. What would possibly be better? Well, how about all of that, plus new, next level looping features forged from pure awesome?','ditto_x2looper.jpg',0,2,4,6,0,0),(14,'562ce',70000,'Taylor’s Grand Concert 12-strings reaffirm Taylor’s heritage of easy-playing double course instruments thanks to a lap-friendly body size, a 12-fret neck, and a 24-7/8-inch scale length. The slinky handfeel makes fretting and bending strings easier, the neck and body are comfortably balanced, and the compact body produces a clear 12-string voice. The hardwood mahogany top adds just enough compression to the attack to smooth out the response, bringing an appealing consistency across the tonal spectrum, while still capturing the beautiful octave shimmer. V-Class bracing adds another dimension of musicality, improving volume and sustain so that notes and chords bloom and expand as they resonate. It makes a great 12-string choice for tracking in a studio, and behaves well with other instruments in a live setting. Refined aesthetic touches include a shaded edgeburst body and neck, faux tortoise shell binding, a rosette of faux tortoise shell and grained ivoroid, and a grained ivoroid Century fretboard inlay.','taylor.png',1,1,1,4,0,0),(15,'BC-1x',33000,'Equipped with cutting-edge BOSS technology, the BC-1X Bass Comp performs far beyond the capabilities of conventional bass compressor pedals. This premium stompbox features pro-level multiband compression controlled by intelligent circuitry, making it simple to dial in natural sounds for any playing style. The advanced design responds to different dynamics and registers to apply the perfect amount of compression in real time, ensuring that your tone never gets over-squeezed or muddy. Transparent, powerful, and easy to use, the BC-1X is a must-have tool that delivers studio-quality punch and precision for dynamic players.','boss_BC-1x.png',1,2,6,5,0,0),(16,'SD-1 Overdrive Pedal',18000,'The SD-1 allows players from beginner to pro to get inspiring sounds right away, thanks to its natural behavior and the subtle mid boost that\'s part of its design. It gives your tone a push where it matters most, ensuring your guitar always sits perfectly in the mix with warmth, clarity, and rich presence. Lower drive settings are great for rhythm parts, while higher settings are ideal for fat, singing leads. The SD-1 is also very sensitive to input gain, letting you dial in different shades of overdrive simply by adjusting your guitar\'s volume control.','boss_SD-1.png',1,2,5,5,1,1),(17,'AMERICAN PROFESSIONAL II STRATOCASTER®',2000000,'The American Professional II Stratocaster® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player.','fender_stratocaster_lightblue.jpg',1,1,3,2,1,0),(18,'TU-3 Chromatic Tuner',43000,'The world’s top-selling stage tuner, the BOSS TU-2, evolves and improves with the debut of the new TU-3. Housed in a tank-tough BOSS stompbox body, the TU-3 features a smooth 21-segment LED meter with a High-Brightness mode that cuts through the harshest outdoor glare. Choose between Chromatic or Guitar/Bass tuning modes, and enjoy visual pinpoint tuning verification with the Accu-Pitch Sign function. The TU-3 incorporates a convenient Note Name Indicator that can display notes of 7-string guitars and 6-string basses, while the Flat-Tuning mode can support up to six half-steps. It’s the new-standard tuner that no guitarist or bass player should be without!','boss_TU-3.png',1,2,7,5,0,0),(20,'RC-600 Loop Station',500000,'Meet the RC-600, the most advanced looper on the planet. Loaded with evolved features and customizable functions, this next-generation Loop Station ushers in a new era of creative power for guitarists, singer/songwriters, multi-instrumentalists, and other looping musicians. Capture multiple mics and instruments with six stereo tracks and premium 32-bit sound, and take full command with nine freely assignable footswitches and deep external control support. And that’s just the start—you can also color loops with a massive FX selection, groove with onboard rhythms, route audio as you like to the three stereo outputs, integrate with computer software via USB, and much more.','boss_rc-600.jpg',0,2,4,5,0,0),(22,'NTX5',57000,'The top-of-the-line NTX5 acoustic-electric, nylon-string guitar’s modern looks and unparalleled amplified sound enable electric guitarists and steel-string players to easily explore the world of nylon-string playing, while strap buttons and the exceptional Atmosfeel™ pickup system make it especially appealing to performing guitarists.','yamaha_NTX5.jpg',1,1,2,3,1,0),(23,'351 Classic Celluloid Pick',300,'Comfortable and familiar feel provided by the traditional 351 shape\r\nCelluloid picks give the traditional feel, with a smooth striking surface and a warm, round musical tone\r\nMedium gauge picks are ideal for the player looking for a warmer tone of a heavy pick, but the flexibility of a thin pick.\r\nFender picks provide comfort and high-performance flexibility for every performer','fender_pick_redblack.jpg',1,5,13,2,0,0),(25,'PSR-EW410 Keyboard',65000,'El PSR-EW410 es el mejor teclado de 76 teclas para interpretar cualquier estilo de música, desde los últimos éxitos hasta tus favoritos “en vinilo”, con una muestra de piano de alta resolución, unos potentes altavoces incorporados y funciones profesionales fáciles de usar como los Controladores de Directo asignables, Quick Sampling, Groove Creator, Grabación de Audio USB, y conexión a un subwoofer opcional.','yamaha_psr-ew410.jpg',1,3,9,3,0,0),(26,'MG10 Amplifier',30000,'Rehearse day and night with the MG10. Simple yet mighty this 10W amp is perfect for band practice or home use. The two channels, clean and overdrive, and the contour control function provide a great way to experiment with your sound. The MG10 can also support jam sessions and silent practice and is impressively loud thanks to the custom 6.5” speaker.','marshall_mg10-amplifier.jpg',1,4,12,7,1,0),(27,'Absolute Hybrid Maple',320000,'La respuesta a la pregunta anterior es “la que da al músico el sonido que necesita, cuando lo necesita”. Las necesidades de sonido varían dependiendo del baterista y de la dinámica de la música, cambiando según las bandas, canciones y momentos. Cuerpos de arce híbridos Lugs “hook” YESS III Soporte de toms de masa reducida Bordes optimizados Interior con acabado “vintage”\r\n\r\n','yamaha_AbsoluteHybridMaple.png',1,6,18,3,1,1),(28,'AMERICAN PROFESSIONAL II JAZZ BASS®',75000,'The American Professional II Jazz Bass® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player.','fender_jazzbass_lightgreen.jpg',1,1,19,2,1,0),(29,'SG Standard Bass',210000,' The SG Bass has the legendary looks, sound and feel which made it one of Gibson\'s most iconic basses. The short scale length is actually a big part of this sound! While the short scale length of the SG Bass is preferred by smaller players, it\'s also preferred by many for the strong fundamental tone for which this short scale bass is known. As expected, the solid mahogany body has deeply sculpted scarfing and the rounded profile mahogany neck and rosewood fingerboard feels familiar and comfortable. A pair of calibrated SG bass pickups (neck and bridge) with individual volume and master tone controls add further tonal possibilities.','gibson-SG Standard Bass-Heritage Cherry.png',1,1,19,8,0,0),(30,'EARTHWOOD EXTRA LIGHT 80/20 BRONZE ACOUSTIC GUITAR STRINGS - 10-50 GAUGE',4000,'Ernie Ball Earthwood 80/20 Bronze Acoustic Guitar Strings are made from 80% copper, 20% zinc wire wrapped around hex shaped brass plated steel core wire. These acoustic guitar strings provide a crisp, ringing sound with pleasing overtones. Gauges .010, .014 .020, .028, .040, .050','ernieball_extralightbronze.png',1,5,22,10,0,0),(32,'VO-1 Vocal Pedal',45000,'The VO-1 Vocoder is a unique and innovative stompbox that puts the massive expressive range of the human voice in the hands of every guitarist and bassist. By vocalizing into a connected mic as you play, it’s easy to transform your tone with electronic voices, classic talk box sounds, and tons of all-new colors that are perfect for modern music styles. It’s even possible to create impressive ensemble vocal sounds without the need to connect an external mic. When you plug into the VO-1, you can literally talk, sing, and cry with your axe, taking your playing to places you never dreamed of before.','boss_VO-1.png',1,2,8,5,1,0),(135,'EXTRA SLINKY NICKEL WOUND ELECTRIC GUITAR STRINGS - 8-38 GAUGE',2000,'Ernie Ball Nickel Wound Electric Guitar Strings are made from nickel plated steel wire wrapped around tin plated hex shaped steel core wire. The plain strings are made of specially tempered tin plated high carbon steel producing a well balanced tone for your guitar. Gauges .008, .011, .014, .022w, .030, .038','1639517222652_img_.png',1,5,22,10,0,0),(136,'REGULAR SLINKY COBALT ELECTRIC GUITAR STRINGS - 10-46 GAUGE',2500,'Ernie Ball Cobalt Slinky Electric Guitar Strings provide an extended dynamic range, incredible harmonic response, increased low end, and crisp, clear highs. Cobalt provides a stronger magnetic relationship between pickups and strings than any other alloy previously available. Cobalt Slinky guitar strings are also soft and silky to the touch, making string bending a breeze. Gauges .010, .013, .017, .026, .036, .046','ernieball_slinky-cobalt-electric-guitar-strings.png',1,5,22,10,0,0),(137,'10\' STRAIGHT / STRAIGHT INSTRUMENT CABLE - BLACK',5000,'Ernie Ball instrument cables feature a high-quality design made with superior components that are built to last. Dual-conductors deliver reliably clear tone with crisp highs, tight mids, and rich harmonics. Multiple shielding materials preserve the signal with low handling noise, and the durable PVC jacket exterior ensures long-lasting performance. Cable length 10ft (3.05m).','ernieball_straightcable.png',1,5,14,10,0,0),(138,'FLEXTUNE',7000,'The Ernie Ball FlexTune is a portable clip-on tuner suitable for guitar, bass, and other stringed instruments. Featuring an oversized 2\" LCD screen, the FlexTune provides a large, vibrant display that is easy to read from any angle. This is complemented by the tuner\'s dual-axis 360 degree pivot arm for complete flexibility to position the display to your liking. The FlexTune also features Chromatic, Guitar, Bass, Ukulele, and Violin tuning modes as well as selectable clip and microphone sensors.','1639517480387_img_.png',1,5,29,10,0,0),(139,'ADJUSTABLE GUITAR STAND',4500,'Fender\'s adjustable guitar stand conveniently showcases your acoustic, electric or bass guitar. Height-adjustable neck yoke comfortably accepts various instrument sizes, lower support swivels to accommodate standard and offset body styles, metal construction is durable enough for road use, and padded yokes won\'t harm nitrocellulose instrument finishes. Easily collapsible for convenient transport.','fender_adjustable-guitar-stand.png',1,5,30,2,0,0),(140,'FENDER® FLAT-TOP DREADNOUGHT ACOUSTIC GUITAR CASE',32000,'The Fender Flat-Top Dreadnought Acoustic Guitar Case offers all the durability and style modern players require, whether they\'re in search of a sturdy on-the-road or at-home storage solution. With its sleek black exterior and quality black plush lining, this heavy-duty protective case is built to withstand the rigors of the road and prevent damage to your acoustic instrument.','fender_fender-flat-top-dreadnought-acoustic-guitar-case.png',1,5,25,2,0,0),(141,'BMIDI-1-35',2000,'The BMIDI-1-35 and BMIDI-2-35 cables provide premium connectivity for the expanding lineup of BOSS pedals with space-saving 3.5 mm TRS MIDI jacks. These rugged and reliable cables feature 3.5 mm TRS and 5-pin DIN connectors, allowing you to connect products such as the BOSS 200 series, EV-1-WL, and others to gear equipped with traditional MIDI jacks, from pedals, loop switchers, and multi-effects units to keyboards and MIDI interfaces for computers. The low-profile plugs fit into tight spaces on your pedalboard, with a slim right-angle plug housing on the TRS side and three-way cable adjustment on the 5-pin DIN connector.','1639518052569_img_.png',1,5,14,5,0,0),(142,'Premium Softcase, Brown, Les Paul / SG',40000,'Gibson’s Premium Softcases have a rugged vinyl exterior and a plush inner lining to help keep your instrument safe and secure. They feature two accessory compartments; one with an organizer at the top near the headstock and a larger compartment on the front so you can take all of your accessories along with you.\r\n\r\nBrown vinyl exterior with a crimson plush interior\r\nPadded handle for a comfortable grip\r\nSecond grab handle on the rear for easy maneuverability\r\nDual, concealable backpack straps\r\nInternal dimensions: 40.5” length, 10.0” upper body width, 14.0” lower body width, 3.5” depth.','gibson_premium-softcase-brown-lespaul.png',1,5,25,8,0,0),(143,'DELUXE SERIES INSTRUMENT CABLE, TWEED',6000,'Fender Deluxe Series cables carry the highest quality materials and braided shielding to deliver flagship durability, conductance and transparency. Our top-of-the-line cables sport custom molded ends with strain relief under the housing—plus 24K gold-plated connectors that won’t tarnish or degrade your sound over time. These cables use a very quiet braided shielding that is engineered to maximize the purity of your tone, and they’re protected by a soft-woven yet rugged tweed jacket that provides ultimate protection with classic Fender style.','1639518420229_img_.png',0,5,14,2,0,0),(144,'AKG K72',70000,'Our K72 headphones deliver authoritative, extended low-frequency response that gives definition to kick drums and bass guitars. At the same time, the detailed yet precisely balanced high-frequency response reveals the nuance in vocals, guitars and acoustic instruments. Our generous 40mm drivers deliver high sensitivity for powerful output, plus an extended frequency response that reveals every detail. The K72s also feature a low-impedance design for compatibility with a broad range of playback devices, from professional studio gear to portable music players.','akg_k72.png',1,4,26,11,0,0),(145,'AKG K92',80000,'Our K92 headphones deliver authoritative, extended low-frequency response that gives definition to kick drums and bass guitars. At the same time, the detailed yet precisely balanced high-frequency response reveals the nuance in vocals, guitars and acoustic instruments. The K92’s generous 40mm drivers deliver the highest sensitivity and widest frequency response of the K52 and K72 - resulting in powerful output that reveals every detail. The K92s also feature a low-impedance design for compatibility with a broad range of playback devices, from professional studio gear to portable music players.','akg_k92.png',1,4,26,11,0,0),(146,'AKG P5 S',13000,'The Perception P5 high-performance dynamic vocal microphone delivers powerful sound for lead vocals. Its supercardioid polar pattern ensures utmost gain before feedback and ambient noise suppression, even on the noisiest stage.','akg_p5s.png',1,4,11,11,0,0),(147,'AXIS CAPO - ROSE GOLD SATIN',3000,'The Ernie Ball Axis Capo’s ergonomic features allow for fast and accurate single-handed key changes. Compatible with most electric and acoustic guitars, the Axis Capo offers eight color finishes to match, with a dual-radius design that fits both flat and curved fretboards. Shift capo position single-handedly, and rely on buzz-free clamping pressure that lets your songs sing out in every key. Take the Axis Capo on the road and trust precision-molded rubber pads to protect your guitar finish. On the stage or in your writing space, it has to be the Axis Capo.','1639518875890_img_.png',1,5,23,10,0,0),(148,'AXIS CAPO - BLUE STEEL',3200,'The Ernie Ball Axis Capo’s ergonomic features allow for fast and accurate single-handed key changes. Compatible with most electric and acoustic guitars, the Axis Capo offers eight color finishes to match, with a dual-radius design that fits both flat and curved fretboards. Shift capo position single-handedly, and rely on buzz-free clamping pressure that lets your songs sing out in every key. Take the Axis Capo on the road and trust precision-molded rubber pads to protect your guitar finish. On the stage or in your writing space, it has to be the Axis Capo.','1639518944864_img_.png',0,5,23,10,1,0),(149,'USA LEATHER STRAP, 2.5\"',5000,'Fender has always fashioned reliable American classics—it’s in our blood, and it’s our continuing tradition. Honor and become a part of this storied heritage by wearing your guitar with a strap that says it all. Crafted from leather and sporting a design inspired by the American flag, this strap is ready to hit the stage with rugged dependability and style.','1639519066752_img_.png',1,5,24,2,0,0),(150,' 2\" TRI-GLIDE ITALIAN LEATHER STRAP - BLACK',6000,'Durable, comfortable, and premium 2\" wide strap made from soft and comfortable black Italian leather. Machined stitched to quality black leather ends (EB logo stamped in gold print) for absolute maximum strength and longevity. Black Tri-Glide Delrin adjustable buckle makes adjustments smooth and easy while further enhancing durability and good looks. Adjustable length 35\" to 61\".','ernieball_leatherstrap.png',1,5,24,10,0,0),(151,'THIN ASSORTED CELLULOSE PICKS, BAG OF 144',500,'Cellulose Acetate Nitrate, Mixed Color Picks, .46mm, bag of 144.','ernieball_assortedpicks.png',1,5,13,10,0,0),(152,'C1K UKE',52000,'Martin has built the world’s finest ukuleles since 1916, and tenor ukes since 1929 that have long been prized for their full-bodied voice and great volume. The C1K concert-sized model features top, back and sides crafted of solid Hawaiian koa, a wood native to Hawaii and a favorite of island players. Entire body is finished in high quality satin lacquer, and features an applied dovetail neck joint. The C1K Uke is a beautiful example of why Martin is still the name in superior quality ukuleles.','martin_c1k.png',1,1,31,1,0,0),(153,'CONCERT UKE FSC',130000,'Built for serious players who want premium tone in an environmentally friendly instrument, this concert-sized ukulele features a top, back, and sides made from 100% FSC®-certified mahogany. You can feel good knowing that all the wood in this ukulele is responsibly sourced, and you’ll look and sound even better. It’s constructed with an applied dovetail mahogany neck for extra stability, it sports Ratio® tuners—a new feature on Martin ukes—to get you in tune quickly and accurately, and its satin finish adds the perfect amount of shine. Set the right tone for the planet with the Concert Ukulele FSC.','1639519331682_img_.png',1,1,31,1,0,0),(154,'SANTA ANA OVERDRIVE PEDAL',43000,'We helped generate the classic guitar tones that inspired players to create new music, and now with the Santa Ana Overdrive, we’ve brought our expertise to stompboxes. Armed with FET technology, this pedal lets you dial in sounds varying from “just a little hairy” all the way to thick, fully saturated overdrive. The flexible tone controls unlock a wide range of sonic flavors. This pedal cleans up with the guitar’s volume control, just like our famous amplifiers.','1639519439567_img_.png',1,2,5,2,0,0),(155,'SD-1 Overdrive Pedal',40000,'Since its release in 1981, the workhorse SD-1 Super Overdrive has been the core gain pedal for generations of players across every musical genre. Based around the revolutionary asymmetrical clipping circuit from the OD-1 Overdrive—one of the three original BOSS compact pedals from 1977—the SD-1 delivers rich, smooth, and highly musical overdrive tones that continue to inspire guitarists everywhere.','1639519555779_img_.png',1,2,5,5,0,0),(156,'D-X1E',90000,'New Style 28 mother-of-pearl pattern fingerboard inlay steps up the D-X1E, lending a bit of classic Martin style to this affordably priced model. It is equipped with Fishman® MX electronics and strung with Martin’s Authentic Acoustic Lifespan® 2.0 strings. With a new, soft gig bag featuring headstock, bridge, and endpin protectors, a durable water-repellent exterior, and foam padding, this model is ready to go anywhere.','martin_d-x1e.png',1,1,1,1,0,0),(157,'Taylor AD17',73000,'This Grand Pacific model is the first of our round-shoulder dreadnoughts to feature back and sides of solid ovangkol, an African tonewood that shares rosewood’s warmth and brilliance with additional presence in the midrange. Topped with solid spruce, the AD17 serves up a blend of sparkle and clean low-end power, enhanced by V-Class bracing for greater volume, longer sustain, and a more in-tune sound. That seasoned, vintage-hued tone is reflected in this model’s strikingly classic look, with a natural top and a deep Urban Sienna color treatment for the ovangkol back and sides. Minimally decorated but finely crafted, the AD17 also features chamfered body edges, stained spruce edge trim, a three-ring rosette in Hawaiian koa, and a faux tortoiseshell pickguard. The 2.0 mil-thick matte body finish minimizes damping for unfettered resonance. It ships in a Taylor AeroCase.','taylor_ad17.png',1,1,1,4,0,0),(158,'Taylor AD17e Blacktop',80000,'Built with solid ovangkol back and sides and a black, solid spruce top, the Grand Pacific AD17e asserts itself with a bold throwback aesthetic that complements its vintage-inspired tone. Ovangkol brings warmth and pleasing midrange focus, which, in concert with our V-Class bracing architecture, delivers a stunning tonal blend of power, sustain and musicality. Chamfered body edges and the trademark comfort of the Taylor neck make this Grand Pacific dreadnought a dream to play, offering guitarists of all styles and musical needs a versatile solid-wood option at a more accessible price. Simple appointments highlight this model’s musical focus, featuring a black top treatment with a black pickguard, single-ring rosette, 4mm dot fretboard inlays, and an ultra-thin matte finish. It comes with built-in ES2 electronics and ships in a light yet strong AeroCase.','taylor_ad17-black.png',1,1,1,4,0,0),(159,'Taylor AD27',82000,'This American Dream Grand Pacific model is sure to excite fans of the hardwood sound and aesthetic, thanks to solid sapele back and sides matched with a mahogany top. Its woody, midrange-focused voice receives a boost from V-Class bracing, which adds volume and sustain along with a clean, in-tune sound across the tonal spectrum. Seasoned with a clear, warm low end, it adds up to a resonant whole that can perform across genres and playing styles. For appointments, we’ve kept the American Dream Series minimal to make sure it’s accessible for today’s players. This model features chamfered body edges, black top purfling, 4mm dot fretboard inlays, a faux tortoiseshell pickguard, and an earthy Urban Sienna stain, all wrapped in a 2.0-mil matte finish. It ships in a Taylor AeroCase.','taylor_ad27.png',1,1,1,4,0,0),(160,'Taylor GTe Urban Ash',100000,'An exciting new entry into the world of acoustic-electric guitars, the GTe Urban Ash debuts a new body shape that’s sure to inspire players of all skill levels with its compact frame, accommodating feel, and robust acoustic voice. The GT (Grand Theater) features a scaled-down body that echoes the jumbo curves of our Grand Orchestra shape, with its dimensions reduced to create a remarkably approachable feel. The innovation extends to the GT’s interior architecture, built on a new asymmetrical bracing design called C-Class bracing. This new sonic structure brings the tonal benefits of V-Class bracing to the smaller GT body shape, producing more volume and longer sustain while also bolstering the GT’s bass response to surprising levels of low-end power from a smaller guitar. This model takes its name from the solid Urban Ash that composes its back and sides, which serve up a rich, shimmering midrange accented by pristine highs. Visually, the GT is appointed with modest details such as a three-ring koa rosette and Pinnacle inlays in Italian acrylic, preserving its accessible price point and clean aesthetic. A super-thin, water-based matte finish, paired with an Urban Sienna stain for the back and sides, reflects a dusky, alluring visual character, preserving the wood’s visual texture and allowing the player to feel the grain through the finish. Onboard ES2 electronics provide quick plug-and-play functionality when you need amplified sound. This model includes a sturdy, lightweight AeroCase™ for easy, safe transport.','1639519853560_img_.png',1,1,1,4,0,0),(161,'VE-500 Vocal Pedal',80000,'If you’re like most guitarists, you spend a lot of time choosing the right amps and pedals to craft your own personalized sound. But if you sing in your band as well, it hasn’t always been so easy to give your vocal sounds that same attention to detail—until now. The advanced VE-500 Vocal Performer provides everything you need to achieve impressive vocal harmonies and effects on stage, and all in streamlined stompbox that integrates seamlessly with the regular guitar effects on your pedalboard.\r\n\r\nPacking professional sound quality and serious BOSS DSP muscle, the VE-500 delivers sophisticated harmony and pitch correction functions that automatically track the chords you play on your guitar. It also includes a powerful vocoder and core sound-enhancement tools, plus world-class reverb, delay, and modulation sounds and specialty effects like distortion, filtering, and many others. And with programmable memories, you can instantly recall favorite setups for any song or style. The VE-500 is the perfect addition to the pedalboard of any singing guitarist, providing top-flight vocal processing that fits right alongside your standard guitar effects.','ve-500_main.jpg',1,2,8,5,0,0),(162,'AUTHENTIC ACOUSTIC LIFESPAN® 2.0 GUITAR STRINGS 80/20 BRONZE',3700,'Next generation Martin® Authentic Acoustic® Lifespan® 2.0 strings are engineered using a new, patented anti-corrosion treatment only available from Martin. It protects the core and wrap wire to prevent corrosion without compromising tone or feel. Our impeccable standards for acoustic guitar tone are embedded in our string design and precision manufacturing process. That’s why we make our own.','martin_strings-80-20-bronze.png',1,5,22,1,0,0),(163,'ORIGIN50C',130000,'Innovate and craft your sound using this 50W combo. A Celestion Midnight 60 12” type speaker provides a classic all-valve, rich and harmonic Marshall tone. This amp has classic styling and contains contemporary features. A power reduction feature, Powerstem,  perfectly matches your tone whether performing on stage or practicing in the studio. With a 2-way footswitch available you can control the gain boost and turn the FX loop on and off.','1639520381398_img_.png',1,4,12,7,0,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Cliente');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fkCategoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categorias_FK` (`fkCategoria`),
  CONSTRAINT `sub_categorias_FK` FOREIGN KEY (`fkCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,'Guitarras Acústicas',1),(2,'Guitarras Criollas',1),(3,'Guitarras Electricas',1),(4,'Loop Pedal-Station',2),(5,'Overdrive-Distortion Pedal',2),(6,'Bass Pedal',2),(7,'Tuner Pedal',2),(8,'Vocal Pedal',2),(9,'Teclados',3),(10,'Pianos',3),(11,'Micrófonos',4),(12,'Amplificadores',4),(13,'Púas',5),(14,'Cables',5),(18,'Baterías',6),(19,'Bajos',1),(22,'Cuerdas',5),(23,'Capos',5),(24,'Correas',5),(25,'Estuches y fundas',5),(26,'Auriculares',4),(27,'Bongos',6),(28,'Panderetas',6),(29,'Afinadores ',5),(30,'Stands y soportes ',5),(31,'Ukeleles',1);
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `fkRol` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarios_FK` (`fkRol`),
  CONSTRAINT `usuarios_FK` FOREIGN KEY (`fkRol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Tadeo','admin','admin','admin@gmail.com','$2a$10$qUkc3orkW5jh8RCx4dKdyuUzhWLeWzxaPFCLxAc6IcrC8Kc88jM1.','patronus.jpg','admin',1,0),(8,'John','Doe','Juan Doe','johndoe@gmail.com','$2a$10$425NoKZeaTRnNnNyVU9mO.d4E1cRFhyWH6eNgyujGsD9CypiON5za','dog.png','???',2,1),(39,'Tadeo','Gavensky','admin','tadeogavensky.email@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','hermione.jpg','Suffolk',2,0),(81,'Prueba','prueba','prueba','prueba@gmail.com','$2a$10$QeYGTkLN5esX5LqBeNcj2uVH9LAISrnEQ.qnattHJCwYRKq95bAEK','mecha.png','prueba',2,0),(82,'Tadeo','Gavensky','Ed','edit@gmail.com','$2a$10$2NC3ZO6MMYDQdyPrYuGRG.mxUZBtJE/aXvYmeDvJn6nntvwNo.siu','mecha.png','Suffolk',2,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'grupo3_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-15 15:11:07
