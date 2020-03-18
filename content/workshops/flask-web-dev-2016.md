---
title: "Flask Web Development"
date: 2016-03-18T00:53:01-05:00
draft: false
summary: "Learn how to use Flask -- which runs off Python, a language you probably know already from your classes at BU! -- to create a fantastic website."
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