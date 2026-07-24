// ESLint detecta errores y malas prácticas; 
import js from '@eslint/js';
import globals from 'globals';

export default [
    // Reglas recomendadas por ESLint
    js.configs.recommended,

    {
        languageOptions: {
            globals: {
                ...globals.node, // Variables globales de Node.js
                ...globals.es2021, // Funciones modernas de JavaScript
            },
        },

        rules: {
            // Detecta variables sin usar
            'no-unused-vars': [
                'error',
                {
                    // Ignora los parámetros que comiencen con "_"
                    argsIgnorePattern: '^_',

                    // Ignora los errores del catch que comiencen con "_"
                    caughtErrorsIgnorePattern: '^_',

                    // Ignora cualquier variable que comience con "_"
                    varsIgnorePattern: '^_',
                },
            ],

            // Obliga a usar ===
            eqeqeq: 'error',

            // Detecta código que nunca se ejecutará
            'no-unreachable': 'error',

            // Evita declarar una variable dos veces
            'no-redeclare': 'error',

            // Evita usar una variable antes de declararla
            'no-use-before-define': 'error',
        },
    },
];
