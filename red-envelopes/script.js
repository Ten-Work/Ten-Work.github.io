function calculateRedEnvelopes(salary, totalBudget, recipients) {
    const ranges = {
        parents: [2000, 10000],
        parentsInLaw: [2000, 10000],
        grandparents: [1000, 6600],
        relatives: [500, 1500],
        ownChildren: [1000, 3000],
        friendsChildren: [200, 600],
        siblings: [1000, 3000],
    };

    const result = {};
    let totalSpent = 0;

    for (const [key, count] of Object.entries(recipients)) {
        if (count > 0) {
            const [min, max] = ranges[key];
            const suggestedAmount = Math.min(max, salary / 10); 
            const amount = Math.round(Math.min(suggestedAmount, totalBudget / count) / 100) * 100; 
            result[key] = Array(count).fill(amount);
            totalSpent += amount * count;
        }
    }

    return { result, totalSpent };
}

document.getElementById('redEnvelopeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const salary = Number(document.getElementById('salary').value);
    const budget = Number(document.getElementById('budget').value);
    const recipients = {
        parents: Number(document.getElementById('parents').value || 0),
        parentsInLaw: Number(document.getElementById('parentsInLaw').value || 0),
        grandparents: Number(document.getElementById('grandparents').value || 0),
        relatives: Number(document.getElementById('relatives').value || 0),
        ownChildren: Number(document.getElementById('ownChildren').value || 0),
        friendsChildren: Number(document.getElementById('friendsChildren').value || 0),
        siblings: Number(document.getElementById('siblings').value || 0),
    };

    const { result, totalSpent } = calculateRedEnvelopes(salary, budget, recipients);

    const distributionList = document.getElementById('distributionList');
    distributionList.innerHTML = '';
    for (const [key, amounts] of Object.entries(result)) {
        const label = {
            parents: '父母',
            parentsInLaw: '公婆',
            grandparents: '祖父母、外公外婆',
            relatives: '親戚長輩',
            ownChildren: '自己小孩',
            friendsChildren: '親友小孩',
            siblings: '兄弟姐妹',
        }[key];
        const total = amounts.reduce((a, b) => a + b, 0);
        const listItem = document.createElement('li');
        listItem.textContent = `${label}：${amounts.length} 人，每人 ${amounts[0]} 台幣，總共 ${total} 台幣`;
        distributionList.appendChild(listItem);
    }

    document.getElementById('totalSpent').textContent = totalSpent;
    document.getElementById('results').classList.remove('hidden');
});