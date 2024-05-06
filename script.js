document.getElementById('meuFormulario').addEventListener('submit', function(e) {
            e.preventDefault();
    var checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

    if (!checkedOne) {
        alert('Por favor, marque pelo menos uma caixa.');
        e.preventDefault(); // Impede o envio do formulário apenas se nenhuma caixa estiver marcada
        return false;
    }
    // Cria um elemento de entrada oculto para a data e hora atual
    var currentDateTimeInput = document.createElement('input');
    currentDateTimeInput.setAttribute('type', 'hidden');
    currentDateTimeInput.setAttribute('name', 'updated_datetime');
    
    // Obtém a data e hora atual no formato AAAA-MM-DD HH:MM:SS
    var now = new Date();
    var datetime = now.getFullYear() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') +
                   ' ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    
    // Define o valor da entrada oculta para a data e hora atual
    currentDateTimeInput.setAttribute('value', datetime);
    
    // Anexa a entrada oculta ao formulário
    this.appendChild(currentDateTimeInput);

    // Prepara os dados do formulário para serem enviados via AJAX
    var formData = new FormData(this);

    // Exibe a notificação do SweetAlert
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Dados enviados com sucesso!',
        showConfirmButton: false,
        timer: 2000
    });
            var nomeCompleto = document.getElementById('nome_completo').value;
    localStorage.setItem('nomeCompleto', nomeCompleto);

    // Envia os dados do formulário usando fetch
    fetch(this.action, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            console.log('Dados enviados com sucesso!');
                    window.location.reload();
        } else {
            Swal.fire("Houve um erro ao enviar o formulário", "", "error");
        }
    }).catch(error => {
            // Trata qualquer erro que ocorra durante o envio
            Swal.fire("Houve um erro ao enviar o formulário", "", "error");
        });




  // Prepara os dados do formulário para serem enviados
  var formData = new FormData(this);
  var dados = {
    nome_completo: formData.get('nome_completo'),
    setor: formData.get('setor'),
    coletor: formData.get('coletor'),
    retirada_devolucao: formData.get('retirada_devolucao'),
    cpd_responsavel: formData.get('cpd_responsavel')
  };

  // Função para enviar dados do formulário para o bot do Telegram
  function enviarDadosParaTelegram(dados) {
    const token = '6975084416:AAHXNd9tJQpg_1dJfmM5k8DLwbG-8gVzUh0'; // Substitua pelo seu token do bot
    const chatId = '-1001346768338'; // Substitua pelo ID do chat do grupo

    // Formata a mensagem conforme o padrão desejado
    const statusColetor = dados.retirada_devolucao === 'Retirado' ? 'foi Retirado 🟠' : 'foi Devolvido ✅';
  const mensagem = `> ${dados.coletor} ${statusColetor}\n\nNome completo: ${dados.nome_completo}\nSetor:  ${dados.setor}\nCPD Responsável: ${dados.cpd_responsavel}`;

    // Endpoint da API do Telegram para enviar mensagens
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Dados para enviar na requisição
    const data = {
      chat_id: chatId,
      text: mensagem
    };

    // Envia a mensagem para o grupo do Telegram
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Mensagem enviada com sucesso:', data))
    .catch(error => console.error('Erro ao enviar mensagem:', error));
  }


  // Chama a função para enviar os dados para o Telegram
  enviarDadosParaTelegram(dados);



});


// Quando a página é recarregada, verifica se há um nome completo armazenado e, se houver, insere-o de volta no formulário
window.onload = function() {
    var nomeCompletoSalvo = localStorage.getItem('nomeCompleto');
    if (nomeCompletoSalvo) {
        document.getElementById('nome_completo').value = nomeCompletoSalvo;
        // Limpa o nome completo de localStorage se não quiser mantê-lo após o recarregamento
        localStorage.removeItem('nomeCompleto');
    }
};
       
        
function toggleCheckboxes(checkbox) {
        var checkboxes = document.getElementsByName('informações');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = checkbox.checked;
        }
    }
    


    
