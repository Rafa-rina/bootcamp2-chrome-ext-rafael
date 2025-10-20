const pingBtn = document.getElementById('ping');
const showStorageBtn = document.getElementById('showStorage');
const status = document.getElementById('status');

pingBtn.addEventListener('click', async () => {
  try {
    const res = await chrome.runtime.sendMessage({ type: 'PING' });
    status.textContent = `Background respondeu: ${res.time}`;
  } catch (err) {
    status.textContent = `Erro ao pingar background: ${err.message}`;
  }
});

showStorageBtn.addEventListener('click', async () => {
  chrome.storage.local.get(null, (items) => {
    status.textContent = `Storage: ${JSON.stringify(items, null, 2)}`;
  });
});

console.log("Popup carregado!");
