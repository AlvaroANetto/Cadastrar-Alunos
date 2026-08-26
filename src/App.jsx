import { useState } from "react";
import "./App.css";

function App() {
  let atualizar = false;
  const [alunos, setAlunos] = useState(() => {
    const dados = localStorage.getItem("alunos");
    return dados ? JSON.parse(dados) : [];
  });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState(null);
  const [curso, setCurso] = useState("");
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  function adicionarAluno() {
    if(nome == "" || email == "" || idade == "" || curso == ""){
      alert("Preencha todos os campos");
      return;
    }
    if (idEmEdicao) {
      const novaLista = alunos.map((aluno) => {
        if (aluno.id === idEmEdicao) {
          return { ...aluno, nome, email, idade, curso };
        }
        return aluno;
      });

      setAlunos(novaLista);
      localStorage.setItem("alunos", JSON.stringify(novaLista));
    } else {
      const novoAluno = {
        id: Date.now(),
        nome,
        email,
        idade,
        curso,
      };

      const novaLista = [...alunos, novoAluno];
      setAlunos(novaLista);
      localStorage.setItem("alunos", JSON.stringify(novaLista));
      limparFormulario();
    }
  }
  function excluirAlunos(id) {
    const novaLista = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(novaLista);
    localStorage.setItem("alunos", JSON.stringify(novaLista));
    if (idEmEdicao === id) {
      limparFormulario();
    }
  }
  function atualizarAlunos(aluno) {
    setIdEmEdicao(aluno.id);
    setNome(aluno.nome);
    setEmail(aluno.email);
    setIdade(aluno.idade);
    setCurso(aluno.curso);
  }
  function limparFormulario() {
    setNome("");
    setEmail("");
    setIdade(0);
    setCurso("");
  }

  return (
    <div className="app">
      <div className="entrada">
        <div className="inputs">
          <h3>{idEmEdicao ? "Editar aluno" : "Cadastro de alunos"}</h3>
          <input
            type="text"
            placeholder="Nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="E-mail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Idade"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Curso"
            id="curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
        </div>
        <button onClick={adicionarAluno}>
          {idEmEdicao ? "Salvar Alterações" : "Adicionar"}
        </button>
        {idEmEdicao && (
          <button
            style={{ backgroundColor: "#888", marginTop: "0" }}
            onClick={limparFormulario}
          >
            Cancelar
          </button>
        )}
      </div>
      <div className="tabela-container">
        <table className="tabelaAlunos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th>Curso</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.idade}</td>
                <td>{aluno.curso}</td>
                <td>
                  <button id="deletar" onClick={() => excluirAlunos(aluno.id)}>
                    Deletar
                  </button>
                  <button id="atualizar" onClick={() => atualizarAlunos(aluno)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
