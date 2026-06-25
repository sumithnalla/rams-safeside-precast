this is the code i have used to make the sheet to store the date of the form.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Create all headers if the sheet is completely empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Source']);
    // Make the headers bold and freeze the top row
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    sheet.setFrozenRows(1);
  } else {
    // 2. Automatically add/fix missing headers on an existing sheet
    if (sheet.getRange(1, 1).getValue() !== 'Timestamp') {
      sheet.getRange(1, 1).setValue('Timestamp').setFontWeight("bold");
    }
    if (sheet.getRange(1, 2).getValue() !== 'Name') {
      sheet.getRange(1, 2).setValue('Name').setFontWeight("bold");
    }
    if (sheet.getRange(1, 3).getValue() !== 'Phone') {
      sheet.getRange(1, 3).setValue('Phone').setFontWeight("bold");
    }
    if (sheet.getRange(1, 4).getValue() !== 'Source') {
      sheet.getRange(1, 4).setValue('Source').setFontWeight("bold");
    }
  }

  try {
    // 3. Extract data from the incoming form request
    // Matches the HTML inputs: name="name", name="phone", name="source"
    var name = e.parameter.name || "N/A";
    var phone = e.parameter.phone || "N/A";
    var source = e.parameter.source || "N/A";
    var timestamp = new Date();
    
    // 4. Append the new row of data under the headers
    sheet.appendRow([timestamp, name, phone, source]);
    
    // 5. Send the email notification
    var emailAddress = "sumithofficial2@gmail.com";
    var subject = "New Lead: " + name;
    var message = "You have received a new form submission.\n\n" +
                  "Name: " + name + "\n" +
                  "Phone: " + phone;
    
    MailApp.sendEmail(emailAddress, subject, message);
    
    // 6. Return a success response to the form
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "message": "Data saved and email sent." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Handle errors safely
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}




this is the sheet url.

https://script.google.com/macros/s/AKfycbx0uGofufGZitR9C2nut_nh0_i-qFpEDwdkMy1yuhBZEIkinmUutNRzvDUA7e28Cspn/exec