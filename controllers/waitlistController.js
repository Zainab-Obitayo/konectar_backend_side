// Import necessary modules and models  
const { Waitlist } = require("../models/waitlistModel");  
const ErrorResponse = require('../utils/ErrorResponse'); // Import error response  

// Post a new entry to the waitlist page  
const farmerWaitlist = async (req, res, next) => {  
    console.log("Logging body", req.body)
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

         // Extract emailcontact and phoneno from contactinformation  
         const { emailcontact, phoneno } = contactinformation;  

        // Check if the necessary fields are present  
        if (!username || !farmname || !farmlocation ||   
            !contactinformation || !farmsize || !typeofproduce ||   
            !supplyfrequency || !distributionchannels ||   
            !additionalofferings || !referralsource || !mainchallenges) {  
            throw new ErrorResponse("Missing required fields", 400);  
        }  

       // Check contact information validity  
        if (contactinformation.type === 'phone' && !contactinformation.phoneno) {  
    throw new ErrorResponse("Phone number is required when the contact method is phone.", 400);  
        }  

        if (contactinformation.type === 'email' && !contactinformation.emailcontact) {  
    throw new ErrorResponse("Email contact is required when the contact method is email.", 400);  
        }
        
        // Validate custom supply frequency if 'others' is selected  
        if (supplyfrequency === 'others' && (!customSupplyfrequency || customSupplyfrequency.trim().length === 0)) {  
            throw new ErrorResponse("Custom supply frequency is required when 'others' is selected.", 400);  
        }  

       // Assume username and emailcontact are variables that hold the input values  

      // Check if a user already exists with the provided username or email  
      const userExist = await Waitlist.findOne({   
        $or: [  
             { username: username },   
             { "contactinformation.emailcontact": emailcontact }  
             ] 
            });  
            if (userExist) {  
                 throw new ErrorResponse("A user with this username or email already exists!", 400); 
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
            customSupplyfrequency: supplyfrequency === 'others' ? customSupplyfrequency : undefined, // Assign only if applicable  
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
        console.error("Error registering new user:", error);  // Log complete error  
        
        if (error.name === "ValidationError") {  
            const validationErrors = Object.values(error.errors).map(err => err.message);  
            return next(new ErrorResponse(`Validation Errors: ${validationErrors.join(", ")}`, 400));  
        }  
    
        if (error.code === 11000) {  
            return next(new ErrorResponse("A user with this farm name already exists.", 400));  
        }

    
        next(new ErrorResponse(`Unexpected Error: ${error.message}`, 500));  // Provide a fallback error  
    }
};  

module.exports = {  
    farmerWaitlist,   
};