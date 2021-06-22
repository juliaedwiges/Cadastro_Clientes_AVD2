import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-color: #4b0082;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #5f9ea0;
  font-color: #4b0082;
`;

export const Tabela = styled.table`
  margin-top: 2rem;
  tr td {
    border: 1px solid #ddd;
  }
  tr:hover {
    background-color: #5f9ea0;
  }
  thead {
    background-color: #5f9ea0;
  }
`;

export const H1 = styled.h1`
  color: #5f9ea0;
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: #008cba;
  color: #f0f8ff;
`;
