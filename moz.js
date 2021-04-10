require("chromedriver");

let wd = require("selenium-webdriver");
let json2xls = require('json2xls');
let fs=require('fs');
let jsonArr=[];

let b2;
let input;

async function getAuthorInfo(url){
    
    let browser = await new wd.Builder().forBrowser('chrome').build();
    await browser.get(url);
    let obj={};

    let profileInfoTable=await browser.findElement(wd.By.css(".col-one-half"));
    let profileInfo=await profileInfoTable.findElements(wd.By.css(".profile-info.break-word tbody tr"));
    // console.log(profileInfo.length);
    
    obj["url"]=url;

    for(let pf of profileInfo){
        let tds=await pf.findElements(wd.By.css("td"));
        let key=await tds[0].getAttribute("innerText");
        let value=await tds[1].getAttribute("innerText");
        obj[key]=value;
    }
    
    let vitalStatsTable=await browser.findElement(wd.By.css(".vital-stats"));
    let statsInfo=await vitalStatsTable.findElements(wd.By.css("tbody tr"));
    // console.log(statsInfo.length);
    for(let sf of statsInfo){
        let tds=await sf.findElements(wd.By.css("td"));
        let key=await tds[0].getAttribute("innerText");
        let value=await tds[1].getAttribute("innerText");
        obj[key]=value;
    }

    browser.close();
    jsonArr.push(obj);
    // console.log(jsonArr);

}

async function contactsWork(authorLinks){
    let authors=authorLinks.length;
    authors=40;   // Can be commented
    let author=0;
    for(let i=1;i<=Math.ceil(authors/10);i++){
        let authorPagesPromises=[];
        for(let j=0;j<10;j++){
            if(author<authors){
                let url=authorLinks[author];
                authorPagesPromises.push(getAuthorInfo(url));
                author++;
            }
        }
        await Promise.all(authorPagesPromises);
    }

    let xls = json2xls(jsonArr);
    fs.writeFileSync('data.xlsx', xls, 'binary');

    fs.writeFileSync('data.json',JSON.stringify(jsonArr));

    input.sendKeys('Now we have all data in excel and json format',wd.Key.ENTER);

}

async function getAuthors(url){
    let browser = await new wd.Builder().forBrowser('chrome').build();
    await browser.get(url);
    let authors=await browser.findElements(wd.By.css("a[rel='author']"));
    let authorLinks=[];
    for(let i=0;i<authors.length;i++){
        let link=await authors[i].getAttribute("href");
        authorLinks.push(link)
    }
    browser.close();
    return authorLinks;
}

async function main(){
    let browser = await new wd.Builder().forBrowser('chrome').build();

    /******************************************************************* */
    b2 = await new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    await b2.get("https://www.rapidtables.com/tools/notepad.html");

    input=await b2.findElement(wd.By.css("textarea#area")); 
    input.sendKeys('First it will fetch all urls of bloggers',wd.Key.ENTER);
    /****************************************************************** */


    await browser.get("https://moz.com/blog");
    let pagesList=await browser.findElements(wd.By.css("ul.pagination.justify-content-end li")); 
    let pages=await pagesList[5].getAttribute("innerText");
    // console.log(pages);
    pages=3; // Can be commented
    let page=1;
    let dublicateAuthorLinksOnPages=[];
    for(let i=1;i<=Math.ceil(pages/10);i++){
        let authorLinksOnPages=[];
        for(let j=0;j<10;j++){
            if(page<=pages){
                let url=`https://moz.com/blog/p${page}?pornio_brothers&page=177?pornio_brothers=&page=177`;
                authorLinksOnPages.push(getAuthors(url));
                page++;
            }
        }
        let someLinks=await Promise.all(authorLinksOnPages);
        dublicateAuthorLinksOnPages=dublicateAuthorLinksOnPages.concat(someLinks);
    }
    
    // console.log(dublicateAuthorLinksOnPages.length);


    // REMOVE DUPLICATES
    let authorLinks=[];
    for(let i=0;i<dublicateAuthorLinksOnPages.length;i++){
        for(let j=0;j<dublicateAuthorLinksOnPages[i].length;j++){
            if(authorLinks.indexOf(dublicateAuthorLinksOnPages[i][j]===-1)){
                authorLinks.push(dublicateAuthorLinksOnPages[i][j]);
            }
        }
    }

    // console.log(authorLinks.length);

    input.sendKeys('Now we are getting info of all bloggers',wd.Key.ENTER);

    // CONTACTS WORK
    contactsWork(authorLinks);


}

main();


function wait(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms )
    })
  }
