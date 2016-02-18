#!/usr/bin/env bash
#
#
### FUNCTIONS

function tools_install() { 
    echo >&2 "Updating the things..."
    # npm
    #
    # Make sure we have the latest npm version and the update checker module
    sudo npm install -g npm
    sudo npm install -g npm-check-updates
  
    # Grunt
    #
    # Install or Update Grunt based on current state.  Updates are direct
    # from NPM
    if [[ "$(grunt --version)" ]]; then
        echo >&2 "Updating Grunt CLI"
        sudo npm update -g grunt-cli &>/dev/null
        sudo npm update -g grunt-sass &>/dev/null
        sudo npm update -g grunt-cssjanus &>/dev/null
        npm update -g grunt-rtlcss &>/dev/null
    else
        echo >&2 "Installing Grunt CLI"
        sudo npm install -g grunt-cli &>/dev/null
        sudo npm install -g grunt-sass &>/dev/null
        sudo npm install -g grunt-cssjanus &>/dev/null
        sudo npm install -g grunt-rtlcss &>/dev/null
    fi
}

function wordpress_install(){
    # Installation:
  
    # Install the script in one of the folders in your PATH. Make sure it has execute permissions (i.e. chmod +x wp-install-core-sub-dir).
  
	# Ask the user for some things
	read -p "Enter Wordpress Directory: " -e -i wp CORE_DIR
	read -p "Enter Database Name: " -e -i bootstrap_wp DB_NAME
	read -p "Enter Database User: " -e -i homestead DB_USER
	read -p "Enter Database Password: " -e -i secret DB_PASS

	read -p "Enter Site URL: " -e -i http://www.bootstrap-starter.com/bootstrap-wp/ SITE_URL
	read -p "Enter Site Title: " -e -i Bootstrap SITE_TITLE
	read -p "Enter Username: " -e -i super SITE_USER
	read -p "Enter Password: " -e -i secret SITE_PASS
	read -p "Enter Email: " -e -i support@bluetonemedia.com SITE_EMAIL
	read -r -p "Start from Scratch? [y/N]" CLEAN_OR_NAH

	if [[ $CLEAN_OR_NAH =~ ^([yY][eE][sS]|[yY])$ ]]
	then 	  
		read -r -p "Are You Sure? (this will delete/recreate the wordpress directory)[y/N]" CLEAN
	fi
	
	#echo -e "You entered $CORE_DIR, $DB_NAME, $DB_USER, $DB_PASS, $SITE_URL, $SITE_TITLE, $SITE_USER, $SITE_PASS, $SITE_EMAIL"
  
    #Usage:  
    # This is a simple script as an example, it could be improved by accepting parameters etc.

    CORE_DIR=$CORE_DIR
    DB_NAME=$DB_NAME
    DB_USER=$DB_USER
    DB_PASS=$DB_PASS

    SITE_URL=$SITE_URL 
    SITE_TITLE=$SITE_TITLE
    SITE_USER=$SITE_USER
    SITE_PASS=$SITE_PASS
    SITE_EMAIL=$SITE_EMAIL
    
    EMAIL_REGEX="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"    
    
    if [[ ! -z  $CORE_DIR && ! -z $DB_NAME && ! -z $DB_USER && ! -z $SITE_URL && ! -z $SITE_TITLE && ! -z $SITE_USER && ! -z $SITE_PASS && $SITE_EMAIL =~ $EMAIL_REGEX ]] 
    then
    
    if [[ $(basename $(dirname $PWD)) != "bootstrap-starter" ]] 
    then
    	echo -e "Please run provision.sh from its directory"
    	return 1
    fi   
    
    # Clear Wordpress Directory?
    if [[ $CLEAN =~ ^([yY][eE][sS]|[yY])$ ]]
	then 	  
		rm -rf ../bootstrap-starter/bootstrap-wp
		echo "The bootstrap-wp directory was deleted"
	fi
     
	    # create the dir for the core files
	    mkdir ../bootstrap-starter/bootstrap-wp
		cd ../bootstrap-starter/bootstrap-wp
    
	    mkdir $CORE_DIR
	    cd $CORE_DIR
	        
	    # download WordPress files
	    wp core download
	    cd ../
	        
	    # create the wp-config.php file
	    wp core config --dbname=$DB_NAME --dbuser=$DB_USER --dbpass=$DB_PASS --path=$CORE_DIR
	
	    # Copy (not move) index.php file to root
	    cp "$CORE_DIR/index.php" ./index.php
	    
	    # Edit index.php to point to correct path of wp-blog-header.php
	    sed -i "s/\/wp-blog-header/\/$CORE_DIR\/wp-blog-header/g" index.php
	    
	    # create the database
	    wp db create
	        
	    # install WordPress (less than 5 mins)
	    wp core install --url=$SITE_URL --title="$SITE_TITLE" --admin_user=$SITE_USER --admin_password=$SITE_PASS --admin_email=$SITE_EMAIL --path=$CORE_DIR
	    
	    # Update the siteurl in the database with sub directory path
	    wp option update siteurl $(wp option get siteurl)/$CORE_DIR
	    
	    # Uncomment the below line if you want the config in root
	    #cp "$CORE_DIR/wp-config.php" ./wp-config.php
	    
	    echo "Install finished!"
    
    else
    	echo -e "There was an issue with the information you submitted, please try again"
    fi
}