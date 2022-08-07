$("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });


function viewModal(){
    var sub = document.querySelector(".subject").value;
    document.querySelector(".modal-title").innerText = `Select topics to be excluded : (${sub})`
    createModal(sub);
}

function createModal(subject){
    if(subject == "Mathematics"){
        var optionArray = ['Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Application of Derivatives','Integrals','Application of Integrals','Differential Equations','Vector Algebra','Three Dimensional Geometry','Linear Programming','Probability'];
    }
    else if(subject == "Physics"){
        var optionArray = ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics and Optical Instruments','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics'];

    }else if(subject == "Chemistry"){
        var optionArray = ['The Solid State','Solutions','Electrochemistry','Chemical Kinetics','Surface Chemistry','General Principles and Processes of Isolation of Elements','The p-Block Elements','The d- and f- Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules','Polymers','Chemistry in Everyday Life'];

    }else{
        var optionArray = ['Reproduction in Organisms','Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principle of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Diseases','Strategies for Enhancement in Food Production','Microbes in Human Welfare','Biotechnology: Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and Conservation','Environmental Issues'];
    }
    let modalCard = document.querySelector(".modal-body");
    let optionData = "";
    for(var i=0;i<optionArray.length;i++){
        let option = `<div class="pretty p-icon p-smooth">
        <input class="excluded-topics" value="${i}" type="checkbox" />
        <div class="state p-danger-o">
          <i class="icon mdi fa fa-times" aria-hidden="true"></i>
          <label>${optionArray[i]}</label>
        </div>
      </div><br>`;
      optionData += option;
      modalCard.innerHTML = optionData;
    }
}


document.querySelector("#download").style.visibility = "hidden";