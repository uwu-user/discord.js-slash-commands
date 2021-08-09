const botversion = require("../package.json").version;
const { version: discordjsVersion } = require('discord.js'); 
const os = require("os");

module.exports = {
  name: "system",
  description: "bot info :3",
  global: false,
  options: null,
  async execute(client, interaction, args) {
    let Ping                 = `[ ${Math.round(client.ws.ping)}ms ]`;
    let Servers              = `[ ${client.guilds.cache.size} ]`;
    let Channels             = `[ ${client.channels.cache.size} ]`;
    let Users                = `[ ${client.users.cache.size} ]`;
    let Name                 = `[ ${client.user.tag} ]`;
    let ID                   = `[ ${client.user.id} ]`;
    let nodeJS               = `[ ${process.version} ]`;
    let djs                  = `[ ${discordjsVersion} ]`;
    let Arch                 = `[ ${process.arch} ]`;
    let Platform             = `[ ${process.platform} ]`;
    let cpuModel             = `[ ${os.cpus()[0].model} ]`;
    let core                 = `[ ${os.cpus().length} ]`;
    let BotVersion           = `[ ${botversion} ]`;
    let UpTime               = `[ ${timeCon(process.uptime())} ]`;
    let Process_Info         = `[ PID: ${process.pid} at ${process.cwd()}]`;
    let Process_Memory_Usage = `[ ${Math.ceil(process.memoryUsage().heapTotal / 1000000)}MB ]`;
    let System_Memory_Usage  = `[ ${Math.ceil((os.totalmem() - os.freemem()) / 1000000)}MB of ${Math.ceil(os.totalmem() / 1000000)}MB ]`;
    let RAM_Usage            = `[ ${(process.memoryUsage().rss / 1048576).toFixed()}MB ]`;
    let Memory_Usage         = `[ ${formatBytes(process.memoryUsage().heapUsed)} ]`;

    let msg =
      "```\n"+
      `Ping:\n${Ping}\nServers:\n${Servers}\nchannels:\n${Channels}\nUsers:\n${Users}\nName:\n${Name}\nID:\n${ID}\nNodejs:\n${nodeJS}\nDiscord.js\n${djs}\nArch:\n${Arch}\nPlatform:\n${Platform}\ncpuModel:\n${cpuModel}\ncore:\n${core}\nBotversion:\n${BotVersion}\nUpTime:\n${UpTime}\nprocess Info:\n${Process_Info}\nProcess Memory Usage:\n${Process_Memory_Usage}\nSystem Memory Usage:\n${System_Memory_Usage}\nRAM Usage:\n${RAM_Usage}\nMemory Usage:\n${Memory_Usage}` +
      "```";
    await interaction.reply({ content: msg, ephemeral: true });
  }
};

function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function timeCon(time) {
  let days = Math.floor((time % 31536000) / 86400);
  let hours = Math.floor(((time % 31536000) % 86400) / 3600);
  let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
  let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
  days = days > 9 ? days : "0" + days;
  hours = hours > 9 ? hours : "0" + hours;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return `${days > 0 ? `${days}:` : ""}${
    (hours || days) > 0 ? `${hours}:` : ""
  }${minutes}:${seconds}`;
}
