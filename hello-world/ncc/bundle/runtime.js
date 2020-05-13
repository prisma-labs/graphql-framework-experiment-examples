"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const nexus_prisma_1 = require("nexus-prisma");
const Path = __importStar(require("path"));
const levenstein_1 = require("./lib/levenstein");
const linkable_1 = require("./lib/linkable");
const print_stack_1 = require("./lib/print-stack");
const prisma_client_1 = require("./lib/prisma-client");
if (process.env.LINK) {
    process.env.NEXUS_PRISMA_LINK = process.env.LINK;
}
exports.plugin = (settings) => (project) => {
    const prismaClientInstance = prisma_client_1.getPrismaClientInstance(settings === null || settings === void 0 ? void 0 : settings.client, project.log);
    const prismaClientDir = prisma_client_1.getPrismaClientDir();
    const nexusPrismaTypegenOutput = Path.join(linkable_1.linkableProjectDir(), 'node_modules', '@types', 'typegen-nexus-prisma', 'index.d.ts');
    return {
        context: {
            create: (_req) => {
                return {
                    db: prismaClientInstance,
                };
            },
            typeGen: {
                fields: {
                    db: 'Prisma.PrismaClient',
                },
                /**
                 * Prisma import is needed both here and below in typegenAutoConfig.
                 * That's because @nexus/schema removes the import when no types match the source.
                 * This import guarantees that the prisma client import is always there, for the context type.
                 * If both the imports from the plugin and from typegenAutoConfig are present, Nexus will ignore the plugin one
                 *
                 * TODO: This is bad and needs a refactor.
                 * Either @nexus/schema should support a `force` boolean to always have the import there
                 * Or it should support dynamic contexts
                 */
                imports: [
                    {
                        as: 'Prisma',
                        from: Path.join(prismaClientDir, 'index.d.ts'),
                    },
                ],
            },
        },
        schema: {
            typegenAutoConfig: {
                // https://github.com/prisma-labs/nexus-prisma/blob/master/examples/hello-world/app.ts#L14
                sources: [
                    {
                        source: Path.join(prismaClientDir, 'index.d.ts'),
                        alias: 'Prisma',
                    },
                ],
            },
            plugins: [
                nexus_prisma_1.nexusPrismaPlugin({
                    inputs: {
                        prismaClient: prismaClientDir,
                    },
                    outputs: {
                        typegen: nexusPrismaTypegenOutput,
                    },
                    prismaClient: (ctx) => ctx.db,
                    shouldGenerateArtifacts: project.shouldGenerateArtifacts,
                    onUnknownFieldName: (params) => renderUnknownFieldNameError(params),
                    onUnknownFieldType: (params) => renderUnknownFieldTypeError(params),
                }),
            ],
        },
    };
};
/**
 * TODO ...
 */
function renderUnknownFieldNameError(params) {
    const { stack, fileLineNumber } = print_stack_1.printStack({
        callsite: params.error.stack,
    });
    const suggestions = levenstein_1.suggestionList(params.unknownFieldName, params.validFieldNames).map((s) => chalk_1.default.green(s));
    const suggestionMessage = suggestions.length === 0
        ? ''
        : chalk_1.default `{yellow Warning:} Did you mean ${suggestions.map((s) => `"${s}"`).join(', ')} ?`;
    const intro = chalk_1.default `{yellow Warning:} ${params.error.message}\n{yellow Warning:} in ${fileLineNumber}\n${suggestionMessage}`;
    // todo use logger once "pretty" api done
    console.log(`${intro}${stack}`);
}
/**
 * TODO ...
 */
function renderUnknownFieldTypeError(params) {
    const { stack, fileLineNumber } = print_stack_1.printStack({
        callsite: params.error.stack,
    });
    const intro = chalk_1.default `{yellow Warning:} ${params.error.message}\n{yellow Warning:} in ${fileLineNumber}`;
    // todo use logger once "pretty" api done
    console.log(`${intro}${stack}`);
}
//# sourceMappingURL=runtime.js.map