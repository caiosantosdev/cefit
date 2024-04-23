import Navbar from "../../components/Navbar/Navbar.jsx";
import FooterComp from "../../components/Footer/Footer.jsx";
import Exercicio from "../../components/Exercicio/Exercicios.jsx";
//modal
import Modal from "../../components/Modal/AddExercicio";
import React, { useState } from 'react';
import "./treinos.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";

import { deleteTreinoByID, deleteTraining } from "../../redux/trainings/slice.js";

function Treino() {
    //id treino
    const {id} = useParams();
    const dispatch = useDispatch();
    const Exercises = useSelector(rootReducer => rootReducer.exercises)
    const navigate = useNavigate();
    const currentUser = useSelector(rootReducer => rootReducer.user);
    const [showModal, setShowModal] = useState(false);
    const form = useSelector(rootReducer => rootReducer.forms);
    const exercicios = useSelector(rootReducer => rootReducer.exercises);

    if(!currentUser.logged){
        return <Navigate to={"/login"}/>
    }
  
    const handleDeleteTreino = (idTreino) => {
        dispatch(deleteTreinoByID(id));
        dispatch(deleteTraining(id));
        navigate("/areaFIT");
    }
    
    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
        <Navbar />
        <div className="treino">
            <div className="traino-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Exercícios</h1>
            </div>
        
            <div className="botao">
                <button className="btn-submit" onClick={() => openModal()}>+ Exercício</button>
            </div>

            <div className="exercicios">
            {id?(
                Exercises.map((exercicio, index) => (
                    <Exercicio
                    key={index}
                    nome={exercicio.name}
                    carga={exercicio.peso}
                    rep={exercicio.series}
                    obs={exercicio.obs}
                    type={exercicio.type}
                    />
                ))
            ):(
                exercicios.map((exercicio, index) => (
                    <Exercicio
                    key={index}
                    nome={exercicio.nome}
                    carga={exercicio.carga}
                    rep={exercicio.rep}
                    obs={exercicio.obs}
                    type={exercicio.type}
                    
                    />
                ))
            )}
           
            </div>
            {showModal && (
                    <Modal
                        setModal={() => {
                            setShowModal();

                        }}
                        idForm={form.id}
                    />
                )}
            </div>
        <div className="btn-div">
            <button className="btn-delete" onClick={() =>{handleDeleteTreino(id)}}>Excluir treino</button>
        </div>
        <FooterComp />
        </>
    );
  }
  
  export default Treino;