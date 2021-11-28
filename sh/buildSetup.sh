# Build an image named vue_helper using the Setup.Dockerfile
# The build args manage permissions when executing commands from inside the container
docker rmi img_tesis_vue_helper
docker build \
  --build-arg USER_ID=$(id -u) \
  --build-arg GROUP_ID=$(id -g) \
  -t img_tesis_vue_helper - < ./dockerfiles/Setup.Dockerfile
