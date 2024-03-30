# Food Delivery API

## Introduction
This is a RESTful API for managing food orders and calculating delivery cost.

## API Documentation

### Endpoint:
- **URL:** `/api/deliveryprice`
- **Method:** POST
- **Description:** Calculate the total price of food delivery based on the provided parameters.
- **Tags:** Food

#### Request Format:
- **Body:**
  - `zone`: string (required) - The delivery zone.
  - `organization_id`: string (required) - The organization ID.
  - `total_distance`: number (required) - The total distance of delivery in kilometers.
  - `item_type`: string (required) - The type of item (perishable/non-perishable).

#### Response Format:
- **Success Response (200):**
  - Content Type: application/json
  - Body:
    ```json
    {
      "total_price": number
    }
    ```
  - Description: The calculated total price of food delivery.
  
- **Error Responses:**
  - **400 Bad Request:**
    - Content Type: application/json
    - Body:
      ```json
      {
        "message": string
      }
      ```
    - Description: Indicates that there was a problem with the request. The `message` field provides information about the error.
  - **404 Not Found:**
    - Content Type: application/json
    - Body:
      ```json
      {
        "message": string
      }
      ```
    - Description: Indicates that no items were found matching the specified criteria.

#### Error Handling:
- If any of the required fields (`zone`, `organization_id`, `total_distance`, `item_type`) are missing or invalid, a 400 Bad Request response is returned with an appropriate error message.
- If the `total_distance` is not between 1 and 30 kilometers, a 400 Bad Request response is returned with an appropriate error message.
- If the `item_type` is not 'perishable' or 'non-perishable', a 400 Bad Request response is returned with an appropriate error message.
- If the `organization_id` is not an integer, a 400 Bad Request response is returned with an appropriate error message.
- If the `zone` or `item_type` is not a non-empty string, a 400 Bad Request response is returned with an appropriate error message.
- If no items are found matching the specified criteria, a 404 Not Found response is returned with an appropriate error message.

## Test Suite
Ensure to cover major functionalities and edge cases in your test suite to validate the correctness of the `foodCalucation` function.

## Setup Guide
Follow these steps to set up the project and database locally:

1. **Open PgAdmin and Create a Database and Tables:**
   - Open PgAdmin and create a new database by right-clicking on "Databases" and selecting "Create Database". Enter the desired database name.

2. **Create Tables:**
   - Open the query tool and select the created database.
   - Copy and execute the following SQL statements to create the necessary tables:
     ```sql
     CREATE TABLE organization (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );

     CREATE TABLE item (
       id SERIAL PRIMARY KEY,
       type VARCHAR(255) CHECK (type IN ('perishable', 'non-perishable')),
       description TEXT
     );

     CREATE TABLE Pricing (
         organization_id INT REFERENCES Organization(id) ON DELETE CASCADE,
         item_id INT REFERENCES Item(id) ON DELETE CASCADE,
         zone VARCHAR(255) NOT NULL,
         base_distance_in_km INT NOT NULL CHECK (base_distance_in_km > 0),
         km_price NUMERIC(10, 2) NOT NULL CHECK (km_price >= 0),
         fix_price NUMERIC(10, 2) NOT NULL CHECK (fix_price >= 0),
         PRIMARY KEY (organization_id, item_id, zone)
     );
     ```

3. **Insert Sample Data:**
   - Execute the following SQL statements to insert sample data into the tables:
     ```sql
     -- Insert sample organizations
     INSERT INTO organization (name) VALUES
       ('Organization 001'),
       ('Organization 002'),
       ...
       ('Organization 020');

     -- Insert sample items
     INSERT INTO item (type, description) VALUES
       ('perishable', 'Perishable item 1'),
       ('non-perishable', 'Non-perishable item 1'),
       ...
       ('perishable', 'Perishable item 10'),
       ('non-perishable', 'Non-perishable item 10');

     -- Insert sample pricing data
     INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES
       (1, 1, 'Zone A', 5, 1.5, 10),
       ...
       (1, 2, 'Central', 5, 1, 10);
     ```

4. **Download the Project:**
   - Once the database has been created, download the project.
  
  
### Prerequisites
- Node.js installed on your machine
- PostgreSQL installed on your machine
- Postman or any API testing tool installed (optional)

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/loki4514/Food-API
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Add the following configuration for your database:
     ```dotenv
     PORT=your_port
     user=postgres
     host=localhost
     database=db_name
     password=password
     db_port=5432
     ```
   - Replace `your_port`, `db_name`, and `password` with your actual database credentials.

### Running the Server
1. **Start the Server:**
   ```bash
   npm start
   ```
2. **Testing the Backend:**
   - To test the backend, use Postman, ThunderClient, or any API testing website.
   - You can access the Swagger documentation by clicking on the provided link. Once there, navigate to the POST route you want to test. Click on 'Try it out', then input the desired JSON data for the POST   request. After that, click on 'Execute' to send the request and receive the response.
   - Alternatively, you can test using Swagger UI by navigating to `http://localhost:8000/api-docs/`, where you can interactively test the API endpoints.
   - To create a request in Postman for a POST route:
   - Open Postman.
     - Create a new request by clicking on the "New" button in the upper left corner and selecting "Request."
     - In the request builder, enter the URL of your POST route.
     - Choose the HTTP method as "POST" from the dropdown menu next to the URL.
     - Click on the "Body" tab below the URL bar.
     - Select "raw" from the options below the body tab.
     - Choose JSON (application/json) as the type of data you want to send.
     - Enter your JSON request body in the text area.
     - Click on the "Send" button to execute the request and see the response.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
  
  

