## [CIRCECO.org](https://circeco.github.io/circulareconomy/)

NOTE: The map feature on this website might not working if you are using Internet Explorer as browser!  

![circulareconomy](https://circeco.github.io/circulareconomy/assets/img/demo/home_page.jpg)

### A platform about circular economy and for mapping circular initiative in the Stockholm area
Circeco aims to highlight and promote the network of existing circular initiative in the Stockholm area by mapping and organising those by sector. The website also wants to inform about what kind of circular action the user can take in order to have a sustainable alternative to the common consumption model take-make-dispose. 

## Technologies 

* HTML

* CSS 

* JAVASCRIPT

## Libraries and Frameworks 

* Bootstrap - Responsive, mobile-first components library 

* JQuery Ajax - JavaScript library that simplifies HTML document event handling, traversing, animating and Ajax interactions 

* Mapbox API - Tools and services to retrieve information about a created map account, to upload and to change resources, use Mapbox tools


## UX
The design goal is to create a sleek, simple and straightforward user interface. The use of colors is kept at a minimum that apart from the use of black and white, with also the employment of a type of red to highlight and catch attention and a type of green/blue in a different shade to represent different levels of circularity. This is also a reminder of the logo and of the sustainability theme often associated with green. The red color is also a reminder of the state of environmental emergency and the action to take. The colors employed and the font together create a specific custom theme recognizable among another website. This same custom theme can be used for the further development of the website. 
Everything is always accessible thanks to the sticky navigation bar at the top. The website at the moment develops over one page through different sections so each section can be reached by a click on the navigation bar. 
The CSS hover animation for the circular action cards clarifies the terminology used without clatter the website with excessive writing, while CSS animation of 'rotating word' for circular action is eye-catching while simply state what is meant by circular actions and what they are. Other CSS animations on hover like on the logo, navigation bar and on other buttons allow the user to quickly understand the interactivity of those elements. 
The main title also uses an animation but from JavaScript in order to understand the meaning of the acronym circeco again without clattering with too much writing but instead with an amusing animation. There are also two Javascript files that help the user to better navigate throughout the page apart from the navigation bar. One is the scroll spy, which allow the see on the navigation bar sticky to the top in which section of the website the user is. The second JavaScript code helps the user to scroll and snap to a section of the website. This is particularly useful for the map section so that the user can focus on interacting with the map without basically having the page moving too much. 
Finally, although the map section has to rely on external resources, It was adapted to fit the website same rules for style, accessibility and amusement so continuity is assurance. 

### Map functionality

The main functionality of the website is the circular atlas. It is a map with layers of points that indicates circular initiative in the Stockholm area. By clicking on the points on the map a box appears with info about the initiative and their website. The list next to the map has several features: 

1 - the list is adjusted based on the points viewed on the map 

2 - the user can select a place in the list by click and the map will zoom to the place and open a pop-up box with info about the place

![map tour](https://circeco.github.io/circulareconomy/assets/img/demo/map-click.gif)

3 - points on the map are divided by type of initiative (home, apparel, cycling-sport, electronics-books-music) and can be selected or unselected for be displayed on the map 

![map tour](https://circeco.github.io/circulareconomy/assets/img/demo/map-list.gif)

4 - there is a search box where the user can type more specifically what to look for and items on the list appear or not if match the search

![map tour](https://circeco.github.io/circulareconomy/assets/img/demo/map-search.gif)

5 - the selecting of a layer-type, the zoom-panning and display accordingly and the search box work together 


## Development including references and acknowledgment 
HTML and CSS code have been developed by me if otherwise there would be an in-line reference. I have relied on several tutorials from several sources on the web including blogs, but some websites have been particularly helpful and of inspiration for building this website and increase my knowledge. 

(https://www.w3schools.com/) 

(https://css-tricks.com/)

(https://codepen.io/)

(https://stackoverflow.com/)

Icons for contact are from (https://fontawesome.com)
Font style is from (https://fonts.google.com)

Several elements and functionality in the website are implemented with a combination of HTML, CSS and JAVASCRIPT codes and the references above were also useful for making these. 

Mapbox is been used for building the main functionality of circeco the map. It was possible to leverage on Mapbox existing library in order to build and combined map functionality. Moreover, Mapbox offers extensive accessible API documentation and tutorials that allowed learning easily. There were also several inspiring map example but It is obvious that the circeco map is customized and with original features. Writing the JavaScript code for the map functionality is been an iterative process where layers of complexity where added one per time. Several examples in Mapbox show one level of complexity but it is custom made to combine several functionalities together for my case. 

### Testing

All functionality are behaving in a predictable way and there are no errors reported in the console. 

The contact form is connected and I will receive a message to the email address indicated. 

The map is diplaying the custumised map made with mapbox studio and is dislpay also all layers with data created. 

This site was tested across multiple mobile devices (iPhone 4, 5, 7: Chrome and Safari, iPad, Samsung Galaxy) to ensure compatibility and responsiveness, and accross browsers (Chrome, Safari, Internet Explorer, FireFox). It is working on all browser except on Internet Explorer. This is because Mapbox Studio style editor and dataset editor are not compatible with Internet Explorer, but it can be accessed all other pages and features located from in the Mapbox Studio dashboard using Internet Explorer 10+. Also, Mapbox does not guarantee that Mapbox Studio will work with browsers that only support WebGL experimentally. 


### Deployment 
The website is hosted on GitHub pages, directly deployed from the master branch. Upon new commits to the master branchhe the website will update automatically. To run locally, cloning can be done to this repository directly into the chosen editor by pasting 'git clone https://circeco.github.io/circulareconomy/' into the terminal chosen. To cut ties with this GitHub repository, type 'git remote rm origin' into the terminal.

### Issues and limitation
I found Bootstrap a limitation in several cases while building the website but at the moment would still be a dependency in use. 
Limitations using bootstrap were related to set CSS values of margins and sizes of elements which often clashed with the desire and need of having a different out of the box settings. The set of rules that pre-define elements style using bootstrap clashed with needs that some elements of Mapbox have, as Mapbox has its own set of CSS stylesheet dependency. 


### Further development 
More functionality would be added in the future. First, more pages with more information about the circular economy are on their way. Second, it would be included a section about not local but web accessible circular initiative (circular pioneer). Third, there would be a section for businesses and organisations that want to improve their circularity and understand more about what strategies could be taken (circular strategies). Fourth, the user would be able to subscribe to the newsletter. The expansion of content and functionality would necessarily involve the deployment on a new platform with its own customised domain and the reorganising of the dependency and so some styles. Problems with Internet Explorer would also need to be fixed. 


## Licence and Copyrights 
The picture used on the website is from Pixabay and free to be used for commercial purpose, other styles and logos are custom made or in-line referenced. 
Circeco.org holds the copyright for the business idea, content and codes in this repository. 

Author **Piero Grilli** can be contacted at grilli.piero@circeco.org
