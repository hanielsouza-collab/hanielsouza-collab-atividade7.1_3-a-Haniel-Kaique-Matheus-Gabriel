window.addEventListener("load", function () {
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "0.6s";
        document.body.style.opacity = "1";
    }, 100);

    verificarLogin();
    ativarMenuUsuario();
    carregarUsuario();
});

document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll("button, .btn");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            botao.style.transform = "scale(0.95)";

            setTimeout(() => {
                botao.style.transform = "scale(1)";
            }, 150);
        });
    });
});

function cadastrar() {
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let area = document.getElementById("area").value.trim();
    let cargo = document.getElementById("cargo").value.trim();

    if (!nome || !email || !senha || !area || !cargo) {
        alert("Preencha todos os campos.");
        return;
    }

    if (!email.includes("@")) {
        alert("Email inválido.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Email já cadastrado.");
        return;
    }

    let usuario = {
        nome,
        email,
        senha,
        area,
        cargo,
        status: "Ativo"
    };

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}

function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let senha = document.getElementById("loginSenha").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
        localStorage.setItem("logado", "true");
        localStorage.setItem(
            "usuarioAtual",
            JSON.stringify(usuarioEncontrado)
        );

        window.location.href = "sistema.html";
    } else {
        alert("Email ou senha incorretos.");
    }
}

function verificarLogin() {
    let pagina = window.location.pathname.split("/").pop();

    if (
        pagina === "sistema.html" ||
        pagina === "usuarios.html" ||
        pagina === "configuracoes.html"
    ) {
        let logado = localStorage.getItem("logado");

        if (logado !== "true") {
            alert("Faça login primeiro.");
            window.location.href = "login.html";
        }
    }
}

function carregarUsuario() {
    let usuario = JSON.parse(localStorage.getItem("usuarioAtual"));

    if (!usuario) return;

    if (document.getElementById("mostrarNome"))
        document.getElementById("mostrarNome").innerText = usuario.nome;

    if (document.getElementById("mostrarEmail"))
        document.getElementById("mostrarEmail").innerText = usuario.email;

    if (document.getElementById("mostrarArea"))
        document.getElementById("mostrarArea").innerText =
            "Área: " + usuario.area;

    if (document.getElementById("mostrarCargo"))
        document.getElementById("mostrarCargo").innerText =
            "Cargo: " + usuario.cargo;
}

function logout() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioAtual");

    alert("Logout realizado.");
    window.location.href = "index.html";
}

function ativarMenuUsuario() {
    let userIcon = document.getElementById("userIcon");
    let menu = document.getElementById("dropdownMenu");

    if (!userIcon || !menu) return;

    userIcon.addEventListener("click", () => {
        menu.style.display =
            menu.style.display === "block"
                ? "none"
                : "block";
    });

    window.addEventListener("click", function (e) {
        if (
            !userIcon.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            menu.style.display = "none";
        }
    });
}