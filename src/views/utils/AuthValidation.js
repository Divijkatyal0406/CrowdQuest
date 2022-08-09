import SignData from './SignData';

const AuthValidation = async (username, accountAddress, password, digiCode, web3, contract) => {

    let userAddress = await contract.getUserAddress({ from: accountAddress });

    if (userAddress.toLowerCase() !== accountAddress.toLowerCase()) {
        return false;
    } else {
        let signedData = await SignData(username, accountAddress, web3);
        let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + digiCode);

        let hash = await web3.eth.accounts.hashMessage(signedData + passwordDigiCodeHash);

        let hashFromContract = await contract.getSignatureHash({ from: accountAddress });

        if (hash === hashFromContract) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthValidation;