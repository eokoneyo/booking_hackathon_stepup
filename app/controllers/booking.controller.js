const request = require('request');

module.exports = (req, res) => {

    request( "https://booking_hackathon_nigeria:b00k_H4ck_Nigeria_GHAL@distribution-xml.booking.com/2.0/json/hotels?country_ids=ng&extras=hotel_info", function( err, req, res ) {
        
        var data = JSON.parse(res)
    
        console.log(data)
        
     })

}

