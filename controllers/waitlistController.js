/// Import necessary modules and models  
const { Waitlist } = require("../models/waitlistModel");  
const ErrorResponse = require('../utils/ErrorResponse'); // Import error response  

// Post a new entry to the waitlist page  
const farmerWaitlist = async (req, res, next) => {  
    console.log("Logging body", req.body);  
    
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
            customSupplyfrequency,  
            distributionchannels,  
            additionalofferings,   
            referralsource,   
            mainchallenges,     
            receiveupdates,  
            action // Include action here to check for user existence  
        } = req.body;  

        // Check required fields  
        if (!username || !farmname || !farmlocation || !contactinformation || !farmsize ||   
            !typeofproduce || !supplyfrequency || !distributionchannels ||   
            !additionalofferings || !referralsource || !mainchallenges) {  
            return next(new ErrorResponse("Missing required fields", 400));  
        }  

        // Validate contact information  
        const { emailcontact, phoneno, type } = contactinformation;  
        if (type === 'phone' && !phoneno) {  
            return next(new ErrorResponse("Phone number is required when the contact method is phone.", 400));  
        }  

        if (type === 'email' && !emailcontact) {  
            return next(new ErrorResponse("Email contact is required when the contact method is email.", 400));  
        }  
        
        // Validate custom supply frequency if 'others' is selected  
        if (supplyfrequency === 'others' && (!customSupplyfrequency || customSupplyfrequency.trim().length === 0)) {  
            return next(new ErrorResponse("Custom supply frequency is required when 'others' is selected.", 400));  
        }  

        // Check if user exists  
        const userExists = await Waitlist.findOne({   
            $or: [  
                { username },   
                { "contactinformation.email": emailcontact }  
            ]   
        });  

        if (userExists) {  
            return res.status(400).json({error:"A user with this username or email already exists!"});  
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
            customSupplyfrequency: supplyfrequency === 'others' ? customSupplyfrequency : undefined,   
            distributionchannels,  
            additionalofferings,   
            referralsource,   
            mainchallenges,     
            receiveupdates   
        });  

        // Save the new user  
        await newFarmerWaitlist.save();  

        // Respond with a success message  
        res.status(201).json({  
            message: "Thank you for joining the Konectar Waitlist"  
        });  

    } catch (error) {  
        console.error("Error registering new user:", error);  
        res.status(500).json({error:'Internal Server Error'});
    }
};  

module.exports = {  
    farmerWaitlist,   
};