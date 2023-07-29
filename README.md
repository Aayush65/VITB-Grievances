
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
## Server

The server for our Grievance Portal is hosted on Railway. The repository for the server is [here](https://github.com/Aayush65/grievance-server).
## Deployment

To deploy this project, first deploy the [server](https://github.com/Aayush65/grievance-server).

After deploying the server, clone this project on your local machine by running the following command:

```bash
  git clone https://github.com/Aayush65/grievance-portal
  cd grievance-portal
```

Now before deploying, replace all the instances of the following with the location of your hosted server:

`https://grievance-server.aayush65.com/ping`

**Example**: `http://localhost:3000/`

To deploy this project run

```bash
  npm install
  npm run dev
```
## Demo

This site is hosted on [vitb-grievances.aayush65.com](https://vitb-grievances.aayush65.com).



## Authors

- [@Aayush65](https://www.github.com/Aayush65)
- [@VaibhavSr007](https://www.github.com/VaibhavSr007)

