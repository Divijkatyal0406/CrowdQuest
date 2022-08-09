import SignData from './SignData.js';
const AuthenticationHash = async (username, accountAddress, password, digiCode, web3) => {
    console.log(username);
    console.log(accountAddress);
    console.log(digiCode);
    let signedMessage = await SignData(username, accountAddress, web3);
    let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + digiCode);

    return await web3.eth.accounts.hashMessage(signedMessage + passwordDigiCodeHash);
}

export default AuthenticationHash;