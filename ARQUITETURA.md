# Documento de Arquitetura - Sistema de Gestão de Membros e Negócios

## 1. Diagrama da Arquitetura

```mermaid
graph TD
  A[Frontend - Next.js] -->|API Requests| B[Backend - Node.js + Express]
  B --> C[(Banco de Dados - PostgreSQL)]
  B --> D[Serviço de Emails / Notificações]
  B --> E[Autenticação JWT]
  A --> F[Armazenamento Local - token, preferências]
```

## 1️⃣ Visão Geral do Sistema

O sistema é uma **plataforma de gestão de membros, intenções, reuniões e negócios**. Ele foi desenvolvido com:

- **Frontend:** Next.js 14 (React)  
- **Backend:** Node.js + Express  
- **Banco de Dados:** PostgreSQL 

---

## 2. Modelo de Dados (PostgreSQL)

PostgreSQL é relacional, maduro e confiável, ideal para relacionamentos entre membros, reuniões e pagamentos.

### Tabelas Principais

**members**
| Campo        | Tipo       | Observações                 |
|--------------|-----------|----------------------------|
| id           | SERIAL PK |                              |
| name         | VARCHAR   |                              |
| email        | VARCHAR   | Único                        |
| password     | VARCHAR   | Hash                        |
| phone        | VARCHAR   | Opcional                     |
| role         | VARCHAR   | 'member' ou 'admin'         |
| status       | BOOLEAN   | Ativo ou inativo             |
| createdAt    | TIMESTAMP |                              |
| updatedAt    | TIMESTAMP |                              |

**intentions**
| Campo        | Tipo       | Observações                 |
|--------------|-----------|----------------------------|
| id           | SERIAL PK |                              |
| name         | VARCHAR   |                              |
| email        | VARCHAR   |                              |
| phone        | VARCHAR   |                              |
| message      | TEXT      |                              |
| status       | BOOLEAN   | Aceita ou recusada           |
| createdAt    | TIMESTAMP |                              |
| updatedAt    | TIMESTAMP |                              |

**invitations**
| Campo         | Tipo      | Descrição         |
| ---------     | --------- | ----------------- |
| id            | serial    | PK                |
| intention_id  | int       | FK → Members      |
| token         | varchar   | Token de convite  |
| used          | BOOLEAN   | Validar Convite   |
| expires_at    | timestamp | Data de expiração |
| createdAt     | timestamp | Criação           |
| updatedAt     | TIMESTAMP |                   | 

**businesses**

| Campo        | Tipo      | Descrição                 |
| ------------ | --------- | ------------------------- |
| id           | serial    | PK                        |
| fromMemberId | int       | FK → Members              |
| toMemberId   | int       | FK → Members              |
| status       | varchar   | pendente/aceito/concluído |
| description  | text      | Detalhes do negócio       |
| thankYou     | boolean   | Registro de agradecimento |
| createdAt    | timestamp | Criação                   |

**meetings**

| Campo     | Tipo      | Descrição            |
| --------- | --------- | -------------------- |
| id        | serial    | PK                   |
| member1Id | int       | FK → Members         |
| member2Id | int       | FK → Members         |
| type      | varchar   | 1a1 / grupo          |
| status    | varchar   | agendada / realizada |
| date      | timestamp | Data e hora          |
| checkIn   | boolean   | Presença confirmada  |

**meetings**

| Campo     | Tipo      | Descrição            |
| --------- | --------- | -------------------- |
| id        | serial    | PK                   |
| member1Id | int       | FK → Members         |
| member2Id | int       | FK → Members         |
| type      | varchar   | 1a1 / grupo          |
| status    | varchar   | agendada / realizada |
| date      | timestamp | Data e hora          |
| checkIn   | boolean   | Presença confirmada  |

**payments**

| Campo     | Tipo      | Descrição            |
| --------- | --------- | -------------------- |
| id        | serial    | PK                   |
| memberId  | int       | FK → Members         |
| amount    | decimal   | Valor da mensalidade |
| status    | varchar   | pendente / pago      |
| dueDate   | timestamp | Data de vencimento   |
| createdAt | timestamp | Criação              |

---

## 3. Estrutura de Componentes Frontend (Next.js)

**Pastas sugeridas:**

```
/frontend
  /app
    /dashboard
      page.tsx              # Dashboard geral
      /listintentions
        page.tsx           # Lista de intenções
      /members
        page.tsx           # Gestão de membros
      /notifications
        page.tsx           # Avisos para membros
      /meetings
        page.tsx           # Controle de reuniões
      /businesses
        page.tsx           # Sistema de negócios
      /payments
        page.tsx           # Controle financeiro
    /intention
      page.tsx             # Formulário de intenção
    /invitation
      /[token]
        page.tsx           # Cadastro via convite
    /login
      page.tsx
  /src
    /components
      Card.tsx
      GlobalModal.tsx
    /context
      ModalContext.tsx
    /hooks
      /intentions
        useDeleteIntentions.ts
        useGetIntentions.ts
        useInsertIntentions.ts
        useListIntentions.ts
      /invitations
        useInsertInvitation.ts
      /login
        useLogin.ts
        useLogout.ts
      /members
        useInsertMember.ts
        useApproveMember.ts
      /businesses
        useInsertBusiness.ts
        useUpdateBusiness.ts
      /meetings
        useInsertMeeting.ts
        useCheckIn.ts
      /payments
        useInsertPayment.ts
        useUpdatePayment.ts
    useAuth.ts
    useForm.ts


```


## Observações sobre a Estrutura

1. **app/**  
   Contém as telas principais da aplicação utilizando o App Router do Next.js. Cada pasta dentro de `app` representa uma rota.

2. **src/components/**  
   Componentes reutilizáveis da interface, como cards e modais.

3. **src/context/**  
   Contextos globais que gerenciam estados compartilhados, como modais e autenticação.

4. **src/hooks/**  
   Hooks para lógica específica de cada funcionalidade: intenções, convites, login e membros. Permitem separar a lógica de negócios da UI.

5. **useAuth.ts e useForm.ts**  
   Hooks globais para autenticação e gerenciamento de formulários, utilizados em várias telas.

---

## Fluxo de Uso

flowchart TD
    A[Visitante acessa o site] --> B[Preenche formulário de intenção]
    B --> C[Intenção enviada para aprovação]
    C -->|Aprovada| D[Membro recebe convite por email]
    C -->|Recusada| E[Mensagem de recusa enviada]

    D --> F[Membro completa cadastro com senha e dados]
    F --> G[Login no sistema]
    
    G --> H[Dashboard do Membro]
    
    H --> I[Ver avisos e comunicados]
    H --> J[Registrar presença em reunião (check-in)]
    H --> K[Ver ou registrar negócios]
    K --> L[Acompanhar status do negócio]
    L --> M[Registrar "Obrigado" quando negócio concluído]
    
    H --> N[Participar de reuniões 1 a 1]
    N --> O[Acessar histórico de reuniões e desempenho]
    
    H --> P[Ver dashboard financeiro]
    P --> Q[Gerenciar mensalidades: status, pagamentos, datas]

    style A fill:#f9f,stroke:#333,stroke-width:1px
    style H fill:#bbf,stroke:#333,stroke-width:1px
    style G fill:#bfb,stroke:#333,stroke-width:1px




---

## Descrição do Fluxo

### 1. Intenção de Participação

* Visitante preenche um formulário público.
* Administrador aprova ou recusa a intenção.
* Se aprovado, um convite é gerado com token único.

### 2. Cadastro do Membro

* Membro acessa o link do convite.
* Completa o cadastro e cria senha.
* Login realizado com autenticação JWT.

### 3. Dashboard

Acesso aos principais módulos:

* Avisos / Comunicados
* Controle de presença em reuniões (check-in)
* Negócios: criar, acompanhar status, registrar agradecimentos
* Reuniões 1 a 1: histórico e check-in
* Financeiro: mensalidades e status de pagamento

### 4. Comunicação e Engajamento

* Notificações via sistema e e-mail.
* Check-in em reuniões atualiza o status do membro.

### 5. Geração de Negócios

* Sistema de referências entre membros.
* Acompanhamento do status das referências.
* Registro de agradecimentos públicos quando negócios são concluídos.

### 6. Financeiro

* Módulo de mensalidades gera cobranças automaticamente.
* Membro acompanha status de pagamento.


---

## 4. Definição da API (Node.js + Express)

A API segue o padrão REST, utiliza JWT para autenticação e é estruturada em rotas específicas para cada domínio do sistema: intenções, convites, membros, negócios, reuniões e financeiro.

### 1. Auth

| Método | Endpoint          | Descrição              |
| ------ | ----------------- | ---------------------- |
| POST   | /api/login        | Login e geração de JWT |

```http
Request Body:
{
    "email":"admin@admin.com",
    "password":"123456"
}
Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTc2Mjc4NDQ1NiwiZXhwIjoxNzYyNzg4MDU2fQ.z4eIhgku5ukwXC7O5HdNhV5OOsFCEA5tiRO_SYMoVic"
}
```

### 2. Intenções de Participação (Intents)

| Método | Endpoint                 | Descrição          |
| ------ | ------------------------ | ------------------ |
| POST   | /api/intents             | Registrar intenção |
| GET    | /api/listintentions      | Listar intenções   |
| DELETE | /api/intents/:id         | Recusar intenção   |

POST /api/intents

```http
Request Body:
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999"
}

Response:
{
    "message": "Intenção registrada com Sucesso!"
}
```

DELETE /api/intents/:id/

```http
Response:
{
    "message": "Intenção 3 desativada"
}
```


### 3. Convites (Invites)

| Método | Endpoint          | Descrição                |
| ------ | ----------------- | ------------------------ |
| POST   | /api/invites/:id  | Criar convite            |
| GET    | /api/invites      | listar Convites          |

**OBS: Usar o id da intenção.**

POST /api/invites/:id

```http
Response:
{
    "token_invitation": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlRlc3RlIGNvbSBNb2RhbCIsImlhdCI6MTc2Mjc4NTU5Mn0.jSDKn-9W1u1cH7Ye0dGQ1I0YOIlXLx11h-3bchhBFOI"
}
```

GET /api/invites/1

```http
Response:
{
    id:1,       
    intention_id:2,  
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlRlc3RlIGNvbSBNb2RhbCIsImlhdCI6MTc2Mjc4NTU5Mn0.jSDKn-9W1u1cH7Ye0dGQ1I0YOIlXLx11h-3bchhBFOI"     
    used:true,
    expires_at:"2025-11-14 21:58:39.204-03"
}
```

### 4. Membros (Members)

| Método | Endpoint         | Descrição          |
| ------ | ---------------- | ------------------ |
| POST   | /api/members     | Criar membro       |
| GET    | /api/members     | Listar membros     |
| GET    | /api/members/:id | Obter dados membro |
| PATCH  | /api/members/:id | Atualizar membro   |

POST/api/members

```http
Request Body:
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "$2b$10$7G9xqE5RkY3p8L1yFZ4tUu1B1O8kX6L0w9e5Q1R8vH2Z7jF4yX9Cm", 
  "phone": "+55 11 91234-5678",
  "role": "member",
  "status": "active"
}
Response:
{
    "mensagem": "Membro Cadastrado com Sucesso!"
}
```

### 5. Reuniões (Meetings)

| Método | Endpoint                     | Descrição          |
| ------ | ---------------------------- | ------------------ |
| POST   | /api/meetings                | Criar reunião      |
| GET    | /api/meetings                | Listar reuniões    |
| POST   | /api/meetings/:id/checkin    | Registrar presença |
| GET    | /api/meetings/:id/attendance | Lista presença     |

POST /api/meetings

```http
Request Body:
{
  "date": "2025-01-01",
  "location": "Auditório A"
}

Response:
{
  "id": 44,
  "date": "2025-01-01",
  "location": "Auditório A"
}
```

POST /api/meetings/:id/checkin

```http
Response:
{
  "meetingId": 44,
  "memberId": 10,
  "checked": true
}
```

### 6. Negócios (Businesses)

| Método | Endpoint                   | Descrição        |
| ------ | -------------------------- | ---------------- |
| POST   | /api/businesses            | Criar negócio    |
| GET    | /api/businesses            | Listar           |
| GET    | /api/businesses/:id        | Buscar por id    |
| PATCH  | /api/businesses/:id/status | Atualizar status |

POST /api/businesses

```http
Request Body:
{
  "fromMemberId": 10,
  "toMemberId": 22,
  "value": 900
}

Response:
{
  "id": 2,
  "status": "pending"
}
```
### 7. Agradecimentos (Thanks)

| Método | Endpoint    | Descrição               |
| ------ | ----------- | ----------------------- |
| POST   | /api/thanks | Registrar agradecimento |
| GET    | /api/thanks | Listar                  |

POST /api/thanks

```http
Request Body:
{
  "businessId": 2,
  "message": "Obrigado pelo fechamento!"
}

Response:
{
  "id": 1,
  "createdAt": "2025-01-02"
}
```

### 8. 1 a 1 (One-to-One)

| Método | Endpoint      | Descrição          |
| ------ | ------------- | ------------------ |
| POST   | /api/oneToOne | Registrar encontro |
| GET    | /api/oneToOne | Listar histórico   |

### 9. Financeiro (Billing)

| Método | Endpoint         | Descrição           |
| ------ | ---------------- | ------------------- |
| GET    | /api/billing     | Listar mensalidades |
| POST   | /api/billing/pay | Registrar pagamento |


---

**Observação final:**  
Esse documento cobre Frontend, Backend (Node + Express), banco de dados relacional, endpoints principais e fluxo de autenticação.

