import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Link
  } from 'react-router-dom'


const Series = () => {
    const [ data, setData ] = useState([])
    useEffect(() => {
        axios
            .get('/api/series/')//Carregar os dados
            .then(res => {
            setData(res.data.data)
        })
    }, [])

    const deleteSeries = id => {
        axios
        .delete('/api/series/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
            <th><button className='btn btn-danger' onClick={() => deleteSeries(record.id)}>Remover</button>
            <Link to={'/series/' + record.id} className='btn btn-warning' >Info</Link></th>            
           </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'>
            <h1>Séries</h1>
            <div><Link to='/series/novo' className='btn btn-primary'>Nova Séries</Link></div>
            <div className='alert alert-warning' role='alert'>
                Você não possui séries criados
            </div>
         </div>   
        )
    }

    return (
    <div className='container'>
        <h1>Séries</h1>
        <div><Link to='/series/novo' className='btn btn-primary'>Nova Séries</Link></div>
        <table className='table table-dark'>
  <thead>
        <tr>
        <th scope='col'>ID</th>
        <th scope='col'>Nome</th>  
        <th scope='col'>Ações</th>       
        </tr>
    </thead>
    <tbody>
        {data.map(renderizaLinha)}
    </tbody>
    </table>        
    </div>
    )
  }

  export default Series