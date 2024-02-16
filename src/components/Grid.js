import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
    //VER A PARTIR DOS 34MIN MAIS OU MENOS
    //NPM START PRA API E PRO FRONT
const Table = styled.table `
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`

export const Thead = styled.thead ``
export const Tbody = styled.tbody ``
export const Tr = styled.tr ``
export const Th = styled.th `
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && 'display: none'}
    }
`
export const Td = styled.td`
    padding: 15px;
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    width: ${(props) => (props.width ? props.width : 'auto')};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && 'display: none'}
    }
`;



const Grid = ({ saldo, ganhos, despesas, setGanhos, setOnEdit }) => {
    const handleEditGanho = (item) => {
        setOnEdit(item)
    }

    const handleDeleteGanho = async (id) => {
        await axios 
            .delete('http://localhost:8800/ganhos/' + id)
            .then(({ data }) => {
                const newArray = ganhos.filter((ganho) => ganho.id !== id)

                setGanhos(newArray)
                toast.success(data)
            })
            .catch(({ data }) => toast.error(data))

        setOnEdit(null)
    }


    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Ganhos:</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ganhos.map((item, y) => (
                    <Tr key={y}>
                        <Td width='30%'>{item.nomeGanho}</Td>
                        <Td width='30%'>{item.valorGanho} Reais</Td>
                        <Td style={{ textAlign: 'center' }} width='5%'> <FaEdit onClick={() => handleEditGanho(item)} /> </Td>
                        <Td style={{ textAlign: 'center' }} width='5%'> <FaTrash onClick={() => handleDeleteGanho(item.id)} /> </Td>
                    </Tr>
                ))}
            </Tbody>
            <Thead>
                <Tr>
                    <Th>Despesas:</Th>
                </Tr>
            </Thead>
            <Tbody>
                {despesas.map((item, z) => (
                    <Tr key={z}>
                        <Td width='30%'>{item.nomeDespesa}</Td>
                        <Td width='30%'>{item.valorDespesa} Reais</Td>
                        <Td style={{ textAlign: 'center' }} width='5%'> <FaEdit  /> </Td>
                        <Td style={{ textAlign: 'center' }} width='5%'> <FaTrash  /> </Td>
                    </Tr>
                ))}
            </Tbody>
            <Thead>
                <Tr>
                    <Th>Saldo:</Th>
                </Tr>
            </Thead>
            <Tbody>
                {saldo.map((item, x) => (
                    <Tr key={x}>
                        <Td width='30%' >{item.valorSaldo} Reais</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
  )
}

export default Grid