# Inspection - Team *T13* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | Tour.java |
| Meeting | 04/05/21 |
| Checklist | https://github.com/csucs314s21/t13/tree/main/reports/checklist.md |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Ethan Seefried| 1 Hour  |
| Chad Minning | 45 Minutes |
| Michael Young | 15 Minutes |
| Anthony Xiang | 30 Minutes |
| Andie Groeling | 30 Minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Tour.java:99 | A new object gets instiantiated recursivley for getDistance leading to poor response times | med | Ethan | 607 |
| Tour.java | An index out of bounds error is returned when sending an empty list of places | high | Chad | 608 |
| Tour.java:53 & 98 | findDistance and getDistance perform the same function | low | Michael | 607 |
| Tour.java:148 | findTourDistance creates distance objects and is called recursively which negatively impacts performance | med | Michael | 609 |
| Tour.java | Tour.java is using some test from distancetest.java | med | Anthony | 610 |
| Tour.java | sortTourByDistance can be made more readable by breaking out the minimum distance calculation elsewhere | med | Andie | 611 |
