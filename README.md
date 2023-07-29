
# VITB Grievance Server

This is the repository for the backend server for the hosted VITB Grievance Portal. This server is hosted on Railway.

**VITB Grievance Portal** is a web-portal, providing students with a dedicated platform to raise concerns, address issues, and seek clarification from the college administration and authorities. The portal includes separate pages for students, teachers, and administrators.

You can experience this site [here](vitb-grievances.aayush65.com).
## Features

Some of our key feature includes:

- Official complaint registration
- Anonymous complaints/suggestions
- JWT-based authentication & authorization
- Email alerts for status changes
- 2-factor authentication
- Real-time updates for status and remarks
## Tech Stack (Backend)

- NodeJS
- Express
- TypeScript
- JWT
- MongoDB
- Redis
## Frontend

The frontend for our Grievance Server is hosted on Github Pages. The repository for the server is [here](https://github.com/Aayush65/grievance-portal).
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**MongoDB Atlas**:

`PORT`
`MONGO_URL`
`SECRET_KEY`

**Email/Pass** (SMTP Server for mail alerts):

`EMAIL`
`PASSWORD`

**Redis**:

`REDIS_URL`
`REDIS_HOST`
`REDIS_PORT`
`REDIS_PASSWORD`
`REDIS_USERNAME`
## Deployment

Before deploying the frontend, clone this project on your local machine by running the following command:

```bash
  git clone https://github.com/Aayush65/grievance-server
  cd grievance-server
```

To deploy this server run

```bash
  npm install
  npm run dev
```

After deploying this server, deploy the frontend from [here](https://github.com/Aayush65/grievance-server).
## Performance

![Lighthouse score](https://github.com/Aayush65/Grievance-Portal/assets/79572409/55b58564-de4b-4910-9d6f-6dcb299a6a3a)

## Demo

This site is hosted on [vitb-grievances.aayush65.com](https://vitb-grievances.aayush65.com).



## Authors

- [@Aayush65](https://www.github.com/Aayush65)
- [@VaibhavSr007](https://www.github.com/VaibhavSr007)

