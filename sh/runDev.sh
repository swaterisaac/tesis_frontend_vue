docker rm ctr_tesis_vue_app
docker run \
    -v ${PWD}:/vue_app \
    -p 8080:8080 \
    -it --name ctr_tesis_vue_app img_tesis_vue_app:dev
