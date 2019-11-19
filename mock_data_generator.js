/*var qr = require('qr-image');

var jspdf = require('jspdf')
 
var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
const svgElement = svg_string

const width = 300, height = 200;
 
// create a new jsPDF instance
const pdf = jspdf('l', 'pt', [width, height]);
 
// render the svg element
svg2pdf(svgElement, pdf, {
    xOffset: 0,
    yOffset: 0,
    scale: 1
});
 
// get the data URI
const uri = pdf.output('datauristring');
 
// or simply save the created pdf
pdf.save('myPDF.pdf');*/

fs = require('fs')
PDFDocument = require('pdfkit')
SVGtoPDF = require('svg-to-pdfkit');

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

var doc = new PDFDocument(),
stream = fs.createWriteStream('file.pdf'),

 qr = require('qr-image'); 
var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
var svg_string2 = qr.imageSync('I losdklajskldjlkjasdlkjakjsdjlkasdve QR!', { type: 'svg' });
const svgElement = svg_string
const svgElement2 = svg_string2

SVGtoPDF(doc, svgElement, 1, 0);
doc.addPage()
SVGtoPDF(doc, svgElement2, 0, 0);
stream.on('finish', function() {
  console.log(fs.readFileSync('file.pdf'))
});

doc.pipe(stream);
doc.end();

