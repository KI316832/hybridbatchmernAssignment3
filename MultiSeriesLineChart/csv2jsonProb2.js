const readline = require('readline');
const fs = require('fs');
var count=0;
var header=[];
var noOfCol=0;
var year=2001;
var result=[];

var arrestedArrayCount=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var notArrestedArrayCount=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const rl = readline.createInterface({
  input: fs.createReadStream('crimes2001onwards.csv')
});

rl.on('line', (line) => {


          var stringData=line.toString();

          if(count===0){
              header=line.split(',');
              noOfCol=header.length;
              count++;

          }else{

              var myNewLine=line.split(',');



          if(myNewLine[5]==="ASSAULT" &&(myNewLine[17]>=2001 && myNewLine[17]<=2016))
          {
            if(myNewLine[8]=='true'){
              //console.log(myNewLine[8]);
            arrestedArrayCount[myNewLine[17]-2001]=arrestedArrayCount[myNewLine[17]-2001]+1;}
             else if(myNewLine[8]=='false'){
             //console.log('-----');
          notArrestedArrayCount[myNewLine[17]-2001]=notArrestedArrayCount[myNewLine[17]-2001]+1;
          console.log(notArrestedArrayCount[myNewLine[17]-2001]);
        }
                    }
                  }

            //  console.log(countOver500Array);

});


rl.on('close', function() {

                for(var i=0;i<16;i++){
                  var obj = new Object();
                  var obj2 = new Object();

                  //obj[header[5]] ='ASSAULT';
                  obj[header[17]] = year;
                  obj['arrested'] =arrestedArrayCount[i];
                  obj['not-arrested'] =notArrestedArrayCount[i] ;
                  result.push(obj);


                          //  obj1['value2'] =count500AndUnderArray[i] ;

                        /*  result.push(obj1);

                        obj2[header[5]] ='THEFT';
                               obj2[header[6]] = '$500 AND UNDER';
                                 obj2[header[17]] = year++;
                                    obj2['value'] =count500AndUnderArray[i] ;

                              result.push(obj2);*/
                              year++;

              }

              console.log(result);

              fs.writeFile(process.cwd() + "/problem2A.json", JSON.stringify(result,undefined, 2), function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
              });

});
