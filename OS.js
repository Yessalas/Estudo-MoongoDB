/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */

// importação dos recursos do framework mongoose
const{model,Schema}= require('mongoose')
const { type } = require('os')

// criação da estrutura da coleção clientes
const clienteSchema = new Schema({
    cadastrarCliente :{
        type: String
    },
    OSaberta:{
        Type: String
    },
    statusOS:{
        Type: String
    },
    NumeroOS:{
        type: String,
        unique:true,
        index: true
    },
    datacadastro: {
        type: Date,
        default: Date.now
    }
},{versionKey: false})// não cersionar os dados armazenados

// Exportar para o main o modelo de dados
// Obs: Clientes será o nome da coleção
module.exports = model('BancoOS', clienteSchema)
