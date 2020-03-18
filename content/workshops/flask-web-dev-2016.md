---
title: "Flask Web Development"
date: 2016-02-14T00:53:01-05:00
draft: false
summary: "Learn how to use Flask -- which runs off Python, a language you probably know already from your classes at BU! -- to create a fantastic website that can interact with a database."
---

## Setup

Install [Python 3](https://www.python.org/downloads/), and have your favorite text editor ready. We reccomend [VS Code](https://code.visualstudio.com/).

Download the started code from our [Github repo](https://github.com/lawrluor/flask_webdev/).

### Create Your virtual environment

A virtual environment is an isolated Python environment that contains your application's libraries and dependencies. We will create and install a virtual environment, that we will name `flask`. The `activate` line activates your virtual environment.

On **OS X, Linux, Cygwin**:

{{< highlight bash >}}
# Navigate to your project directory (the starter code folder you downloaded)

# Using Python 3
$ python3 -m venv flask 
$ source flask/bin/activate

# Using Python 2
$ pip install virtualenv
$ virtualenv flask

# If the ABOVE commands fail: ERROR: virtualenv is not compatible with this system or executable  
# https://stackoverflow.com/questions/5904319/problem-with-virtualenv-in-mac-os-x
$ conda install virtualenv
$ virtualenv flask

# Install requirements and flask libraries. Try flask/bin/pip3 if not working
$ flask/bin/pip install flask
$ flask/bin/pip install flask-sqlalchemy
$ flask/bin/pip install sqlalchemy-migrate
$ flask/bin/pip install flask-whooshalchemy
$ flask/bin/pip install flask-wtf
{{< / highlight >}}

On **Windows**:

{{< highlight bash >}}
# Navigate to your project directory (the starter code folder you downloaded)
# $ dir will list all files & folders in your current directory, $ cd [folder] will change your current directory
$ python get-pip.py # Scripts\python # Python\get-pip.py
$ pip install virtualenv
$ virtualenv flask
$ flask\Scripts\activate.bat

# Install requirements and flask libraries
$ flask\Scripts\pip install flask
$ flask\Scripts\pip install flask-sqlalchemy
$ flask\Scripts\pip install flask-whooshalchemy
$ flask\Scripts\pip install flask-wtf
$ flask\Scripts\pip install sqlalchemy-migrate
{{< / highlight >}}


## Start

Open VS Code, and drag the starter code repository into the window. There will be a side panel that appears that shows the basic folder structure for our application.

* The `app` folder will be where we will put our application package. 
* The `templates` sub-folder is where our webpage templates will go (the front-end of the website, or the part the users interact with).

### The Application Object

We need to initialize the web application. View the simple init script for our `app` package (file `app/__init__.py`). Add the following lines  of code and ignore the rest - they will be explained later.

{{< highlight python >}}
from flask import Flask # import Flask library and class

app_obj = Flask(__name__) # Initialize Flask web application object

from app import views # This is the app folder in which views are located
{{< / highlight >}}

The script above simply creates a Flask application object, and then imports the views module, which we created earlier. Do not confuse `app_obj` the variable (which gets assigned the `Flask` instance) with `app` the package (from which we import the `views` module). 

### The Views

Views are the handlers that respond to requests from web browsers or other clients. Basically, each route is mapped to a Flask wrapper function. So if web address is `/home`, the corresponding `home` function in views will handle the request URL and execute the appropriate functions. Let's write our first view function, in file `app/views.py`. This file is under the app directory.

{{< highlight python >}}
from app import app_obj

@app_obj.route('/')
def home():
    return "Hello, World!"
{{< / highlight >}}

* The `@app_obj.route` decorators create the mappings from URL  `/home` to this function.
* What it does: just returns a string, to be displayed on the client's web browser. (Notice we did not use templates)

### Running the Web Application

The final step to have a fully working web application is to create a script that starts up the development web server with our application. Create file `run.py` in your root directory with the following code:

{{< highlight python >}}
#!flask/bin/python
from app import app_obj
app_obj.run(debug=True)
{{< / highlight >}}

The script simply imports the `app` variable from our app package and invokes its `run` method to start the server. Remember that the `app` variable holds the `Flask` instance that we created it above. The first line indicates that the version of Python we are using is from the virtual environment we created, `flask`.

Now it's time to run the script.

On **OS X, Linux and Cygwin**:

{{< highlight bash >}}
$ chmod a+x run.py # change file to be executable
$ python3 run.py
{{< / highlight >}}

On **Windows**:

{{< highlight bash >}}
$ flask/Scripts/python run.py
{{< / highlight >}}


You should get some confirmation that your server is running. Now, visit this address in your browser: [http://localhost:5000/](http://localhost:5000/) or the address that appears. To kill the server, hit ctrl-c. 


## Let's Get Cooking

### Using Templates

Remember how in `views.py`, we return `“Hello World!”` when accessing the `/home` view. We could also return raw HTML, as a string, but the better way to do it is to include it in a template, a standalone HTML file which Flask read. This allows you to create a dynamic HTML page

Put your code in the file `app/templates/home.html`, and under your app and templates directory.

{{< highlight html >}}
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
      <h1>{{ user }}'s Cookbook</h1>
  </body>
</html>
{{< / highlight >}}

Then, alter your `views.py` code to include this import: This is a function from Flask framework called `render_template`. 

{{< highlight python >}}
from flask import render_template
from app import app_obj
{{< / highlight >}}

This  takes a template filename (home.html) and a variable list of arguments and returns the rendered template, with all the arguments replaced. Finally, redefine your `home` function to return the home template, with `title` and `user` variables.

{{< highlight python >}}
def home():
    return render_template('home.html', title='Home', user='Law')
{{< / highlight >}}

Then run your code again: `$ python3 run.py.` Note how the title in your browser is the title you've supplied (`'Home'`), and that the `user` variable within the ` {{ }} ` has been replaced by your provided string. Those of you who understand HTML might be confused by that - this is Flask interpreting them using the [Jinja2](http://jinja.pocoo.org/) templating engine that is part of the Flask framework. Jinja2 substitutes `{{...}}` blocks with the corresponding values provided as template arguments.

### Jinja Hacks

You can do other cool things with Jinja, like set up conditional `(if, else)` statements or `for` loops. We're going to use the latter to display many recipes dynamically. 

First, add a dictionary `recipes` to your home function, and pass it into the render_template function. 

{{< highlight python >}}
def home():
    recipes = ['Chicken', 'Chowder']
    return render_template('home.html', title='Home', user='Law', recipes=recipes)
{{< / highlight >}}

In our `home.html` template, let's add support to display each individual recipe.

{{< highlight html >}}
<body>
    <h1>{{ user }}'s Cookbook!</h1>
    {% for recipe in recipes %}
        <div>{{ recipe }}</div>
    {% endfor %}
</body>
{{< / highlight >}}

This is the Jinja syntax for the `for` loop. We see inside the loop, we simply display each `recipe` as a dynamic variable from our list of `recipes` - neat! Now run your code again and view it in your browser.

### The Database

This is core of back-end web development. We will be using a SQLite Database. 

We will be using SQLAlchemy, a Python library that wraps raw SQL (Standard Query Language) calls  into easily accessible object-like representation of database tables. Those of you who have experience with raw SQL will understand what I mean in a second. This is also known as an Object-Relational-Model (ORM).

Uncomment out the commented lines in `app/__init__.py`. These will allow us to configure and create our database.

{{< highlight python >}}
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy # database interfacing

app_obj = Flask(__name__) # Initialize Flask web application object
app_obj.config.from_object('config') # use database path
app_obj.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app_obj) # create database

from app import views
from app import models
{{< / highlight >}}

### Databases Explained

Say you have a **library**, your database, and in your library you have thousands of **books**. Each book has the same attributes an **id** number, a **title**, and an **author**, so you can represent the books as a **database table**, with columns as attributes of the data and rows as each book (entry) in the database table.

![Library Database Example](/workshops/LibraryDB.png)

Analogously, our **cookbook** (the database) holds **recipes** (the database table), each with an **id**, **name**, and **cuisine**. So the database table `recipe`, with table columns `id, name, cuisine,` would look like this in our SQLite database.

![Recipe Database Example](/workshops/RecipeDB.png)

As a Python object, that would be:

{{< highlight python >}}
class Recipe:
    int id
    string name
    string cuisine
{{< / highlight >}}


Now as a SQLAlchemy database model, Recipe would look like this. Put this code in the file `models.py`, under the app directory:

{{< highlight python >}}
from app import db

# Stick to these table columns for now
class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    cuisine = db.Column(db.String(64), index=True)

    def __repr__(self):
        return '<Name: %r, Cuisine: %r>' % (self.name, self.cuisine)
        
    def __str__(self):
        return name
{{< / highlight >}}


* `tablename` is how your database will identify your table
* Each recipe in our cookbook will have a unique int `id`, so that it is easy to look up. These are automatically generated as they are the primary key, indicated by the `primary_key=True` argument
* Each recipe will have a string `name` under 128 characters long. This is unique, as indicated by the `unique=True` argument
* Each recipe will have a string `cuisine` under 64 characters long, indicating the type of cuisine the recipe belongs to
* `__repr__` method will tells Python how to print objects of this class, for debugging purposes
    
### Creating the Database

Head back to your project's root directory. We will now run a few scripts to create and generate the migrations. Don't worry if you don't fully understand this. View the [full tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database) if you're interested in the details.

{{< highlight bash >}}
# OS X, Linux: Create the database
$ chmod a+x db_create.py
$ python3 db_create.py

# Windows only: Create the database
$ flask\Scripts\python db_create.py
{{< / highlight >}}

This creates a new `app.db` file, which is an empty sqlite database. You will also have a `db_repository` directory with some files inside - this is where SQLAlchemy-migrate stores its data files.

{{< highlight bash >}}
# OS X, Linux: Generate the migration script
$ chmod a+x db_migrate.py
$ python3 db_migrate.py

# Windows only: Generate the migration script
$ flask\Scripts\python db_migrate.py`
{{< / highlight >}}


Anytime you change the models (and therefore the database tables), you will need to migrate your database. As we have changed our models (from nothing after creating the database, to containing one table Recipe), we will need to run this script, which will tell our database what to add in the next step.

{{< highlight bash >}}
# OS X, Linux: Upgrade the database
$ chmod a+x db_upgrade.py
$ python3 db_upgrade.py

# Windows: Upgrade the database
$ flask\Scripts\python db_upgrade.py
{{< / highlight >}}

Now our changes to the models have been fully applied, and we can begin working with the new Recipe table in our database. This means creating new Recipes, and altering or deleting existing ones.


## Playtime

Let's begin playing with the new Recipe table in our database. First, open up the Python shell.

{{< highlight bash >}}
$ python3 # OS X, Linux
$ flask/Scripts/python # Windows only
{{< / highlight >}}


 Bring our database and models into memory with this import:

{{< highlight python >}}
>>> from app import db, models
{{< / highlight >}}

Let's create a new Recipe:

{{< highlight python >}}
>>> recipe1 = models.Recipe(name='Spaghetti & Meatballs', cuisine='Italian')
>>> db.session.add(recipe1)
>>> db.session.commit()
{{< / highlight >}}

* Recall that the `id` is generated automatically, because `primary_key` was set to `True`. 
* Changes to a database are done in the context of a session, which belongs to the database object `db`. Multiple changes can be accumulated in a session and once all the changes have been registered you can issue a single `db.session.commit().`

Now query our database for the recipes:

{{< highlight python >}}
>>> recipes = models.Recipe.query.all() # Equivalent to raw SQL "FROM recipes SELECT *"
>>> recipes # returns a list of your current recipes
{{< / highlight >}}

Create two more recipes. You can be creative with this, or use the `Recipe` objects below.

{{< highlight python >}}
>>> recipe2 = models.Recipe(name='Clam Chowder', cuisine='New England')
>>> db.session.add(recipe2)

>>> recipe3 = models.Recipe(name='Green Eggs & Ham') # No need to fill cuisine parameter
>>> db.session.add(recipe3)

>>> db.session.commit()
{{< / highlight >}}


Now query our database again:

{{< highlight python >}}
>>> recipes = models.Recipe.query.all()
>>> recipes # Should return a list of your current recipes
{{< / highlight >}}

To exit the python shell, hit `ctrl-d`.

### The Functional Web Application

Let's go back to `views.py` and replace our placeholder recipe data with the recipe objects from our database. First, we need to update our import statements to include the database we've created, and our Recipe class in `app/models.py`

{{< highlight python >}}
from flask import render_template
from app import app_obj, db
from .models import Recipe
{{< / highlight >}}

Now, we will make two query statements to grab Recipe objects from our database
feature a recipe at the top of our page, and list others below.

{{< highlight python >}}
def home():
    recipes = Recipe.query.all()
    featured = Recipe.query.filter(Recipe.name=="Green Eggs & Ham").first()
    return render_template('home.html', title='Home', user='Law', featured=featured, recipes=recipes)
{{< / highlight >}}

* The first you are familiar with, which grabs all existing Recipe objects in the database. 
* The second, grabs only the first Recipe object that has the name `“Green Eggs & Ham”`. It returns None if no such object can be found
* There are many types of queries that SQLAlchemy supports, such as querying on multiple columns (name, cuisine), ordering, etc. If you are interested or want to work more on this, see [their documentation](http://docs.sqlalchemy.org/en/latest/orm/query.html)

Now, change our template to reflect this change.

{{< highlight html >}}
<body>
  <h1>{{ user }}'s Cookbook!</h1>

  <h2>{{ featured }}</h2>
  
  {% for recipe in recipes %}
    <div>{{ recipe }}</div>
  {% endfor %}
</body>
{{< / highlight >}}

Congratulations! You now have a working Flask Web Application, with a working front-end in HTML (interfaced with Jinja), that is mapped to a working back-end by URLs and Flask functions, and that pulls dynamic data from a live database.


## Next Steps

- Try expanding your application by including more routes like `'/favorites'`
- Query your database with more types of filters, joins, or query commands ([SQLAlchemy Documentation](http://docs.sqlalchemy.org/en/latest/orm/query.html))
- (Advanced) Expand your database to include more tables,  like `Ingredients` or database tables to have more columns (like `cooking_time`)

