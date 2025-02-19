# Advenus - Travel Discovery Platform (Backend)


## Overview
**Advenus (Backend)** is a **NestJS**-based RESTful API server that powers the Advenus travel discovery platform. It is fully written in **TypeScript** (with occasional **JavaScript** usage if needed). This backend communicates with a **PostgreSQL** database hosted on **Neon.tech**, providing robust data handling and reliable hosting. We incorporate Docker for containerization, Jest for testing, and Swagger for generating API documentation.

## Tech Stack
- **Runtime**: [Node.js](https://nodejs.org/en/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon.tech](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Testing**: [Jest](https://jestjs.io/)
- **Documentation**: [Swagger](https://swagger.io/) for API docs



## Features
- **NestJS Architecture**: Uses modules, controllers, and providers for clear separation of concerns.
- **TypeScript First**: Strong typing for improved developer experience and reliability.
- **RESTful API**: Provides endpoints for managing travel-related data
- **PostgreSQL Integration**: Hosted on Neon.tech for scalable and secure data storage.
- **ORM**: Manages database interactions via TypeORM or Prisma (depending on the final choice).
- **Testing**: Automated test suites with Jest to ensure code reliability.
- **API Documentation**: Generated with Swagger for consistent and up-to-date docs.