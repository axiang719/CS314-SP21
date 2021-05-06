# Sprint 5 - *13* - *The Epic Gamers*

## Goal
### *User Experience!*

## Sprint Leader: 
### *Andie Groeling*

## Definition of Done

* The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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
Epic one will focus on displaying the supported features of a server that the client is connecting to. The displayed details will include the valid domain of type and where values if those features are supported.

### Epic Two
Epic Two will focus on ensuring that our client works properly when paired with another team's sever, and vice versa. We will check if features are supported by the server and not render them on the client if they are not supported. 

### Epic Three
Epic three will focus on user experince. We will reduce the amount of buttons on our web site so it is easier to use for the user. We will also streamline or search bar to be more streamlined and dynamic.

### Epic Four 
Epic four will allow users to modify thier tour. Using their current tour list, users will be able to choose a new starting location while preserving the rest of the tour. Along with this addition, users will now be able to reverse the order of thier tour and re-order individual locations. Users may also now choose to remove a single destination from thier tour. For each individual location, users may now leave personal notes, which they will be able to save as a file. 

### Epic Five
Epic five will allow users to filter the tour in several ways. The tour will be made searchable, as well as filterable by Type. This will be done by conditionally rendering Tour places in the list. A list of checkboxes will be added to the UI to select Types.

### Epic Six
Epic six will let users make a search for a random list of places based on the 'type' and 'where' constraints if any are selected. The user will be able to add any of the random search results to their tour.

### Epic Seven
Epic seven will allow users to customize the lines that connect the places in a tour. They will be able to change the color, width, and style of the lines.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *count* |
| Tasks |  *34*  | *count* | 
| Story Points |  *37*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *4/19* | *#665* | *#702* | None |
| *4/20* | *#676, #680, #702* | *#586, #687, #708, #712* | None |
| *4/21* | *#712* | *#586, #687, #708, #712, #688* | None |
| *4/22* | *#707, #708, #687, #674, #586* | *#709, #701, #706, #688* | None |
| *4/23* | *#672, #706, #709* | *#684, #688* | None |
| *4/26* | *#741, #735, #703* | *#700, #704, #743, #739, #684, #738, #688* | None |
| *4/27* | *#684, #704, #738, #739, #744, #760, #762, #768* | *#688, #700, #743* | None |
| *4/28* | *#698, #700, #757, #773, #777* | *#688, #696, #761, #763* | None |
| *4/29* | *#761, #763, #779, #787* | *#688, #675, $677* | None |
| *4/30* | None | *#688, #743, $682, #677, #675* | None |
| *5/3* | *#675, #695* | *#678, #685, #682, #688* | None |
| *5/4* | *#688, #682, #685, #697, #755, #806, #699, #808, #811, #813, #815* | *#750, #683, #800* | None |
| *5/5* | *#750, #748, #746, #825* | *#690, #503, #683* | None |

## Review

### Epics completed 
### Epic One 
The first epic allows users to properly see what server they are connected to when using our client and also the list of features that the server allows. The details are visible as a popup when users click on the server link.

### Epic Two
Epic two allowed users to connect to a seperate server using our client without breaking when a non supported feature was rendered. If a seperate server doesn't allow features, the client will no longer render the tools for those features. When users use another client and connect to our server, they will now be allowed to use any of our supported features.

### Epic Three
Epic three reduced clutter on the UI, by reducing the amount of buttons on the client. The UI was reformatted so users can select options through a dropdown rather than multiple buttons. The trip list was also reformatted to allow progressive disclosure, making the list easily readable for users.

### Epic Four
The fourth epic allows users to modify thier existing tour. New features were added that allow users to select a new starting location, reverse the tour order or delete individual places from the trip. Users can also now add and save notes to specific destinations that they may like.

### Epic Five
Epic five allows users to filter thier tour, specifically searching within thier existing trip. Users can search for either an address or lat/long when they are filtering thier tour.

### Epic Six
Epic six allows users to search for a completely random location. When the users search with an empy search bar, a list of potential destinations with random type and where values pop up for the users to view or add.

### Epic Seven
Epic seven allowed users more flexibility with the UI design, by enabling differnet lines on the map. Users can now select thier own line color, width,  opacity and style by clicking the settings cogwheel on the map. On top of this, users can opt to turn the lines completely off if they no longer wish to see them.

### Epic Eight
The final epic was done to allow users to choose different map backrounds. Users start with the default map but now have four seperate options such as a realistic map, or dark mode map.

### Epics not completed 
All epics were completed this sprint, minus a few small parts. Because of the way we implemented our list of clicks, we were only able to filter the tour by either address or latitude and longitude values. 
## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
