const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('ws'); // If ws not installed, we can check or use node http

// Let's check if ws is installed, or write a simple script
