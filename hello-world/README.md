# Repro Instructions

- This is the issue: https://github.com/dsherret/ts-morph/issues/835
- This is the branch of `nexus` being used: https://github.com/graphql-nexus/nexus/pull/1223

```
yarn install
yarn nexus build
```

Example:

```
❯ yarn -s nexus build
$ /Users/jasonkuhrt/projects/graphql-nexus/examples/hello-world/node_modules/.bin/nexus build
 493 ● nexus:build building typescript program
[
  Diagnostic {
    _context: ProjectContext {
      logger: [ConsoleLogger],
      manipulationSettings: [ManipulationSettingsContainer],
      _project: [Project],
      fileSystemWrapper: [TransactionalFileSystem],
      _compilerOptions: [CompilerOptionsContainer],
      compilerFactory: [CompilerFactory],
      inProjectCoordinator: [InProjectCoordinator],
      structurePrinterFactory: [StructurePrinterFactory],
      lazyReferenceCoordinator: [LazyReferenceCoordinator],
      directoryCoordinator: [DirectoryCoordinator],
      _languageService: [LanguageService]
    },
    _compilerObject: {
      file: undefined,
      start: undefined,
      length: undefined,
      messageText: "Cannot find type definition file for 'fs'.",
      category: 1,
      code: 2688,
      reportsUnnecessary: undefined
    }
  }
]
3813 ● nexus:build compiling a production build
error TS2688: Cannot find type definition file for 'fs'.

Error: error TS2688: Cannot find type definition file for 'fs'.

    at Object.emitTSProgram (/Users/jasonkuhrt/projects/graphql-nexus/examples/hello-world/node_modules/nexus/dist/lib/tsc.js:87:15)
    at Object.buildNexusApp (/Users/jasonkuhrt/projects/graphql-nexus/examples/hello-world/node_modules/nexus/dist/lib/build/build.js:47:11)
    at async Build.parse (/Users/jasonkuhrt/projects/graphql-nexus/examples/hello-world/node_modules/nexus/dist/cli/commands/build.js:33:9)
```
