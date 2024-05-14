const { readFileSync, writeFileSync } = require('fs');

let data = JSON.parse(readFileSync('./data.json'));

function getAllTasks(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function createTask(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newTask = JSON.parse(body);
    newTask.id = Date.now().toString();
    data.push(newTask);
    writeFileSync('./data.json', JSON.stringify(data));
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newTask));
  });
}

function updateTask(req, res, taskId) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const updatedTask = JSON.parse(body);
    const index = data.findIndex(task => task.id === taskId);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedTask };
      writeFileSync('./data.json', JSON.stringify(data));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data[index]));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Task not found' }));
    }
  });
}

function deleteTask(req, res, taskId) {
  const index = data.findIndex(task => task.id === taskId);
  if (index !== -1) {
    data.splice(index, 1);
    writeFileSync('./data.json', JSON.stringify(data));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Task deleted successfully' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Task not found' }));
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
