async function updateRSS() {
  await fetch('/api/rss', { method: 'POST' });
}

export default updateRSS;
