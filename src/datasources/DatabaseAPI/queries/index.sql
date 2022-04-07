--SELECT_OPTIONS
SELECT
  Option.id,
  Workshop.name as workshop_name,
  Option.active,
  Option.day,
  Option.time,
  Teacher.name as teacher_name,
  Option.url,
  Workshop.description as workshop_description,
  Workshop.levels as workshop_levels,
  Teacher.id as teacher_id,
  Workshop.id as workshop_id,
  COUNT(Reservation.id) as reservations
FROM Option
INNER JOIN Teacher ON Option.teacher_id=Teacher.id
INNER JOIN Workshop on Option.workshop_id=Workshop.id
LEFT JOIN Reservation ON Option.id=Reservation.option_id
GROUP BY Option.id, Workshop.id, Teacher.id
ORDER BY Option.id;