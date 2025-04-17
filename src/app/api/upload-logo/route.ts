// src/app/api/upload-logo/route.ts

// src/app/api/upload-logo/route.ts
import { NextResponse } from 'next/server';
import PinataClient from '@pinata/sdk';
import { Readable } from 'stream';

// --- ADD LOGS HERE ---
console.log("API Route: Checking Environment Variables...");
console.log("PINATA_API_KEY available?:", !!process.env.PINATA_API_KEY); // Log true/false
console.log("PINATA_SECRET_API_KEY available?:", !!process.env.PINATA_SECRET_API_KEY); // Log true/false
// For debugging only - REMOVE AFTER CHECKING or mask keys partially if logging values
// console.log("PINATA_API_KEY value:", process.env.PINATA_API_KEY?.substring(0, 5) + "..."); // Log first 5 chars
// ---------------------

// Initialize Pinata Client (ensure keys are in .env.local)
const pinata = new PinataClient({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
});


// Helper function to convert Blob/File to Readable Stream
async function fileToReadableStream(file: Blob): Promise<Readable> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);
    return stream;
}

export async function POST(request: Request) {
    console.log("API Route: /api/upload-logo received POST request");

    try {
        const formData = await request.formData();
        const file = formData.get('logo') as File | null; // Key 'logo' must match frontend FormData

        if (!file) {
            console.error("API Route: No file found in form data.");
            return NextResponse.json({ message: 'No logo file provided' }, { status: 400 });
        }

        console.log(`API Route: Received file: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

        // --- Basic Server-Side Validation (optional but recommended) ---
        if (file.size > 2 * 1024 * 1024) { // 2MB check again
           console.error("API Route: File size exceeds 2MB.");
           return NextResponse.json({ message: 'File exceeds 2MB limit' }, { status: 400 });
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
         if (!allowedTypes.includes(file.type)) {
            console.error(`API Route: Invalid file type: ${file.type}`);
            return NextResponse.json({ message: 'Invalid file type (JPG, PNG, WEBP only)' }, { status: 400 });
         }
        // --------------------------------------------------------------


        // Convert file to readable stream for Pinata SDK
        const stream = await fileToReadableStream(file);

        // --- Pinata Upload Options ---
        const options = {
            pinataMetadata: {
                name: `token-logo-${Date.now()}-${file.name}`, // Unique name for Pinata listing
                // keyvalues: { /* Add any custom keyvalues here if needed */ }
            },
            pinataOptions: {
                cidVersion: 1, // Use CID version 1 (more standard)
            } as any // Use 'as any' to bypass potential minor type mismatches in SDK options if needed
        };
        // ---------------------------

        console.log("API Route: Uploading to Pinata...");
        const result = await pinata.pinFileToIPFS(stream, options);
        console.log("API Route: Pinata upload successful:", result);


        // Check for IPFS hash in result
        if (!result || !result.IpfsHash) {
             console.error("API Route: Pinata response missing IpfsHash.");
             throw new Error('Pinata upload succeeded but did not return IpfsHash.');
        }


        // Return the IPFS hash (CID)
        return NextResponse.json({ ipfsHash: result.IpfsHash }, { status: 200 });

    } catch (error: any) {
        console.error("API Route: Error during upload:", error);
        // Consider more specific error messages based on error type if possible
        return NextResponse.json({ message: `Upload failed: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
}