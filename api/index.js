//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios')

const loadDB = async () => {
  console.log("\nCargando datos...")
  const existe = await Country.count();
  if(!existe){
      axios.get('https://restcountries.com/v3/all')
      .then(respuesta => {
          respuesta.data.forEach(async (e) => {
              let cap = "None";
              if(Array.isArray(e.capital)){
                  cap = e.capital.pop();
              }

              await Country.create({
                  ID: e.cca3,
                  name: e.name.common,
                  urlImg: e.flags[1],
                  continent: e.region,
                  capital: cap,
                  subregion: !e.subregion ? 'Antarctic' : e.subregion,
                  area: e.area,
                  poblacion: e.population,
                  landlocked: e.landlocked,
              })
          })
          console.log("\nDatos traidos de la API con Axios y cargados en la DB Countries");
      })
      .catch (e => {
          console.log(e);
      })
  }
  else{
      console.log("\nBase de datos cargada!")
  }
}

// Syncing all the models at once
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('listening at ' + process.env.PORT); // eslint-disable-line no-console
    loadDB()    
  });
});
