# BACKEND #

## START ##

- Configure '.env' file to get your database info.
- As default the nest will be running and listening on port 8000
- install the dependecies (npm install)
- make sure the prisma is properly installed and migrate (npx prisma migrate dev --name init)
- run start (npm run start) for dev watch (npm run start:dev)

## Routes ##

All routes are guarded by JWT Guardian that checks if the login info still valid,
local guard is set to validate the user login info, both have their respective strategies.

Also we have a decorator to set a public Route that we use in the login and register scenario
named @IsPublic



PUBLIC ROUTE
USER (/user)

@POST receives a user data as JSON: {username, name, password}

Checks username unique, create a new user ocurrency on User Database Model
in case the data is validated.



PUBLIC ROUTE
LOGIN (/login)

@POST receives a userInfo data as JSON {username, password}

Find and validate a user from the database, try to authenticate this and so do 
something based on result, return error in case this user data does not match or
realize the auth and set JWT sending it also to the front-end.



PROJECTS (/projects)

@GET route to get projects based on the user that was given on the bearer token.
returns an array of projects.



PROJECT (/project)

@POST receive project info to create new project on the database Project { title, zip_code, deadline, cost }.

Create a project and set some info as default
{ username, created_at, updated_at, done: false }



PROJECT (/project/:id) @id from the Project you want to get.

@GET a route used for get specific Project based on it's UUID, this route also checks if the user that the JWT carries
is valid to get this project comparing the username owner on the project data, if the user it is not the owner that 
gonna return a Unauthorized Exception.



PROJECT PATCH (/project/:id/done) @id from the Project that you want to make done.

@PATCH receives the id of the project to be patched, validate it using the the getById service to ensure
that this user can make done this project, return the project as done.



PROJECT DELETE (/project/:id/delete) @id from the Project that you want to delete.

@Delete receives the id of the project to be deleted, validate it using the the getById service to ensure
that this user can delete this project, delete the project on database.