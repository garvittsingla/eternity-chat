# Eternity Project

## Overview
Eternity is a project that requires PostgreSQL database and can be run locally using Docker.

## Prerequisites
- Docker and Docker Compose installed on your machine
- Git

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/Eternity.git
cd Eternity
```

2. Create a Docker volume for PostgreSQL data
```bash
docker volume create postgres_data
```

3. Create a `docker-compose.yml` file with the following content:
```yaml
version: '3.8'
services:
    db:
        image: postgres:latest
        restart: always
        environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: your_password
            POSTGRES_DB: eternity_db
        ports:
            - "5432:5432"
        volumes:
            - postgres_data:/var/lib/postgresql/data

volumes:
    postgres_data:
        external: true
```

4. Start the PostgreSQL container
```bash
docker-compose up -d
```

5. Verify the container is running
```bash
docker ps
```

## Database Connection Details
- Host: localhost
- Port: 5432
- Database: eternity_db
- Username: postgres
- Password: your_password

## Stopping the Container
```bash
docker-compose down
```

## Additional Commands

To view logs:
```bash
docker-compose logs -f
```

To remove volume (will delete all data):
```bash
docker volume rm postgres_data
```