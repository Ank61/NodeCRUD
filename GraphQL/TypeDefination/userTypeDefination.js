const {ApolloServer,gql} = require('apollo-server')
const typeDefsForUsers = gql `
type User{
    userID :String
    userName :String
    gender:String
    email:String
    phone:String
}

type All {
    getAllUsers : [User]
}

`;
module.export = typeDefsForUsers