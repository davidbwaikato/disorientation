import { Meteor } from 'meteor/meteor';
import { Monogo } from "meteor/mongo";
import { check } from "meteor/check";

export const Users = new Mongo.Collection("users");

if (Meteor.isServer) {
    //code runs on server only
    Meteor.publish("users", function() {
        return Users.find({

        });
    });
}

Meteor.methods({
    "users.update"(userId, text) {
        //     check(userId,String);
        // check(text,String);

        Meteor.users.update(userId, { $set: { image: text } });
    },
    "users.fetch"(userId) {

        //check(userId, String);

        return Meteor.users.findOne(userId);
    },
    "users.login"(userId, password) {
        if (userId == undefined || password == undefined || userId == null || password == null)
        return undefined;
        var itm = Users.findOne({ userId: userId });
        console.log(itm);
        if (itm == undefined) {
            //Create new user
            Users.insert({ userId: userId, password: password });
            return Users.findOne({ userId: userId });
        }
        else {
            if (itm.password == password)
                return itm;
            else {
                return null;
            }
        }
    }
});