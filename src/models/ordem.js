/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */

// importação dos recursos do framework mongoose
const{model,Schema}= require('mongoose')
// const { type } = require('os')

// criação da estrutura da coleção clientes
const ordemSchema = new Schema({
    nomeCliente :{
        type: String
    },
    foneCliente:{
        type: String
    },
    cpfCliente:{
        type: String,
        unique:true,
        index: true
    },
    datacadastro: {
        type: Date,
        default: Date.now
    },
    statusOS:{
        type: String

    }
},{versionKey: false})// não cersionar os dados armazenados

// Exportar para o main o modelo de dados
// Obs: Clientes será o nome da coleção
module.exports = model('dbOrdem', ordemSchema)
