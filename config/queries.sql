--- QUESTION STATUS
--- unanswered questions
SELECT
  q."id" as "question_id",
  q."solved" as "solved",
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  q.solved = false;
-- unanswered by id
SELECT
  q."id" as "question_id",
  q."solved" as "solved",
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  q."solved" = false
  and q."id" = ?
LIMIT
  = 1;
--- answered questions
SELECT
  q."id" as "question_id",
  q."solved" as "solved",
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  q.solved = true;
-- answered question by id
SELECT
  q."solved" as "solved",
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  q."solved" = true
  AND q."id" = ?
LIMIT
  = 1;
-- get answers for a specific question.
SELECT
  a."title" as "title",
  a."solution" as "solution",
  a."comments" as "comments",
  a."best_answer" as "best_answer",
  d."username" as "username"
FROM "answers" as a
JOIN "users" as d ON d."id" = a."dev_id"
JOIN "questions" as q ON a."question_id" = q."id"
WHERE
  q."id" = ?;
-- get all answers for a question without question.
SELECT
  a."title" as "title",
  a."solution" as "solution",
  a."comments" as "comments",
  a."best_answer" as "best_answer",
  d."username" as "username",
  q."id" as "question_id",
  a."id" as "answer_id"
FROM "answers" as a
JOIN "questions" as q ON a."question_id" = q."id"
JOIN "users" as d ON a."dev_id" = d."id"
WHERE
  q."id" = ?;