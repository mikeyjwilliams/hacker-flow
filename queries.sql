--- QUESTION STATUS
--- unanswered questions
Select DISTINCT(q."id"), q."title" as "title", q."category" as "category", q."attempt_tried" as "attempt_tried",
q."comments" as "comments", 
u."username" as "username"
FROM "question_statuses" as qs
 JOIN "questions" as q
ON qs."question_id" = q."id"
JOIN "users" as u
ON  q."user_id" = u."id"
WHERE qs."solved" = 0;

--- answered questions

Select DISTINCT(q."id"), q."title" as "title", q."category" as "category", q."attempt_tried" as "attempt_tried",
q."comments" as "comments", 
u."username" as "username"
FROM "question_statuses" as qs
 JOIN "questions" as q
ON qs."question_id" = q."id"
JOIN "users" as u
ON  q."user_id" = u."id"
WHERE qs."solved" = 1;


------