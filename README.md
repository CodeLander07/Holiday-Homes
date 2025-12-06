# TripEasy - Hotel Management App

TripEasy is a full-stack web application designed to facilitate hotel management and booking. It allows users to list properties, view details, leave reviews, and manage their bookings. The application is built using the MEN stack (MongoDB, Express.js, Node.js) and follows the MVC (Model-View-Controller) architecture.

## 🚀 Features

- **User Authentication & Authorization:**
  - Secure Sign Up and Login functionality using Passport.js.
  - Authorization checks to ensure only owners can edit/delete their listings.
- **CRUD Operations for Listings:**
  - Users can Create, Read, Update, and Delete hotel listings.
  - Upload images for listings (stored via Cloudinary).
- **Review System:**
  - Users can leave ratings and comments on listings.
  - Reviews can be deleted by their authors.
- **Responsive Design:**
  - Built with Bootstrap for a mobile-friendly user interface.
- **Data Validation:**
  - Server-side validation using Joi to ensure data integrity.
- **Session Management:**
  - Persistent sessions using MongoDB (connect-mongo).
- **Flash Messages:**
  - Interactive feedback messages (success/error) for user actions.

## 🛠️ Tech Stack & Dependencies

The project utilizes the following technologies and libraries:

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **Mongoose:** ODM for MongoDB.
- **Passport.js:** Authentication middleware for Node.js.
- **Joi:** Data validation library.

### Frontend
- **EJS (Embedded JavaScript):** Templating engine.
- **EJS-Mate:** Layout support for EJS.
- **Bootstrap:** CSS framework for styling.

### Utilities & Middleware
- **Cloudinary & Multer:** For handling image uploads and storage.
- **Connect-Flash:** For displaying flash messages.
- **Express-Session:** For managing user sessions.
- **Method-Override:** To support PUT and DELETE requests in HTML forms.
- **Dotenv:** For environment variable management.

## 📂 Folder Structure

```
TripEasy/
├── controllers/        # Logic for handling requests (MVC Controller)
├── init/               # Database initialization scripts
├── models/             # Mongoose schemas and models (MVC Model)
├── public/             # Static files (CSS, JS, Images)
├── Routes/             # Express routes definitions
├── utils/              # Utility functions (Error handling, wrappers)
├── views/              # EJS templates (MVC View)
├── app.js              # Main application entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Custom middleware (Auth, Validation)
├── schema.js           # Joi validation schemas
├── .env                # Environment variables (not committed)
└── package.json        # Project dependencies and scripts
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/unstopablesid/Hotel-Booking-Website.git
    cd Hotel-Booking-Website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following credentials:
    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MONGOURL=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    ```

4.  **Initialize the Database (Optional):**
    If you want to seed the database with initial data:
    ```bash
    node init/index.js
    ```

5.  **Run the Application:**
    ```bash
    node app.js
    # OR for development with nodemon
    npm run dev
    ```

6.  **Access the App:**
    Open your browser and go to `http://localhost:3000`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

