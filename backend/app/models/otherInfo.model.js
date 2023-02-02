module.exports = (sequelize, Sequelize) => {
    const OtherInfo = sequelize.define("OtherInfo", {
        info_type:  {
            type: Sequelize.STRING,
            allowNull: false
        },
        info_content:  {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return OtherInfo;
}