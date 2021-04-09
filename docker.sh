sudo docker run --name nagios4  \
  -v /home/guifabrin/Documentos/nagios/plugins/:/opt/Custom-Nagios-Plugins \
  -v /home/guifabrin/Documentos/nagios/etc:/opt/nagios/etc \
  -p 0.0.0.0:8080:80 jasonrivers/nagios:latest

sudo docker exec -it nagios4 apt update
sudo docker exec -it nagios4 apt install -y nodejs npm php composer
