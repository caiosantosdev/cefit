//components
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FooterComp from "../../components/Footer/Footer";

//css
import "./Aluno.css";
import user from "../../images/user.png";
import lixeira from "../../components/Exercicio/lixeira.png";
//redux
import { useSelector, useDispatch } from "react-redux";
import { clearExercises, getExercisesByTreinoID } from "../../redux/exercises/slice";
import { addForms } from "../../redux/form-treino/slice";
import { v4 as idGen } from "uuid";
import { deleteTraining, deleteTreinoByID } from "../../redux/trainings/slice";
function Aluno() {

    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(clearExercises());
    //pega o personal
    const currentUser = useSelector(rootReducer => rootReducer.user);

    //pega os treinos relacionados ao aluno
    const treinosUser = useSelector(rootReducer => rootReducer.trainings);

    //pega a anamnese relacionada ao aluno
    const anamnese = useSelector(rootReducer => rootReducer.anamnese);

    const alunos = useSelector(rootReducer => rootReducer.aluno);

    const usuario = alunos.filter((aluno) => aluno.idUser === id)[0];
    console.log(alunos);
    console.log(usuario);
    console.log(alunos.filter((aluno) => aluno.userId === id))

    const handleDeleteTreino = (treinoId) => {
        dispatch(deleteTreinoByID(treinoId))
        dispatch(deleteTraining(treinoId))
    }

    if (!currentUser.loggedPersonal) {
        return <Navigate to={"/login"} />
    }

    return (
        <div className="card-personal">
            <Navbar />
            <div className="mt-4 m-auto mb-4" id="card-block-personal">
                <a href="page2.html" className="back-button">
                    <span className="seta"><i className="fas fa-arrow-left"></i></span>
                </a>
                <div className="card-body text-center m-auto">
                    <div>
                        <img src={user} alt="foto de perfil usuario"
                            className="rounded-circle img-fluid" style={{ width: "150px" }} />
                        <h4 className="my-3" id="nome-aluno">{usuario.nomeUser}</h4>
                        
                    </div>
                    <div className="card m-auto" id="card-anamnese">
                        <h2 className="display-4" id="titulo-anamnese">Anamnese</h2>
                        <div className="line" id="linha-div">

                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Peso</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.weight} Kg</p>
                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Motivação</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.motivation}</p>
                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Frequência de Atividade Física</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.activityFreq}</p>
                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Data do último exame</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.date}</p>
                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Faz Dieta?</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.diet}</p>
                        </div>
                        <div className="card-body">
                            <p className="mb-1" id="titulo-info-aluno" style={{ fontWeight: "bold" }}>Observações</p>
                            <p className="mb-1" id="info-aluno" style={{ fontSize: "0.85rem" }}>{anamnese.observacoes}</p>
                        </div>
                    </div>

                </div>
            </div>

            {treinosUser.map((treino) => 
            <>
                <div className="exercicio-card" id="treino-aluno">
                    <div className="exercicio-info">
                        <Link className="card-title" id="exercicio-nome" onClick={() => {dispatch(getExercisesByTreinoID(treino._id))}} to={`/EditTreinoAluno/${treino._id}`}>{treino.title}</Link>
                    </div>
                    <div className="btn-div">
                        <button className="btn-lixeira" onClick={() => {handleDeleteTreino(treino._id)}}>
                            <img className="lixeira-image" src={lixeira} alt="lixeira" />
                        </button>
                    </div>
                </div>
            </>
            )}

            <div className="d-flex justify-content-center mb-2">
                <Link data-aos="fade-up" data-aos-delay="200" to={`/CreateTreinoAluno`} onClick={() => {dispatch(addForms({userId: id, id: idGen(), infos: {}}))}} className="btn btn-success w-50">Preescrever Treino</Link>
            </div>
            <FooterComp />
        </div>
    );
}

export default Aluno;