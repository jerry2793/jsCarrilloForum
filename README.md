# jsCarrilloForum
The Carrillo discussion forum promoting academic collaboration with honesty. It is extending the idea of Stack Overflow, but applying it to a web app which students can post discussion questions and connect with each other better! 
## MERN Full Stack here: 
#### Frontend: React app
##### Components List: 
###### Screens (big components)
1. Authentication and mainpage (hello world, welcome, here login or signup)\
2. create a new section view from teacher\
3. 
###### Widgets (small perfectionalized components)
1. form input for <textarea />, <input text /> - refer to google form's style\
2. 


#### Backend: Express module
#####    Here is the backend project layout: \
index.js is the main file which extends the routers\
###### Folders: 
routers : for containing express routers \
1. user authentication required routers that needs to extend auth middlewares\
2. routers to fetch - some auth required (fetch.js)\
3. to post - all auth required (posts.js)\

#####    URL Formats
/ : the url that returns the entire react app to the user\
/api/... : to fetch data from mongodb\
/posts/... : to post data\
