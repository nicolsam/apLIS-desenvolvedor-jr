# Painel apLIS

> 📄 Esta é a versão em Português. 
> 
> [Switch to English](./docs/README.en-EN.md)

[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=JAVASCRIPT&primaryBGColor=%23edc70e&primaryTextColor=%232f3600&secondaryBGColor=%23ffff13&secondaryTextColor=%232f3600&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=javascript&secondaryIconColor=%232f3600&secondaryIconSize=16&secondaryIconPosition=left)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=PHP&primaryBGColor=%237b7fb5&primaryTextColor=%23ffffff&secondaryBGColor=%234b4e8a&secondaryTextColor=%23ffffff&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=php&secondaryIconColor=%237b7fb5&secondaryIconSize=16&secondaryIconPosition=left)](https://www.php.net/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=REACT&primaryBGColor=%2358c6de&primaryTextColor=%232f3600&secondaryBGColor=%232d7080&secondaryTextColor=%23ffffff&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=reactquery&secondaryIconColor=%2358c6de&secondaryIconSize=16&secondaryIconPosition=left)](https://react.dev/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=DOCKER&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=docker&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://www.docker.com/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## Sobre o projeto

O apLIS é um sistema de gestão para clínicas médicas que permite o cadastro e gerenciamento de médicos e pacientes. O projeto foi desenvolvido como desafio técnico para a posição de desenvolvedor júnior e contempla um backend com duas APIs distintas (PHP e Node.js), um frontend em React, e toda a infraestrutura necessária para execução via Docker.

Este sistema permite cadastrar médicos com CRM e UF, além de pacientes com dados pessoais, CPF e número de carteirinha. Cada registro pode ser editado ou removido (soft delete), com funcionalidade de desfazer exclusão disponível por 5 segundos após a remoção.

---

## Sumário

1. [Sobre o projeto](#sobre-o-projeto)
2. [Como executar localmente](#como-executar-localmente)
3. [Testes](#testes)
4. [Tecnologias utilizadas](#tecnologias-utilizadas)
5. [Funcionalidades](#funcionalidades)
6. [Estrutura de pastas](#estrutura-de-pastas)
7. [Autor](#autor)

---

## Como executar localmente

### Pré-requisitos

- Docker e Docker Compose instalados
- Git instalado

### Passo a passo

```bash
# 1. Clone o repositório
git clone <repository-url>
cd apLIS-desenvolvedor-jr

# 2. Copie o arquivo de exemplo e configure as variáveis de ambiente (opcional)
cp .env.example .env

# 3. Inicie os containers
docker compose up -d

# 3. Aguarde todos os serviços iniciarem (aproximadamente 30 segundos)

# 4. Acesse os serviços:
# Frontend (React):     http://localhost:5174
# API PHP (Médicos):    http://localhost:9000
# API Node (Pacientes): http://localhost:3000
# phpMyAdmin:           http://localhost:8080
```

### Credenciais

| Serviço | Usuário | Senha |
|---------|---------|-------|
| MySQL | root | root_password |
| phpMyAdmin | root | root_password |

### Comandos úteis

```bash
# Ver logs dos containers
docker compose logs -f

# Parar os containers
docker compose down

# Rebuild e iniciar (após alterações)
docker compose build
docker compose up -d

# Executar testes do backend PHP
docker compose exec php php vendor/bin/phpunit

# Executar testes do backend Node.js
docker compose exec nodejs npm test
```

### Estrutura dos endpoints

**API de Médicos (PHP)**
- `GET /api/v1/medicos` - Listar médicos
- `GET /api/v1/medicos/:id` - Buscar médico por ID
- `POST /api/v1/medicos` - Criar médico
- `PUT /api/v1/medicos/:id` - Atualizar médico
- `DELETE /api/v1/medicos/:id` - Remover médico (soft delete)
- `POST /api/v1/medicos/:id/restore` - Restaurar médico removido

**API de Pacientes (Node.js)**
- `GET /api/v1/pacientes` - Listar pacientes
- `GET /api/v1/pacientes/:id` - Buscar paciente por ID
- `POST /api/v1/pacientes` - Criar paciente
- `PUT /api/v1/pacientes/:id` - Atualizar paciente
- `DELETE /api/v1/pacientes/:id` - Remover paciente (soft delete)
- `POST /api/v1/pacientes/:id/restore` - Restaurar paciente removido

### Configuração de variáveis de ambiente

O projeto suporta configuração via arquivo `.env`. Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário.

```env
# Configuração do Banco de Dados
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root_password
DB_NAME=aplis_test

# Portas dos Serviços
PHP_PORT=9000
NODE_PORT=3000
NGINX_PORT=9000
FRONTEND_PORT=5174
PHPMYADMIN_PORT=8080
```

---

## Testes

O projeto inclui testes unitários para ambas as APIs backend, garantindo a qualidade e confiabilidade do código.

### Backend PHP (Médicos)

- Framework de testes: **PHPUnit**
- Cobertura: Controladores e Models
- Executar testes:
  ```bash
  docker compose exec php php vendor/bin/phpunit
  ```

### Backend Node.js (Pacientes)

- Framework de testes: **Jest**
- Cobertura: Controladores e Models
- Executar testes:
  ```bash
  docker compose exec nodejs npm test
  ```

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