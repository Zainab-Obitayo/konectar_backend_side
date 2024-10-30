const mongoose = require("mongoose");  

// Define the schema for the waitlist  
const contactSchema = new mongoose.Schema({  
    firstname: {  
        type: String,    
        required: [true, 'What is your first name?'],  
        trim: true  
    },   
    lastname: {  
        type: String,    
        trim: true,  
        required: [true, 'What is the name of your last name?']  
    },  
    email: {  
        type: String,   
        required: [true, 'Email is required']  
    },
     phoneno: {   
            type: String,  
            required: [true, 'Phone number is required'],  
         },
    message:{
        type: String,
        required:[true, 'Send Us A Message']
    }
}, { timestamps: true });  

// Create Mongoose model  
const Contact = mongoose.model("Contact", contactSchema);  

// Export the models for use in other parts of the application  
module.exports = {  
    Contact  
};

  