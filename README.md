# MY PEARLS OF GREAT PRICE

![Logo](../assets/LogoBlack.svg)

MY PEARLS OF GREAT PRICE is an online digital memory book, which lets you upload
memories in the form of pictures, videos, audio. More than one of each category
can be uploaded in a single memory, as well as all combined and mixed up. These
memories can then be read, seen, and heard by registered fans, and can be
deleted and updated by the person who uploaded them or by the one who has an
admin role.

## Getting Started

These set of instructions will help you get a copy of this project locally for
development and testing purposes.

### Prerequisites

[Node.js](https://nodejs.org/en)(version 12.x or higher) - The JavaScript
runtime environment. It's used to run the application.
[npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) - Package
managers, which install the necessary libraries.

> [!IMPORTANT] In order to make sure you have these installed simply run
> `node -v` and `npm -v` in the terminal. This will display the current
> installed versions and confirm their installation.

## Installation

1. Clone the repository in your computer:

git clone https://github.com/lucarte/vite-memories

2. Navigate to the project directory

3. Install dependencies by running:

```sh
npm run dev
```

4. Now open the following file: `src/utils/http.ts` in the project and change
   the url to the one matching your Laravel-Backend-Endpoint. For example:

const BASE_URL = 'http://localhost:8000/api';

5. After changing the base URL, save the file and restart the React development
   server:

```sh
npm run start
```

## Login Credentials

#### Administrator Role

- E-Mail: luca@mail.com
- Passwort: Password?1

#### Regular User Role

- E-Mail: gabriel@mail.com
- Passwort: Password?1

## Runnig Tests

In order to run the Vitest Tests simply open the terminal and run this command:

```sh
npm run test
```

## Built with

The project was built using a range of varied technologies and libraries. Here
some of them:

## Built with

The project was built using a range of varied technologies and libraries. Here
are some of them:

- **[Vite](https://vitejs.dev/)**: A fast build tool and development server.
- **[React](https://reactjs.org/)**: A JavaScript library for building user
  interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript
  that adds static types.
- **[React Router](https://reactrouter.com/)**: A collection of navigational
  components that compose declaratively with your application.
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and
  extensible forms with easy-to-use validation.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for the
  browser and Node.js.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework
  for rapid UI development.
- **[MeiliSearch](https://www.meilisearch.com/)**: An open-source search engine
  that's easy to use and integrates seamlessly with your app.
- **[Heroicons](https://heroicons.com/)**: Beautiful hand-crafted SVG icons, by
  the makers of Tailwind CSS.
- **[Headless UI](https://headlessui.dev/)**: Completely unstyled, fully
  accessible UI components, designed to integrate beautifully with Tailwind CSS.

### Development Tools

- **[Vitest](https://vitest.dev/)**: A Vite-native unit test framework. It's
  fast!
- **[ESLint](https://eslint.org/)**: A static code analysis tool for identifying
  and fixing problems in JavaScript code.
- **[Testing Library](https://testing-library.com/)**: Simple and complete
  testing utilities that encourage good testing practices.

By utilizing these technologies, we ensure a robust, efficient, and scalable
application architecture.
