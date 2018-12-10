import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

/*export const Users = new Mongo.Collection("users");

if (Meteor.isServer) {
    //code runs on server only
    Meteor.publish("users", function tasksPublication() {
        return Users.find()
    });
}*/

Meteor.methods({
    "users.update"(userId, text) {
        check(userId,String);
    check(text,String);

       Meteor.users.update(userId, { $set: { image: text } });
    },
     "users.fetch"(userId) {
       
    check(userId,String);

       return Meteor.users.findOne(userId);
    }
});