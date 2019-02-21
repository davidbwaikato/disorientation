import { Monogo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const HP = new Mongo.Collection("hotpoints");

if (Meteor.isServer) {
    //code runs on server only
    Meteor.publish("hotpoints", function tasksPublication() {
        return HP.find({

        });
    });
}

Meteor.methods({
    "hotpoints.insert"(data, latLng) {
        HP.insert({ createdAt: new Date(), lat: latLng.curValue.lat, lng: latLng.curValue.lng, src: 'json.geoiplookup/api', ip: data.ip, host: data.hostname, stordat: data.district + ", " + data.country_code });
    },
    "hotpoints.insertv2"(data, latLng) {
        var accuracy = 5;
        var itm = HP.findOne({ lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy) });
        if (itm == undefined) {
            HP.insert({ updated: new Date(), lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy), value: 1 });
        }
        else {
            HP.update(itm._id, {
                updated: new Date(), lat: latLng.curValue.lat.toFixed(accuracy), lng: latLng.curValue.lng.toFixed(accuracy), value: itm.value += 1
            });
        }

    }
})
