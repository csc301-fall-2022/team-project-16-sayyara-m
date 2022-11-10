# Sayyara 

## Description
Our application is meant to be a bridge of communication between vehicle owners and automotive specialists/their shops. The problem we are trying to solve is the communication and visibility issue between shop owners and their customers, vehicle owners. We are creating a way for people with vehicles to connect to mechanics and other types of automotive shop owners.

## Key Features
- Users can sign up as a Shop Owner by entering their user info as well as shop info
- Once logged in, shop owners can edit their info of their user as well as their shop
- Input fields are protected with validation and display error messages to support the user
- On the shop owner home page, you can view all appointments and quotes that are booked with your shop
- You can view the details of an appointment by clicking on an appointment

## Instructions
Preset account:
```
username: bob123
password: password
```

The application starts on the login page. Either login with the preset account or press sign up to sign in with a new account and create a new shop. This login is connected to the backend and will only log you in if the account is registered in the database.
Note: Sometimes login fails and says it is invalid. This is a bug we are looking into. If this happens, wait for a minute and try pressing login again.
Note: When signing up, the phone number needs to be an actual registered phone number. Keep trying different phone numbers until you get one that doesn't show up as invalid.

Once logged in, you will see the home page of the shop owner. This is currently filled with mock data and not connected to your account. What you see is a list of appointments and list of quotes that will have been booked by a vehicle owner with this shop. If you click on an appointment, it will take you to the `AppointmentDetail` page for that specific appointment, which will eventually show a lot more details about the specific appointment. Both the quotes and appointments are horizontally scrollable views that you can either scroll on mobile by clicking and dragging or on desktop holding shift and scrolling with the mouse scroll wheel.

The nav bar is always available at the top with links to important pages. Currently `Home` links to the shop page for the current user, and `Appointments` links to a page that will show a more detailed view of a list of appointments. Currently it is empty. 
If a shop owner is logged in, the profile icon will always be there at the top right corner. You can click this and have access to two options. `Log Out` to log out of your account and get redirected back to the login page, or `Profile` which will take you to a view of your profile. From here, you can either edit your profile or your shop. These aren't currently linked to the database so it's just accessing mock data. There is still error checking for the fields which will tell the user what they are doing wrong. Click cancel to return. 

## Development requirements

**For building and running the application you need:**
- [Java JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Maven](https://maven.apache.org/)
- [Npm](https://nodejs.org/en/download/)

#### Build & Run application
###### Backend
```bash
# Start from root directory
cd backend
mvn clean install -DskipTests && mvn spring-boot:run

# Run tests
mvn test
```

###### Frontend
```bash
# Start from root directory
cd frontend
npm install
npm run start
```


## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

* Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
* If applicable, specify any naming conventions or standards you decide to adopt.
* Describe your overall deployment process from writing code to viewing a live applicatioon
* What deployment tool(s) are you using and how
* Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

We used GitHub Projects along with GitHub Issues to manage our tasks. This is how we decided to setup our project board:
![[ProjectBoard.png]]
Our workflow from start to finish is as follows. 
1. Create an issue with a name, description and label as `backend` or `frontend` and assign it to yourself.
2. When ready to start developing, move from `todo` to `in progress` in the project board.
3. Create a branch with a 2-3 word description of the task and assign your issue to the branch
4. Commit frequently with informative commit messages
5. When complete, push changes and create a pull request merging your branch into main
6. Request review from 2 other developers in the team
7. Resolve any problems that are brought up in pull request comments/reviews
8. Merge branch into main
9. Mark issue as `Done`
10. For backend, run `git subtree push --prefix backend main` to redeploy updated changes to the deployed backend app on Heroku. For frontend, the repository is forked and set to automatically deploy with the fork on Netlify. To trigger the redeploy, just pull from the main repository into the forked version.

Using GitHub issues/project to view our tasks makes it really easy for us to stay organized and ensure we always have work to do while everyone knows exactly who is working on what.

To deploy our application, we deployed the backend server as well as the Postgres instance on Heroku. The frontend is linked to this heroku backend. The backend is deployed on Heroku at sayyara.herokuapp.com. The frontend is deployed on Netlify at https://sayyara.netlify.app/.


## Licenses

We’ve applied the MIT License to our project. This license allows for free use of our project. We chose this license with the understanding that our partner would take over responsibility for updating and maintaining future iterations without our contribution.