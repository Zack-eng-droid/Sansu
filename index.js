// Resultado final
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
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
const fs = require("fs");
const { timeStamp } = require("console");









client.on('ready', () => { //Evento Ready
  console.log(`Estoy listo!`);//Dira en la consola cuando no haigan errores, que el bot esta listo.
  let estados = [`${client.guilds.cache.size} server(s)`, `${client.users.cache.size} usuari@s`, `${client.channels.cache.size} canales`]; //Aquí estableces los estados del bot
  let posicion = 0; //Aquí establecemos por donde comenzará
  setInterval(() => { //Creamos un intervalo
  if(posicion > estados.length -1) posicion = 0; //Aquí ponemos que si el estado vuelve a hacer el primero que inicie otra ves en 0
  let estado = estados[posicion] //Aquí juntamos los estados con las posiciones
  client.user.setActivity(estado, {type: "STREAMING"}) //Aquí ponemos que el estado del bot primero sea "JUGANDO" y luego los estados de arriba
  posicion++ //Aquí sumamos el estado
  }, 10000)//Cerramos el intervalo con un tiempo de 2s en ms
  
  });



client.on("message", async (message) => { /* Creamos un evento de mensaje */
  const mega = require("megadb");
let prefixdb = new mega.crearDB("Prefixes");
  let prefix = prefixdb.has(message.guild.id) ? await prefixdb.get(message.guild.id) : config.prefix;

  if(!message.guild) return; /* Verificamos si el comando se uso en un servidor, de lo contrario si es el DM que lo ignore */
  if(message.author.bot) return; /* Definimos que si es un bot el que esta usando nuestro bot, entonces hacemos que el bot no responda */
  if(!message.content.startsWith(prefix)) return; /* Definimos si solo pone el prefix del bot, el bot no responda con ningún tipo de mensaje */
   
 let command = message.content.toLowerCase().split(' ')[0]; /* Definimos comando */
 command = command.slice(prefix.length); /* Aquí lo que ponemos es que el bot ignore el prefix, y lea el comando que se uso */
 const args = message.content.slice(prefix.length).trim().split(" "); /* Definimos los argumentos (Datos que nos da el usuario) */
 const cmd = args.shift().toLowerCase(); /* Definimos cmd para que tome las minusculas y mayusculas */  
 try { /* Creamos una función de try */
 let commandFile = require(`./commands/${cmd}.js`); /* Aquí ustedes eligen como quieren que se llame la lista de comandos, ejemplo yo lo tengo como `./commands/${cmd}.js`, pero ustedes pueden ponerlo como `./comandos/${cmd}.js`. [Depende de como habeís creado la carpeta donde estaran los comandos] */
 commandFile.run(client, message, args); /* Decimos que funcione X comando si esta en la lista de nuestros comandos */
 } catch (e) { /* Si encuentra un error */
 console.log(e.message) /* Lo envía a la consola */
 } finally { /* Finalizamos */
 console.log(`${message.author.username} ha usado ${prefix}${cmd}`); /* Definimos que si X persona esta usando un comando, salga que comando esta usando en la consola (Esto lo envía a la consola)*/ 
 } //Cierre del finally
   
 }); //Cerramos el evento mensaje

 

client.login(config.token);