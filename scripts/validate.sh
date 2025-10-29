#!/bin/bash
echo "=== ValidateService Script ==="

# Simple curl check
curl -f http://localhost || exit 1
