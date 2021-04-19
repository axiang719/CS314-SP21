# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](images/BaseArchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem .
* Server SQL .
* Server concurrency.


### User Interface
![base](images/BaseUserInterface.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The blue areas highlight the actions that may be performed.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the map places a marker.
Whenever a user clicks on the map, the client should display a marker with latitude and longitude at that location.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking on the team name should tell me more about the team.
Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.
The collapsible map should disappear so only the about or map are displayed.
A close button / icon in the top right corner of the about will close the about and return the map to display.
A simple toggle in state should be able to control this rendering.
The about page should contain the team name as a heading, but be otherwise blank in base. 

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, a Test button should appear and the server name should disappear.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.


### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

![base component hierarchy](images/BaseComponentHierarchy.png)

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

![class diagram](images/BaseClassDiagram.png )

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* ConfigRequest is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* RequestHeader defines the basic components of all requests.

The classes in orange represent the external libraries used by the application.
Often there are several related classes but we've listed only one to simplify the diagram.
* GSON converts a JSOgit N string into a Java object instance.
* Spark provides the necessary web support for our MicroServer.
* JSON provides libraries to manipulate JSON objects using the JSON Schema libraries.
* Logger provides a centralized logging facility used in all of the application classes.


# Sprint 1

### User Interface

#### Main Section

Our team name and number will be added to the top of the user interface, website tab, header and footer of the webpage. A progressive disclosure will be added to convey extra information about the team.

![base](images/StartUI.png)

#### About Section

The "About" section will be updated to include the team's mission statement and team image. The mission statement will be accessible by clicking on the "Mission Statement" button. The bottom of the page will contain team member cards wich will include the names of each team member, along with a personal photo and biography. The biographies will be accessible by clicking on the cards.

![about interations diagram](images/AboutInteraction.png)

### Component Hierarchy
Our team image, mission statement, and images and biographies for each team member will be added to the webpage.
The Epic Gamer Team will implement a feature that will allow the user to see each of their map clicks with most recent of the clicks being at the top.
The ability to remove individual entries from the list of clicked locations, as well as the ability to clear the entire list will also be implemented.

![sprint 1 component hierarchy](images/Sp1ComponentDiagram.png)

### Classes
For this sprint, our team will not be making any changes to the class structure.

![class diagram](images/BaseClassDiagram.png)


# Sprint 2

### User Interface

#### Main section
Our team will be adding a button to the main page to return the user to their current postion. We will aslo be adding a search bar to allow users to search for places in several ways. We will also be fixing our our table to accommodate the textual representation of lat and long. the marker will also be updated to show textual form of lat and long

![PhoneDesignSprint2](images/phoneDesign.JPG)


### Component Hierarchy
This sprint will focus on adding search functionality to the Atlas component. This will include a component that searches locations by name and type, returning a list of matching results that can be selected from. We will also build a component that allows the user to search for a specific location by latitude and longitude which will update the atlas component and the list of clicks component with the matching location.

![sprint 2 component hierarchy](images/Sprint2Diagram.png)

### Classes
Sprint 2 will add both the Database class and the Query class. Query generates the SQL string needed to search the database for the information corosponding to a find request. Database opens a connection to the database and sends a query with a SQL string, returning the information it receives back.

![sprint 2 class diagram](images/Sp2ClassDiagram.png)

# Sprint 3

### User Interface
Sprint 3 will add the ability to see the distances between places store inside of the click history table. This will also be represented as a set of lines between the map markers for each stop on the trip. We will also have a cumulative distance for the trip displayed at the top of the table.

![sprint 3 UI diagram](images/Sprint3UI.png)

### Component Hierarchy
This sprint will focus on adding distance functionality to the Atlas component. This will include a component that calculates distance between locations.

![sprint 3 component hierarchy](images/Sprint3Diagram.png)

### Classes
Sprint 3 will add the DistanceRequest class, which will allow our server to handle new distance requests. DistanceRequest will take in a request and build a JSON response based on company guidelines. 

![sprint 3 class diagram](images/Sp3ClassDiagram.png)

# Sprint 4 
### User Interface
Sprint 4 will add buttons that allow for the user to order the current trip list, save the trip they've created, or load a previously created trip.

![sprint 4 UI diagram](images/Sprint4UI.png)

### Component Hierarchy
This sprint will focus on adding tour functionality to the Atlas comoonent. This will include a component that forms a tour from a list of places visited in index order. 
![sprint 4 component hierarchy](images/Sprint4Diagram.png)

### Classes
Sprint 4 will introduce the TourRequest class, which will allow the server to recieve 'tour' requests. A user will send a tour request with a JSON object containing a list of locations and the server will organize the list so that the distance between the places in the tour are more optimal before sending them back. 

![sprint 4 class diagram](images/Sp4ClassDiagram.png)

# Sprint 5
### Component Hierarchy
Sprint 5 will add functionality for users to change map settings within the Atlas component. This will include a new component on the map allowing users to change lines markers and map backgrounds. 

![sprint 5 class diagram](images/Sprint5Diagram.png)

