# Smart India Hackathon 2022 Submission | Category - Software | Organization - Department of School Education & Literacy (DoSEL), Ministry of Education

## CrowdQuest - Online crowdsourcing model for creating a large pool of question bank that are vetted by experts along with automatically generating the question paper and securing it to conduct online examinations. 


## 📝 Problem statement :
"Summary: To be able to graduate to objective type questions for one semester of online board exams, a question bank of at least 5000 questions will be required for each subject. Setting question papers for the exams is a complicated task. Can you think of a Crowd Sourcing model where questions are set by large number of anonymous stakeholders thereby creating a large question bank? These questions can be vetted by experts before freezing the same in the question bank. The actual question paper can be set through an automated system"

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚩 Overview :
Getting fine grained questions for board examinations is a difficult and time consuming task. Along with this setting examination paper taking into consideration various paprameters such as difficulty, weightage is quite error-prone. The question paper that is generated should be secured in a proper and effective manner to prevent any mishap such as leaking of paper. Sending question paper to the students across the network should be in a highly secure environment. So our team proposed a solution to tackle all this. We developed an online decentralized crowdsource model to have stakeholders contribute questions on our platform which will be later vetted by experts and using them to generate a question paper. The question paper generated would be encrypted and send across the network to the third party blockchain and would be distributed to the students whenever required and would ensure a secure and smooth process of sending question paper to the students who registered for it. 

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔗 Links for project:  
 
Video demo : [Watch Demo Video]() <br>
Documentation : [Check Documentation]()

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ✨ Our Team

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/81901470?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/d17012002">Anurag Kumar</a></b></sub><br />💬 💻 👀 </td>
 <td align="center"><img src="https://avatars.githubusercontent.com/u/77019763?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/AnmolVerma404">Anmol Verma</a></b></sub><br />💬 🚧 👀</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/77195199?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/JOS-RE">Joshith Gopidi</a></b></sub><br />🤔 👀 📢</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/71887687?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/Gagan2024">Gagan Srivastava</a></b></sub><br />🌍 👀 📢</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/79134485?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/Mitashi123">Mitashi Gandhi</a></b></sub><br />🌍 🎨 📢      </td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/81143854?v=4" width="100px;" alt=""/><br /><sub><b><a href="https://github.com/Divijkatyal0406">Divij Katyal</a></b></sub><br />💻 🚧 📢      </td>
   
   </tr>
</table>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚩 General Features and Interfaces:
Feature | Images
------------ | -------------
 **Hompage**  
 It is fast, easy to use, and incredibly convenient with a minimalistic UI! To create an exam, just register as an instructor and login to create the exam! | ![homepage](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/home.png)
**Contributor Dashboard** 
All the accepted questions are shown here!|![registrationPage](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/c_dashboard.png)
**Teacher Expert Dashboard**
Experts after secure authentication can access all the features provided to the them through this dashboard! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/t_dashboard.png)
**Add Question Section**
Stakeholders can add questions throught this interface with ease! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/question_submit.png)
**OCR and voice input**
Stakeholders can opt to upload image from book or can speak out the question! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/ocr.png)
**Virtual keyboard**
Virtual mathematical keyboard to ease the process of typing any mathematical equation! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/virtual.png)
**Multilingual paper generation and dashboard**
Multilingual feature is provided to the users to view the dasboard as well as generating the question paper in other languages! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/multi.png)
**Sample papers**
Sample paper sets with various difficulties for practice! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/sample.png)
**Discussion Forum**
Discussion section for all the stakeholders to share their doubts and discuss with the world! |![professor](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/discuss.png)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚩 Features of Question Paper Generation:
Feature | Images
------------ | -------------
**Supervision** The expert generation the paper and previewing it will be under supervision! | ![facenot](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/webcam.png)
**Cell Phone Detection** If any expert tries to click pictures via phone the model detects it and immediately logs out of the system and denies the access for later interaction | ![cell phone detection]() 
**Disabled Copy/Paste** If any teacher tries to copy any questions it immediately detects and logs out of the system | ![ctrlkey]()
**Prohibited Object Detection!** Any object that will block the view of camera and person is not visible then system simply denies the access to the system| ![booldetect]()

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔐 Expert authentication system
Expert's authentication can be the primary security breach to the board's question paper generation and distribution.
The diagram below shows all steps to generate the expert's login data hash from the username, the password, the 6 digit code (that will be provided by respective board to each teacher expert) and the ethereum address. To register the user must fill a form to provide the username, the password and the 6 digit code, the ethereum address is retrieved directly from the wallet. This address is associated to the username to generate a signature via the web3 function sign, the generated signature is hashed (hash1). The password is associated with the 6 digit code to generate another hash (hash2). The two hashes are combined to generated the final hash that is stored in the smart contract(Refer Authentication.sol). To login, the user must be connected to the Blockchain with the same address used during registration, and fill the login form with right username, password and the 6 digit code. The back-end solidity code then generates the hash with this login information and compares it with the hash that was stored in the smart contract by the ethereum address which request the login, if the two hashes match, then the user is authorized to login, if not, the access is denied.
![auth-diagram](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/login_encrypt.png)


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


**Other Features :**
1. Email updates on expert's email id about questions summary on expert's dashboard
2. Reward notifications to the person who contributed the question
3. Report functionality to send the question again back for review

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🌐 Web flow
![Flowchart](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/webflow.png)
![Flowchart](https://github.com/Divijkatyal0406/CrowdQuest/blob/master/images/dataflow1.png)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


##  🚩 Technologies used:

#### Programming Languages : Solidity, Javascript, HTML, CSS
#### Face Recognition Model :  TensorflowJS
#### Database : Polygon (Ethereum Layer-2) Blockchain
####  Frameworks/Libraries/Tools : Bootstrap, FreeOCR, Google Transalate, Truffle, Ganache, VSCode, IPFS, Moralis, Web3, Tokenizer
#### Version Control : Git
###### You can also see the list of dependencies in the package.json file.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚩Installation/Environment Setup 

  #### Login Credentials 
       Username - "Divij" password - "divij0406" passcode - "123456"
       Ethereum address - "0xED620CdD26E4adfae79Ea12f5fadd2c4c6ab54a4"
       
  #### 1. Clone App
  
  * Write the following command and press enter.
  
  ```
    $ git clone https://github.com/Divijkatyal0406/CrowdQuest.git
  ```
    
 #### 2. Install node packages
  * Move to the parent/root directory (CrowdQuest) cd CrowdQuest
  * Write the following command and press enter to download all required node modules.
 
   ```
   $ cd CrowdQuest
   $ npm install 
  ```
  
#### 3. Ganache
  - Open Ganache and click on settings in the top right corner.
  - Under **Server** tab:
    - Set Hostname to 127.0.0.1 -lo
    - Set Port Number to 8545
    - Enable Automine
  - Under **Accounts & Keys** tab:
    - Enable Autogenerate HD Mnemonic

#### 4. IPFS
  - Fire up your terminal and run `ipfs init`
  - Then run 
    ```
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "['*']"
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "['true']"
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "['PUT', 'POST', 'GET']"
    ```

    > Note: If you face any issues with the above command on windows, try using command prompt and escape sequences or git bash.
#### 5. Metamask
  - After installing Metamask, click on the metamask icon on your browser.
  - Click on __TRY IT NOW__, if there is an announcement saying a new version of Metamask is available.
  - Click on continue and accept all the terms and conditions after reading them.
  - Stop when Metamask asks you to create a new password. We will come back to this after deploying the contract in the next section.
  
#### 6. Smart Contract

1. Install Truffle using `npm install truffle -g`
2. Compile Contracts using `truffle compile`

#### 7. Starting your local development blockchain
  - Open Ganache.
  - Make sure to configure it the way mentioned above.
    7.1. Open new Terminal and deploy contracts using `truffle migrate`

#### 8. Local server

1. Install Node lite-server by running the following command on your terminal `npm install -g lite-server`

#### 9. Run Locally
  * Move back to the parent directory by cd..
  * While you are still inside the cloned folder, write the following command to run the website locally.
 
 ```
   $ npm run dev
 ```
 
 
 ###### NOTE: After performing all the steps give a few seconds for frontend to load and the port by default will be ```http://localhost:3000/```
