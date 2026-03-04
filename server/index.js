const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] INFO Server listening on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[${new Date().toISOString()}] FATAL Port ${port} is already in use. Stop the other process or set a different PORT environment variable.`);
  } else if (err.code === 'EACCES') {
    console.error(`[${new Date().toISOString()}] FATAL Port ${port} requires elevated privileges. Use a port above 1024 or run with appropriate permissions.`);
  } else {
    console.error(`[${new Date().toISOString()}] FATAL Server failed to start:`, err.message);
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(`[${new Date().toISOString()}] ERROR Unhandled promise rejection:`, reason);
});

process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] FATAL Uncaught exception:`, err.stack || err);
  process.exit(1);
});
