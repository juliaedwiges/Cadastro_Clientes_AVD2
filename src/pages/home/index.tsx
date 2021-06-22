/* eslint-disable jsx-a11y/label-has-associated-control */
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, Tabela, H1, Button } from './styles';

interface ICliente {
  id: string;
  cliente: string;
  telefone: string;
  email: string;
}

interface INovoCliente {
  cliente: string;
  telefone: string;
  email: string;
}

const Home: React.FC = () => {
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [clientes, setClientes] = useState<ICliente[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/clients',
    })
      .then((response: AxiosResponse<ICliente[]>) => {
        setClientes(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  function submitForm(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    const obj: INovoCliente = {
      cliente,
      telefone,
      email,
    };

    axios({
      method: 'post',
      url: 'http://localhost:3333/clients',
      data: obj,
    })
      .then((response: AxiosResponse<ICliente>) => {
        const novoCliente: ICliente = {
          id: response.data.id,
          cliente: response.data.cliente,
          telefone: response.data.telefone,
          email: response.data.email,
        };
        setClientes([...clientes, novoCliente]);

        setCliente('');
        setTelefone('');
        setEmail('');
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function deletarCliente(clienteID: string): void {
    axios({
      method: 'delete',
      url: `http://localhost:3333/clients/${clienteID}`,
    })
      .then((response: AxiosResponse<ICliente>) => {
        const novosClientes = clientes.filter(cl => {
          return cl.id !== clienteID;
        });
        setClientes(novosClientes);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <H1>Cadastrar Clientes</H1>
      <Form onSubmit={submitForm}>
        <label>Nome:</label>
        <input
          placeholder="Digite o nome do cliente"
          value={cliente}
          onChange={(e: any) => {
            setCliente(e.target.value);
          }}
        />
        <label>Telefone:</label>
        <input
          placeholder="Digite o telefone"
          value={telefone}
          onChange={(e: any) => {
            setTelefone(e.target.value);
          }}
        />

        <label>E-mail:</label>
        <input
          placeholder="Digite o email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />

        <Button type="submit">Cadastrar Cliente</Button>
      </Form>
      <Tabela>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Telefone</td>
            <td>E-mail</td>
            <td> </td>
          </tr>
        </thead>

        <tbody>
          {clientes.map(item => {
            return (
              <tr key={item.id}>
                <td> {item.cliente} </td>
                <td> {item.telefone} </td>
                <td> {item.email} </td>
                <td>
                  <Button type="button">
                    <Link to={`/editar/${item.id}`}>Alterar</Link>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      deletarCliente(item.id);
                    }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tabela>
    </Container>
  );
};

export default Home;
