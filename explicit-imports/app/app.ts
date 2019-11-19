import { app, createApp } from "pumpkins";
import { User, Query } from "./schema";

createApp({ types: [User, Query] }).server.start();
