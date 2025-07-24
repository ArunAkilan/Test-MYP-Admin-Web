#!/bin/bash
echo "=== ApplicationStart Script ==="

IMAGE_TAG=$(cat /home/ubuntu/app/image_tag.txt)
REPO_URI="434648646586.dkr.ecr.ap-south-1.amazonaws.com/simple-docker-service-025017df747b"
CONTAINER_NAME="myapp"

echo "Pulling image: $REPO_URI:$IMAGE_TAG"
docker pull "$REPO_URI:$IMAGE_TAG"

# Stop existing container
if [ "$(docker ps -aq -f name=^${CONTAINER_NAME}$)" ]; then
    echo "Stopping existing container: $CONTAINER_NAME"
    docker stop "$CONTAINER_NAME" || true
    docker rm "$CONTAINER_NAME" || true
fi

# Run new container
docker run -e VITE_REACT_ST_OAUTH_DEMO_CLIENT_ID=66760581762-t0v73nov7mtgq1n8a5r5nqka5vit22ss.apps.googleusercontent.com \
  -e VITE_BackEndUrl=http://13.203.171.5:3002 \
  -e VITE_BackEndUrlProfile=http://13.203.171.5:3001 \
  -e VITE_GOOGLE_MAPS_API_KEY=AIzaSyC5nev5mSL-f_zbhc-vOvUgMtzopcYGpEk \
 -d --name "$CONTAINER_NAME" -p 80:80 "$REPO_URI:$IMAGE_TAG"
echo "Started container: $CONTAINER_NAME"
