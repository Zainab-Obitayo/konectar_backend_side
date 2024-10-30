// Import necessary modules and models  
const { Contact } = require("../models/contactModel");  
const ErrorResponse = require('../utils/ErrorResponse'); // Import error response  

// Post a new entry to the waitlist page  
const farmerContact = async (req, res, next) => {  
    console.log("Logging body", req.body)
    try {  
        // Destructure the request body  
        const {   
            firstname,   
            lastname,   
            email,  
            phoneno,    
            message   
        } = req.body;  

         
        // Check if the necessary fields are present  
        if (!firstname || !lastname || !email||   
            !phoneno|| !message) {  
            throw new ErrorResponse("Missing required fields", 400);  
        }  
    

        // Create new contact object  
        const newFarmerContact = new Contact({  
            firstname,   
            lastname,   
            email,  
            phoneno,    
            message   
        });  

        // Save new contact  
       await newFarmerContact.save();  

       // Respond with a success message  
         res.status(201).json({  
            message: "Thank you for Contacting Us! We would reach out to you soon!"  
      });

    } catch (error) {  
       next(error)
    }
};

module.exports = {  
    farmerContact,   
};