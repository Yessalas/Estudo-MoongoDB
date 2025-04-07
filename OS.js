/**
 * Processo principal
 * Estudo do banco de dados MongoDB (CRUD)
 * @author Yesenia Salas
 */

// importação do módulo de conexão
const { conectar, desconectar } = require('./database.js')

// importação do modelo de dados do cliente
const ordemModel = require('./src/models/ordem.js')

// Função para cadastrar um novo cliente
// ATENÇÃO! Para trabalhar com banco de dados usar sempre async-await e try-catch
const salvarOrdem = async (nomeCli, foneCli, cpfCli, sttsOS) => {
    try {
        // Verificação simples de CPF
        if (!cpfCli || cpfCli.length !== 14) {  // A regra do CPF é um exemplo simples
            console.log("Erro: CPF inválido")
            return;
        }

        // Verificação simples do status da OS
        const statusValido = ["aberta", "em andamento", "concluída"]; // Status que a OS pode ter
        if (!statusValido.includes(sttsOS.toLowerCase())) {
            console.log("Erro: Status de OS inválido");
            return;
        }

        // Criar a estrutura de dados para a OS
        const novaOrdem = new ordemModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpfCliente: cpfCli,
            statusOS: sttsOS
        });

        // Salvar a nova ordem de serviço no banco de dados
        await novaOrdem.save();
        console.log("Ordem de Serviço criada com sucesso!");

    } catch (error) {
        // Tratamento de erro para o caso de CPF já existente
        if (error.code === 11000) { // Código de erro para dados duplicados
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado.`);
        } else {
            console.log("Erro ao criar Ordem de Serviço:", error);
        }
    }
}

// Função para listar todos os clientes
// .sort({ nomeCliente: 1 }) Listar em ordem alfabética (nome)
const listarOrdemPorStatus = async (status) => {
    try {
        // Busca pelo status, ignorando maiúsculas e minúsculas
        const ordens = await ordemModel.find({ statusOS: new RegExp(status, 'i') });
        
        if (ordens.length === 0) {
            console.log(`Nenhuma ordem de serviço encontrada com o status: ${status}`);
        } else {
            console.log(`Ordens de Serviço com status '${status}':`, ordens);
        }
    } catch (error) {
        console.log("Erro ao buscar ordens por status:", error);
    }
}

// Função para buscar um cliente pelo nome
// find({nomeCliente: new RegExp(nome, i)}) ignorar na busca letras maíusculas ou minúsculas (i - case insensitive) 
const buscarOrdemNome = async (nome) => {
    try {
        const clienteNome = await ordemModel.find(
            {
                nomeCliente: new RegExp(nome, 'i')
            }
        )
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar um cliente pelo CPF
const buscarOrdemCPF = async (cpf) => {
    try {
        const clienteCPF = await ordemModel.find(
            {
                cpfCliente: new RegExp(cpf)
            }
        )
        console.log(clienteCPF)
    } catch (error) {
        console.log(error)
    }
}

// Função para editar os dados do cliente
// Atenção!!! Usar o id do cliente
const atualizarOrdem = async (id,nomeCli, foneCli, cpfCli,sttsOS) => {
    try {
        const clienteEditado = await ordemModel.findByIdAndUpdate(
            id,
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpfCliente: cpfCli,
                statusOS: sttsOS
            },
            {
                new: true,
                runValidators: true
            }
        )
        console.log("Dados do cliente alterados com sucesso")
    } catch (error) {
        //tratamento personalizado dos erros(exceções)
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

// Função para excluir o cliente
// Atenção!!! Usar o id do cliente
const excluirOrdem = async (id) => {
    try {
        const clienteDeletado = await ordemModel.findByIdAndDelete(id)
        console.log("OS excluída com sucesso.")
    } catch (error) {
        console.log(error)
    }
}

//========================================================
//========================================================
const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------------")
    await conectar()
    // CRUD Create (inserção no banco de dados)
    //await salvarOrdem("Mariana", "6969-6969", "798.123.456-30", "aberta")

    // CRUD Read (listar todos as OS de acordo com o status)
    //await listarOrdemPorStatus("aberta") // "aberta", "em andamento", "concluída"

    // CRUD Read (busca pelo nome do cliente)
    //await buscarOrdemNome()

    // CRUD Read (busca pelo cpf do cliente)
    //await buscarOrdemCPF()

    // CRUD Update (id do cliente)
    //await atualizarOrdem("67f418e743d42c3543869f2f","Maria Limeira", "5656-3456", "970.680.340-80", "OS em andamento")

    // CRUD Delete (id do cliente)
    //await excluirOrdem("67f414a424a0cc7104dc4611")
    await desconectar()
}

iniciarSistema()