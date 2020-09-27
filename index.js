const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello Express app');
});

app.listen(3000, () => console.log('Funcionando Correctamente'));

require('dotenv').config();
//PUTO EL QUE LO TOQUE :v//
const Discord = require("discord.js");
const client = new Discord.Client();
const async = require("async");
const akaneko = require("akaneko")
const clientN = require("nekos.life")
const chance = require('chance').Chance();
var cheerio = require("cheerio");
var request = require("request")
const Canvas = require("canvas")
const superagent = require('superagent')
const figlet = require("figlet");
const { promisify } = require("util");
const translate = require('node-google-translate-skidz');
const morse = require('morse');
const weez = require("weez")
const ms = require("ms");
const humanizeDuration = require('humanize-duration');
const ytsr = require("ytsr");
const db = require("quick.db")
const fs = require("fs")





client.on('ready', () => {
  console.log(`Conectado y con ${client.guilds.cache.size} servidores ${client.users.cache.size} usuarios y ${client.channels.cache.size} canales`);
  let estados = [`${client.guilds.cache.size} server(s)`, `${client.users.cache.size} usuari@s`, `${client.channels.cache.size} canales`];
  let posicion = 0;
  setInterval(() => { 
  if(posicion > estados.length -1) posicion = 0;
  let estado = estados[posicion] 
  client.user.setActivity(estado, {type: "WATCHING"}) 
  posicion++
  }, 10000)
  
  });



client.on("message", async (message) => { /* Creamos un evento de mensaje */
  const mega = require("megadb");
let prefixdb = new mega.crearDB("Prefixes");
  let prefix = prefixdb.has(message.guild.id) ? await prefixdb.get(message.guild.id) : process.env.prefix;

  if(!message.guild) return;
  if(message.author.bot) return; 
  if(!message.content.startsWith(prefix)) return; 
   
 let command = message.content.toLowerCase().split(' ')[0];
 command = command.slice(prefix.length); 
 const args = message.content.slice(prefix.length).trim().split(" ");
 const cmd = args.shift().toLowerCase(); 
 try { /* Creamos una función de try */
 let commandFile = require(`./commands/${cmd}.js`); /* Aquí ustedes eligen como quieren que se llame la lista de comandos, ejemplo yo lo tengo como `./commands/${cmd}.js`, pero ustedes pueden ponerlo como `./comandos/${cmd}.js`. [Depende de como habeís creado la carpeta donde estaran los comandos] */
 commandFile.run(client, message, args); 
 } catch (e) { /* Si encuentra un error */
 console.log(e.message) /* Lo envía a la consola */
 } finally { /* Finalizamos */
 console.log(`${message.author.username} ha usado ${prefix}${cmd}`); /* Definimos que si X persona esta usando un comando, salga que comando esta usando en la consola (Esto lo envía a la consola)*/ 
 } //Cierre del finally
   
 }); //Cerramos el evento mensaje


client.login(process.env.token);
