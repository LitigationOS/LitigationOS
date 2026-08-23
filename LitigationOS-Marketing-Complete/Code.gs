const SPREADSHEET_ID = '1uY8va-NOs2aUdHhbJrUOyz8QFvJRIAveCoSs1IRcIwQ';
const SHEET_NAME = 'Signups';

function doGet() {
  return ContentService
    .createTextOutput('LitigationOS form receiver is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Submitted at', 'Full name', 'Email', 'Firm / organisation',
        'Role', 'Message', 'Source'
      ]);
    }

    const data = e && e.parameter ? e.parameter : {};
    sheet.appendRow([
      new Date(), data.name || '', data.email || '', data.firm || '',
      data.role || '', data.message || '', data.source || 'LitigationOS website'
    ]);

    return ContentService.createTextOutput('Success');
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput('Error: ' + error.message);
  }
}
