import { useState } from "react";
import "./App.css";

function App() {
  const [alunos, setAlunos] = useState(() => {
    const dados = localStorage.getItem("alunos");
    return dados ? JSON.parse(dados) : [];
  });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [curso, setCurso] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  function salvarAluno() {
    if (!nome || !email || !idade || !curso || nota1 === "" || nota2 === "") {
      alert("Preencha todos os campos");
      return;
    }

    const n1 = Number(nota1);
    const n2 = Number(nota2);
    const media = (n1 + n2) / 2;
    const situacao = media >= 7 ? "Aprovado" : "Reprovado";

    if (idEmEdicao) {
      const novaLista = alunos.map((aluno) => {
        if (aluno.id === idEmEdicao) {
          return { ...aluno, nome, email, idade, curso, nota1: n1, nota2: n2, media, situacao };
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
        nota1: n1,
        nota2: n2,
        media,
        situacao,
      };
      const novaLista = [...alunos, novoAluno];
      setAlunos(novaLista);
      localStorage.setItem("alunos", JSON.stringify(novaLista));
    }
    limparFormulario();
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
    setNota1(aluno.nota1);
    setNota2(aluno.nota2);
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setIdade("");
    setCurso("");
    setNota1("");
    setNota2("");
    setIdEmEdicao(null);
  }

  return (
    <div className="app">
      <div className="entrada">
        <div className="inputs">
          <h3>{idEmEdicao ? "Editar aluno" : "Cadastro de alunos"}</h3>
          <p className="contador">Total de alunos cadastrados: {alunos.length}</p>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
          <input
            type="number"
            placeholder="Nota 1"
            min="0"
            max="10"
            step="0.1"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Nota 2"
            min="0"
            max="10"
            step="0.1"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
          />
        </div>
        <button onClick={salvarAluno}>
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
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Média</th>
              <th>Situação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.idade}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.nota1}</td>
                <td>{aluno.nota2}</td>
                <td>{aluno.media !== undefined ? aluno.media.toFixed(1) : "-"}</td>
                <td>{aluno.situacao || "-"}</td>
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