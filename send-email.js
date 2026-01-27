const https = require('https');
const fs = require('fs');
const path = require('path');

// Pig facts (same as in script.js)
const pigFacts = [
    "Pigs are considered one of the most intelligent domesticated animals, often compared to dogs and even primates in cognitive ability.",
    "Pigs can't sweat because they have very few sweat glands. That's why they roll in mud to cool off!",
    "A pig's squeal can be as loud as 115 decibels - that's louder than a jet engine at takeoff!",
    "Pigs have an excellent sense of smell and are used to find truffles, a highly prized culinary ingredient.",
    "Newborn piglets learn to run to their mothers' voices, and mother pigs sing to their babies while nursing.",
    "Pigs can run at speeds up to 11 miles per hour - that's faster than a 6-minute mile!",
    "Pigs have excellent long-term memories and can remember things they learned years earlier.",
    "A pig's tongue contains 15,000 taste buds. Humans have only about 9,000.",
    "Pigs dream just like humans do. Scientists have observed REM sleep in pigs.",
    "Pigs are very social animals and form close bonds with each other. They love to sleep nose-to-nose.",
    "Pigs can play video games! Studies have shown they can learn to use joysticks with their snouts.",
    "A pig's snout is a highly sensitive organ used for digging and finding food underground.",
    "Pigs are naturally very clean animals and will designate a bathroom area away from where they eat and sleep.",
    "Wild pigs can be found on every continent except Antarctica.",
    "Pigs can recognize themselves in mirrors, a sign of self-awareness that few animals possess.",
    "A group of pigs is called a sounder, a drift, or a drove.",
    "Pigs have been trained to detect landmines and help with search and rescue operations.",
    "Pigs communicate with over 20 different vocalizations, from grunts to squeals.",
    "A pig's heart is so similar to a human heart that pig heart valves are used in human heart surgery.",
    "Pigs have panoramic vision of about 310 degrees and can see behind themselves without turning their heads.",
    "Pigs love music and have been shown to prefer certain genres over others.",
    "The phrase 'sweating like a pig' is a misnomer since pigs can hardly sweat at all!",
    "Pigs are one of the oldest domesticated animals, first domesticated around 9,000 years ago.",
    "A mother pig is called a sow, a father pig is called a boar, and babies are called piglets.",
    "Pigs can hold their breath for up to 5 minutes when swimming.",
    "Winston Churchill famously said: 'Dogs look up to us. Cats look down on us. Pigs treat us as equals.'",
    "Pigs have four toes on each foot but only walk on two of them.",
    "The average pig sleeps about 8 hours a day, similar to humans.",
    "Pigs can learn their names within the first two weeks of life.",
    "A pig's sense of smell is about 2,000 times more sensitive than a human's.",
    "Pigs have been shown to have empathy and can sense when other pigs are happy or upset.",
    "A pig's gestation period is 3 months, 3 weeks, and 3 days.",
    "Pigs were domesticated in China around 7500 BC.",
    "The smallest breed of pig is the Kunekune, which originated in New Zealand.",
    "Pigs can swim! They're actually excellent swimmers and some wild pigs swim between islands.",
    "A pig named Hamlet was the first pig to be trained as a service animal.",
    "Pigs are used in medical research because their organs are similar in size and function to human organs.",
    "The largest pig ever recorded weighed 2,552 pounds and was named Big Bill.",
    "Pigs can learn tricks faster than dogs in many cases.",
    "Baby pigs (piglets) can recognize their own names by the time they're 2 weeks old.",
    "Pigs have been shown to understand the concept of reflection at a younger age than human children.",
    "A pig's memory is so good they can remember specific locations of food for years.",
    "Pigs use different grunts to communicate different things, like a special grunt for food.",
    "The curly tail of a pig is actually a sign of good health - stressed pigs have straight tails.",
    "Pigs can feel optimism and pessimism, just like humans.",
    "In Denmark, there are twice as many pigs as people.",
    "Pigs are the 4th most intelligent animal on Earth, after chimpanzees, dolphins, and elephants.",
    "Ancient Egyptians considered pigs sacred to the god Set.",
    "A pig's skin is very similar to human skin and is sometimes used for treating burn victims.",
    "Pigs can distinguish between pigs they know and pigs that are strangers.",
    "The word 'piggyback' comes from 'pick pack' and has nothing to do with pigs.",
    "Pigs can be house-trained just like dogs and cats.",
    "Wild boars can run up to 30 miles per hour when threatened.",
    "Pigs have been used to pull carts and plows throughout history.",
    "The pig is the 12th animal in the Chinese zodiac.",
    "Pigs roll in mud to protect their skin from sunburn and parasites.",
    "A pig's sense of direction is excellent - they rarely get lost.",
    "Pigs are omnivores and will eat almost anything, including vegetables, fruits, and insects.",
    "The world's oldest pig lived to be 23 years old.",
    "Pigs greet each other by rubbing noses.",
    "A pig's teeth never stop growing throughout their lifetime.",
    "Pigs can be taught to fetch, sit, and spin just like dogs.",
    "In the Bahamas, there's a beach where wild pigs swim in the ocean and greet tourists.",
    "Pigs have been known to save their owners' lives by alerting them to dangers.",
    "A pig named Lulu saved her owner's life by lying in traffic to stop cars and get help.",
    "Pigs can become depressed if they don't have enough mental stimulation.",
    "The Vietnamese Pot-bellied pig became a popular pet in the 1980s.",
    "Pigs are farmed on every continent except Antarctica.",
    "A pig can eat 4-6 pounds of food per day.",
    "Pigs prefer to sleep with their heads pointing north or south, aligned with Earth's magnetic field.",
    "The bristles on a pig's back stand up when they're excited or scared.",
    "Pigs can recognize up to 30 individual pigs in their social group.",
    "A pig's snout can move independently of its head to root around in soil.",
    "Pigs have been trained to sniff out drugs and explosives, like dogs.",
    "The phrase 'pig-headed' refers to the stubbornness pigs can show when they don't want to do something.",
    "Pigs need companionship and do poorly when kept alone.",
    "A pig's average body temperature is 102.5°F (39.2°C).",
    "Pigs were brought to the Americas by Christopher Columbus in 1493.",
    "The red wattle pig is known for the fleshy wattles that hang from its neck.",
    "Pigs can be trained to come when called, just like dogs.",
    "A group of young pigs playing together is called a 'litter at play.'",
    "Pigs have been living alongside humans for over 10,000 years.",
    "The Gloucestershire Old Spots pig is known for its excellent mothering abilities.",
    "Pigs can suffer from the same diseases as humans, including the flu.",
    "A pig uses its snout like a hand to explore and manipulate objects.",
    "Pigs have been shown to anticipate future events and plan accordingly.",
    "The Mangalitsa pig has a woolly coat that looks like sheep's wool.",
    "A pig's intelligence has been compared to that of a 3-year-old human child.",
    "Pigs are curious animals and love to explore new environments.",
    "The Hampshire pig is one of the oldest American breeds of pig.",
    "Pigs can sense time and know when it's feeding time.",
    "A baby pig doubles its birth weight in the first week of life.",
    "Pigs form hierarchies in their social groups with dominant and submissive members.",
    "The Berkshire pig is known for producing high-quality pork in Japan.",
    "Pigs can be trained to use a litter box indoors.",
    "A pig's eyesight is not as good as its other senses, but they can see in color.",
    "Pigs have been known to console other distressed pigs by staying close to them.",
    "The Tamworth pig is one of the oldest pig breeds, originating in England.",
    "Pigs can learn to open gates and doors to escape enclosures.",
    "A sow can have 8-12 piglets in a single litter.",
    "Pigs have been used in therapy settings to help people with disabilities.",
    "A pig's nose print is unique, just like a human fingerprint.",
    "Pigs have been shown to prefer novelty and get bored with the same routine.",
    "The Duroc pig is known for its reddish-brown color and fast growth rate.",
    "Pigs can suffer from loneliness and depression when separated from their companions.",
    "A pig's hearing is much more sensitive than a human's.",
    "Pigs can recognize human faces and remember people who have treated them well or poorly.",
    "A pig's tail wags when it's happy, similar to a dog.",
    "Pigs have been shown to use tools in laboratory settings.",
    "A pig's sense of touch in its snout is incredibly refined.",
    "Pigs can remember the solution to a puzzle for at least 3 years.",
    "Pigs can form friendships that last their entire lives.",
    "The Yorkshire pig is one of the most common breeds worldwide.",
    "Pigs have been shown to understand symbolic language to some degree.",
    "Pigs were among the first animals to be cloned successfully.",
    "Pigs can learn from watching other pigs complete tasks.",
    "Pigs have been trained to herd sheep, just like border collies.",
    "A pig's brain is about the size of a tangerine.",
    "Pigs can distinguish between classical music and rock music.",
    "Pigs have been featured as main characters in many famous books and movies.",
    "Pigs can navigate mazes as well as or better than dogs.",
    "Pigs have complex social lives with friends, rivals, and family bonds.",
    "Pigs can understand basic commands in multiple languages.",
    "Pigs have been shown to have individual personalities.",
    "Pigs can experience positive emotions like joy and contentment.",
    "A pig's lifespan in the wild can be up to 20 years.",
    "Pigs can understand cause and effect relationships.",
    "A piglet weighs about 2.5 pounds at birth.",
    "The Kune Kune pig is known for being especially friendly to humans.",
    "Pigs have been documented using deception to mislead other pigs to food sources.",
    "Pigs can tell the difference between a kind handler and a rough one.",
    "Pigs can problem-solve and figure out how to access food rewards.",
    "Pigs can sense the emotional state of humans around them.",
    "A fully grown domestic pig can weigh between 300-700 pounds.",
    "Pigs have been shown to prefer certain types of bedding for comfort.",
    "Pigs can be potty trained in as little as a few days.",
    "A pig's digestive system is remarkably similar to a human's.",
    "Pigs can adjust their behavior based on what they've learned from past experiences.",
    "A sow can recognize her piglets even after they've been separated for months."
];

// Pig images
const pigImages = [
    "amber-kipp-EwJMBIshgXU-unsplash.jpg",
    "christopher-carson-i4XLJmlYit4-unsplash.jpg",
    "dan-renco-Y06imaOLycY-unsplash.jpg",
    "diego-san-tlJ_5jVHMF4-unsplash.jpg",
    "forest-s-ZKbve9f7Mp4-unsplash.jpg",
    "jonathan-cooper-Z3Z7Kp3mHtI-unsplash.jpg",
    "kenneth-schipper-6y7jACxmhP8-unsplash.jpg",
    "kenneth-schipper-Cm11a9jSKZc-unsplash.jpg",
    "kimberly-lake-VBmRbvMrb7A-unsplash.jpg",
    "laura-anderson-CP9GGy_LkIY-unsplash.jpg",
    "lucia-macedo-4gyYf1ItdHI-unsplash.jpg",
    "marek-piwnicki-PUVVsYJPh78-unsplash.jpg",
    "mathias-grischott-nG_Y_TG3O-w-unsplash.jpg",
    "matthieu-petiard-SSjGNxxqD6k-unsplash.jpg",
    "nico-castez-YKAJ2kQpqQw-unsplash.jpg",
    "pascal-debrunner-b-zyMn_e_R4-unsplash.jpg",
    "pig1.jpg",
    "pig2.jpg",
    "samuel-cruz-LlGGul6E_KM-unsplash.jpg",
    "stefanie-poepken-9tSzeU5ZSLQ-unsplash.jpg",
    "veronica-white-ZuixmDWAHq8-unsplash.jpg",
    "zoe-richardson-vMjrs3C50d8-unsplash.jpg"
];

// Same seeded random function as the website
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getTodaysContent() {
    const dayOfYear = getDayOfYear();
    const year = new Date().getFullYear();
    const seed = year * 1000 + dayOfYear;

    const imageIndex = Math.floor(seededRandom(seed) * pigImages.length);
    const factIndex = Math.floor(seededRandom(seed) * pigFacts.length);

    return {
        image: pigImages[imageIndex],
        fact: pigFacts[factIndex],
        date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
}

function createEmailHtml(content, imageUrl) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; background-color: #ffecd2; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 30px; text-align: center;">
            <h1 style="color: #d4548e; margin: 0; font-size: 28px;">Daily Pig Pic</h1>
            <p style="color: #666; margin: 10px 0 0 0;">${content.date}</p>
        </div>

        <div style="padding: 0;">
            <img src="${imageUrl}" alt="Cute pig of the day" style="width: 100%; display: block;">
        </div>

        <div style="padding: 25px; background: linear-gradient(to bottom, #fff5f5, #ffffff);">
            <h2 style="color: #e87da0; font-size: 18px; margin: 0 0 15px 0;">Pig Fact of the Day</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0;">${content.fact}</p>
        </div>

        <div style="padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">
                <a href="https://13azil.github.io/PigPics/" style="color: #d4548e;">View on web</a> |
                <a href="%unsubscribe_url%" style="color: #999;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
`;
}

async function sendEmail(to, subject, html, apiKey) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            from: 'Daily Pig Pics <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            html: html
        });

        const options = {
            hostname: 'api.resend.com',
            path: '/emails',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(body));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function main() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY environment variable is required');
        process.exit(1);
    }

    // Load subscribers
    const subscribersFile = path.join(__dirname, 'subscribers.json');
    const { subscribers } = JSON.parse(fs.readFileSync(subscribersFile, 'utf8'));

    if (subscribers.length === 0) {
        console.log('No subscribers to send to');
        return;
    }

    // Get today's content
    const content = getTodaysContent();

    // GitHub Pages URL for the image
    const imageUrl = `https://13azil.github.io/PigPics/images/${content.image}`;

    const subject = `Daily Pig Pic - ${content.date}`;
    const html = createEmailHtml(content, imageUrl);

    console.log(`Sending daily pig pic to ${subscribers.length} subscriber(s)...`);
    console.log(`Image: ${content.image}`);
    console.log(`Fact: ${content.fact.substring(0, 50)}...`);

    let successCount = 0;
    let failCount = 0;

    for (const email of subscribers) {
        try {
            await sendEmail(email, subject, html, apiKey);
            console.log(`Sent to: ${email}`);
            successCount++;
        } catch (error) {
            console.error(`Failed to send to ${email}:`, error.message);
            failCount++;
        }
    }

    console.log(`\nComplete! Sent: ${successCount}, Failed: ${failCount}`);
}

main().catch(console.error);
