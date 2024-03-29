
const containers = [
    { id: 'container1', name: 'web_server', status: 'running' },
    { id: 'container2', name: 'database', status: 'stopped' }
  ];
  
  function renderContainers() {
    const containerList = document.getElementById('container-list');
    containerList.innerHTML = '';
    containers.forEach(container => {
      const containerItem = document.createElement('div');
      containerItem.innerHTML = `
        <div>
          <h3>${container.name}</h3>
          <p>Status: ${container.status}</p>
        </div>
      `;
      containerList.appendChild(containerItem);
    });
  }
 
  document.getElementById('start-btn').addEventListener('click', () => console.log('Start button clicked'));
  document.getElementById('stop-btn').addEventListener('click', () => console.log('Stop button clicked'));
  document.getElementById('restart-btn').addEventListener('click', () => console.log('Restart button clicked'));
  
  renderContainers();
  