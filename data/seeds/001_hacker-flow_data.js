/** @format */

const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').insert([
    // # 1 user
    {
      // # 1 user
      username: 'mickey65',
      password: bcrypt.hashSync('123', 10),
      email: 'mickey@gmail.com',
      first_name: 'mickey',
      last_name: 'mouse',
      role: 'user',
    },
    // # 2 user
    {
      // # 2 user
      username: 'bri34fal',
      password: bcrypt.hashSync('abc123', 10),
      email: 'brianfallon@hotmail.com',
      first_name: 'brian',
      last_name: 'fallon',
      role: 'user',
    },
    // # 3 user
    {
      // # 3 user
      username: 'trippygoof#2',
      password: bcrypt.hashSync('abc', 10),
      email: 'gooft345@outlook.com',
      first_name: 'goofy',
      last_name: 'dog',
      role: 'user',
    },
    // # 4 user
    {
      // # 4 user
      username: 'menzinger54',
      password: bcrypt.hashSync('34Dc', 10),
      email: 'menzingers@gmail.com',
      first_name: 'matt',
      last_name: 'jones',
      role: 'user',
    },
    // # 5 DEV
    {
      // # 5 DEV
      username: 'mikey1',
      password: bcrypt.hashSync('abc123', 10),
      email: 'mikey123@gmail.com',
      first_name: 'miguel',
      last_name: 'williamson',
      role: 'dev',
    },
    // # 6 DEV
    {
      // # 6 DEV
      username: 'delaney3',
      password: bcrypt.hashSync('del45', 10),
      email: 'delannee45@gmail.com',
      first_name: 'delaney',
      last_name: 'apples',
      role: 'dev',
    },
  ]);

  await knex('questions').insert([
    // # 1 question w/ # 1 user
    {
      // # 1 question w/ # 1 user
      title: 'issue running "npm run start" not rerunning server on every save',
      category: 'node.js',
      question:
        'how do i rerun node.js start every time i save my server without having to manually restart my server?',
      attempt_tried: 'looked through articles but did not find an answer yet.',
      comments: 'n/a',
      user_id: 1,
    },
    // # 2 question w/ # 1 user
    {
      // # 2 question w/ # 1 user
      title: 'how to create a new react app',
      category: 'react',
      question: 'what is the command for creating a new react app?',
      attempt_tried: 'n/a',
      comments: 'n/a',
      user_id: 1,
    },
    // # 3 question w/ # 2 user
    {
      // # 3 question w/ # 2 user
      title: 'how do i access knex migration?',
      category: 'knexJs',
      question:
        'how do I gain access to knexJs and all of its methods such as "npx knex migrate....etc"?',
      attempt_tried: 'n/a',
      comments: 'n/a',
      user_id: 2,
    },
    // # 4 question w/ # 3 user
    {
      // # 4 question w/ # 3 user
      title: 'Session cookies or JWT tokens?',
      category: 'authentication',
      question: 'Whats better session cookies or JWT tokens?',
      attempt_tried: 'n/a',
      comments:
        'I have applied mostly JWT tokens but have little experience to compare cookies with',
      user_id: 3,
    },
    // # 5 question w/ # 4 user
    {
      // # 5 question w/ # 4 user
      title: 'Naming a package.json file',
      category: 'json',
      question: 'When naming a package.json file should you ever use capitals?',
      attempt_tried:
        'my VsCode editor gave an error when I created a package.json that had a capital in it.',
      comments: 'n/a',
      user_id: 4,
    },
    // # 6 question w/ # 4 user
    {
      // # 6 question w/ # 4 user
      title: 'package.json add to  project',
      category: 'json',
      question:
        'how do you create a package.json with most of the info filled out for you already in a project?',
      attempt_tried: 'just creating a package.json from scratch.',
      comments: 'n/a',
      user_id: 4,
    },
    // # 7 question w/ # 4 user
    {
      title: 'bootstrap add to react',
      category: 'react',
      question:
        'where is the best place to add bootstrap css file in a react app?',
      attempt_tried:
        'I have added it in one app in the index.js and in another in the app.js file',
      comments: 'I am not sure it matters but i wanted a second opinion.',
      user_id: 4,
    },
  ]);

  await knex('answers').insert([
    // answer # 1 -> question # 1 -> dev # 5
    {
      // answer # 1 -> question # 1 -> dev # 5
      title: 'Rerunning on every save',
      solution:
        'add package `nodemon` and script `server`: `nodemon index.js` to your package.json.',
      comments:
        'once nodemon is added and the script. run in the command line..`npm run server` to get auto save to run.',
      dev_id: 5,
    },
    // answer # 2 -> question # 2 -> dev # 5
    {
      // answer # 2 -> question # 2 -> dev # 5
      title: 'create react app',
      solution:
        'use following  `npx create-react-app <folder-name-holding-app>`',
      comments:
        'using that will give you the most up to date create-react-app available everytime and is the best practice as of now.. the other ways have been deprecated.',
      dev_id: 5,
    },
    {
      // answer # 3 -> question # 3 -> dev # 6
      title: 'knexJS',
      solution: 'you need the knex package installed `npm i knex` to install.',
      comments: 'then you should have access to all the knex commands.',
      dev_id: 6,
    },
  ]);
};
