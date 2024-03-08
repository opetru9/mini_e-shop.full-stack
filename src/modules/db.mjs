import postgres from 'postgres'

let connection = null;

function dbConnect(){
    if(connection === null){
        connection = postgres({
            host:"localhost",
            port: "5434",
            database:"node_landing_db",
            username:"postgres",
            password:"qazwsx"
        })
    }
    return connection
}

export {dbConnect}