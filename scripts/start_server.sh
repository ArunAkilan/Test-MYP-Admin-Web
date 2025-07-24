#!/bin/bash
echo "=== ApplicationStart Script ==="

IMAGE_TAG=$(cat /home/ubuntu/app/image_tag.txt)

# Generate unique name
CONTAINER_NAME="myapp-$(date +%s)"  

echo "Pulling image: simple-docker-service-025017df747b:$IMAGE_TAG"
docker pull 434648646586.dkr.ecr.ap-south-1.amazonaws.com/simple-docker-service-025017df747b:$IMAGE_TAG

docker stop "$CONTAINER_NAME" || true
docker rm "$CONTAINER_NAME" || true

docker run -d --name "$CONTAINER_NAME" -p 80:80 434648646586.dkr.ecr.ap-south-1.amazonaws.com/simple-docker-service-025017df747b:$IMAGE_TAG

echo "Started container: $CONTAINER_NAME"