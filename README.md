# Manage Contacts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3. 

## Environment Setup
You need to set up your development environment before you can do anything.

[Install Node.js® and npm](https://nodejs.org/en/download/) if they are not already on your machine.
### NodeJS Version
   Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running `node -v` and `npm -v` in a terminal/console window.
   Older versions produce errors, but newer versions are fine.

Then install the Angular CLI globally. ` npm install -g @angular/cli`

Download and install SQLite db from [here](https://www.sqlite.org/download.html).

Now clone this project and go to root folder. 
Run `npm install`.

Go to **/server** folder and again run `npm install`.

The project is ready to launch.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Backend server
Change directory to **/server**.
Run `node index.ts` for a backend server. Navigate to `http://localhost:3000/`. If server started correctly you must see the output **Backend Server Running!**

## Database
This application is storing data in [SQLite](https://www.sqlite.org/index.html) database, which is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine.

##Fetaures Supported

This project support all the below features
- [x] An employee can only sign-up using company email address (something@inmar.com). 
- [x] During sign-up, an employee needs to fill mandatory information (e.g. first name, last name, email, aadhar # etc.). A strong password
- [x] also needs to be enforced (Have reasonable justification of what “strong” means)
- [x] After signup, an employee is able to log in using the registered email address and password.
- [x] When an employee logs in, he/she is able to create groups to manage contacts.
- [x] An employee is able to make a group active &/ Inactive.
- [x] Within a group, an employee can create unlimited contacts.
- [x] An employee is able to make the contact active &/ Inactive.
- [x] A contact information can hold all basic information, email and phone number.
- [x] An employee should be able to paginate through multiple contact groups/contacts.
- [x] An employee should be able to search the contact groups or contacts based on name/email/status.
- [x] Employee should be able to sort the data
- [x] One employee should not be able to see or manage other employee contact groups or contacts.
- [x] At any point, an employee is able to add groups and add/modify the information of contacts.
- [x] An employee is able to delete contact group or contact


# Author
[Mitesh Agrawal](https://github.com/mitesh007)
