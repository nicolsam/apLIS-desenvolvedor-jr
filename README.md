# apLIS - Painel de Gestão

This project has bilingual documentation. Please select your language:

## Documentação / Documentation

- [Português (Brasil)](docs/README.pt-BR.md)
- [English](docs/README.en-EN.md)

---

## Quick Start

```bash
# Clone the repository
git clone <repository-url>

# Start the application with Docker
docker compose up -d

# Access the application
# Frontend: http://localhost:5174
# PHP API (Médicos): http://localhost:9000
# Node API (Pacientes): http://localhost:3000
# phpMyAdmin: http://localhost:8080
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TailwindCSS, react-i18next |
| Backend (Médicos) | PHP 8.3, PHPUnit |
| Backend (Pacientes) | Node.js, Express, Jest |
| Database | MySQL |
| Infrastructure | Docker, Nginx |