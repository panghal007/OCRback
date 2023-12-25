// Function to check if a string is a letter
function isLetter(s) {
    return s.length === 1 && s.match(/[a-zA-Z\s]+/);
}

// Function to clean and extract data from the OCR string
export const cleanData = (str) => {
    // Create a map to store extracted data
    const mp = new Map();

    // Extract 'Name' substring
    var substring = "Name";
    var endstring = "Last";
    var startindex = str.search(substring);
    var endindex = str.search(endstring);
    let sub = str.substring(startindex + 5, endindex);
    mp["firstName"] = sub;

    // Extract 'Last name' substring
    let res = "";
    let ls = "Last name ";
    let st = str.search(ls);
    for (let i = st + 10; i < str.length && isLetter(str[i]); i++) {
        res += str[i];
    }
    mp["lastName"] = res;

    // Extract date-related information using regular expressions
    let inputString = str;
    let dobPattern = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\.|) \d{4}\b/g;
    let matchedDate = inputString.match(dobPattern);
    mp["dob"] = matchedDate[0];
    mp["doi"] = matchedDate[2];
    mp["doe"] = matchedDate[1];

    // Extract identification number using a regular expression
    let pattern = /\d \d{4} \d{5} \d{2}/;
    let matchedNumber = str.match(pattern);
    mp['identification'] = matchedNumber[0];

    // Create a JSON object with the extracted data
    const jsonOcr = {
        identificationNumber: matchedNumber[0],
        firstName: sub,
        lastName: res,
        dateOfBirth: matchedDate[0],
        dateOfIssue: matchedDate[1],
        dateOfExpiry: matchedDate[2],
    }

    // Log the JSON object to the console
    console.log(jsonOcr);

    // Return the JSON object
    return jsonOcr;
}


// const str = "Thai National ID Card 1 1037 02071 81 1 Identification Number Name Miss Nattarika Last name Yangsuai 25 2539 Date of Birth 25 Jun. 1996 111/17 2 24 2553 - 24 Jul. 2020 Date of Issue from 24 9.8. 2572 24 Jun. 2023 2 Date of Expiry 160 15 _160 150 40 1398-09-07241719";
// cleanData(str);
