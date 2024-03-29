// Sample container data
const containers = [
    { id: 'container1', name: 'web_server', status: 'running', cpuUsage: '20%', memoryUsage: '30%', image: 'nginx' },
    { id: 'container2', name: 'database', status: 'stopped', cpuUsage: '0%', memoryUsage: '0%', image: 'mysql' }
  ];
  
  // Function to render container list
  function renderContainers() {
    const containerList = document.getElementById('container-list');
    containerList.innerHTML = '';
    containers.forEach(container => {
      const containerItem = document.createElement('div');
      containerItem.className = 'container-item';
      containerItem.innerHTML = `
        <h3>${container.name}</h3>
        <p>Status: ${container.status}</p>
        <p>CPU Usage: ${container.cpuUsage}</p>
        <p>Memory Usage: ${container.memoryUsage}</p>
        <button class="action-btn" data-id="${container.id}">Actions</button>
        <button class="graph-btn" data-id="${container.id}">Graphs</button>
      `;
      containerList.appendChild(containerItem);
    });
  }
  
  // Function to handle container actions
  function handleContainerAction(id, action) {
    // Placeholder function, implement actual actions based on id and action
    console.log(`Performing ${action} on container ${id}`);
  }
  
  // Event listener for container action buttons
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('action-btn')) {
      const containerId = e.target.getAttribute('data-id');
      document.getElementById('modal').style.display = 'block';
      document.getElementById('start-btn').addEventListener('click', () => handleContainerAction(containerId, 'start'));
      document.getElementById('stop-btn').addEventListener('click', () => handleContainerAction(containerId, 'stop'));
      document.getElementById('restart-btn').addEventListener('click', () => handleContainerAction(containerId, 'restart'));
      document.getElementById('run-container-btn').addEventListener('click', () => handleContainerAction(containerId, 'run'));
    }
  });
  
  // Event listener for container graph buttons
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('graph-btn')) {
      const containerId = e.target.getAttribute('data-id');
      document.getElementById('graph-modal').style.display = 'block';
      // Placeholder function to render graphs, you can use libraries like Chart.js for this purpose
      renderGraphs(containerId);
    }
  });
  
  // Event listener to close modal
  document.addEventListener('click', function(e) {
    if (e.target && (e.target.classList.contains('close') || e.target.classList.contains('modal'))) {
      document.getElementById('modal').style.display = 'none';
      document.getElementById('graph-modal').style.display = 'none';
    }
  });
  
  // Function to render graphs
  function renderGraphs(containerId) {
    // Placeholder function, you can use libraries like Chart.js to render graphs
    const cpuGraph = document.getElementById('cpu-graph');
    const memoryGraph = document.getElementById('memory-graph');
    
    // Example of rendering graphs using Chart.js
    // Replace this with actual data and rendering logic
    // For example:
    // new Chart(cpuGraph, { type: 'line', data: {...}});
    // new Chart(memoryGraph, { type: 'line', data: {...}});
  }
  
  renderContainers();
  // Function to fetch container information
function fetchContainerInfo() {
    fetch('/containers')
        .then(response => response.json())
        .then(data => {
            // Handle container data
            renderContainers(data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to render container list
function renderContainers(containers) {
    const containerList = document.getElementById('container-list');
    containerList.innerHTML = '';
    containers.forEach(container => {
        const containerItem = document.createElement('div');
        containerItem.className = 'container-item';
        containerItem.innerHTML = `
            <h3>${container.name}</h3>
            <p>Status: ${container.status}</p>
            <p>Image: ${container.image}</p>
            <p>CPU Usage: ${container.cpu_usage}</p>
            <p>Memory Usage: ${container.memory_usage}</p>
            <button class="action-btn" data-id="${container.id}" data-action="start">Start</button>
            <button class="action-btn" data-id="${container.id}" data-action="stop">Stop</button>
            <button class="action-btn" data-id="${container.id}" data-action="restart">Restart</button>
            <button class="action-btn" data-id="${container.id}" data-action="run">Run</button>
            <button class="graph-btn" data-id="${container.id}">Graphs</button>
        `;
        containerList.appendChild(containerItem);
    });
}

// Function to handle container actions
function handleContainerAction(id, action) {
    fetch(`/containers/${id}/${action}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Optionally, refresh container list after action
            fetchContainerInfo();
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for container action buttons
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('action-btn')) {
        const containerId = e.target.getAttribute('data-id');
        const action = e.target.getAttribute('data-action');
        handleContainerAction(containerId, action);
    }
});

// Event listener for container graph buttons
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('graph-btn')) {
        const containerId = e.target.getAttribute('data-id');
        // Code to display graphs for container with ID containerId
        console.log(`Displaying graphs for container ${containerId}`);
    }
});

// Initial fetch of container information
fetchContainerInfo();
fetch('/containers')
    .then(response => {
        console.log(response); // Log response from server
        if (!response.ok) {
            throw new Error('Failed to fetch container information');
        }
        return response.json();
    })
    .then(data => {
        renderContainers(data);
    })
    .catch(error => console.error('Error:', error));
