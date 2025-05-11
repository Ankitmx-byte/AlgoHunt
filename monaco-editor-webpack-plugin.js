const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * This is a simple webpack plugin to handle Monaco Editor workers
 * It copies the necessary worker files to the public directory
 */
class MonacoEditorWebpackPlugin {
  constructor(options = {}) {
    this.options = {
      languages: options.languages || ['javascript', 'typescript', 'html', 'css', 'json'],
      features: options.features || ['!accessibilityHelp', '!anchorSelect', '!bracketMatching', '!caretOperations', '!clipboard', '!codeAction', '!codelens', '!colorDetector', '!colorPicker', '!comment', '!contextmenu', '!coreCommands', '!cursorUndo', '!dnd', '!documentSymbols', '!find', '!folding', '!fontZoom', '!format', '!gotoError', '!gotoLine', '!gotoSymbol', '!hover', '!iPadShowKeyboard', '!inPlaceReplace', '!indentation', '!inlineHints', '!inspectTokens', '!linesOperations', '!linkedEditing', '!links', '!multicursor', '!parameterHints', '!quickCommand', '!quickHelp', '!quickOutline', '!referenceSearch', '!rename', '!smartSelect', '!snippets', '!suggest', '!toggleHighContrast', '!toggleTabFocusMode', '!transpose', '!unusualLineTerminators', '!viewportSemanticTokens', '!wordHighlighter', '!wordOperations', '!wordPartOperations'],
      filename: options.filename || '[name].worker.js',
      publicPath: options.publicPath || '',
      outputPath: options.outputPath || '',
    };
  }

  apply(compiler) {
    const publicPath = path.join(compiler.options.output.path, 'public');
    
    // Copy Monaco Editor worker files to the public directory
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs/base/worker/workerMain.js'),
          to: path.join(publicPath, 'editor.worker.js'),
        },
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/json/json.worker.js'),
          to: path.join(publicPath, 'json.worker.js'),
        },
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/css/css.worker.js'),
          to: path.join(publicPath, 'css.worker.js'),
        },
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/html/html.worker.js'),
          to: path.join(publicPath, 'html.worker.js'),
        },
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js'),
          to: path.join(publicPath, 'ts.worker.js'),
        },
      ],
    }).apply(compiler);
  }
}

module.exports = MonacoEditorWebpackPlugin;
