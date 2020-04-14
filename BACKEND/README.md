# API Documentation

## Hacker-flow

## Getting started

To get the server up running locally:

- clone this repo
- cd BACKEND/
- `npm i` to install allrequired dependencies
- `npm run server` to start the local server
- `npm run test` to start server using testing environment.

## Backend Framework

Express@4.17.1

- it is un-opinionated when it comes to what you use with it.
- minimal and flexible for what is offers.
- lots of middleware and utility methods available.

## Endpoints
---

### Auth

|Method   | Endpoint  | Access Control  | Description  |
|---|---|---|---|
| POST  | `/register`  | none  | user register   |
| POST  | `/login`  | none  | log user in  |


POST `/register`

endpoint to add a user to users table.
data needed is laid out below.

- `username` - unique, required, up to 165 characters.
- `password` - required
- `email` - unique,  required, up to 165 chars.
- `first_name` - required, up to 125 chars.
- `last_name` - required, up to 125 chars.
- `role` - required. should be (`user-dev`)

A valid entry will return a status of `201` and

- `id`
- `username`
- `email`
- `first_name`
- `last_name`
- `role`

back as a json object.

---

POST `/login`

requires both the `username` and `password` used at time of `/register` endpoint. When you login you
will be given your `token` for access throughout the site. This decides what you have access too,
and what you can and can not do on the site. 
for now everyone is a `user-dev`.
`user-devs` have access where they can ask questions, and answer them.



---

[![codecov](https://codecov.io/gh/mikeyjwilliams/hacker-flow/branch/master/graph/badge.svg)](https://codecov.io/gh/mikeyjwilliams/hacker-flow)

---

## Overview

- Pitch:

> A posting board for `users` to ask questions. While `devs` can answer the questions. Also, third role.
> `user-dev` can post questions or answer questions.

## Progress

- backend goals completed:
  - all roles able to sign up.
  - all roles able to sign in.
  - unanswered questions shown to logged in users.
  - `user-dev` can ask and answer questions, let alone view both.
    - **update** 
      - originally there was 3 user roles.
      - `user` who could only ask questions not answer them.
      - `dev` who could only answer questions not ask them.
      - `user-dev` who could ask questions **and** answer them.
  - it only made sense to get rid of these other two user roles at this time.
  - the restrict role middle ware for both are still in the middleware
  - restrictRoleAnswer => restricts only `dev` && `user-dev` access at the moment.
  - restrictRoleQuestion => restricts only `user` && `user-dev` access at the moment.
  - these are ready and easily to be modifiable for other role granting.
  

- future goals:
  - be able to mark a `user-dev` question `solved`.
  - be able to mark a `user-dev` answer `best_answer`.
  - filter questions by `unanswered`, `solved`, or `all questions`, other options possible...
