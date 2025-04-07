/**
 * Modulo de conexão com o banco de dados
 * Uso do Framework mongoose
 */

// importação do mogoose
const mongoose = require('mongoose')

//Configuração do acesso de banco de dados
// ip/link - autenticação
// Obs: Atlas (Obter via compass) 
// para criar um banco de dados personalizado basta escolher o nome no final da url (ex:dbclientes)

const url = 'mongodb+srv://admin:123senac@aws-db.rvfet.mongodb.net/dbbancoOS'

// criar uma variavel de apoio para validação
let conectado = false

// metodo para conectar o banco de dados
const conectar = async() =>{
    // validação(se não estiver conectado, conectar)
    if(!conectado){
        // conectar com o banco de dados
        // try catch - tratamento de exceções
        try {
            await mongoose.connect(url) // conectar
            conectado = true // setar a variavel
            console.log ("MongoDB conectado")
            return true // para o main identificar a conexão estabelecida com sucesso
        }catch(error){
            if(error.code = 8000){
                console.log("Erro de autenticação")
            } else{
                console.log(error)
            }
        }
    } 
}


// metodo para desconectar o banco de dados
const desconectar = async() =>{
    // validação(se não estiver conectado, desconectar)
    if(conectado){
        // desconectar com o banco de dados
        // try catch - tratamento de exceçõe        
        try {
            await mongoose.disconnect(url) //desconectar
            conectado = false // setar a variavel
            console.log ("MongoDB desconectado")
            return true // para o main identificar a conexão estabelecida com sucesso
        }catch(error){
            console.log (error)
        }
    } 
}

// exportar para main os métodos conectar e dsconectar
module.exports = {conectar, desconectar}
