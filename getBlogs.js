require("chromedriver");

let wd = require("selenium-webdriver");
let arr=require("./data.json");

let cmds=process.argv.splice(2);
console.log(cmds);

async function openMedia(url){
    let browser = await new wd.Builder().forBrowser('chrome').build();
    browser.get(url);
}

async function main(){
    
    let ans;
    for(let obj of arr){
        for(let j=0;j<cmds.length;j+=2){

            if(obj[cmds[j]]==cmds[j+1]){
                ans=obj;
                console.log(ans);
            }else{
                ans=null;
                break;
            }
        }
        if(ans!=null){
            break;
        }
    }
    if(ans==null){
        console.log("Wrong Arguments");
    }
    else{
        let browser = await new wd.Builder().forBrowser('chrome').build();
        await browser.get(ans.url);

        let socialMediaButtons=await browser.findElements(wd.By.css(".profile-link.media.top1 div a"));
        let links=[];
        for(let button of socialMediaButtons){
            let link=await button.getAttribute("href");
            links.push(link);
        }

        for(let i in links){
            if(i%2==0){
                openMedia(links[i]);
            }
        }

    }

}

main();

// node getBlogs "Full Name" "Shannon McGuirk"
// node getBlogs "Full Name" "Domenica D'Ottavio" "Display Name" "Domenica"


// Now we can go to blogger social media pages
// by giving info input on command line