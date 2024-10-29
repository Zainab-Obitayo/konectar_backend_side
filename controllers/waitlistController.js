// Import necessary modules and models  
const { Waitlist } = require("../models/waitlistModel");  
const ErrorResponse = require('../utils/ErrorResponse'); // Import error response  

// Post a new entry to the waitlist page  
const farmerWaitlist = async (req, res, next) => {  
    try {  
        // Destructure the request body  
        const {   
            username,   
            farmname,   
            farmlocation,  
            contactinformation,    
            farmsize,  
            typeofproduce,     
            supplyfrequency,   
            customSupplyfrequency, // Include customSupplyfrequency  
            distributionchannels,  
            additionalofferings,   
            referralsource,   
            mainchallenges,     
            receiveupdates  
        } = req.body;  

        // Check if the necessary fields are present  
        if (!username || !farmname || !farmlocation ||   
            !contactinformation || !farmsize || !typeofproduce ||   
            !supplyfrequency || !distributionchannels ||   
            !additionalofferings || !referralsource || !mainchallenges) {  
            throw new ErrorResponse("Missing required fields", 400);  
        }  

        // Check contact information validity  
        if (contactinformation.type === 'phone number' && !contactinformation.phoneno) {  
            throw new ErrorResponse("Phone number is required when the contact method is phone number.", 400);  
        }  
        
        // Validate custom supply frequency if 'Others' is selected  
        if (supplyfrequency === 'Others' && (!customSupplyfrequency || customSupplyfrequency.trim().length === 0)) {  
            throw new ErrorResponse("Custom supply frequency is required when 'Others' is selected.", 400);  
        }  

        // Check if the user already exists  
        const userExist = await Waitlist.findOne({ farmname });  
        if (userExist) {  
            throw new ErrorResponse("A farm with this name already exists!", 400);  
        }  

        // Create new farmer object  
        const newFarmerWaitlist = new Waitlist({  
            username,   
            farmname,   
            farmlocation,  
            contactinformation,    
            farmsize,  
            typeofproduce,     
            supplyfrequency,   
            customSupplyfrequency: supplyfrequency === 'Others' ? customSupplyfrequency : undefined, // Assign only if applicable  
            distributionchannels,  
            additionalofferings,   
            referralsource,   
            mainchallenges,     
            receiveupdates   
        });  

        // Save new user, farm, and produce  
        await newFarmerWaitlist.save();  

        // Respond with a success message  
        res.status(201).json({  
            message: "Thank you for joining the waitlist",  
            redirectLink: process.env.COMMUNITY_LINK  
        });  

    } catch (error) {  
        console.error("Error registering new user:", error.message);  

        // Handle validation errors from Mongoose  
        if (error.name === "ValidationError") {  
            // Return all validation errors  
            const validationErrors = Object.values(error.errors).map(err => err.message);  
            return next(new ErrorResponse(validationErrors.join(", "), 400));  
        }  

        // Handle other specific errors, e.g. duplicate keys  
        if (error.code === 11000) { // MongoDB duplicate key error code  
            return next(new ErrorResponse("A user with this farm name already exists.", 400));  
        }  

        // Let the global error handler handle other errors  
        next(error);  
    }  
};  

module.exports = {  
    farmerWaitlist,   
};