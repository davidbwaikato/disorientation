import { Monogo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const HP = new Mongo.Collection("hotpoints"); //Creates Mongodb collection

if (Meteor.isServer) {
    //code runs on server only
    
    Meteor.publish("hotpoints", function tasksPublication() {
        return HP.find({

        });
    });
}

Meteor.methods({
    //Global Method for Inserting data, not compatible with heatmap.js
    //Cords are stored individually, such that each location insertion recieves its own document.
    "hotpoints.insert"(data, latLng) {
        HP.insert({ createdAt: new Date(), lat: latLng.curValue.lat, lng: latLng.curValue.lng, src: 'json.geoiplookup/api', ip: data.ip, host: data.hostname, stordat: data.district + ", " + data.country_code });
    },
    //Global Method for inserting data into mongo collection, compatible with heatmap.js
    //Suggestions: make accuracy adjustable?
    //Coords are stored as a value in a grid system, grid is determined by accuracy such that a figure of 6 is ~10m^2, see lat/long accuarcy info online
    //
    //     ----------------***** <- Tile
    //     | 5 | 2 | 1 | 0 * 0<*--- Value 
    //     ----------------*****
    //     | 3 | 1 | 0 | 0 | 1 |
    //     *-------------------- etc...
    //     ^- Top Left Cnr (this would be for tile below, not shown), rounded point determining which tile value is added to

    "hotpoints.insertv2"(data, latLng) {
        var accuracy = 5;
        var itm = HP.findOne({ lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy) });
        if (itm == undefined) { //No tile that exists for coords
            HP.insert({ updated: new Date(), lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy), value: 1 });
        }
        else {  //Tile exists, increment value
            HP.update(itm._id, {
                updated: new Date(), lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy), value: itm.value += 1
            });
        }

    }
})
