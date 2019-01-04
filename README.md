# Run Alteryx in Tableau Extension

Ever wanted to execute your Alteryx workflows or analytic apps from within your Tableau dashboard? Now you can!
If you have an Alteryx Gallery you can run your published apps and workflows.

This extension still contains bugs and could do with a few enhacements. As this is all open-source you are welcome to fork the repository and make changes, fix bugs or whatever you'd like to add. If you do, please let me know.

I would recommend downloading / cloning the repository and run the extension somewhere in your own environment. Make sure you modify the url location in the .trex file (alteryxInTableau.trex) and point it to where you're hosting the extension.

Known issues / To-do list:

- [ ] Save login configuration to workbook
- [ ] Save app/workflow selection to workbook
- [ ] Test more complex apps
- [ ] Test Alteryx Components (date picker, numeric updown)

## Project setup / Installation

After download, 'cd' into the extension location

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
