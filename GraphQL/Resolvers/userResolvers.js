const { ApolloServer, gql } = require('apollo-server');
const productModal = require('../../Modal/productModal')
const userModal = require('../../Modal/userModal')
const { GraphQLError } = require('graphql');
const resolversForUsers = {
    All: {
        getAllUsers: (root) => {
            return new Promise((resolve, reject) => {
                userModal.find((err, users) => {
                    if (err) reject(err);
                    else resolve(users);
                })
            })
        },
    },
    Mutation: {
        createUser: (root, args, context, info) => {
            const newproduct = userModal({
                userID: args.userID,
                productName: args.productName,
                productID: args.productID
            });

            return new Promise((resolve, reject) => {
                newproduct.save((err) => {
                    if (err) reject(err);
                    else resolve(newproduct)
                })
            })
        },
        updateUser: async (root, args, contxt, info) => {
            const update = await userModal.updateOne(
                { productID: args.productID },
                {
                    $set: {
                        userID: args.userID,
                        productName: args.productName
                    }
                }).catch(err => console.log(err))

            const checkUpdate = update

            if (checkUpdate.modifiedCount < 1 && checkUpdate.matchedCount > 1) {
                const obj = { ...checkUpdate, message: "Cound not Update, item already present!" }
                return obj
            }
            else if (checkUpdate.matchedCount < 1) {
                const obj = { ...checkUpdate, message: "Cound not Update, productID could not be found" }
                return obj
            }
            else if (checkUpdate.modifiedCount > 0 && checkUpdate.matchedCount > 0) {
                const obj = { ...checkUpdate, message: "Update Successfull" }
                return obj
            }
            else {
                const obj = { ...checkUpdate, message: "Update failed" }
                return obj
            }
        },

        deleteUser: async (root, args, context, info) => {
            const deletePro = await userModal.deleteOne({
                productID: args.productID
            }).catch(err => console.log(err))
            const Delete = deletePro
            if (Delete.deletedCount > 0) {
                const obj = { ...Delete, message: "Deleted Successfully" }
                return obj
            }                     
            const error = new Error("Deleted Failed")
            error.code = "404"
            throw error;

        }
    }
}
module.exports = resolversForUsers