# The PEVNN stack

<img src="https://camo.githubusercontent.com/4aa5532ee9baf623c95b901372002dfa4e97ff01/687474703a2f2f696d6775722e636f6d2f56344c746f49492e706e67" alt="Nuxt.js" width="200"/>
<img src="https://wiki.postgresql.org/images/3/30/PostgreSQL_logo.3colors.120x120.png" alt="PostgreSQL" width="200"/>
<img src="https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="Express.js" width="200"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png" alt="Vue.js" width="200"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/320px-Node.js_logo.svg.png" alt="Node.js" width="200"/>

Free and open-source JavaScript software stack for modern websites and webapps.

This project aims to be as minimalistic as possible while featuring all functionalities, such as authentication, typically necessary in most web-projects so that it can be used to quickly build new things using this stack.  
It shows how to use the latest versions of PostgreSQL, Express.js, Vue.js, Node.js and Nuxt.js in conjunction. The [guide](#Guide) and the code will be improved later.  
The naming is based upon the more popular MEAN and MEVN stacks but could be changed when this project gets moved to GitLab.  
<b>This project is under construction! As of right now it is for testing and development purposes only: you likely can't yet use its authentication as is in production.</b>

| Architectural layer/component | Software choice                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| Meta Framework                | Nuxt.js                                                                               |
| Server                        | Nuxt.js + Node.js + Express.js                                                        |
| Authentication middleware     | Passport                                                                              |
| Model                         | PostgreSQL (ORDBMS) + node-postgres (PostgreSQL client for Node.js) + Sequelize (ORM) |
| ViewModel                     | Vue.js                                                                                |
| View                          | Vue.js + Vuetify                                                                      |

Some components of the project could be switched out later and some could be added in addition. It aims to use the most FOSS, community-governed, performant, secure and efficient components in their latest stable versions. The components that are part of the stack's acronym (PEVNN) are long-term choices and unlikely to change while e.g. Sequelize could be switched out for Sails/Waterline.

This project will be moved to GitLab in 2019.

I'm currently busy coding an app with the [Quasar Framework](https://quasar-framework.org/) and am uploading this now in case somebody wants to get started with this stack over the Christmas holidays. I will improve it later. [You can help, too](#Contribute).

## Guide

1. Install dependencies

```
cd pevn_nuxt
npm install
```

2. Setup postgres database

- Install postgres and pgAdmin
- Create a new user:

```
sudo su postgres
psql
CREATE USER pevnn_testuser WITH PASSWORD 'pevnn_testuser_password';
ALTER USER pevnn_testuser WITH SUPERUSER;
```

- [node-postgres currently doesn't seem to support SCRAM-SHA-256 password encryption and restricting the user priviliges to a particular database. Hence make sure you don't have any databases containing sensitive data accessible. Using pg-native could fix this problem.](https://github.com/brianc/node-postgres/issues/1508)
- Create the following file: `./server/api/config.json` with the following content:

```
{
    "development": {
        "username": "pevnn_testuser",
        "password": "pevnn_testuser_password",
        "database": "todos_dev",
        "host": "127.0.0.1",
        "port": 5432,
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}
```

- `cd pevn_nuxt` and run:

```
./node_modules/.bin/sequelize db:create
./node_modules/.bin/sequelize db:migrate
```

3. Serve with hot reload at http://localhost:3000 by running `npm run dev`

---

### Build for production and launch server

```
npm run build
npm start
```

### Generate static project

```
npm run generate
```

## Resources

- [Nuxt.js docs](https://nuxtjs.org)
- [Vue.js docs](https://vuejs.org/v2/guide/)
- [Passport docs](http://www.passportjs.org/docs/)
- [Sequelize docs](http://docs.sequelizejs.com/manual/)

## Contribute

Please improve upon the guide and the code:

1. Fork the project
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Issue a [pull request](https://help.github.com/articles/using-pull-requests)

You can also create issues, but note that this repo is under construction and of version 0.0.1, so it's better to (either wait for at least version 0.1.0 or) create pull-requests. I did use some code and guides on the Web, mostly guides for outdated versions of individual components such as [this](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize) and [this](https://github.com/goleh/nuxt-passport-auth), to create this.

## License

[MIT license](https://opensource.org/licenses/MIT)
