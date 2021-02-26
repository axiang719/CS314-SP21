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
| 2/22/2021 | 0 | 14 | none |
| 2/23/2021 | 1 | 13 | none |
| 2/24/2021 | 6 |  8 | none |
| 2/25/2021 |12 |  0 | none |

## Review

### Epics completed  
##### Epic One
Epic one entailed implementing the server protocol for the find feature. This epic was the longest part of the sprint, as the team learned about servers and databases. Upon completion, our server can succeessfully recieve a find request from the organazation that populates as the specifications require. 
##### Epic Two
Epic Two was completed efficiently and it allows users to find themselves by sharing thier location with the server. We were able to successfully move the map and marker to the users location when the webpage launches, also updating the table that was built on the website. A "find me" button was also implemented which takes the user back to thier location after clicking the button. The final part of this epic was centering the map on each click. 
##### Epic Three
In epic three, the team made it possible for users to search for a specific latidute or longitude, which was then updated in the table. Input was then validated, ensuring that users were passing in a correct format for latitude or longitude. The map was also updated for the user's search, moving the map marker to the specified location. 
##### Epic Four
Epic four implemented the "where" and "type" functionality for our server allowing users to search for a specific location based on where it is (country,city,municipality) or a type of location (airport,heliport,balloonport or other). We enabled our server to properly handle requests for these criteria, while also adding new buttons below the search bar. A toggle button was added for users to switch on and off a specific type and when the user designates a location in the "where?" field, it pops up a small button that allows users to track recent searches. When the user completes the search, it opens a table of locations that the user can scroll through and add a specific location. This also updates the map marker and table with the location.
##### Epic Five
Epic five was the quickest Epic for this sprint and it showed users extra information on the map for every click. Now instead of soley lat/lon, users can see an actual place with an address. This shows on the map, as well as updates the table with the new address field. 
### Epics not completed 
All epic were successfully completed, after much stress to the Epic Gamers.
## Retrospective
In retrospective, the team achieved everything that we set out to and implemented an awesome app. Everything came out better than expected, with additional functionality to what was planned. The work put in was as insane amount and the website is something the Epic Gamers are proud of after Sprint 2.
### Things that went well
Some things that went well were the server implementation and user interface implementation. Our server properly takes in post requests and generates data according to the company guidelines. Along with that, our interface is mobile freindly and incredibly easy for users to use. 
### Things we need to improve
Teamwork is the main thing that needs to improve for the next sprint. Communication was often an issue, with many people leaving meetings or not showing up entirely. People have been assigned tasks that were not finished on time, which led to teammates falling behind. Time was often wasted getting back on the same page with each other, having to explain code that was written. 
### One thing we will change next time
Teamwork will be improved next sprint. In the future, communication will be an added emphasis, leading to the Epic Gamers working more effiently with each teammate up to speed on what is being done. 
