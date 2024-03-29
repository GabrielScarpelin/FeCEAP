function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")
}
function enviarForms(){
    const inputs = [document.getElementsByName("title"), document.getElementsByName("category"), document.getElementsByName("image"), document.getElementsByName("description")]
    const entrada = {}
    inputs.forEach((inputsForms, index)=>{
        entrada[inputsForms.item(0).name] = inputsForms.item(0).value
    })
    const xml = new XMLHttpRequest()
    xml.onload = function () {
        if (this.status === 200){
            onOff()
            const msgModal = document.getElementsByClassName('formSendedModal')[0]
            msgModal.classList.remove('hide')
            msgModal.classList.add('sucess')
            document.getElementById('mensagemModal').innerText = "Projeto adicionado com sucesso"
            document.getElementById('imgModal').setAttribute('src', "https://cdn-icons-png.flaticon.com/512/148/148767.png")
            inputs.forEach((inputsForms, index)=>{
                inputsForms.item(0).value = ""
            })
            document.getElementsByClassName('progressBar').item(0).animate([{width: '100%', width: '0%'}], {duration: 1000})
            setInterval(()=>{
                msgModal.classList.add('hide')
                location.reload()
            }, 950)
        }
        else{
            const msgModal = document.getElementsByClassName('formSendedModal')[0]
            msgModal.classList.remove('hide')
            msgModal.classList.add('erro')
            document.getElementById('mensagemModal').innerText = "Erro ao adiocionar o projeto"
            document.getElementById('imgModal').setAttribute('src', "https://cdn-icons-png.flaticon.com/512/845/845648.png")
            document.getElementsByClassName('progressBar').item(0).animate([{width: '100%', width: '0%'}], {duration: 1000})
            setInterval(()=>{
                msgModal.classList.add('hide')
            }, 950)
        }
    }
    xml.open('POST', 'http://localhost:3000/newproject')
    xml.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xml.send(JSON.stringify(entrada))
    
}

function apagarProjeto(id){
    fetch(`http://localhost:3000/apagar/${id}`, {method: 'DELETE'}).then((resposta)=>{
        console.log(resposta)
        location.reload()
    }).catch((err)=>{
        console.log("Erro ao se conectar com o servidor" , err)
    })
}