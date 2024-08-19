import {ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, verifySignatureInfoForIdentity} from "@solana/actions"
import { SystemProgram, Transaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";


export async function GET(request: Request) {
  const responseBody: ActionGetResponse = {
    icon:"https://img.freepik.com/premium-photo/nft-nonfungible-tokens-concept-nft-word-abstract-technology-surface-3d-rendering_960117-747.jpg?size=626&ext=jpg",
    description:"I'm trying to build my first blink",
    title: "Don't just Blink Nipu!",
    label: "just click me!",
    error: {
      message: "This blinks if not for anyone yet!"
    },
}
  const response = Response.json(responseBody, { headers: ACTIONS_CORS_HEADERS });

  return response
}

export async function POST(request: Request) {

  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const tx = new Transaction();
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = SystemProgram.programId.toBase58();
  const serialTX = tx.serialize({requireAllSignatures: false, verifySignatures: false }).toString();

  const responseBody: ActionPostResponse = {
    transaction: "serialTX",
    message: "hello!" + userPubkey
  };


  return Response.json(responseBody, { headers: ACTIONS_CORS_HEADERS });

}

export async function OPTIONS(request: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
