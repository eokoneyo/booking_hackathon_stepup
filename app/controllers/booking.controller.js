const request = require('request');

module.exports = {
    getHotels,
    getHotelReviews,
}

function getHotels(req, response){
    request( "https://booking_hackathon_nigeria:b00k_H4ck_Nigeria_GHAL@distribution-xml.booking.com/2.0/json/hotels?country_ids=ng&extras=hotel_info&rows=3", ( err, req, res ) => {
        
        let data = JSON.parse(res)

        //console.log(data)

        response.json(data.result)
        return data;
        
     })
}

function getHotelReviews(req, response){
    request( "https://booking_hackathon_nigeria:b00k_H4ck_Nigeria_GHAL@distribution-xml.booking.com/2.0/json/reviewScores?hotel_ids=732641", function( err, req, res ) {
        
        let data = JSON.parse(res)

        //console.log(data)

        response.json(data.result)
        return data;
        
     })
}

