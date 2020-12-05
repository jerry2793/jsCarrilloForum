# jsCarrilloForum - Introduction
The Carrillo discussion forum promoting academic collaboration with honesty. It is extending the idea of Stack Overflow, but applying it to a web app which students can post discussion questions and connect with each other better! 
## Goal: 
To provide a platform for students and teachers to connect better when asking questions about academic, grade policies, 
To provide an all-in-one platform to enhance the learning experience especially in distance learning, make asking questions easier, and make teachers not to answer repeating questions - check the related threads! (inspiration from stack overflow). 
#
# Project Plannings: 
1. Frontend Components setup with some basic widgets to use here and there. *Checked*
2. Authentication + style the navbar
3. Create Sections, or called courses
4. allow opening threads or topics or individual questions to post in each section
5. User homepage
6. Styling, packaging
7. Deployment and Showcase. 
#
# Project Layout
## MERN Full Stack "project stractch paper" here: 
### Frontend: React app
##### Components List: 
###### Screens (big components)
1. Authentication and mainpage (hello world, welcome, here login or signup)
2. homepage that contains all the user related settings
3. create a new section view from teacher
4. add new thread in a given section
5. thread details view - to view question, comments and answers from a thread
6. manage the active threads one user had posted and give notifications when answers arrive (like the homepage when you go to google classroom), teacher has a special manage their sections widget too
###### Widgets (small perfectionalized components)
1. form input for <textarea />, <input text />, and radio select - refer to google form's style
2. thread / section widget where json list can be passed in (thread, section manage view is the same style / component)


### Backend: Express module
#####    Here is the backend project layout: 
index.js is the main file which extends the routers
###### Folders: 
routers : for containing express routers
1. user authentication required routers that needs to extend auth middlewares
2. routers to fetch - some auth required (fetch.js)
3. to post - all auth required (posts.js)

#####    URL Formats
/ : the url that returns the entire react app to the user\
/api/... : to fetch data from mongodb\
1. sections/:id : to grab the avaible sections a user is enrolled or permitted in (id = user id created by mongodb)
2. threads/:id : to grab the existing threads given (id of that sections) - returns [title, description, user, numReplies, isSolved]
3. thread-details/:id : to get the comments, title, 
/posts/... : to post data\

# My Contacts
If there are any questions, feel free to email at this address: ruiyang_j2310@srcschools.org 
