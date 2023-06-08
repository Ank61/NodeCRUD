const { ApolloServer, gql } = require('apollo-server');
const productModal = require('../../Modal/productModal')
const authenticationUser = require('../../Modal/authenticate')
const { GraphQLError } = require('graphql');
const jwt = require("jsonwebtoken")
const yup = require("yup");
const bcrypt=require('bcryptjs')
// const userSchema = yup.array().of(
//     yup.object({
//         userID: yup.string().required().min(8),
//         productID: yup.string().required(),
//         productName: yup.string().required(),
//         productPrice: yup.string().required()
//     })
// );

const resolvers = {
    Query: {
        getAllProducts: async (_, { id }, { dataSources }) => {
            const user = await new Promise((resolve, reject) => {
                productModal.find((err, users) => {
                    if (err) reject(err);
                    else {
                        resolve(users);
                    }
                })
            })
            const isValid = await userSchema.isValid(user);
            if (!isValid) {
                console.log("Invalid")
                throw new Error("Invalid user data");
            }
            else {
                return user;
            }
        },
    },
    Mutation: {
        createProduct: (root, args, context, info) => {
            const newproduct = productModal({
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
        updateProduct: async (root, args, contxt, info) => {
            const update = await productModal.updateOne(
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

        deleteProduct: async (root, args, context, info) => {
            const deletePro = await productModal.deleteOne({
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

        },
        checkAuthentication: async(root,args,cntext,info)=>{
            console.log(args)
            const check = await authenticationUser.findOne({email : args.email, password : args.password}).catch(err=>console.log(err))
            if(check){ 
                const token = jwt.sign({email : args.email},"123")
                let obj = {}
                obj.token = token
                return obj
            }
            throw new Error("Invalid Credentials")
        
        }
    }
}
module.exports = resolvers