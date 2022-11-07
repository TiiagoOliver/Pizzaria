const usuarios = require('../databases/usuarios.json')
const fs = require("fs")
const bcrypt = require("bcrypt")



function listar(){
    let novaLista = (u) =>{
        return {
        id: u.id,
        nome: u.nome,
        email: u.email
        }
      }
      let novaDaNovaLista = usuarios.map(novaLista)
        console.table(novaDaNovaLista)
}

function salvar(arrayDeUsuarios){
     fs.writeFileSync("./databases/usuarios.json", JSON.stringify(arrayDeUsuarios, null, 4))
}

function cadastrar(objeto){
    let novoObjeto = {
    id: usuarios[usuarios.length - 1].id + 1,
    nome: objeto.nome,
    email: objeto.email,
    senha: bcrypt.hashSync(objeto.senha, 10),
    enderecos: [objeto.endereco],
    formasDePagamento: [objeto.formasDePagamento]
   }
   usuarios.push(novoObjeto)
   salvar(usuarios)
}

function detalhar(idUsuario){
    // seu código aqui
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })

        console.log("Nome: " + usuario.nome)
        console.log("Email: " + usuario.email)
        console.table(usuario.enderecos)
        console.table(usuario.formasDePagamento)
}

function remover(idDoUsuarioParaRemover){
        // Seu código aqui
let posicaoDoUsuario = usuarios.findIndex(function(usuarios){
        return idDoUsuarioParaRemover === usuarios.id
    })
 if(posicaoDoUsuario != -1){
       usuarios.splice(posicaoDoUsuario, 1) 
    }else{
        console.error("Esse id não existe")
    }
    salvar(usuarios)
}

function alterar(novosDados, idUsuario){
    // Seu código aqui
    let index = usuarios.findIndex(function(usuarios){
        return idUsuario === usuarios.id    
    })
    if(index != -1){
        usuarios[index].nome=novosDados.nome
        usuarios[index].email=novosDados.email
        usuarios[index].senha=bcrypt.hashSync(novosDados.senha, 10)

    }else{
        console.error("Esse id não existe!")
    }
    
     salvar(usuarios)
    
}

function addEndereco(novoEndereco, idUsuario){
    // Seu código aqui
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
    if(usuario != undefined){
        usuario.enderecos.push(novoEndereco)

    }else{
        console.error("Esse id não existe")
    }
    salvar(usuarios)
    
}

function removerEndereco(posicaoDoEndereco, idUsuario){
    // Seu código aqui
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
    
if(usuario != undefined){
    usuario.enderecos.splice(posicaoDoEndereco, 1)  
}else{
    console.error("Esse id não existe")
}
    salvar(usuarios)
}

function alterarEndereco(posicaoDoEndereco, novoEndereco, idUsuario){
    // Seu código aqui     
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
   if(usuario != undefined){
       usuario.enderecos.splice(posicaoDoEndereco, 1, novoEndereco)
   }else{
    console.error("Esse id não existe")
   }
    salvar(usuarios)
}

function addFormaDePagamento(novaFormaDePagamento, idUsuario){
    // Seu código aqui
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
    
  if(usuario != undefined){
      usuario.formasDePagamento.push(novaFormaDePagamento)
  }else(
    console.error("Esse id não existe")
  )
    salvar(usuarios)
}

function removerFormaDePagamento(posicaoDaFormaDePagamento, idUsuario){
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
if(usuario != undefined){
    usuario.formasDePagamento.splice(posicaoDaFormaDePagamento, 1)  
}else{
    console.error("Esse id não existe")
}
    salvar(usuarios)
}

function alterarFormaDePagamento(novaFormaDePagamento, posicaoDaFormaDePagamento, idUsuario){
    // Seu código aqui
    let usuario = usuarios.find(function(usuarios){
        return idUsuario === usuarios.id    
    })
if(usuario != undefined){
    usuario.formasDePagamento.splice(posicaoDaFormaDePagamento, 0, novaFormaDePagamento)  
}else{
    console.error("Esse id não existe")
}   
    salvar(usuarios)
}

const UsuariosServices = {
    cadastrar,
    listar,
    detalhar,
    remover,    
    alterar,
    addEndereco,
    removerEndereco,
    alteraEndereco: alterarEndereco,
    addFormaDePagamento,
    removerFormaDePagamento,
    alterarFormaDePagamento
}

module.exports = UsuariosServices;