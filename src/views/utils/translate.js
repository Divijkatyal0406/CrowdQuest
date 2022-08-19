
//just make a toggle that change en (english) to hn (hindi)

let locale="en";
const translations={
    "en":{
        "title":"Crowd Quest",
        "username":"Username",
        "username1":"Username",
        "search":"Search",
        "For Student":"For Students",
        "Dashboard":"Dashboard",
        "SubmitQuestion":"Submit Question",
        "discussions":"Discussions",
        "logout":"Logout",
        "Dashboard1":"Dashboard",
        "greet":"Welcome to Crowd Quest",
        "For Expert":"For Experts",
        "Create Question":"Create Question",
        "Generate Question Paper":"Generate Question Paper" ,
        "Analytics":"Analytics",
        "Expert":"Expert",
        "Distribute Questions":"Distribute Questions",
        "Settings":"Settings",
        "Profile":"Profile",
        "My Messages":"My Messages",
        "View Profile":"View Profile",
        "Physics":"Physics",
        "Chemistry":"Chemistry",
        "Mathematics":"Mathematics",
        "Biology":"Biology",
        "Submission Portal":"Submission Portal",
        "Dummy":"Lorem Ipsum has been the industry's standard dummy text ever since.Lorem Ipsum has been the industry's standard dummy text ever since.",
        "Select":"Please select the Subject and the chapter",
        "typequestion":"Please type/speak the question:",
        "equation":"Mathematical equation(Optinal)",
        "copy":"Copy text",
        "upload":"Upload",
        "option":"Enter the options and check on the correct option",
        "Review":"Submit for Review"
    },
    "hn":{
        "title":"क्राउड क्वेस्ट",
        "username":"उपयोगकर्ता नाम",
        "username1":"उपयोगकर्ता नाम",
        "search":"तलाशी",
        "For Student":"छात्र के लिए",
        "Dashboard":"डैशबोर्ड",
        "SubmitQuestion":"प्रश्न सबमिट करें",
        "discussions":"चर्चाएँ",
        "logout":"लॉग आउट",
        "Dashboard1":"डैशबोर्ड",
        "greet":"क्राउड क्वेस्ट में आपका स्वागत है",
        "For Expert":"शिक्षक के लिए",
        "Create Question":"प्रश्न बनाएं",
        "Generate Question Paper":"प्रश्न पत्र उत्पन्न करें",
        "Analytics":"एनालिटिक्स",
        "Expert":"विशेषज्ञ",
        "Distribute Questions":"प्रश्न वितरित करें",
        "Settings":"सेटिंग्स",
        "Profile":"प्रोफ़ाइल",
        "My Messages":"मेरे संदेश",
        "View Profile":"प्रोफ़ाइल देखें",
        "Physics":"भौतिक विज्ञान",
        "Chemistry":"रसायन विज्ञान",
        "Mathematics":"गणित",
        "Biology":"जीवविज्ञान",
        "Submission Portal":"सबमिशन पोर्टल",
        "Dummy":"लोरेम इप्सम तब से उद्योग का मानक डमी पाठ रहा है। लोरेम इप्सम तब से उद्योग का मानक डमी पाठ।",
        "Select":"कृपया विषय और अध्याय का चयन करें",
        "typequestion":" कृपया प्रश्न टाइप करें",
        "equation":"गणितीय समीकरण (वैकल्पिक)",
        "copy":" पाठ कॉपी करें",
        "upload":"अपलोड",
        "option":"विकल्प दर्ज करें और सही विकल्प की जांच करें",
        "Review":"समीक्षा हेतु सबमिट करें"

    },
};


document.getElementById("hindimode").addEventListener("click",()=>{
        
        if (locale == "en") {
            locale = "hn";
        }else{
            locale = "en";
        }

        console.log("language change kar diya");
        document.querySelectorAll("[data-localize]").forEach(translateElement);
})

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll("[data-localize]").forEach(translateElement);
});

function translateElement(e){
    const key=e.getAttribute("data-localize");
    const translation=translations[locale][key];
    e.innerText=translation;
}