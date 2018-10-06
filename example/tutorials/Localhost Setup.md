# Localhosting

## Key points

## MAMP Pro
If you're using MAMP Pro on macOS, follow these setup steps:

### Start
Start by adding a new host entry named `morez.lh` that points to the project root directory; i.e. where the index.php file lives.

![Adding a new host entry][localhost-mamp-newhost]

### Next
Next, configure your new entry like the following screenshot. Set your IP address to `*` and the port to `443`. Set your PHP version to `7.2.1`. 

> If you're unable to change the PHP version, click over on the left-sidebar to the PHP configuration. From there, make sure _Individual PHP version for every host (CGI mode)_ is checked.

![Editing the entry settings][localhost-mamp-hostsettings]

### Tab Space
Tab over to the Apache settings, and configure it following the next screenshot. Check `Options All`, then enter the following additional information in your `<VirtualHost>` directive:

```apache
# MoRez Secure HTTPs Server
ServerName morez.lh
ServerAlias www.morez.lh
```

![Setting up Apache-specific config][localhost-mamp-apache]

### SSL
Now tab over to the SSL settings. Click the `SSL` checkbox, then click `Create self-signed certificate...`. You'll be greeted with a popup asking for your information; don't worry, this is all for localhost development so just put in your name, Sabre Hostpitality Solutions for Organization, etc. 

![Adding local SSL support][localhost-mamp-ssl]

Save your new `morez.lh.crt` and `morez.lh.key` files somewhere; I chose my morez project container (parent folder that holds all my local feature branches).


<!-- MARKDOWN LINKS -->
[localhost-mamp-newhost]:       localhost-mamp-newhost.jpg
[localhost-mamp-hostsettings]:  localhost-mamp-hostsettings.jpg
[localhost-mamp-apache]:        localhost-mamp-apache.jpg
[localhost-mamp-ssl]:           localhost-mamp-ssl.jpg