from flask import Flask, request, jsonify
import docker

app = Flask(__name__)
client = docker.from_env()

@app.route('/containers')
def get_containers():
    containers = client.containers.list()
    container_data = []
    for container in containers:
        container_data.append({
            'id': container.id,
            'name': container.name,
            'status': container.status,
            'image': container.image.tags[0] if container.image.tags else None,
            'cpu_usage': container.stats(stream=False)['cpu_stats']['cpu_usage']['total_usage'] / 10000000,
            'memory_usage': container.stats(stream=False)['memory_stats']['usage'] / 1000000
        })
    return jsonify(container_data)

@app.route('/containers/<container_id>/<action>', methods=['POST'])
def container_action(container_id, action):
    container = client.containers.get(container_id)
    if action == 'start':
        container.start()
    elif action == 'stop':
        container.stop()
    elif action == 'restart':
        container.restart()
    elif action == 'run':
        # Code to run a new container, you may need additional parameters
        pass
    return jsonify({'message': f'Performed {action} action on container {container_id}'})

if __name__ == '__main__':
    app.run(port=5000,debug=True)
