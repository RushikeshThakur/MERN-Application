# MERN APPLICATION

Simple Mern application for student Application

===========================================================================================================================
======================================================================

create database studentsrecords;
use studentsrecords;

create table users(
   Username varchar(50) primary key,
   Password varchar(50) not null
);


create table students(
    Username varchar(20) not null primary key,
    StudentName varchar(200) not null,
    University varchar(100) not null,
    Course varchar(100) not null,
    Year varchar(20) not null,
    Fees int not null
);

select * from students;
select * from users;


=============================================================================================================================
================================================================


# Execute the step shown below.


1. Execute the above sql query on Mysql-workbench.

2. Go to node folder- Install the package - npm install

3. Edit the restapitoken.js file
 - Database parameters - Password, port
  
4. Run the restapitoken.js file
 
5. Go to react folder - Install the package - npm install
 
6. Run the command - npm run start
