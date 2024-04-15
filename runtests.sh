#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# Test GET all businesses
status 'GET all businesses should return success'
curl -X GET http://localhost:3000/businesses

# Test GET business by ID
status 'GET business-by-id should return success'
curl -X GET http://localhost:3000/businesses/1

status 'GET business-by-id should return failure'
curl -X GET http://localhost:3000/businesses/9999

# Test GET reviews for a business
status 'GET reviews for a business should return success'
curl -X GET http://localhost:3000/businesses/reviews/1

status 'GET reviews for a business should return failure'
curl -X GET http://localhost:3000/businesses/reviews/9999

# Test GET photos for a business
status 'GET photos for a business should return success'
curl -X GET http://localhost:3000/businesses/photos/1

status 'GET photos for a business should return failure'
curl -X GET http://localhost:3000/businesses/photos/9999

# Test POST a new business
status 'POST a new business should return success'
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "New Business",
  "address": "123 New St",
  "city": "Newtown",
  "state": "CA",
  "zipCode": "12345",
  "phoneNumber": "111-222-3333",
  "category": "New Category",
  "subcategories": ["New Subcategory"],
  "website": "https://newbusiness.com",
  "email": "info@newbusiness.com",
  "reviews": ["5 stars"],
  "photos": []
}' http://localhost:3000/businesses

status 'POST a new business should return failure'
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Incomplete Business"
}' http://localhost:3000/businesses

# Test DELETE a business
status 'DELETE a business should return success'
curl -X DELETE http://localhost:3000/businesses/1

status 'DELETE a business should return failure'
curl -X DELETE http://localhost:3000/businesses/9999