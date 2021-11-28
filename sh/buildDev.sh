docker rmi img_tesis_vue_app:dev
docker build  \
	-f ./dockerfiles/Dev.Dockerfile \
	-t img_tesis_vue_app:dev \
	tesis_frontend

