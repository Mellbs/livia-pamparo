// =========================================================
// CONFIGURAÇÃO DO WHATSAPP
// =========================================================

// Número com código do país (55) + DDD + número, sem espaços, sem hífen e sem o zero do DDD.
const telefone = "5519993423938";

const mensagem = "Olá, Livia! Gostaria de agendar um horário. Poderia me informar os horários disponíveis?";

const linkWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

// Aplica o link (com a mensagem pronta) em todos os botões de WhatsApp
document.querySelectorAll(".btn-whatsapp").forEach((botao) => {
    botao.href = linkWhatsApp;
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
});


// =========================================================
// MENU (celular/tablet)
// =========================================================

const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("menu-toggle");

function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao tocar em um link
document.querySelectorAll("#navegacao a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
});

// Fecha com a tecla Esc
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
});

// Fecha ao voltar para a tela grande
window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) fecharMenu();
});

// Fundo escuro no menu depois de rolar a página
function atualizarMenu() {
    menu.classList.toggle("rolado", window.scrollY > 30);
}
atualizarMenu();
window.addEventListener("scroll", atualizarMenu, { passive: true });



// ---------- FORMULÁRIO DE AGENDAMENTO WHATSAPP ----------

const formulario = document.getElementById("form-agendamento");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        // Captura os dados
        const nome = document.getElementById("nome").value.trim();
        const data = document.getElementById("data").value;

        // Captura todos os serviços selecionados
        const servicos = Array.from(
            document.querySelectorAll('input[name="servicos"]:checked')
        ).map(input => input.value);

        // Verifica os campos
        if (!nome || !data) {
            alert("Preencha todos os campos.");
            return;
        }

        if (servicos.length === 0) {
            alert("Selecione pelo menos um serviço.");
            return;
        }

        // Formata a data
        const [ano, mes, dia] = data.split("-");
        const dataFormatada = `${dia}/${mes}/${ano}`;

        // Cria a mensagem
        const mensagem =
            `Olá, Livia! Gostaria de agendar um horário.\n\n` +
            `*Nome:* ${nome}\n` +
            `*Data desejada:* ${dataFormatada}\n` +
            `*Serviços desejados:* ${servicos.join(", ")}\n\n` +
            `Aguardo seu retorno!`;

        // Número do WhatsApp
        const telefone = "5519993423938";

        // Abre o WhatsApp
        const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.location.href = link;

    });

}




// =========================================================
// ANIMAÇÃO DE ENTRADA AO ROLAR
// =========================================================

const elementos = document.querySelectorAll(".aparecer");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    elementos.forEach((el) => observador.observe(el));
} else {
    elementos.forEach((el) => el.classList.add("visivel"));
}
