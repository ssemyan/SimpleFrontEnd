# Simple Front End

Simple HTML and Javascript front end for a Todo list. Data binding is done with [Knockout.js](https://knockoutjs.com/) and styling is [Bootstrap](http://getbootstrap.com/). [JQuery](http://jquery.com/) is used for the ajax calls. 

Users can add new items to their list, or mark existing items as complete (which deletes them). The inital call to the API pulls the current list of items for the user. 

Set the URL of the local or backend API in *vars.js* You can also run without an API (items are added or deleted to the list but not persisted to any storage) by setting the *noApi* variable in *vars.js* to *true*. 

An example WebApi backend can be found here: https://github.com/ssemyan/SimpleSqlBackend