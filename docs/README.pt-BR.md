# Painel apLIS

## Sobre o projeto

O apLIS é um sistema de gestão para clínicas médicas que permite o cadastro e gerenciamento de médicos e pacientes. O projeto foi desenvolvido como desafio técnico para a posição de desenvolvedor júnior e contempla um backend com duas APIs distintas (PHP e Node.js), um frontend em React, e toda a infraestrutura necessária para execução via Docker.

Este sistema permite cadastrar médicos com CRM e UF, além de pacientes com dados pessoais, CPF e número de carteirinha. Cada registro pode ser editado ou removido (soft delete), com funcionalidade de desfazer exclusão disponível por 5 segundos após a remoção.

---

## Sumário

1. [Sobre o projeto](#sobre-o-projeto)
2. [Tecnologias utilizadas](#tecnologias-utilizadas)
3. [Funcionalidades](#funcionalidades)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Autor](#autor)

---

## Tecnologias utilizadas

### Backend

O backend é composto por duas APIs separadas, cada uma utilizando tecnologias distintas:

**API de Médicos (PHP)**
- PHP 8.3 com arquitetura MVC
- PHPUnit para testes unitários
- Banco de dados MySQL
- Nginx como servidor web

**API de Pacientes (Node.js)**
- Node.js com Express
- Jest para testes unitários
- Knex.js como query builder
- Banco de dados MySQL

### Frontend

- React 19
- TailwindCSS para estilização
- react-i18next para internacionalização
- react-router-dom para navegação
- Zod para validação de formulários

### DevOps & Infraestrutura

- Docker e Docker Compose para containerização
- Nginx como proxy reverso
- phpMyAdmin para administração do banco de dados

---

## Funcionalidades

### Cadastro de Médicos
- Criação de novos médicos com nome, CRM e UF
- Listagem de todos os médicos ativos
- Edição de dados do médico
- Remoção com soft delete e possibilidade de undo

### Cadastro de Pacientes
- Criação de novos pacientes com nome, data de nascimento, CPF e número de carteirinha
- Listagem de todos os pacientes ativos
- Edição de dados do paciente
- Remoção com soft delete e possibilidade de undo

### Configurações
- Seleção de idioma (Português Brasil / Inglês)
- Seleção de formato de data (DD/MM/YYYY ou MM/DD/YYYY)

### Internacionalização
- Interface completamente traduzida
- Mensagens de erro do backend traduzidas
- Suporte a múltiplos idiomas via header Accept-Language

---

## Estrutura de pastas

```
apLIS-desenvolvedor-jr/
├── app/                     # Frontend React
│   ├── src/
│   │   ├── api/            # Funções de chamada à API
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   ├── locales/        # Arquivos de tradução
│   │   ├── pages/          # Páginas da aplicação
│   │   └── validation/     # Schemas de validação
│   └── package.json
│
├── backendphp/             # API de Médicos (PHP)
│   ├── config/             # Configurações de banco de dados
│   ├── public/             # Ponto de entrada
│   ├── src/
│   │   ├── Controller/     # Controladores
│   │   ├── Model/          # Modelos
│   │   └── Translator.php  # Traduções
│   ├── tests/              # Testes PHPUnit
│   ├── composer.json
│   └── phpunit.xml
│
├── backendjs/              # API de Pacientes (Node.js)
│   ├── src/
│   │   ├── Controller/     # Controladores
│   │   ├── Model/          # Modelos
│   │   └── Translator.js   # Traduções
│   ├── migrations/         # Migrações Knex
│   ├── tests/              # Testes Jest
│   ├── knexfile.js
│   └── package.json
│
├── docs/                   # Documentação
│   └── README.md
│
├── docker-compose.yml      # Configuração Docker
└── nginx.conf              # Configuração Nginx
```

---

## Autor

[Nicolas Samuel](https://www.linkedin.com/in/nicolas-samuel-veras/)

[![Email][email-shield]][email-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Behance][behance-shield]][behance-url]

<!-- MARKDOWN LINKS & IMAGES -->
[email-shield]: https://img.shields.io/badge/-contato%40nicolsam.com.br-white?style=for-the-badge&logo=gmail&logoColor=#ee4236
[email-url]: mailto:contato@nicolsam.com.br?subject=Re:Olá!
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-white.svg?style=for-the-badge&logo=linkedin-white&colorB=0078b5
[linkedin-url]: https://www.linkedin.com/in/nicolas-samuel-veras/
[behance-shield]: https://img.shields.io/badge/Behance-0054F7?style=for-the-badge&logo=behance&colorB=0959ff
[behance-url]: https://www.behance.net/nicolsam