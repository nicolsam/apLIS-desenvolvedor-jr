# Painel apLIS
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRAFT+WITH&secondaryLabel=JAVASCRIPT&primaryBGColor=%23edc70e&primaryTextColor=%232f3600&secondaryBGColor=%23ffff13&secondaryTextColor=%232f3600&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=javascript&secondaryIconColor=%232f3600&secondaryIconSize=16&secondaryIconPosition=left)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRAFT+WITH&secondaryLabel=PHP&primaryBGColor=%237b7fb5&primaryTextColor=%23ffffff&secondaryBGColor=%234b4e8a&secondaryTextColor=%23ffffff&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=php&secondaryIconColor=%237b7fb5&secondaryIconSize=16&secondaryIconPosition=left)](https://vite.dev/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRAFT+WITH&secondaryLabel=REACT&primaryBGColor=%2358c6de&primaryTextColor=%232f3600&secondaryBGColor=%232d7080&secondaryTextColor=%23ffffff&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=reactquery&secondaryIconColor=%2358c6de&secondaryIconSize=16&secondaryIconPosition=left)](https://react.dev/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRAFT+WITH&secondaryLabel=DOCKER&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=docker&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://www.docker.com/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## About the project

apLIS is a medical clinic management system that allows the registration and management of doctors and patients. The project was developed as a technical challenge for the junior developer position and includes a backend with two distinct APIs (PHP and Node.js), a React frontend, and all the necessary infrastructure for running via Docker.

This system allows registering doctors with CRM and UF, as well as patients with personal details, CPF, and insurance card number. Each record can be edited or removed (soft delete), with an undo feature available for 5 seconds after removal.

---

## Table of Contents

1. [About the project](#about-the-project)
2. [Technologies used](#technologies-used)
3. [Features](#features)
4. [Folder structure](#folder-structure)
5. [Author](#author)

---

## Technologies used

### Backend

The backend consists of two separate APIs, each using different technologies:

**Doctors API (PHP)**
- PHP 8.3 with MVC architecture
- PHPUnit for unit testing
- MySQL database
- Nginx as web server

**Patients API (Node.js)**
- Node.js with Express
- Jest for unit testing
- Knex.js as query builder
- MySQL database

### Frontend

- React 19
- TailwindCSS for styling
- react-i18next for internationalization
- react-router-dom for navigation
- Zod for form validation

### DevOps & Infrastructure

- Docker and Docker Compose for containerization
- Nginx as reverse proxy
- phpMyAdmin for database administration

---

## Features

### Doctor Registration
- Create new doctors with name, CRM and UF
- List all active doctors
- Edit doctor information
- Remove with soft delete and undo option

### Patient Registration
- Create new patients with name, birth date, CPF and insurance card number
- List all active patients
- Edit patient information
- Remove with soft delete and undo option

### Settings
- Language selection (Brazilian Portuguese / English)
- Date format selection (DD/MM/YYYY or MM/DD/YYYY)

### Internationalization
- Fully translated interface
- Backend error messages translated
- Support for multiple languages via Accept-Language header

---

## Folder Structure

```
apLIS-desenvolvedor-jr/
├── app/                     # React Frontend
│   ├── src/
│   │   ├── api/            # API call functions
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── locales/        # Translation files
│   │   ├── pages/          # Application pages
│   │   └── validation/     # Validation schemas
│   └── package.json
│
├── backendphp/             # Doctors API (PHP)
│   ├── config/             # Database configuration
│   ├── public/             # Entry point
│   ├── src/
│   │   ├── Controller/     # Controllers
│   │   ├── Model/          # Models
│   │   └── Translator.php  # Translations
│   ├── tests/              # PHPUnit tests
│   ├── composer.json
│   └── phpunit.xml
│
├── backendjs/              # Patients API (Node.js)
│   ├── src/
│   │   ├── Controller/     # Controllers
│   │   ├── Model/          # Models
│   │   └── Translator.js   # Translations
│   ├── migrations/         # Knex migrations
│   ├── tests/              # Jest tests
│   ├── knexfile.js
│   └── package.json
│
├── docs/                   # Documentation
│   └── README.md
│
├── docker-compose.yml      # Docker configuration
└── nginx.conf              # Nginx configuration
```

---

## Author

[Nicolas Samuel](https://www.linkedin.com/in/nicolas-samuel-veras/)

[![Email][email-shield]][email-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Behance][behance-shield]][behance-url]

<!-- MARKDOWN LINKS & IMAGES -->
[email-shield]: https://img.shields.io/badge/-contato%40nicolsam.com.br-white?style=for-the-badge&logo=gmail&logoColor=#ee4236
[email-url]: mailto:contato@nicolsam.com.br?subject=Re:Hello!
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-white.svg?style=for-the-badge&logo=linkedin-white&colorB=0078b5
[linkedin-url]: https://www.linkedin.com/in/nicolas-samuel-veras/
[behance-shield]: https://img.shields.io/badge/Behance-0054F7?style=for-the-badge&logo=behance&colorB=0959ff
[behance-url]: https://www.behance.net/nicolsam
