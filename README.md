Add event listeners in Prometheus 
Using this method, we can only track the event in our local system by adding an extension.

Here's a step-by-step guide on how you can create a browser extension to monitor user interactions on the website:
1.	Create a Browser Extension: Develop a browser extension using HTML, CSS, and JavaScript. This extension will inject code into the website's DOM to track user interactions.
2.	Inject Tracking Code: Inject JavaScript code into the website's DOM using the browser extension. This code will track user interactions such as button clicks, page visits, scrolling, etc., and send this data to your backend server for further processing.
3.	Send Data to Backend Server: Once the tracking data is collected, send it to your backend server using AJAX requests. The backend server will receive this data and perform the necessary operations like counting the number of people visiting projects, blogs, filling forms, etc.
Process Data and Display in Grafana: On the backend server, process the received data and store it in a database or any other suitable storage mechanism. You can then use Grafana to visualize this data by connecting Grafana to your 
