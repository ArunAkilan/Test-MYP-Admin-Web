#!/bin/bash
echo "=== ApplicationStop Script ==="
docker stop myapp || true
docker rm myapp || true
