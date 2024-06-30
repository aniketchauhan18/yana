# Yana ( Vehicle rental web  application )
Yana is a vehicle rental web application designed to provide users with an efficient, user-friendly platform for renting vehicles of their choice. With a focus on simplicity and convenience, Yana offers a seamless rental experience through its comprehensive set of features.

## Technology Stack

- **Frontend** - React.js with Vite TypeScript
- **Backend** - NodeJs with Express.js TypeScript
- **Database** - MongoDB
- **Authentication** - JWT

## Features

### User Registration and Authentication
- **Registration**: Users can register on the platform by providing necessary details. This step is crucial for identifying and personalizing the user experience.

- **Login**: After registration, users can log in to access their accounts. This process is secured to ensure that only the rightful owner can access the account.

- **Authentication**: The platform uses robust authentication mechanisms to secure access and protect user-specific functionalities such as listing a vehicle, booking a vehicle, and more.

### Vehicle Listing
- **Add Vehicle**: Vehicle owners can list their vehicles on the platform by providing detailed information such as vehicle type, model, year, price, and more.

- **Category Selection**: When listing a vehicle, owners must select a category from options such 
**Car**
**Truck**
**Motorcycle**
**Bus**
**Van**
**SUV**
**Bike**
**Bicycle**
**Other**
This categorization helps users in finding the right vehicle to meet their needs.

- **Add Vehicle**: Vehicle owners can list their vehicles on the platform by providing detailed information such as vehicle type, model, year, price, and more.

- **Razorpay Payment Integration**: For secure and hassle-free transactions, Yana integrates Razorpay as its payment gateway. This allows users to make payments for vehicle bookings directly through the platform with various payment options like credit/debit cards, net banking, and wallets.

- **PDF Generation of Receipt with jsPDF**: After a booking is completed and payment is made, Yana utilizes the jsPDF library to generate a PDF receipt for the transaction. This receipt captures all the essential details of the booking and payment, offering users a convenient document for personal records or reimbursement purposes.

- **Vehicle Booking**: Users can book vehicles of their choice by selecting the desired vehicle, pickup and drop-off dates, and making the payment. This process is streamlined to ensure a seamless booking experience for users.

## Deployment

The project is deployed and accessible via the following links:

### Frontend

- **Live Site URL**: [Frontend](https://yana-vahan.vercel.app/)

### Backend

- **API Base URL**: [Backend](https://yana-p1ew.onrender.com/)

## Installation and Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB
- TypeScript

### Clone the Repository

```bash
git clone https://github.com/aniketchauhan18/yana.git
cd yana
```
### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash 
  npm install
```
3. Create a `.env` file and add your environment variables:
### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```bash
PORT=3001
MONGODB_URI='Your MongoDB URI here'
SECRET_KEY='Your secret key here' // Jwt secret key
RAZORPAY_KEY_ID='Your Razorpay key ID here'
RAZORPAY_KEY_SECRET='Your Razorpay key secret here'
```

4. Start the development server:
```bash
npm run dev
```
### Frontend Setup
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash 
  npm install
```
3. Start the frontend:
```bash
  npm run dev
```

## API Endpoints

### User API Endpoints

- **Register**: `POST /api/v1/users/register` - Endpoint for user registration.
- **Login**: `POST /api/v1/users/login` - Endpoint for user login. Returns a JWT token for authentication.
- **Get User Profile**: `GET /api/v1/users/profile/:id` - Retrieve a user's profile by their ID.
- **Update User Profile**: `PUT /api/v1/users/update/:id` - Update a user's profile. Requires JWT authentication.
- **Add Rented Vehicle**: `PUT /api/v1/users/add/rented-vehicles/:id` - Add a vehicle to the user's list of rented vehicles. Includes logic to prevent vehicle duplication.
- **Get Rented Vehicles**: `GET /api/v1/users/rented-vehicles/:id` - Retrieve the list of vehicles rented by the user.

### Vehicles Endpoints

- **Get All Vehicles**: `GET /api/v1/vehicles` - Retrieve all vehicles available on the platform.
- **Get Vehicle by ID**: `GET /api/v1/vehicles/:id` - Retrieve details of a specific vehicle by its ID.
- **Get Vehicles by User ID**: `GET /api/v1/vehicles/user/:id` - Retrieve all vehicles listed by a specific user.
- **Register Vehicle**: `POST /api/v1/vehicles/register/:userId` - Register a new vehicle under a user's account. Requires JWT authentication.
- **Add Multiple Vehicles**: `POST /api/v1/vehicles/registerMany/:userId` - Add multiple vehicles to a user's account in a single request. Requires JWT authentication.
- **Update Vehicle**: `PUT /api/v1/vehicles/update/:id` - Update details of an existing vehicle. Requires JWT authentication.
- **Delete Vehicle**: `DELETE /api/v1/vehicles/delete/:id` - Remove a vehicle from the platform. Requires JWT authentication.

### Payment API Endpoints

- **Checkout**: `POST /api/v1/payments/checkout` - Endpoint for initiating a checkout process.
- **Payment Verification**: `POST /api/payments/v1/verification` - Endpoint for verifying payment status.
- **Store Payment Details**: `POST /api/v1/payments/store/:id` - Endpoint for storing payment details of a transaction.
- **Get Key**: `GET /api/v1/payments/key` - Endpoint for retrieving public keys or tokens necessary for initiating payments.

## Contributing

We welcome contributions from everyone! If you're interested in helping improve this project, here's how you can contribute:

1. **Fork** the repository on GitHub.
2. **Clone** your forked repository to your local machine.
3. **Create a new branch** for your feature or fix.
4. **Make your changes** and commit them with clear, descriptive messages.
5. **Push** your changes to your fork on GitHub.
6. **Submit a Pull Request** against the main branch of this repository.

Please ensure your code adheres to the project's coding standards and include any relevant tests. Before submitting a Pull Request, also make sure to update the README.md if necessary to reflect your changes or additions.

Thank you for your interest in contributing to our project!

## Contact

For any questions or suggestions, feel free to reach out to us via email: [workwithaniket18@gmail.com](mailto:workwithaniket18@gmail.com)