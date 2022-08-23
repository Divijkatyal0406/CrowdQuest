function copyTextFxn() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  //Close the virtual keyboard
  var element = document.querySelector('.keyboard');
  element.classList.add('keyboard--hidden');

  /* Alert the copied text */
  swal("", `Copied the text: ${copyText.value}`, "success");

  copyText.value = "";
}
