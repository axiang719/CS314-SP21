# Sprint 4 - *t13* - *The Epic Gamers*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Michael Young*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio < 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
### Epic One 
Epic one we will be making our SQL more robust so that our search bar can accept airport codes and zipcodes. The SQL will also be able to handle partial city searches. 
### Epic Two
Epic two will focus on implementing a tour request for our server. We will add "tour" to the list of API features. A tour response will allow users to form a tour and see the places visted in index order until the last place returns to the first forming a trip.
### Epic Three
Epic three will be implementing functions for saving and exporting maps and tours. This will entail creating a new tour object, a list of tours, methods for exporting to various formats, storing data on the client side to remember export preferences, as well as creating UI elements for the list, buttons to add and remove from the new list, and UI for exporting tours and maps. UI elements to ask whether the website is allowed to store a cookie may also be necessary.
### Epic Four
Epic four will allow the user to load a previously saved tour. There will be a UI element that will bring up a list of tours, and display information about each. The user can click on a tour to load it. The tour will be successfully loaded whether it is in CSV or JSON format. 
### Epic Five
Epic five will introduce a user interface element that allows them to reorder the list of places in their tour so that the trip is in a more optimal order. This epic will also focus on the optomization of the 'tour' API call so that the user can recieve the newly ordered list in less than a second after requesting the tour. 
## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | *count* |
| Tasks |  42   | *count* | 
| Story Points |  39  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| --- | --- | --- | --- |
| 3/22/21 | None | #514, #515 | None |
| 3/23/21 | #514, #515 | #207, #429, #482, #487, #518 | None |
| 3/24/21 | #480, #487, #492, #518, #521, #523, #525 | #489, #503, #511, #512 | None |
| 3/25/21 | #480, #489, #522 | #503, #509, #511, #512, #524 | None |
| 3/26/21 | #511, #524, #539 | #471, #503, #509, #512 | None |
| 3/29/21 | #509, #552, #553 | #503, #541, #550, #554, #559 | None |
| 3/30/21 | #526, #550, #554, #567 | #551 | None |
| 3/31/21 | #541, #576, #580, #582, #585 | #558 | None |
| 4/1/21 | #506 | #497, #498, #558, #592, #593 | None |
| 4/2/21 | #593 | #497, #498, #510 | None |
| 4/5/21 | #601, #602 | #497, #498, #510, #600 | Andie had issues with Docker |


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
