import https from "https";
import fetch from "node-fetch";

/**
 * Fetches a file synchronously using Node.js's `https` module.
 * @param url - The URL of the file to fetch.
 * @returns The file content as a string.
 */
function getFile(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });
        }).on("error", (error) => {
            console.error(`Error fetching file: ${url}`, error);
            reject(error);
        });
    });
}

/**
 * Resolves Lygia includes synchronously.
 * @param lines - The GLSL shader code as a string or array of lines.
 * @returns The resolved GLSL shader code.
 */
async function resolveLygia(lines: string | string[]): Promise<string> {
    if (!Array.isArray(lines)) {
        lines = lines.split(/\r?\n/);
    }

    let src = "";
    for (const line of lines) {
        const lineTrim = line.trim();
        if (lineTrim.startsWith('#include "lygia')) {
            let includeUrl = lineTrim.substring(15);
            includeUrl = "https://lygia.xyz" + includeUrl.replace(/\"|\;|\s/g, "");
            const includedCode = await getFile(includeUrl);

            // Recursively resolve includes in the included content
            const resolvedCode = await resolveLygia(includedCode);
            src += resolvedCode + "\n";
        } else {
            src += line + "\n";
        }
    }

    return src;
}

/**
 * Resolves Lygia includes asynchronously.
 * @param lines - The GLSL shader code as a string or array of lines.
 * @returns A promise that resolves to the resolved GLSL shader code.
 */
async function resolveLygiaAsync(lines: string | string[]): Promise<string> {
    if (!Array.isArray(lines)) {
        lines = lines.split(/\r?\n/);
    }

    const resolvedLines = await Promise.all(
        lines.map(async (line) => {
            const lineTrim = line.trim();
            if (lineTrim.startsWith('#include "lygia')) {
                let includeUrl = lineTrim.substring(15);
                includeUrl = "https://lygia.xyz" + includeUrl.replace(/\"|\;|\s/g, "");
                try {
                    const response = await fetch(includeUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
                    }
                    const includedCode = await response.text();

                    // Recursively resolve includes in the included content
                    return await resolveLygiaAsync(includedCode);
                } catch (error) {
                    console.error(`Error fetching file: ${includeUrl}`, error);
                    return "";
                }
            } else {
                return line;
            }
        })
    );

    return resolvedLines.join("\n");
}

export { getFile, resolveLygia, resolveLygiaAsync };