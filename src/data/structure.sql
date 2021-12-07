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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Martin&Co'),(2,'Fender'),(3,'Yamaha'),(4,'Taylor'),(5,'Boss'),(6,'Ditto'),(7,'Marshall'),(8,'Gibson'),(9,'Stagg'),(10,'Ernie Ball');
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'RC-30 Loop Station',70000,'BOSS celebrates the 10th anniversary of the LoopStation with an exciting new lineup of RC-series loopers! First out of the gate is the RC-30, a Twin Pedal multitrack looper with two synchronized stereo tracks and built-in loop effects. Plug in your instrument of choice, or even a microphone; an XLR input is provided, complete with phantom power. Record for up to three hours direct to internal memory, adding effects as you go. The USB 2.0 port lets you save your loops externally, and import/export WAV files.','boss_RC-30.png',1,2,4,5,0,0),(12,'Little Martin LX1',82000,'Handmade with heavy-duty materials, time-tested styles, and innovative designs, the Little Martin Series delivers classic acoustic guitars that any musician will love to play. These models are made from sustainable wood certified parts and are available in a variety of different wood types, so you can find the solid wood guitar that works best for your playing style and music type—rock, country, folk, bluegrass, jazz, pop, and much more.','martin_littlemartin_lx1.jpg',1,1,1,1,0,0),(13,'DITTO-X2 Looper',26000,'The original DITTO LOOPER rocked guitarists with a lust for looping like nothing else. Finally something that was simple, made for guitarists and sounded great. What would possibly be better? Well, how about all of that, plus new, next level looping features forged from pure awesome?','ditto_x2looper.jpg',0,2,4,6,0,0),(14,'562ce',70000,'Taylor’s Grand Concert 12-strings reaffirm Taylor’s heritage of easy-playing double course instruments thanks to a lap-friendly body size, a 12-fret neck, and a 24-7/8-inch scale length. The slinky handfeel makes fretting and bending strings easier, the neck and body are comfortably balanced, and the compact body produces a clear 12-string voice. The hardwood mahogany top adds just enough compression to the attack to smooth out the response, bringing an appealing consistency across the tonal spectrum, while still capturing the beautiful octave shimmer. V-Class bracing adds another dimension of musicality, improving volume and sustain so that notes and chords bloom and expand as they resonate. It makes a great 12-string choice for tracking in a studio, and behaves well with other instruments in a live setting. Refined aesthetic touches include a shaded edgeburst body and neck, faux tortoise shell binding, a rosette of faux tortoise shell and grained ivoroid, and a grained ivoroid Century fretboard inlay.','taylor_562ce.jpg',0,1,1,4,1,0),(15,'BC-1x',32000,'Equipped with cutting-edge BOSS technology, the BC-1X Bass Comp performs far beyond the capabilities of conventional bass compressor pedals. This premium stompbox features pro-level multiband compression controlled by intelligent circuitry, making it simple to dial in natural sounds for any playing style. The advanced design responds to different dynamics and registers to apply the perfect amount of compression in real time, ensuring that your tone never gets over-squeezed or muddy. Transparent, powerful, and easy to use, the BC-1X is a must-have tool that delivers studio-quality punch and precision for dynamic players.','boss_BC-1x.png',1,2,6,5,1,0),(16,'SD-1 Overdrive Pedal',18000,'The SD-1 allows players from beginner to pro to get inspiring sounds right away, thanks to its natural behavior and the subtle mid boost that\'s part of its design. It gives your tone a push where it matters most, ensuring your guitar always sits perfectly in the mix with warmth, clarity, and rich presence. Lower drive settings are great for rhythm parts, while higher settings are ideal for fat, singing leads. The SD-1 is also very sensitive to input gain, letting you dial in different shades of overdrive simply by adjusting your guitar\'s volume control.','boss_SD-1.png',1,2,5,5,1,1),(17,'AMERICAN PROFESSIONAL II STRATOCASTER®',120000,'The American Professional II Stratocaster® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player.','fender_stratocaster_lightblue.jpg',1,1,3,2,1,0),(18,'TU-3 Chromatic Tuner',43000,'The world’s top-selling stage tuner, the BOSS TU-2, evolves and improves with the debut of the new TU-3. Housed in a tank-tough BOSS stompbox body, the TU-3 features a smooth 21-segment LED meter with a High-Brightness mode that cuts through the harshest outdoor glare. Choose between Chromatic or Guitar/Bass tuning modes, and enjoy visual pinpoint tuning verification with the Accu-Pitch Sign function. The TU-3 incorporates a convenient Note Name Indicator that can display notes of 7-string guitars and 6-string basses, while the Flat-Tuning mode can support up to six half-steps. It’s the new-standard tuner that no guitarist or bass player should be without!','boss_TU-3.png',1,2,7,5,0,0),(20,'RC-600 Loop Station',500000,'Meet the RC-600, the most advanced looper on the planet. Loaded with evolved features and customizable functions, this next-generation Loop Station ushers in a new era of creative power for guitarists, singer/songwriters, multi-instrumentalists, and other looping musicians. Capture multiple mics and instruments with six stereo tracks and premium 32-bit sound, and take full command with nine freely assignable footswitches and deep external control support. And that’s just the start—you can also color loops with a massive FX selection, groove with onboard rhythms, route audio as you like to the three stereo outputs, integrate with computer software via USB, and much more.','boss_rc-600.jpg',0,2,4,5,0,0),(22,'NTX5',57000,'The top-of-the-line NTX5 acoustic-electric, nylon-string guitar’s modern looks and unparalleled amplified sound enable electric guitarists and steel-string players to easily explore the world of nylon-string playing, while strap buttons and the exceptional Atmosfeel™ pickup system make it especially appealing to performing guitarists.','yamaha_NTX5.jpg',1,1,2,3,1,0),(23,'351 Classic Celluloid Pick',150,'Comfortable and familiar feel provided by the traditional 351 shape\r\nCelluloid picks give the traditional feel, with a smooth striking surface and a warm, round musical tone\r\nMedium gauge picks are ideal for the player looking for a warmer tone of a heavy pick, but the flexibility of a thin pick.\r\nFender picks provide comfort and high-performance flexibility for every performer','fender_pick_redblack.jpg',1,5,13,2,1,0),(24,'',0,'','fender_pick_black.jpg',1,1,1,1,0,1),(25,'PSR-EW410 Keyboard',65000,'El PSR-EW410 es el mejor teclado de 76 teclas para interpretar cualquier estilo de música, desde los últimos éxitos hasta tus favoritos “en vinilo”, con una muestra de piano de alta resolución, unos potentes altavoces incorporados y funciones profesionales fáciles de usar como los Controladores de Directo asignables, Quick Sampling, Groove Creator, Grabación de Audio USB, y conexión a un subwoofer opcional.','yamaha_psr-ew410.jpg',1,3,9,3,0,0),(26,'MG10 Amplifier',30000,'Rehearse day and night with the MG10. Simple yet mighty this 10W amp is perfect for band practice or home use. The two channels, clean and overdrive, and the contour control function provide a great way to experiment with your sound. The MG10 can also support jam sessions and silent practice and is impressively loud thanks to the custom 6.5” speaker.','marshall_mg10-amplifier.jpg',1,4,12,7,1,0),(27,'Absolute Hybrid Maple',320000,'La respuesta a la pregunta anterior es “la que da al músico el sonido que necesita, cuando lo necesita”. Las necesidades de sonido varían dependiendo del baterista y de la dinámica de la música, cambiando según las bandas, canciones y momentos. Cuerpos de arce híbridos Lugs “hook” YESS III Soporte de toms de masa reducida Bordes optimizados Interior con acabado “vintage”\r\n\r\n','yamaha_AbsoluteHybridMaple.png',1,6,18,3,1,1),(28,'AMERICAN PROFESSIONAL II JAZZ BASS®',75000,'The American Professional II Jazz Bass® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player.','fender_jazzbass_lightgreen.jpg',1,1,19,2,1,0),(29,'SG Standard Bass',210000,' The SG Bass has the legendary looks, sound and feel which made it one of Gibson\'s most iconic basses. The short scale length is actually a big part of this sound! While the short scale length of the SG Bass is preferred by smaller players, it\'s also preferred by many for the strong fundamental tone for which this short scale bass is known. As expected, the solid mahogany body has deeply sculpted scarfing and the rounded profile mahogany neck and rosewood fingerboard feels familiar and comfortable. A pair of calibrated SG bass pickups (neck and bridge) with individual volume and master tone controls add further tonal possibilities.','gibson-SG Standard Bass-Heritage Cherry.png',1,1,19,8,0,0),(30,'EARTHWOOD EXTRA LIGHT 80/20 BRONZE ACOUSTIC GUITAR STRINGS - 10-50 GAUGE',4000,'Ernie Ball Earthwood 80/20 Bronze Acoustic Guitar Strings are made from 80% copper, 20% zinc wire wrapped around hex shaped brass plated steel core wire. These acoustic guitar strings provide a crisp, ringing sound with pleasing overtones. Gauges .010, .014 .020, .028, .040, .050','ernieball_extralightbronze.png',1,5,22,10,0,0),(31,'',0,'','stagg_plugcable.png',1,5,14,1,1,1),(32,'VO-1 Vocal Pedal',45000,'The VO-1 Vocoder is a unique and innovative stompbox that puts the massive expressive range of the human voice in the hands of every guitarist and bassist. By vocalizing into a connected mic as you play, it’s easy to transform your tone with electronic voices, classic talk box sounds, and tons of all-new colors that are perfect for modern music styles. It’s even possible to create impressive ensemble vocal sounds without the need to connect an external mic. When you plug into the VO-1, you can literally talk, sing, and cry with your axe, taking your playing to places you never dreamed of before.','boss_VO-1.png',1,2,8,5,1,0),(84,'EARTHWOOD LIGHT PHOSPHOR BRONZE ACOUSTIC GUITAR STRINGS - 11-52 GAUGE',4500,' Ernie Ball Earthwood Phosphor Bronze Acoustic Guitar Strings are made from 92% copper, 7.7% tin, 0.3% phosphorus wire wrapped around tin plated hex shaped steel core wire. These guitar strings have a light orange, gold color and provide a mellow, ringing sound, with excellent clarity. Gauges .011, .015, .022w, .030, .042, .052','ernieball_lightvbronzepng.png',1,5,22,10,0,0),(85,' USA LEATHER STRAP, 2.5\"',2600,'Fender has always fashioned reliable American classics—it’s in our blood, and it’s our continuing tradition. Honor and become a part of this storied heritage by wearing your guitar with a strap that says it all. Crafted from leather and sporting a design inspired by the American flag, this strap is ready to hit the stage with rugged dependability and style.','fender_strapusa.png',1,5,24,2,0,0),(86,'AXIS CAPO - ROSE GOLD SATIN',1500,' The Ernie Ball Axis Capo’s ergonomic features allow for fast and accurate single-handed key changes. Compatible with most electric and acoustic guitars, the Axis Capo offers eight color finishes to match, with a dual-radius design that fits both flat and curved fretboards. Shift capo position single-handedly, and rely on buzz-free clamping pressure that lets your songs sing out in every key. Take the Axis Capo on the road and trust precision-molded rubber pads to protect your guitar finish. On the stage or in your writing space, it has to be the Axis Capo.','ernieball_axiscapo.png',1,5,23,10,0,0),(87,'10\' STRAIGHT / STRAIGHT INSTRUMENT CABLE - BLACK',5000,' ','ernieball_straightcable.png',1,5,14,10,0,0),(88,'THIN ASSORTED CELLULOSE PICKS, BAG OF 144',1200,' Cellulose Acetate Nitrate, Mixed Color Picks, .46mm, bag of 144.','ernieball_assortedpicks.png',0,5,13,10,0,0),(89,'RC-300',400000,' With loop mania sweeping the globe, BOSS proudly announces the most powerful Loop Station ever brought to the market — the RC-300. The new flagship looper features three synchronized stereo tracks with dedicated volume knobs and transport-control footswitches for each track. It’s also equipped with pro effects, a master Expression pedal, and a deluxe, ultra-wide control panel for the ultimate in live-performance manipulation. Plug in your guitar, bass, keyboard, or instrument of choice and create amazing loops in real time. An XLR input is also provided, complete with phantom power, so singers, percussionists, violinists, beatboxers, or anyone with a mic’d instrument can get in on the act, too. The RC-300 lets you record for up to three hours directly to its internal memory, adding effects as you go. The USB port lets you save your loops externally, as well as import/export WAV files. Step into the most powerful and inspiring Loop Station in BOSS history. It’s the creative powerhouse that musicians have been dreaming of!','boss_rc-300.png',1,2,4,5,1,1),(90,'SANTA ANA OVERDRIVE',87000,' We helped generate the classic guitar tones that inspired players to create new music, and now with the Santa Ana Overdrive, we’ve brought our expertise to stompboxes. Armed with FET technology, this pedal lets you dial in sounds varying from “just a little hairy” all the way to thick, fully saturated overdrive. The flexible tone controls unlock a wide range of sonic flavors. This pedal cleans up with the guitar’s volume control, just like our famous amplifiers.','fender_overdrivepedalsantaanapng.png',1,2,5,2,0,0),(91,'MEDIUM LIGHT ALUMINUM BRONZE ACOUSTIC GUITAR STRINGS - 12-54 GAUGE',6500,'Ernie Ball Aluminum Bronze Acoustic Guitar Strings feature more projection and clarity than traditional bronze strings, while also providing improved corrosion resistance. Aluminum Bronze Acoustic strings are made with Ernie Ball Maraging Steel hex cores and Aluminum Bronze wrap wire which provide more pronounced lows coupled with crisp brilliant highs. Made from a blend of copper and aluminum specifically tailored for acoustic guitar strings. Medium Light gauge .012, .016, .024, .032, .044, .054','ernieball_aluminumbronze.png',1,5,22,10,1,0),(92,'2\" TRI-GLIDE ITALIAN LEATHER STRAP - BLACK',7000,'Durable, comfortable, and premium 2\" wide strap made from soft and comfortable black Italian leather. Machined stitched to quality black leather ends (EB logo stamped in gold print) for absolute maximum strength and longevity. Black Tri-Glide Delrin adjustable buckle makes adjustments smooth and easy while further enhancing durability and good looks. Adjustable length 35\" to 61\".','ernieball_leatherstrap.png',1,5,24,10,1,0),(93,'KATANA-100/212 MkII',86000,'Katana MkII takes the acclaimed Katana guitar amp series to the next level, turbocharging the core platform with more sounds, more effects, and more features. Newly voiced variations are now available for all five amp characters, doubling the tonal options. And the onboard effects categories have been expanded from three to five, providing even more real-time processing to choose from. The usability has been ramped up too, with a power amp input for modelers and multi-FX, easy stereo expansion for dual amp setups, updated editor software, and many other enhancements.','boss_katana-100_212_mk2.png',1,4,12,5,0,0),(94,'BMIDI-1-35',16000,'The BMIDI-1-35 and BMIDI-2-35 cables provide premium connectivity for the expanding lineup of BOSS pedals with space-saving 3.5 mm TRS MIDI jacks. These rugged and reliable cables feature 3.5 mm TRS and 5-pin DIN connectors, allowing you to connect products such as the BOSS 200 series, EV-1-WL, and others to gear equipped with traditional MIDI jacks, from pedals, loop switchers, and multi-effects units to keyboards and MIDI interfaces for computers. The low-profile plugs fit into tight spaces on your pedalboard, with a slim right-angle plug housing on the TRS side and three-way cable adjustment on the 5-pin DIN connector.','boss_bmidi-1-35.png',0,5,14,5,0,0),(95,'DS-1X',35000,'The DS-1X launches the famous BOSS distortion into a modern era of expression, delivering an unmatched level of performance for guitarists with an ear for tone. This next-generation stomp combines over 35 years of innovation in pedal design with the most advanced technologies, bringing you a completely new tonal experience that’s only possible with the legendary expertise of BOSS. Prepare to be amazed—the inspiring and ultra-responsive DS-1X will change your thinking about distortion pedals forever.','boss_ds-1.png',1,2,5,5,1,0),(104,'ORIGIN50C',64000,'Innovate and craft your sound using this 50W combo. A Celestion Midnight 60 12” type speaker provides a classic all-valve, rich and harmonic Marshall tone. This amp has classic styling and contains contemporary features. A power reduction feature, Powerstem,  perfectly matches your tone whether performing on stage or practicing in the studio. With a 2-way footswitch available you can control the gain boost and turn the FX loop on and off.','marshall_origin50c.png',1,4,12,7,0,0),(105,'MS-4',23000,'The MS-4TM is a 1W micro stack that is the ultimate in micro rock n’ roll. It has both gain and volume controls to deliver that extra distortion. It is battery powered and can plug into mains so it’s versatile enough to play on the move or practice in your bedroom.','marshall_ms-4.png',1,4,12,7,0,0),(106,'CAFÉ RACER',120000,'Part of our flagship Originals range, the Walnut is devilishly dark both in its tone and  look. The kit excels at delivering full-bodied low tones while maintaining a focused and clean sound. Adorned with brushed nickel, UK designed, ‘sun’ lugs, the kit is luxuriously finished in Natural Walnut.','marshall_cafe-racer.png',1,6,18,7,0,0),(107,'D-X1E',62000,'New Style 28 mother-of-pearl pattern fingerboard inlay steps up the D-X1E, lending a bit of classic Martin style to this affordably priced model. It is equipped with Fishman® MX electronics and strung with Martin’s Authentic Acoustic Lifespan® 2.0 strings. With a new, soft gig bag featuring headstock, bridge, and endpin protectors, a durable water-repellent exterior, and foam padding, this model is ready to go anywhere.','martin_d-x1e.png',1,1,1,1,0,0),(108,'CONCERT UKE FSC',317000,'Built for serious players who want premium tone in an environmentally friendly instrument, this concert-sized ukulele features a top, back, and sides made from 100% FSC®-certified mahogany. You can feel good knowing that all the wood in this ukulele is responsibly sourced, and you’ll look and sound even better. It’s constructed with an applied dovetail mahogany neck for extra stability, it sports Ratio® tuners—a new feature on Martin ukes—to get you in tune quickly and accurately, and its satin finish adds the perfect amount of shine. Set the right tone for the planet with the Concert Ukulele FSC.','martin_concert-uke-fsc_.png',1,1,31,1,0,0),(109,'C1K UKE',30000,'Martin has built the world’s finest ukuleles since 1916, and tenor ukes since 1929 that have long been prized for their full-bodied voice and great volume. The C1K concert-sized model features top, back and sides crafted of solid Hawaiian koa, a wood native to Hawaii and a favorite of island players. Entire body is finished in high quality satin lacquer, and features an applied dovetail neck joint. The C1K Uke is a beautiful example of why Martin is still the name in superior quality ukuleles.','martin_c1k.png',1,1,31,1,0,0),(110,'AUTHENTIC ACOUSTIC LIFESPAN® 2.0 GUITAR STRINGS 80/20 BRONZE',3600,'Next generation Martin® Authentic Acoustic® Lifespan® 2.0 strings are engineered using a new, patented anti-corrosion treatment only available from Martin. It protects the core and wrap wire to prevent corrosion without compromising tone or feel. Our impeccable standards for acoustic guitar tone are embedded in our string design and precision manufacturing process. That’s why we make our own.','martin_strings-80-20-bronze.png',1,5,22,1,0,0),(111,'ADJUSTABLE GUITAR STAND',4700,'Fender\'s adjustable guitar stand conveniently showcases your acoustic, electric or bass guitar. Height-adjustable neck yoke comfortably accepts various instrument sizes, lower support swivels to accommodate standard and offset body styles, metal construction is durable enough for road use, and padded yokes won\'t harm nitrocellulose instrument finishes. Easily collapsible for convenient transport.','fender_adjustable-guitar-stand.png',1,5,30,2,1,0),(112,'DELUXE SERIES INSTRUMENT CABLE, TWEED',5000,'Fender Deluxe Series cables carry the highest quality materials and braided shielding to deliver flagship durability, conductance and transparency. Our top-of-the-line cables sport custom molded ends with strain relief under the housing—plus 24K gold-plated connectors that won’t tarnish or degrade your sound over time. These cables use a very quiet braided shielding that is engineered to maximize the purity of your tone, and they’re protected by a soft-woven yet rugged tweed jacket that provides ultimate protection with classic Fender style.','1638824690533_img_.png',1,5,14,2,0,0),(113,'FENDER® FLAT-TOP DREADNOUGHT ACOUSTIC GUITAR CASE',17000,'The Fender Flat-Top Dreadnought Acoustic Guitar Case offers all the durability and style modern players require, whether they\'re in search of a sturdy on-the-road or at-home storage solution. With its sleek black exterior and quality black plush lining, this heavy-duty protective case is built to withstand the rigors of the road and prevent damage to your acoustic instrument.','fender_fender-flat-top-dreadnought-acoustic-guitar-case.png',1,5,25,2,0,0),(114,'CLASSIC BONGOS',30000,'Get people moving to your beat with our Classic Bongos. Back in the 60\'s we pioneered the comfort curve hoops on all our bongos. We’ve remained faithful to the original designs that music icons fell in love with, even utilising the original moulds in our manufacturing process. With fibreglass shells and natural hide heads, these bongos give an authentic sound for performance.\r\n\r\n','marshall_classic-bongos.png',1,6,27,7,0,0),(115,'REGULAR SLINKY COBALT ELECTRIC GUITAR STRINGS - 10-46 GAUGE',2000,'Ernie Ball Cobalt Slinky Electric Guitar Strings provide an extended dynamic range, incredible harmonic response, increased low end, and crisp, clear highs. Cobalt provides a stronger magnetic relationship between pickups and strings than any other alloy previously available. Cobalt Slinky guitar strings are also soft and silky to the touch, making string bending a breeze. Gauges .010, .013, .017, .026, .036, .046','ernieball_slinky-cobalt-electric-guitar-strings.png',1,5,22,10,0,0),(116,'FLEXTUNE',5000,'The Ernie Ball FlexTune is a portable clip-on tuner suitable for guitar, bass, and other stringed instruments. Featuring an oversized 2\" LCD screen, the FlexTune provides a large, vibrant display that is easy to read from any angle. This is complemented by the tuner\'s dual-axis 360 degree pivot arm for complete flexibility to position the display to your liking. The FlexTune also features Chromatic, Guitar, Bass, Ukulele, and Violin tuning modes as well as selectable clip and microphone sensors.','1638825470095_img_.png',1,5,29,10,0,0),(117,'AXIS CAPO - BLUE STEEL',2000,'The Ernie Ball Axis Capo’s ergonomic features allow for fast and accurate single-handed key changes. Compatible with most electric and acoustic guitars, the Axis Capo offers eight color finishes to match, with a dual-radius design that fits both flat and curved fretboards. Shift capo position single-handedly, and rely on buzz-free clamping pressure that lets your songs sing out in every key. Take the Axis Capo on the road and trust precision-molded rubber pads to protect your guitar finish. On the stage or in your writing space, it has to be the Axis Capo.','1638825546802_img_.png',1,5,23,10,1,0),(118,'MIGHTY SLINKY NICKEL WOUND ELECTRIC GUITAR STRINGS 8.5 - 40 GAUGE',3200,'Mighty Slinkys sit between the popular Super Slinky and Extra Slinky\r\nstrings while providing a fast, light tension across all six strings.\r\nGauges .0085, .011, .015, .022w, .030, .040','ernieball_electric-guitar-strings.png',0,5,22,10,0,0),(119,'Premium Softcase, Brown, Les Paul / SG',40000,'Gibson’s Premium Softcases have a rugged vinyl exterior and a plush inner lining to help keep your instrument safe and secure. They feature two accessory compartments; one with an organizer at the top near the headstock and a larger compartment on the front so you can take all of your accessories along with you.','1638826233376_img_.png',1,5,25,8,0,0),(120,'Les Paul Standard \'50s - Tobacco Burst',200000,'A Classic, Reborn.\r\nThe new Les Paul Standard returns to the classic design that made it relevant, played and loved -- shaping sound across generations and genres of music. It pays tribute to Gibson\'s Golden Era of innovation and brings authenticity back to life. The Les Paul Standard 50\'s has a solid mahogany body with a maple top, a rounded 50\'s-style mahogany neck with a rosewood fingerboard and trapezoid inlays. It\'s equipped with an ABR-1, the classic-style Tune-O-Matic bridge, aluminum stop bar tailpiece, vintage deluxe tuners with keystone buttons, and aged gold tophat knobs. The calibrated Burstbucker 1 (neck) and Burstbucker 2 (bridge) pickups are loaded with AlNiCo II magnets, audio taper potentiometers and orange drop capacitors.','gibson_les-paul-standard-50s.png',1,1,3,8,0,0),(121,'EDS-1275 Doubleneck - Cherry Red',450000,'The Iconic Gibson EDS-1275 \"Doubleneck\".\r\nThe Gibson EDS-1275 is an iconic design that has captured the imagination of fans and players for generations.','gibson_doubleneck-cherryred.png',0,1,3,8,0,0),(122,'SG Modern - Blueberry Fade',73000,'A New SG For Modern Times.\r\nThe newly refreshed Gibson SG Modern incorporates many contemporary updates that players have embraced and it’s much more than a classic “solid guitar”; it’s a hybrid between an SG and a Les Paul. Shaped and scarfed like a classic SG, the body is crafted with a AA maple top and mahogany back, characteristic of a Les Paul. This combination is renowned for its resonance and sustain. The genuine ebony, 24 fret compound radius fingerboard and asymmetrical, slim taper neck allow fast and silky access to the highest frets. A pair of calibrated BurstBucker Pro Alnico V humbuckers deliver fire power and the push-pull controls allows you to switch between the Gibson humbucker and the single coil P90 sounds, both of which have defined so many genres of music across multiple generations since we invented them. Upscale appointments include genuine mother of pearl inlays, Grover Rotomatic tuners, and clear top hat knobs.','gibson_sg-modern-blueberryfade.png',1,1,3,8,0,0),(123,'AD17',80000,'This Grand Pacific model is the first of our round-shoulder dreadnoughts to feature back and sides of solid ovangkol, an African tonewood that shares rosewood’s warmth and brilliance with additional presence in the midrange. Topped with solid spruce, the AD17 serves up a blend of sparkle and clean low-end power, enhanced by V-Class bracing for greater volume, longer sustain, and a more in-tune sound. That seasoned, vintage-hued tone is reflected in this model’s strikingly classic look, with a natural top and a deep Urban Sienna color treatment for the ovangkol back and sides. Minimally decorated but finely crafted, the AD17 also features chamfered body edges, stained spruce edge trim, a three-ring rosette in Hawaiian koa, and a faux tortoiseshell pickguard. The 2.0 mil-thick matte body finish minimizes damping for unfettered resonance. It ships in a Taylor AeroCase.','1638827051976_img_.png',1,1,1,4,0,0),(124,'AD 27',85000,'This blacktop American Dream Grand Pacific makes a striking first impression and backs it up with a serious musical punch. Made with solid ovangkol back and sides topped with spruce, this all-solid-wood guitar represents the resilience of Taylor’s commitment to meeting the needs of everyday musicians even in historically difficult times. Ovangkol’s warm, seasoned tone bears hints of rosewood’s lush sparkle, with greater presence in the midrange, while the spruce top adds clarity and articulation. It’s all punched up by the V-Class bracing under the hood, which optimizes the tonal output for greater volume, longer sustain, and ear-pleasing intonation up and down the neck. Aside from the black finish for the top, a thin 2.0-mil matte layer combines a rootsy look with a responsive voice. Additional details include chamfered body edges, a single-ring rosette, 4mm dot fretboard inlays, and a black pickguard. It ships in a sturdy yet lightweight Taylor AeroCase.','1638827193050_img_.png',1,1,1,4,0,0),(125,'AD17 Blacktop',89000,'This blacktop American Dream Grand Pacific makes a striking first impression and backs it up with a serious musical punch. Made with solid ovangkol back and sides topped with spruce, this all-solid-wood guitar represents the resilience of Taylor’s commitment to meeting the needs of everyday musicians even in historically difficult times. Ovangkol’s warm, seasoned tone bears hints of rosewood’s lush sparkle, with greater presence in the midrange, while the spruce top adds clarity and articulation. It’s all punched up by the V-Class bracing under the hood, which optimizes the tonal output for greater volume, longer sustain, and ear-pleasing intonation up and down the neck. Aside from the black finish for the top, a thin 2.0-mil matte layer combines a rootsy look with a responsive voice. Additional details include chamfered body edges, a single-ring rosette, 4mm dot fretboard inlays, and a black pickguard. It ships in a sturdy yet lightweight Taylor AeroCase.','1638827279837_img_.png',0,1,1,4,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin','admin','admin@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','patronus.jpg','admin',1,0),(8,'John','Doe','Juan Doe','johndoe@gmail.com','$2a$10$425NoKZeaTRnNnNyVU9mO.d4E1cRFhyWH6eNgyujGsD9CypiON5za','dog.png','???',2,1),(39,'Tadeo','Gavensky','admin','admin@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','hermione.jpg','Suffolk',2,0),(78,'Tadeo','Gavensky','Ed','admin@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','patronus.jpg','Suffolk',2,0),(79,'Tadeo','admin','Ed','admin@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','dog.png','Suffolk',2,0),(80,'Tadeo','Gavensky','Ed','admin@gmail.com','$2a$10$Hb58PSxScMAnI.efHF.YCuP99e.CZfsJKuFSwJ1y1S0yILcQjd5r6','patronus.jpg','Suffolk',2,0);
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

-- Dump completed on 2021-12-06 18:51:36
