const count = document.querySelector('#package-count');
const fwVersion = document.querySelector('#fw-version');
const state = document.querySelector('#repo-state');

async function loadRepositoryStatus() {
  try {
    const response = await fetch('/repo/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const index = await response.json();
    const packages = Array.isArray(index.packages) ? index.packages : [];
    count.textContent = String(packages.length);
    const fw = packages
      .filter(pkg => pkg.name === 'fw')
      .sort((a, b) => String(b.release_date || '').localeCompare(String(a.release_date || '')))[0];
    fwVersion.textContent = fw?.version ? `v${fw.version}` : '–';
    state.textContent = `repository status // online // ${packages.length} versions`;
  } catch (error) {
    count.textContent = '–';
    fwVersion.textContent = '–';
    state.textContent = 'repository status // unavailable';
    console.warn('Fritz.Wulf repository status unavailable', error);
  }
}

loadRepositoryStatus();
