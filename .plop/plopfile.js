module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.hbs',
      },
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/index.ts',
        template:
          "export { {{pascalCase name}} } from './{{pascalCase name}}';",
      },
    ],
  });

  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.hbs',
      },
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/index.ts',
        template:
          "export { {{pascalCase name}} } from './{{pascalCase name}}';",
      },
    ],
  });

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
    ],
    actions: [
      // Index file
      {
        type: 'add',
        path: '../app/{{lowerCase name}}/page.tsx',
        template:
          "import { {{pascalCase name}}Page } from './{{pascalCase name}}Page';\n" +
          'export default {{pascalCase name}}Page;',
      },
      //Server component
      {
        type: 'add',
        path: '../app/{{lowerCase name}}/{{pascalCase name}}Page.tsx',
        templateFile: './plop-templates/Page/Page.hbs',
      },
      // Client component
      {
        type: 'add',
        path: '../app/{{lowerCase name}}/{{pascalCase name}}PageContainer.tsx',
        templateFile: './plop-templates/Page/PageContainer.hbs',
      },
    ],
  });
};
