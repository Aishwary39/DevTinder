1. Initialize git
2. .gitignore
3. Create a remote repo on github
4. Push all the code to remote origin
5. Play with routes and route extentions ("/hello", "/ ", "/hello/2")
6. Order of routes matters a lot
7. Install postman and make a workspace/collection and test API calls
8. Write logic to handle GET, POST, PATCH, DELETE Api calls and test them on postman
9. Explore routing and use of ?, +, (), \* in the routes
10. Use of regex in routes /a/ , /.\*fly$/
11. Reading the query params in routes
12. Reading the dynamic routes

13. Multiple route handlers - Play with the code
14. next()
15. next function and errors along with res
16. app.use("/route", rH, [rH2, rH3, rH4])
17. What is middleware and why do we need it?
18. How express JS handles requests behind the scenes
19. Difference app.use and app.all
20. Write a dummy auth middleware for admin
21. Write a dummy auth middleware for all user routes, except /user/login
22. Error handling using app.use("/", (err, req, res, next)={})

23. Create a free cluster(database) on mongodb website mongoDb Atlas
24. Install mongoose library
25. Connect you application to database.
26. Call the connectDB function and connect to database before starting the application
27. Create a user schema and userModel and add as many fields you want
28. Create post /signup API call
29. Push some documents (data) using API calls from postman
30. Error handling using try catch
31. JSON vs Javascript object difference
32. Add the express.json middleware to your app
33. Make your signup api dynamic to receive the data from end user
34. User.findOne with duplicate emailId, which document will it return
35. API - Get user by email
36. API - Get /feed - Get all the users from the database
37. API - Get user by id
38. API - Create a delete user API
39. Difference between PATCH and PUT
40. API - Create a update user API
41. Explore options in Model.findOneAndUpdate
42. API : Create a API for update the user using email id
43. Explore SchemaType options from the documentation
44. Add required, unique, lowercase, min, minLength, trim
45. Add default type,timestamps in SchemaType
46. Create a custom validate function for gender
47. Improve the DB schema, put all appropriate validations on each field in Schema
48. API level validations on patch(update) request and signup request
49. Data Santization : Add API level validation for each field
50. Explore Validator library function and use validator functions for password, email etc.
51. Validate data in Signup API
52. Install bcrypt package.
53. Create PasswordHash using bcrypt.hash and save the user with encrypted password
54. Create Login API
55. Compare passwords and throw error if email or password is invalid
56. JWT Token is divided into three parts in the same sequence :
    a. Header
    b. Payload
    c. Signature
57. Install cookie parser
58. Send a dummy cookie
59. Create a /Get profile API and check if the cookie is back.
60. Install jsonwebtoken API
61. In login API, after email and password validation create a JWT token
62. Read the cookie inside your profile API and find the logged in user
