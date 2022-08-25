function populate(subjectId, topicId){
    var subjectId = document.getElementById(subjectId);
    var topicId = document.getElementById(topicId);

    topicId.innerHTML = "";
    if(subjectId.value == "math"){
      var optionArray = ['Select Chapter','Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Application of Derivatives','Integrals','Application of Integrals','Differential Equations','Vector Algebra','Three Dimensional Geometry','Linear Programming','Probability'];
    }
    else if(subjectId.value == "phy"){
      var optionArray = ['Select Chapter','Electric Charges and Fields', 'Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics and Optical Instruments','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics'];
      
    }
    else if(subjectId.value == "chem"){
      var optionArray = ['Select Chapter','The Solid State','Solutions','Electrochemistry','Chemical Kinetics','Surface Chemistry','General Principles and Processes of Isolation of Elements','The p-Block Elements','The d- and f- Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules','Polymers','Chemistry in Everyday Life'];
      
    }
    else if(subjectId.value == "bio"){
      var optionArray = ['Select Chapter','Reproduction in Organisms','Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principle of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Diseases','Strategies for Enhancement in Food Production','Microbes in Human Welfare','Biotechnology: Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and Conservation','Environmental Issues'];

    }
    for(var option in optionArray){
      var newOption = document.createElement("option");
      newOption.value = optionArray[option];
      newOption.innerHTML = optionArray[option];
      topicId.options.add(newOption);
    }
  }

  function getTopic(){

    topicSelected = document.getElementById("topic");
    topicValue =  topicSelected.value;
    var subTopicId = document.getElementById("subtopic");
    subTopicId.innerHTML = "";

    if(topicValue == 'Relations and Functions'){

      var optionArray = ['Types of Relations', 'Types of Functions', 'Composition of Functions and Invertible Function', 'Binary Operations'];

    }else if(topicValue == 'Inverse Trigonometric Functions'){
      var optionArray = ['Basic Concepts', 'Properties of Inverse Trigonometric Functions'];
    
    }else if(topicValue == 'Matrices'){
      var optionArray = ['Matrix', 'Types of Matrices', 'Operations on Matrices', 'Transpose of a Matrix', 'Symmetric and Skew Symmetric Matrices', 'Elementary Operation of a Matrix', 'Invertible Matrices'];
    }

    else if(topicValue == 'Determinants'){
      var optionArray = ['Determinant', 'Properties of Determinants', 'Area of a Triangle', 'Minors and Cofactors', 'Adjoint and Inverse of a Matrix', 'Applications of Determinants and Matrices'];
    }

    else if(topicValue == 'Continuity and Differentiability'){
      var optionArray = ['Continuity', 'Differentiability', 'Exponential and Logarithmic Functions', 'Logarithmic Differentiation', 'Derivatives of Functions in Parametric Forms', 'Second Order Derivative', 'Mean Value Theorem'];
    }

    else if(topicValue == 'Application of Derivatives'){
      var optionArray = ['Rate of Change of Quantities', 'Increasing and Decreasing Functions', 'Tangents and Normals', 'Approximations', 'Maxima and Minima'];
    }

    else if(topicValue == 'Integrals'){
      var optionArray = ['Integration as an Inverse Process of Differentiation', 'Methods of Integration', 'Integrals of Some Particular Functions', 'Integration by Partial Fractions', 'Integration by Parts', 'Definite Integral', 'Fundamental Theorem of Calculus', 'Evaluation of Definite Integrals by Substitution recublis', 'Some Properties of Definite Integrals'];
    }

    else if(topicValue == 'Application of Integrals'){
      var optionArray = ['Area under Simple Curves', 'Area between Two Carves'];
    }

    else if(topicValue == 'Differential Equations'){
      var optionArray = ['Basic Concepts', 'General and Particular Solutions of a Differential Equation', 'Formation of a Differential Equation whose General Solution is given', 'Methods of Solving First Order', 'First Differential Equations'];
    }

    else if(topicValue == 'Vector Algebra'){
      var optionArray = ['Some Basic Concepts', 'Types of Vectors', 'Addition of Vectors', 'Multiplication of a Vector by a Scalar', 'Product of Two Vectors'];
    }
    else if(topicValue == 'Three Dimensional Geometry'){
      var optionArray = ['Direction Cosines and Direction Ratios of a Line', 'Equation of a Line in Space', 'Angle between Two Lines', 'Shortest Distance between Two Lines', 'Plane', 'Coplanarity of Two Lines', 'Angle between Two Planes', 'Distance of a Point from a Plane', 'Angle between a Line and a Plane'];
    }
    else if(topicValue == 'Linear Programming'){
      var optionArray = ['Linear Programming Problem and its Mathematical Formulation', 'Different Types of Linear Programming Problems'];
    }
    else if(topicValue == 'Probability'){
      var optionArray = ['Conditional Probability', 'Multiplication Theorem on Probability', 'Independent Events', 'Bayes Theorem', 'Random Variables and its Probability Distributions', 'Bernoulli Trials and Binomial Distribution'];
    }

      for(var option in optionArray){
        var newOption = document.createElement("option");
        newOption.value = optionArray[option];
        newOption.innerHTML = optionArray[option];
        subTopicId.options.add(newOption);
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

// speech to text
document.getElementById("click_to_convert").addEventListener('click', function(){
   var speech = true;
   window.SpeechRecognition = window.webkitSpeechRecognition;
   const recognition = new SpeechRecognition();
   recognition.interimResults = true;

   recognition.addEventListener('result', e=>{
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)

    document.getElementById("convert_text").innerText = transcript;


   })

   if(speech == true){
    recognition.start();
   }
})