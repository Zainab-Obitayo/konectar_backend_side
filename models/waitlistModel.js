const mongoose = require("mongoose");  

// Define the schema for the waitlist  
const waitlistSchema = new mongoose.Schema({  
    username: {  
        type: String,  
        unique: true,  
        required: true,  
        trim: true  
    },  
    farmname: {  
        type: String,  
        required: true, 
        trim: true  
    },  
    
    farmlocation: {  
        type: String,   
        required: [true, 'Enter your city, state, and country']  
    },  
    
    contactinformation: {  
        emailcontact: {   
            type: String   
        },  
        phoneno: {   
            type: String,  
            validate: {  
                validator: function(v) {  
                    // Validates phone numbers with 10 or 11 digits  
                    return /^\d{10,11}$/.test(v);  
                },  
                message: props => `${props.value} is not a valid phone number! It must be 10 or 11 digits long.`  
            },  
            required: true, 
        }  
    },  
    farmsize: {  
        type: String,   
        required: true, 
    },  
    typeofproduce: {  
        type: String,  
        enum: ['Mango', 'Pawpaw', 'Pineapple', 'Orange', 'Banana', 'Plantain', 'Avocado', 'Cashew', 'Guava', 'Coconut', 'Soursop', 'Tangerine', 'Strawberries', 'Blueberries', 'Blackberries', 'Raspberries', 'Watermelon', 'African Star Apple (Agbalumo/Udara)', 'Apple (Imported)', 'Pumpkin Leaves (Ugu)', 'Spinach (Efo riro)', 'Bitter Leaf', 'Waterleaf', 'Okra', 'Garden Egg', 'Tomato', 'Fluted Pumpkin (Ugu)', 'Cocoyam Leaves', 'Scent Leaf', 'Onion', 'Cabbage', 'Carrot', 'Sweet Potato - Doya', 'Carrots - Karoti', 'Onions - Alubosa', 'Cucumbers - Gambari', 'Red Bell Peppers - Tatase', 'Yellow Bell Peppers', 'Green Bell Peppers', 'Red Habanero Peppers - Ata rodo', 'Yellow Habanero Peppers', 'Green Habanero Peppers', 'Orange Habanero Peppers', 'Broccoli', 'Cabbage - Ewedu Oyibo', 'Okra - lla', 'Beetroots - Atta Dudu'],  
        required: true,
    },  
    supplyfrequency: {  
        type: String,  
        required: true,  

        enum: ['Twice a week', 'Once a month', 'Others'], // Define the options  

     

    },  
    customSupplyfrequency: {  
        type: String,  
        validate: {  

            // Custom validation: allow non-empty only if 'Others' is selected  
            validator: function(v) {  
                return this.supplyfrequency !== 'Others' || (v && v.length > 0);  
            },  
            message: 'Custom supply frequency is required when "Others" is selected!'  
                }   
            },   

            
        

    distributionchannels: {  
        type: String,  
        enum: ['Local market', 'Wholesalers', 'Direct sales'],  
        required: true, 
    },  
      
    additionalofferings: {  
        type: String,  
        enum: ['Organic Certification', 'Farm tours or Educational program', 'Direct-to-Consumer sales', 'Value Added Products', 'Packaging Services', 'Pesticide-Free Produce'],  
        required: true, 
    },  
    referralsource: {  
        type: String,  
        required: [true, 'How did you hear about Konectar?'],  
        enum: ['Linkedin', 'Facebook', 'Instagram', 'Friends'],  
    },  
    mainchallenges: {  
        type: String,  
        required: true,
    },  
    receiveupdates: {  
        type: Boolean,  
        default: false  // Default value is false  
    }  
}, { timestamps: true });  

// Create Mongoose models  
const Waitlist = mongoose.model("Waitlist", waitlistSchema);  

// Export the models for use in other parts of the application  
module.exports = { Waitlist };