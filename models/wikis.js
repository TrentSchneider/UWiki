// Creating our wikis model
module.exports = function(sequelize, DataTypes) {
 var Wikis = sequelize.define("Wiki", {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: {
              args: 35,
              msg: "Maximum 35 characters allowed in category"
          },
          min: {
              args: 4,
              msg: "Minimum 4 characters required in category"
          }
        }
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          max: {
              args: 100,
              msg: "Maximum 100 characters allowed in title"
          },
          min: {
              args: 4,
              msg: "Minimum 4 characters required in title"
          }
        }
    },
    description: {
        type: DataTypes.STRING,
        validate: {
          max: {
              args: 255,
              msg: "Maximum 255 characters allowed in description"
          },
          min: {
              args: 4,
              msg: "Minimum 4 characters required in description"
          }
        }
    },
    userID: {
        type: DataTypes.STRING,
        defaultValue: "UserId"
    }
 });
return Wikis;
};