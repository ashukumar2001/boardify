export function extractErrorMessage(errorString: string): string {
    const match = /Uncaught Error: (.*?)(?:\s+at handler|$)/.exec(errorString);
    return match ? match[1] : 'An unexpected error occurred';
}