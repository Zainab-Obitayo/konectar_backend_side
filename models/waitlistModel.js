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
        enum: ['mango', 'pawpaw', 'pineapple', 'orange', 'banana', 'plantain','avocado', 'cashew','guava', 'coconut', 'soursop', 'tangerine', 'strawberries', 'blueberries','blackberries', 'raspberries', 'watermelon', 'african star apple ', 'apple ', 'pumpkin leaves ', 'spinach ', 'bitter leaf', 'waterleaf', 'okra', 'garden Egg', 'tomato', 'fluted pumpkin ','cocoyam leaves', 'scent leaf', 'onion', 'cabbage', 'carrot', 'sweet potato ', 'carrots ', 'onions ', 'cucumbers ', 'red bell peppers', 'yellow bell peppers', 'green bell peppers', 'red habanero peppers', 'yellow habanero peppers', 'green habanero peppers', 'orange habanero peppers', 'broccoli', 'cabbage ','okra ', 'beetroots '],  
        required: [true, 'What type of fruits and vegetables do you grow on your farm?'],
    }, 
    supplyfrequency: {  
        type: String,  
        required: true,  
        enum: ['twice a week', 'once a month', 'others'], // Define the options  
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
        type: String,  
        enum: ['organic certification', 'farm tours or educational program','direct-to-consumer sales', 'value added products', 'packaging services', 'pesticide-free produce'],  
        required: [true, 'Do you offer any additional services or products related to your farm?']  
    },  
    referralsource: {  
        type: String,  
        required: [true, 'How did you hear about Konectar?'],  
        enum: ['linkedin', 'facebook', 'instagram ', 'friends'],  
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