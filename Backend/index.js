import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/authMiddleware.js"; //  Import middleware

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const users = [{ username: "admin", password: "password123" }]; // Dummy User Data

// Login API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received Login Request:", { username, password });
    console.log("Current Users List:", users);

    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("User not found:", username);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
        console.log("Invalid Credentials:", username, password);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Login Successful, Token Generated:", token);
    res.json({ token });
});


// Dashboard API
app.get("/api/dashboard", async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log("Received Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "User not logged in" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Verified! User:", decoded);

       
        const dashboardData = [
            { 
                id: 1, 
                name: "Aadhaar Card", 
                imageUrl: "https://pvcadharcard.in/wp-content/uploads/2023/07/adhar-1.png", 
                Issued_by: "Unique Identification Authority of India (UIDAI)",
                Purpose: "Identification and authentication (includes biometric details)",
                Key_Features: "Aadhaar number, Name, Date of Birth, Address, Photograph, Fingerprints, Iris scan",
               
            },
            
            { 
                id: 2, 
                name: "Voter ID Card", 
                imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/7/326236311/DG/UC/NY/147613454/613b4fe5118d68e33daead1f-5f9ce9d6b395d08d26991e6e-voter-id-2x-min.jpg", 
                Issued_by: "Election Commission of India",
                Purpose: "To vote in Indian elections",
                Key_Features: "Voter ID number, Name, Photo, Address, Date of Birth, Electoral Constituency",
              
            },
            
            { 
                id: 3, 
                name: "Pan Card", 
                imageUrl: "https://vakilsearch.com/blog/wp-content/uploads/2023/09/pan-card-details.webp", 
                Issued_by: "Income Tax Department",
                Purpose: "Taxpayer identification, used for financial transactions",
                Key_Features: "Permanent Account Number (PAN), Name, Photograph, Date of Birth, Signature",
               
            },
            
            { 
                id: 4, 
                name: "Driving License", 
                imageUrl: "https://www.informalnewz.com/wp-content/uploads/2023/10/Driving-License-3.jpg", 
                Issued_by: "Regional Transport Office (RTO)",
                Purpose: "Legal permission to drive in India",
                Key_Features: "License number, Name, Address, Photograph, Date of Birth, Vehicle Classes Allowed",
               
            },
            
            { 
                id: 5, 
                name: "Passport", 
                imageUrl: "https://www.reliancegeneral.co.in/siteassets/rgiclassets/images/blogs-images/documents-required-to-apply-for-indian-passport-in-2024-2.webp", 
                Issued_by: "Ministry of External Affairs",
                Purpose: "LInternational travel, identification",
                Key_Features: "Passport number, Name, Photograph, Date of Birth, Nationality, Issue Date, Expiry Date",
                
            },
            { 
                id: 6, 
                name: "Ration Card", 
                imageUrl: "https://cdnbbsr.s3waas.gov.in/s3db9eeb7e678863649bce209842e0d164/uploads/2024/07/20240703415410335.jpg", 
                Issued_by: "State Government",
                Purpose: "Food security and subsidized food distribution",
                Key_Features: "Ration card number, Name, Address, Family Details, Type of Ration Card (Antyodaya, Priority)",
                
            },
            

            { 
                id: 7, 
                name: "National Identity Card", 
                imageUrl: "https://www.identity-cards.net/sites/default/files/MNIC_prototype.jpg", 
                Issued_by: "Some states in India (under proposed system)",
                Purpose: "A general identity card for residents",
                Key_Features: "Similar to Aadhaar, including photo and personal details",
              
            },
            
            { 
                id: 8, 
                name: "Health Insurance ID Card", 
                imageUrl: "https://wordpresscmsprodstor.blob.core.windows.net/wp-cms/2022/03/2-1.webp", 
                Issued_by: "Health Insurance Providers",
                Purpose: "Identification for medical insurance purposes",
                Key_Features: "Insurance number, Name, Photograph, Policy details",
                
            },
            

            { 
                id: 9, 
                name: "STUDENT ID", 
                imageUrl: "https://etstatic.tnn.in/thumb/msid-118580277,width-450,height-254,resizemode-75/118580277.jpg", // Replace with an actual image URL
                Issued_by: "Educational Institutions (Schools, Colleges, Universities)",    
              
            },
           
        ];

        res.json(dashboardData);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        console.error("Error verifying token:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
});

// Map View API
app.get("/api/map", verifyToken, (req, res) => {

    res.json({ center: [20.5937, 78.9629], zoom: 5 }); // India Coordinates
});

app.get("/api/map/:cardId", verifyToken, (req, res) => {

    const { cardId } = req.params;

    const dashboardData = [
        { 
          id: 1, 
          name: "Aadhaar Card", 
          latitude: 17.4258,
          longitude: 78.4485,
          address: "Road No 7, Vimal Nagar, Banjara Hills, Hyderabad",
        },
        { 
          id: 2, 
          name: "Voter ID Card", 
          latitude: 17.4391,
          longitude: 78.4985,
          address: "Sai Baba Temple, Secunderabad, Hyderabad",
        },
        { 
          id: 3, 
          name: "Pan Card", 
          latitude: 19.0760,
          longitude: 72.8777,
          address: "Mumbai Central, Mumbai, Maharashtra",
        },
        { 
            id: 4, 
            name: "Driving License", 
            latitude: 28.704060,
            longitude: 77.102493,
            address: "Vikas Sadan, INA Market, New Delhi, Delhi"
        },
        
        { 
            id: 5, 
            name: "Passport", 
            latitude: 12.9716,
            longitude: 77.5946,
            address: "Passport Seva Kendra, Bangalore",
        },
        { 
            id: 6, 
            name: "Ration Card", 
            latitude: 17.385044,
            longitude: 78.486671,
            address: "Ameerpet, Hyderabad",
        },
        

        { 
            id: 7, 
            name: "National Identity Card", 
            latitude: 22.5726,
            longitude: 88.3639,
            address: "Park Street, Kolkata",
        },
        
        { 
            id: 8, 
            name: "Health Insurance ID Card", 
            latitude: 12.9716,
            longitude: 77.5946,
            address: "MG Road, Bangalore, Karnataka",
        },
        

        { 
            id: 9, 
            name: "STUDENT ID", 
            imageUrl: "https://etstatic.tnn.in/thumb/msid-118580277,width-450,height-254,resizemode-75/118580277.jpg", // Replace with an actual image URL
            Issued_by: "Educational Institutions (Schools, Colleges, Universities)",    
            latitude: 12.9716,
            longitude: 77.5946,
            address: "MG Road, Bangalore, Karnataka",
        },
       
      ];
    
      // Find the specific card data based on the cardId parameter
      const cardData = dashboardData.find((data) => data.id === parseInt(cardId));
    
      if (!cardData) {
        return res.status(404).json({ message: "Card not found" });
      }
    
      // Return the card data with map center and zoom level
      res.json({
        center: [cardData.latitude, cardData.longitude],
        zoom: 12,  // Adjust zoom level as per your requirement
        name: cardData.name,
        address: cardData.address,
      });
    });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
