// Function to fetch container information from Flask server
fetch('http://localhost:5000/api/data')
  .then(response => response.json())
  .then(data => {
    // Process the data returned from the Flask server
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });

function fetchContainerInfo() {
    fetch('/containers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch container information');
            }
            return response.json();
        })
        .then(data => {
            renderContainers(data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to handle container actions (start, stop, restart)
function handleContainerAction(containerId, action) {
    fetch(`/containers/${containerId}/${action}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to ${action} container ${containerId}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            // Refresh container list after action
            fetchContainerInfo();
        })
        .catch(error => console.error('Error:', error));
}

// Function to render container information in HTML
function renderContainers(containers) {
    const containerList = document.getElementById('container-list');
    containerList.innerHTML = '';
    containers.forEach(container => {
        const containerItem = document.createElement('div');
        containerItem.innerHTML = `
            <div>
                <h3>${container.name}</h3>
                <p>Status: ${container.status}</p>
                <p>Image: ${container.image}</p>
                <p>CPU Usage: ${container.cpu_usage}%</p>
                <p>Memory Usage: ${container.memory_usage} MB</p>
                <button onclick="handleContainerAction('${container.id}', 'start')">Start</button>
                <button onclick="handleContainerAction('${container.id}', 'stop')">Stop</button>
                <button onclick="handleContainerAction('${container.id}', 'restart')">Restart</button>
            </div>
        `;
        containerList.appendChild(containerItem);
    });
}

// Fetch container information when the page loads
fetchContainerInfo();
