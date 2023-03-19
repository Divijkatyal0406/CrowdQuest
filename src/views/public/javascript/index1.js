const ipfsClient=require('ipfs-http-client');
const { globSource } = ipfsClient;
const ipfsEndPoint = 'http://localhost:5001'
const ipfs = ipfsClient(ipfsEndPoint);  

const fs = require('fs');
const crypto = require('crypto');
var path = require('path')



////////////////////////////////
//////////// IPFS //////////////
////////////////////////////////

// generateKeys()
// setTimeout(() => {
  _testing()
//   console.log("chal jaa");
// }, 15000)



// const directoryPath = path.join(__dirname, 'Documents');
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         // console.log(file); 
//         _testing(file);
//     });
// });






let c11,c12,c13,c14,c15,c16,c17,time,time1;
// c15="Performing private and public key encoding"
c15=`
publicKeyEncoding: {
  type: 'pkcs1',
  format: 'pem',
},
privateKeyEncoding: {
  type: 'pkcs1',
  format: 'pem',
  cipher: 'aes-256-cbc',
  passphrase: '',
},`


async function uploadFileEncrypted(file, ipfspath) {
  try {
    const buff = fs.readFileSync(file);
    const key = crypto.randomBytes(16).toString('hex');
    const iv = crypto.randomBytes(8).toString('hex'); 
    const ekey = encryptRSA(key);
    const ebuff = encryptAES(buff, key, iv);
    // console.log("hello1");
    const content = Buffer.concat([
      Buffer.from(ekey, 'utf8'), 
      Buffer.from(iv, 'utf8'),   
      Buffer.from(ebuff, 'utf8')
    ])
    
    await ipfs.files.write(
      ipfspath,
      content,
      {create: true, parents: true}
    );
    
    // document.getElementById("c11").innerHTML='ENCRYPTION --------';
    // document.getElementById("c12").innerHTML=`'key:' ${key}, 'iv: ${iv}, 'ekey:' ${ekey.length}`;
    // document.getElementById("c13").innerHTML=`'contents:' ${buff.length} 'encrypted:' ${ebuff.length}`;
    c12='-------- ENCRYPTION --------';
    c13=`'key:' ${key}, 'iv:', ${iv}, 'ekey:', ${ekey.length}`;
    c14=`'contents:', ${buff.length}, 'encrypted:', ${ebuff.length}`;
    console.log('ENCRYPTION --------')
    console.log('key:', key, 'iv:', iv, 'ekey:', ekey.length)
    console.log('contents:', buff.length, 'encrypted:', ebuff.length)
    console.log(' ')

  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function toArray(asyncIterator) { 
  const arr=[]; 
  for await(const i of asyncIterator) {
    arr.push(i); 
  }
  return arr;
}

async function downloadFileEncrypted(ipfspath) {
  try {
    let file_data = await ipfs.files.read(ipfspath)
    
    let edata = []
    for await (const chunk of file_data)
      edata.push(chunk)
    edata = Buffer.concat(edata)

    const key = decryptRSA(edata.slice(0, 684).toString('utf8'))
    const iv = edata.slice(684, 700).toString('utf8')
    const econtent = edata.slice(700).toString('utf8')
    const ebuf = Buffer.from(econtent, 'hex')
    const content = decryptAES(ebuf, key, iv)

    console.log(' ')
    console.log('DECRYPTION --------')
    console.log('key:', key, 'iv:', iv)
    console.log('contents:', content.length, 'encrypted:', econtent.length)
    console.log('downloaded:', edata.length)
    // console.log("chal jaa2");
    return content
    
  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function getUploadedFiles(ipfspath='/encrypted/') {
  let files = []
  const arr = await toArray(ipfs.files.ls(ipfspath))
  for (let file of arr) {
    if (file.type === 'directory') {
      const inner = await getUploadedFiles(ipfspath + file.name + '/')
      files = files.concat(inner)
    } else {
      files.push({
        path: ipfspath + file.name,
        size: file.size,
        t:time1,
        cid: file.cid.toString()
      })
    }
  }
  return files
}

function encryptAES(buffer, secretKey, iv) {
  console.log("chal jaa3");
  const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
  const data = cipher.update(buffer);
  const encrypted = Buffer.concat([data, cipher.final()]);
  return encrypted.toString('hex')
}

function decryptAES(buffer, secretKey, iv) {
  const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, iv);
  const data = decipher.update(buffer)
  const decrpyted = Buffer.concat([data, decipher.final()]);
  return decrpyted;
}

function generateKeys() {
  if (fs.existsSync('private.pem') && fs.existsSync('public.pem'))
    return;
  
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: '',
    },
  })

  fs.writeFileSync('private.pem', privateKey)
  fs.writeFileSync('public.pem', publicKey)
}

function encryptRSA(toEncrypt, pubkeyPath='public.pem') {
  const absolutePath = path.resolve(pubkeyPath)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

function decryptRSA(toDecrypt, privkeyPath='private.pem') {
  const absolutePath = path.resolve(privkeyPath)
  const privateKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(
  {
    key: privateKey.toString(),
    passphrase: '',
  },
  buffer,
  )
  return decrypted.toString('utf8')
}

async function _testing(fileName) {
  console.log("here9");
  const file = 'C:/Users/divij/Downloads/Physics_18-03-22.pdf'; 
  const ipfspath = '/encrypted/data/' + file 
  
  
  await uploadFileEncrypted(file, ipfspath)
  
  // document.getElementById().innerHTML=`ipfs path /encrypted/data/${file}`;
  c11=`--------READING FILE--------`
  c17=`${file}`;
  
 
  const dl = await downloadFileEncrypted(ipfspath)
  
  
  const buff = Buffer.from(dl, 'hex')

  
  const outfile = ipfspath.replace(/\//g, '_');

  c18=`---------WRITING FILE TO IPFS---------`
  c16=`${outfile}`;

  console.log('writing:', outfile)
  fs.writeFile(outfile, buff, function(err) {
    if (err) throw err;
  })
} 

////////////////////////////////
///////// REST API /////////////
////////////////////////////////

const rest_port = 5000;
const express = require("express");
const app = express();
var path = require('path')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
app.use(cors());

app.use(express.static(__dirname+ '/public'));
// app.use(express.static('/public'));

// app.get('/', (req, res) => {
//   console.log(req.body.fname);
//   res.sendFile(__dirname + '/iterative.html');
// });


app.post('/', (req, res) => {
  // time=req.body.t;
  // console.log(time);
  // console.log(Date.now());
  time1=req.body.t;
  var someDate = new Date(req.body.t);
  someDate = someDate.getTime();
  time=someDate-Date.now();
  console.log(time);
  
  // time=req.body.time;
  res.sendFile(__dirname + '/iterative.html');
});

app.get('/getDetails', (req, res) => {
  res.send({read:c11,encrypt1:c12,encrypt2:c13,encrypt3:c14,keys:c15,ipfs:c16,path:c17,ipfs_path:c18});
  // app.use(cors(corsOptions));
});

app.get('/index1.js', function(req, res) {
  res.sendFile('index1.js',{ root: __dirname});  
});

app.get('/scripts/require.js', function(req, res) {
  res.sendFile('scripts/require.js',{ root: __dirname});  
});

app.get('/encryption.html', (req, res) => {
  res.sendFile(__dirname + '/encryption.html');
});


app.get("/api/files", async (req, res, next) => {
  try {
    res.json(await getUploadedFiles())
  } catch (e) {
    console.log("error kyu aa raha")
    res.json({error: e.toString()})
  }
});

app.get(/^\/api\/file(\/.*)$/, async (req, res, next) => {
  try {
    const ipfspath = req.params[0];
    const content = await downloadFileEncrypted(ipfspath)
    setTimeout(() => {
        res.send(content)
    }, time);
  } catch (err) {
    res.send('error: ' + err)
  }
});

app.listen(rest_port, () => {
 console.log("Server running on port 5000");
});
