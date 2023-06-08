const { ApolloServer, gql } = require('apollo-server');
 const typeDefs = gql`
type Product{
    userID:String
    productName:String
    productID:String
    productPrice : String
 }
type Query{
    getAllProducts:[Product]
}

type updateProduct{
    modifiedCount:Int
    matchedCount:Int
    message:String
}
type deleteProduct{
    deletedCount:Int
    message :String
}
type Auth{
email:String
password:String
token: String
}
type Mutation{
    createProduct(userID:String, productID:String, productName:String):Product

    checkAuthentication(email:String, password:String):Auth
    
    updateProduct(userID:String,productName:String,productID:String):updateProduct

    deleteProduct(productID : String):deleteProduct
}
`;
module.exports = typeDefs