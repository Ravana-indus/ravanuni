#!/bin/bash

# Script to build the project with environment variables from .env file
# This script is for development use only

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  echo "Please create a .env file with your environment variables"
  echo "You can use .env.example as a template"
  exit 1
fi

# Load environment variables from .env file
set -a
source .env
set +a

# Build the project
echo "Building with environment variables from .env file..."
npm run build

echo "Build completed!" 