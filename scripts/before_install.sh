#!/bin/bash
echo "=== BeforeInstall Script ==="

# Generate unique name
CONTAINER_NAME="myapp-$(date +%s)"  

# Stop old container if running
docker stop "$CONTAINER_NAME" || true
docker rm "$CONTAINER_NAME" || true
