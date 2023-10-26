import * as htmlparser2 from "htmlparser2";

export class JankyParser {
    constructor() {
      this.tagStatuses = {
        bold: false,
        li: false
      };
      this.result = [];
      this.parser = new htmlparser2.Parser({
        onopentag: (name, attribs) => {
          if (name in this.tagStatuses){
            this.tagStatuses[name] = true
          }
        },
        ontext: (text) => {
          if(text==="\r\n"){
            return
          }
          // Add the text to the result, with the right flag
          this.result.push({ text, bold: this.tagStatuses.bold, li: this.tagStatuses.li });
        },
        onclosetag: (name) => {
          if (name in this.tagStatuses){
            this.tagStatuses[name] = false
          }
        },
        onend: () => {
          // Process the parsed content
          console.log("Parsed Content:");
          this.result.forEach((item) => {
            if (item.bold) {
              console.log(`Bold: ${item.text}`);
            } else {
              console.log(`Regular: ${item.text}`);
            }
          });
        },
      });
    }
    parse(input){
      this.result =[]
      this.parser.write(input)
      return this.result
    }
  }
  
  