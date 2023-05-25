# BACKEND #

## START ##

- Configure '.env' file to get your database info.
- As default the nest will be running and listening on port 3000
- 

## Routes ##

USER (/user)

@POST receives a user data as JSON: {username, name, password}

Checks username unique, create a new user ocurrency on User Database Model
in case the data is validated.



LOGIN (/login)

@POST reveives a userInfo data as JSON {username, password}

Find and validate a user from the database, try to authenticate this and so do 
something based on result, return error in case this user data does not match or
realize the auth and set JWT sending it also to the front-end.
