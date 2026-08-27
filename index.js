const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = 'YOUR-CHANNEL-ID-HERE'; // right-click channel → Copy ID
const TZ_OFFSET_HOURS = -4; // your offset from UTC (e.g. -4 for EDT)

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  updateName(); // run immediately on start
  setInterval(updateName, 60000); // then every 60s
});

function updateName() {
  const now = new Date();
  const utcH = String(now.getUTCHours()).padStart(2, '0');
  const utcM = String(now.getUTCMinutes()).padStart(2, '0');

  const local = new Date(now.getTime() + TZ_OFFSET_HOURS * 3600000);
  const localH = local.getHours() % 12 || 12;
  const ampm = local.getHours() >= 12 ? 'pm' : 'am';
  const localM = String(local.getMinutes()).padStart(2, '0');

  const name = `${utcH}:${utcM} UTC (${localH}:${localM}${ampm})`;

  const channel = client.channels.cache.get(CHANNEL_ID);
  if (channel) {
    channel.setName(name).catch(err => console.error('Rename failed:', err));
  }
}

client.login(TOKEN);   
