#!/bin/bash
echo "=== ApplicationStart Script ==="

IMAGE_TAG=$(cat /home/ubuntu/app/image_tag.txt)

echo "Pulling image: prh_web_2:$IMAGE_TAG"
docker pull 434648646586.dkr.ecr.ap-south-1.amazonaws.com/prh_web_2:$IMAGE_TAG

docker stop myapp || true
docker rm myapp || true

docker run -d --name myapp -p 80:80 434648646586.dkr.ecr.ap-south-1.amazonaws.com/prh_web_2:$IMAGE_TAG
