# Project's Name : Belly Rumble
https://roczi.github.io/project-api/
https://github.com/RocZi/project-api

>> Assignment2-Interactive Frontend Development Milestone Project
My project is called "Belly Rumble". It is a food web app that is able to provide information fast for anyone wanting to know where to eat at a particular location or filter by a type of establishment.

All that a user has to do is to filter by the category of food places that they want. Then they can search the food places at any particular location based on the map that they pin point to.


## UX
This website is for hungry people who wish to quickly find out the food places near them, the type of food places near them, and those places that are far from them. For those who are not that hungry and just want to browse to learn about the different food places available, they can click around freely to read as well

As a user who wants to choose between restaurants, cafes, places that offer meal deliveries, places that offer meal takeaways, or the normal shopping malls and supermarkets, they can filter via clicking the buttons available.

The schema diagram that I come up with filename "wireframe.png" is stored in a separate folder name wireframe.


## Features
### Existing Features
- Feature 1 - allows user to see a google map and navigate as a normal map. eg. zoom in and out and click on buildings and places to see further information

- Feature 2 - allows user to filter the types of places as categorised by Google Places API. the different types of places offered for filter are restaurants, cafes, meal deliveries, meal takeaways, shopping malls and supermarkets

- Feature 3 - allows user to see 20 results after the filter click within a 5 km radius. Default location on the map starts from the centre of Singapore at lat 1.3521, lng: 103.8198

- Feature 4 - allows user to right click on any other location see the nearby places from that location within its 5 km radius. Map is automatically centered to the selected location thereafter.

- Feature 5 - allows user to click on each results to see the name of the establishment, address, price level (on a scale of 0 to 4 where 0 is free and 4 is very expensive) and rating from 1.0 to 5.0, based on aggregated user reviews

(project-api.html was initially used as the search bar function was working with iframe to generate embedded google map, but in view of choosing to use filter of types of places which uses div instead, this html was abandoned and kiv as record)

### Features Left to Implement
Feature ideas would be :
- to allow text search
- to allow markers to be constrain to a particular country if possible
- to allow markers to display more data
- to allow mobile users to have the same functionality of the "right click" like the desktop web version. right now, mobile users only can "left click", so they can't do nearby search at other location


## Technologies Used
- HTML5 : The markup language used for this frontend project

- CSS3 : The styling

- JavaScript : To enable the animations and work with Google Maps JavaScript API and Google Places JavaScript API to obtain the data required from the API

- Bootstrap (getbootstrap.com) : Bootstrap is used to enable mobile responsive webpages

- jQuery (jquery.com) : This project uses JQuery to simplify DOM manipulation, which is also used in bootstrap themselves

- Canva (www.canva.com) : Canva was used to design and create the website logo

- Google Maps JavaScript API (https://developers.google.com/maps/documentation/javascript/tutorial) : to generate the map

- Google Places JavaScript API (https://developers.google.com/places/web-service/intro) : to generate the places

- Google Maps Embed API (https://developers.google.com/maps/documentation/embed/start) : for testing the syntax whether it works same as Google Maps JavaScript API and to understand the differences


## Testing
1. Navigate Google Map:
    1. Go to the home page
    2. Try to pan around map by holding left mouse button or right mouse button and verified that map can be pan 360 degrees and zoom in and out using mouse scroll wheel and the zoom buttons provided
    3. Try to click the zoom button on anywhere in the map and verified that the details of the place will pop up
        
2. Google Map Capabilities:
    1. Click on full screen mode on top right and that map goes full scree and all navigation is working
    2. Try to click on anywhere in the map and verified that the details of the place will pop up
    3. Drag pegman to a place in the map and verified that it can go to street view and all navigation is working
    4. Able to click back arrow to go back to map view
    5. Click Map, check Terrain box and click Satellite, click labels, and verified that these are working when the information and display toggles accordingly

3. Filter Types:
    1. Click on each category of filter and markers will appear at the centre of Singapore
    2. click and check a few markers to see that it is indeed the correct type as the name suggested

4. Place Info:
    1. click some markers to see that an info window will appear and display 4 information of name, address, rating and price level
    2. click X to close the window and verified success

5. Right Click:
    1. Right click on anywhere in Singapore and verified that surrounding markeres will appear
    2. Right click on anywhere in Singapore and verified that the words "You have selected : <selection>" will appear on top left of the map
    3. Right click on other locations in Singapore and verified that map will centered itself based on where it was clicked
    4. click on some markers to see that an info window will appear and display 4 information of name, address, rating and price level
    5. click X to close the window and verified success

6. Different Browsers:
    1. Each web page looks equally good in desktop Chrome, Firefox, Internet Explorer (v11), Edge and Opera
    2. Only internet explorer cannot generate google map
    3. Mobile browser chrome checked and working well for normal clicks, mobile responsiveness and navigation, as there is no 'right click' functionality for mobile.
    4. Using Developer Tools in desktop chrome, the default variety of phone and tablets dimensions given are used to check on mobile browsers and all seems well for normal clicks, mobile responsiveness and navigation.


The web app works fine as detailed. However, Bugs / error messages:
- not sure why chrome console shows 2 error messages at index.html:1 "Uncaught (in promise) Vc Promise.then (async) google.maps.Load". I got other errors previously eg. google is not definted. reading online for solutions, it mentioned the map must be loaded first, so i changed the script tags in html where the google map will be on top of my own script.js file. now this "uncaught" error appears instead.


## Deployment
- I follow the steps given by github pages (https://pages.github.com/) website under deployment method "Project site"
    - go to my assignment repository
    - click settings
    - scroll down to GitHub Pages
    - select master branch
    - done and link is provided

    Deployed :  https://roczi.github.io/project-api/
    Github :    https://github.com/RocZi/project-api


## Credits
Thanks to Code Institute online learning materials, Trent Global teacher, Paul Chor for his teachings, readings from google searches and stackoverflow.com whom ppl faces the same problems as i did and solutions provided to try.

Also thanks to readings from how things work and trying the code samples :
 - https://developers.google.com/maps/documentation/javascript/tutorial
 - https://developers.google.com/places/web-service/intro


### Content
- text content are all self created


### Media
- logo picture is created using template provided by www.canva.com


### Acknowledgements
- I am inspired to do this as I frequently visit food sites for new food adventures, at www.hungrygowhere.com, www.burpple.com/sg, www.tripadvisor.com.sg, sethlui.com, www.misstamchiak.com

- In implementing the development, I also gotten my understanding, ideas and insights from viewing and reading from the following:
    > https://github.com/Code-Institute-Submissions
    > https://codepen.io/sherrie-campbell/pen/rLjNwN
    > https://codepen.io/sevleonard/pen/KrbqZd
    > https://codepen.io/sevleonard/pen/NRWNkV
