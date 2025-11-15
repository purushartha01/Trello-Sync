# Trello-Sync
A Full-Stack task management system integrated with Trello's REST API and uses Trello Webhooks to communicate to with Trello web server in real-time and reflects any changes done to via Trello API to the app's Frontend.

## Tech Stack
* **Frontend:** React, CSS, TailwindCSS, Context API, socket.io-client
* **Backend:** Node.js, Express.js, socket.io, ngrok
* **Tools:** Git, Postman


### Prerequisites

- Create an [API KEY](https://trello.com/app-key), [API Token](https://trello.com/power-ups/admin/?utm_source=chatgpt.com), [API Secret Key](https://trello.com/power-ups/admin/?utm_source=chatgpt.com) through Atlassian's Developer portal.
- Install **ngrok** for tunneling the localhost server to a temporary public url accessible by Trello's Webhooks for real-time sync.
- The generated secrets can be stored in an ENV file. The blueprint for this file is provided in the backend directory.

## Steps to run the application
**1.** Clone the repository using the following command:

```git
    git clone https://github.com/purushartha01/Trello-Sync.git
```

**2.**  Open the root directory of the project in the Terminal and install the dependencies using the command:
```bash
    npm run installDeps
```

**3.** After installation completion, start the application using the command:
```bash
    npm run start
```

**4.** The application can be accessed by visiting the url:  [http://localhost:5173](http://localhost:5173)

**5.** Setup your ngrok and run the command: 
```ngrok
    ngrok http 3000
```

**6.** Add the Forwarding url into the ENV file, it will serve as the callback url through which the Trello Webhook will contact our server.

**7.** To setup the webhooks, make sure the application server is running, open Postman send the following requests in the given order: 

> [!IMPORTANT]

    1.  DELETE  https://your-callback-url/v1/api/webhooks/delete-all  
    2.  GET     https://your-callback-url/v1/api/webhooks/setup

