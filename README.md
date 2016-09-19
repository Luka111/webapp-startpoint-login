# webapp-startpoint-login
Webapp startpoint with login, logout and method call
1. pull lib/node_modules/allexsdk
2. allex-ws-init - if you haven't before
3. download and install a web server - for example lighttpd (sudo apt-get install lighttpd)
4. allex-ws-webapp-clone <PROJECT_NAME> <SSH_PATH_FOR_YOUR_GIT_REPO>
5. cd ~/allexjs/projects/custom/websolutions/custom-webapp
5. git clone git@github.com:Luka111/webapp-startpoint-login.git ~/webapp-startpoint-login
6. rsync -rv --exclude=.git /home/luka/webapp-startpoint-login/* ./
7. rm -rf ~/webapp-startpoint-login
8. allex-webapp-build -d
9. ln -s ~/allexjs/projects/custom/websolutions/custom-webapp/_generated /var/www/html/custom
