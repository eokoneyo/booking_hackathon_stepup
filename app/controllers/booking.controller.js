const request = require('request');

// module.exports = (req, res) => {

//     return request( "https://booking_hackathon_nigeria:b00k_H4ck_Nigeria_GHAL@distribution-xml.booking.com/2.0/json/hotels?country_ids=ng&extras=hotel_info&rows=3", function( err, req, res ) {
        
//         let data = JSON.parse(res)

//         console.log(data)

//         return data;
        
//      })

// }

module.exports = {
    x
}

function x(req, response){
    request( "https://booking_hackathon_nigeria:b00k_H4ck_Nigeria_GHAL@distribution-xml.booking.com/2.0/json/hotels?country_ids=ng&extras=hotel_info&rows=3", function( err, req, res ) {
        
        let data = JSON.parse(res)

        //console.log(data)

        response.json(data.result)
        return data;
        
     })
}

