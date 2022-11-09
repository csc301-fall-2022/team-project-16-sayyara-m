# YOUR PRODUCT/TEAM NAME

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical.

## Description
* Provide a high-level description of your application and it's value from an end-user's perspective
* What is the problem you're trying to solve?
* Is there any context required to understand **why** the application solves this problem?

Our application is meant to be a bridge of communication between vehicle owners and automotive specialists/their shops. The problem we are trying to solve is the communication and visibility issue between shop owners and their customers. We are creating a way for people with cars to connect to mechanics and other types of automotive shop owners.

## Key Features
* Described the key features in the application that the user can access
* Provide a breakdown or detail for each feature that is most appropriate for your application
* This section will be used to assess the value of the features built

Shop owners are able to create accounts with the web app and store information about their shop as well as themselves. Once they create a profile for their shop it will be visible to other users of the application, vehicle owners do not have accounts. Vehicle owners can then request quotes for services that the shop can provide, they negotiate a price and once the details are finalized an appointment can be booked for the service to be complete.

## Instructions
* Clear instructions for how to use the application from the end-user's perspective
* How do you access it? Are accounts pre-created or does a user register? Where do you start? etc.
* Provide clear steps for using each feature described above
* This section is critical to testing your application and must be done carefully and thoughtfully

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
Using GitHub issues/project to view our tasks makes it really easy for us to stay organized and ensure we always have work to do while everyone knows exactly who is working on what.

To deploy our application, we deployed the backend server as well as the Postgres instance on Heroku. 

// TODO


## Licenses

We’ve applied the MIT License to our project. This license allows for free use of our project. We chose this license with the understanding that our partner would take over responsibility for updating and maintaining future iterations without our contribution.