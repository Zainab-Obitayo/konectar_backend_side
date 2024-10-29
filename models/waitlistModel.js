const mongoose = require("mongoose");  

// Define the schema for the waitlist  
const waitlistSchema = new mongoose.Schema({  
    username: {  
        type: String,  
        unique: true,  
        required: [true, 'What is your user name?'],  
        trim: true  
    },  
    farmname: {  
        type: String,  
        unique: true,  
        trim: true,  
        required: [true, 'What is the name of your farm?']  
    },  
    
    farmlocation: {  
        type: String, 
        required: [true, 'Enter your city,state and country']  
    },  
    
    contactinformation: {  
        type:{
             emailcontact: { type: String },  
             phoneno: {   
                 type: String,  
                 validate: {  
                     validator: function(v) {  
                    // Validates phone numbers in format (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX  
                    return /^(1[-\s]?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}|\d{10})$/.test(v);  
                    },  
                     message: props => `${props.value} is not a valid phone number!`  
            }  
        } 
    }, 
    required: [true, 'What is the best way to reach you?']  
    },   
    
    farmsize: {  
        type: String,   
        required: [true, 'What is the approximate size of your farm?']  
    },  
    typeofproduce: {  
        type: String,  
        enum: ['Mango', 'Pawpaw', 'Pineapple', 'Orange', 'Banana', 'Plantain','Avocado', 'Cashew','Guava', 'Coconut', 'Soursop', 'Tangerine', 'Strawberries', 'Blueberries','Blackberries', 'Raspberries', 'Watermelon', 'African Star Apple (Agbalumo/Udara)', 'Apple (Imported)', 'Pumpkin Leaves (Ugu)', 'Spinach (Efo riro)', 'Bitter Leaf', 'Waterleaf', 'okra', 'Garden Egg', 'Tomato', 'Fluted Pumpkin (Ugu)','Cocoyam Leaves', 'Scent Leaf', 'Onion', 'Cabbage', 'Carrot', 'Sweet Potato - Doya', 'Carrots - Karoti', 'Onions - Alubosa', 'Cucumbers - Gambari', 'Red Bell Peppers - Tatase', 'Yellow Bell Peppers', 'Green Bell Peppers', 'Red Habanero Peppers - Ata rodo', 'Yellow Habanero Peppers', 'Green Habanero Peppers', 'Orange Habanero Peppers', 'Broccoli', 'Cabbage - Ewedu Oyibo','Okra - lla', 'Beetroots - Atta Dudu'],  
        required: [true, 'What type of fruits and vegetables do you grow on your farm?'],
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
        required: [true, 'How do you currently distribute your produce?']  
    },  
      
    additionalofferings: {  
        type: String,  
        enum: ['Organic Certification', 'Farm tours or Educational program','Direct-to-Consumer sales', 'Value Added Products', 'Packaging Services', 'Pesticide-Free Produce'],  
        required: [true, 'Do you offer any additional services or products related to your farm?']  
    },  
    referralsource: {  
        type: String,  
        required: [true, 'How did you hear about Konectar?'],  
        enum: ['Linkedin', 'Facebook', 'Instagram ', 'Friends'],  
    },  
    mainchallenges: {  
        type: String,  
        required: [true, 'What are the main challenges you face in selling your produce to businesses?']  
    },
    receiveupdates: {  
        type: Boolean,  
        default: false  // Updated the default format  
    }  
}, {timestamps: true});  

// Create Mongoose models  
const Waitlist = mongoose.model("Waitlist", waitlistSchema);  

// Export the models for use in other parts of the application  
module.exports = {  
    Waitlist  
};