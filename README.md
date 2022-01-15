v3.0 (2022/1/14)

---

**Hi (ᴗ ω ᴗ)**

This is just an experiment for "slash commands" + "@discordjs/rest" + "@discordjs/builders" in a simple way :3

--- 

<details>
<summary>
  log Screenshot
</summary>

<br >

--- 

<img src= "https://raw.githubusercontent.com/uwu-user/discord.js-slash-commands/main/assets/Screenshot.png" alt="Screenshot">

</div>
</details>

---

**❒ | if you need something » Unknown_#7004**

---

<details>
<summary>
  examples?
</summary>

<br >

--- 

Test:

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const data = new SlashCommandBuilder()
  .setName(" ") // [1] command Name
  .setDescription(" "); // [2] command description

module.exports = {
  global: false,  // [3] Command (Guild/Global) (true = Global, flase = Guild)
  data: data,  // cmd data*
  async execute(client, interaction) {
    await interaction.reply({ content: " ", ephemeral: true }); // [5] Command replay
  }
};
```

</div>
</details>

---

<details>
<summary>
  Install bot
</summary>

<br >

--- 
    
```sh-session
npm install request
```

```sh-session
npm install discord.js
```

```sh-session
npm install fs
```

```sh-session
npm install os
```

```sh-session
npm install ascii-table
```

```sh-session
npm install express
```

```sh-session
npm install @discordjs/rest
```

</div>
</details>

---

bye :3?
