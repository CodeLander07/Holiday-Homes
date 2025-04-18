# Hotel-Booking-Website

A full-stack hotel booking website where users can browse listings, view details, and manage bookings.

## Tech Stack

### Frontend
- **HTML5**: For structuring the web pages.
- **CSS3**: For styling the application.
- **Bootstrap 5**: For responsive design and UI components.
- **EJS**: For templating and dynamic rendering of views.

### Backend
- **Node.js**: For server-side JavaScript runtime.
- **Express.js**: For building the web server and handling routes.
- **Mongoose**: For interacting with MongoDB.

### Database
- **MongoDB**: For storing hotel listings and user data.

---

## GitHub Repository

Clone the repository using the following command:

```bash
git clone https://github.com/unstopablesid/Hotel-Booking-Website.git
```

Install the dependencies using the following command:

```bash
npm install
```

Initialize the database using the following command:

```bash
node init/index.js
```

## Folder Structure

Hotel-Booking-Website/
│
├── [app.js](http://_vscodecontentref_/1)                  # Main application file
├── init/
│   ├── index.js            # Database initialization script
│   ├── data.js             # Sample data for database seeding
│
├── models/
│   ├── listing.js          # Mongoose schema for hotel listings
│
├── public/
│   ├── css/
│   │   ├── style.css       # Custom styles
│   ├── images/             # Static images
│
├── views/
│   ├── layout/
│   │   ├── boilerplate.ejs # Layout template
│   ├── listings/
│   │   ├── index.ejs       # Page to display all listings
│   │   ├── show.ejs        # Page to display a single listing
│   │   ├── new.ejs         # Page to create a new listing
│   │   ├── edit.ejs        # Page to edit a listing
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar
│   │   ├── footer.ejs      # Footer
│
├── node_modules/           # Node.js dependencies
├── [package.json](http://_vscodecontentref_/2)            # Project metadata and dependencies
├── [package-lock.json](http://_vscodecontentref_/3)       # Dependency tree lock file
├── [README.md](http://_vscodecontentref_/4)               # Project documentation


Features
View all hotel listings.
View detailed information about a specific listing.
Add, edit, and delete listings (CRUD operations).
Responsive design for mobile and desktop.

