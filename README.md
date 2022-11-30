# Sayyara

Sayyara is a web app that connects Vehicle Mechanics to Vehicle Owners.
It is a platform where Vehicle Mechanics can advertise their services and Vehicle Owners can find the best mechanics in their area.

### Deployed Applicaiton
- [Sayyara](https://sayyara.netlify.app)
- [Backend Swagger Docs](https://sayyara-backend.onrender.com/api/swagger-ui/index.html)
### Development Requirements

**For building and running the application you need:**
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Npm](https://nodejs.org/en/download/)

#### Build & Run application
###### Backend

Start the server:
```bash
# Start from root directory
cd backend
docker-compose up -d
```
The server listens on port `8080`. You can access it at http://localhost:8080/<endpoint-here>

Docs are available at http://localhost:8080/api/docs


Optionally test queries on the database in a terminal while the server is running with the command:
```bash
# After running the server
docker-compose exec postgres psql -U postgres
```

Stop the server:
```bash
docker-compose down
```

###### Frontend
```bash
# Start from root directory
cd frontend
npm install
npm run start
```
