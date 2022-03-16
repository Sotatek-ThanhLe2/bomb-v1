const get = () => {
return new Promise((resolve, \_reject) => {
resolve(web3.eth.getAccounts())
})
}
get().then(wallet => {
console.log(wallet[0]);
return wallet[0]
})
