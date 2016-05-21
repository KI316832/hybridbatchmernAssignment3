const readline = require('readline');
const fs = require('fs');
var count=0;
var header=[];
var noOfCol=0;
var year=2001;
var result=[];

var countOver500Array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var count500AndUnderArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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



          if(myNewLine[5]==='THEFT' && (myNewLine[6]==='OVER $500'||myNewLine[6]==='$500 AND UNDER')
          &&(myNewLine[17]>=2001 && myNewLine[17]<=2016))
          {if(myNewLine[6]==='OVER $500')
            countOver500Array[myNewLine[17]-2001]=countOver500Array[myNewLine[17]-2001]+1;
            else if(myNewLine[6]==='$500 AND UNDER'){
          count500AndUnderArray[myNewLine[17]-2001]=count500AndUnderArray[myNewLine[17]-2001]+1;}

                    }
                  }

            //  console.log(countOver500Array);

});


rl.on('close', function() {






              for(var i=0;i<16;i++){
                var obj1 = new Object();
                var obj2 = new Object();

                obj1[header[5]] ='THEFT';
                    obj1[header[6]] = 'OVER $500';
                       obj1[header[17]] = year;
                          obj1['value'] =countOver500Array[i] ;
                          //  obj1['value2'] =count500AndUnderArray[i] ;

                          result.push(obj1);

                        obj2[header[5]] ='THEFT';
                               obj2[header[6]] = '$500 AND UNDER';
                                 obj2[header[17]] = year++;
                                    obj2['value'] =count500AndUnderArray[i] ;

                              result.push(obj2);

              }

              console.log(result);

              fs.writeFile(process.cwd() + "/crimes20.json", JSON.stringify(result,undefined, 2), function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
              });





});
