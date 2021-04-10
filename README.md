# MMUBwebScrappingBloggers
Bloggers Information is fetched by web automation using selenium-webdriver


Bloggers' page address is first stored in the array asynchronously.
Then Each Bloggers' Information is stored in array of json objects, and also stored in excel.
// usage
node moz.js



Now using this data we can search for particular blogger's blogs and their social media pages.'
by passing arguments in command line. 
//usage
node getBlogs first_argument(key) second_argument(value) of fetched data
node getBlogs "Full Name" "Shannon McGuirk"
node getBlogs "Full Name" "Domenica D'Ottavio" "Display Name" "Domenica"
node getBlogs "Full Name" "Shannon McGuirk"

![image](https://user-images.githubusercontent.com/54452447/114279214-2644be80-9a51-11eb-94bb-b3d19a96637e.png)

JSON DATA EXAMPLE

[
    {
        "url": "https://moz.com/community/users/155620",
        "Full Name": "Cyrus Shepard",
        "Display Name": "Cyrus-Shepard",
        "Job Title": "Founder",
        "Company": "Zyppy.com",
        "Type of Work": "Business Owner",
        "MozPoints:": "10917",
        "Level:": "Oracle",
        "Community Rank:": "Unranked",
        "Thumbs Up:": "10898",
        "Last Activity:": "14 hours, 8 minutes ago",
        "Member Since:": "8/24/2009"
    },
    {
        "url": "https://moz.com/community/users/13017",
        "Full Name": "Miriam Ellis",
        "Display Name": "MiriamEllis",
        "Email": "info@solaswebdesign.net",
        "MozPoints:": "22765",
        "Level:": "Oracle",
        "Community Rank:": "Unranked",
        "Thumbs Up:": "6211",
        "Last Activity:": "19 hours, 55 minutes ago",
        "Member Since:": "2/23/2006"
    },
    {
        "url": "https://moz.com/community/users/4742686",
        "Full Name": "Shannon McGuirk",
        "Display Name": "Shannon-McGuirk",
        "Job Title": "Head of PR and Content",
        "Company": "Aira.net",
        "Type of Work": "Agency",
        "MozPoints:": "337",
        "Level:": "Specialist",
        "Community Rank:": "171",
        "Thumbs Up:": "139",
        "Last Activity:": "1 day, 7 hours ago",
        "Member Since:": "7/5/2016"
    }
]
