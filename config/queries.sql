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
-----------------------
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
  1;
---------------------------------
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
  q."solved" = true;
-------------------------------------
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
  1;
-- all questions answered or unanswered.
SELECT
  q."solved" as "solved",
  q."title" as "title",
  q."category" as "category",
  q."question" as "question",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "comments",
  u."username" as "username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id";
-------------------------------------------
  -- allQuestionsByUsers in questions-model.js
  -------------------------------------------
SELECT
  DISTINCT(q."id"),
  q."id" as "question_id",
  q."title" as "question_title",
  q."category" as "question_category",
  q."attempt_tried" as "attempt_tried",
  q."comments" as "question_comments",
  q."solved" as "question_solved",
  u."username" as "question_username"
FROM "questions" as q
JOIN "users" as u ON q."user_id" = u."id"
JOIN "sign_ins" as s ON u."sign_in_id" = ?;
-------------------------------------------
  -- get answers for a specific question.
SELECT
  a."title" as "title",
  a."solution" as "solution",
  a."comments" as "comments",
  a."best_answer" as "best_answer",
  d."username" as "username"
FROM "answers" as a
JOIN "users" as d ON d."id" = a."user_id"
JOIN "questions" as q ON a."question_id" = q."id"
WHERE
  q."id" = ?;
-------------------------------------------------------
  -- get all answers for a question without question included.
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
JOIN "users" as d ON a."user_id" = d."id"
WHERE
  q."id" = ?;
--------------------------------------------------------------
  --- select question and all answers under the question.
SELECT
  q."id" as "question_id",
  q."title" as "question_title",
  q."category" as "question_category",
  q."question" as "question_question",
  q."attempt_tried" as "question_attempt_tried",
  q."comments" as "question_comments",
  q."solved" as "question_solved",
  user."username" as "question_username",
  a."id" as "answer_id",
  a."title" as "answer_title",
  a."solution" as "answer_solution",
  a."comments" as "answer_comments",
  a."best_answer" as "answer_best_answer",
  answer."username" as "answer_username"
FROM "questions" as q
JOIN "answers" as a ON a."question_id" = q."id"
JOIN "users" as user ON q."user_id" = user."id"
JOIN "users" as answer ON a."user_id" = answer."id"
WHERE
  q."id" = ?;
---------------------------------------
  --- ANSWER Queries ---------------------
  ----------------------------------------
  ---- findById answer-model-----
SELECT
  a."title" as "title",
  a."solution" as "solution",
  a."comments" as "comments",
  a."best_answer" as "best_answer",
  u."username" as "answer_username"
FROM "answers" as a
JOIN "users" as u ON a."user_id" = u."id"
WHERE
  a."id" = ?;
-------------------------------------------
  -- get answers by question ID
  -------------------------------------------
SELECT
  a."id" as "answer_id",
  a."title" as "answer_title",
  a."solution" as "answer_solution",
  a."comments" as "answer_comments",
  a."best_answer" as "best_answer",
  u."username" as "answer_username"
FROM "answers" as a
JOIN "users" as u ON a."user_id" = u."id"
JOIN "questions" as q ON a."question_id" = q."id"
WHERE
  q."id" = ?;
-----------------------------------------
  -- getUser user-model ---------------------
  -------------------------------------------
SELECT
  u."id" as "user_id",
  u."username" as "username",
  u."first_name" as "first_name",
  u."last_name" as "last_name",
  s."email" as "email",
  s."id" as "main_id"
FROM "users" as u
JOIN "sign_ins" as s ON u."sign_in_id" = s."id"
WHERE
  u."id" = ?;
------------------------------------------------------
  --- question comments queries
  ------------------------------------------------------
SELECT
  qc."comment" as "comment",
  u."username" as "username"
FROM "question_comments" as qc
JOIN "users" as u ON qc."user_id" = u."id"
WHERE
  qc."id" = ?;
--------------------------------------------
  ---- all comments by a user ----------------
  --------------------------------------------
SELECT
  qc."comment" as "comment",
  u."username" as "username"
FROM "question_comments" as qc
JOIN "users" as u ON qc."user_id" = u."id"
where
  qc."user_id" = ?;
-----------------------------------------------
  --- all comments for a question ---------------
  -----------------------------------------------
SELECT
  c."comment" as "comment",
  u."username" as "username"
FROM "question_comments" as c
JOIN "users" as u ON c."user_id" = u."id"
WHERE
  c."question_id" = ?;
------------------------------------------