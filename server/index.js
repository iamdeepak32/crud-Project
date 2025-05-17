const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'deepak123',
    database: 'crud_contact'
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes
// Get all contacts
app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM new_table";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

// Insert new contact
app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO new_table (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.status(201).send({ message: "Contact added successfully" });
        }
    });
});

// Delete a contact
app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM new_table WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.send({ message: "Contact deleted successfully" });
        }
    });
});

// Get a single contact by id
app.get('/api/get/:id', (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM new_table WHERE id = ?";
    db.query(sqlGet, [id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.send(result);
        }
    });
});

// Update a contact
app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE new_table SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.send({ message: "Contact updated successfully" });
        }
    });
});

// Root route
app.get('/', (req, res) => {
    res.send("API Running...");
});

// Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


