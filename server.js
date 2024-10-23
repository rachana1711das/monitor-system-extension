const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const PORT = 3005; // Ensure this matches your Prometheus target

// Enable CORS for all routes
app.use(cors());

// Create a Registry which registers the metrics
const register = new client.Registry();

// Create custom metrics
const formSubmitCounter = new client.Counter({
    name: 'form_submits_total',
    help: 'Total number of form submits',
});
const visitBlogsCounter = new client.Counter({
    name: 'visit_blogs_total',
    help: 'Total number of visits to blogs',
});
const visitProjectsCounter = new client.Counter({
    name: 'visit_projects_total',
    help: 'Total number of visits to projects',
});
const visitResumeCounter = new client.Counter({
    name: 'visit_resume_total',
    help: 'Total number of visits to resume',
});
const scrollingCounter = new client.Counter({
    name: 'scrolling_total',
    help: 'Total number of scroll events',
});

// Register the custom metrics
register.registerMetric(formSubmitCounter);
register.registerMetric(visitBlogsCounter);
register.registerMetric(visitProjectsCounter);
register.registerMetric(visitResumeCounter);
register.registerMetric(scrollingCounter);

// Endpoint to receive data from extension
app.use(bodyParser.json());
app.post('/track-interaction', (req, res) => {
    const { interactionType, timestamp } = req.body;
    console.log('Received interaction:', interactionType, 'at', timestamp);

    // Increment the appropriate counter based on interaction type
    switch (interactionType) {
        case 'form-submit':
            formSubmitCounter.inc();
            console.log('formSubmitCounter incremented');
            break;
        case 'visit-blogs':
            visitBlogsCounter.inc();
            console.log('visitBlogsCounter incremented');
            break;
        case 'visit-projects':
            visitProjectsCounter.inc();
            console.log('visitProjectsCounter incremented');
            break;
        case 'visit-resume':
            visitResumeCounter.inc();
            console.log('visitResumeCounter incremented');
            break;
        case 'scrolling':
            scrollingCounter.inc();
            console.log('scrollingCounter incremented');
            break;
        default:
            console.log('Unknown interaction type');
            break;
    }

    res.sendStatus(200);
});

// Expose the metrics at the /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
