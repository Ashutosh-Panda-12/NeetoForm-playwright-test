import { test } from "@playwright/test";
import { STORAGE_STATE } from "../constants/common";
import * as fs from "fs";

test("Teardown", async () => {
    try {
        fs.unlinkSync(STORAGE_STATE);
    } catch (error) {
        console.error("Error deleting storage state:", error);
    }
});
