# Partners-Webpage
**How to start the program:**

npm install - to install the required library

type npm run dev in the terminal to the run the porgram

**High level overview of the application and design:**

This application allows a partner organization to input their name, description, logo (as a URL), and select whether they are an active partner or not. This data is then saved and can be viewed by others. A user can also delete partner info.  

In the front-end portion of the code:

The partner form serves to add new partners and update them. The partner tiles will display them in the dashboard in a grid format. The dashboard is the main form. It displays the partner form and partner tile.

In the typescript file provided, I created the partner details object.

The index.html will call the source main.tsx. 

App.tsx loads the dashboard and the forms (form and partner tile).

The index.css is the style sheet.

The server.ts holds multiple operations such as get, post, delete, and delete all. The name acts as a primary key for these CRUD operations. 

**What did you learn from this project:**

Before starting this project, I was unfamiliar with TypeScript. Throughout the project, I learned how TypeScript's flow works. I began by identifying and understanding the entry point of the application. This initial step was crucial in grasping how the application is structured and how different components interact. I was somewhat familiar with CRUD operations but using them in a full stack (kind of) project was cool to learn. 

**What would you have done differently if you had more time?:**

Given more time, I would’ve like to restructure the code and implement an MVC pattern. 

I also could’ve done some data validations like checking if a given URL is valid, etc.

I would’ve also liked to tackle all the bonus questions - especially trying to save data in a database rather than a file. I have some experience with databased from CS 3200 however, I did not have enough time to play around with that so I used a file instead.

Search is also a very doable task with my design. I am able to modify the partner information and thus extend the same functionality for search.

**Did you run into issues during this project? If so, how did solve or work around
them?:**

Initially, I faced an issue where the alignment of elements was not working as expected. To troubleshoot this, I googled various solutions and made adjustments to the colors and fonts. These adjustments helped ensure that the visual elements were more consistent and aligned properly. I discovered that using the `align` property in CSS could help address this issue. To implement this solution, I modified the CSS files by incorporating `flex-wrap`. 

An error I am still having is the delete function. While it successfully deleted the partner information from the file, the UI did not update to reflect this change. 

**If you implemented any bonus features, what made you choose them?**

I implemented allowing the partners to edit a single field (modify just
their title or description). 

Saved the data so that when the page is reloaded, it still remains (saved info in a file).

I wanted to try implementing all bonus features but I simply started with the persistence mechanism.
