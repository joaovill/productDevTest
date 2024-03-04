#!/bin/bash

# Wait for the PostgreSQL database to be ready
until nc -z postgres 5432; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done


npx prisma generate 

npx prisma migrate dev