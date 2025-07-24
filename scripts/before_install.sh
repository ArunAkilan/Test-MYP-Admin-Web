#!/bin/bash
echo "=== BeforeInstall Script ==="

# Stop old container if running
docker stop myapp || true
docker rm myapp || true
