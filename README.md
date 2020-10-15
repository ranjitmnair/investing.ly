# investing.ly
---
- Clone the repository to your device
- follow the steps
- open the folder in VSCode terminal or another editor
- execute the following

```
npm install
```
- install all dependencies

### To start the app:
``` npm start ```


#### routes:
- localhost:3000/api/user/signup    -[POST]{ to sign up}
- localhost:3000/api/user/signin    -[POST]{to sign in}
----
- localhost:3000/api/stocks/buystock [POST]{body: symbol,purchasePrice,numberOfShares}

- localhost:3000/api/stocks/getstockprice/:code  [GET]{params-code(symbol of stock)}
- localhost:3000/api/stocks/mystocks [GET]{get all stocks}

----
- localhost:3000/api/funds/buyfund[POST]{body: schemeCode,purchaseNAV,numberOfUnits}

- localhost:3000/api/funds/getfundprice/:schemeCode  [GET]{params-schemeCode}
- localhost:3000/api/funds/myfunds [GET]{get all funds}

----
- localhost:3000/api/cryptos/buycrypto[POST]{body: cryptoCode,purchasePrice,numberOfCoins}

- localhost:3000/api/cryptos/getcryptoprice/:cryptoCode  [GET]{params-cryptoCode}
- localhost:3000/api/cryptos/mycryptos [GET]{get all cryptos}

---
---