# Phone-number-lookup
`this is based on thired party database (we are using truecallerjs)`

# screen-shots :
![phone lookup](https://user-images.githubusercontent.com/49394996/171983973-110a8c8d-f7a1-46b0-a02c-2ff9cdceae32.png)

![phone-search](https://user-images.githubusercontent.com/49394996/171983965-2bc860e4-5625-4db8-a934-59c6c60f6802.png)

## `how can i use :`
if you want to use this Application for search number online than visit this link :
https://phone-number-lookup.herokuapp.com/

this Application using backend as nodejs , expressjs

## Deployment
To use this project on local 

```bash
 git clone git@github.com:getsettalk/Phone-number-lookup.git
```
 go to project folder where you have cloned this App than intialised node module 
```bash
npm init
```

**------After init go to " src/index.js" for change your installation id of truecallerjs --------**

`At line No.49 : *      const truecallerid = "your installation id"*` 
` if you are outsite india than write your Own country code  `

if you want to see truecallerjs package than go to :https://www.npmjs.com/package/truecallerjs

After succefully init. and change installation id 
```bash
node src/index.js
```





## Authors

- [@sujeet kumar](https://www.github.com/getsettalk)


