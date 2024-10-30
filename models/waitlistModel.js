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
        trim: true,  
        required: [true, 'What is the name of your farm?']  
    },  
    farmsize: {  
        type: String,   
        required: [true, 'What is the approximate size of your farm?']  
    },  
    farmlocation: {  
        type: String,   
        required: [true, 'Enter your city, state, and country']  
    },  
    contactinformation: {  
        emailcontact: {   
            type: String,   
            required: [true, 'Email contact is required'],   
            validate: {  
                validator: function(v) {  
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Email regex validation  
                },  
                message: props => `${props.value} is not a valid email contact!`  
            }   
        },  
        phoneno: {   
            type: String,  
            required: [true, 'Phone number is required'],  
            validate: {  
                validator: function(v) {  
                    // Validate phone numbers can include country code or local formats  
                    return /^(070\d{8}|(?:\+\d{1,3})?\d{10})$/.test(v);  
                },  
                message: props => `${props.value} is not a valid phone number!`  
            }  
        }  
    },   
    typeofproduce: {  
        type: [String], // This should be an array of strings  
        required: [true, 'What type of fruits and vegetables do you grow on your farm?'],  
        enum:['mango', 'pawpaw', 'pineapple', 'orange', 'banana', 'plantain','avocado', 'cashew','guava', 'coconut', 'soursop', 'tangerine', 'strawberries', 'blueberries','blackberries', 'raspberries', 'watermelon', 'african-star-apple', 'apple', 'pumpkin-leaves', 'spinach', 'bitterleaf', 'waterleaf', 'okra', 'garden-egg', 'tomato', 'fluted-pumpkin','cocoyam-leaves', 'scent-leaf', 'onion', 'cabbage', 'carrot', 'sweet-potato', 'beefsteak-tomatoes', 'roma-tomatoes', 'regular-tomatoes', 'cherry-tomatoes', 'potatoes-anamo', 'sweet-potatoes', 'carrots', 'onions', 'cucumbers', 'red-bell-peppers', 'yellow-bell-peppers', 'green-bell-peppers', 'red-habanero-peppers', 'yellow-habanero-peppers', 'green-habanero-peppers', 'orange-habanero-peppers', 'broccoli', 'cabbage', 'okra', 'beetroots']
    },   
    supplyfrequency: {  
        type: String,  
        required: true,  
        enum: ['twice-a-week', 'once-a-month', 'others'], // Define the options  
    },  
    customSupplyfrequency: {  
        type: String,  
        validate: {  
            // Custom validation: allow non-empty only if 'others' is selected  
            validator: function(v) {  
                return this.supplyfrequency !== 'others' || (v && v.length > 0);  
            },  
            message: 'Custom supply frequency is required when "others" is selected!'  
        }   
    },   
    distributionchannels: {  
        type: String,  
        enum: ['local market', 'wholesalers', 'direct sales'],  
        required: [true, 'How do you currently distribute your produce?']  
    },  
    additionalofferings: {  
        type: [String], // Now this is correctly an array of strings  
        required: [true, 'Do you offer any additional services or products related to your farm?'],  
        enum: ['organic-certification', 'farm-tours-or-educational-programs',   
               'direct-to-consumer-sales', 'value-added-products',   
               'packaging-services', 'pesticide-free-produce']  
    },  
    referralsource: {  
        type: [String], // This is now an array to support multiple sources  
        required: [true, 'How did you hear about Konectar?'],  
        enum: ['linkedin', 'facebook', 'instagram', 'friends']  
    },  
    mainchallenges: {  
        type: String,  
        required: [true, 'What are the main challenges you face in selling your produce to businesses?']  
    },  
    receiveupdates: {  
        type: Boolean,  
        default: false  
    }  
}, { timestamps: true });  

// Create Mongoose model  
const Waitlist = mongoose.model("Waitlist", waitlistSchema);  

// Export the models for use in other parts of the application  
module.exports = {  
    Waitlist  
};