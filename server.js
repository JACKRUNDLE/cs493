const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');


const businesses = require('./businessdata');


const app = express();

app.use(bodyParser.json());
app.use(multer().array());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Get a list of all businesses
app.get('/businesses', (req, res) => {

    res.status(200).json(businesses);
});

app.get('/businesses/:businessId', (req, res) => {
    const businessId = parseInt(req.params.businessId);

    const mybusiness = businesses[businessId];


    if (mybusiness) {
        res.status(200).json(mybusiness);
    } else {
        res.status(404).json({ error: 'Business not found' });
    }
});


app.get('/businesses/reviews/:businessId', (req, res) => {
    const businessId = parseInt(req.params.businessId);
    const mybusiness = businesses[businessId];
    if (mybusiness) {
        const myreviews = mybusiness.reviews;
        if (myreviews.length > 0) {
            res.status(200).json(myreviews);
        } else {
            res.status(404).json({ error: 'No Reviews' });
        }
    } else {
        res.status(404).json({ error: 'Business not found' });
    }
});


app.get('/businesses/photos/:businessId', (req, res) => {
    const businessId = parseInt(req.params.businessId);
    const mybusiness = businesses[businessId];
    if (mybusiness) {
        const myphotos = mybusiness.reviews;
        if (myphotos.length > 0) {
            res.status(200).json(myphotos);
        } else {
            res.status(404).json({ error: 'No Photos' });
        }
    } else {
        res.status(404).json({ error: 'Business not found' });
    }
});

app.post('/businesses', (req, res) => {
    const { name, address, city, state, zipCode, phoneNumber, category, subcategories, website, email, reviews, photos } = req.body;
  
    // Perform validation
    if (!name || !address || !city || !state || !zipCode || !phoneNumber || !category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    // Generate a new unique ID for the business

    const newId = businesses.length + 1;
    console.log(newId);
  
    // Create a new business object
    const newBusiness = {
      id: newId,
      name,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      category,
      subcategories: subcategories || [],
      website: website || '',
      email: email || '',
      reviews: reviews || [],
      photos: photos || []
    };
  
    res.status(201).json(newBusiness);
  });

  app.delete('/businesses/:businessId', (req, res) => {
    const businessId = parseInt(req.params.businessId);
    const oldbusiness = businesses[businessId];
    if (oldbusiness) {
        res.status(200).json({message: 'deleted business: ', deletebusienss: oldbusiness});
    } else {
        res.status(404).json({ error: 'Business not found' });
    }

  });



//GET REQUEST
/*
curl -X GET http://localhost:3000/businesses
curl -X GET http://localhost:3000/businesses/reviews/1
curl -X GET http://localhost:3000/businesses/photos/1
*/


//POST REQUEST
/*
  curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Green Thumb Nursery",
  "address": "159 Sycamore Dr",
  "city": "Gardentown",
  "state": "OR",
  "zipCode": "24680",
  "phoneNumber": "111-222-3333",
  "category": "Garden Center",
  "subcategories": ["Plants", "Gardening Tools"],
  "website": "https://greenthumbnursery.com",
  "email": "info@greenthumbnursery.com",
  "reviews": ["5 stars", "3 stars", "1 star"],
  "photos": []
}' http://localhost:3000/businesses
*/

//DELETE REQUEST
/*
curl -X DELETE http://localhost:3000/businesses/1
*/
