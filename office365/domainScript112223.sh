#!/bin/bash

# Function to install and setup Apache
install_apache() {
  echo "Updating package index..."
  sudo apt update

  echo "Installing Apache..."
  sudo apt install -y apache2

  echo "Allowing 'Apache' through the firewall..."
  sudo ufw allow 'Apache'

  echo "Apache installation and firewall configuration complete."
}

# Function to set up domain or subdomain
setup_domain() {
  local domain=$1
  local type=$2

  # Create the directory for the domain
  echo "Creating directory for $domain..."
  sudo mkdir -p /var/www/$domain

  # Assign ownership of the directory to the current user
  echo "Assigning ownership of the directory to the current user..."
  sudo chown -R $USER:$USER /var/www/$domain

  # Ensure that permissions are correct
  echo "Setting directory permissions..."
  sudo chmod -R 755 /var/www/$domain

  # Create a sample index.html page
  local index_file="/var/www/$domain/index.html"
  echo "Creating a sample index.html page at $index_file..."
  sudo bash -c "cat > $index_file" <<EOL
<html>
    <head>
        <title>Welcome to $domain!</title>
    </head>
    <body>
        <h1>Success! The $type for $domain is working!</h1>
    </body>
</html>
EOL

  # Create a new virtual host file
  local vhost_file="/etc/apache2/sites-available/$domain.conf"
  echo "Creating a new virtual host file for $domain..."
  sudo bash -c "cat > $vhost_file" <<EOL
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName $domain
    ServerAlias www.$domain
    DocumentRoot /var/www/$domain
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOL

  # Enable the new site
  echo "Enabling the new virtual host for $domain..."
  sudo a2ensite $domain.conf

  # Disable the default site
  echo "Disabling the default virtual host..."
  sudo a2dissite 000-default.conf

  # Test for configuration errors
  echo "Testing for configuration errors..."
  sudo apache2ctl configtest

  # Restart Apache to implement the changes
  echo "Restarting Apache..."
  sudo systemctl restart apache2

  echo "Apache is now hosting $domain and the $type setup is complete."
}

# Function to install and configure SSL with Let's Encrypt
setup_ssl() {
  local domain=$1

  # Install Certbot and its Apache plugin
  echo "Installing Certbot and the Certbot Apache plugin..."
  sudo apt install -y certbot python3-certbot-apache

  # Check Apache configuration and reload if necessary
  echo "Checking Apache configuration..."
  sudo apache2ctl configtest
  sudo systemctl reload apache2

  # Allow HTTPS through the firewall
  echo "Updating firewall rules to allow HTTPS traffic..."
  sudo ufw allow 'Apache Full'
  sudo ufw delete allow 'Apache'

  # Obtain an SSL certificate and configure Apache to use it
  echo "Obtaining an SSL certificate for $domain..."
  sudo certbot --apache
  echo "SSL setup complete for $domain."
}

# Install Apache
install_apache

# Prompt for main domain setup
read -p "Enter your domain name: " main_domain
setup_domain $main_domain "main domain"

# Set up SSL for the main domain
setup_ssl $main_domain

# Ask user if they want to set up a subdomain
read -p "Would you like to add a subdomain? (y/n) " add_subdomain

if [[ "$add_subdomain" == "y" ]]; then
  read -p "Enter your subdomain (e.g., subdomain.yourdomain.com): " subdomain
  setup_domain $subdomain "subdomain"
  # Set up SSL for the subdomain
  setup_ssl $subdomain
else
  echo "Subdomain setup skipped."
fi

# Reminder for auto-renewal
echo "Certbot will automatically renew SSL certificates before they expire."
echo "Make sure to check the Certbot renewal process periodically."
