
import papers from '../javascript/paper_data.js';

const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

document.getElementById("myBtn").disabled = true;

form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){

	let check=false;
	papers.forEach(element => {
		if(element.paperName==file.name){
			check=true;
		}
	});
	if(check==false){
		window.alert("File not same as downloaded");
		window.location="http://localhost:3000/fileUpload.html";
		return false;
	}





    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
}

function uploadFile(name){
    progressArea.innerHTML = "";
    let uploadedHTML = `<li class="row">
                          <div class="content upload">
                            <i class="fas fa-file-alt"></i>
                            <div class="details">
                              <span class="name">${name} • Uploaded</span>
                            </div>
                          </div>
                          <i class="fas fa-check"></i>
                        </li>
                        `;
    uploadedArea.classList.remove("onprogress");
    uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    document.getElementById("myBtn").disabled = false;
}


//get time
function activate() {
	document.head.insertAdjacentHTML("beforeend", `
		<style>
			.time-picker {
				position: absolute;
				display: inline-block;
				padding: 10px;
				background: #eeeeee;
				border-radius: 6px;
			}

			.time-picker__select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				outline: none;
				text-align: center;
				border: 1px solid #dddddd;
				border-radius: 6px;
				padding: 6px 10px;
				background: #ffffff;
				cursor: pointer;
				font-family: 'Heebo', sans-serif;
			}
		</style>
	`);

	document.querySelectorAll(".time-pickable").forEach(timePickable => {
		let activePicker = null;

		timePickable.addEventListener("focus", () => {
			if (activePicker) return;

			activePicker = show(timePickable);

			const onClickAway = ({ target }) => {
				if (
					target === activePicker
					|| target === timePickable
					|| activePicker.contains(target)
				) {
					return;
				}

				document.removeEventListener("mousedown", onClickAway);
				document.body.removeChild(activePicker);
				activePicker = null;
			};

			document.addEventListener("mousedown", onClickAway);
		});
	});
}

function show(timePickable) {
	const picker = buildPicker(timePickable);
	const { bottom: top, left } = timePickable.getBoundingClientRect();

	picker.style.top = `${top}px`;
	picker.style.left = `${left}px`;

	document.body.appendChild(picker);

	return picker;
}

function buildPicker(timePickable) {
	const picker = document.createElement("div");
	const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
	const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberToOption);

	picker.classList.add("time-picker");
	picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join("")}
		</select>
		:
		<select class="time-picker__select">
			${minuteOptions.join("")}
		</select>
		<select class="time-picker__select">
			<option value="am">am</option>
			<option value="pm">pm</option>
		</select>
	`;

	const selects = getSelectsFromPicker(picker);

	selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

	if (timePickable.value) {
		const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

		selects.hour.value = hour;
		selects.minute.value = minute;
		selects.meridiem.value = meridiem;
	}

	return picker;
}

function getTimePartsFromPickable(timePickable) {
	const pattern = /^(\d+):(\d+) (am|pm)$/;
	const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

	return {
		hour,
		minute,
		meridiem
	};
}

function getSelectsFromPicker(timePicker) {
	const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

	return {
		hour,
		minute,
		meridiem
	};
}

function getTimeStringFromPicker(timePicker) {
	const selects = getSelectsFromPicker(timePicker);

	return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
	const padded = number.toString().padStart(2, "0");

	return `<option value="${padded}">${padded}</option>`;
}

activate();