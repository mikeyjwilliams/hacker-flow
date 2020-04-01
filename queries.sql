--- QUESTION STATUS
--- unanswered questions
SELECT q."solved" as "solved", q."title" as "title",
 q."category" as "category", q."question" as "question",
 q."attempt_tried" as "attempt_tried", q."comments" as "comments",
 u."username" as "username"
 FROM "questions" as q
 JOIN "users" as u
 ON q."user_id" = u."id"
 WHERE q.solved = false;

 -- unanswered by id

SELECT q."solved" as "solved", q."title" as "title",
 q."category" as "category", q."question" as "question",
 q."attempt_tried" as "attempt_tried", q."comments" as "comments",
 u."username" as "username"
 FROM "questions" as q
 JOIN "users" as u
 ON q."user_id" = u."id"
 WHERE q."solved" = false and q."id" = ?
 LIMIT = 1;

--- answered questions
SELECT q."solved" as "solved", q."title" as "title",
q."category" as "category", q."question" as "question",
 q."attempt_tried" as "attempt_tried", q."comments" as "comments",
 u."username" as "username"
 FROM "questions" as q
 JOIN "users" as u
 ON q."user_id" = u."id"
 WHERE q.solved = true;

-- answered question by id

SELECT q."solved" as "solved", q."title" as "title",
q."category" as "category", q."question" as "question",
 q."attempt_tried" as "attempt_tried", q."comments" as "comments",
 u."username" as "username"
 FROM "questions" as q
 JOIN "users" as u
 ON q."user_id" = u."id"
 WHERE q."solved" = true AND q."id" = ?
 LIMIT = 1;