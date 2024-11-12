const fs = require('fs');
const axios = require('axios');
const parseRules = require('ad-block').parse;

async function generateRules() {
    const response = await axios.get('https://easylist.to/easylist/easylist.txt');
    const rules = parseRules(response.data);

    const declarativeRules = rules.map((rule, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: rule.rawRule, resourceTypes: ['main_frame', 'script'] }
    }));

    fs.writeFileSync('./rules.json', JSON.stringify(declarativeRules, null, 2));
}

generateRules();
