import docker

client = docker.from_env()

def get_container_info():
    container_info = []
    for container in client.containers.list():
        container_info.append({
            'image_name': container.attrs['Config']['Image'],
            'container_name': container.name,
            'cpu_usage': container.stats(stream=False)['cpu_stats']['cpu_usage']['total_usage'] / 10000000,
            'memory_usage': container.stats(stream=False)['memory_stats']['usage'] / 1000000
        })
    return container_info

def run_container(image, name):
    client.containers.run(image, detach=True, name=name)
    print(f"Container '{name}' running {image} started successfully.")

def start_container(name):
    container = client.containers.get(name)
    container.start()
    print(f"Container '{name}' started successfully.")

def stop_container(name):
    container = client.containers.get(name)
    container.stop()
    print(f"Container '{name}' stopped successfully.")

def restart_container(name):
    container = client.containers.get(name)
    container.restart()
    print(f"Container '{name}' restarted successfully.")

def main():
    while True:
        print("\n1. Show Container Information")
        print("2. Run Container")
        print("3. Start Container")
        print("4. Stop Container")
        print("5. Restart Container")
        print("6. Exit")
        
        choice = input("\nEnter your choice: ")

        if choice == '1':
            containers = get_container_info()
            if containers:
                print("\nContainer Information:")
                for container in containers:
                    print(f"\nImage Name: {container['image_name']}")
                    print(f"Container Name: {container['container_name']}")
                    print(f"CPU Usage: {container['cpu_usage']} %")
                    print(f"Memory Usage: {container['memory_usage']} MB")
            else:
                print("No containers running.")

        elif choice == '2':
            image = input("Enter the image name: ")
            name = input("Enter the container name: ")
            run_container(image, name)

        elif choice == '3':
            name = input("Enter the container name to start: ")
            start_container(name)

        elif choice == '4':
            name = input("Enter the container name to stop: ")
            stop_container(name)

        elif choice == '5':
            name = input("Enter the container name to restart: ")
            restart_container(name)

        elif choice == '6':
            print("Exiting program.")
            break

        else:
            print("Invalid choice. Please enter a valid option.")

if __name__ == "__main__":
    main()
