# Sprint 2 - *t13* - *The Epic Gamers*

## Goal
### *More ways to add places to the trip.*

## Scrum Master: 
### *Ethan Seefried*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

### Epic 1
Epic 1 will focus on implementing server functionality to support the "find" protocol object which will request details on geographic locations. This will involve creating an endpoint that the "api/find" requests are sent to. The requests will specify details on what locations are being searched for and will respond with a json object that consists of a list of matched locations along with the details of each. 

### Epic 2
Epic 2 will focus on allowing users to find their current location on the map. We will move the map to the user's current location upon starting the application, and we will add a button that will return the user to that location at any time.

### Epic 3
Users will be allowed to enter latitude and longitude in a variety of formats, which will be obtained through different tools. Data on latitude and longitude will be validated and the map will automatically move the marker to the position entered. After entering latitude and longitude, the history of places will be updated. On the map, users will see both the map and marker showing additional place details. 

### Epic 4
Create a search feature for locations that allow locations to be searched in several ways, presented to the user as a list where searched locations can then be selected to be added to either or both the map and trip list.

### Epic 5
Implement a feature that will convet the lat & long to a textual description, then we will add the textual description to the marker and history. We will then fix the table to accomidate the new format.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | 0 |
| Tasks |  26  | 4 | 
| Story Points |  19  | 0 | 

Based on previous results we should be able to complete all 5 epics planned. In sprint 1 we planned for 3 epics and finished well ahead of time, with our product functioning well. We had no bugs on release, with everything working as intended.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 2/08/2021 | 3 | 23 | none | 
| 2/10/2021 | 1 | 23 | none |
| 2/11/2021 | 2 | 29 | none |
| 2/12/2021 | 6 | 22 | none |
| 2/15/2021 | 6 | 20 | none |
| 2/16/2021 | 7 | 16 | none |
| 2/17/2020 | 3 | 15 | none |
| 2/18/2021 | 2 | 12 | none |
| 2/19/2021 | 2 | 13 | none |

## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
