"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("./lib/prisma-client");
if (process.env.LINK) {
    process.env.NEXUS_PRISMA_LINK = process.env.LINK;
}
exports.plugin = (settings) => (project) => {
    const plugin = () => {
        return {
            app: {
                db: {
                    client: prisma_client_1.getPrismaClientInstance(settings === null || settings === void 0 ? void 0 : settings.client, project.log),
                },
            },
        };
    };
    return plugin;
};
//# sourceMappingURL=testtime.js.map