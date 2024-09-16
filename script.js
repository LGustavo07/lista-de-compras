document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const item = document.getElementById("item");
  const list = document.getElementById("list");
  const warningMessage = document.getElementById("warning-message");
  const closeWarningButton = document.getElementById("close-warning");
  const warningItemSpan = warningMessage.querySelector(".item");

  // Manipulando o input item para receber somente letras.
  item.addEventListener("input", () => {
    const hasCharactersRegex = /[^A-Za-z]/g;
    item.value = item.value.replace(hasCharactersRegex, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o envio do formulário

    const itemValue = item.value.trim(); // Remove espaços extras

    // Verifica se o input não está vazio
    if (itemValue) {
      // Cria uma nova div com role="listitem"
      const listItem = document.createElement("div");
      listItem.setAttribute("role", "listitem");

      // Cria o checkbox
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");

      // Cria o span com o texto do item
      const span = document.createElement("span");
      span.textContent = itemValue;

      // Cria o botão de remover com ícone de lixeira
      const deleteButton = document.createElement("img");
      deleteButton.setAttribute("src", "./assets/rubbish-bin.svg");
      deleteButton.setAttribute("alt", "lixeira");
      deleteButton.style.cursor = "pointer";

      // Função para remover o item ao clicar na lixeira
      deleteButton.addEventListener("click", () => {
        showWarning(itemValue); // Mostrar aviso ao remover o item
        listItem.remove();
      });

      // Adiciona os elementos criados à nova div (listitem)
      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);

      // Adiciona o novo item de lista ao contêiner de lista existente
      list.appendChild(listItem);

      // Limpa o campo de input após adicionar o item
      item.value = "";
    } else {
      // Mostra uma mensagem de aviso se o campo estiver vazio
      const warning = document.querySelector(".input-warning");
      if (warning) {
        warning.classList.remove("hidden");
        setTimeout(() => {
          warning.classList.add("hidden");
        }, 3000); // Esconde o aviso após 3 segundos
      }
    }
  });

  // Função para adicionar a funcionalidade de remover itens aos botões existentes
  function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(
      "#list img[src='./assets/rubbish-bin.svg']"
    );
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemValue = button.previousElementSibling.textContent; // Obtém o texto do item
        showWarning(itemValue); // Mostrar aviso ao remover o item
        button.parentElement.remove();
      });
    });
  }

  // Função para mostrar a mensagem de aviso
  function showWarning(itemValue) {
    warningItemSpan.textContent = itemValue; // Atualiza o texto da mensagem
    warningMessage.classList.remove("hidden"); // Mostra a mensagem
    setTimeout(() => {
      warningMessage.classList.add("hidden"); // Oculta a mensagem após 3 segundos
    }, 3000);
  }

  // Adiciona a funcionalidade de remover itens aos botões já existentes
  addDeleteEventListeners();

  // Adiciona a funcionalidade para fechar a mensagem de aviso
  closeWarningButton.addEventListener("click", () => {
    warningMessage.classList.add("hidden");
  });
});
