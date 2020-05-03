/** @format */
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('sign_ins').insert([
    //? # 1
    {
      username: 'mickey65',
      password: bcrypt.hashSync('123', 10),
    },
    //? # 2
    {
      username: 'bri34fal',
      password: bcrypt.hashSync('abc123', 10),
    },
    //? # 3
    {
      username: 'trippygoof#2',
      password: bcrypt.hashSync('abc', 10),
    },
    //? # 4
    {
      username: 'menzinger54',
      password: bcrypt.hashSync('34Dc', 10),
    },
    //? # 5
    {
      username: 'mikey1',
      password: bcrypt.hashSync('abc123', 10),
    },
    //! # 6 | admin
    {
      username: 'delaney3',
      password: bcrypt.hashSync('del45', 10),
    },
    //! # 7 | admin
    {
      username: 'userdev',
      password: bcrypt.hashSync('user123', 10),
    },
  ]);

  await knex('users').insert([
    //? # 1 mikey65 | 123
    {
      //? # 1 mickey65 | 123
      email: 'mickey@gmail.com',
      first_name: 'mickey',
      last_name: 'mouse',
    },
    //? # 2 bri34fal | abc123
    {
      //? # 2  bri34fal | abc123
      email: 'brianfallon@hotmail.com',
      first_name: 'brian',
      last_name: 'fallon',
    },
    //? # 3 trippygoof#2 | abc
    {
      //? # 3 trippygoof#2 | abc

      email: 'gooft345@outlook.com',
      first_name: 'goofy',
      last_name: 'dog',
    },
    //? # 4 menzinger54 | 34Dc
    {
      //? # 4 menzinger54 | 34Dc

      email: 'menzingers@gmail.com',
      first_name: 'matt',
      last_name: 'jones',
    },
    //? # 5 mikey1 | abc123
    {
      //? # 5 mikey1 | abc123

      email: 'mikey123@gmail.com',
      first_name: 'miguel',
      last_name: 'williamson',
    },
    //! # 6 delaney3 | del45 | admin
    {
      //? # 6 delaney3 | del45 | admin

      email: 'delannee45@gmail.com',
      first_name: 'delaney',
      last_name: 'apples',
    },
    //!! # 7 userdev | user123 | admin
    {
      //? # 7 userdev | user123 | admin
      email: 'devuser@gmail.com',
      first_name: 'devman',
      last_name: 'prouser',
    },
  ]);

  await knex('roles').insert([
    //? # 1 mickey65 | user-dev
    {
      role: 'user-dev',
      user_id: 1,
    },
    //? # 2 bri34fal | user-dev
    {
      role: 'user-dev',
      user_id: 2,
    },
    //? # 3 trippygoof#2 | user-dev
    {
      role: 'user-dev',
      user_id: 3,
    },
    //? # 4 menzinger54 | user-dev
    {
      role: 'user-dev',
      user_id: 4,
    },
    //? # 5 mikey1 | user-dev
    {
      role: 'user-dev',
      user_id: 5,
    },
    //? # 6 delaney3 | admin
    {
      role: 'admin',
      user_id: 6,
    },
    //? # 7 userdev | admin
    {
      role: 'admin',
      user_id: 7,
    },
  ]);

  await knex('questions').insert([
    //? # 1 question w/ # 1 user
    {
      // # 1 question w/ # 1 user
      title: 'issue running "npm run start" not rerunning server on every save',
      category: 'node.js',
      question:
        'how do i rerun node.js start every time i save my server without having to manually restart my server?',
      attempt_tried: 'looked through articles but did not find an answer yet.',
      comments: 'n/a',
      solved: true,
      user_id: 1,
    },
    //? # 2 question w/ # 1 user
    {
      // # 2 question w/ # 1 user
      title: 'how to create a new react app',
      category: 'react',
      question: 'what is the command for creating a new react app?',
      attempt_tried: 'n/a',
      comments: 'n/a',
      solved: true,
      user_id: 1,
    },
    //? # 3 question w/ # 2 user
    {
      // # 3 question w/ # 2 user
      title: 'how do i access knex migration?',
      category: 'knexJs',
      question:
        'how do I gain access to knexJs and all of its methods such as "npx knex migrate....etc"?',
      attempt_tried: 'n/a',
      comments: 'n/a',
      solved: true,
      user_id: 2,
    },
    //? # 4 question w/ # 3 user | has answer
    {
      // # 4 question w/ # 3 user
      title: 'Session cookies or JWT tokens?',
      category: 'authentication',
      question: 'Whats better session cookies or JWT tokens?',
      attempt_tried: 'n/a',
      comments:
        'I have applied mostly JWT tokens but have little experience to compare cookies with',
      solved: false,
      user_id: 3,
    },
    //? # 5 question w/ # 4 user | has answer
    {
      // # 5 question w/ # 4 user
      title: 'Naming a package.json file',
      category: 'json',
      question: 'When naming a package.json file should you ever use capitals?',
      attempt_tried:
        'my VsCode editor gave an error when I created a package.json that had a capital in it.',
      comments: 'n/a',
      solved: false,
      user_id: 4,
    },
    //? # 6 question w/ # 4 user | has answer
    {
      // # 6 question w/ # 4 user
      title: 'package.json add to  project',
      category: 'json',
      question:
        'how do you create a package.json with most of the info filled out for you already in a project?',
      attempt_tried: 'just creating a package.json from scratch.',
      comments: 'n/a',
      solved: false,
      user_id: 4,
    },
    //? # 7 question w/ # 4 user | has answer
    {
      title: 'bootstrap add to react',
      category: 'react',
      question:
        'where is the best place to add bootstrap css file in a react app?',
      attempt_tried:
        'I have added it in one app in the index.js and in another in the app.js file',
      comments: 'I am not sure it matters but i wanted a second opinion.',
      solved: false,
      user_id: 4,
    },
    //! # 8 question w/ # 2 user || NO answer
    //!! UPDATE TEST QUESTION
    {
      title: 'node.js creator',
      category: 'node.js',
      question: 'who created node.js?',
      attempt_tried: 'n/a',
      comments: 'I was wondering who created node.js for a report',
      solved: false,
      user_id: 2,
    },
    //!! # 9 question w/ # 3 user || NO answer
    //
    {
      title: 'bootstrap or bulma css',
      category: 'css',
      question: 'what is a better css framework',
      attempt_tried: 'n/a',
      comments:
        'what is your preferred css framework if not one of these and why',
      solved: false,
      user_id: 3,
    },
  ]);

  await knex('answers').insert([
    //? answer # 1 -> question # 1 -> dev # 5
    {
      // answer # 1 -> question # 1 -> dev # 5
      title: 'Rerunning on every save',
      solution:
        'add package `nodemon` and script `server`: `nodemon index.js` to your package.json.',
      comments:
        'once nodemon is added and the script. run in the command line..`npm run server` to get auto save to run.',
      best_answer: true,
      question_id: 1,
      dev_id: 5,
    },
    //? answer # 2 -> question # 2 -> dev # 5
    {
      // answer # 2 -> question # 2 -> dev # 5
      title: 'create react app',
      solution:
        'use following  `npx create-react-app <folder-name-holding-app>`',
      comments:
        'using that will give you the most up to date create-react-app available every time and is the best practice as of now.. the other ways have been deprecated.',
      best_answer: false,
      question_id: 2,
      dev_id: 5,
    },
    //? answer # 3 -> question # 3 -> user-dev # 4
    {
      //? answer # 3 -> question # 3 -> user-dev # 4
      title: 'knexJS',
      solution: 'you need the knex package installed `npm i knex` to install.',
      comments: 'then you should have access to all the knex commands.',
      best_answer: false,
      question_id: 3,
      dev_id: 4,
    },
    //! answer # 4 -> question # 3 => user-dev # 2
    //!! updated answer test
    {
      // answer # 4 -> question # 3 => dev # 5
      title: 'cookeies or JWT',
      solution:
        'Often JWT tokens are taking over... but there are certain situations cookies are more beneficial to use. So it depends n the situation.',
      comments: 'n/a',
      best_answer: false,
      question_id: 3,
      dev_id: 2,
    },
  ]);
};
