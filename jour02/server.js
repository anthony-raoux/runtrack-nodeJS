const http = require('http');
const { getAllTasks, createTask, updateTask, deleteTask } = require('./routes');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/tasks' && method === 'GET') {
    getAllTasks(req, res);
  } else if (url === '/tasks' && method === 'POST') {
    createTask(req, res);
  } else if (url.match(/\/tasks\/\d+/) && method === 'PUT') {
    const taskId = url.split('/')[2];
    updateTask(req, res, taskId);
  } else if (url.match(/\/tasks\/\d+/) && method === 'DELETE') {
    const taskId = url.split('/')[2];
    deleteTask(req, res, taskId);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

module.exports = server;
