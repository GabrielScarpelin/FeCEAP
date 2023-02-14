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
            
        }
        else{
            const msgModal = document.getElementsByClassName('formSendedModal')[0]
            msgModal.classList.remove('hide')
            msgModal.classList.add('erro')
            document.getElementById('mensagemModal').innerText = "Erro ao adiocionar o projeto"
            document.getElementById('imgModal').setAttribute('src', "https://cdn-icons-png.flaticon.com/512/845/845648.png")
        }
        alert(xml.response)
    }
    xml.open('POST', 'http://localhost:3000/newproject')
    xml.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xml.send(JSON.stringify(entrada))
    
}