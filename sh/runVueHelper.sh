docker stop ctr_tesis_vue_helper
sudo docker rm ctr_tesis_vue_helper
docker run -v ${PWD}:/vue-setup -it --name ctr_tesis_vue_helper img_tesis_vue_helper
