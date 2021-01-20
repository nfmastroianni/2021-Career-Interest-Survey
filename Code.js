/**
 * The function below captures data submitted to a Google Form
 * @param { object } onFormSubmit event object
 */

function onFormSubmit(e) {
  const response = e.values; // gets the values submitted to the form
  const rowNumber = e.range.getRow(); // gets the row number of the row being added to the spreadsheet
  // the response above contains data like timestamp, name, grade
  // below we will remove the the elements we do not need and get just the letter selected by the student

  let respLetters = response.map((val) => val.slice(0, 1)); // first we will take out the first character from each response item
  let letters = respLetters.slice(5); // here we remove the first 5 response items including email
  let profile = {}; // create an empty object to hold the letter counts

  // loop through the letters array, count them, and place them into the profile object
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    profile[letter] = profile[letter] ? profile[letter] + 1 : 1;
  }
  // declare the letter options students may select in an array
  const areas = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
  ];
  // declare to empty arrays to be used to insert the tally into the "tally" sheet
  let rowsData = [];
  let rowData = [];

  // create a tally of the letters selected from the areas array
  for (let i = 0; i < areas.length; i++) {
    if (profile[areas[i]]) {
      // check if the letter received any responses
      rowData.push(profile[areas[i]]);
    } else {
      // if the letter received no responses, push 0 (zero)
      rowData.push(0);
    }
  }
  rowsData.push(rowData); // push the row data into the rowsData variable so that it is 2 dimensional
  // preparing now to commit the row to the Google Spreadsheet sheet "tally"
  const ss = SpreadshetApp.getActive(); // get the active Google Sheet
  const tally = ss.getSheetByName("tally"); // get the target sheet named "tally"
  let range = tally.getRange(rowNumber, 5, 1, 18); // grab the range from the tally sheet to be updated
  range.setValues(rowsData); // set the tally data to the spreadsheet
}
