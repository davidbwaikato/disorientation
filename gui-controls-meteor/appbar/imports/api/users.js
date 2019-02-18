import { Meteor } from 'meteor/meteor';
import { Monogo } from "meteor/mongo";

export const Users = new Mongo.Collection("users");

///////////////////////////////////////////////////////
// THIS CODE DOESN'T SEEM TO WORK...                 //
//                                                   //
// Hi, This code seems to not work                   //
// While pushing to users works without an issue, it //
// doesn't appear to be possible to fetch users      //
// might be a similar issue to the issue noted       //      
// at the end of Heatmap.js.                         //
//                                                   //
///////////////////////////////////////////////////////

if (Meteor.isServer) {
    //code runs on server only
    Meteor.publish("users", function() {
        return Users.find({

        });
    });
}

Meteor.methods({
    "users.update"(userId, text) {
        Meteor.users.update(userId, { $set: { image: text } });
    },
    "users.fetch"(userId) {
        return Meteor.users.findOne(userId);
    },
    //Basic Login system
    //Checks if user ID exists in database
    //If not: Create ID with provided password
    //If yes: Check provided password against stored password
    //And it's all on plain text :)
    //This was intended to test user based settings such as tracking with minimal UI change, but was never fully implmented
    //Suggestion: Utilize google signin api
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
            //Verify existing user
            if (itm.password == password)
                return itm;
            else {
                return null;
            }
        }
    }
});