# Pibot
An unoffical selfhosted NodeJS discord bot for controlling Pihole    

# Setup

## 1. Install Dependencies  
You need to have v12 of Discord.js, v2 of request and v8 of dotenv for this bot
```
npm i discord.js request dotenv
```
## 2. Bot Setup
You'll need a Bot token from [discord](https://discord.com/developers/applications)     
Your [discord id](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=On%20Android%20press%20and%20hold,name%20and%20select%20Copy%20ID.)       
Your Pihole ip and It's Api key found in your settings page     
![Settings](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/pihole-setting.png)    

## 3. Setting up dotenv   
You'll want to make a .env file and put the following things in    

Bot_Token={with your bot token}    
ID={with your discord id}     
piurl={including the http / https of your pi's pi address}    
piapi={your pi's api key}   
prefix={what you want the bots prefix to be}   
   
## 4. Launch the bot 

you can launch the bot with 
```
npm run pibot
```