import {Monogo} from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const HP = new Mongo.Collection("hotpoints");

if (Meteor.isServer) {
    //code runs on server only
    Meteor.publish("hotpoints", function tasksPublication() {
        return Tasks.find({
           
        });
    });
}

Meteor.methods({
    "hotpoints.insert"(data, latLng){
        HP.insert({createdAt: new Date(), lat: latLng.curValue.lat, lng: latLng.curValue.lng, src: 'json.geoiplookup/api', ip: data.ip, host: data.hostname, stordat: data.district + ", " + data.country_code });
    }
})
