# Pet Store API (NestJS)

This is a simple RESTful API project for a pet store built with NestJS and TypeORM.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- PostgreSQL installed and running on your local environment.
- Basic understanding of TypeScript and RESTful API concepts.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mild-tn/pet-store-api-nestjs.git
```

2. Install dependencies:
```bash
cd pet-store-api-nestjs
yarn install
```

3. Set up the database:
```bash
docker-compose up -d
```
Can check Configure the database connection settings in ormconfig.json, and migrate database with `yarn migrate:run`

4. Start the server:
```bash
yarn start:dev
```
The server will start running at http://localhost:8081 (Can change port in main.ts file).

Usage
Endpoints
- GET /pet - Get all pets.
- GET /pet/:id - Get a pet by ID.
- POST /pet - Create a new pet.
- PUT /pet/:id - Update an existing pet.
- DELETE /pet/:id - Delete a pet by ID.
- GET /pet?status=SOLD - Get pets by status.
