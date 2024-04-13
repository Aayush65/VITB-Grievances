# VITB Grievance Portal

A Web-Portal, providing students with a dedicated platform to raise concerns, address issues, and seek clarification from the college administration and authorities. The portal includes separate pages for students, teachers, and administrators.

You can experience this site [here](vitb-grievances.aayush65.com).

## Features

Some of our key feature includes:

- Official complaint registration
- Anonymous complaints/suggestions
- JWT-based authentication & authorization
- Email alerts for status changes
- 2-factor authentication
- Real-time updates for status and remarks

## Tech Stack (Frontend)

- ReactJS
- TypeScript
- Tailwind
- JWT

## Tech Stack (Backend)

- NodeJS
- Express
- TypeScript
- JWT
- MongoDB
- Redis

## Environment Variables

To run the server, you will need to add the environment variables to your .env file as shown in .env.example

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

First clone this project on your local machine by running the following command:

```bash
  git clone https://github.com/Aayush65/VITB-Grievances
  cd VITB-Grievances
```

To deploy this server run

```bash
  npm install
  npm run dev
```

Now before deploying the frontend, set the `serverURL` to `localhost:${PORT_NUMBER}` in `client\constants\index.ts`:

To deploy the frontend run

```bash
  cd client
  npm install
  npm run dev
```

## Performance

![Lighthouse score](https://github.com/Aayush65/Grievance-Portal/assets/79572409/55b58564-de4b-4910-9d6f-6dcb299a6a3a)

## Demo

This site is hosted on [vitb-grievances.aayush65.com](https://vitb-grievances.aayush65.com).

**Demo Video**:

https://github.com/Aayush65/Grievance-Portal/assets/79572409/85a3485b-2fb6-4218-a33f-1cd27078b0b1

## Authors

- [@Aayush65](https://www.github.com/Aayush65)
- [@VaibhavSr007](https://www.github.com/VaibhavSr007)
