--- QUESTION STATUS
--- unanswered questions
Select
  DISTINCT(q."id"),
  q."title" as "title",
  q."category" as "category",
  q."question" as "quesion",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "question_statuses" as qs
JOIN "questions" as q ON qs."question_id" = q."id"
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  qs."solved" = false;
--- answered questions
Select
  DISTINCT(q."id"),
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "question_statuses" as qs
JOIN "questions" as q ON qs."question_id" = q."id"
JOIN "users" as u ON q."user_id" = u."id"
WHERE
  qs."solved" = true;
------