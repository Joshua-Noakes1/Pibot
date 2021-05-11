# Pibot
An unoffical selfhosted NodeJS discord bot for controlling Pihole!

## Usage
### -Status
The status command pulls the status of your pihole  
![status](https://raw.githubusercontent.com/Joshua-Noakes1/Pibot/master/github/status.png)
### -Recent
The recent command pulls the most recent blocked domain    
![recent](https://raw.githubusercontent.com/Joshua-Noakes1/Pibot/master/github/recent.png)
### -Enable
The enable command enables pihole if it's disabled     
![enable](https://raw.githubusercontent.com/Joshua-Noakes1/Pibot/master/github/enable.png)
### -Disable
The disable command disables pihole if it's enabled     
![disable](https://raw.githubusercontent.com/Joshua-Noakes1/Pibot/master/github/disable.png)

<br />

## Setup
### 1. Installing Dependencies  
Installing the required dependencies is easy. Run the below command and NPM will install all the pacakges you need
```
npm i
```
### 2. Bot Setup
- You'll need a Bot token from [discord](https://discord.com/developers/applications)     
- Your [discord id](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)       
- Your Pihole ip and It's Api key found in your settings page     
![Settings](https://raw.githubusercontent.com/Joshua-Noakes1/Pibot/master/github/pihole-setting.png)    

### 3. Setting up dotenv   
A file called .env will need to be made at the root of the project (the same place as index.js) with all required fields from example.env.show

See [.env](https://github.com/Joshua-Noakes1/Pibot/blob/master/example.env.show)
### 4. Launch the bot 
You can launch the bot with 
```shell
npm run pibot
```