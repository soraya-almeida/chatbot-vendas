const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const optionsContainer = document.getElementById("options-container");

let step = 0;
let userName = "";

// Definindo as mensagens e interações do chat
const messages = [
    { bot: "🤖 Olá! Qual é o seu nome?" },
    { user: true, saveTo: "userName" },
    { bot: () => `Prazer, ${userName}! Você já sentiu frustração ao procurar um filme ou série e descobrir que ele está em uma plataforma que você não assina? 😩`, options: ["Sim, sempre acontece comigo!", "Não, eu assino todas as plataformas."] },
    { bot: "Agora imagine poder acessar todos os filmes e séries de TODAS as plataformas em um só lugar… Isso resolveria seu problema, certo? 😊", options: ["Sim, seria perfeito!", "Não sei…"] },
    { bot: () => `Exatamente, ${userName}! Foi por isso que criamos o "Seu Catálogo de Entretenimento".` },
    { bot: "Aqui você tem acesso vitalício a um catálogo gigantesco, com tudo o que você ama assistir. E tudo isso por um único pagamento. Nada de mensalidades absurdas!" },
    { bot: "Quanto você acha que um serviço assim valeria? Acesso completo, vitalício e sempre atualizado… 🤔", options: ["Uns R$100 seria justo.", "Acho que uns R$50 já estaria bom.", "Qualquer valor abaixo de R$30 seria perfeito."] },
    { bot: "Ótimo! Agora deixa eu te contar… O valor oficial desse serviço é R$199,90." },
    { bot: "Mas como você chegou até aqui, eu tenho uma surpresa especial para você… 🎉" },
    { bot: "Hoje, e apenas por tempo LIMITADO, você não vai pagar R$199,90…" },
    { bot: "Eu vou liberar o seu acesso por apenas R$9,99! 🔥🔥🔥" },
    { bot: () => `Isso mesmo, ${userName}! Você garante acesso vitalício a tudo isso por um valor único de apenas R$9,99!` },
    { bot: "Mas atenção! Essa oferta é por tempo LIMITADO e pode expirar a qualquer momento.", options: ["SIM, quero aproveitar!", "Não, prefiro pagar mais caro depois."] },
    { bot: () => `✅ Parabéns, ${userName}! Seu acesso vitalício será liberado em instantes!` },
    { bot: "🎬 Agora é só preparar a pipoca e curtir seus filmes e séries favoritos!" },
    { bot: "Para garantir seu acesso agora mesmo, clique no link abaixo e finalize sua compra: 👇" },
    { bot: "<a href='https://pay.kiwify.com.br/HhPKmsA' target='_blank' style='color: #00ff00; font-weight: bold;'>🔗 Comprar Agora</a>" },
];

// Função para enviar a mensagem e processar a interação do usuário
function sendMessage() {
    let input = userInput.value.trim();
    if (input === "") return;
    addMessage(input, "user");
    processStep(input);
    userInput.value = "";
}

// Função para checar se pressionou a tecla Enter
function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Função que processa a etapa atual do chat
function processStep(input) {
    let currentStep = messages[step];

    // Quando o nome do usuário for solicitado, ele é guardado
    if (currentStep.saveTo) {
        userName = input;
    }

    // Avança para a próxima etapa
    step++;
    displayNextMessage();
}

// Função para exibir a próxima mensagem
function displayNextMessage() {
    if (step >= messages.length) return;

    let nextMessage = messages[step];

    if (nextMessage.bot) {
        let botMessage = typeof nextMessage.bot === "function" ? nextMessage.bot() : nextMessage.bot;
        setTimeout(() => {
            addMessage(botMessage, "bot");
            step++;
            if (nextMessage.options) {
                showOptions(nextMessage.options);
            } else {
                displayNextMessage();
            }
        }, 1000);
    }
}

// Função para mostrar opções de botões
function showOptions(options) {
    optionsContainer.innerHTML = "";
    options.forEach(option => {
        let button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.onclick = () => {
            addMessage(option, "user");
            step++;
            displayNextMessage();
            optionsContainer.innerHTML = "";
        };
        optionsContainer.appendChild(button);
    });
}

// Função para adicionar uma nova mensagem ao chat
function addMessage(text, sender) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Iniciar o chat
displayNextMessage();
