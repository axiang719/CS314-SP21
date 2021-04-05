# Inspection - Team *T13* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | DistancesRequest.java |
| Meeting | 03/29/2021 |
| Checklist | https://github.com/csucs314s21/t13/tree/main/reports/checklist.md |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Chad Minning | 4 Hours |
| Michael Young | 1 hour |
| Ethan Seefried | 1 hour |
| Anthony Xiang | 1 hour |
| Andie Groeling | 1 hour |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| DistancesRequest:12 | Distances stored as ints | hi | Chad | #553 |
| DistancesRequest | No 'distances' parameter returned when 'places' is empty | low | Chad | #554 |
| DistanceRequest 44-61 | Rename variables and legibility | low | Ethan | #556 |
| DistanceRequest | When given massive radius we get an off by one error | high | Ethan | #558 |
| DistanceRequest | The distance member varible should be just an array of longs | med | Anthony | #559 |
| DistanceRequest:33 | Only checks if distance should be 0 when i is 0 | med | Michael | #560 |
| DistanceRequest | Math functions should be separate from API wrapper | low | Andie | #555 |
| DistanceRequest:67-83 | This section is not just used for testing and should be refactored to reflect this | med | Andie | #549 |
