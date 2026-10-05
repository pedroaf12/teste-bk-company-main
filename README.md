# E-Commerce Dashboard

Sistema de gestão e visualização de pedidos, produtos e custos para e-commerce, com dashboard de métricas financeiras.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para atender a necessidade de um cliente de e-commerce que precisava de visibilidade sobre suas operações financeiras. O sistema permite:

- ✅ Visualizar métricas consolidadas (faturamento, custos, lucro)
- ✅ Cadastrar produtos com preços de venda
- ✅ Registrar custos de produção de cada produto
- ✅ Receber pedidos via webhook de plataformas externas
- ✅ Filtrar dados por período
- ✅ Calcular lucro automaticamente

## 🏗️ Arquitetura

O projeto segue princípios SOLID e Clean Architecture:

```
├── backend/
│   ├── src/
│   │   ├── domain/           # Entidades e interfaces
│   │   │   ├── entities/     # Product, Order, ProductCost
│   │   │   └── repositories/ # Contratos (interfaces)
│   │   ├── infra/            # Implementações
│   │   │   ├── http/         # Rotas e controllers
│   │   │   └── repositories/ # Repositórios em memória
│   │   └── server.ts         # Configuração do servidor
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── services/         # Chamadas à API
│   │   ├── types/            # TypeScript interfaces
│   │   └── styles/           # CSS global
```

## 🚀 Tecnologias

### Backend
- **Node.js** com **Express**
- **TypeScript**
- **Zod** (validação de schemas)
- **CORS** (comunicação frontend-backend)
- Repositórios em memória (sem banco de dados)

### Frontend
- **React 18** com **TypeScript**
- **Vite** (build tool)
- **React Router DOM** (navegação)
- **Axios** (requisições HTTP)
- **React Icons** (ícones)
- CSS moderno com animações

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ ou Bun
- npm ou yarn

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3001`

## 🔌 API Endpoints

### Produtos

**POST** `/products`
```json
{
  "id": "SKU-001",
  "name": "Camiseta Básica",
  "price": 49.90
}
```

**GET** `/products`

### Custos de Produto

**POST** `/product-costs`
```json
{
  "productId": "SKU-001",
  "cost": 25.00
}
```

**GET** `/product-costs`

### Pedidos (Webhook)

**POST** `/orders/webhook`
```json
{
  "id": "ORD-98432",
  "buyer": {
    "buyerName": "Maria Souza",
    "buyerEmail": "maria@email.com"
  },
  "lineItems": [
    {
      "itemId": "P-001",
      "itemName": "Camiseta Básica",
      "qty": 2,
      "unitPrice": 49.90
    }
  ],
  "totalAmount": 99.80,
  "createdAt": "2025-02-10T14:32:00Z"
}
```

**GET** `/orders`

### Dashboard

**GET** `/dashboard?start=2025-01-01&end=2025-12-31`

Retorna:
```json
{
  "totalOrders": 10,
  "totalRevenue": 1500.00,
  "totalCost": 800.00,
  "profit": 700.00
}
```

## 💡 Funcionalidades

### Dashboard (Página Principal)

1. **Métricas Consolidadas**
   - Lucro
   - Faturamento
   - Custo Total
   - Total de Pedidos

2. **Filtro por Período**
   - Selecione data inicial e final
   - Clique em "Filtrar" para atualizar métricas

3. **Pedidos Recentes**
   - Últimos 5 pedidos recebidos
   - Informações: ID, Cliente, Data, Total

4. **Listagem de Produtos**
   - Produtos cadastrados com preços
   - Botão "Novo" para adicionar produtos

5. **Custos de Produto**
   - Visualização e edição de custos
   - Ícone de edição para atualizar valores

## 🎨 Interface

O sistema possui uma interface moderna e responsiva com:

- Design limpo e minimalista
- Modais animados para cadastros
- Cards com métricas destacadas
- Tabelas organizadas
- Feedback visual em todas as interações

## 🧪 Testando o Sistema

### 1. Cadastrar um Produto

1. Acesse `http://localhost:3001`
2. Na seção "Produtos", clique em "Novo"
3. Preencha: ID (ex: SKU-001), Nome, Preço
4. Clique em "Criar Produto"

### 2. Definir Custo do Produto

1. Na seção "Custos de Produto"
2. Clique no ícone de edição ao lado do produto
3. Informe o custo de produção
4. Clique em "Salvar"

### 3. Simular Pedido via Webhook

Use cURL, Postman ou Insomnia:

```bash
curl -X POST http://localhost:3000/orders/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ORD-001",
    "buyer": {
      "buyerName": "João Silva",
      "buyerEmail": "joao@email.com"
    },
    "lineItems": [
      {
        "itemId": "SKU-001",
        "itemName": "Camiseta Básica",
        "qty": 2,
        "unitPrice": 49.90
      }
    ],
    "totalAmount": 99.80,
    "createdAt": "2025-02-12T10:00:00Z"
  }'
```

### 4. Visualizar Dashboard

1. Selecione o período desejado
2. Clique em "Filtrar"
3. Veja as métricas atualizadas

## 🔒 Princípios SOLID Aplicados

- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Sistema aberto para extensão, fechado para modificação
- **L**iskov Substitution: Interfaces bem definidas para substituição
- **I**nterface Segregation: Interfaces específicas por funcionalidade
- **D**ependency Inversion: Dependência de abstrações, não implementações

## 📝 Estrutura de Dados

### Product (Produto)
```typescript
{
  id: string;        // SKU ou código único
  name: string;      // Nome do produto
  price: number;     // Preço de venda
}
```

### ProductCost (Custo de Produto)
```typescript
{
  productId: string; // Referência ao produto
  cost: number;      // Custo de produção
}
```

### Order (Pedido)
```typescript
{
  id: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}
```
