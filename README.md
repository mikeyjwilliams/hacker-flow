# hacker-flow

## Auth

POST `/register`

endpoint to add a user to users table.
data needed is laid out below.

- `username` - unique, required, up to 165 characters.
- `password` - required
- `email` - unique,  required, up to 165 chars.
- `first_name` - required, up to 125 chars.
- `last_name` - required, up to 125 chars.
- `role` - required. should be either(`user`, `dev`, or `user-dev`)

A valid entry will return a status of `201` and

- `id`
- `username`
- `email`
- `first_name`
- `last_name`
- `role`

back as a json object.

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
  - a `user` || `user-dev` can ask a question.
  - a `dev` cannot ask a question.
  - a `dev` || `user-dev` can post an answer to question.
    - a `user` cannot answer a question.

- To GO:
  - all roles can read the answers posted on a question.

- future goals:
  - be able to mark a `user` question `solved`.
  - be able to mark a `devs` answer `best_answer`.
  - filter questions by `unanswered`, `solved`, or `all questions`, other options possible...
