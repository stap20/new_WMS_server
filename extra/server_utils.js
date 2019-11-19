var randomize = require("randomatic");
fs = require("fs");
PDFDocument = require("pdfkit");
SVGtoPDF = require("svg-to-pdfkit");
qr = require("qr-image");

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

function dateFormater(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
const serverUtils = {
  generateLoginCode() {
    return randomize("?", 5, { chars: "0123456789" });
  },
  getDuration_days(date1, date2) {
    date1_un = dateFormater(date1);
    date2_un = dateFormater(date2);
    const date1_fix = new Date(date1_un);
    const date2_fix = new Date(date2_un);
    const diffTime = Math.abs(date2_fix - date1_fix);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  async generate_PdfBarcodes(barcode_filledData_list) {
    var doc = new PDFDocument();
    file = fs.createWriteStream("file.pdf");
    for (var i = 0; i < barcode_filledData_list.length; i++) {
      var svg_string = qr.imageSync(barcode_filledData_list[i], {
        type: "svg"
      });
      SVGtoPDF(doc, svg_string, 0, 0);
      if (i + 1 != barcode_filledData_list.length) {
        doc.addPage();
      }
    }
    await doc.pipe(file);
    await doc.end();
  }
};

exports.serverUtils = serverUtils;
