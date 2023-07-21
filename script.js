document.getElementById('linkForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const taskLinkValue = document.getElementById('taskLink').value;
  const khLinkValue = document.getElementById('khLink').value;

  // Replace 'YOUR_BITLY_API_KEY' with your actual Bitly API key
  const apiKey = '7b24f37bdd5afc778a5e9e6bc1c0cb6a14a5db86';
  
  try {
    const taskShortenedLink = await shortenLink(taskLinkValue, apiKey);
    const khShortenedLink = await shortenLink(khLinkValue, apiKey);

    const taskResultElement = document.getElementById('taskResult');
    const khResultElement = document.getElementById('khResult');

    taskResultElement.innerHTML = `Task link - <a href="${taskShortenedLink}" target="_blank">${taskShortenedLink}</a>`;
    khResultElement.innerHTML = `KH link - <a href="${khShortenedLink}" target="_blank">${khShortenedLink}</a>`;

    // Clear the input fields
    document.getElementById('taskLink').value = '';
    document.getElementById('khLink').value = '';
} catch (error) {
    console.error('Error occurred while shortening links:', error);
}
});

async function shortenLink(link, apiKey) {
  const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
          long_url: link,
      }),
  });

  const data = await response.json();
  return data.link;
}

// ... Same as before ...

function copyResultToClipboard() {
  const taskResultText = document.getElementById('taskResult').textContent;
  const khResultText = document.getElementById('khResult').textContent;

  const combinedResult = taskResultText + '\n' + khResultText;

  const tempElement = document.createElement('textarea');
  tempElement.value = combinedResult;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);

  alert('Result data copied to clipboard!');
}
