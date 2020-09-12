# Pibot
An unoffical selfhosted NodeJS discord bot for controlling Pihole!  
Click [here](https://github.com/Joshua-Noakes1/Pibot#setup) for the setup process.

<br />

## Updates
V1.5: Added multiple pihole support see [.env](https://github.com/Joshua-Noakes1/Pibot#3-setting-up-dotenv) for details

<br />

## Usage

### -Status
The status command pulls the status of your pihole  
![status](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/status.png)
#### Using one pihole
```
-status
```
#### Using more than one
```
-status 2 # Status of the second pihole
```
### -Recent
The recent command pulls the most recent blocked domain    
![recent](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/recent.png)
#### Using one pihole
```
-recent
```
#### Using more than one
```
-recent 2 # Status of the second pihole
```
### -Enable
The enable command enables pihole if it's disabled     
![enable](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/enable.png)
#### Using one pihole
```
-enabe
```
#### Using more than one
```
-enable 2 # Status of the second pihole
```
### -Disable
The enable command enables pihole if it's disabled     
![disable](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/disable.png)
#### Using one pihole
```
-disable # To permanently disable pihole

-disable 20 mins, min, minutes, minute # To disable for 20 minutes 

-disable 20 secs, sec, seconds, second # To disable for 20 seconds
```
#### Using more than one
```
-disable 2 # To permanently disable pihole

-disable 2 20 mins, min, minutes, minute # To disable the second pihole for 20 minutes 

-disable 2 20 secs, sec, seconds, second # To disable the second pihole for 20 seconds
```

<br />

## Setup

### 1. Installing Dependencies  
```
npm i discord.js request dotenv
```
### 2. Bot Setup
You'll need a Bot token from [discord](https://discord.com/developers/applications)     
Your [discord id](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=On%20Android%20press%20and%20hold,name%20and%20select%20Copy%20ID.)       
Your Pihole ip and It's Api key found in your settings page     
![Settings](https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Other%20Repos/Pibot/Images/pihole-setting.png)    

### 3. Setting up dotenv   
See [.env](https://github.com/Joshua-Noakes1/Pibot/blob/master/example.env) example for help on configuring the .env file 

#### 3.a Adding more then one pihole to pibot  
This supports an infinite amount of piholes 

To add more than 1 pihole you'll need the following    
The ip address of the new pi  
The Port of the pihole   
The Api key of the pihole 

go into the .env file and add as follows, replacing pip1 to pip2 for example 
```env
# Pi config
pip1={{Your pihole ip address}} # The ip address of your pi
port1={{Your pihole port}}# The port the http server pihole is running on
piapi1={{Your pihole api key}} # The Api key for pihole instance
```
### 4. Launch the bot 

you can launch the bot with 
```shell
npm run pibot
```