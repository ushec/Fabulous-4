# Software Engineering Coursework

## Members
* Paul Hayward
* Babatunde Kalejaiye
* Fabrizio Morales
* Usher Craig

## Screenshots of our Docker files working:
![Docker Picture 1](https://github.com/phayward11/Fabulous-4/assets/158571758/8cbd99aa-d045-4e0a-a808-84437c034717)
![Docker Picture 2](https://github.com/phayward11/Fabulous-4/assets/158571758/177bc737-6628-44b6-92e0-b4f9d40d972e)
![Docker Picture 3](https://github.com/phayward11/Fabulous-4/assets/158571758/dd9a5645-dbd6-496a-b632-7b7a4b9f2c08)
![Docker Picture 4](https://github.com/phayward11/Fabulous-4/assets/158571758/e286af7e-49de-4eed-8a1f-729b9ad831fa)
![Docker Picture 5](https://github.com/phayward11/Fabulous-4/assets/158571758/9c7a4138-d651-4b52-b360-9714564dcbee)


## How to interact with the API.
Prerequisites:
Node.js: Ensure that Node.js is installed on your system. You can download it from the official Node.js website: Node.js Downloads.

MySQL Server: Install MySQL Server on your machine. You can download it from the official MySQL website: MySQL Downloads.

Database Management Tool (Optional): You can use PHPMyAdmin or any other preferred database management tool to interact with the MySQL server.

Install Dependencies: Navigate to the project directory and install the required dependencies using npm install

Environment Variables: Update the .env file in the project root directory to store environment variables. Update the file with your MySQL database credentials.

example: 
MYSQL_ROOT_PASSWORD=yourPassword
MYSQL_USER=root or any username
MYSQL_PASSWORD=same as root pass
MYSQL_DATABASE=name
MYSQL_HOST=localhost
PORT=3000

Running the Application:
Start MySQL Server: Start the MySQL server on your machine. You can use the command line or a GUI tool to manage the MySQL server.

Database Setup: Ensure that the necessary database schema (world.sql) is available in your database. 

Start the Application: Run the following command to start the Node.js application: npm run dev

Access the Application: Open a web browser and navigate to http://localhost:3000 to access the application.
