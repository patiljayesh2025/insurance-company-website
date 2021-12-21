module.exports = (sequelize, Sequelize) => {

    const policy = sequelize.define("policy", {

        PolicyNumber: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Name: Sequelize.STRING,
        Amount: Sequelize.INTEGER,
        MaturityAmount: Sequelize.INTEGER,
        Nominee: Sequelize.STRING



    }, { timestamps: false, freezeTableName: true });


    return policy;

};