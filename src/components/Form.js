import axios from "axios";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form `
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div `
    display: flex;
    flex-direction: column;
`;

const Input = styled.input `
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label ``;

const Button = styled.button `
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getGanhos }) => {
    const nomeGanhoRef = useRef();
    const valorGanhoRef = useRef();

    useEffect(() => {
        if (onEdit) {
            nomeGanhoRef.current.value = onEdit.nomeGanho;
            valorGanhoRef.current.value = onEdit.valorGanho;
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const nomeGanho = nomeGanhoRef.current.value;
        const valorGanho = valorGanhoRef.current.value;

        console.log('teste1')
        console.log(nomeGanho)
        if (!nomeGanho || !valorGanho) {
            return toast.warn('Preencha todos os campos')
        }
        console.log('teste2')
        if (onEdit) {
            await axios
            .put(`http://localhost:8800/ganhos/${onEdit.id}`, {
                nomeGanho,
                valorGanho,
            })
            .then(({ data }) => {
                    console.log(data)
                    toast.success(data)
                    setOnEdit(null);
                    getGanhos();
                })
                .catch(({ data }) => toast.error(data))
        }
        else {
            await axios
                .post('http://localhost:8800/ganhos', {
                    nomeGanho,
                    valorGanho,
                })
                .then(({ data }) => {
                    console.log(data)
                    toast.success(data)
                    getGanhos()
                })
                .catch(({ data }) => toast.error(data))
        }
        console.log('teste3')
        nomeGanhoRef.current.value = '';
        valorGanhoRef.current.value = '';
    }

    return (
        <FormContainer onSubmit={handleSubmit} >
            <InputArea>
                <Label>Saldo:</Label>
                <Input type="number"></Input>
            </InputArea>
            <InputArea>
                <Label>Ganhos:</Label>
                <Input type="number" ref={valorGanhoRef} />
                <Input name='nomeGanho' type="text" ref={nomeGanhoRef} />
            </InputArea>
            <InputArea>
                <Label>Despesas:</Label>
                <Input type="number"></Input>
                <Input name='nomeDespesa' type="text"></Input>
            </InputArea>
            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}

export default Form;