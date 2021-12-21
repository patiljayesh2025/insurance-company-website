 module.exports = (sequelize, Sequelize) => {

     const credentials = sequelize.define("credentials", {

         User_ID: {
             primaryKey: true,
             type: Sequelize.INTEGER
         },
         Password: Sequelize.STRING,
         Role: Sequelize.STRING,




     }, { timestamps: false, freezeTableName: true });


     return credentials;

 };