const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icons/icon.png')
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();

  // Handle window maximize
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });

  // Handle window unmaximize
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });
}

// Create window when app is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle file downloads
ipcMain.on('download-file', (event, fileUrl) => {
  const win = BrowserWindow.getFocusedWindow();
  win.webContents.downloadURL(fileUrl);
});

// Handle PDF preview
ipcMain.on('preview-pdf', (event, pdfPath) => {
  const pdfWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      plugins: true
    }
  });
  pdfWindow.loadFile(pdfPath);
});
