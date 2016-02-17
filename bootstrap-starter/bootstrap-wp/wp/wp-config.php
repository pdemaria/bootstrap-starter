<?php


// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', 'bootstrap_wp');

/** MySQL database username */
define('DB_USER', 'homestead');

/** MySQL database password */
define('DB_PASSWORD', 'secret');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('AUTH_KEY',         '=DB$nI;+=$g}p2:Jr*:~A/#pLLhZ2a;)p,Hd_ke>ENOX%wa7GnU~y|=0B+^+2 =N');
define('SECURE_AUTH_KEY',  'BwVMGroNL26=C*=[!{8X+=(ANCfu;U Y7(OtMX]k&B%MWq`}:k[-(z#{sg.{cD|k');
define('LOGGED_IN_KEY',    '9v8TK6<g8/34g,]WNF9G)- ^7NL|k_H~xI<8&T2rf56{Eo;AK{2Cj*K4!+O6N/O,');
define('NONCE_KEY',        'Nfh]M-eh00Co~IM`LC~ +o3xMW-dH%vN]Q45k@[10_{OGJsG2@ngAZ-6!JM+ )ph');
define('AUTH_SALT',        'qf;#v8RChnWyl<HXURWn:.[h@7~gKhs.~^/(l&R6y|5CW&hrav:mj1B3q(T&>]_h');
define('SECURE_AUTH_SALT', 'vZR%6vwt?}hbK(Ui<XE:mu>m&0VGrC38fBCEPUgm=t3Va_$wf(b.8a+j4K?[j%!v');
define('LOGGED_IN_SALT',   'FT%R*k}sB -L#(h4<,tekpRZH~SfCjk+C!z*pQ=9T~&)P@hkwchYK^IjhoZ1l(-L');
define('NONCE_SALT',       '80@P^*)N L*+2oofn#-M?3lkgs#Cyl*-Ec/@PhH0[+7Jg@[97RZaV43h@?s*{?;-');


$table_prefix = 'wp_';





/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
