function populate(subjectId, topicId){
    var subjectId = document.getElementById(subjectId);
    var topicId = document.getElementById(topicId);

    topicId.innerHTML = "";
    if(subjectId.value == "math"){
      var optionArray = ['Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Application of Derivatives','Integrals','Application of Integrals','Differential Equations','Vector Algebra','Three Dimensional Geometry','Linear Programming','Probability'];
    }
    else if(subjectId.value == "phy"){
      var optionArray = ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics and Optical Instruments','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics'];
      
    }
    else if(subjectId.value == "chem"){
      var optionArray = ['The Solid State','Solutions','Electrochemistry','Chemical Kinetics','Surface Chemistry','General Principles and Processes of Isolation of Elements','The p-Block Elements','The d- and f- Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules','Polymers','Chemistry in Everyday Life'];
      
    }
    else if(subjectId.value == "bio"){
      var optionArray = ['Reproduction in Organisms','Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principle of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Diseases','Strategies for Enhancement in Food Production','Microbes in Human Welfare','Biotechnology: Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and Conservation','Environmental Issues'];

    }
    for(var option in optionArray){
      var newOption = document.createElement("option");
      newOption.value = optionArray[option];
      newOption.innerHTML = optionArray[option];
      topicId.options.add(newOption);
    }
  }

  // Check question is valid or not
  var stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

  function remove_stopwords(str) {
    var x = "";
    for(var j=0; j<str.length;j++){
      if(str[j]!='?' || str[j]!=':' || str[j]!="'s"){
          x += str[j];
      }
    }
    res = []
    words = x.split(' ')
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
} 