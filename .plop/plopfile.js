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
};
